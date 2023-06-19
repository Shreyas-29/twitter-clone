import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/app/actions";

export async function POST(
    request: Request
) {

    if (request.method !== 'POST') {
        return new NextResponse('Method not allowed', { status: 405 });
    }

    try {
        const currentUser = await getCurrentUser();

        const body = await request.json();
        const { tweetId } = body;

        if (!currentUser) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const tweet = await prisma.post.findUnique({
            where: {
                id: tweetId
            }
        });

        if (!tweet) {
            return new NextResponse('Tweet not found', { status: 404 });
        }

        const liked = tweet.likedIds.includes(currentUser?.id);

        if (liked) {
            const updateLikeIds = tweet.likedIds.filter((id) => id !== currentUser?.id);

            await prisma.post.update({
                where: {
                    id: tweetId
                },
                data: {
                    likedIds: updateLikeIds
                }
            });

            return new NextResponse('false', { status: 200 });
        } else {
            const updateLikeIds = [...tweet.likedIds, currentUser?.id];

            await prisma.post.update({
                where: {
                    id: tweetId
                },
                data: {
                    likedIds: updateLikeIds
                }
            });

            return new NextResponse('true', { status: 200 });
        }

    } catch (error) {
        console.log(error);
        return new NextResponse('Error', { status: 500 });
    }
}
