'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { User } from '@prisma/client';
import { useEditModal, useLoginModal } from '@/app/hooks';
import { Avatar, Button } from '@/app/components';
import axios from 'axios';
import { toast } from 'react-hot-toast';


interface UserHeroProps {
    user?: User | null;
    currentUser?: User | null;
    userId: string | undefined;
}


const UserHero: React.FC<UserHeroProps> = ({
    user,
    currentUser,
    userId
}) => {

    const editModal = useEditModal();
    const loginModal = useLoginModal();

    const [following, setFollowing] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchFollowingStatus = async () => {
            try {
                const response = await axios.get(`/api/follow/${userId}`);
                const isFollowing = response.data;
                setFollowing(isFollowing);
            } catch (error) {
                console.error("Error fetching user", error);
            }
        };

        fetchFollowingStatus();
    }, [userId, following]);


    const handleFollow = async () => {
        setLoading(true);

        try {
            if (!currentUser) {
                return loginModal.onOpen();
            }

            const response = await axios.post("/api/follow", { userId });

            if (response.status === 200) {

                setFollowing((prev) => !prev);
                toast.success(`You are ${following ? 'un' : ''}following @${user?.username}`);

            } else {
                toast.error("Something went wrong");
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };




    return (
        <div className='flex flex-col items-center w-full relative'>
            <div className='flex items-center justify-center w-full h-44 relative'>
                <div className='w-full h-full bg-neutral-900'>
                    {user?.coverImage ? (
                        <Image
                            src={user?.coverImage! || '/images/user.png'}
                            alt='User Image'
                            width={1000}
                            height={1000}
                            unoptimized
                            className='w-full h-full object-cover'
                        />
                    ) : (
                        <div className='w-full h-full bg-neutral-900'></div>
                    )}
                </div>
                <div className='absolute left-4 -bottom-16'>
                    <Avatar url={user?.image! || user?.profileImage!} isLarge border />
                </div>
            </div>
            {currentUser?.id === userId ? (
                <div className='flex items-center justify-end w-full ml-auto pt-4 pr-4'>
                    <Button
                        type='button'
                        title='Edit'
                        secondary
                        onClick={editModal.onOpen}
                    />
                </div>
            ) : (
                <div className='flex items-center justify-end w-full ml-auto pt-4 pr-4'>
                    <div className='flex items-center justify-center w-20'>
                        <Button
                            type='button'
                            title={following ? 'Unfollow' : 'Follow'}
                            secondary={!following}
                            outline={following}
                            onClick={handleFollow}
                            isLoading={loading}
                            disabled={loading}
                        />
                    </div>
                </div>
            )}
        </div>
    )

}

export default UserHero