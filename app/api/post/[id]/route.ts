import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { pusherServer } from "@/app/libs/pusher";

interface IParams {
    id?: string;
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: IParams }
) {
    const tweetId = params?.id;

    if (!tweetId) {
        return new NextResponse('Tweet ID is required', { status: 400 });
    }

    try {
        const existingTweet = await prisma.post.findUnique({
            where: {
                id: tweetId,
            },
            include: {
                user: true,
            },
        });

        if (!existingTweet) {
            return new NextResponse('Tweet not found', { status: 404 });
        }

        const deleteTweet = await prisma.post.delete({
            where: {
                id: tweetId,
            },
        });

        if (deleteTweet) {
            pusherServer.trigger('tweets', 'tweets:remove', tweetId);
            return new NextResponse(JSON.stringify(deleteTweet), { status: 200 });
        } else {
            throw new Error('Failed to delete tweet');
        }
    } catch (error) {
        console.log(error);
        return new NextResponse('Error', { status: 500 });
    }
}
