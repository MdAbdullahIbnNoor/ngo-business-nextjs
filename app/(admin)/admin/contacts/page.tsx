async function getContacts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/contact`, { cache: 'no-store' });
  return res.json();
}

export default async function AdminContacts() {
  const contacts = await getContacts();
  return (
    <section className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-2xl font-bold">Contact submissions</h1>
      <ul className="mt-6 space-y-3">
        {contacts.map((c: any) => (
          <li key={c._id} className="rounded border p-3">
            <p className="font-semibold">{c.name} — {c.email}</p>
            <p className="text-sm text-gray-700">{c.message}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}