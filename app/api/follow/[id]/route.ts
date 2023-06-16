import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/app/libs/prismadb';
import { getCurrentUser } from '@/app/actions';
import { NextResponse } from 'next/server';

export async function GET(
    request: Request,
    id: { params: { id: string } } | undefined
) {

    if (request.method === 'GET') {
        
        // const { userId } = req.query;

        const userId: string | undefined = id?.params?.id;

        const currentUser = await getCurrentUser();

        try {

            const isFollowing = currentUser?.followingIds.includes(userId as string);

            console.log('Following', isFollowing);

            return NextResponse.json(isFollowing || false, { status: 200 });
            
        } catch (error) {
            console.log(error);
            return new NextResponse('Error', { status: 500 });
        }
    } else {
        
        return new NextResponse('Method not allowed', { status: 405 });
    }

}
