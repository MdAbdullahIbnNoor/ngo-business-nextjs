import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminHome() {
  // Check session
  const session = await getServerSession(authOptions);

  // If not logged in or not the admin, redirect to sign in
  if (!session || session.user?.email !== process.env.ADMIN_EMAIL) {
    redirect("/signin");
  }

  return (
    <section className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-2xl font-bold">Admin dashboard</h1>
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <Link href="/admin/posts" className="rounded border p-4 hover:bg-muted">
          Manage posts
        </Link>
        <Link href="/admin/contacts" className="rounded border p-4 hover:bg-muted">
          View contacts
        </Link>
      </div>
    </section>
  );
}