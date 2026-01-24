'use client';

import { useState } from 'react';

export default function NewPost() {
  const [form, setForm] = useState({ title: '', excerpt: '', content: '' });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) location.href = '/admin/posts';
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-2xl font-bold">Create post</h1>
      <form onSubmit={submit} className="mt-6 space-y-4">
        <input className="w-full rounded border p-2" placeholder="Title"
          value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
        <input className="w-full rounded border p-2" placeholder="Excerpt"
          value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} />
        <textarea className="w-full rounded border p-2" rows={10} placeholder="HTML content"
          value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} required />
        <button className="rounded bg-black px-4 py-2 text-white">Save</button>
      </form>
    </section>
  );
}