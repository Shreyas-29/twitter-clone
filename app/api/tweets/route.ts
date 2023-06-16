import { useTweetStore } from "@/app/hooks";
import prisma from "@/app/libs/prismadb";
import { pusherClient } from "@/app/libs/pusher";
import { Post } from "@prisma/client";
import { NextResponse } from "next/server";


export async function GET(
    request: Request,
) {
    if (request.method === 'GET') {
        try {

            const tweets = await prisma.post.findMany({
                include: {
                    user: true,
                    comments: true,
                },
                orderBy: {
                    createdAt: 'desc',
                },
            });

            const channel = pusherClient.subscribe('tweets');

            channel.bind('tweets:new', (newTweet: Post) => {
                // Handle the new tweet received in real-time
                useTweetStore.getState().addTweet(newTweet);
            });

            return NextResponse.json(tweets, { status: 200 });

        } catch (error) {
            console.log(error);
            return new NextResponse('Error', { status: 500 });
        }
    } else {
        return new NextResponse('Method not allowed', { status: 405 });
    }
}
