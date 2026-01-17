import { useState } from 'react';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ShieldCheck, ShieldAlert, FileSearch, CheckCircle2 } from 'lucide-react';

export function Verification() {
    const [status, setStatus] = useState<'idle' | 'verified' | 'failed'>('idle');

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Evidence Verification</h2>
                <p className="text-slate-500 dark:text-slate-400 mt-2">Courtroom-grade authenticity verification.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-1 space-y-4">
                    <Card className="dark:bg-slate-900 dark:border-slate-800">
                        <CardContent className="pt-6 space-y-4">
                            <p className="text-sm font-medium text-slate-700 dark:text-slate-200">Select Evidence to Verify</p>
                            <div className="p-4 border-2 border-dashed rounded-lg text-center text-sm text-slate-500 dark:text-slate-400 dark:border-slate-700 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50">
                                Drop evidence file here
                            </div>
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center"><span className="w-full border-t dark:border-slate-700" /></div>
                                <div className="relative flex justify-center text-xs uppercase"><span className="bg-white dark:bg-slate-900 px-2 text-slate-500 dark:text-slate-400">Or ID</span></div>
                            </div>
                            <Button className="w-full" onClick={() => setStatus('verified')}>Simulate Check (Pass)</Button>
                            <Button className="w-full" variant="destructive" onClick={() => setStatus('failed')}>Simulate Check (Fail)</Button>
                        </CardContent>
                    </Card>
                </div>

                <div className="md:col-span-2">
                    {status === 'idle' && (
                        <div className="h-full flex flex-col items-center justify-center p-12 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg text-slate-400 dark:text-slate-500">
                            <FileSearch className="w-16 h-16 mb-4 opacity-50" />
                            <p>Waiting for evidence input...</p>
                        </div>
                    )}

                    {status === 'verified' && (
                        <Card className="border-emerald-500 bg-emerald-50/30 dark:bg-emerald-950/30 dark:border-emerald-700 h-full">
                            <CardContent className="flex flex-col items-center justify-center h-full p-12 space-y-6">
                                <div className="w-24 h-24 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center animate-bounce-short">
                                    <ShieldCheck className="w-12 h-12 text-emerald-600 dark:text-emerald-400" />
                                </div>
                                <div className="text-center">
                                    <h3 className="text-3xl font-bold text-emerald-900 dark:text-emerald-100 tracking-tight">VERIFICATION PASSED</h3>
                                    <p className="text-emerald-700 dark:text-emerald-300 mt-2">Digital signature matches blockchain record.</p>
                                </div>

                                <div className="grid grid-cols-3 gap-4 w-full mt-8">
                                    <div className="bg-white dark:bg-slate-800/50 p-4 rounded border border-emerald-200 dark:border-emerald-800 text-center">
                                        <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider">Integrity</p>
                                        <p className="font-bold text-emerald-700 dark:text-emerald-400 flex items-center justify-center gap-1"><CheckCircle2 className="w-4 h-4" /> Valid</p>
                                    </div>
                                    <div className="bg-white dark:bg-slate-800/50 p-4 rounded border border-emerald-200 dark:border-emerald-800 text-center">
                                        <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider">Custody</p>
                                        <p className="font-bold text-emerald-700 dark:text-emerald-400 flex items-center justify-center gap-1"><CheckCircle2 className="w-4 h-4" /> Unbroken</p>
                                    </div>
                                    <div className="bg-white dark:bg-slate-800/50 p-4 rounded border border-emerald-200 dark:border-emerald-800 text-center">
                                        <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider">AI Check</p>
                                        <p className="font-bold text-emerald-700 dark:text-emerald-400 flex items-center justify-center gap-1"><CheckCircle2 className="w-4 h-4" /> Clean</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {status === 'failed' && (
                        <Card className="border-red-500 bg-red-50/30 dark:bg-red-950/30 dark:border-red-700 h-full">
                            <CardContent className="flex flex-col items-center justify-center h-full p-12 space-y-6">
                                <div className="w-24 h-24 bg-red-100 dark:bg-red-900/50 rounded-full flex items-center justify-center">
                                    <ShieldAlert className="w-12 h-12 text-red-600 dark:text-red-400" />
                                </div>
                                <div className="text-center">
                                    <h3 className="text-3xl font-bold text-red-900 dark:text-red-100 tracking-tight">VERIFICATION FAILED</h3>
                                    <p className="text-red-700 dark:text-red-300 mt-2">Hash mismatch detected. Evidence may have been tampered with.</p>
                                </div>

                                <div className="bg-white dark:bg-slate-800/50 p-6 rounded-md border border-red-200 dark:border-red-800 w-full max-w-md mt-6">
                                    <div className="flex justify-between items-center text-sm mb-2">
                                        <span className="text-slate-500 dark:text-slate-400">Expected Hash:</span>
                                        <span className="font-mono text-xs text-slate-400 dark:text-slate-500">8f43...1ac8</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-slate-500 dark:text-slate-400">Computed Hash:</span>
                                        <span className="font-mono text-xs text-red-600 dark:text-red-400 font-bold">9a21...4bf2</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
}
