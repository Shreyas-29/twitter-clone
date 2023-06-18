import { Avatar, InputBox, TweetItem } from '@/app/components';
import { Post, User } from '@prisma/client';
import { format } from 'date-fns';
import Image from 'next/image';
import React from 'react';
import { IoEllipsisHorizontalSharp } from 'react-icons/io5';
import TweetLoader from './TweetLoader';


interface Tweet extends Post {
    user: User;
}

interface UserInfoProps {
    tweet: Tweet | any;
    currentUser: User | null;
}

const UserInfo: React.FC<UserInfoProps> = ({
    tweet,
    currentUser
}) => {

    const tweetTime = () => {
        if (!tweet?.createdAt) {
            return null;
        }

        const formattedTime = format(new Date(tweet.createdAt), "h:mm a · MMM d, yyyy");

        return formattedTime;
    };


    return (
        <>
            {tweet ? (
                <div className='flex flex-col items-start w-full'>
                    <div className='p-4 flex items-center justify-between w-full cursor-pointer hover:bg-[#16181c]/30 select-none'>
                        <div className='flex items-start flex-1 gap-3'>
                            <Avatar url={tweet?.user?.profileImage!} />
                            <div className='flex flex-col items-start'>
                                <h4 className='text-base font-semibold text-white capitalize'>
                                    {tweet?.user?.name}
                                </h4>
                                <span className='text-sm text-gray-500'>
                                    @{tweet?.user?.username}
                                </span>
                            </div>
                        </div>
                        <div className='item w-9 h-9 flex items-center justify-center rounded-full '>
                            <IoEllipsisHorizontalSharp className='w-5 h-5 text-gray-500' />
                        </div>
                    </div>
                    <div className='w-full flex flex-col items-start p-4'>
                        <div className='w-full'>
                            <p className='flex flex-wrap text-gray-300 text-base whitespace-pre-wrap'>
                                {tweet?.body}
                            </p>
                        </div>
                        {tweet?.image && (
                            <Image
                                src={tweet?.image!}
                                alt='file'
                                unoptimized
                                width={1000}
                                height={1000}
                                className='rounded-xl w-full max-h-80 object-cover mt-2'
                            />
                        )}
                        <div className='flex items-start gap-2 py-4'>
                            <span className='text-sm text-gray-400'>
                                {tweetTime()}
                            </span>
                        </div>
                        <div className='border border-neutral-800 w-full' />
                        <div className='py-3 w-full'>
                            <TweetItem tweet={tweet} />
                        </div>
                        <div className='border border-neutral-800 w-full' />
                        <div className='w-full py-1'>
                            <InputBox currentUser={currentUser} />
                        </div>
                    </div>
                </div>
            ) : (
                <TweetLoader />
            )}
        </>
    )
}

export default UserInfo
