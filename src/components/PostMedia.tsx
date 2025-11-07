import Image from "next/image";

interface PostMediaProps {
    mediaUrl: string;
    mediaType?: 'image' | 'video' | null;
}

export default function PostMedia({ mediaUrl, mediaType }: PostMediaProps) {
    if (!mediaUrl) return null;

    return (
        <div className="border-y border-gray-100">
            {mediaType === "image" ? (
                <div className="relative w-full h-96">
                    <Image
                        src={mediaUrl}
                        alt="Post media"
                        fill
                        className="object-cover rounded"
                        loading="lazy"
                    />
                </div>
            ) : mediaType === "video" ? (
                <video
                    src={mediaUrl}
                    controls
                    className="w-full max-h-96 rounded"
                >
                    Your browser does not support the video tag.
                </video>
            ) : (
                <div className="relative w-full h-96">
                    <Image
                        src={mediaUrl}
                        alt="Post media"
                        fill
                        className="object-cover rounded"
                        loading="lazy"
                    />
                </div>
            )}
        </div>
    );
}
