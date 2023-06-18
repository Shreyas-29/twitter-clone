import prisma from "@/app/libs/prismadb";


const getCount = async (tweetId: string) => {
    try {

        const tweet = await prisma.post.findUnique({
            where: {
                id: tweetId
            },
            select: {
                likedIds: true
            }
        });

        const count = tweet?.likedIds.length || 0;

        return count;

    } catch (error) {
        console.log(error);
        return 0;
    }
};

export default getCount;