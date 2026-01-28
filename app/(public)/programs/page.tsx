import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
export const dynamic = 'force-dynamic';
import { connectDB } from '@/lib/db';
import Program from '@/lib/models/Program';

async function getPrograms() {
    await connectDB();
    try {
        const programs = await Program.find().lean();
        return JSON.parse(JSON.stringify(programs));
    } catch (error) {
        throw new Error('Failed to fetch programs data');
    }
}

export default async function ProgramsPage() {
    const programs = await getPrograms();

    return (
        <main className="min-h-screen bg-background">
            {/* --- Header --- */}
            <section className="border-b bg-card/50 py-36">
                <div className="mx-auto max-w-5xl px-6">
                    <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                        Our <span className="text-primary">Programs</span>
                    </h1>
                    <p className="mt-4 max-w-2xl text-lg text-muted-foreground leading-relaxed">
                        Empowering communities through sustainable infrastructure and education.
                    </p>
                </div>
            </section>

            {/* --- Programs Grid --- */}
            <section className="mx-auto max-w-5xl px-6 py-16">
                <div className="grid gap-8">
                    {programs.map((p: any) => (
                        <div
                            key={p._id?.toString() || p.slug || Math.random()}
                            className="group grid grid-cols-1 overflow-hidden rounded-2xl border bg-card transition-all hover:border-primary/30 hover:shadow-md md:grid-cols-3 md:h-64"
                        >
                            {/* --- IMAGE AREA (Takes up 1 of 3 columns) --- */}
                            <div className="relative h-64 w-full overflow-hidden bg-muted md:h-full">
                                <img
                                    src={p.image}
                                    alt={p.title}
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>

                            {/* --- CONTENT AREA (Takes up 2 of 3 columns) --- */}
                            <div className="flex flex-col justify-between p-6 md:col-span-2 lg:p-8">
                                <div>
                                    <div className="flex items-center justify-between">
                                        <span className="rounded-md bg-primary/10 px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-primary">
                                            {p.category}
                                        </span>
                                        <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                                            {p.status}
                                        </span>
                                    </div>

                                    <h3 className="mt-3 text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                                        {p.title}
                                    </h3>

                                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                                        {p.description}
                                    </p>
                                </div>

                                <div className="mt-4 flex items-center justify-between border-t border-border/50 pt-4 pb-8 md:pt-6">
                                    <div className="flex flex-col mt-8">
                                        <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">Proven Impact</span>
                                        <span className="text-sm font-bold text-foreground">{p.impact}</span>
                                    </div>

                                    <Link
                                        href={`/programs/${p.slug || p._id.toString()}`}
                                        className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-xs font-bold text-primary-foreground transition-all hover:bg-primary/90"
                                    >
                                        View Details
                                        <ArrowRight className="h-3.5 w-3.5" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}