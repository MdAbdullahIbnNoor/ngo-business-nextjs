'use client';
export const dynamic = 'force-dynamic';
import { useState } from 'react';
import { Heart, Users, CheckCircle2, ShieldCheck, User, MapPin, Phone, Mail } from 'lucide-react';
import { Button } from "@/components/ui/button";

const INTEREST_OPTIONS = [
    'Education', 'Healthcare', 'Environment',
    'Fundraising', 'Technology', 'Disaster Relief'
];

export default function VolunteerPage() {
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);

        // Constructing the data object
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            location: formData.get('location'),
            interests: formData.getAll('interests'), // Collects all checked boxes as an array
            motivation: formData.get('motivation'),
        };

        try {
            const res = await fetch('/api/volunteer', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                setSubmitted(true);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                const errorData = await res.json();
                alert(errorData.error || "Something went wrong.");
            }
        } catch (err) {
            alert("Network error. Please check your connection.");
        } finally {
            setLoading(false);
        }
    }

    if (submitted) {
        return (
            <main className="min-h-[80vh] flex items-center justify-center pt-24">
                <div className="text-center p-8 max-w-md bg-white rounded-[2.5rem] border shadow-xl">
                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 mb-4">Application Sent!</h2>
                    <p className="text-slate-600 mb-8">
                        Thank you for your interest in volunteering. Our team will review your application and get back to you within 3-5 business days.
                    </p>
                    <Button onClick={() => setSubmitted(false)} variant="outline" className="rounded-full px-8">
                        Back to Form
                    </Button>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-background pt-24 pb-20">
            <div className="mx-auto max-w-7xl px-6 py-12 lg:flex lg:gap-16">

                {/* --- Left Side: Inspiration & Info --- */}
                <div className="lg:w-1/3">
                    <div className="sticky top-32 space-y-8">
                        <div>
                            <span className="inline-block rounded-full bg-primary/10 px-4 py-1 text-xs font-bold uppercase tracking-widest text-primary mb-4">
                                Join the Mission
                            </span>
                            <h1 className="text-4xl font-black tracking-tighter text-slate-900 md:text-5xl">
                                Become a <span className="text-primary">Volunteer</span>
                            </h1>
                            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                                Your time is one of the most valuable gifts you can give. Join our global network of change-makers.
                            </p>
                        </div>

                        <div className="space-y-4">
                            {[
                                "Gain professional experience",
                                "Connect with a global community",
                                "Make a measurable local impact",
                                "Receive a certificate of service"
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
                                        <CheckCircle2 className="h-4 w-4" />
                                    </div>
                                    <span className="text-sm font-medium text-slate-700">{item}</span>
                                </div>
                            ))}
                        </div>

                        <div className="rounded-[2rem] bg-slate-900 p-8 text-white shadow-xl">
                            <div className="flex items-center gap-4 mb-4">
                                <Users className="h-8 w-8 text-primary" />
                                <div className="text-2xl font-black">1,200+</div>
                            </div>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Volunteers currently active across 12 countries. Join them today.
                            </p>
                        </div>
                    </div>
                </div>

                {/* --- Right Side: The Form --- */}
                <div className="mt-12 lg:mt-0 lg:flex-1">
                    <div className="rounded-[2.5rem] border bg-card p-8 shadow-2xl shadow-slate-200/50 md:p-12">
                        <form onSubmit={handleSubmit} className="grid gap-8">

                            {/* 1. Personal Details */}
                            <section>
                                <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
                                    <User className="h-5 w-5 text-primary" /> 1. Personal Details
                                </h3>
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Full Name</label>
                                        <div className="relative">
                                            <input name="name" type="text" required placeholder="John Doe" className="w-full rounded-2xl border bg-slate-50 px-5 py-3 outline-none focus:ring-2 focus:ring-primary/20 transition-all" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Email Address</label>
                                        <input name="email" type="email" required placeholder="john@example.com" className="w-full rounded-2xl border bg-slate-50 px-5 py-3 outline-none focus:ring-2 focus:ring-primary/20 transition-all" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Phone Number</label>
                                        <input name="phone" type="tel" required placeholder="+880 1..." className="w-full rounded-2xl border bg-slate-50 px-5 py-3 outline-none focus:ring-2 focus:ring-primary/20 transition-all" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Location</label>
                                        <input name="location" type="text" required placeholder="City, Country" className="w-full rounded-2xl border bg-slate-50 px-5 py-3 outline-none focus:ring-2 focus:ring-primary/20 transition-all" />
                                    </div>
                                </div>
                            </section>

                            {/* 2. Interests & Skills */}
                            <section>
                                <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
                                    <Heart className="h-5 w-5 text-primary" /> 2. Areas of Interest
                                </h3>
                                <div className="grid gap-3 grid-cols-2 sm:grid-cols-3">
                                    {INTEREST_OPTIONS.map((interest) => (
                                        <label key={interest} className="group relative flex cursor-pointer items-center justify-center rounded-2xl border p-4 text-sm font-bold transition-all hover:bg-slate-50 has-[:checked]:border-primary has-[:checked]:bg-primary/5 has-[:checked]:text-primary text-slate-600">
                                            <input type="checkbox" name="interests" value={interest} className="sr-only" />
                                            {interest}
                                        </label>
                                    ))}
                                </div>
                            </section>

                            {/* 3. Motivation */}
                            <section className="space-y-2">
                                <h3 className="text-xl font-black text-slate-900 mb-4">3. Tell us about yourself</h3>
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Why do you want to volunteer with us?</label>
                                <textarea name="motivation" required rows={4} placeholder="Describe your experience or motivation..." className="w-full rounded-2xl border bg-slate-50 px-5 py-4 outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"></textarea>
                            </section>

                            {/* Privacy Shield */}
                            <div className="flex items-start gap-3 rounded-2xl bg-amber-50 p-4 border border-amber-100">
                                <ShieldCheck className="mt-1 h-5 w-5 text-amber-600 shrink-0" />
                                <p className="text-[11px] text-amber-700 leading-relaxed font-medium">
                                    <strong>Privacy Note:</strong> Your data is protected under our Global Privacy Policy. We will contact you via the provided email only for volunteering purposes.
                                </p>
                            </div>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                size="lg"
                                disabled={loading}
                                className="h-16 rounded-2xl text-lg font-black shadow-xl shadow-primary/20 hover:scale-[1.01] active:scale-95 transition-all"
                            >
                                {loading ? "Processing Application..." : "Send Application"}
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}