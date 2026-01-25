import { connectDB } from "@/lib/db";
import Volunteer from "@/lib/models/Volunteer";
import VolunteerList from "../../../components/VolunteerList";

export default async function AdminVolunteersPage() {
    await connectDB();
    // Fetch all applications
    const data = await Volunteer.find().sort({ createdAt: -1 }).lean();

    // Serialize MongoDB data for Client Component
    const volunteers = JSON.parse(JSON.stringify(data));

    return (
        <main className="mx-auto max-w-6xl px-6 py-12">
            <div className="mb-10 border-b pb-8">
                <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">
                    Volunteer Applications
                </h1>
                <p className="mt-2 text-slate-500">
                    Review {volunteers.length} pending applications for your NGO projects.
                </p>
            </div>

            <VolunteerList initialData={volunteers} />
        </main>
    );
}