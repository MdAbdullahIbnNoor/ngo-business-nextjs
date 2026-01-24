import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Team from '@/lib/models/Team';

export async function GET() {
    try {
        await connectDB();

        // Clear existing team to avoid duplicates during testing
        await Team.deleteMany({});

        const teamData = [
            {
                name: 'Abdullah',
                role: 'Founder',
                bio: 'Leading our vision for a more sustainable and ethical Dhaka since 2015.',
                image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop'
            },
            {
                name: 'Ayesha',
                role: 'Program Lead',
                bio: 'Dedicated to community outreach and building impactful local programs.',
                image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop'
            },
            {
                name: 'Rahim',
                role: 'Operations',
                bio: 'Streamlining our logistics to ensure every donation makes a real difference.',
                image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop'
            },
        ];

        await Team.insertMany(teamData);
        return NextResponse.json({ message: "Team seeded successfully!" });
    } catch (error) {
        return NextResponse.json({ error: "Seeding failed" }, { status: 500 });
    }
}