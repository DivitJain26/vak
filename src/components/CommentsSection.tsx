import { MessageSquare } from "lucide-react";

import { IComment } from '@/src/models/post';
import CommentForm from '@/src/components/CommentForm';
import CommentItem from '@/src/components/CommentItem';

interface CommentsSectionProps {
    comments: IComment[];
    postId: string;
    onCommentAdded: () => void;
}

export default function CommentsSection({ comments, postId, onCommentAdded }: CommentsSectionProps) {
    return (
        <div className="bg-gray-50 border-t border-gray-200 p-6">
            <div className="space-y-4 mb-4 max-h-80 overflow-y-auto">
                {comments.length > 0 ? (
                    comments.map((comment) => (
                        <CommentItem key={comment._id} comment={comment} />
                    ))
                ) : (
                    <div className="text-center py-8">
                        <MessageSquare className="w-5 h-5 text-gray-600" />
                        <p className="text-gray-500 text-sm">No comments yet. Be the first to comment!</p>
                    </div>
                )}
            </div>

            {/* Comment Form */}
            <CommentForm postId={postId} onCommentAdded={onCommentAdded} />
        </div>
    );
}