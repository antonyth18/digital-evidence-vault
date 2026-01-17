import { Card } from '../components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/Table';

const logs = Array.from({ length: 15 }).map((_, i) => ({
    id: `TX-${940210 + i}`,
    timestamp: `2024-01-16T14:${30 - i}:00Z`,
    actor: i % 3 === 0 ? 'System' : i % 3 === 1 ? 'Officer Doe' : 'Validator Node',
    action: i % 3 === 0 ? 'Block Finalized' : i % 3 === 1 ? 'Upload Evidence' : 'Verify Hash',
    hash: `0x7a...${i}b9`
}));

export function AuditLog() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Audit Log</h2>
                <p className="text-slate-500 dark:text-slate-400 mt-2">Immutable chronological system ledger.</p>
            </div>

            <Card className="dark:bg-slate-900 dark:border-slate-800">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[180px] dark:text-slate-200">Timestamp</TableHead>
                            <TableHead className="dark:text-slate-200">Transaction ID</TableHead>
                            <TableHead className="dark:text-slate-200">Actor</TableHead>
                            <TableHead className="dark:text-slate-200">Action</TableHead>
                            <TableHead className="text-right dark:text-slate-200">Block Hash</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {logs.map((log) => (
                            <TableRow key={log.id} className="dark:border-slate-800 dark:hover:bg-slate-800/50">
                                <TableCell className="font-mono text-xs text-slate-500 dark:text-slate-400">{log.timestamp}</TableCell>
                                <TableCell className="font-mono text-xs dark:text-slate-300">{log.id}</TableCell>
                                <TableCell className="dark:text-slate-300">{log.actor}</TableCell>
                                <TableCell className="dark:text-slate-300">{log.action}</TableCell>
                                <TableCell className="text-right font-mono text-xs text-slate-400 dark:text-slate-500">{log.hash}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </div>
    );
}
