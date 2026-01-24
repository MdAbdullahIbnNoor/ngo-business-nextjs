import { Users, Target, Rocket, Heart } from 'lucide-react';

export default function AboutPage() {
  const team = [
    {
      name: 'Abdullah',
      role: 'Founder',
      bio: 'Leading our vision for a more sustainable and ethical Dhaka since 2015.'
    },
    {
      name: 'Ayesha',
      role: 'Program Lead',
      bio: 'Dedicated to community outreach and building impactful local programs.'
    },
    {
      name: 'Rahim',
      role: 'Operations',
      bio: 'Streamlining our logistics to ensure every donation makes a real difference.'
    },
  ];

  const stats = [
    { label: 'Projects Completed', value: '120+' },
    { label: 'Volunteers', value: '450+' },
    { label: 'Families Helped', value: '5,000+' },
  ];

  return (
    <main className="min-h-screen">
      {/* --- Hero Section --- */}
      <section className="bg-primary py-24 text-primary-foreground">
        <div className="mx-auto max-w-5xl px-6">
          <span className="inline-block rounded-full bg-primary-foreground/10 px-4 py-1.5 text-sm font-medium tracking-wide">
            Est. 2024
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-6xl">
            Empowering Dhaka’s <br /> Future Together.
          </h1>
          <p className="mt-8 max-w-2xl text-lg opacity-90 leading-relaxed">
            We are a community-driven organization committed to sustainable development and ethical business growth. Our mission is to bridge the gap between resources and those who need them most.
          </p>
        </div>
      </section>

      {/* --- Stats Overview --- */}
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid -translate-y-12 grid-cols-1 gap-4 sm:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-xl border bg-card p-8 text-center shadow-sm">
              <div className="text-3xl font-bold text-primary">{stat.value}</div>
              <div className="mt-1 text-sm font-medium text-muted-foreground uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* --- Values Section --- */}
      <section className="mx-auto max-w-5xl px-6 py-12">
        <div className="grid gap-12 md:grid-cols-2">
          <div className="space-y-4">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-accent text-accent-foreground">
              <Target className="h-6 w-6" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed">
              To create an ecosystem where ethical business practices drive social change, ensuring that economic progress in Dhaka benefits everyone, not just a few.
            </p>
          </div>
          <div className="space-y-4">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-accent text-accent-foreground">
              <Heart className="h-6 w-6" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight">Our Values</h2>
            <p className="text-muted-foreground leading-relaxed">
              Transparency, accountability, and community-first thinking. We believe in showing exactly where our funds go and the impact they create.
            </p>
          </div>
        </div>
      </section>

      {/* --- Team Section --- */}
      <section className="bg-secondary/50 py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight">The People Behind the Vision</h2>
            <p className="mt-4 text-muted-foreground">Our dedicated team of professionals and activists.</p>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {team.map((m) => (
              <div key={m.name} className="group rounded-2xl bg-card border p-6 transition-all hover:shadow-md hover:border-primary/20">
                <div className="mb-4 h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Users className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold">{m.name}</h3>
                <p className="text-sm font-semibold text-primary">{m.role}</p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {m.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Call to Action --- */}
      <section className="mx-auto max-w-5xl px-6 py-24 text-center">
        <h2 className="text-3xl font-bold">Help us make an impact.</h2>
        <p className="mt-4 text-muted-foreground">Whether you want to volunteer, donate, or partner, we’d love to hear from you.</p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <button className="rounded-lg bg-primary px-8 py-3 font-semibold text-primary-foreground hover:opacity-90 transition">
            Become a Volunteer
          </button>
          <button className="rounded-lg border border-primary px-8 py-3 font-semibold text-primary hover:bg-primary/5 transition">
            Contact Us
          </button>
        </div>
      </section>
    </main>
  );
}