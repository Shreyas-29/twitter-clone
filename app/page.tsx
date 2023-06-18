import React from 'react';
import { Header, InputBox, LoginModal, RegisterModal, LogoutModal, TweetFeed, EditModal } from './components';
import { getCurrentUser, getTweets } from './actions';
import getLike from './actions/getLike';
import getCount from './actions/getCount';


export default async function HomePage() {

    const currentUser = await getCurrentUser();
    const tweets = await getTweets();

    const tweetId = tweets?.map((tweet) => tweet?.id);

    const liked = await getLike(tweetId[0]);
    const count = await getCount(tweetId[0]);

    return (
        <>
            <RegisterModal />
            <LoginModal />
            <LogoutModal />
            <EditModal user={currentUser} />
            <Header title='Home' user={currentUser} />
            <InputBox currentUser={currentUser} />
            <TweetFeed currentUser={currentUser} liked={liked} count2={count} />
        </>
    )
};
