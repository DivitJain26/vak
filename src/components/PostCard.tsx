import { IPost } from '@/src/models/post';
import CommentForm from './CommentForm';

interface PostCardProps {
    post: IPost;
    onCommentAdded: () => void;
}

export default function PostCard({ post, onCommentAdded }: PostCardProps) {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{post.title}</h2>
                <p className="text-gray-600 mb-3">{post.body}</p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>By {post.author}</span>
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                </div>
            </div>

            <div className="border-t pt-4">
                <h3 className="font-semibold mb-3">Comments ({post.comments.length})</h3>

                <div className="space-y-3 mb-4">
                    {post.comments.map((comment) => (
                        <div key={comment._id} className="bg-gray-50 rounded-lg p-3">
                            <div className="flex justify-between items-start mb-1">
                                <span className="font-medium text-gray-700">{comment.author}</span>
                                <span className="text-xs text-gray-500">
                                    {new Date(comment.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                            <p className="text-gray-600">{comment.content}</p>
                        </div>
                    ))}

                    {post.comments.length === 0 && (
                        <p className="text-gray-500 text-center py-4">No comments yet. Be the first to comment!</p>
                    )}
                </div>

                <CommentForm postId={post._id!} onCommentAdded={onCommentAdded} />
            </div>
        </div>
    );
}