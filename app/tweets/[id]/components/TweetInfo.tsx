'use client';

import { Header, Loader } from '@/app/components';
import { Post, User } from '@prisma/client';
import axios from 'axios';
import { usePathname } from 'next/navigation';
import React, { useState, useEffect, useCallback } from 'react';
import { UserDetails } from '.';

interface Tweet extends Post {
    user: User;
}

interface TweetProps {
    tweet: Tweet;
}

interface TweetInfoProps {
    currentUser: any;
}


const TweetInfo: React.FC<TweetInfoProps> = ({
    currentUser
}) => {

    const pathname = usePathname();

    const tweetId = pathname?.split('/').pop();

    const [tweet, setTweet] = useState<TweetProps>();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchTweets = async () => {
            try {
                if (!tweetId) {
                    console.log("Tweets not found");
                    return;
                }
                const response = await axios.get(`/api/singleTweet/${tweetId}`);
                const tweet = response.data;
                setTweet(tweet);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.log("Error fetching tweet", error);
            }
        };

        fetchTweets();
    }, [tweetId]);


    return (
        <div className='scrollbar-hide'>
            {loading ? (
                <Loader />
            ) : (
                <div>
                    <Header
                        title='Tweet' isBack
                    />
                    <UserDetails tweet={tweet!} currentUser={currentUser} />
                </div>
            )}
        </div>
    )
}

export default TweetInfo
