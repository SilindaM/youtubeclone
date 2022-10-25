import React from 'react'
import { Link } from 'react-router-dom';
import { HomePageVideos } from '../types';

export default function Card({data}:{data:HomePageVideos}) {
    const isData=data ? true : false;
    return (
        <div className='w-64 h-60 flex gap-3 flex-col'>
            <span className='absolute.bottom-3right-3.text-sm.bg-gray-900.px-2.py-0.5.z-10'>
                {data.videoDuration}
            </span>
            <Link to={`/watch/${data.videoId}`}>
            
                <img src={data.videoThumbnail} alt="thumbnail"  className='h-44 w-72'/>
                </Link>
        </div>
    )
}
