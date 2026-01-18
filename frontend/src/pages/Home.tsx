import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';

export function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/20 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center relative overflow-hidden">
            {/* Ambient background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-400/10 dark:bg-blue-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-emerald-400/10 dark:bg-emerald-500/5 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-400/5 to-emerald-400/5 rounded-full blur-3xl" />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
                {/* Logo */}
                <div className="inline-flex p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-2xl shadow-blue-500/20 mb-8">
                    <ShieldCheck className="w-12 h-12 text-white" />
                </div>

                {/* Title */}
                <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">
                    Sentinel
                </h1>

                {/* Tagline */}
                <p className="text-xl text-slate-500 dark:text-slate-400 mb-12 max-w-md mx-auto leading-relaxed">
                    Blockchain-verified digital evidence management. Immutable. Tamper-proof. Court-ready.
                </p>

                {/* CTA Button */}
                <Link to="/">
                    <Button size="lg" className="px-8 py-4 text-base">
                        Enter Dashboard
                        <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                </Link>

                {/* Footer text */}
                <p className="mt-16 text-sm text-slate-400 dark:text-slate-600">
                    Powered by Ethereum • Sepolia Testnet
                </p>
            </div>
        </div>
    );
}
