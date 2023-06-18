import prisma from "@/app/libs/prismadb";
import { NextResponse } from 'next/server';

export async function GET(
    request: Request,
    id: { params: { id: string } } | undefined
) {
    if (request.method !== 'GET') {
        return new NextResponse('Method not allowed', { status: 405 });
    }

    try {

        const tweetId: string | undefined = id?.params?.id;

        console.log("Tweet ID: ", tweetId);

        const tweet = await prisma.post.findUnique({
            where: {
                id: tweetId
            },
            select: {
                likedIds: true
            }
        });

        // check if the currnetuser id includes in that post like ids then remove it return count-1

        const count = tweet?.likedIds.length || 0;
        console.log("Count", count);

        return NextResponse.json(count, { status: 200 });

    } catch (error) {
        return new NextResponse('Error', { status: 500 });
    }

}
