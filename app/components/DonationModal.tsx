"use client";
export const dynamic = 'force-dynamic';
import { useState } from "react";
import { CreditCard, X, ShieldCheck, Loader2, Heart } from "lucide-react";

export default function DonationModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "", email: "", amount: "", frequency: "once", project: "General Fund",
        cardNumber: "", expiry: "", cvc: ""
    });

    if (!isOpen) return null;

    const handleDonate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (step === 1) return setStep(2);

        setLoading(true);
        const res = await fetch("/api/donate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        if (res.ok) {
            alert(`Success! Transaction Recorded. Thank you, ${formData.name}!`);
            onClose();
            setStep(1);
            setFormData({ name: "", email: "", amount: "", frequency: "once", project: "General Fund", cardNumber: "", expiry: "", cvc: "" });
        }
        setLoading(false);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="relative w-full max-w-md overflow-hidden rounded-[2.5rem] bg-white p-8 shadow-2xl dark:bg-slate-900">
                <button onClick={onClose} className="absolute right-6 top-6 text-slate-400 hover:text-slate-600"><X /></button>

                <div className="mb-6 flex items-center gap-3">
                    <div className="rounded-2xl bg-primary/10 p-3 text-primary"><Heart fill="currentColor" size={24} /></div>
                    <h2 className="text-2xl font-black">Make a Donation</h2>
                </div>

                <form onSubmit={handleDonate} className="space-y-4">
                    {step === 1 ? (
                        <div className="space-y-4 animate-in fade-in zoom-in-95 duration-300">
                            {/* Frequency Toggle */}
                            <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
                                {['once', 'monthly'].map((f) => (
                                    <button
                                        key={f} type="button"
                                        onClick={() => setFormData({ ...formData, frequency: f })}
                                        className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${formData.frequency === f ? 'bg-white shadow-sm text-primary' : 'text-slate-500'}`}
                                    >
                                        {f.charAt(0).toUpperCase() + f.slice(1)}
                                    </button>
                                ))}
                            </div>

                            <input required placeholder="Full Name" className="w-full rounded-xl border p-3 dark:bg-slate-800 dark:border-slate-700" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                            <input required type="email" placeholder="Email" className="w-full rounded-xl border p-3 dark:bg-slate-800 dark:border-slate-700" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />

                            <select className="w-full rounded-xl border p-3 dark:bg-slate-800 dark:border-slate-700" value={formData.project} onChange={e => setFormData({ ...formData, project: e.target.value })}>
                                <option value="General Fund">General Fund</option>
                                <option value="Education Project">Education Project</option>
                                <option value="Health Clinic">Health Clinic</option>
                                <option value="Food Drive">Food Drive</option>
                            </select>

                            <div className="relative">
                                <span className="absolute left-4 top-3 font-bold text-slate-400">$</span>
                                <input required type="number" placeholder="Amount" className="w-full rounded-xl border pl-8 p-3 dark:bg-slate-800 dark:border-slate-700" value={formData.amount} onChange={e => setFormData({ ...formData, amount: e.target.value })} />
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl text-blue-600 dark:text-blue-400 text-sm font-medium">
                                Testing Mode: You can enter any 16-digit number.
                            </div>
                            <input required placeholder="Card Number" className="w-full rounded-xl border p-3 dark:bg-slate-800 dark:border-slate-700" maxLength={16} value={formData.cardNumber} onChange={e => setFormData({ ...formData, cardNumber: e.target.value })} />
                            <div className="grid grid-cols-2 gap-4">
                                <input required placeholder="MM/YY" className="rounded-xl border p-3 dark:bg-slate-800 dark:border-slate-700" value={formData.expiry} onChange={e => setFormData({ ...formData, expiry: e.target.value })} />
                                <input required placeholder="CVC" className="rounded-xl border p-3 dark:bg-slate-800 dark:border-slate-700" value={formData.cvc} onChange={e => setFormData({ ...formData, cvc: e.target.value })} />
                            </div>
                        </div>
                    )}

                    <button disabled={loading} className="w-full rounded-full bg-primary py-4 font-bold text-white transition-all hover:bg-primary/90 active:scale-95 disabled:opacity-50">
                        {loading ? <Loader2 className="mx-auto animate-spin" /> : step === 1 ? "Next Step" : `Donate $${formData.amount} Now`}
                    </button>
                </form>
            </div>
        </div>
    );
}