import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";


const getLike = async (tweetId: string) => {
    try {

        const currentUser = await getCurrentUser();

        const tweet = await prisma.post.findUnique({
            where: {
                id: tweetId
            },
            select: {
                likedIds: true
            }
        });

        const isLiked = tweet?.likedIds?.includes(currentUser?.id!) ?? false;

    } catch (error) {
        console.log(error);
        return false;
    }
};

export default getLike;