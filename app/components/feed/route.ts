import prisma from "@/app/libs/prismadb";
import { NextRequest, NextResponse } from "next/server";
import { pusherServer } from "@/app/libs/pusher";


interface IParams {
    tweetId?: string;
}

// export async function DELETE2(
//     { params }: { params: IParams },
//     request: NextRequest
// ) {

//     try {

//         const { tweetId } = params;

//         console.log("Delete Tweet ID:", tweetId);

//         if (!tweetId) {
//             return new NextResponse('Tweet ID is required', { status: 400 });
//         }

//         const existingTweet = await prisma.post.findUnique({
//             where: {
//                 id: tweetId,
//             },
//             include: {
//                 user: true,
//             },
//         });

//         if (!existingTweet) {
//             return new NextResponse('Invalid ID', { status: 400 });
//         }

//         const deleteTweet = await prisma.post.delete({
//             where: {
//                 id: tweetId
//             }
//         });

//         if (deleteTweet) {
//             pusherServer.trigger("tweets", "tweets:remove", tweetId);
//             return NextResponse.json(deleteTweet, { status: 200 });
//         }
//         else {
//             throw new Error("Failed to delete tweet");
//         }


//     } catch (error) {
//         console.log(error);
//         return new NextResponse('Error', { status: 500 });
//     }
// }
console.log('');

// export async function DELETE(
//     tweetId: { params: { id: string } } | undefined,
//     request: Request,
// ) {


//     try {
//         console.log("Delete ID:", tweetId?.params);

//         // const id = tweetId?.params?.id!;
//         // console.log("Delete ID:", id);
//         const body = await request.json();
//         const { id } = body;
//         console.log('id:', id);

//         if (!id) {
//             return new NextResponse('Tweet ID is required', { status: 400 });
//         }

//         const existingTweet = await prisma.post.findUnique({
//             where: {
//                 id: id,
//             },
//             include: {
//                 user: true,
//             },
//         });

//         if (!existingTweet) {
//             return new NextResponse('Invalid ID', { status: 400 });
//         }

//         const deleteTweet = await prisma.post.delete({
//             where: {
//                 id: id
//             }
//         });

//         if (deleteTweet) {
//             pusherServer.trigger("tweets", "tweets:remove", id);
//             return NextResponse.json(deleteTweet, { status: 200 });
//         }
//         else {
//             throw new Error("Failed to delete tweet");
//         }


//     } catch (error) {
//         console.log(error);
//         return new NextResponse('Error', { status: 500 });
//     }
// }

export async function DELETE(
    request: Request,
    { params }: { params: IParams }
) {

    const { tweetId } = params;

    console.log("Tweet ID", tweetId);

    if (!tweetId || typeof tweetId !== 'string') {
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