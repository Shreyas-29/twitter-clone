import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/app/actions";
import { pusherServer } from "@/app/libs/pusher";

export async function POST(
    request: Request,
) {
    // try {
    //     const currentUser = await getCurrentUser();
    //     const body = await request.json();
    //     const { input, image } = body;


    //     if (!currentUser?.id) {
    //         return new NextResponse('Unauthorized', { status: 401 });
    //     }

    //     const tweet = await prisma.post.create({
    //         // @ts-ignore
    //         data: {
    //             body: input,
    //             image: image,
    //             userId: currentUser?.id || undefined,
    //         },
    //         include: {
    //             user: true,
    //             comments: true,
    //         }
    //     });

    //     await pusherServer.trigger('tweets', 'tweets:new', tweet);

    //     return NextResponse.json(tweet, { status: 200 });

    // } catch (error) {
    //     console.log(error);
    //     return new NextResponse('Error', { status: 500 });
    // }

    // try {

    //     const currentUser = await getCurrentUser();

    //     const formData = await request.formData();
    //     const input = formData.get('input') as string;
    //     const image = formData.get('image');

    //     // const body = await request.json();
    //     // const { input, image } = body;
    //     console.log("Image", image);

    //     if (!currentUser?.id) {
    //         return new NextResponse('Unauthorized', { status: 401 });
    //     }

    //     const tweet = await prisma.post.create({
    //         data: {
    //             body: input,
    //             // @ts-ignore
    //             image: image || undefined,
    //             userId: currentUser?.id || undefined,
    //         },
    //         include: {
    //             user: true,
    //             comments: true,
    //         }
    //     });

    //     await pusherServer.trigger('tweets', 'tweets:new', tweet);

    //     return NextResponse.json(tweet, { status: 200 });

    // }

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
