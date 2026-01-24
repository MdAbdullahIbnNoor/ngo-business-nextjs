import { connectDB } from '@/app/lib/db';
import Post from '@/app/lib/models/Post';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Share2, Calendar, User, Clock, Tag } from 'lucide-react';

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  await connectDB();
  const post = await Post.findOne({ slug });

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background pb-24 pt-24">
      <article className="mx-auto max-w-4xl px-6">
        {/* Post Navigation */}
        <Link
          href="/blog"
          className="group mb-8 inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to News
        </Link>

        {/* --- Post Header --- */}
        <header className="mb-12">
          <div className="mb-6 flex flex-wrap items-center gap-4 text-xs font-bold uppercase tracking-[0.2em] text-primary dark:text-white">
            <span className="rounded-md bg-primary/10 px-2 py-1">{post.category || "Community Impact"}</span>
            <span className="h-1 w-1 rounded-full bg-slate-300" />
            <span className="flex items-center gap-1 text-slate-400">
              <Calendar className="h-3 w-3" />
              {new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}
            </span>
            {post.readingTime && (
              <>
                <span className="h-1 w-1 rounded-full bg-slate-300" />
                <span className="flex items-center gap-1 text-slate-400">
                  <Clock className="h-3 w-3" /> {post.readingTime} min read
                </span>
              </>
            )}
          </div>

          <h1 className="text-4xl dark:text-white font-black tracking-tighter text-slate-900 md:text-5xl lg:text-7xl lg:leading-[1.1]">
            {post.title}
          </h1>

          <p className="mt-8 text-xl font-medium leading-relaxed text-slate-500 italic border-l-4 border-primary/20 pl-6">
            {post.excerpt}
          </p>
        </header>

        {/* --- Featured Image --- */}
        {post.coverImage && (
          <div className="mb-12 overflow-hidden rounded-[2.5rem] border shadow-2xl">
            <img
              src={post.coverImage}
              alt={post.title}
              className="aspect-video w-full object-cover"
            />
          </div>
        )}

        {/* --- Author & Social Bar --- */}
        <div className="mb-12 flex items-center justify-between border-y border-slate-100 py-8">
          <div className="flex items-center gap-4">
            {post.author?.image ? (
              <img src={post.author.image} alt={post.author.name} className="h-12 w-12 rounded-full object-cover ring-2 ring-primary/10" />
            ) : (
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">
                <User className="h-6 w-6" />
              </div>
            )}
            <div className="text-sm">
              <p className="font-black text-slate-900 dark:text-white">{post.author?.name || "Hope Foundation Team"}</p>
              <p className="text-slate-500">{post.author?.role || "Field Correspondent"}</p>
            </div>
          </div>

          <div className="flex gap-2">
            <button className="flex items-center gap-2 rounded-full bg-slate-50 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-primary/10 hover:text-primary transition-all">
              <Share2 className="h-4 w-4" /> Share Story
            </button>
          </div>
        </div>

        {/* --- Post Content --- */}
        <div
          className="prose prose-slate max-w-none 
          prose-headings:font-black prose-headings:tracking-tight 
          prose-p:text-lg prose-p:leading-relaxed prose-p:text-slate-600 
          prose-img:rounded-3xl prose-a:text-primary prose-strong:text-slate-900
          prose-blockquote:border-primary prose-blockquote:bg-slate-50 prose-blockquote:py-2 prose-blockquote:rounded-r-xl"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* --- Tags Section --- */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-16 flex flex-wrap gap-2">
            {post.tags.map((tag: string) => (
              <span key={tag} className="flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500">
                <Tag className="h-3 w-3" /> {tag}
              </span>
            ))}
          </div>
        )}

        {/* --- Footer CTA --- */}
        <footer className="mt-20 rounded-[2.5rem] bg-slate-900 p-10 text-white md:p-16">
          <div className="max-w-2xl">
            <h3 className="text-3xl font-black tracking-tight">Help us write the next chapter.</h3>
            <p className="mt-4 text-slate-400 text-lg leading-relaxed">
              Stories like this are only possible through the generosity of people like you. Join our mission to empower more communities.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/donate" className="rounded-full bg-primary px-8 py-3 font-bold text-white transition-all hover:shadow-lg hover:shadow-primary/30 active:scale-95">
                Support This Cause
              </Link>
              <Link href="/programs" className="rounded-full bg-white/10 px-8 py-3 font-bold text-white backdrop-blur-md hover:bg-white/20 transition-all">
                See Our Programs
              </Link>
            </div>
          </div>
        </footer>
      </article>
    </main>
  );
}