import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import { pusherServer } from "@/app/libs/pusher";
import { NextApiRequest } from "next";

export async function DELETE(
    request: NextApiRequest,
    tweetId: { params: { id: string } } | undefined
) {

    const id = tweetId?.params.id;

    try {

        const existingTweet = await prisma.post.findUnique({
            where: {
                id: id,
            },
            include: {
                user: true,
            },
        });

        if (!existingTweet) {
            return new NextResponse('Invalid ID', { status: 400 });
        }

        const deleteTweet = await prisma.post.delete({
            where: {
                id: id
            }
        });

        if (deleteTweet) {
            pusherServer.trigger("tweets", "tweets:remove", id);
            return NextResponse.json(deleteTweet, { status: 200 });
        }
        else {
            throw new Error("Failed to delete tweet");
        }


    } catch (error) {
        console.log(error);
        return new NextResponse('Error', { status: 500 });
    }
}
