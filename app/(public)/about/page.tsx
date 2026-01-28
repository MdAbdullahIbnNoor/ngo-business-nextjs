import Link from 'next/link';
import Image from 'next/image';
import { connectDB } from '@/lib/db';
import Team from '@/lib/models/Team';
import { Users, Target, Heart, ArrowRight, ShieldCheck, Globe, Linkedin, Twitter } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AboutPage() {
  await connectDB();
  const teamMembers = await Team.find().sort({ order: 1 }).lean();
  console.log("Team Members found:", teamMembers.length);
  const stats = [
    { label: 'Projects Completed', value: '120+', icon: Globe },
    { label: 'Active Volunteers', value: '450+', icon: Users },
    { label: 'Families Helped', value: '5,000+', icon: Heart },
  ];

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950">
      {/* --- Hero Section --- */}
      <section className="relative overflow-hidden bg-slate-900 py-24 text-white lg:py-32">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -left-10 -top-10 h-64 w-64 rounded-full bg-primary blur-3xl"></div>
          <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-blue-600 blur-3xl"></div>
        </div>

        <div className="relative mx-auto max-w-5xl px-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary-foreground backdrop-blur-md">
            <ShieldCheck size={14} className="text-primary" /> Est. 2024
          </span>
          <h1 className="mt-8 text-5xl font-black tracking-tight sm:text-7xl">
            Empowering Dhaka’s <span className="text-primary">Future</span> Together.
          </h1>
          <p className="mt-8 max-w-2xl text-xl leading-relaxed text-slate-300">
            We are a community-driven organization committed to sustainable development and ethical business growth. We bridge the gap between resources and resilience.
          </p>
        </div>
      </section>

      {/* --- Stats Overview --- */}
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid -translate-y-16 grid-cols-1 gap-6 sm:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-2xl transition-all hover:-translate-y-1 dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-4xl font-black text-slate-900 dark:text-white">{stat.value}</div>
                  <div className="mt-2 text-sm font-bold uppercase tracking-wider text-slate-500">{stat.label}</div>
                </div>
                <stat.icon size={40} className="text-primary/20 transition-colors group-hover:text-primary" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- Mission & Values --- */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="grid gap-16 md:grid-cols-2">
          <div className="group space-y-6">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform group-hover:scale-110">
              <Target size={28} />
            </div>
            <h2 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">Our Mission</h2>
            <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400">
              To create an ecosystem where ethical business practices drive social change, ensuring that economic progress in Dhaka benefits everyone, not just a few.
            </p>
          </div>
          <div className="group space-y-6">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 transition-transform group-hover:scale-110">
              <Heart size={28} />
            </div>
            <h2 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">Our Values</h2>
            <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400">
              Transparency, accountability, and community-first thinking. We believe in showing exactly where our funds go and the impact they create on the ground.
            </p>
          </div>
        </div>
      </section>

      {/* --- Team Section --- */}
      <section className="bg-slate-50 py-24 dark:bg-slate-900/50">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-black text-slate-900 dark:text-white sm:text-5xl">The People Behind the Vision</h2>
          </div>

          {/* Fallback UI if DB is empty or connection fails */}
          {teamMembers.length === 0 ? (
            <div className="text-center py-10 border-2 border-dashed rounded-xl text-slate-400">
              No team members found in the database.
            </div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {teamMembers.map((m: any) => (
                <div key={m._id.toString()} className="group overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white p-2 transition-all hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
                  <div className="aspect-square overflow-hidden rounded-[2rem] relative">
                    <Image
                      src={m.image}
                      alt={m.name}
                      fill
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-4">
                    {/* Header with Name and Icons */}
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-xl font-black text-slate-900 dark:text-white leading-tight">
                        {m.name}
                      </h3>

                      {/* Social Icons Container */}
                      <div className="flex gap-3 pt-1 shrink-0 z-20">
                        {m.socials?.linkedin && (
                          <a
                            href={m.socials.linkedin === "#" ? undefined : m.socials.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-500 hover:text-[#0077b5] transition-colors"
                          >
                            <Linkedin size={20} />
                          </a>
                        )}
                        {m.socials?.twitter && (
                          <a
                            href={m.socials.twitter === "#" ? undefined : m.socials.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-500 hover:text-[#1DA1F2] transition-colors"
                          >
                            <Twitter size={20} />
                          </a>
                        )}
                      </div>
                    </div>

                    <p className="text-xs font-bold uppercase tracking-widest text-primary mt-1">
                      {m.role}
                    </p>
                    <p className="mt-4 text-xs leading-relaxed text-muted-foreground line-clamp-3">
                      {m.bio}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* --- Call to Action --- */}
      <section className="mx-auto max-w-5xl px-6 py-32 text-center">
        <div className="rounded-[3rem] bg-primary px-8 py-16 text-white shadow-2xl shadow-primary/30">
          <h2 className="text-4xl font-black sm:text-5xl">Ready to make an impact?</h2>
          <p className="mx-auto mt-6 max-w-lg text-lg opacity-90">
            Join 450+ volunteers already working to transform Dhaka. Your contribution matters.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/volunteer"
              className="group flex items-center gap-2 rounded-full bg-white px-8 py-4 font-bold text-primary transition-transform hover:scale-105"
            >
              Become a Volunteer <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/contact"
              className="rounded-full border-2 border-white/30 px-8 py-4 font-bold text-white transition-colors hover:bg-white/10"
            >
              Partner With Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}