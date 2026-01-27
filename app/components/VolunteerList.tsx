"use client";
export const dynamic = 'force-dynamic';
import { useState } from "react";
import { Check, X, MapPin, MessageSquare, Clock, Inbox, CheckCircle2, XCircle } from "lucide-react";

export default function VolunteerList({ initialData }: { initialData: any[] }) {
    const [volunteers, setVolunteers] = useState(initialData);
    const [activeTab, setActiveTab] = useState<'pending' | 'accepted' | 'rejected'>('pending');

    const updateStatus = async (id: string, newStatus: string) => {
        try {
            const res = await fetch(`/api/volunteer/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            });

            if (res.ok) {
                setVolunteers((prev) =>
                    prev.map((v) => (v._id === id ? { ...v, status: newStatus } : v))
                );
            }
        } catch (error) {
            console.error("Failed to update status:", error);
        }
    };

    // Filter logic for tabs
    const filteredList = volunteers.filter(v => v.status === activeTab);

    return (
        <div className="space-y-8">
            {/* --- Tab Navigation --- */}
            <div className="flex border-b border-slate-200 dark:border-slate-800">
                {[
                    { id: 'pending', label: 'Pending', icon: Inbox, color: 'text-amber-500' },
                    { id: 'accepted', label: 'Accepted', icon: CheckCircle2, color: 'text-green-500' },
                    { id: 'rejected', label: 'Rejected', icon: XCircle, color: 'text-red-500' }
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`flex items-center gap-2 px-6 py-4 text-sm font-bold transition-all border-b-2 ${activeTab === tab.id
                            ? 'border-primary text-primary'
                            : 'border-transparent text-slate-500 hover:text-slate-700'
                            }`}
                    >
                        <tab.icon size={18} className={activeTab === tab.id ? 'text-primary' : tab.color} />
                        {tab.label}
                        <span className="ml-1 rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600 dark:bg-slate-800">
                            {volunteers.filter(v => v.status === tab.id).length}
                        </span>
                    </button>
                ))}
            </div>

            {/* --- List Section --- */}
            <div className="grid gap-6">
                {filteredList.length === 0 ? (
                    <div className="py-20 text-center text-slate-400 border-2 border-dashed rounded-[2rem]">
                        No {activeTab} applications found.
                    </div>
                ) : (
                    filteredList.map((v) => (
                        <div
                            key={v._id}
                            className={`group relative overflow-hidden rounded-[2rem] border p-8 transition-all duration-300 bg-white dark:bg-slate-900 ${v.status === "accepted" ? "border-green-200" :
                                v.status === "rejected" ? "border-red-100" : "border-slate-200"
                                }`}
                        >
                            <div className="flex flex-wrap items-start justify-between gap-6">
                                <div className="space-y-4 flex-1">
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">{v.name}</h3>
                                        <p className="text-primary font-medium">{v.email} • {v.phone}</p>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        {v.interests?.map((interest: string) => (
                                            <span key={interest} className="rounded-lg bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-800">
                                                {interest}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="grid gap-2 text-sm text-slate-600 dark:text-slate-400">
                                        <p className="flex items-center gap-2 font-medium">
                                            <MapPin size={14} className="text-primary" /> {v.location}
                                        </p>
                                        <p className="flex items-start gap-2 italic">
                                            <MessageSquare size={14} className="mt-1 text-primary shrink-0" />
                                            "{v.motivation || "No message provided."}"
                                        </p>
                                    </div>
                                </div>

                                {/* --- Action Buttons (Hide based on state) --- */}
                                <div className="flex gap-3">
                                    {activeTab !== 'accepted' && (
                                        <button
                                            onClick={() => updateStatus(v._id, "accepted")}
                                            className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 hover:bg-green-600 hover:text-white transition-all"
                                            title="Accept Volunteer"
                                        >
                                            <Check size={24} strokeWidth={3} />
                                        </button>
                                    )}
                                    {activeTab !== 'rejected' && (
                                        <button
                                            onClick={() => updateStatus(v._id, "rejected")}
                                            className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 hover:bg-red-600 hover:text-white transition-all"
                                            title="Reject Volunteer"
                                        >
                                            <X size={24} strokeWidth={3} />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}