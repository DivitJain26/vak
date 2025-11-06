import mongoose, { Schema, Document, model, models } from "mongoose";

interface Comment {
    _id: string;
    author: string;
    content: string;
    createdAt: Date;
    toxicityCheck: {
        result: "Offensive" | "Neutral" | "Safe";
        sarcasm: string;
        checkedAt: Date;
    };
}

export interface IPost extends Document {
    _id: string;
    title: string;
    body: string;
    author: string;
    createdAt: Date;
    comments: Comment[];
}

const CommentSchema = new Schema<Comment>({
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
    toxicityCheck: {
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
    },
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
        },
        body: {
            type: String,
            required: true,
        },
        comments: [CommentSchema],
    },
    { timestamps: true }
);

export default models.Post || model<IPost>("Post", PostSchema);
