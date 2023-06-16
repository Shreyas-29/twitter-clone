import prisma from "@/app/libs/prismadb";
import { useTweetStore } from "../hooks";


const getTweets = async () => {
    try {
        const tweets = await prisma.post.findMany({
            include: {
                user: true,
                comments: true,
            },
            orderBy: {
                createdAt: 'desc',
            }
        });

        useTweetStore.getState().addTweet(tweets);

        return tweets;

    } catch (error) {
        console.log(error);
        return [];
    }
};

export default getTweets;