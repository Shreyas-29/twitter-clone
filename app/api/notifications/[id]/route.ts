import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import { pusherServer } from "@/app/libs/pusher";


export async function GET(
    request: Request,
    uid: { params: { id: string } } | undefined
) {
    try {

        if (request.method !== 'GET') {
            return new NextResponse('Method not allowed', { status: 405 });
        }

        const userId = uid?.params.id;

        if (!userId) {
            return new NextResponse('User ID not found', { status: 404 });
        }

        const notifications = await prisma.notification.findMany({
            where: {
                userId
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                hasNotification: false
            }
        });

        await pusherServer.trigger('notifications', 'notifications:new', notifications);

        return NextResponse.json(notifications, { status: 200 });


    } catch (error) {
        console.log(error);
        return new NextResponse('Error', { status: 500 });
    }
}
