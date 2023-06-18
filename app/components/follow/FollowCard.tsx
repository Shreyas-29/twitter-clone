'use client';

import React from 'react';
import { User } from '@prisma/client';
import Avatar from '../Avatar';
import Button from '../Button';
import { useRouter } from 'next/navigation';


interface FollowCardProps {
    users: User[];
}

const FollowCard: React.FC<FollowCardProps> = ({
    users
}) => {

    const router = useRouter();

    const shuffledUsers = [...users].sort(() => Math.random() - 0.5);

    const randomUsers = shuffledUsers.slice(0, 3);

    return (
        <div className='flex flex-col items-start pt-4 rounded-2xl bg-[#16181c]/80 my-5'>
            <h3 className='text-xl font-semibold mx-4'>
                Who to follow
            </h3>
            <div className='space-y-4 mt-4 w-full'>
                {randomUsers?.map(({ id, name, username, profileImage }) => (
                    <div key={id} onClick={() => router.push(`/users/${id}`)} className='flex items-start justify-between hover:bg-zinc-800/30 transition-colors px-4 py-2.5 w-full cursor-pointer last:pb-4'>
                        <div className='flex items-center gap-2'>
                            <Avatar url={profileImage as string} />
                            <div className='flex flex-col items-start'>
                                <h4 className='text-base font-medium text-white'>
                                    {name}
                                </h4>
                                <span className='text-sm text-gray-500'>
                                    @{username}
                                </span>
                            </div>
                        </div>
                        <div className='flex items-center ml-auto'>
                            <Button title='Follow' secondary small />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default FollowCard
