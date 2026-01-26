import { connectDB } from "@/lib/db";
import Volunteer from "@/lib/models/Volunteer";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function VolunteerDetailsPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    await connectDB();
    const { id } = await params;

    // Fetch volunteer details
    const volunteer = await Volunteer.findById(id).lean();

    if (!volunteer) {
        notFound();
    }

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Volunteer Details</h1>
                <Link
                    href="/admin/volunteers"
                    className="text-blue-600 hover:underline"
                >
                    &larr; Back to List
                </Link>
            </div>

            <div className="bg-white shadow rounded-lg overflow-hidden border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                    <h2 className="text-lg font-semibold">Personal Information</h2>
                </div>

                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-500">Full Name</label>
                        <p className="mt-1 text-lg text-gray-900">{(volunteer as any).name}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-500">Email Address</label>
                        <p className="mt-1 text-lg text-gray-900">{(volunteer as any).email}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-500">Phone</label>
                        <p className="mt-1 text-lg text-gray-900">{(volunteer as any).phone || "N/A"}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-500">Status</label>
                        <span className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-medium ${(volunteer as any).status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                            {(volunteer as any).status}
                        </span>
                    </div>
                </div>

                <div className="px-6 py-4 border-t border-gray-200">
                    <label className="block text-sm font-medium text-gray-500">Bio/Skills</label>
                    <p className="mt-2 text-gray-700 leading-relaxed">
                        {(volunteer as any).bio || "No biography provided."}
                    </p>
                </div>
            </div>
        </div>
    );
}