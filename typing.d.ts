interface FullTweetProps {
    tweet: {
        id: string;
        body: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        likedIds: string[];
        image?: string;
        user: User;
        comments: Comment[];
    };
}