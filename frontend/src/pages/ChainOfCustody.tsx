import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Check, User, AlertCircle, Download, Search, Filter, Calendar } from 'lucide-react';
import { cn } from '../utils/cn';

interface CustodyEvent {
    id: string;
    action: string;
    actor: string;
    role: string;
    timestamp: string;
    hash: string;
    status: 'verified' | 'breach';
    details?: string;
    location?: string;
}

interface TimelineEventProps extends CustodyEvent {
    isLast?: boolean;
}

// Mock data for different evidence items
const mockCustodyData: Record<string, CustodyEvent[]> = {
    'EV-2024-001': [
        {
            id: '1',
            action: 'Evidence Transferred to Court Clerk',
            actor: 'Officer Sarah Lin',
            role: 'DETECTIVE → CLERK',
            timestamp: '2024-01-16 14:30:00 UTC',
            hash: '0x89b8e8f7a5d4c3b2a1234567890abcdef',
            status: 'verified',
            location: 'Main Courthouse',
            details: 'Evidence sealed and transferred for trial preparation'
        },
        {
            id: '2',
            action: 'Forensic Analysis Completed',
            actor: 'Dr. A. Gupta',
            role: 'FORENSIC ANALYST',
            timestamp: '2024-01-15 09:15:00 UTC',
            hash: '0x7a4c2b9d8e6f5a4b3c2d1e0f9a8b7c6d',
            status: 'verified',
            location: 'Forensic Lab A',
            details: 'DNA analysis completed, samples preserved'
        },
        {
            id: '3',
            action: 'Evidence Accessed (Read-Only)',
            actor: 'DA Office (External)',
            role: 'PROSECUTOR',
            timestamp: '2024-01-14 18:45:00 UTC',
            hash: '0x5e9f3d2c1b0a9e8d7c6b5a4f3e2d1c0b',
            status: 'verified',
            location: 'DA Office',
            details: 'Case file review and documentation'
        },
        {
            id: '4',
            action: 'Initial Evidence Collection',
            actor: 'Officer John Doe',
            role: 'FIRST RESPONDER',
            timestamp: '2024-01-14 16:20:00 UTC',
            hash: '0x2b1a7c9d8e6f5a4b3c2d1e0f9a8b7c6d',
            status: 'verified',
            location: '42nd Street Crime Scene',
            details: 'Evidence collected and sealed at scene'
        }
    ],
    'EV-2024-002': [
        {
            id: '1',
            action: 'Document Filed with Court',
            actor: 'Clerk M. Johnson',
            role: 'COURT CLERK',
            timestamp: '2024-01-15 11:00:00 UTC',
            hash: '0x3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f',
            status: 'verified',
            location: 'District Court',
            details: 'Official court filing and indexing'
        },
        {
            id: '2',
            action: 'Document Notarized',
            actor: 'Notary R. Williams',
            role: 'NOTARY PUBLIC',
            timestamp: '2024-01-14 15:30:00 UTC',
            hash: '0x9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d',
            status: 'verified',
            location: 'City Notary Office',
            details: 'Official notarization and seal applied'
        },
        {
            id: '3',
            action: 'Initial Affidavit Collection',
            actor: 'Det. Sarah Lin',
            role: 'DETECTIVE',
            timestamp: '2024-01-14 09:00:00 UTC',
            hash: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d',
            status: 'verified',
            location: 'Police Station 4',
            details: 'Witness statement recorded and documented'
        }
    ]
};

