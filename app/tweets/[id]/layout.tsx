import React from 'react';
import { TweetInfo } from './components';
import { getCurrentUser } from '@/app/actions';


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
        <div className='scrollbar-hide overflow-y-scroll'>
            {children}
            <TweetInfo currentUser={currentUser} />
        </div>
    )
}
