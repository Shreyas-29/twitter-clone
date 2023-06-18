'use client';

import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';


interface ProgressbarProps {
    isLoading?: boolean;
    progress: number | string;
}


const Progressbar: React.FC<ProgressbarProps> = ({ isLoading, progress }) => {

    const progressAnimation = useAnimation();

    useEffect(() => {
        if (isLoading) {
            progressAnimation.start({
                width: `${progress}%`,
                transition: { duration: 0.6 },
            });
        } else {
            progressAnimation.set({ width: 0 });
        }
    }, [isLoading, progress, progressAnimation]);


    return (
        <div className="w-full h-[2.5px] bg-transparent rounded-full">
            {isLoading && (
                <motion.div
                    className="h-full bg-gradient-to-r from-sky-400 to-blue-500 rounded-full transition-transform duration-500"
                    style={{
                        width: `${progress}%`,
                    }}
                    animate={progressAnimation}
                ></motion.div>
            )}
        </div>
    );
};

export default Progressbar;
