'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Post, User } from '@prisma/client';
import Avatar from '../Avatar';
import { formatDistanceToNowStrict } from 'date-fns';
import TweetItem from './TweetItem';
import { IoEllipsisHorizontal, IoCheckboxOutline, IoBanOutline, IoFlagOutline, IoTrashOutline, IoCreateOutline } from 'react-icons/io5';
import { useRouter } from 'next/navigation';
import { BsPersonPlus, BsPinAngle, BsLightningCharge } from 'react-icons/bs';
import { FiBarChart2 } from 'react-icons/fi';
import { HiOutlineEmojiSad } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { CgSpinner } from 'react-icons/cg';
import Image from 'next/image';


interface Tweet extends Post {
    user: User;
}

interface TweetProps {
    tweet: Tweet;
    user: User | null;
}

const Tweet: React.FC<TweetProps> = ({
    tweet,
    user
}) => {

    const router = useRouter();

    const [showInfo, setShowInfo] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const tweetTime = useMemo(() => {
        if (!tweet?.createdAt) {
            return null;
        }
        return formatDistanceToNowStrict(new Date(tweet?.createdAt));
    }, [tweet?.createdAt]);

    const handleShowInfo = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        setShowInfo((prev) => !prev);
    }

    const goToTweet = useCallback(() => {
        router.push(`/tweets/${tweet?.id}`);
    }, [router, tweet?.id]);

    const goToUser = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        router.push(`/users/${tweet?.userId}`);
    }, [router, tweet?.userId]);

    const handleDeleteTweet = useCallback(async (tweetId: string | undefined, event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        setLoading(true);

        try {
            await axios.delete(`/api/post/${tweetId}`);

            setShowInfo(false);
            toast.success('Tweet has been deleted!');
            router.refresh();
        } catch (error) {
            toast.error('Oops! Something went wrong.');
            console.error(error);
        } finally {
            setLoading(false);
        }

    }, [router]);


    return (
        <div className='border-b border-neutral-800 pt-2 px-4 hover:bg-neutral-950 transition-colors duration-300 ease-out'>
            <div onClick={goToTweet} className='flex flex-col items-center justify-start w-full cursor-pointer'>
                <div className='flex items-start justify-between w-full relative'>
                    <div className='flex items-start justify-start w-full gap-3'>
                        <div onClick={goToUser} className='flex- pt-2 w-12 cursor-pointer'>
                            <Avatar url={tweet?.user?.profileImage! || tweet?.user?.coverImage!} />
                        </div>
                        <div className='flex flex-col items-start justify-between w-full'>
                            <div className='flex items-start justify-between w-full'>
                                <div className='flex flex-col items-start w-full'>
                                    <div onClick={goToUser} className='flex items-center gap-2 pt-1 cursor-pointer'>
                                        <h4 className='text-base font-medium text-white capitalize hover:underline hover:underline-offset-1'>
                                            {tweet?.user?.name}
                                        </h4>
                                        <div className='flex items-center'>
                                            <span className='text-sm text-gray-500 lowercase'>
                                                @{tweet?.user?.username}
                                            </span>
                                            <span className='mx-1 text-gray-400'>·</span>
                                            <span className='text-sm text-gray-500'>
                                                {tweetTime}
                                            </span>
                                        </div>
                                    </div>
                                    <div className='w-full'>
                                        <p className='flex flex-wrap text-gray-300 text-base whitespace-pre-wrap'>
                                            {tweet?.body}
                                        </p>
                                    </div>
                                </div>
                                <div className='w-10'>
                                    <div onClick={handleShowInfo} className='w-9 h-9 flex items-center justify-center rounded-full bg-transparent hover:bg-sky-300/10 text-gray-300 hover:text-sky-500 item active:scale-90 transition transform duration-300'>
                                        <IoEllipsisHorizontal className='w-5 h-5 text-current' />
                                    </div>
                                </div>
                            </div>
                            {tweet?.image && (
                                <Image
                                    src={tweet?.image!}
                                    alt='Image'
                                    unoptimized
                                    priority={true}
                                    width={1000}
                                    height={1000}
                                    className='rounded-xl max-h-80 w-full object-cover mt-3'
                                />
                            )}
                        </div>
                    </div>
                    <AnimatePresence>
                        {showInfo && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1, transformOrigin: 'top right' }}
                                exit={{ opacity: 0, scale: 0 }}
                                transition={{ duration: 0.5, type: 'spring' }}
                                className='absolute top-8 right-4 w-60 bg-black z-50 rounded-2xl border border-neutral-800 shadow-xl shadow-neutral-900'>
                                {user && user?.id === tweet?.user?.id ? (
                                    <div className='flex flex-col items-start w-full select-none rounded-2xl'>
                                        <div onClick={goToTweet} className='flex items-center justify-start w-full hover:bg-neutral-900/60 px-5 py-3 gap-3 rounded-t-2xl text-gray-200 pt-4'>
                                            <IoCreateOutline className='w-5 h-5 text-current' />
                                            <span className='text-sm'>
                                                Edit this tweet
                                            </span>
                                        </div>
                                        <div className='flex items-center justify-start w-full hover:bg-neutral-900/60 px-5 py-3 gap-3 text-gray-200'>
                                            <BsLightningCharge className='w-5 h-5 text-current' />
                                            <span className='text-sm'>
                                                Boost tweet
                                            </span>
                                        </div>
                                        <div className='flex items-center justify-start w-full hover:bg-neutral-900/60 px-5 py-3 gap-3 text-gray-200'>
                                            <FiBarChart2 className='w-5 h-5 text-current' />
                                            <span className='text-sm'>
                                                View analytics
                                            </span>
                                        </div>
                                        <div className='flex items-center justify-start w-full hover:bg-neutral-900/60 px-5 py-3 gap-3 text-gray-200'>
                                            <BsPinAngle className='w-5 h-5 text-current' />
                                            <span className='text-sm'>
                                                Pin to profile
                                            </span>
                                        </div>
                                        <div onClick={(e) => handleDeleteTweet(tweet?.id, e)} className={`flex items-center justify-between w-full hover:bg-neutral-900/60 px-5 py-3 text-rose-500 pb-4 rounded-b-2xl ${loading && 'opacity-70 cursor-not-allowed'}`}>
                                            <div className='flex items-center w-full gap-3'>
                                                <IoTrashOutline className='w-5 h-5 text-current' />
                                                <span className='text-sm'>
                                                    {loading ? 'Deleting...' : 'Delete'}
                                                </span>
                                            </div>
                                            {loading && (
                                                <CgSpinner className='w-5 h-5 text-current animate-spin' />
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    <div className='flex flex-col items-start w-full select-none'>
                                        <div className='flex items-center justify-start w-full hover:bg-neutral-900/60 px-5 py-3 gap-3 text-gray-200 pt-4 rounded-t-2xl'>
                                            <BsPersonPlus className='w-5 h-5 text-current' />
                                            <span className='text-sm'>
                                                Follow {tweet?.user?.name}
                                            </span>
                                        </div>
                                        <div className='flex items-center justify-start w-full hover:bg-neutral-900/60 px-5 py-3 gap-3 text-gray-200'>
                                            <IoCheckboxOutline className='w-5 h-5 text-current' />
                                            <span className='text-sm'>
                                                Add in from lists
                                            </span>
                                        </div>
                                        <div className='flex items-center justify-start w-full hover:bg-neutral-900/60 px-5 py-3 gap-3 text-gray-200'>
                                            <HiOutlineEmojiSad className='w-5 h-5 text-current' />
                                            <span className='text-sm'>
                                                Not interested
                                            </span>
                                        </div>
                                        <div className='flex items-center justify-start w-full hover:bg-neutral-900/60 px-5 py-3 gap-3 text-gray-200'>
                                            <IoBanOutline className='w-5 h-5 text-current' />
                                            <span className='text-sm'>
                                                Block @{tweet?.user?.username}
                                            </span>
                                        </div>
                                        <div className='flex items-center justify-start w-full hover:bg-neutral-900/60 px-5 py-3 gap-3 text-gray-200 pb-4 rounded-b-2xl'>
                                            <IoFlagOutline className='w-5 h-5 text-current' />
                                            <span className='text-sm'>
                                                Report Tweet
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
                <div className='py-2 w-full'>
                    <TweetItem tweet={tweet} user={user} />
                </div>
            </div>
        </div>
    )
}

export default Tweet
