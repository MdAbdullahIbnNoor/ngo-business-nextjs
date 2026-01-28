import Link from 'next/link';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import BlogList from '@/app/components/BlogList'; // We'll create this next
export const dynamic = 'force-dynamic';

import { connectDB } from '@/lib/db';
import Post from '@/lib/models/Post';

async function getPosts() {
  await connectDB();
  const posts = await Post.find().sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(posts));
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <main className="min-h-screen bg-background pb-20 pt-24">
      <section className="mx-auto max-w-6xl px-6">
        <div className="mb-12 border-b pb-8">
          <h1 className="text-4xl font-black tracking-tighter md:text-6xl text-slate-900">
            News & <span className="text-primary">Impact Stories</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Real stories from the field and updates on our global initiatives.
          </p>
        </div>

        {/* This component handles the filtering logic */}
        <BlogList initialPosts={posts} />
      </section>
    </main>
  );
}