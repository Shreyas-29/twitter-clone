import { useTweetStore } from "@/app/hooks";
import prisma from "@/app/libs/prismadb";
import { pusherClient } from "@/app/libs/pusher";
import { Post } from "@prisma/client";
import { NextResponse } from "next/server";


export async function GET(
    request: Request
) {
    if (request.method !== 'GET') {
        return new NextResponse('Method not allowed', { status: 405 });
    }
    try {
        const { url } = request;
        const userId = url.split('/').pop();

        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });

        if (!user) {
            return new NextResponse('User not found', { status: 404 });
        }

        return NextResponse.json(user, { status: 200 });

    } catch (error) {
        console.log(error);
        return new NextResponse('Error', { status: 500 });
    }
}
