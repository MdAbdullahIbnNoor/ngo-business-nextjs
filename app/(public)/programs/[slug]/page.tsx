import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, MapPin, Target, CheckCircle2, Calendar, Share2, Users, Clock, Zap, Quote } from 'lucide-react';

// 1. Fetch function to get specific program data
async function getProgramData(slug: string) {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    try {
        const res = await fetch(`${baseUrl}/programsData.json`, {
            next: { revalidate: 3600 }
        });

        if (!res.ok) return undefined;

        const programs = await res.json();
        return programs.find((p: any) => p.id === slug);
    } catch (error) {
        console.error("Fetch error:", error);
        return undefined;
    }
}

export default async function ProgramDetailPage({
    params
}: {
    params: Promise<{ slug: string }>
}) {
    const resolvedParams = await params;
    const program = await getProgramData(resolvedParams.slug);

    if (!program) {
        notFound();
    }

    // Defensive calculation for funding progress
    const raisedStr = program?.raised ?? "0";
    const goalStr = program?.fundingGoal ?? "1";
    const raisedNum = parseInt(raisedStr.replace(/[^0-9]/g, '')) || 0;
    const goalNum = parseInt(goalStr.replace(/[^0-9]/g, '')) || 1;
    const fundingPercentage = Math.min(Math.round((raisedNum / goalNum) * 100), 100);

    return (
        <main className="min-h-screen bg-background mt-24 pb-20">
            {/* Navigation Header */}
            <div className="mx-auto max-w-5xl px-6 pt-8">
                <Link
                    href="/programs"
                    className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                    <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                    Back to Programs
                </Link>
            </div>

            {/* Hero Section */}
            <section className="mx-auto mt-8 max-w-5xl px-6">
                <div className="relative h-[300px] w-full overflow-hidden rounded-3xl md:h-[450px]">
                    <img
                        src={program.image}
                        alt={program.title}
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 text-white">
                        <span className="inline-block rounded-full bg-primary px-4 py-1.5 text-xs font-bold uppercase tracking-widest">
                            {program.category}
                        </span>
                        <h1 className="mt-4 text-3xl font-bold md:text-5xl lg:text-6xl">
                            {program.title}
                        </h1>
                    </div>
                </div>
            </section>

            {/* Main Content Grid */}
            <section className="mx-auto grid max-w-5xl gap-12 px-6 py-16 md:grid-cols-2">

                {/* Left Column: Descriptions (Spans 2 columns) */}
                <div className="md:col-span-1 space-y-12">
                    {/* Project Overview */}
                    <div>
                        <h2 className="text-2xl font-bold flex items-center gap-2 text-foreground">
                            <Target className="h-6 w-6 text-primary" />
                            Project Overview
                        </h2>
                        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                            {program.longDescription}
                        </p>
                    </div>

                    {/* New: Highlights Grid */}
                    <div className="grid gap-4 sm:grid-cols-3">
                        {program.highlights?.map((highlight: string, i: number) => (
                            <div key={i} className="flex flex-col gap-2 rounded-2xl border bg-card p-5 shadow-sm">
                                <Zap className="h-5 w-5 text-primary" />
                                <span className="text-sm font-semibold leading-tight">{highlight}</span>
                            </div>
                        ))}
                    </div>

                    {/* Key Objectives */}
                    <div className="rounded-2xl bg-secondary/30 p-8 border border-border mt-8">
                        <h3 className="text-xl font-bold mb-6 text-foreground">Key Objectives</h3>
                        <ul className="grid gap-4">
                            {program.goals.map((goal: string, i: number) => (
                                <li key={i} className="flex items-start gap-4">
                                    <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                                        <CheckCircle2 className="h-4 w-4" />
                                    </div>
                                    <span className="text-foreground/80">{goal}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* New: Testimonial */}
                    {program.testimonial && (
                        <div className="rounded-2xl bg-primary/5 p-8 border-l-4 border-primary italic text-lg text-muted-foreground">
                            <Quote className="h-8 w-8 text-primary/20 mb-4" />
                            <p className="mb-4">"{program.testimonial.quote}"</p>
                            <cite className="not-italic font-bold text-foreground text-sm">— {program.testimonial.author}</cite>
                        </div>
                    )}
                </div>

                {/* Right Column: Sidebar Stats (Spans 1 column) */}
                <div className="space-y-6">
                    <div className="sticky top-24 rounded-2xl border bg-card p-6 shadow-sm ring-1 ring-primary/5">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Current Impact</h3>
                        <div className="mt-6 mb-4 text-4xl font-extrabold text-primary">{program.impact}</div>

                        {/* New: Funding Progress Bar */}
                        <div className="my-8 space-y-3">
                            <div className="flex justify-between text-sm font-bold">
                                <span>{fundingPercentage}% Funded</span>
                                <span className="text-muted-foreground">{program.raised}</span>
                            </div>
                            <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
                                <div
                                    className="h-full bg-primary transition-all duration-1000"
                                    style={{ width: `${fundingPercentage}%` }}
                                />
                            </div>
                            <p className="text-[11px] text-muted-foreground">Goal: {program.fundingGoal}</p>
                        </div>

                        <hr className="mb-8 border-border" />

                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                <MapPin className="h-5 w-5 text-primary" />
                                <div className="flex flex-col">
                                    <span className="font-bold text-foreground">Location</span>
                                    {program.location}
                                </div>
                            </div>

                            {/* New: Beneficiaries */}
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                <Users className="h-5 w-5 text-primary" />
                                <div className="flex flex-col">
                                    <span className="font-bold text-foreground">Beneficiaries</span>
                                    {program.beneficiaries}
                                </div>
                            </div>

                            {/* New: Duration */}
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                <Clock className="h-5 w-5 text-primary" />
                                <div className="flex flex-col">
                                    <span className="font-bold text-foreground">Duration</span>
                                    {program.duration}
                                </div>
                            </div>

                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                <Calendar className="h-5 w-5 text-primary" />
                                <div className="flex flex-col">
                                    <span className="font-bold text-foreground">Status</span>
                                    {program.status}
                                </div>
                            </div>
                        </div>

                        <button className="mt-8 w-full rounded-xl bg-primary py-4 text-center font-bold text-primary-foreground transition-all hover:opacity-90 active:scale-[0.98] shadow-lg shadow-primary/20">
                            Support This Cause
                        </button>

                        <button className="mt-3 w-full flex items-center justify-center gap-2 rounded-xl border border-border py-3 text-sm font-bold text-foreground hover:bg-secondary transition-colors">
                            <Share2 className="h-4 w-4" /> Share Program
                        </button>
                    </div>
                </div>
            </section>
        </main>
    );
}