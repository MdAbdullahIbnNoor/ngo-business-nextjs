import { NextResponse } from 'next/server';
import { connectDB } from '@/app/lib/db';
import Volunteer from '@/app/lib/models/Volunteer';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, phone, location, interests, motivation } = body;

        // 1. Basic Validation
        if (!name || !email || !phone) {
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
            interests,
            motivation,
        });

        return NextResponse.json({ message: 'Application submitted!', id: newVolunteer._id }, { status: 201 });
    } catch (error: any) {
        console.error('Volunteer API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}