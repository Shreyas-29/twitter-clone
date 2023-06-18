'use client';

import React, { useState, useEffect, FormEvent } from 'react';
import { User } from '@prisma/client';
import { useEditModal, useLoginModal } from '@/app/hooks';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Input from '../Input';
import ImageUpload from '../../users/[id]/components/ImageUpload';
import Modal from '../Modal';
import { useRouter } from 'next/navigation';
import { pusherClient } from '@/app/libs/pusher';


interface EditModalProps {
    user: User | null;
}

const EditModal: React.FC<EditModalProps> = ({
    user
}) => {

    const editModal = useEditModal();
    const loginModal = useLoginModal();

    const router = useRouter();

    const [profileImage, setProfileImage] = useState<string>('');
    const [coverImage, setCoverImage] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [bio, setBio] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);


    const handleCoverImage = (result: any) => {
        const image = result?.info?.secure_url;

        if (image) {
            setCoverImage(image);
        }
    };

    const handleProfileImage = (result: any) => {
        const image = result?.info?.secure_url;

        if (image) {
            setProfileImage(image);
        }
    };


    const handleSave = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        try {

            if (!name || !username || !bio || !profileImage || !coverImage) {
                setError(true);
                setIsLoading(false);
                return;
            }

            if (!user) {
                toast.error("Please sign in to tweet!");
                loginModal.onOpen();
                setIsLoading(false);
                return;
            }

            await axios.post('/api/edit', {
                name,
                username,
                bio,
                profileImage,
                coverImage
            })

            router.refresh();
            toast.success("Profile updated!");
            editModal.onClose();

        } catch (error) {
            toast.error('Something went wrong!');
            console.log('error', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {

        setProfileImage(user?.profileImage!);
        setCoverImage(user?.coverImage!);
        setName(user?.name!);
        setUsername(user?.username!);
        setBio(user?.bio!);

        const channel = pusherClient.subscribe('user');

        channel.bind('profile:update', (data: any) => {
            setProfileImage(data.profileImage);
            setCoverImage(data.coverImage);
            setName(data.name);
            setUsername(data.username);
            setBio(data.bio);
        });

        return () => {
            pusherClient.unsubscribe('user');
            channel.unbind('profile:update');
        };
    }, [user?.name, user?.username, user?.bio, user?.profileImage, user?.coverImage]);



    const body = (
        <div className='flex flex-col items-start w-full gap-4'>
            <ImageUpload
                user={user}
                coverImage={coverImage}
                profileImage={profileImage}
                handleCoverImage={handleCoverImage}
                handleProfileImage={handleProfileImage}
            />
            <div className='flex flex-col items-start gap-4 w-full pt-10'>
                <Input
                    placeholder='Name'
                    type='text'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={isLoading}
                />
                <Input
                    placeholder='Username'
                    type='text'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    disabled={isLoading}
                />
                <Input
                    placeholder='Bio'
                    type='text'
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    disabled={isLoading}
                />
                {error && <p className='py-1 text-xs text-rose-500'>All fields are required!</p>}
            </div>
        </div>
    )


    return (
        <Modal
            title='Edit Profile'
            actionLabel='Save'
            disabled={isLoading}
            isLoading={isLoading}
            isOpen={editModal.isOpen}
            onClose={editModal.onClose}
            onSubmit={handleSave}
            body={body}
        />
    )
}

export default EditModal
