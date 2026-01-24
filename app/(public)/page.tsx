export default function HomePage() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-3xl font-bold">Our mission</h1>
      <p className="mt-3 text-gray-700">
        We empower communities through transparent programs, responsible business, and measurable impact.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        <div className="rounded border p-4">
          <h3 className="font-semibold">Programs</h3>
          <p className="text-sm text-gray-600">Education, health, and livelihoods.</p>
        </div>
        <div className="rounded border p-4">
          <h3 className="font-semibold">Transparency</h3>
          <p className="text-sm text-gray-600">Open reporting and community feedback.</p>
        </div>
        <div className="rounded border p-4">
          <h3 className="font-semibold">Partners</h3>
          <p className="text-sm text-gray-600">Collaborations that scale impact.</p>
        </div>
      </div>
    </section>
  );
}