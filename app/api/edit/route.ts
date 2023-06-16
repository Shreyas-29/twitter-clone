import { getCurrentUser } from "@/app/actions";
import { pusherServer } from "@/app/libs/pusher";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";


export async function POST(
    request: Request
) {

    if (request.method !== 'POST') {
        return new NextResponse('Method not allowed', { status: 405 });
    }

    try {
        const currentUser = await getCurrentUser();

        const body = await request.json();

        const { name, username, bio, profileImage, coverImage } = body;

        if (!currentUser?.id || !currentUser?.email) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const updateUser = await prisma.user.update({
            where: {
                id: currentUser?.id
            },
            data: {
                name: name,
                username: username,
                bio: bio,
                profileImage: profileImage,
                coverImage: coverImage
            },
        });

        await pusherServer.trigger('user', 'profile:update', updateUser);

        return NextResponse.json(updateUser, { status: 200 });

    } catch (error) {
        console.log(error);
        return new NextResponse('Error', { status: 500 });
    }
}
