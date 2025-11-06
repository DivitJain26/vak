import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/src/config/mongodb';
import Post from '@/src/models/post';
import { checkCommentToxicity } from '@/src/services/toxicityCheck';

export async function POST(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        await dbConnect();
        const { id } = await context.params;
        const commentData = await request.json();

        // Validate required fields
        if (!commentData.content || !commentData.content.trim()) {
            return NextResponse.json(
                { error: 'Comment content is required' },
                { status: 400 }
            );
        }

        // Check if post exists
        const postExists = await Post.findById(id);
        if (!postExists) {
            return NextResponse.json(
                { error: 'Post not found' },
                { status: 404 }
            );
        }

        // Check comment toxicity using Flask API
        const toxicityResult = await checkCommentToxicity(commentData.content)

        // If comment is offensive, return toxicity result for frontend handling
        if (toxicityResult.result === 'Offensive') {
            return NextResponse.json(
                {
                    error: 'Comment contains offensive content',
                    toxicityResult: toxicityResult,
                    requiresEdit: true
                },
                { status: 422 } // 422 Unprocessable Entity
            );
        }

        // If comment is safe or neutral, proceed with saving
        const comment = {
            author: commentData.author || 'Anonymous',
            content: commentData.content.trim(),
            createdAt: new Date(),
            toxicityCheck: {
                result: toxicityResult.result,
                sarcasm: toxicityResult.sarcasm,
                checkedAt: new Date()
            }
        };

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { $push: { comments: comment } },
            { new: true }
        );

        return NextResponse.json({
            post: updatedPost,
            toxicityResult: toxicityResult
        });

    } catch (error) {
        console.error('Error adding comment:', error);

        if (error instanceof Error) {
            return NextResponse.json(
                { error: error.message },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { error: 'Failed to add comment' },
            { status: 500 }
        );
    }
}