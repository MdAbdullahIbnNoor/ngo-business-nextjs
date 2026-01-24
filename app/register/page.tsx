'use client';

import { useState } from 'react';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [status, setStatus] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setStatus('Registration successful! You can now log in.');
      setForm({ name: '', email: '', password: '' });
    } else {
      const data = await res.json();
      setStatus(data.error || 'Something went wrong.');
    }
  }

  return (
    <section className="mx-auto max-w-sm px-4 py-12">
      <h1 className="text-2xl font-bold mb-6">Register</h1>
      <form onSubmit={submit} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          className="w-full rounded border p-2"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full rounded border p-2"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full rounded border p-2"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <button className="w-full rounded bg-black px-4 py-2 text-white">
          Register
        </button>
      </form>
      {status && <p className="mt-4 text-sm">{status}</p>}
    </section>
  );
}