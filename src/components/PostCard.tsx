'use client';

import { useState } from 'react';
import { IPost } from '@/src/models/post';
import PostHeader from '@/src/components/PostHeader';
import PostMedia from '@/src/components/PostMedia';
import PostActions from '@/src/components/PostActions';
import CommentsSection from '@/src/components/CommentsSection';

interface PostCardProps {
    post: IPost;
    onCommentAdded: () => void;
}

export default function PostCard({ post, onCommentAdded }: PostCardProps) {
    const [showComments, setShowComments] = useState(false);
    const [likes, setLikes] = useState(post.likes || 0);
    const [isLiked, setIsLiked] = useState(false);

    const handleLike = async () => {
        try {
            const newLikes = isLiked ? likes - 1 : likes + 1;
            setLikes(newLikes);
            setIsLiked(!isLiked);

            await fetch(`/api/posts/${post._id}/like`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ likes: newLikes }),
            });
        } catch (error) {
            console.error('Failed to update likes:', error);
            // Revert on error
            setLikes(likes);
            setIsLiked(!isLiked);
        }
    };

    const handleCommentClick = () => {
        setShowComments(!showComments);
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 mb-6 overflow-hidden hover:shadow-xl transition-all duration-300">
            {/* Post Header */}
            <PostHeader author={post.author} profilePic={post.profilePic} createdAt={post.createdAt} />

            {/* Post Content */}
            <div className="px-6 pb-4">
                <h2 className="text-xl font-bold text-gray-900 mb-3">{post.title}</h2>
                <p className="text-gray-700 leading-relaxed">{post.content}</p>
            </div>

            {/* Media Content */}
            {post.mediaUrl && (
                <PostMedia mediaUrl={post.mediaUrl} mediaType={post.mediaType} />
            )}

            {/* Post Stats */}
            <div className="px-6 py-3 border-y border-gray-100">
                <div className="flex items-center justify-between text-sm text-gray-600">
                    <span className="font-medium">{likes} likes</span>
                    <button
                        onClick={handleCommentClick}
                        className="font-medium hover:text-blue-600 transition-colors"
                    >
                        {post.comments.length} comments
                    </button>
                </div>
            </div>

            {/* Action Buttons */}
            <PostActions
                isLiked={isLiked}
                onLike={handleLike}
                onComment={handleCommentClick}
            />

            {/* Comments Section - Collapsible */}
            {showComments && (
                <CommentsSection
                    comments={post.comments}
                    postId={post._id}
                    onCommentAdded={onCommentAdded}
                />
            )}
        </div>
    );
}