function TimelineEvent({
    action,
    actor,
    role,
    timestamp,
    hash,
    status,
    isLast,
    location,
    details
}: TimelineEventProps) {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="flex gap-4">
            <div className="flex flex-col items-center">
                <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center border-2 z-10 bg-white dark:bg-slate-900",
                    status === 'verified'
                        ? "border-emerald-500 text-emerald-600 dark:text-emerald-400"
                        : "border-red-500 text-red-600 dark:text-red-400"
                )}>
                    {status === 'verified' ? <Check className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                </div>
                {!isLast && <div className="w-0.5 flex-1 bg-slate-200 dark:bg-slate-700 my-2" />}
            </div>
            <div className="flex-1 pb-8">
                <Card className={cn(
                    "transition-all duration-200",
                    status === 'breach' && "border-red-200 bg-red-50/50 dark:border-red-800 dark:bg-red-900/10",
                    "dark:bg-slate-900 dark:border-slate-800 hover:shadow-md"
                )}>
                    <CardContent className="p-5">
                        <div className="flex justify-between items-start mb-3">
                            <div className="flex-1">
                                <h4 className="font-semibold text-slate-900 dark:text-white text-base mb-2">
                                    {action}
                                </h4>
                                <div className="flex items-center text-sm text-slate-600 dark:text-slate-400 gap-2">
                                    <User className="w-4 h-4" />
                                    <span className="font-medium">{actor}</span>
                                    <Badge variant="secondary" className="text-[10px] px-2 py-0.5">
                                        {role}
                                    </Badge>
                                </div>
                                {location && (
                                    <p className="text-xs text-slate-500 dark:text-slate-500 mt-1 flex items-center gap-1">
                                        <Calendar className="w-3 h-3" />
                                        {location}
                                    </p>
                                )}
                            </div>
                            <div className="text-right ml-4">
                                <div className="text-sm font-mono text-slate-700 dark:text-slate-300 mb-1">
                                    {new Date(timestamp).toLocaleString()}
                                </div>
                                <Badge
                                    variant={status === 'verified' ? 'success' : 'danger'}
                                    className="text-[10px]"
                                >
                                    {status === 'verified' ? '✓ Signature Valid' : '✗ Signature Invalid'}
                                </Badge>
                            </div>
                        </div>

                        {details && (
                            <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                    {details}
                                </p>
                            </div>
                        )}

                        <div className="mt-4">
                            <button
                                onClick={() => setExpanded(!expanded)}
                                className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                            >
                                {expanded ? 'Hide' : 'Show'} Hash Details
                            </button>
                            {expanded && (
                                <div className="mt-2 bg-slate-100 dark:bg-slate-800 p-3 rounded text-[10px] font-mono text-slate-600 dark:text-slate-400 break-all">
                                    <div className="flex justify-between mb-1">
                                        <span className="font-semibold">Block Hash:</span>
                                    </div>
                                    {hash}
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export function ChainOfCustody() {
    const [selectedEvidence, setSelectedEvidence] = useState('EV-2024-001');
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<'all' | 'verified' | 'breach'>('all');
    const [showFilters, setShowFilters] = useState(false);

    const evidenceOptions = Object.keys(mockCustodyData).map(id => ({
        label: id,
        value: id
    }));

    const filteredEvents = useMemo(() => {
        const events = mockCustodyData[selectedEvidence] || [];

        return events.filter(event => {
            const matchesSearch = searchTerm === '' ||
                event.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                event.actor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                event.role.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesStatus = statusFilter === 'all' || event.status === statusFilter;

            return matchesSearch && matchesStatus;
        });
    }, [selectedEvidence, searchTerm, statusFilter]);

    const handleExport = () => {
        const events = mockCustodyData[selectedEvidence] || [];
        const data = {
            evidenceId: selectedEvidence,
            exportDate: new Date().toISOString(),
            events: events
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `custody-chain-${selectedEvidence}-${Date.now()}.json`;
        a.click();
    };

    const stats = useMemo(() => {
        const events = mockCustodyData[selectedEvidence] || [];
        return {
            total: events.length,
            verified: events.filter(e => e.status === 'verified').length,
            breached: events.filter(e => e.status === 'breach').length
        };
    }, [selectedEvidence]);

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex justify-between items-start">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                        Chain of Custody
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 mt-2">
                        Immutable blockchain-verified evidence handling history
                    </p>
                </div>
                <Button
                    variant="outline"
                    onClick={handleExport}
                    className="dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                    <Download className="w-4 h-4 mr-2" />
                    Export Chain
                </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-4">
                <Card className="dark:bg-slate-900 dark:border-slate-800">
                    <CardContent className="p-4">
                        <div className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                            Total Events
                        </div>
                        <div className="text-2xl font-bold dark:text-white">{stats.total}</div>
                    </CardContent>
                </Card>
                <Card className="dark:bg-slate-900 dark:border-slate-800">
                    <CardContent className="p-4">
                        <div className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                            Verified
                        </div>
                        <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                            {stats.verified}
                        </div>
                    </CardContent>
                </Card>
                <Card className="dark:bg-slate-900 dark:border-slate-800">
                    <CardContent className="p-4">
                        <div className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                            Breaches
                        </div>
                        <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                            {stats.breached}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Filters */}
            <Card className="dark:bg-slate-900 dark:border-slate-800">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-base dark:text-white">Filters & Search</CardTitle>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowFilters(!showFilters)}
                            className="dark:text-slate-400 dark:hover:text-white"
                        >
                            <Filter className="w-4 h-4 mr-2" />
                            {showFilters ? 'Hide' : 'Show'}
                        </Button>
                    </div>
                </CardHeader>
                {showFilters && (
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium dark:text-slate-200">
                                    Evidence ID
                                </label>
                                <Select
                                    value={selectedEvidence}
                                    onChange={(e) => setSelectedEvidence(e.target.value)}
                                    options={evidenceOptions}
                                    className="dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium dark:text-slate-200">
                                    Status Filter
                                </label>
                                <Select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value as any)}
                                    options={[
                                        { label: 'All Events', value: 'all' },
                                        { label: 'Verified Only', value: 'verified' },
                                        { label: 'Breached Only', value: 'breach' }
                                    ]}
                                    className="dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium dark:text-slate-200">
                                    Search
                                </label>
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <Input
                                        placeholder="Search events, actors..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                                    />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                )}
            </Card>

            {/* Timeline */}
            <Card className="dark:bg-slate-900 dark:border-slate-800">
                <CardHeader>
                    <CardTitle className="dark:text-white">
                        Evidence Timeline - {selectedEvidence}
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                    {filteredEvents.length > 0 ? (
                        <div className="space-y-0">
                            {filteredEvents.map((event, index) => (
                                <TimelineEvent
                                    key={event.id}
                                    {...event}
                                    isLast={index === filteredEvents.length - 1}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <AlertCircle className="w-12 h-12 text-slate-400 dark:text-slate-600 mx-auto mb-4" />
                            <p className="text-slate-500 dark:text-slate-400">
                                No events found matching your filters
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Footer Info */}
            <Card className="dark:bg-blue-950/30 dark:border-blue-800 bg-blue-50 border-blue-200">
                <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0">
                            <Check className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                            <h4 className="font-semibold text-blue-900 dark:text-blue-100 text-sm mb-1">
                                Blockchain Verified
                            </h4>
                            <p className="text-xs text-blue-700 dark:text-blue-300">
                                All custody events are cryptographically signed and stored on an immutable
                                blockchain ledger. Each transfer is verified by multiple network validators
                                to ensure data integrity and prevent tampering.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
