import { getCurrentUser } from "@/app/actions";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";


export async function POST(request: Request) {

    if (request.method !== 'POST') {
        return new NextResponse('Method not allowed', { status: 405 });
    }


    try {

        const currentUser = await getCurrentUser();

        const body = await request.json();
        const { userId } = body;

        if (!currentUser) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const isFollowing = currentUser.followingIds.includes(userId);

        if (isFollowing) {

            await prisma.user.update({
                where: {
                    id: currentUser?.id
                },
                data: {
                    followingIds: {
                        set: currentUser.followingIds.filter((id) => id !== userId)
                    }
                }
            });

            return new NextResponse('Following', { status: 200 });
        } else {
            await prisma.user.update({
                where: {
                    id: currentUser?.id
                },
                data: {
                    followingIds: {
                        push: userId
                    }
                }
            });

            return new NextResponse('You are Unfollowing', { status: 200 });
        }
    } catch (error) {
        console.error(error);
        return new NextResponse('Something went wrong', { status: 500 });
    }
}
