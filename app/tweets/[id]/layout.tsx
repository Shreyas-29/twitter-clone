import React from 'react';
import { TweetInfo } from './components';
import { getCurrentUser } from '@/app/actions';
import { EditModal, LoginModal, LogoutModal, RegisterModal } from '@/app/components';


export const metadata = {
    title: 'Tweet - Twitter',
    description: 'Twitter 2.0 by Shreyas',
}


export default async function TweetPageLayout({
    children
}: {
    children: React.ReactNode
}) {

    const currentUser = await getCurrentUser();

    return (
        <div>
            {children}
            <RegisterModal />
            <LoginModal />
            <LogoutModal />
            <EditModal user={currentUser} />
            <TweetInfo currentUser={currentUser} />
        </div>
    )
}
