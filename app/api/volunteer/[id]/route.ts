import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Volunteer from '@/lib/models/Volunteer';

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ id: string }> } // In Next 15, params is a Promise
) {
    try {
        await connectDB();
        const { status } = await req.json();
        const { id } = await params; // Await the params

        if (!id) {
            return NextResponse.json({ error: "ID is required" }, { status: 400 });
        }

        const updated = await Volunteer.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!updated) {
            return NextResponse.json({ error: "Volunteer not found" }, { status: 404 });
        }

        return NextResponse.json(updated);
    } catch (error) {
        console.error("Update Error:", error);
        return NextResponse.json({ error: "Update failed" }, { status: 500 });
    }
}