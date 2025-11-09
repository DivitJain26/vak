import { MoreVertical } from "lucide-react";
import Image from "next/image";

interface PostHeaderProps {
    author: string;
    profilePic?: string;
    createdAt: Date | string;
}

export default function PostHeader({ author, profilePic, createdAt }: PostHeaderProps) {

    const initial = author?.charAt(0).toUpperCase();

    return (
        <div className="flex items-center justify-between p-6 pb-4">
            <div className="flex items-center space-x-3">

                {/* Profile Picture or fallback */}
                {profilePic ? (
                    <Image
                        src={profilePic}
                        alt={author}
                        className="w-12 h-12 rounded-full object-cover shadow-md border"
                    />
                ) : (
                    <div className="w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                        {initial}
                    </div>
                )}

                <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-lg">{author}</h3>
                    <p className="text-sm text-gray-500">
                        {new Date(createdAt).toLocaleDateString()}
                    </p>
                </div>
            </div>

            <button className="text-gray-400 hover:text-gray-600 transition-colors">
                <MoreVertical className="w-6 h-6" />
            </button>
        </div>
    );
}
