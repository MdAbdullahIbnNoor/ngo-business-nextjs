import TeamForm from "@/components/ui/TeamForm";
import { connectDB } from "@/lib/db";
import Team from "@/lib/models/Team";
import { notFound } from "next/navigation";

export default async function EditMemberPage({ params }: { params: Promise<{ id: string }> }) {
    await connectDB();
    const { id } = await params;

    // Use .lean() and convert _id to string for serialization
    const member = await Team.findById(id).lean();

    if (!member) notFound();

    // Convert MongoDB object to plain JS object for the client component
    const serializedMember = JSON.parse(JSON.stringify(member));

    return <TeamForm initialData={serializedMember} isEditing={true} />;
}