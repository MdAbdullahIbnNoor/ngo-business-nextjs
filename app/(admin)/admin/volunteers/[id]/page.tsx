
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Volunteer from '@/lib/models/Volunteer';

export async function PATCH(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB();
        const { status } = await req.json();
        const { id } = params;

        const updated = await Volunteer.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        return NextResponse.json(updated);
    } catch (error) {
        return NextResponse.json({ error: "Update failed" }, { status: 500 });
    }
}