export const dynamic = 'force-dynamic';

import { connectDB } from '@/lib/db';
import Contact from '@/lib/models/Contact';

async function getContacts() {
  await connectDB();
  const contacts = await Contact.find().sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(contacts));
}

export default async function AdminContacts() {
  const contacts = await getContacts();

  return (
    <section className="mx-auto max-w-5xl px-6 py-12">
      <div className="border-b pb-6">
        <h1 className="text-3xl font-black">Contact Submissions</h1>
        <p className="text-slate-500">Messages received from the website contact form.</p>
      </div>

      {contacts.length === 0 ? (
        <div className="mt-10 rounded-3xl border-2 border-dashed p-20 text-center text-slate-400">
          No messages found.
        </div>
      ) : (
        <ul className="mt-10 space-y-4">
          {contacts.map((c: any) => (
            <li key={c._id} className="rounded-2xl border bg-white p-6 shadow-sm dark:bg-slate-900">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-bold text-lg">{c.name}</p>
                  <p className="text-sm text-primary font-medium">{c.email}</p>
                </div>
                <span className="text-xs text-slate-400">
                  {new Date(c.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="mt-4 text-slate-700 dark:text-slate-300 leading-relaxed italic">
                "{c.message}"
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}