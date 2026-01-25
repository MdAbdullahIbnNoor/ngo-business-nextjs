import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import {
  FileText,
  MessageSquare,
  Users,
  Heart,
  ArrowUpRight,
  LayoutDashboard
} from "lucide-react";
import { connectDB } from "@/lib/db";
import Post from "@/lib/models/Post";
import Contact from "@/lib/models/Contact";
import Volunteer from "@/lib/models/Volunteer";

async function getStats() {
  await connectDB();
  const [posts, contacts, volunteers] = await Promise.all([
    Post.countDocuments(),
    Contact.countDocuments(),
    Volunteer.countDocuments(),
  ]);
  return { posts, contacts, volunteers };
}

export default async function AdminHome() {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.email !== process.env.ADMIN_EMAIL) {
    redirect("/signin");
  }

  const stats = await getStats();

  const adminCards = [
    {
      title: "Blog Posts",
      count: stats.posts,
      href: "/admin/posts",
      icon: FileText,
      color: "text-blue-600",
      bg: "bg-blue-100 dark:bg-blue-900/20",
      description: "Manage news and impact stories"
    },
    {
      title: "Messages",
      count: stats.contacts,
      href: "/admin/contacts",
      icon: MessageSquare,
      color: "text-amber-600",
      bg: "bg-amber-100 dark:bg-amber-900/20",
      description: "Review general inquiries"
    },
    {
      title: "Volunteers",
      count: stats.volunteers,
      href: "/admin/volunteers",
      icon: Users,
      color: "text-green-600",
      bg: "bg-green-100 dark:bg-green-900/20",
      description: "New volunteer applications"
    },
    {
      title: "Donations",
      count: 0, // Integrate with Stripe later
      href: "/admin/donations",
      icon: Heart,
      color: "text-rose-600",
      bg: "bg-rose-100 dark:bg-rose-900/20",
      description: "Monitor contribution history"
    }
  ];

  return (
    <section className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 md:p-12">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-10 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-primary font-bold mb-2">
              <LayoutDashboard size={20} />
              <span className="text-xs uppercase tracking-[0.2em]">Management</span>
            </div>
            <h1 className="text-4xl font-black tracking-tighter text-slate-900 dark:text-white">
              Admin <span className="text-primary">Dashboard</span>
            </h1>
          </div>
          <div className="hidden md:block text-right">
            <p className="text-sm font-bold text-slate-900 dark:text-slate-200">{session.user?.name}</p>
            <p className="text-xs text-slate-500">{session.user?.email}</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {adminCards.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="group relative overflow-hidden rounded-[2rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 transition-all hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1"
            >
              <div className={`${card.bg} ${card.color} mb-6 inline-flex p-3 rounded-2xl`}>
                <card.icon size={24} />
              </div>

              <div className="flex items-baseline justify-between">
                <h3 className="text-3xl font-black text-slate-900 dark:text-white">{card.count}</h3>
                <ArrowUpRight className="text-slate-300 group-hover:text-primary transition-colors" size={20} />
              </div>

              <p className="mt-1 font-bold text-slate-900 dark:text-slate-200">{card.title}</p>
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {card.description}
              </p>
            </Link>
          ))}
        </div>

        {/* Quick Actions / Recent Activity Placeholder */}
        <div className="mt-12 rounded-[2.5rem] border border-dashed border-slate-300 dark:border-slate-800 p-12 text-center">
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            System Status: <span className="text-green-500 font-bold">Online</span> • Database: <span className="text-green-500 font-bold">Connected</span>
          </p>
        </div>
      </div>
    </section>
  );
}