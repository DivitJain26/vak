'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface CreatePostProps {
    onPostCreated: () => void;
    onCancel: () => void;
}

type FormValues = {
    title: string;
    content: string;
    author: string;
    mediaUrl: string;
    mediaType: 'image' | 'video';
};

export default function CreatePost({ onPostCreated, onCancel }: CreatePostProps) {
    const { register, handleSubmit, formState: { isSubmitting, errors }, watch, reset } = useForm<FormValues>();
    const mediaUrl = watch('mediaUrl');

    const onSubmit = async (data: FormValues) => {
        try {
            const response = await fetch('/api/posts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...data,
                    author: data.author || 'Anonymous',
                    mediaUrl: data.mediaUrl || undefined,
                    mediaType: data.mediaUrl ? data.mediaType : undefined,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to create post');
            }

            reset();
            onPostCreated();
        } catch (error) {
            console.error('Failed to create post:', error);
            alert('Failed to create post. Please try again.');
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
                <div className="border-b border-gray-200 p-6">
                    <h2 className="text-xl font-bold text-gray-900">Create Post</h2>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4 overflow-y-auto max-h-[60vh]">
                    <div>
                        <input
                            {...register('author')}
                            placeholder="Your name (optional)"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    <div>
                        <input
                            {...register('title', { required: "Title is required" })}
                            placeholder="Post title"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-semibold text-lg"
                        />
                        {errors.title && (
                            <p className="text-red-600 text-sm mt-1 ml-1">{errors.title.message}</p>
                        )}
                    </div>

                    <div>
                        <textarea
                            {...register('content', { required: "Content is required" })}
                            placeholder="What's on your mind?"
                            rows={4}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        />
                        {errors.content && (
                            <p className="text-red-600 text-sm mt-1 ml-1">{errors.content.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <input
                            {...register('mediaUrl')}
                            placeholder="Image or video URL (optional)"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />

                        {mediaUrl && (
                            <select
                                {...register('mediaType')}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                defaultValue="image"
                            >
                                <option value="image">Image</option>
                                <option value="video">Video</option>
                            </select>
                        )}

                        {mediaUrl && (
                            <div className="mt-2">
                                {watch('mediaType') === 'image' ? (
                                    <Image
                                        src={mediaUrl}
                                        alt="Preview"
                                        className="w-full max-h-48 object-cover rounded-xl border"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).style.display = 'none';
                                        }}
                                    />
                                ) : (
                                    <video
                                        src={mediaUrl}
                                        controls
                                        className="w-full max-h-48 rounded-xl border"
                                    />
                                )}
                            </div>
                        )}
                    </div>

                    <div className="flex space-x-3 pt-4">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-semibold"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 disabled:opacity-50 transition-colors font-semibold"
                        >
                            {isSubmitting ? 'Posting...' : 'Create Post'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}