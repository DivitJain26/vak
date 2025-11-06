import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/src/config/mongodb';
import Post from '@/src/models/post';

export async function GET() {
    try {
        await dbConnect();
        const posts = await Post.find().sort({ createdAt: -1 });
        return NextResponse.json(posts);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch posts', details: error },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        await dbConnect();
        const body = await request.json();
        const post = await Post.create(body);
        return NextResponse.json(post, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to create post', details: error },
            { status: 500 }
        );
    }
}
