export const runtime = "nodejs";

import { NextResponse } from 'next/server';
import dbConnect from '@/src/config/mongodb';
import Post from '@/src/models/post';

export async function GET() {
    try {
        await dbConnect();

        const samplePosts = [
            {
                title: 'Welcome to our Social Platform!',
                content: 'This is a safe space for everyone to share their thoughts and connect with others.',
                author: 'Admin',
                comments: [
                    {
                        author: 'User1',
                        content: 'Great platform! Love the safety features.',
                        createdAt: new Date()
                    }
                ]
            },
            {
                title: 'The Importance of Online Safety',
                content: 'With AI-powered toxicity detection, we can create a better online environment for everyone.',
                author: 'SafetyTeam',
                comments: []
            }
        ];

        // clear old posts
        await Post.deleteMany({});
        // insert new sample data
        await Post.insertMany(samplePosts);

        return NextResponse.json(
            { message: 'Database seeded successfully!' },
            { status: 200 }
        );

    } catch (error) {
        return NextResponse.json(
            { message: 'Error seeding database', error },
            { status: 500 }
        );
    }
}
