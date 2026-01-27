import Link from 'next/link';
import { Plus, Edit3, Calendar, Tag } from 'lucide-react';
import { connectDB } from '@/lib/db';
import Post from '@/lib/models/Post';

export const dynamic = 'force-dynamic';

async function getPosts() {
  await connectDB();
  // Fetch and convert to plain objects to avoid serialization issues
  const posts = await Post.find().sort({ createdAt: -1 }).lean();
  return posts;
}

export default async function AdminPosts() {
  const posts = await getPosts();

  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <div className="flex items-center justify-between border-b pb-8 dark:border-slate-800">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Manage Posts</h1>
          <p className="text-slate-500 text-sm mt-1">Create and organize your news stories.</p>
        </div>
        <Link
          href="/admin/posts/new"
          className="flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-bold text-white shadow-lg shadow-primary/20 transition-transform hover:scale-105"
        >
          <Plus size={18} /> New Post
        </Link>
      </div>

      <div className="mt-10 grid gap-4">
        {posts.map((p: any) => {
          // Explicitly convert _id to string
          const postId = p._id.toString();

          return (
            <div key={postId} className="group flex items-center justify-between rounded-3xl border border-slate-100 bg-white p-6 transition-all hover:border-primary/20 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-primary">
                  <span className="flex items-center gap-1"><Tag size={12} /> {p.category || "General"}</span>
                  <span className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                  <span className="flex items-center gap-1 text-slate-400">
                    <Calendar size={12} /> {p.createdAt ? new Date(p.createdAt).toLocaleDateString() : 'No Date'}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">{p.title}</h3>
              </div>

              <div className="flex gap-2">
                <Link
                  href={`/admin/posts/${postId}`}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-50 text-slate-600 hover:bg-primary/10 hover:text-primary transition-colors dark:bg-slate-800 dark:text-slate-400"
                >
                  <Edit3 size={18} />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}