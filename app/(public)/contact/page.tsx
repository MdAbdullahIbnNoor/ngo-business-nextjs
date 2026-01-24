'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setStatus('idle');

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus('success');
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-white pt-24 pb-20">
      <div className="mx-auto max-w-7xl px-6">

        {/* Header */}
        <div className="mb-16 max-w-3xl">
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1 text-xs font-bold uppercase tracking-widest text-primary mb-4">
            Connect With Us
          </span>
          <h1 className="text-4xl font-black tracking-tighter text-slate-900 md:text-6xl mb-6">
            We’re here to <span className="text-primary">listen.</span>
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            Whether you want to partner, volunteer, or just say hello, we'd love to hear from you.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-12">

          {/* Left Side: Info Cards */}
          <div className="lg:col-span-4 space-y-6">
            <div className="rounded-[2rem] bg-slate-50 p-8 border border-slate-100">
              <h3 className="text-xl font-black text-slate-900 mb-8">Contact Details</h3>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="bg-white p-3 rounded-xl shadow-sm text-primary flex items-center justify-center">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Email us</p>
                    <p className="font-bold text-slate-900 break-all">hello@hopefoundation.org</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-white p-3 rounded-xl shadow-sm text-primary flex items-center justify-center">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Call us</p>
                    <p className="font-bold text-slate-900">+880 1234 567890</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-white p-3 rounded-xl shadow-sm text-primary flex items-center justify-center">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Visit us</p>
                    <p className="font-bold text-slate-900">Gulshan - 2, Dhaka, Bangladesh</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] bg-slate-900 p-8 text-white shadow-xl">
              <div className="flex items-center gap-2 mb-4 text-primary">
                <Clock className="h-5 w-5" />
                <span className="text-xs font-black uppercase tracking-[0.2em]">Our Response Policy</span>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">
                We prioritize urgent inquiries and aim to reply within <strong>24 business hours</strong>.
              </p>
            </div>
          </div>

          {/* Right Side: The Form */}
          <div className="lg:col-span-8">
            <div className="rounded-[2.5rem] border bg-white p-8 md:p-12 shadow-2xl shadow-slate-200/50">

              {status === 'success' ? (
                <div className="text-center py-12 animate-in fade-in zoom-in duration-300">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h2 className="text-3xl font-black text-slate-900 mb-2">Message Received!</h2>
                  <p className="text-slate-500 mb-8">Thank you for reaching out. We'll be in touch soon.</p>
                  <Button onClick={() => setStatus('idle')} variant="outline" className="rounded-full px-8">
                    Send another message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Full Name</label>
                      <input name="name" required type="text" placeholder="Jane Doe" className="w-full rounded-2xl border bg-slate-50 px-5 py-3 outline-none focus:ring-2 focus:ring-primary/20 transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Email Address</label>
                      <input name="email" required type="email" placeholder="jane@example.com" className="w-full rounded-2xl border bg-slate-50 px-5 py-3 outline-none focus:ring-2 focus:ring-primary/20 transition-all" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Subject</label>
                    <select
                      name="subject"
                      required
                      className="w-full rounded-2xl border bg-slate-50 px-5 py-3 outline-none focus:ring-2 focus:ring-primary/20 transition-all appearance-none cursor-pointer"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Partnership">Partnership Proposal</option>
                      <option value="Media">Media & Press</option>
                      <option value="Donation">Donation Question</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Message</label>
                    <textarea name="message" required rows={5} placeholder="How can we help you?" className="w-full rounded-2xl border bg-slate-50 px-5 py-4 outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"></textarea>
                  </div>

                  {status === 'error' && (
                    <div className="flex items-center gap-2 text-red-600 bg-red-50 p-4 rounded-xl border border-red-100">
                      <AlertCircle className="h-5 w-5" />
                      <p className="text-sm font-bold">Failed to send. Please try again.</p>
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full md:w-auto h-14 rounded-2xl px-12 text-md font-black shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95"
                  >
                    {loading ? "Sending..." : "Send Message"}
                    <Send className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}