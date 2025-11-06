'use client';

import { useEffect, useState } from 'react';
import { IPost } from '@/src/models/post';
import PostCard from '@/src/components/PostCard';

export default function Home() {
    const [posts, setPosts] = useState<IPost[]>([]);
    const [loading, setLoading] = useState(true);

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
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-xl">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-2xl mx-auto px-4">
                <header className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">Social Media</h1>
                    <p className="text-gray-600">Connect and share your thoughts safely</p>
                </header>

                <main>
                    {posts.map((post) => (
                        <PostCard
                            key={post._id}
                            post={post}
                            onCommentAdded={fetchPosts}
                        />
                    ))}

                    {posts.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-xl">No posts yet.</p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}