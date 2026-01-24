import { NextResponse } from 'next/server';
import Contact from '@/lib/models/Contact';
import { connectDB } from '@/lib/db';

export async function POST(req: Request) {
  await connectDB();
  const data = await req.json();
  const doc = await Contact.create(data);
  return NextResponse.json(doc, { status: 201 });
}

export async function GET() {
  await connectDB();
  const docs = await Contact.find().sort({ createdAt: -1 });
  return NextResponse.json(docs);
}