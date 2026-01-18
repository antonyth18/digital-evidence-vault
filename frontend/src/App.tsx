import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Dashboard } from './pages/Dashboard';
import { EvidenceVault } from './pages/EvidenceVault';
import { UploadEvidence } from './pages/UploadEvidence';
import { ChainOfCustody } from './pages/ChainOfCustody';
import { Verification } from './pages/Verification';
import { Alerts } from './pages/Alerts';
import { AuditLog } from './pages/AuditLog';
import { ToastProvider } from './components/ui/Toast';
import { Login } from './pages/Login';
import { Home } from './pages/Home';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            {/* Landing Page */}
            <Route path="/home" element={<Home />} />

            {/* Public Route */}
            <Route path="/login" element={<Login />} />

            {/* Protected Routes */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="vault" element={<EvidenceVault />} />
              <Route path="upload" element={<UploadEvidence />} />
              <Route path="custody" element={<ChainOfCustody />} />
              <Route path="verification" element={<Verification />} />
              <Route path="alerts" element={<Alerts />} />
              <Route path="audit" element={<AuditLog />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
