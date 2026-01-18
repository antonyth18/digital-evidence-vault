-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Evidence Table
CREATE TABLE evidence (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  evidence_id text UNIQUE NOT NULL,
  case_id text NOT NULL,
  file_name text NOT NULL,
  file_size bigint NOT NULL,
  mime_type text,
  evidence_type text,
  source text,
  collected_by text NOT NULL,
  sha256_hash text UNIQUE NOT NULL,
  storage_path text NOT NULL,
  storage_url text,
  tx_hash text UNIQUE,
  block_number bigint,
  gas_used text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

CREATE INDEX idx_evidence_case_id ON evidence(case_id);
CREATE INDEX idx_evidence_hash ON evidence(sha256_hash);
CREATE INDEX idx_evidence_tx_hash ON evidence(tx_hash);

-- 2. Custody Events Table
CREATE TABLE custody_events (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  evidence_id text NOT NULL REFERENCES evidence(evidence_id) ON DELETE CASCADE,
  event_index integer NOT NULL,
  action text NOT NULL,
  handler text NOT NULL,
  metadata_hash text,
  details jsonb,
  tx_hash text,
  block_number bigint,
  timestamp timestamptz NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX idx_custody_evidence ON custody_events(evidence_id);
CREATE INDEX idx_custody_timestamp ON custody_events(timestamp DESC);

-- 3. Tamper Alerts Table
CREATE TABLE tamper_alerts (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  evidence_id text REFERENCES evidence(evidence_id) ON DELETE SET NULL,
  alert_type text NOT NULL,
  detected_by text NOT NULL,
  severity text NOT NULL CHECK (severity IN ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL')),
  risk_score integer CHECK (risk_score >= 0 AND risk_score <= 100),
  reason text NOT NULL,
  details jsonb,
  resolved boolean DEFAULT false,
  resolved_by uuid REFERENCES auth.users(id),
  resolved_at timestamptz,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX idx_alerts_evidence ON tamper_alerts(evidence_id);
CREATE INDEX idx_alerts_severity ON tamper_alerts(severity, created_at DESC);
CREATE INDEX idx_alerts_unresolved ON tamper_alerts(resolved) WHERE resolved = false;

-- 4. Audit Log Table
CREATE TABLE audit_log (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  actor text NOT NULL,
  action text NOT NULL,
  resource_type text,
  resource_id text,
  details jsonb,
  ip_address inet,
  user_agent text,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX idx_audit_actor ON audit_log(actor, created_at DESC);
CREATE INDEX idx_audit_resource ON audit_log(resource_type, resource_id);
CREATE INDEX idx_audit_timestamp ON audit_log(created_at DESC);

-- 5. Storage Policies (Note: You must create the 'evidence-files' bucket manually in Supabase Dashboard first)

-- Policy 1: Allow authenticated uploads
-- CREATE POLICY "Allow authenticated uploads"
-- ON storage.objects
-- FOR INSERT
-- TO authenticated
-- WITH CHECK (bucket_id = 'evidence-files');

-- Policy 2: Allow authenticated downloads
-- CREATE POLICY "Allow authenticated downloads"
-- ON storage.objects
-- FOR SELECT
-- TO authenticated
-- USING (bucket_id = 'evidence-files');

-- Policy 3: Service role full access
-- CREATE POLICY "Service role full access"
-- ON storage.objects
-- FOR ALL
-- TO service_role
-- USING (bucket_id = 'evidence-files');
