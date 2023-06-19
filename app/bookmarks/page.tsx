import React from 'react';
import { Header, LoginModal, LogoutModal, RegisterModal } from '@/app/components';
import Bookmarks from './components/Bookmarks';

export default async function BookMarkPage() {

    return (
        <div>
            <LogoutModal />
            <LoginModal />
            <RegisterModal />
            <Header title='Bookmarks' isBack />
            <Bookmarks />
        </div>
    )
}
