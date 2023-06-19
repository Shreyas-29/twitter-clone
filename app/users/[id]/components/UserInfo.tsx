'use client';

import React, { useState, useEffect } from 'react';
import { Post, User } from '@prisma/client';
import { Header, Loader } from '@/app/components';
import { usePathname } from 'next/navigation';
import UserBio from './UserBio';
import UserHero from './UserHero';
import axios from 'axios';
import TweetFeed from './TweetFeed';
import { pusherClient } from '@/app/libs/pusher';



interface UserInfoProps {
    currentUser: User | null;
}


const UserInfo: React.FC<UserInfoProps> = ({
    currentUser
}) => {

    const pathname = usePathname();

    const userId = pathname?.split('/').pop();

    const [user, setUser] = useState<any>();
    const [posts, setPosts] = useState<any[]>();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                if (!userId) {
                    console.log("No user ID found");
                    return;
                }
                const response = await axios.get(`/api/tweets/${userId}`);
                const tweets = response.data;
                setPosts(tweets);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user posts:', error);
            }
        };

        const fetchUser = async () => {
            try {
                if (!userId) {
                    console.log("No user ID found");
                    return;
                }
                const response = await axios.get(`/api/user/${userId}`);
                const users = response.data;
                setUser(users);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchPosts();
        fetchUser();

        const channel = pusherClient.subscribe('tweets');

        const newTweetHandler = (newTweet: Post) => {
            setPosts((currentTweets) => {
                if (currentTweets?.some((tweet) => tweet.id === newTweet.id)) {
                    return currentTweets;
                }

                return [newTweet, ...currentTweets!];
            });
        };

        const removeTweetHandler = (tweetId: string) => {
            setPosts((currentTweets) => {
                return currentTweets?.filter((tweet) => tweet.id !== tweetId);
            });
        };

        channel.bind('tweets:new', newTweetHandler);
        channel.bind('tweets:remove', removeTweetHandler);

        return () => {
            pusherClient.unsubscribe('tweets');
            channel.unbind('tweets:new', newTweetHandler);
            channel.unbind('tweets:remove', removeTweetHandler);
        };

    }, [userId]);

    return (
        <div className='pb-40'>
            {loading ? (
                <div className='mt-20'>
                    <Loader />
                </div>
            ) : (
                <div>
                    <Header
                        title={user?.name} isBack
                    />
                    <UserHero
                        user={user}
                        currentUser={currentUser}
                        userId={userId}
                    />
                    <UserBio
                        user={user}
                    />
                    <TweetFeed
                        user={currentUser}
                        posts={posts}
                    />
                </div>
            )}
        </div>
    )
}

export default UserInfo
