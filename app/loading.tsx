import React from 'react';
import { Loader } from './components';

const Loading = () => {
    return (
        <div className='bg-black absolute inset-0 w-screen h-screen overflow-hidden scrollbar-hide flex items-center justify-center z-[1000]'>
            <Loader />
        </div>
    )
}

export default Loading
