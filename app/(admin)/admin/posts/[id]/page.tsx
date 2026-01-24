'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

interface PostForm {
  title: string;
  excerpt: string;
  content: string;
}

export default function EditPostPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();

  const [form, setForm] = useState<PostForm>({ title: '', excerpt: '', content: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch post data
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/posts/${id}`);
        if (!res.ok) {
          setError(`Failed to fetch post (status ${res.status})`);
          return;
        }
        const p = await res.json();
        if (!p) {
          setError('Post not found');
          return;
        }
        setForm({
          title: p.title || '',
          excerpt: p.excerpt || '',
          content: p.content || '',
        });
      } catch (err) {
        setError('Unexpected error while fetching post');
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  // Save changes
  async function save() {
    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        router.push('/admin/posts');
      } else {
        setError('Failed to save post');
      }
    } catch {
      setError('Unexpected error while saving post');
    }
  }

  // Delete post
  async function remove() {
    try {
      const res = await fetch(`/api/posts/${id}`, { method: 'DELETE' });
      if (res.ok) {
        router.push('/admin/posts');
      } else {
        setError('Failed to delete post');
      }
    } catch {
      setError('Unexpected error while deleting post');
    }
  }

  if (loading) {
    return <p className="p-4">Loading post...</p>;
  }

  if (error) {
    return <p className="p-4 text-red-600">{error}</p>;
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-2xl font-bold">Edit Post</h1>
      <div className="mt-6 space-y-4">
        <input
          type="text"
          className="w-full rounded border p-2"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="Title"
        />
        <input
          type="text"
          className="w-full rounded border p-2"
          value={form.excerpt}
          onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
          placeholder="Excerpt"
        />
        <textarea
          className="w-full rounded border p-2"
          rows={10}
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          placeholder="Content"
        />
        <div className="flex gap-2">
          <button
            onClick={save}
            className="rounded bg-black px-4 py-2 text-white hover:bg-gray-800"
          >
            Save
          </button>
          <button
            onClick={remove}
            className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </section>
  );
}