import AdminSidebar from "@/app/components/AdminSidebar";
import AdminGuard from "@/app/components/AdminGuard";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminGuard>
      <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
        {/* The Sidebar */}
        <AdminSidebar />

        {/* The Main Content Area */}
        <main className="flex-1 lg:ml-64">
          <div className="p-4 md:p-8 lg:p-12">
            {children}
          </div>
        </main>
      </div>
    </AdminGuard>
  );
}