import prisma from "@/app/libs/prismadb";
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/app/actions';

export async function GET(
    request: Request,
    id: { params: { id: string } } | undefined
) {
    if (request.method !== 'GET') {
        return new NextResponse('Method not allowed', { status: 405 });
    }

    try {

        const tweetId: string | undefined = id?.params?.id;

        const currentUser = await getCurrentUser();

        if (!tweetId) {
            return new NextResponse('Tweet ID is required', { status: 400 });
        }

        const tweet = await prisma.post.findUnique({
            where: {
                id: tweetId
            },
            select: {
                likedIds: true
            }
        });

        const isLiked = tweet?.likedIds.includes(currentUser?.id!) ?? false;

        return NextResponse.json(isLiked, { status: 200 });

    } catch (error) {
        return new NextResponse('Error', { status: 500 });
    }

}
