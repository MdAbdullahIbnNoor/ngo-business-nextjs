"use client";

import { useState } from "react";
import { Check, X, MapPin, MessageSquare, Clock } from "lucide-react";

export default function VolunteerList({ initialData }: { initialData: any[] }) {
    // Local state to track changes without hitting the DB
    const [volunteers, setVolunteers] = useState(initialData);

    const updateStatus = (id: string, newStatus: string) => {
        setVolunteers((prev) =>
            prev.map((v) => (v._id === id ? { ...v, status: newStatus } : v))
        );
    };

    return (
        <div className="grid gap-6">
            {volunteers.map((v) => (
                <div
                    key={v._id}
                    className={`group relative overflow-hidden rounded-[2rem] border p-8 transition-all duration-300 ${v.status === "accepted" ? "border-green-500 bg-green-50/30 shadow-lg shadow-green-500/5" :
                            v.status === "rejected" ? "border-red-200 bg-slate-50 opacity-60 grayscale" :
                                "border-slate-200 bg-white dark:bg-slate-900"
                        }`}
                >
                    <div className="flex flex-wrap items-start justify-between gap-6">
                        <div className="space-y-4 flex-1">
                            {/* Header Info */}
                            <div>
                                <div className="flex items-center gap-3">
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{v.name}</h3>
                                    <span className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-wider ${v.status === 'accepted' ? 'bg-green-500 text-white' :
                                            v.status === 'rejected' ? 'bg-red-500 text-white' :
                                                'bg-amber-100 text-amber-700'
                                        }`}>
                                        {v.status}
                                    </span>
                                </div>
                                <p className="text-primary font-medium">{v.email} • {v.phone}</p>
                            </div>

                            {/* Interests Tags */}
                            <div className="flex flex-wrap gap-2">
                                {v.interests?.map((interest: string) => (
                                    <span key={interest} className="rounded-lg bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-800">
                                        {interest}
                                    </span>
                                ))}
                            </div>

                            {/* Details */}
                            <div className="grid gap-2 text-sm text-slate-600 dark:text-slate-400">
                                <p className="flex items-center gap-2"><MapPin size={14} className="text-primary" /> {v.location}</p>
                                <p className="flex items-start gap-2 italic">
                                    <MessageSquare size={14} className="mt-1 text-primary shrink-0" />
                                    "{v.motivation || "No motivation message provided."}"
                                </p>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3">
                            <button
                                onClick={() => updateStatus(v._id, "accepted")}
                                className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-all ${v.status === "accepted" ? "bg-green-600 text-white" : "bg-slate-100 text-slate-400 hover:bg-green-600 hover:text-white"
                                    }`}
                                title="Accept"
                            >
                                <Check size={24} strokeWidth={3} />
                            </button>
                            <button
                                onClick={() => updateStatus(v._id, "rejected")}
                                className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-all ${v.status === "rejected" ? "bg-red-600 text-white" : "bg-slate-100 text-slate-400 hover:bg-red-600 hover:text-white"
                                    }`}
                                title="Reject"
                            >
                                <X size={24} strokeWidth={3} />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}