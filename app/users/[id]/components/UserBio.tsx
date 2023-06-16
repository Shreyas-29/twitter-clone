'use client';

import React, { useEffect, useState } from 'react';
import { User } from '@prisma/client';
import { IoCalendarOutline } from 'react-icons/io5';
import { format } from 'date-fns';
import axios from 'axios';


interface UserBioProps {
    user?: User | null;
}


const UserBio: React.FC<UserBioProps> = ({
    user
}) => {


    const [followingCount, setFollowingCount] = useState(0);

    useEffect(() => {
        const fetchFollowingCount = async () => {
            try {
                const response = await axios.get(`/api/following/${user?.id}`);
                const followingCount = response.data;
                setFollowingCount(followingCount);
            } catch (error) {
                console.error("Error fetching following count", error);
            }
        };

        fetchFollowingCount();
    }, [user?.id]);



    const joinedDate = () => {
        if (!user?.createdAt) {
            return null;
        }
        return format(new Date(user?.createdAt), 'MMMMMMM yyyy');
    };


    return (
        <div className='flex flex-col items-start w-full space-y-5 pt-10 px-5'>
            <div className='flex flex-col items-start space-y-3'>
                <div className='space-y-1'>
                    <h2 className='text-xl font-semibold capitalize'>
                        {user?.name}
                    </h2>
                    <span className='text-base text-neutral-500'>
                        @{user?.username}
                    </span>
                </div>
                <p className='text-neutral-100 text-base'>
                    {user?.bio}
                </p>
                <div className='flex items-center gap-2 text-neutral-400'>
                    <IoCalendarOutline className='w-5 h-5 text-current' />
                    <span>
                        Joined {joinedDate()}
                    </span>
                </div>
                <div className='flex items-center gap-5'>
                    <div className='flex items-center gap-1'>
                        <p className="text-white">{user?.followingIds?.length}</p>
                        <p className="text-neutral-500">Following</p>
                    </div>
                    <div className='flex items-center gap-1'>
                        <p className="text-white">{followingCount || 0}</p>
                        <p className="text-neutral-500">Followers</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserBio
