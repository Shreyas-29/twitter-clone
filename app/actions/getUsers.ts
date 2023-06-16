import prisma from "@/app/libs/prismadb";
import getSession from "./getSession";


const getUsers = async () => {
    const session = await getSession();

    try {
        const users = await prisma.user.findMany({
            where: {
                NOT: {
                    email: session?.user?.email
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return users;

    } catch (error) {
        console.log("Error", error);
        return [];
    }
};

export default getUsers;