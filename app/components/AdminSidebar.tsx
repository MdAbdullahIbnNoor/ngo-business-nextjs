"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText, MessageSquare, Users, Heart, LogOut, Home } from "lucide-react";

export default function AdminSidebar() {
    const pathname = usePathname();

    const menuItems = [
        { icon: LayoutDashboard, label: "Overview", href: "/admin" },
        { icon: FileText, label: "Blog Posts", href: "/admin/posts" },
        { icon: Users, label: "Volunteers", href: "/admin/volunteers" },
        { icon: Heart, label: "Donations", href: "/admin/donations" },
        { icon: MessageSquare, label: "Messages", href: "/admin/contacts" },
    ];

    return (
        <aside className="fixed left-0 top-0 hidden h-screen w-64 flex-col border-r bg-white dark:bg-slate-900 dark:border-slate-800 lg:flex">
            <div className="flex h-20 items-center px-8 border-b dark:border-slate-800">
                <span className="text-2xl font-bold tracking-tight text-foreground dark:text-white pl-8">
                    NGO<span className="text-primary">Site</span>
                </span>
            </div>

            <nav className="flex-1 space-y-2 p-4 mt-4">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold transition-all ${isActive
                                ? "bg-primary text-white shadow-lg shadow-primary/20"
                                : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                                }`}
                        >
                            <item.icon size={20} />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t dark:border-slate-800 space-y-2">
                <Link href="/" className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800">
                    <Home size={20} />
                    Back to Site
                </Link>
            </div>
        </aside>
    );
}