'use client';
export const dynamic = 'force-dynamic';
import { useState } from 'react';
import { Heart, ShieldCheck, Zap, Globe, Loader2, CreditCard, Lock } from 'lucide-react';
import { Button } from "@/components/ui/button";

const PRESET_AMOUNTS = [10, 25, 50, 100, 250, 500];

export default function DonatePage() {
    const [amount, setAmount] = useState<number | string>(50);
    const [frequency, setFrequency] = useState('once');
    const [loading, setLoading] = useState(false);
    const [paymentStep, setPaymentStep] = useState(false); // Controls the dummy gateway view

    // Form States
    const [donorInfo, setDonorInfo] = useState({ name: '', email: '', project: 'General Fund' });
    const [cardInfo, setCardInfo] = useState({ number: '', expiry: '', cvc: '' });

    const handleInitialSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setPaymentStep(true); // Move to dummy card info step
    };

    const handleFinalPayment = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("/api/donate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: donorInfo.name,
                    email: donorInfo.email,
                    amount: amount,
                    frequency: frequency,
                    project: donorInfo.project,
                    cardNumber: cardInfo.number // API will handle last 4 digits
                }),
            });

            if (res.ok) {
                alert(`Success! Thank you for your donation of $${amount}`);
                // Reset form
                setPaymentStep(false);
                setAmount(50);
                setDonorInfo({ name: '', email: '', project: 'General Fund' });
            }
        } catch (error) {
            alert("Payment failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-slate-50 pt-24 pb-20 dark:bg-slate-950">
            <div className="mx-auto max-w-5xl px-6">
                <div className="grid gap-12 lg:grid-cols-2 items-start">

                    {/* Left: Impact Summary (Static) */}
                    <div className="space-y-8">
                        <div>
                            <h1 className="text-4xl font-black tracking-tighter text-slate-900 dark:text-white md:text-6xl">
                                Make an <span className="text-primary">Impact</span>
                            </h1>
                            <p className="mt-6 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                Your contribution provides clean water, education, and medical care. 100% of your donation goes directly to the field.
                            </p>
                        </div>

                        <div className="grid gap-4">
                            <div className="flex items-center gap-4 rounded-2xl bg-white dark:bg-slate-900 p-4 border shadow-sm">
                                <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-xl text-blue-600"><Zap className="h-6 w-6" /></div>
                                <div>
                                    <p className="font-bold text-slate-900 dark:text-white">$25 provides</p>
                                    <p className="text-sm text-slate-500">School supplies for 5 children</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 rounded-2xl bg-white dark:bg-slate-900 p-4 border shadow-sm">
                                <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-xl text-green-600"><Globe className="h-6 w-6" /></div>
                                <div>
                                    <p className="font-bold text-slate-900 dark:text-white">$100 provides</p>
                                    <p className="text-sm text-slate-500">Clean water for a whole village</p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-[2rem] bg-primary p-8 text-white shadow-xl shadow-primary/20">
                            <ShieldCheck className="h-10 w-10 mb-4 opacity-80" />
                            <h3 className="text-xl font-bold mb-2">Secure Donation</h3>
                            <p className="text-primary-foreground/80 text-sm italic">
                                "We use industry-standard encryption. Your transaction is 100% secure and private."
                            </p>
                        </div>
                    </div>

                    {/* Right: Donation Card with Steps */}
                    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border shadow-2xl shadow-slate-200 dark:shadow-none overflow-hidden">
                        {!paymentStep ? (
                            <>
                                <div className="flex border-b dark:border-slate-800">
                                    <button
                                        onClick={() => setFrequency('once')}
                                        className={`flex-1 py-4 text-sm font-black uppercase tracking-widest transition-all ${frequency === 'once' ? 'bg-white dark:bg-slate-900 text-primary' : 'bg-slate-50 dark:bg-slate-800/50 text-slate-400'}`}
                                    > One-Time </button>
                                    <button
                                        onClick={() => setFrequency('monthly')}
                                        className={`flex-1 py-4 text-sm font-black uppercase tracking-widest transition-all ${frequency === 'monthly' ? 'bg-white dark:bg-slate-900 text-primary' : 'bg-slate-50 dark:bg-slate-800/50 text-slate-400'}`}
                                    > Monthly </button>
                                </div>

                                <form onSubmit={handleInitialSubmit} className="p-8 md:p-10 space-y-6">
                                    <div className="grid grid-cols-3 gap-3">
                                        {PRESET_AMOUNTS.map((val) => (
                                            <button
                                                key={val} type="button"
                                                onClick={() => setAmount(val)}
                                                className={`rounded-xl py-3 font-bold border-2 transition-all ${amount === val ? 'border-primary bg-primary/5 text-primary' : 'border-slate-100 dark:border-slate-800 text-slate-500 hover:border-slate-200'}`}
                                            > ${val} </button>
                                        ))}
                                    </div>

                                    <div className="relative">
                                        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                                        <input
                                            type="number" required value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                            placeholder="Other Amount"
                                            className="w-full rounded-2xl border dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 pl-10 pr-5 py-4 font-bold outline-none focus:ring-2 focus:ring-primary/20"
                                        />
                                    </div>

                                    <div className="space-y-4">
                                        <input
                                            required placeholder="Full Name"
                                            className="w-full rounded-2xl border dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 px-5 py-3 outline-none"
                                            value={donorInfo.name}
                                            onChange={(e) => setDonorInfo({ ...donorInfo, name: e.target.value })}
                                        />
                                        <input
                                            type="email" required placeholder="Email Address"
                                            className="w-full rounded-2xl border dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 px-5 py-3 outline-none"
                                            value={donorInfo.email}
                                            onChange={(e) => setDonorInfo({ ...donorInfo, email: e.target.value })}
                                        />
                                        <select
                                            className="w-full rounded-2xl border dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 px-5 py-3 outline-none"
                                            value={donorInfo.project}
                                            onChange={(e) => setDonorInfo({ ...donorInfo, project: e.target.value })}
                                        >
                                            <option value="General Fund">General Fund</option>
                                            <option value="Education Project">Education Project</option>
                                            <option value="Health Clinic">Health Clinic</option>
                                        </select>
                                    </div>

                                    <Button type="submit" className="w-full h-16 rounded-2xl text-xl font-black transition-all">
                                        Continue to Payment
                                    </Button>
                                </form>
                            </>
                        ) : (
                            /* Dummy Gateway View */
                            <div className="p-8 md:p-12 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="flex items-center justify-between">
                                    <button onClick={() => setPaymentStep(false)} className="text-sm font-bold text-primary hover:underline">← Go Back</button>
                                    <Lock size={16} className="text-slate-400" />
                                </div>

                                <div className="text-center space-y-2">
                                    <div className="mx-auto w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-600">
                                        <CreditCard size={32} />
                                    </div>
                                    <h3 className="text-2xl font-black">Secure Checkout</h3>
                                    <p className="text-slate-500 font-medium text-sm">Amount to pay: <span className="text-slate-900 dark:text-white">${amount}</span></p>
                                </div>

                                <form onSubmit={handleFinalPayment} className="space-y-4">
                                    <input
                                        required placeholder="Card Number (16 digits)"
                                        className="w-full rounded-2xl border dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 px-5 py-4 font-mono"
                                        maxLength={16}
                                        onChange={(e) => setCardInfo({ ...cardInfo, number: e.target.value })}
                                    />
                                    <div className="grid grid-cols-2 gap-4">
                                        <input required placeholder="MM/YY" className="rounded-2xl border dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 px-5 py-4" onChange={(e) => setCardInfo({ ...cardInfo, expiry: e.target.value })} />
                                        <input required placeholder="CVC" className="rounded-2xl border dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 px-5 py-4" onChange={(e) => setCardInfo({ ...cardInfo, cvc: e.target.value })} />
                                    </div>

                                    <Button disabled={loading} type="submit" className="w-full h-16 rounded-2xl text-xl font-black">
                                        {loading ? <Loader2 className="animate-spin" /> : `Pay $${amount} Now`}
                                    </Button>
                                </form>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </main>
    );
}