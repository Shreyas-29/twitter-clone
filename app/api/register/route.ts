import bcrypt from "bcrypt";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

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

        return NextResponse.json(user);
    } catch (error) {
        console.log(error);
        return new NextResponse('Error', { status: 500 });
    }
}
