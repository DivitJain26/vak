import mongoose, { Document, Schema } from 'mongoose';

export interface IComment {
    _id?: string;
    author: string;
    content: string;
    createdAt: Date;
}

export interface IPost extends Document {
    title: string;
    content: string;
    author: string;
    comments: IComment[];
    createdAt: Date;
    updatedAt: Date;
}

const CommentSchema = new Schema({
    author: { type: String, required: true, default: 'Anonymous' },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const PostSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true, default: 'Anonymous' },
    comments: [CommentSchema]
}, {
    timestamps: true
});

export default mongoose.models.Post || mongoose.model<IPost>('Post', PostSchema);