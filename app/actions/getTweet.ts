import prisma from "@/app/libs/prismadb";


const getTweet = async (userId: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            },
            include: {
                posts: {
                    include: {
                        user: true,
                        comments: true,
                    },
                    orderBy: {
                        createdAt: 'desc'
                    }
                }
            }
        })

        return user?.posts || [];

    } catch (error) {
        console.log(error);
        return [];
    }
};

export default getTweet;