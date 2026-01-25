import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Donation from '@/lib/models/Donation';

export async function POST(req: Request) {
    try {
        await connectDB();
        const body = await req.json();

        // Create a dummy transaction ID (e.g., TXN_123456789)
        const dummyTxnId = `TXN_${Math.random().toString(36).toUpperCase().substring(2, 10)}`;

        const donation = await Donation.create({
            donorName: body.name,
            email: body.email,
            amount: Number(body.amount),
            currency: 'USD', // Matching your model default
            frequency: body.frequency || 'once',
            project: body.project || 'General Fund',
            status: 'completed', // Dummy is auto-completed
            transactionId: dummyTxnId
        });

        return NextResponse.json({ success: true, donation });
    } catch (error) {
        console.error("Donation Error:", error);
        return NextResponse.json({ error: "Processing failed" }, { status: 500 });
    }
}