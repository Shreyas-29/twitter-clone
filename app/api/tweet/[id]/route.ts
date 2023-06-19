import prisma from "@/app/libs/prismadb";
import { NextRequest, NextResponse } from "next/server";
import { pusherServer } from "@/app/libs/pusher";


interface IParams {
    tweetId?: string;
}

export async function DELETE(
    request: Request,
    { params }: { params: IParams }
) {

    // const { tweetId } = params;
    const tweetId = params?.tweetId;

    if (!tweetId) {
        return new NextResponse('Tweet ID is required', { status: 400 });
    }

    try {

        const existingTweet = await prisma.post.findUnique({
            where: {
                id: tweetId
            },
            include: {
                user: true
            }
        });

        if (!existingTweet) {
            return new NextResponse('Tweet not found', { status: 401 });
        }

        const deleteTweet = await prisma.post.delete({
            where: {
                id: tweetId
            }
        });

        if (deleteTweet) {
            pusherServer.trigger("tweets", "tweets:remove", tweetId);
            return NextResponse.json(deleteTweet, { status: 200 });
        } else {
            throw new Error("Failed to delete tweet");
        }
    } catch (error) {
        console.log(error);
        return new NextResponse('Error', { status: 500 });
    }

}