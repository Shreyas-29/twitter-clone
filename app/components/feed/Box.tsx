'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { IoCloseOutline, IoChevronDown, IoEarth, IoEar } from 'react-icons/io5';
import { HiOutlineCalendar, HiOutlineChartBar, HiOutlineEmojiHappy, HiOutlineLocationMarker, HiOutlinePhotograph, HiX } from 'react-icons/hi';
import { BsPersonFillCheck } from 'react-icons/bs';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { User } from '@prisma/client';
import { useLoginModal } from '@/app/hooks';
import Progressbar from './Progressbar';
import axios from 'axios';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { CldUploadButton } from 'next-cloudinary';




type Variant = 'Everyone' | 'Twitter Circle';

interface InputBoxProps {
    currentUser: User | null;
}

const InputBox: React.FC<InputBoxProps> = ({
    currentUser
}) => {

    const loginModal = useLoginModal();

    const fileRef = useRef(null);

    const [input, setInput] = useState<string>("");
    const [showEmojis, setShowEmojis] = useState<boolean>(false);
    const [selectedFile, setSelectedFile] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [audience, setAudience] = useState<Variant | string>('Everyone');
    const [dropdown, setDropdown] = useState<boolean>(false);
    const [showAudience, setShowAudience] = useState<boolean>(false);
    const [progress, setProgress] = useState<number>(0);
    const [selectedImagePreview, setSelectedImagePreview] = useState('');
    const [isImageSelected, setIsImageSelected] = useState(false);



    // const handleTweet = useCallback(async () => {
    //     setIsLoading(true);

    //     if (!currentUser) {
    //         toast.error("Please sign in to tweet!");
    //         loginModal.onOpen();
    //         setIsLoading(false);
    //         return;
    //     }

    //     try {
    //         const body = JSON.stringify({
    //             input
    //         });

    //         const config = {
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             onUploadProgress: (progressEvent: any) => {
    //                 const progressPercentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
    //                 setProgress(progressPercentage);
    //             },
    //         };

    //         const response = await axios.post('/api/tweet', body, config);

    //         if (response.status !== 200) {
    //             throw new Error('Error posting tweet');
    //         }

    //         setInput("");
    //         toast.success("Your tweet has been posted!");

    //     } catch (error) {
    //         toast.error("Oops! Something went wrong.");
    //         console.error(error);
    //     } finally {
    //         setIsLoading(false);
    //         setProgress(100);
    //         setDropdown(false);
    //     }
    // }, [input, loginModal, currentUser, progress]);

    console.log("");

    // const handleTweet2 = useCallback(async () => {
    //     setIsLoading(true);

    //     if (!currentUser) {
    //         toast.error("Please sign in to tweet!");
    //         loginModal.onOpen();
    //         setIsLoading(false);
    //         setShowEmojis(false);
    //         return;
    //     }

    //     try {

    //         const formData = new FormData();
    //         formData.append('input', input);
    //         formData.append('image', selectedFile as string);

    //         const config = {
    //             headers: {
    //                 'Content-Type': 'multipart/form-data',
    //             },
    //             onUploadProgress: (progressEvent: any) => {
    //                 const progressPercentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
    //                 setProgress(progressPercentage);
    //             },
    //         };

    //         const response = await axios.post('/api/tweet', formData, config);

    //         if (response.status !== 200) {
    //             throw new Error('Error posting tweet');
    //         }

    //         setInput("");
    //         setShowEmojis(false);
    //         setSelectedFile(null);
    //         toast.success("Your tweet has been posted!");

    //     } catch (error) {
    //         toast.error("Oops! Something went wrong.");
    //         console.error(error);
    //     } finally {
    //         setIsLoading(false);
    //         setProgress(100);
    //         setDropdown(false);
    //         setShowEmojis(false);
    //     }
    // }, [input, loginModal, currentUser, progress, selectedFile]);

    const addEmoji = (e: any) => {
        let sym = e.unified.split("-");
        let codesArray: number[] = [];
        sym.forEach((el: string) => codesArray.push(parseInt("0x" + el, 16)));
        let emoji = String.fromCodePoint(...codesArray);
        setInput(input + emoji);
    };

    const toggleAudience = (text: Variant) => {
        setAudience(text);
        window.localStorage.setItem('audience', text);
        setDropdown(false);
    };

    // const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const file = event.target.files?.[0];

    //     console.log("slecting file", file);

    //     if (file) {
    //         // Check if the selected file is an image
    //         const fileType = file.type;
    //         const acceptedFileTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4', 'video/mpeg'];
    //         if (!acceptedFileTypes.includes(fileType)) {
    //             toast.error('Please select a valid image or video file');
    //             return;
    //         }

    //         // Check the file size
    //         const maxImageSize = 5 * 1024 * 1024; // 3MB in bytes
    //         const maxVideoSize = 10 * 1024 * 1024; // 3MB in bytes
    //         const maxSize = acceptedFileTypes.includes(fileType) ? maxVideoSize : maxImageSize;
    //         if (file.size > maxSize) {
    //             const maxSizeInMB = maxSize / (1024 * 1024);
    //             toast.error(`Please select a file up to ${maxSizeInMB}MB in size`);
    //             return;
    //         }

    //         setSelectedFile(file);
    //     }
    // };

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        console.log("selecting file", file);

        if (file) {
            // Check if the selected file is an image
            const fileType = file.type;
            const acceptedFileTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4', 'video/mpeg'];
            if (!acceptedFileTypes.includes(fileType)) {
                toast.error('Please select a valid image or video file');
                return;
            }

            // Check the file size
            const maxImageSize = 5 * 1024 * 1024; // 5MB in bytes
            const maxVideoSize = 10 * 1024 * 1024; // 10MB in bytes
            const maxSize = acceptedFileTypes.includes(fileType) ? maxVideoSize : maxImageSize;
            if (file.size > maxSize) {
                const maxSizeInMB = maxSize / (1024 * 1024);
                toast.error(`Please select a file up to ${maxSizeInMB}MB in size`);
                return;
            }

            // Get the file path or URL as a string
            const filePath = URL.createObjectURL(file);

            setSelectedFile(filePath);
        }
    };


    useEffect(() => {
        let text = window.localStorage.getItem('audience');
        setAudience(text as string);
    }, []);


    // const handleUpload = async (result: any) => {
    //     try {
    //         const image = result?.info?.secure_url;

    //         if (image) {
    //             setSelectedImagePreview(image);
    //             await axios.post('/api/tweet', {
    //                 input,
    //                 image
    //             });

    //             setInput('');
    //             toast.success('Your tweet has been posted!');
    //         } else {
    //             throw new Error('Error uploading image');
    //         }
    //     } catch (error) {
    //         toast.error('Oops! Something went wrong.');
    //         console.error(error);
    //     } finally {
    //         setIsLoading(false);
    //         setProgress(100);
    //         setDropdown(false);
    //     }
    // };

    const handleUpload = (result: any) => {
        const image = result?.info?.secure_url;

        if (image) {
            setSelectedImagePreview(image);
            setIsImageSelected(true);
        }
    };

    const upload = async () => {
        try {
            setIsLoading(true);

            if (isImageSelected) {
                // Make the API call with the image
                const response = await axios.post('/api/tweet', {
                    input,
                    image: selectedImagePreview
                });

                if (response.status !== 200) {
                    throw new Error('Error posting tweet');
                }
            } else {
                // Make the API call without the image
                const response = await axios.post('/api/tweet', {
                    input
                });

                if (response.status !== 200) {
                    throw new Error('Error posting tweet');
                }
            }

            setInput('');
            setSelectedImagePreview("");
            toast.success('Your tweet has been posted!');
        } catch (error) {
            toast.error('Oops! Something went wrong.');
            console.error(error);
        } finally {
            setIsLoading(false);
            setProgress(100);
            setDropdown(false);
            setIsImageSelected(false);
        }
    };


    const upload2 = async () => {

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            onUploadProgress: (progressEvent: any) => {
                const progressPercentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                setProgress(progressPercentage);
            },
        };

        await axios.post('/api/tweet', {
            input
        }, config)
            .then(() => {
                setInput("");
                setSelectedImagePreview("");
                toast.success("Your tweet has been posted!");
            })
            .catch((error) => {
                setSelectedImagePreview("");
                toast.error("Oops! Something went wrong.");
                console.error(error);
            })
            .finally(() => {
                setIsLoading(false);
                setProgress(100);
                setDropdown(false);
                setSelectedImagePreview("");
            })
    };


    return (
        <div className='flex flex-col items-center justify-center w-full'>
            <div className={`border-b border-neutral-800 flex w-full space-x-3 px-4 py-3 relative ${isLoading && 'opacity-70'}`}>
                <Image
                    src={'/images/user.png'}
                    alt='User Image'
                    width={1000}
                    height={1000}
                    className='w-12 h-12 rounded-full object-cover hover:brightness-110'
                />
                <div className='w-full'>
                    <div className={`${selectedFile && 'pb-8'} ${isLoading && 'pt-2'} relative`}>
                        {showAudience && !isLoading && (
                            <div className='py-1 pb-2'>
                                <div
                                    onClick={() => setDropdown((prev) => !prev)}
                                    className={`flex items-center w-max gap-1 px-3 py-1 rounded-full cursor-pointer hover:bg-neutral-800/80 text-xs font-medium border-2 ${audience === 'Everyone' ? 'border-blue-500 hover:border-blue-600 text-blue-500' : 'border-teal-500 hover:border-teal-600 text-teal-500'}`}
                                >
                                    <span>{audience || 'Everyone'}</span>
                                    <IoChevronDown className={`text-current w-4 h-4 ${dropdown ? 'rotate-180 transition transform duration-300' : 'rotate-0 transition transform duration-300'}`} />
                                </div>
                            </div>
                        )}
                        <AnimatePresence>
                            {dropdown && (
                                <motion.div
                                    initial={{ opacity: 0, translateY: -10 }}
                                    animate={{ opacity: 1, translateY: 0 }}
                                    exit={{ opacity: 0, translateY: -10 }}
                                    transition={{ duration: 0.3, type: 'spring' }}
                                    className='absolute top-10 z-40 left-0 bg-black/5 backdrop-blur-sm select-none'>
                                    <div className='flex flex-col items-start pt-4 pb-2 rounded-xl w-52 border border-neutral-800 bg-black/50 backdrop-blur-sm shadow-xl shadow-neutral-950/80'>
                                        <h4 className='text-lg font-semibold text-white px-5 mb-3'>
                                            Choose Audience
                                        </h4>
                                        <div onClick={() => toggleAudience('Everyone')} className='flex items-center w-full cursor-pointer transition-colors duration-300 px-5 py-2 hover:bg-[#16181c] gap-3'>
                                            <div className='w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 text-white'>
                                                <IoEarth className='w-4 h-4 text-current' />
                                            </div>
                                            <span className='font-medium text-sm text-gray-400'>
                                                Everyone
                                            </span>
                                        </div>
                                        <div onClick={() => toggleAudience('Twitter Circle')} className='flex items-center w-full cursor-pointer transition-colors duration-300 px-5 py-2 hover:bg-[#16181c] gap-3'>
                                            <div className='w-8 h-8 flex items-center justify-center rounded-full bg-teal-500 text-white'>
                                                <BsPersonFillCheck className='w-4 h-4 text-current' />
                                            </div>
                                            <span className='font-medium text-sm text-gray-400'>
                                                Twitter Circle
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                        <textarea
                            name='Tweet'
                            value={input}
                            placeholder="What's Happening?"
                            onChange={(e) => setInput(e.target.value)}
                            onFocus={() => setShowAudience(true)}
                            rows={1}
                            disabled={isLoading}
                            className={`focus:outline-none bg-transparent disabled:opacity-75 w-full min-h-[50px] resize-none pl-2 pt-2`}
                        />
                        {selectedImagePreview && (
                            <div className='relative mr-2 rounded-xl max-w-full'>
                                <button
                                    disabled={isLoading}
                                    onClick={() => setSelectedImagePreview('')}
                                    className='absolute w-8 h-8 bg-neutral-800/60 hover:bg-neutral-700 bg-opacity-75 rounded-xl flex items-center justify-center top-1 right-1 cursor-pointer disabled:opacity-70 disabled:cursor-auto'
                                >
                                    <IoCloseOutline className='w-6 h-6 text-white' />
                                </button>
                                <Image
                                    src={selectedImagePreview!}
                                    alt='Image'
                                    width={1000}
                                    height={1000}
                                    className='rounded-xl max-h-80 w-full object-cover'
                                />
                            </div>
                        )}
                    </div>
                    {!isLoading && (
                        <div className='flex items-center justify-between w-full pt-3'>
                            <div className='flex items-center justify-center space-x-2 relative z-50'>
                                <div className='icon group'>
                                    <CldUploadButton
                                        options={{ maxFiles: 1 }}
                                        onUpload={handleUpload}
                                        uploadPreset='ssqanesp'
                                    >
                                        <label htmlFor="file" className='relative cursor-pointer'>
                                            <HiOutlinePhotograph className='h-5 w-5 text-sky-500' />
                                            {/* <input
                                                type="file"
                                                name='file'
                                                id='file'
                                                ref={fileRef}
                                                onChange={handleFileSelect}
                                                className='sr-only'
                                            /> */}
                                            <p className='absolute top-10 -left-2 mx-auto px-2 py-1 tooltip'>
                                                Media
                                            </p>
                                        </label>
                                    </CldUploadButton>
                                </div>
                                <div className='icon group relative'>
                                    <HiOutlineChartBar className='h-5 w-5 text-sky-500 rotate-90' />
                                    <p className='absolute top-10 left-0 mx-auto px-2 py-1 tooltip'>
                                        Poll
                                    </p>
                                </div>
                                <div onClick={() => setShowEmojis((prev) => !prev)} className='icon group relative'>
                                    <HiOutlineEmojiHappy className='h-5 w-5 text-sky-500' />
                                    <p className='absolute top-10 -left-1 mx-auto px-2 py-1 tooltip'>
                                        Emoji
                                    </p>
                                </div>
                                <div className='icon group relative'>
                                    <HiOutlineCalendar className='h-5 w-5 text-sky-500' />
                                    <p className='absolute top-10 -left-3 mx-auto px-2 py-1 tooltip'>
                                        Schedule
                                    </p>
                                </div>
                                <div className='icon group relative cursor-not-allowed'>
                                    <HiOutlineLocationMarker className='h-5 w-5 text-sky-500 opacity-50 cursor-not-allowed' />
                                </div>
                                {showEmojis && (
                                    <div className='hidden sm:flex absolute top-12 sm:top-14 sm:left-3 shadow-2xl shadow-neutral-800/50 z-[100]'>
                                        <Picker
                                            onEmojiSelect={addEmoji}
                                            data={data}
                                            theme='dark'
                                        />
                                    </div>
                                )}
                            </div>
                            <div className='flex items-center justify-end ml-auto'>
                                <button
                                    onClick={upload}
                                    disabled={!input.trim() && !selectedFile}
                                    className='px-4 py-2 text-sm rounded-full text-white font-medium hover:bg-[#1a8cd8] bg-sky-500 disabled:opacity-50 disabled:cursor-auto cursor-pointer'
                                >
                                    Tweet
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {isLoading && (
                <Progressbar isLoading={isLoading} progress={progress} />
            )}
        </div>
    )
}

export default InputBox
