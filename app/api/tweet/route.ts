import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/app/actions";
import { pusherServer } from "@/app/libs/pusher";

export async function POST(
    request: Request,
) {

    if (request.method !== 'POST') {
        return new NextResponse('Method not allowed', { status: 405 });
    }

    try {
        const currentUser = await getCurrentUser();

        const body = await request.json();

        const { input, image } = body;

        if (!currentUser?.id || !currentUser?.email) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const tweet = await prisma.post.create({
            data: {
                body: input,
                image: image,
                userId: currentUser?.id,
            },
            include: {
                user: true,
                comments: true,
            }
        });

        await pusherServer.trigger('tweets', 'tweets:new', tweet);

        return NextResponse.json(tweet, { status: 200 });


    }
    catch (error) {
        console.log(error);
        return new NextResponse('Error', { status: 500 });
    }
}
