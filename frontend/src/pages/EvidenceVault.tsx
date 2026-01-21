import { useState, useMemo } from 'react';
import { Card } from '../components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/Table';
import { Badge } from '../components/ui/Badge';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Select } from '../components/ui/Select';
import { Dialog } from '../components/ui/Dialog';
import { Search, ShieldCheck, Download, ExternalLink } from 'lucide-react';
import type { Evidence } from '../types';

const mockEvidence: Evidence[] = [
    { id: 'EV-2024-001', type: 'Video', source: 'CCTV-4', collectedBy: 'Officer K. Ryan', date: '2024-01-15', status: 'verified', hash: '0x8f...2a', size: '2.4 GB' },
    { id: 'EV-2024-002', type: 'Document', source: 'Affidavit', collectedBy: 'Det. Sarah Lin', date: '2024-01-14', status: 'verified', hash: '0x7b...9c', size: '1.2 MB' },
    { id: 'EV-2024-003', type: 'Image', source: 'Crime Scene', collectedBy: 'Forensic Unit', date: '2024-01-12', status: 'flagged', hash: '0x3c...1f', size: '12 MB' },
    { id: 'EV-2024-004', type: 'Audio', source: 'Wiretap', collectedBy: 'Agent J. Smith', date: '2024-01-10', status: 'verified', hash: '0x1a...4d', size: '45 MB' },
    { id: 'EV-2024-005', type: 'Document', source: 'Police Report', collectedBy: 'Officer K. Ryan', date: '2024-01-09', status: 'breached', hash: '0x9e...2b', size: '840 KB' },
];

export function EvidenceVault() {
    const [search, setSearch] = useState('');
    const [typeFilter, setTypeFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [selectedEvidence, setSelectedEvidence] = useState<Evidence | null>(null);

    const filteredEvidence = useMemo(() => {
        return mockEvidence.filter(item => {
            const matchesSearch = item.id.toLowerCase().includes(search.toLowerCase()) ||
                item.collectedBy.toLowerCase().includes(search.toLowerCase());
            const matchesType = typeFilter ? item.type === typeFilter : true;
            const matchesStatus = statusFilter ? item.status === statusFilter : true;
            return matchesSearch && matchesType && matchesStatus;
        });
    }, [search, typeFilter, statusFilter]);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Evidence Vault</h2>
                    <p className="text-slate-500 dark:text-slate-400 mt-2">Secure storage and management of evidential assets.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline"> <Download className="w-4 h-4 mr-2" /> Export Report</Button>
                </div>
            </div>

            <Card className="p-4 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="relative md:col-span-2">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
                        <Input
                            placeholder="Search ID or Collector..."
                            className="pl-9 bg-white dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>
                    <Select
                        label="All Types"
                        options={['Video', 'Audio', 'Document', 'Image'].map(t => ({ label: t, value: t }))}
                        value={typeFilter}
                        onChange={e => setTypeFilter(e.target.value)}
                    />
                    <Select
                        label="All Statuses"
                        options={[
                            { label: 'Verified', value: 'verified' },
                            { label: 'Flagged', value: 'flagged' },
                            { label: 'Breached', value: 'breached' }
                        ]}
                        value={statusFilter}
                        onChange={e => setStatusFilter(e.target.value)}
                    />
                </div>
            </Card>

            <Card className="dark:bg-slate-900 dark:border-slate-800">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="dark:text-slate-200">Evidence ID</TableHead>
                            <TableHead className="dark:text-slate-200">Type</TableHead>
                            <TableHead className="dark:text-slate-200">Source</TableHead>
                            <TableHead className="dark:text-slate-200">Collected By</TableHead>
                            <TableHead className="dark:text-slate-200">Date</TableHead>
                            <TableHead className="dark:text-slate-200">Integrity Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredEvidence.map((item) => (
                            <TableRow
                                key={item.id}
                                className="cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 dark:border-slate-800 transition-colors"
                                onClick={() => setSelectedEvidence(item)}
                            >
                                <TableCell className="font-medium font-mono text-xs dark:text-slate-300">{item.id}</TableCell>
                                <TableCell className="dark:text-slate-300">{item.type}</TableCell>
                                <TableCell className="dark:text-slate-300">{item.source}</TableCell>
                                <TableCell className="dark:text-slate-300">{item.collectedBy}</TableCell>
                                <TableCell className="dark:text-slate-300">{item.date}</TableCell>
                                <TableCell>
                                    <Badge variant={item.status === 'verified' ? 'success' : item.status === 'flagged' ? 'warning' : 'danger'}>
                                        {item.status.toUpperCase()}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                        {filteredEvidence.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center h-24 text-slate-500 dark:text-slate-400">
                                    No evidence found matching filters.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </Card>

            <Dialog
                isOpen={!!selectedEvidence}
                onClose={() => setSelectedEvidence(null)}
                title="Evidence Details"
            >
                {selectedEvidence && (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between bg-slate-50 p-4 rounded-lg border border-slate-100">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 bg-white rounded-full border border-slate-200 flex items-center justify-center">
                                    <ShieldCheck className="w-5 h-5 text-emerald-500" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900">{selectedEvidence.id}</h4>
                                    <p className="text-xs text-slate-500">Anchored on Ethereum</p>
                                </div>
                            </div>
                            <Badge variant={selectedEvidence.status === 'verified' ? 'success' : 'danger'}>
                                {selectedEvidence.status.toUpperCase()}
                            </Badge>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="space-y-1">
                                <span className="text-slate-500 text-xs uppercase tracking-wider">Type</span>
                                <p className="font-medium">{selectedEvidence.type}</p>
                            </div>
                            <div className="space-y-1">
                                <span className="text-slate-500 text-xs uppercase tracking-wider">File Size</span>
                                <p className="font-medium">{selectedEvidence.size}</p>
                            </div>
                            <div className="space-y-1">
                                <span className="text-slate-500 text-xs uppercase tracking-wider">Source</span>
                                <p className="font-medium">{selectedEvidence.source}</p>
                            </div>
                            <div className="space-y-1">
                                <span className="text-slate-500 text-xs uppercase tracking-wider">Collector</span>
                                <p className="font-medium">{selectedEvidence.collectedBy}</p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <span className="text-slate-500 text-xs uppercase tracking-wider">Cryptographic Hash</span>
                            <div className="bg-slate-100 p-3 rounded font-mono text-xs break-all border border-slate-200 text-slate-600">
                                {selectedEvidence.hash}
                            </div>
                        </div>

                        <div className="flex justify-end gap-2 pt-2">
                            <Button variant="outline" onClick={() => setSelectedEvidence(null)}>Close</Button>
                            <Button><ExternalLink className="w-4 h-4 mr-2" />View in Explorer</Button>
                        </div>
                    </div>
                )}
            </Dialog>
        </div>
    );
}
