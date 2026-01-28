import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import mongoose from 'mongoose';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        await connectDB();
        const db = mongoose.connection.db;

        if (!db) {
            return NextResponse.json({ error: 'Database connection not established' }, { status: 500 });
        }

        const collections = await db.listCollections().toArray();
        const collectionNames = collections.map(c => c.name);

        // Also check if we can find anything in 'teams'
        const teamsCount = await db.collection('teams').countDocuments();
        const teamCountSingle = await db.collection('team').countDocuments();

        return NextResponse.json({
            database: db.databaseName,
            collections: collectionNames,
            teamsCount,
            teamCountSingle,
            readyState: mongoose.connection.readyState,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
