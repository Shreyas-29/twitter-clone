import bcrypt from "bcrypt";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import { pusherServer } from "@/app/libs/pusher";

export async function POST(
    request: Request
) {
    try {
        const body = await request.json();
        const {
            username,
            name,
            email,
            password
        } = body;

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await prisma.user.create({
            data: {
                username,
                name,
                email,
                hashedPassword
            }
        });

        const notification = await prisma.notification.create({
            data: {
                userId: user?.id,
                body: `There was a login to your account @${user?.username}`,
                createdAt: new Date()
            },
        });

        await prisma.user.update({
            where: {
                id: user?.id
            },
            data: {
                hasNotification: true
            }
        });

        pusherServer.trigger('notifications', 'notifications:new', notification);

        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        console.log(error);
        return new NextResponse('Error', { status: 500 });
    }
}
