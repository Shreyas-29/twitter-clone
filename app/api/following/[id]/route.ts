import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';

export async function GET(
    request: Request,
    uid: { params: { id: string } } | undefined
) {

    if (request.method === 'GET') {

        const userId: string | undefined = uid?.params?.id;

        console.log("User ID: ", userId);

        if (!userId) {
            console.log("User id is undefined");
        }

        try {

            const followingCount = await prisma.user.count({
                where: {
                    followingIds: {
                        has: userId
                    }
                }
            });

            return NextResponse.json(followingCount, { status: 200 });

        } catch (error) {
            console.log(error);
            return new NextResponse('Error', { status: 500 });
        }
    } else {

        return new NextResponse('Method not allowed', { status: 405 });
    }

}
