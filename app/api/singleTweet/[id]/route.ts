import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    id: { params: { id: string } } | undefined
) {

    if (request.method !== 'GET') {
        return new NextResponse('Method not allowed', { status: 405 });
    }

    try {

        const tweetId = id?.params.id;

        const tweet = await prisma.post.findUnique({
            where: {
                id: tweetId
            },
            include: {
                user: true
            }
        });

        return NextResponse.json(tweet, { status: 200 });

    } catch (error) {
        console.log(error);
        return new NextResponse('Error', { status: 500 });
    }
}
