'use client';

import { useEffect, useState } from 'react';
import { IPost } from '@/src/models/post';
import PostCard from '@/src/components/PostCard';
import CreatePost from '@/src/components/CreatePost';

export default function Home() {
    const [posts, setPosts] = useState<IPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [showCreatePost, setShowCreatePost] = useState(false);

    const fetchPosts = async () => {
        try {
            const response = await fetch('/api/posts');
            const data = await response.json();
            setPosts(data);
        } catch (error) {
            console.error('Failed to fetch posts:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"></div>
                    <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
                <div className="max-w-4xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-linear-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                                S
                            </div>
                            <h1 className="text-2xl font-bold text-gray-900">SocialFeed</h1>
                        </div>
                        <button
                            onClick={() => setShowCreatePost(true)}
                            className="bg-blue-500 text-white px-6 py-2.5 rounded-xl hover:bg-blue-600 transition-colors font-semibold shadow-md hover:shadow-lg"
                        >
                            + Create Post
                        </button>
                    </div>
                </div>
            </header>

            <div className="max-w-2xl mx-auto px-4 py-8">
                {/* Create Post Modal */}
                {showCreatePost && (
                    <CreatePost
                        onPostCreated={() => {
                            setShowCreatePost(false);
                            fetchPosts();
                        }}
                        onCancel={() => setShowCreatePost(false)}
                    />
                )}

                {/* Posts Feed */}
                <main className="space-y-6">
                    {posts.map((post) => (
                        <PostCard
                            key={post._id}
                            post={post}
                            onCommentAdded={fetchPosts}
                        />
                    ))}

                    {posts.length === 0 && (
                        <div className="text-center py-16">
                            <div className="text-6xl mb-4 text-gray-300">📝</div>
                            <h2 className="text-2xl font-semibold text-gray-700 mb-2">No posts yet</h2>
                            <p className="text-gray-500 mb-6">Be the first to share something with the community!</p>
                            <button
                                onClick={() => setShowCreatePost(true)}
                                className="bg-blue-500 text-white px-8 py-3 rounded-xl hover:bg-blue-600 transition-colors font-semibold shadow-md hover:shadow-lg"
                            >
                                Create First Post
                            </button>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}