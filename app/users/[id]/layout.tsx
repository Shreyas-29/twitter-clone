import { getCurrentUser } from '@/app/actions';
import React from 'react';
import { UserInfo } from './components';


export const metadata = {
    title: 'Profile - Twitter',
    description: 'Twitter 2.0 by Shreyas',
}


export default async function UserPageLayout({
    children
}: {
    children: React.ReactNode
}) {
    const currentUser = await getCurrentUser();

    return (
        <div>
            {children}
            <UserInfo currentUser={currentUser} />
        </div>
    )
}
