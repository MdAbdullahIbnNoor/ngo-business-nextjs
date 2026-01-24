'use client';

import { useState } from 'react';
import { Heart, ShieldCheck, Zap, Globe, CheckCircle2 } from 'lucide-react';
import { Button } from "@/components/ui/button";

const PRESET_AMOUNTS = [10, 25, 50, 100, 250, 500];

export default function DonatePage() {
    const [amount, setAmount] = useState<number | string>(50);
    const [frequency, setFrequency] = useState('once');
    const [loading, setLoading] = useState(false);

    const handleDonate = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Here you would integrate Stripe or SSLCommerz
        setTimeout(() => {
            alert("Redirecting to secure payment gateway...");
            setLoading(false);
        }, 1500);
    };

    return (
        <main className="min-h-screen bg-slate-50 pt-24 pb-20">
            <div className="mx-auto max-w-5xl px-6">

                <div className="grid gap-12 lg:grid-cols-2 items-start">

                    {/* Left: Impact Summary */}
                    <div className="space-y-8">
                        <div>
                            <h1 className="text-4xl font-black tracking-tighter text-slate-900 md:text-6xl">
                                Make an <span className="text-primary">Impact</span>
                            </h1>
                            <p className="mt-6 text-lg text-slate-600 leading-relaxed">
                                Your contribution provides clean water, education, and medical care to those who need it most. 100% of your donation goes directly to the field.
                            </p>
                        </div>

                        <div className="grid gap-4">
                            <div className="flex items-center gap-4 rounded-2xl bg-white p-4 border shadow-sm">
                                <div className="bg-blue-100 p-3 rounded-xl text-blue-600"><Zap className="h-6 w-6" /></div>
                                <div>
                                    <p className="font-bold text-slate-900">$25 provides</p>
                                    <p className="text-sm text-slate-500">School supplies for 5 children</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 rounded-2xl bg-white p-4 border shadow-sm">
                                <div className="bg-green-100 p-3 rounded-xl text-green-600"><Globe className="h-6 w-6" /></div>
                                <div>
                                    <p className="font-bold text-slate-900">$100 provides</p>
                                    <p className="text-sm text-slate-500">Clean water for a whole village</p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-[2rem] bg-primary p-8 text-white">
                            <ShieldCheck className="h-10 w-10 mb-4 opacity-80" />
                            <h3 className="text-xl font-bold mb-2">Secure Donation</h3>
                            <p className="text-primary-foreground/80 text-sm">
                                We use industry-standard encryption to protect your data. Your transaction is 100% secure and private.
                            </p>
                        </div>
                    </div>

                    {/* Right: Donation Card */}
                    <div className="bg-white rounded-[2.5rem] border shadow-2xl shadow-slate-200 overflow-hidden">
                        <div className="flex border-b">
                            <button
                                onClick={() => setFrequency('once')}
                                className={`flex-1 py-4 text-sm font-black uppercase tracking-widest transition-all ${frequency === 'once' ? 'bg-white text-primary' : 'bg-slate-50 text-slate-400'}`}
                            >
                                One-Time
                            </button>
                            <button
                                onClick={() => setFrequency('monthly')}
                                className={`flex-1 py-4 text-sm font-black uppercase tracking-widest transition-all ${frequency === 'monthly' ? 'bg-white text-primary' : 'bg-slate-50 text-slate-400'}`}
                            >
                                Monthly
                            </button>
                        </div>

                        <form onSubmit={handleDonate} className="p-8 md:p-12 space-y-8">
                            {/* Amount Selection */}
                            <div className="grid grid-cols-3 gap-3">
                                {PRESET_AMOUNTS.map((val) => (
                                    <button
                                        key={val}
                                        type="button"
                                        onClick={() => setAmount(val)}
                                        className={`rounded-xl py-3 font-bold border-2 transition-all ${amount === val ? 'border-primary bg-primary/5 text-primary' : 'border-slate-100 text-slate-500 hover:border-slate-200'}`}
                                    >
                                        ${val}
                                    </button>
                                ))}
                            </div>

                            {/* Custom Amount */}
                            <div className="relative">
                                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    placeholder="Other Amount"
                                    className="w-full rounded-2xl border bg-slate-50 pl-10 pr-5 py-4 font-bold outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                />
                            </div>

                            {/* Personal Info */}
                            <div className="space-y-4">
                                <input name="name" type="text" required placeholder="Full Name" className="w-full rounded-2xl border bg-slate-50 px-5 py-3 outline-none focus:ring-2 focus:ring-primary/20 transition-all" />
                                <input name="email" type="email" required placeholder="Email Address" className="w-full rounded-2xl border bg-slate-50 px-5 py-3 outline-none focus:ring-2 focus:ring-primary/20 transition-all" />
                            </div>

                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full h-16 rounded-2xl text-xl font-black shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
                            >
                                <Heart className="mr-2 h-5 w-5 fill-current" />
                                {loading ? "Processing..." : `Donate $${amount} Now`}
                            </Button>

                            <p className="text-center text-[10px] text-slate-400 uppercase font-black tracking-widest">
                                Tax-deductible according to local laws
                            </p>
                        </form>
                    </div>

                </div>
            </div>
        </main>
    );
}