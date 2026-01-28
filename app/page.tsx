import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ArrowRight, Heart, Users, Leaf, Globe } from "lucide-react";

export const dynamic = 'force-dynamic';

import { connectDB } from '@/lib/db';
import Program from '@/lib/models/Program';

async function getPrograms() {
  await connectDB();
  try {
    const programs = await Program.find().lean();
    return JSON.parse(JSON.stringify(programs));
  } catch (error) {
    console.error("Error fetching programs from DB:", error);
    return [];
  }
}

export default async function HomePage() {
  // 2. Load the dynamic data
  const programs = await getPrograms();
  // Take only the first 3 programs for the "Core" section
  const corePrograms = programs.slice(0, 3);

  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1535090467336-9501f96eef89?q=80&w=1500&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        </div>

        <div className="relative z-10 container mx-auto px-4 md:px-6 flex flex-col items-start text-left">
          <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary-foreground backdrop-blur-sm mb-6">
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
            Empowering Communities Globally
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 max-w-4xl drop-shadow-md">
            Building a Future Where <br />
            <span className="text-primary-foreground">Everyone Thrives</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl leading-relaxed drop-shadow-sm">
            We provide education, healthcare, and sustainable resources to underprivileged communities. Join us in making a lasting impact.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="rounded-full text-lg px-8 py-6 shadow-xl hover:scale-105 transition-transform" asChild>
              <Link href="/donate">Donate Now</Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full text-lg px-8 py-6 bg-white/10 text-white border-white/20 hover:bg-white/20 backdrop-blur-sm transition-all" asChild>
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="py-12 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="flex flex-col items-center gap-2">
            <Users className="h-8 w-8 opacity-80" />
            <h3 className="text-4xl font-bold">50K+</h3>
            <p className="text-primary-foreground/80 font-medium">Lives Impacted</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Globe className="h-8 w-8 opacity-80" />
            <h3 className="text-4xl font-bold">12</h3>
            <p className="text-primary-foreground/80 font-medium">Countries Served</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Heart className="h-8 w-8 opacity-80" />
            <h3 className="text-4xl font-bold">100%</h3>
            <p className="text-primary-foreground/80 font-medium">Donations to Cause</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Leaf className="h-8 w-8 opacity-80" />
            <h3 className="text-4xl font-bold">200+</h3>
            <p className="text-primary-foreground/80 font-medium">Projects Completed</p>
          </div>
        </div>
      </section>

      {/* Dynamic Programs Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4 text-primary">Our Core Programs</h2>
            <p className="text-muted-foreground text-lg">
              We focus on holistic development through targeted initiatives that address the root causes of poverty and inequality.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {corePrograms.map((program: any) => (
              <Card key={program._id?.toString() || program.slug} className="group overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300 flex flex-col pt-0">
                <div className="relative h-44 overflow-hidden object-cover mt-0">
                  <img
                    src={program.image}
                    alt={program.title}
                    className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-primary shadow-sm">
                      {program.category}
                    </span>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {program.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col flex-grow">
                  <p className="text-muted-foreground mb-6 line-clamp-3">
                    {program.description}
                  </p>
                  <div className="mt-auto">
                    <Button variant="link" className="p-0 h-auto font-semibold text-primary group-hover:text-primary/80" asChild>
                      <Link href={`/programs/${program.slug || program._id.toString()}`} className="flex items-center gap-2">
                        Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button variant="outline" size="lg" className="rounded-full" asChild>
              <Link href="/programs">View All Programs</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 -skew-y-3 transform origin-bottom-right z-0"></div>
        <div className="container relative z-10 mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight mb-6">Ready to Make a Difference?</h2>
          <p className="text-muted-foreground text-lg mb-8">
            Your support can change lives. Whether you volunteer your time or make a donation, you are part of the solution.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="rounded-full px-8 shadow-lg" asChild>
              <Link href="/donate">Donate Today</Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8" asChild>
              <Link href="/volunteer">Become a Volunteer</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}