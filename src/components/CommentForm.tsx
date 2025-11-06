'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface CommentFormProps {
    postId: string;
    onCommentAdded: () => void;
}

interface ToxicityResult {
    comment: string;
    result: 'Offensive' | 'Neutral' | 'Safe';
    sarcasm: string;
    error?: string;
}

type FormValues = {
    author: string;
    content: string;
};

export default function CommentForm({ postId, onCommentAdded }: CommentFormProps) {
    const { register, handleSubmit, reset, formState: { isSubmitting, errors } } = useForm<FormValues>({
        defaultValues: {
            author: 'Anonymous',
            content: '',
        }
    });

    const [error, setError] = useState<string | null>(null);
    const [showToxicityWarning, setShowToxicityWarning] = useState(false);
    const [toxicityResult, setToxicityResult] = useState<ToxicityResult | null>(null);

    // Submit handler
    const onSubmit = async (data: FormValues) => {
        setError(null);
        setShowToxicityWarning(false);
        setToxicityResult(null);

        try {
            const response = await fetch(`/api/posts/${postId}/comments`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    author: data.author.trim() || 'Anonymous',
                    content: data.content.trim(),
                }),
            });

            const resData = await response.json();

            if (!response.ok) {
                if (resData.requiresEdit && resData.toxicityResult) {
                    setToxicityResult(resData.toxicityResult);
                    setShowToxicityWarning(true);
                    return;
                }
                throw new Error(resData.error || 'Failed to post comment');
            }

            reset();
            onCommentAdded();

        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to post comment');
        }
    };

    const handleEditComment = () => {
        setShowToxicityWarning(false);
        setToxicityResult(null);
    };

    const handlePostAnyway = async () => {
        try {
            const response = await fetch(`/api/posts/${postId}/comments/force`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    bypassToxicityCheck: true,
                    ...toxicityResult,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to post comment');
            }

            reset();
            setShowToxicityWarning(false);
            setToxicityResult(null);
            onCommentAdded();

        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to post comment');
        }
    };

    if (showToxicityWarning) {
        return (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                <div className="flex items-center mb-2">
                    <span className="text-yellow-600 text-xl">⚠️</span>
                    <h3 className="text-yellow-800 font-semibold ml-2">Content Warning</h3>
                </div>
                <p className="text-yellow-700 mb-3">
                    Our analysis detected offensive content. Please edit and try again.
                </p>
                <div className="flex gap-2 flex-wrap">
                    <button
                        onClick={handleEditComment}
                        className="px-4 py-2 bg-yellow-500 text-white rounded"
                    >
                        ✏️ Edit Comment
                    </button>
                    <button
                        onClick={handlePostAnyway}
                        disabled={isSubmitting}
                        className="px-4 py-2 bg-gray-500 text-white rounded"
                    >
                        {isSubmitting ? 'Posting...' : '🚫 Post Anyway'}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 mb-6">
            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>
            )}

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your name (optional)
                </label>
                <input
                    {...register('author')}
                    className="w-full px-3 py-2 border rounded-md"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your comment
                </label>
                <textarea
                    {...register('content', { required: "Comment cannot be empty" })}
                    rows={3}
                    className="w-full px-3 py-2 border rounded-md"
                />
                {errors.content && (
                    <p className="text-red-600 text-sm">{errors.content.message}</p>
                )}
            </div>

            <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                    Comments are automatically checked for toxicity
                </span>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2 bg-blue-500 text-white rounded"
                >
                    {isSubmitting ? 'Checking...' : '💬 Post Comment'}
                </button>
            </div>
        </form>
    );
}
