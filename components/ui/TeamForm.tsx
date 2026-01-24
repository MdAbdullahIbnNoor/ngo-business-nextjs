"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import Link from "next/link";

interface TeamFormProps {
    initialData?: any;
    isEditing?: boolean;
}

export default function TeamForm({ initialData, isEditing }: TeamFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: initialData?.name || "",
        role: initialData?.role || "",
        bio: initialData?.bio || "",
        image: initialData?.image || "",
        order: initialData?.order || 0,
        linkedin: initialData?.socials?.linkedin || "",
        twitter: initialData?.socials?.twitter || "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const apiEndpoint = isEditing
            ? `/api/team/${initialData._id}`
            : `/api/team`;

        const method = isEditing ? "PUT" : "POST";

        try {
            const res = await fetch(apiEndpoint, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    socials: { linkedin: formData.linkedin, twitter: formData.twitter }
                }),
            });

            if (res.ok) {
                router.push("/admin/team");
                router.refresh();
            }
        } catch (error) {
            console.error("Failed to save member:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mx-auto max-w-3xl px-6 py-12">
            <Link href="/admin/team" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8">
                <ArrowLeft size={16} /> Back to Team List
            </Link>

            <h1 className="text-3xl font-black mb-10">
                {isEditing ? "Edit Team Member" : "Add New Member"}
            </h1>

            <form onSubmit={handleSubmit} className="grid gap-6">
                <div className="grid gap-4 rounded-3xl border bg-card p-8">
                    <div className="grid gap-2">
                        <label className="text-sm font-bold uppercase tracking-widest">Full Name</label>
                        <input
                            required
                            className="rounded-xl border bg-background px-4 py-3"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="e.g. Abdullah Al-Mansur"
                        />
                    </div>

                    <div className="grid gap-2">
                        <label className="text-sm font-bold uppercase tracking-widest">Role</label>
                        <input
                            required
                            className="rounded-xl border bg-background px-4 py-3"
                            value={formData.role}
                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                            placeholder="e.g. Founder & Director"
                        />
                    </div>

                    <div className="grid gap-2">
                        <label className="text-sm font-bold uppercase tracking-widest">Image URL</label>
                        <input
                            required
                            className="rounded-xl border bg-background px-4 py-3 text-xs font-mono"
                            value={formData.image}
                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                            placeholder="Unsplash URL"
                        />
                    </div>

                    <div className="grid gap-2">
                        <label className="text-sm font-bold uppercase tracking-widest">Bio</label>
                        <textarea
                            required
                            rows={4}
                            className="rounded-xl border bg-background px-4 py-3"
                            value={formData.bio}
                            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                        />
                    </div>
                </div>

                <div className="grid gap-4 rounded-3xl border bg-slate-50 p-8 dark:bg-slate-900">
                    <h2 className="font-bold">Social Links & Order</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            className="rounded-xl border bg-background px-4 py-3 text-sm"
                            placeholder="LinkedIn URL"
                            value={formData.linkedin}
                            onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                        />
                        <input
                            className="rounded-xl border bg-background px-4 py-3 text-sm"
                            placeholder="Twitter URL"
                            value={formData.twitter}
                            onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                        />
                    </div>
                    <div className="grid gap-2">
                        <label className="text-xs font-bold uppercase">Display Order (Higher numbers show last)</label>
                        <input
                            type="number"
                            className="rounded-xl border bg-background px-4 py-3"
                            value={formData.order}
                            onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                        />
                    </div>
                </div>

                <button
                    disabled={loading}
                    type="submit"
                    className="flex items-center justify-center gap-2 rounded-full bg-primary py-4 font-bold text-white transition-all hover:opacity-90 disabled:opacity-50"
                >
                    {loading ? <Loader2 className="animate-spin" /> : <Save size={20} />}
                    {isEditing ? "Update Member" : "Save Member"}
                </button>
            </form>
        </div>
    );
}