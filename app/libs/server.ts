import { NextApiRequest, NextApiResponse } from 'next';

import prisma from "@/app/libs/prismadb";
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';


const server = async (
    request: NextApiRequest,
    response: NextApiResponse
    ) => {
    const session = await getServerSession(request, response, authOptions);

    if (!session?.user?.email) {
        throw new Error('Not signed in');
    }

    const currentUser = await prisma.user.findUnique({
        where: {
            email: session.user.email,
        }
    });

    if (!currentUser) {
        throw new Error('Not signed in');
    }

    return { currentUser };
};

export default server;