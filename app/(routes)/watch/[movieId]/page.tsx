"use client";

import useMovie from '@/hooks/useMovie'
import { useRouter } from 'next/navigation';
import React from 'react'
import { AiOutlineArrowLeft } from 'react-icons/ai'

const WatchPage = ({ params } : { params : { movieId: string }} ) => {

  const { data } = useMovie(params.movieId as string);
  const router = useRouter();

  return (
    <div className='w-screen h-screen'>
      <nav 
        className='
          w-full
          fixed
          text-white
          p-4
          flex 
          flex-row 
          items-center
          gap-8
          bg-black
          bg-opacity-70
          z-10
        '
      >
        <AiOutlineArrowLeft size={30} onClick={() => router.push("/")} className="cursor-pointer" />
        <p className='text-xl md:text-2xl lg:text-3xl font-bold'>
          <span className='font-light mr-2'>
            Watching:
          </span>
          {data?.title}
        </p>
      </nav>
      <video
        autoPlay
        controls
        src={data?.videoUrl}
        className='w-full h-full'
      />
    </div>
  )
}

export default WatchPage