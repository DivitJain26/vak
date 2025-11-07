import { Heart, MessageCircle, Share2 } from "lucide-react";

interface PostActionsProps {
    isLiked: boolean;
    onLike: () => void;
    onComment: () => void;
}

export default function PostActions({ isLiked, onLike, onComment }: PostActionsProps) {
    return (
        <div className="px-6 py-3">
            <div className="flex space-x-4">

                {/* Like Button */}
                <button
                    onClick={onLike}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 flex-1 justify-center ${isLiked
                            ? "text-red-600 bg-red-50 border border-red-200"
                            : "text-gray-600 hover:bg-gray-50 border border-gray-200"
                        }`}
                >
                    <Heart
                        className={`w-5 h-5 ${isLiked ? "fill-red-600 text-red-600" : ""}`}
                    />
                    <span className="font-semibold">Like</span>
                </button>

                {/* Comment Button */}
                <button
                    onClick={onComment}
                    className="flex items-center space-x-2 px-4 py-2 rounded-xl text-gray-600 hover:bg-gray-50 border border-gray-200 transition-all duration-200 flex-1 justify-center"
                >
                    <MessageCircle className="w-5 h-5" />
                    <span className="font-semibold">Comment</span>
                </button>

                {/* Share Button */}
                <button
                    className="flex items-center space-x-2 px-4 py-2 rounded-xl text-gray-600 hover:bg-gray-50 border border-gray-200 transition-all duration-200 flex-1 justify-center"
                >
                    <Share2 className="w-5 h-5" />
                    <span className="font-semibold">Share</span>
                </button>
            </div>
        </div>
    );
}
