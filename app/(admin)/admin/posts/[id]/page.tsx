'use client';
export const dynamic = 'force-dynamic';
import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { Save, Trash2, ArrowLeft, Image as ImageIcon, Link as LinkIcon, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';



export default function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    coverImage: '',
    category: 'Community Impact',
  });

  useEffect(() => {
    // Safety check: MongoDB IDs are always 24 characters
    if (!id || id.length !== 24) {
      setError("Invalid Post ID format.");
      setLoading(false);
      return;
    }

    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/posts/${id}`, { cache: 'no-store' });

        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.error || "Could not find this post.");
        }

        const p = await res.json();
        setForm({
          title: p.title || '',
          slug: p.slug || '',
          excerpt: p.excerpt || '',
          content: p.content || '',
          coverImage: p.coverImage || '',
          category: p.category || 'Community Impact',
        });
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  async function handleSave() {
    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        router.push('/admin/posts');
        router.refresh();
      } else {
        alert("Failed to save changes.");
      }
    } catch (err) {
      alert("An error occurred while saving.");
    }
  }

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this post?")) return;
    const res = await fetch(`/api/posts/${id}`, { method: 'DELETE' });
    if (res.ok) router.push('/admin/posts');
  }

  if (loading) return <div className="p-24 text-center font-black animate-pulse">Loading post details...</div>;

  if (error) return (
    <div className="p-24 text-center space-y-4">
      <div className="inline-flex p-4 rounded-full bg-red-100 text-red-600 mb-4"><AlertCircle size={32} /></div>
      <h2 className="text-2xl font-black">Post Not Found</h2>
      <p className="text-slate-500">{error}</p>
      <Button onClick={() => router.push('/admin/posts')} variant="outline" className="rounded-full">Back to List</Button>
    </div>
  );

  return (
    <main className="mx-auto max-w-5xl px-6 py-24 min-h-screen dark:bg-slate-950">
      <div className="mb-10 flex items-center justify-between">
        <button onClick={() => router.back()} className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-primary transition-colors">
          <ArrowLeft size={16} /> Back
        </button>
        <div className="flex gap-3">
          <Button onClick={handleDelete} variant="destructive" className="rounded-full px-6 shadow-lg shadow-red-500/20 transition-transform hover:scale-105">
            <Trash2 size={18} className="mr-2" /> Delete
          </Button>
          <Button onClick={handleSave} className="rounded-full bg-primary px-8 shadow-lg shadow-primary/20 transition-transform hover:scale-105">
            <Save size={18} className="mr-2" /> Save Changes
          </Button>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Post Title</label>
            <input
              type="text"
              className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 text-xl font-bold outline-none focus:ring-2 focus:ring-primary/20 dark:text-white"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Content (HTML)</label>
            <textarea
              className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 font-mono text-sm outline-none focus:ring-2 focus:ring-primary/20 dark:text-white min-h-[500px] resize-none"
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 p-6">
            <h3 className="mb-6 font-black text-sm uppercase tracking-wider text-slate-900 dark:text-white">Post Settings</h3>

            <div className="space-y-5">
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">URL Slug</label>
                <div className="mt-1 flex items-center rounded-xl border bg-white dark:bg-slate-800 dark:border-slate-700 px-3">
                  <LinkIcon size={14} className="text-slate-400" />
                  <input
                    className="w-full bg-transparent p-3 text-sm outline-none dark:text-slate-200"
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Category</label>
                <select
                  className="..."
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                >
                  <option value="Impact Story">Impact Story</option>
                  <option value="News">News</option>
                  <option value="Health">Health</option>
                  <option value="Education">Education</option>
                  <option value="Sustainability">Sustainability</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Cover Image URL</label>
                <div className="mt-1 flex items-center rounded-xl border bg-white dark:bg-slate-800 dark:border-slate-700 px-3">
                  <ImageIcon size={14} className="text-slate-400" />
                  <input
                    className="w-full bg-transparent p-3 text-sm outline-none dark:text-slate-200"
                    value={form.coverImage}
                    onChange={(e) => setForm({ ...form, coverImage: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}