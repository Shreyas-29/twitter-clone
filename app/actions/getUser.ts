import prisma from "@/app/libs/prismadb";


const getUser = async (userId: string) => {

    try {

        if (!userId) {
            return null;
        }

        const user = await prisma.post.findUnique({
            where: {
                id: userId
            },
        });

        return user;

    } catch (error) {
        console.log("Error", error);
        return null;
    }
};

export default getUser;