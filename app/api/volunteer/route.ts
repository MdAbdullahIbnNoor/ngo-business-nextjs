import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Volunteer from '@/lib/models/Volunteer'; // Ensure lowercase matches your filename if applicable

// --- GET: Fetch all applications for Admin ---
export async function GET() {
    try {
        await connectDB();
        const volunteers = await Volunteer.find().sort({ createdAt: -1 });
        return NextResponse.json(volunteers);
    } catch (error) {
        console.error('Volunteer Fetch Error:', error);
        return NextResponse.json({ error: 'Failed to fetch applications' }, { status: 500 });
    }
}

// --- POST: Handle public form submission ---
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, phone, location, interests, motivation } = body;

        // 1. Basic Validation
        if (!name || !email || !phone || !location) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // 2. Connect to DB
        await connectDB();

        // 3. Save to Database
        const newVolunteer = await Volunteer.create({
            name,
            email,
            phone,
            location,
            interests: Array.isArray(interests) ? interests : [], // Ensure it's an array
            motivation,
            status: 'pending' // Explicitly set initial status
        });

        return NextResponse.json({
            message: 'Application submitted!',
            id: newVolunteer._id
        }, { status: 201 });

    } catch (error: any) {
        console.error('Volunteer API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}