import { User } from "@prisma/client";

export type Post = {
    // post: {
        id: string;
        body: string;
        creadtedAt: Date;
        updatedAt: Date;
        userId: string;
        likedIds: string[];
        image?: string;
        user: User;
        comments: Comment[];
    // }
}

export type Comment = {
    id: string;
    body: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    postId: string;
    user: User;
    post: Post;
}