import React from 'react';
import { Header, LoginModal, LogoutModal, RegisterModal } from '@/app/components';
import { getCurrentUser } from '../actions';
import { NotificationFeed } from './components';


export const metadata = {
    title: 'Notifications - Twitter',
    description: 'Twitter 2.0 by Shreyas',
}


export default async function NotificationsPage() {

    const currentUser = await getCurrentUser();

    return (
        <div>
            <RegisterModal />
            <LoginModal />
            <LogoutModal />
            <Header title='Notifications' isBack />
            <NotificationFeed currentUser={currentUser} />
        </div>
    )
}
