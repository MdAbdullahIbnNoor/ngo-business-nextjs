import Link from 'next/link';

async function getPosts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/posts`, { cache: 'no-store' });
  return res.json();
}

export default async function AdminPosts() {
  const posts = await getPosts();
  return (
    <section className="mx-auto max-w-5xl px-4 py-12">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Posts</h1>
        <Link href="/admin/posts/new" className="rounded bg-black px-3 py-2 text-white">New</Link>
      </div>
      <ul className="mt-6 space-y-3">
        {posts.map((p: any) => (
          <li key={p._id} className="flex items-center justify-between rounded border p-3">
            <span>{p.title}</span>
            <div className="flex gap-2">
              <Link href={`/admin/posts/${p._id}`} className="text-blue-600">Edit</Link>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}