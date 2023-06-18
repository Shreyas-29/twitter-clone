'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Post, User } from '@prisma/client';
import { IoChatbubbleOutline, IoShareSocialOutline } from 'react-icons/io5';
import { TbRepeat } from 'react-icons/tb';
import LikeButton from './LikeButton';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { CgSpinner } from 'react-icons/cg';


interface Tweet extends Post {
    user: User;
}

interface TweetItemProps {
    tweet: Tweet;
    user?: User | null;
}

const TweetItem: React.FC<TweetItemProps> = ({
    tweet,
    user
}) => {

    const [liked, setLiked] = useState<boolean>(false);
    const [count, setCount] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [hasLikedPost, setHasLikedPost] = useState<boolean>(false);

    const handleLike = (e: any) => {
        e.stopPropagation();

        setLiked((prev) => !prev);
        setCount(liked ? count - 1 : count + 1);
    };

    const tweetId = tweet?.id;

    const handleLike2 = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        setLoading(true);

        try {
            const response = await axios.post("/api/like", { tweetId });
            const data = response.data;

            if (response.status === 200) {
                setLiked(data);
                setCount(liked ? count - 1 : count + 1);
                setLoading(false);
                if (!hasLikedPost) {
                    toast.success("Nice work! Your timeline’s getting better. The more you like, the better your timeline will be – keep liking the stuff you’re into.");
                    setHasLikedPost(true);
                }
            } else {
                toast.error('Something went wrong!');
                setLoading(false);
            }

        } catch (error) {
            console.log('error', error);
            toast.error('Something went wrong!');
            setLoading(false);
        }

    }, [tweetId, liked, count, hasLikedPost]);

    useEffect(() => {
        try {
            const fetchLikeStatus = async () => {
                const response = await axios.get(`/api/like/${tweetId}`);
                const isLiked = response.data;
                setLiked(isLiked);
            };

            const fetchCount = async () => {
                const response = await axios.get(`/api/tweet/${tweetId}/count`);
                if (response.status === 200) {
                    const data = response.data;
                    setCount(data);
                } else {
                    console.log('Error fetching count:', response.status);
                }
            };

            fetchLikeStatus();
            fetchCount();
        } catch (error) {
            console.log('error', error);
        }
    }, [tweetId]);


    // Nice work! Your timeline’s getting better. The more you like, the better your timeline will be – keep liking the stuff you’re into.


    return (
        <div className='flex items-center justify-evenly w-full'>
            <button className='flex items-center py-1 gap-2 text-gray-500 hover:text-blue-500'>
                <IoChatbubbleOutline size={18} className='text-current' />
                <span className='text-sm text-current'>
                    1,786
                </span>
            </button>
            <button className='flex items-center py-1 gap-2 text-gray-500 hover:text-green-500'>
                <TbRepeat size={18} className='text-current rotate-90' />
                <span className='text-sm text-current'>
                    1,786
                </span>
            </button>
            <button
                onClick={(e: any) => handleLike2(e)}
                disabled={loading}
                className={`flex items-center py-1 gap-2 group disabled:cursor-not-allowed ${liked ? 'text-pink-600' : 'text-gray-500'}`}
            >
                {loading ? <CgSpinner className='w-5 h-5 text-pink-500 animate-spin' /> : <LikeButton liked={liked} onClick={handleLike} />}
                <span className='text-sm text-current'>
                    {count}
                </span>
            </button>
            <button className='flex items-center py-1 gap-2 text-gray-500 hover:text-cyan-500'>
                <IoShareSocialOutline size={18} className='text-current' />
                <span className='text-sm text-current'>
                    1,786
                </span>
            </button>
        </div>
    )
}

export default TweetItem
