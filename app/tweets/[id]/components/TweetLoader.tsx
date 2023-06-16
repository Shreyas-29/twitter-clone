import React from 'react'

const TweetLoader = () => {
    return (
        <div className='w-full flex flex-col items-start gap-4 py-20 px-4'>
            <div className='w-24 h-4 rounded bg-neutral-900 animate-pulse' />
            <div className='w-32 h-6 rounded bg-neutral-900 animate-pulse' />
            <div className='w-80 h-10 rounded bg-neutral-900 animate-pulse' />
        </div>
    )
}

export default TweetLoader
