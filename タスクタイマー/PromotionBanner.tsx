import React from 'react';

const YouTubeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
);


const CHANNEL_URL = "https://www.youtube.com/@hrnch-o3p";

export const PromotionBanner = () => {
    return (
        <div className="bg-slate-800/50 rounded-lg p-4 border border-indigo-500/30 overflow-hidden">
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                <div className="flex-shrink-0">
                    <a href={CHANNEL_URL} target="_blank" rel="noopener noreferrer">
                       <YouTubeIcon />
                    </a>
                </div>
                <div className="flex-grow text-center sm:text-left">
                    <h3 className="font-bold text-lg text-indigo-400">はるの【エイム解説】のYouTubeチャンネル</h3>
                    <p className="text-slate-300 text-sm mt-1">YouTubeでFPSエイム練習１万時間チャレンジやエイム・デバイス解説やってます！</p>
                </div>
                <div className="w-full sm:w-auto flex-shrink-0">
                     <a 
                        href={CHANNEL_URL} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="block group text-center p-2 rounded-md hover:bg-slate-700/60 transition-colors"
                    >
                        <p className="text-sm font-semibold text-slate-200 group-hover:text-cyan-400 transition-colors">
                            チャンネルをチェック
                        </p>
                    </a>
                </div>
            </div>
        </div>
    );
};