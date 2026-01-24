import { NextResponse } from 'next/server';
import Post from '@/app/lib/models/Post';
import { connectDB } from '@/app/lib/db';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const post = await Post.findOne({ slug: params.id });
  if (!post) {
    return NextResponse.json(null, { status: 404 });
  }
  return NextResponse.json(post);
}


export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const data = await req.json();
  const post = await Post.findByIdAndUpdate(params.id, data, { new: true });
  return NextResponse.json(post);
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await connectDB();
  await Post.findByIdAndDelete(params.id);
  return NextResponse.json({ ok: true });
}