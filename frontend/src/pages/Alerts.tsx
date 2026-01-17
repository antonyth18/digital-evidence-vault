import { Card, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { AlertOctagon, Info, AlertTriangle } from 'lucide-react';

const alerts = [
    { id: 1, severity: 'high', title: 'Metadata Mismatch', desc: 'File metadata does not match blockchain record.', time: '10 mins ago', evidenceId: 'EV-2024-003' },
    { id: 2, severity: 'medium', title: 'Unexpected Access', desc: 'Access attempt from unauthorized IP range.', time: '2 hours ago', evidenceId: 'EV-2024-001' },
    { id: 3, severity: 'low', title: 'Verification Delay', desc: 'Network congestion caused slower verification.', time: '5 hours ago', evidenceId: 'SYS-NET' },
];

export function Alerts() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Alerts & Flags</h2>
                <p className="text-slate-500 dark:text-slate-400 mt-2">Active system integrity warnings.</p>
            </div>

            <div className="space-y-4">
                {alerts.map((alert) => (
                    <Card key={alert.id} className="border-l-4 border-l-transparent data-[severity=high]:border-l-red-500 data-[severity=medium]:border-l-amber-500 data-[severity=low]:border-l-blue-500 dark:bg-slate-900 dark:border-slate-800" data-severity={alert.severity}>
                        <CardContent className="p-6 flex items-start gap-4">
                            <div className="mt-1">
                                {alert.severity === 'high' && <AlertOctagon className="text-red-600 dark:text-red-400 w-6 h-6" />}
                                {alert.severity === 'medium' && <AlertTriangle className="text-amber-600 dark:text-amber-400 w-6 h-6" />}
                                {alert.severity === 'low' && <Info className="text-blue-600 dark:text-blue-400 w-6 h-6" />}
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between">
                                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{alert.title}</h3>
                                    <span className="text-xs text-slate-400 dark:text-slate-500 font-mono">{alert.time}</span>
                                </div>
                                <p className="text-slate-600 dark:text-slate-400 mt-1">{alert.desc}</p>
                                <div className="mt-4 flex gap-2">
                                    <Badge variant="outline" className="font-mono dark:border-slate-700 dark:text-slate-300">{alert.evidenceId}</Badge>
                                    <Badge variant={alert.severity === 'high' ? 'danger' : alert.severity === 'medium' ? 'warning' : 'secondary'}>
                                        {alert.severity.toUpperCase()}
                                    </Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
