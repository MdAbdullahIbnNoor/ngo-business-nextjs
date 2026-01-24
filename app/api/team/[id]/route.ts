import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Team from '@/lib/models/Team';
import mongoose from 'mongoose';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        await connectDB();
        const { id } = await params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
        }

        const member = await Team.findById(id);
        if (!member) return NextResponse.json({ error: "Member not found" }, { status: 404 });

        return NextResponse.json(member);
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        await connectDB();
        const { id } = await params;
        const data = await req.json();
        const updated = await Team.findByIdAndUpdate(id, data, { new: true });
        return NextResponse.json(updated);
    } catch (error) {
        return NextResponse.json({ error: "Update failed" }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        await connectDB();
        const { id } = await params;
        await Team.findByIdAndDelete(id);
        return NextResponse.json({ message: "Member removed" });
    } catch (error) {
        return NextResponse.json({ error: "Delete failed" }, { status: 500 });
    }
}