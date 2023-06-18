import prisma from "@/app/libs/prismadb";
import { getSession } from "next-auth/react";
import { NextResponse } from "next/server";


export async function GET(
    request: Request
) {
    if (request.method !== 'GET') {
        return new NextResponse('Method not allowed', { status: 405 });
    }
    try {

        const session = await getSession();

        console.log('session', session?.user);

        if (!session?.user?.email) {
            return null;
        }

        const currentUser = await prisma.user.findUnique({
            where: {
                email: session.user.email
            },
            include: {
                posts: true
            }
        });

        if (!currentUser) {
            return null;
        }

        return NextResponse.json(currentUser, { status: 200 });

    } catch (error) {
        console.log(error);
        return new NextResponse('Error', { status: 500 });
    }
}
