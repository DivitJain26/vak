import { IComment } from '@/src/models/post';

interface CommentItemProps {
    comment: IComment;
}

export default function CommentItem({ comment }: CommentItemProps) {
    const getInitial = (name: string) => name.charAt(0).toUpperCase();

    return (
        <div className="flex space-x-3">
            <div className="w-8 h-8 bg-gray-300 rounded-full shrink-0 flex items-center justify-center text-white text-xs font-bold">
                {getInitial(comment.author)}
            </div>

            <div className="flex-1 bg-white rounded-2xl px-4 py-3 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                        <span className="font-semibold text-sm text-gray-900">{comment.author}</span>
                        {comment.toxicityCheck && (
                            <span className={`text-xs px-2 py-1 rounded-full ${comment.toxicityCheck.result === 'Safe'
                                    ? 'bg-green-100 text-green-800'
                                    : comment.toxicityCheck.result === 'Neutral'
                                        ? 'bg-yellow-100 text-yellow-800'
                                        : 'bg-red-100 text-red-800'
                                }`}>
                                {comment.toxicityCheck.result}
                            </span>
                        )}
                    </div>
                    <span className="text-xs text-gray-500">
                        {comment.createdAt.toLocaleDateString()}
                    </span>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">{comment.content}</p>
                {comment.toxicityCheck?.bypassed && (
                    <div className="mt-2 flex items-center space-x-1">
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">Content Warning Bypassed</span>
                    </div>
                )}
            </div>
        </div>
    );
}