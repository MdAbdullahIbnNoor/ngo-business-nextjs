'use client';
export const dynamic = 'force-dynamic';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, ArrowLeft, Image as ImageIcon, Link as LinkIcon, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NewPost() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    coverImage: '',
    category: 'Community Impact',
  });

  // Automatically generate slug from title
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    setForm({ ...form, title, slug });
  };

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        router.push('/admin/posts');
        router.refresh();
      } else {
        alert("Failed to create post. Check if the slug is unique.");
      }
    } catch (error) {
      alert("An error occurred.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mx-auto max-w-5xl px-6 py-24">
      {/* Header Actions */}
      <form onSubmit={submit}>
        <div className="mb-10 flex items-center justify-between">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-primary transition-colors"
          >
            <ArrowLeft size={16} /> Back to Posts
          </button>
          <div className="flex gap-3">
            <Button
              type="submit"
              disabled={loading}
              className="rounded-full bg-primary px-8 shadow-lg shadow-primary/20 hover:scale-105 transition-all"
            >
              {loading ? "Publishing..." : (
                <>
                  <Save size={18} className="mr-2" /> Publish Post
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Post Title</label>
              <input
                required
                type="text"
                placeholder="Enter a catchy title..."
                className="w-full rounded-2xl border border-slate-200 bg-white p-5 text-2xl font-black outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-800 dark:bg-slate-900 dark:text-white transition-all"
                value={form.title}
                onChange={handleTitleChange}
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Body Content (Supports HTML)</label>
              <textarea
                required
                className="w-full rounded-2xl border border-slate-200 bg-white p-6 font-mono text-sm outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-800 dark:bg-slate-900 dark:text-white min-h-[500px] transition-all resize-none"
                placeholder="<p>Start writing your impact story here...</p>"
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
              />
            </div>
          </div>

          {/* Settings Sidebar */}
          <div className="space-y-6">
            <div className="rounded-[2rem] border border-slate-100 bg-slate-50 p-8 dark:border-slate-800 dark:bg-slate-900/50 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-6 text-slate-900 dark:text-white">
                <Sparkles size={18} className="text-primary" />
                <h3 className="font-black text-sm uppercase tracking-wider">Post Settings</h3>
              </div>

              <div className="space-y-5">
                {/* Slug Field */}
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">URL Slug</label>
                  <div className="mt-1 flex items-center rounded-xl border bg-white dark:bg-slate-800 dark:border-slate-700 px-3 group focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                    <LinkIcon size={14} className="text-slate-400" />
                    <input
                      required
                      className="w-full bg-transparent p-3 text-sm outline-none text-slate-600 dark:text-slate-300"
                      value={form.slug}
                      onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    />
                  </div>
                </div>

                {/* Category Selection */}
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Category</label>
                  <select
                    className="mt-1 w-full rounded-xl border bg-white p-3 text-sm font-bold dark:bg-slate-800 dark:border-slate-700 dark:text-white outline-none focus:ring-2 focus:ring-primary/20 appearance-none"
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                  >
                    <option>Community Impact</option>
                    <option>Education</option>
                    <option>Healthcare</option>
                    <option>Disaster Relief</option>
                    <option>Sustainability</option>
                  </select>
                </div>

                {/* Cover Image */}
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Cover Image URL</label>
                  <div className="mt-1 flex items-center rounded-xl border bg-white dark:bg-slate-800 dark:border-slate-700 px-3 group focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                    <ImageIcon size={14} className="text-slate-400" />
                    <input
                      placeholder="https://images.unsplash.com/..."
                      className="w-full bg-transparent p-3 text-sm outline-none text-slate-600 dark:text-slate-300"
                      value={form.coverImage}
                      onChange={(e) => setForm({ ...form, coverImage: e.target.value })}
                    />
                  </div>
                </div>

                {/* Short Excerpt */}
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Search Excerpt</label>
                  <textarea
                    placeholder="Brief summary for social media..."
                    className="mt-1 w-full rounded-xl border bg-white p-4 text-sm dark:bg-slate-800 dark:border-slate-700 dark:text-white outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                    rows={4}
                    value={form.excerpt}
                    onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Preview Hint */}
            <div className="rounded-2xl bg-primary/5 border border-primary/10 p-4">
              <p className="text-[11px] text-primary font-bold leading-relaxed">
                Tip: Use standard HTML tags like &lt;strong&gt; or &lt;h2&gt; to format your content area.
              </p>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}