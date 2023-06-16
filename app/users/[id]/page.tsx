import React from 'react';
import { EditModal, LoginModal, LogoutModal, RegisterModal } from '@/app/components';
import { getCurrentUser } from '@/app/actions';

export default async function UserPage() {

    const currentUser = await getCurrentUser();

    return (
        <div>
            <LogoutModal />
            <LoginModal />
            <RegisterModal />
            <EditModal user={currentUser} />
        </div>
    )
}
