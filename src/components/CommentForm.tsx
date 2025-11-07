'use client';

import { AlertTriangle, Pencil, Send } from "lucide-react";

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
                    author: toxicityResult?.comment ? 'Anonymous' : 'User',
                    content: toxicityResult?.comment || '',
                    bypassToxicityCheck: true,
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
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-4">
                <div className="flex items-center mb-3">
                    <AlertTriangle className="text-yellow-600 w-5 h-5" />
                    <h3 className="text-yellow-800 font-semibold ml-2">Content Warning</h3>
                </div>
                <p className="text-yellow-700 mb-3 text-sm">
                    Our analysis detected that your comment might be offensive to other users.
                    Please consider editing your comment to maintain a positive environment.
                </p>

                {toxicityResult && (
                    <div className="bg-yellow-100 border border-yellow-200 rounded-lg p-3 mb-3">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-yellow-800 font-medium">Analysis Results:</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${toxicityResult.result === 'Offensive'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                {toxicityResult.result}
                            </span>
                        </div>
                        <p className="text-yellow-700 text-sm mb-2">
                            <strong>Sarcasm Detection:</strong> {toxicityResult.sarcasm}
                        </p>
                        <div className="bg-white rounded border border-yellow-300 p-2">
                            <p className="text-yellow-900 text-sm italic">&quot;{toxicityResult.comment}&quot;</p>
                        </div>
                    </div>
                )}

                <div className="flex gap-2">
                    <button
                        onClick={handleEditComment}
                        className="flex-1 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors font-medium"
                    >
                        <Pencil className="w-4 h-4 mr-2 inline" />
                        Edit
                    </button>
                    <button
                        onClick={handlePostAnyway}
                        disabled={isSubmitting}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50 transition-colors font-medium"
                    >
                        <Send className="w-4 h-4" />
                        {isSubmitting ? "Posting..." : "Post Anyway"}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                    {error}
                </div>
            )}

            <div className="flex space-x-3">
                <div className="flex-1">
                    <input
                        {...register('author')}
                        placeholder="Your name (optional)"
                        className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                </div>
                <button
                    type="submit"
                    disabled={isSubmitting || !!errors.content}
                    className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium text-sm"
                >
                    {isSubmitting ? (
                        <span className="flex items-center">
                            <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                            Posting...
                        </span>
                    ) : (
                        'Post'
                    )}
                </button>
            </div>

            <div>
                <textarea
                    {...register('content', {
                        required: "Comment cannot be empty",
                        minLength: {
                            value: 1,
                            message: "Comment cannot be empty"
                        }
                    })}
                    placeholder="Write a comment..."
                    rows={2}
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
                />
                {errors.content && (
                    <p className="text-red-600 text-xs mt-1 ml-1">{errors.content.message}</p>
                )}
            </div>
        </form>
    );
}