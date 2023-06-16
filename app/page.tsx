import React from 'react';
import { Header, InputBox, LoginModal, RegisterModal, LogoutModal, TweetFeed, EditModal } from './components';
import { getCurrentUser, getTweets } from './actions';


export default async function HomePage() {

    const currentUser = await getCurrentUser();

    const tweets = await getTweets();

    return (
        <>
            <RegisterModal />
            <LoginModal />
            <LogoutModal />
            <EditModal user={currentUser} />
            <Header title='Home' />
            <InputBox currentUser={currentUser} />
            <TweetFeed tweets={tweets} currentUser={currentUser} />
        </>
    )
};

// mongodb password: XZI1eyIC8MGonst8