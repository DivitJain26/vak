// import mongoose, { Schema, Document, model, models } from "mongoose";
import mongoosePkg from "mongoose";
const { Schema, model, models } = mongoosePkg;

export interface IToxicityCheck {
    result: "Offensive" | "Neutral" | "Safe";
    sarcasm: string;
    checkedAt: Date;
    bypassed?: boolean;
}

export interface IComment {
    _id: string;
    author: string;
    content: string;
    createdAt: string | Date;
    toxicityCheck?: IToxicityCheck;
}

export interface IPost extends mongoosePkg.Document {
    _id: string;
    title: string;
    content: string;
    author: string;
    profilePic?: string; 
    createdAt: string | Date;
    updatedAt: Date;
    mediaUrl?: string;
    mediaType?: 'image' | 'video' | null;
    likes: number;
    comments: IComment[];
}

const ToxicityCheckSchema = new Schema<IToxicityCheck>({
    result: {
        type: String,
        enum: ["Offensive", "Neutral", "Safe"],
        required: true,
    },
    sarcasm: {
        type: String,
        default: "Unknown",
    },
    checkedAt: {
        type: Date,
        default: Date.now,
    },
    bypassed: {
        type: Boolean,
        default: false
    }
});

const CommentSchema = new Schema<IComment>({
    author: {
        type: String,
        default: "Anonymous",
    },
    content: {
        type: String,
        required: true,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    toxicityCheck: ToxicityCheckSchema,
});

const PostSchema = new Schema<IPost>(
    {
        author: {
            type: String,
            default: "Anonymous"
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        content: {
            type: String,
            required: true,
            trim: true,
        },
        mediaUrl: {
            type: String,
            required: false,
        },
        mediaType: {
            type: String,
            enum: ['image', 'video'],
            required: false,
        },
        likes: {
            type: Number,
            default: 0,
        },
        comments: [CommentSchema],
    },
    { timestamps: true }
);

export default models.Post || model<IPost>("Post", PostSchema);
