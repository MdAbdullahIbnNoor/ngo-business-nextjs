import Link from 'next/link';
import Image from 'next/image';
import { Plus, Edit2, Trash2, UserCircle } from 'lucide-react';
import { connectDB } from '@/lib/db';
import Team from '@/lib/models/Team';

export const dynamic = 'force-dynamic';

export default async function AdminTeamPage() {
    await connectDB();
    const members = await Team.find().sort({ order: 1 }).lean();

    return (
        <main className="mx-auto max-w-5xl px-6 py-24">
            <div className="flex items-center justify-between border-b pb-8">
                <div>
                    <h1 className="text-3xl font-black">Manage Team</h1>
                    <p className="text-slate-500">Add or update the faces of your NGO.</p>
                </div>
                <Link
                    href="/admin/team/new"
                    className="flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-bold text-white transition-transform hover:scale-105"
                >
                    <Plus size={18} /> Add Member
                </Link>
            </div>

            <div className="mt-10 grid gap-4">
                {members.map((m: any) => (
                    <div key={m._id.toString()} className="flex items-center justify-between rounded-2xl border bg-white p-4 dark:bg-slate-900">
                        <div className="flex items-center gap-4">
                            <div className="relative h-12 w-12 overflow-hidden rounded-full">
                                <Image
                                    src={m.image}
                                    alt={m.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div>
                                <h3 className="font-bold">{m.name}</h3>
                                <p className="text-xs text-primary font-semibold uppercase">{m.role}</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Link
                                href={`/admin/team/${m._id.toString()}`}
                                className="p-2 text-slate-400 hover:text-primary transition-colors"
                            >
                                <Edit2 size={20} />
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}