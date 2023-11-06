import Image from 'next/image'
import { AiFillPlayCircle } from "react-icons/ai";
import { BiChevronDownCircle } from 'react-icons/bi';

import { MovieInterface } from '@/types'
import FavoriteButton from './favoriteButton';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import useInfoModal from '@/hooks/useInfoModal';

interface MovieCardProps {
    data: MovieInterface
}

const MovieCard:React.FC<MovieCardProps> = ({ data }) => {

    const router = useRouter();
    const { openModal } = useInfoModal();

    const handleOpenModal = useCallback(() => {
        openModal(data?.id);
    },[openModal])

    const watchMovie = useCallback(() => {
        router.push(`/watch/${data?.id}`)
    },[router])

  return (
    <div className='group w-full h-[12vw] relative'>
        <Image
            onClick={watchMovie}
            src={data.thumbnailUrl}
            alt='Movie' 
            fill
            className='
                object-cover rounded-md shadow-xl transition duration cursor-pointer
                group-hover:opacity-90
                sm:group-hover:opacity-0
            '
        />
        <div 
            className='
                w-full
                h-full
                absolute
                top-0
                scale-0
                opacity-0
                group-hover:scale-110
                group-hover:opacity-100
                group-hover:translate-x-[2vw]
                group-hover:translate-y-[-6vw]
                invisible
                sm:visible
                z-10
            '
        >
            <div className='w-full h-full relative'>
                <Image
                    onClick={watchMovie}
                    src={data.thumbnailUrl}
                    alt='Movie' 
                    fill
                    className='
                        object-cover shadow-xl transition duration cursor-pointer rounded-t-md'
                />
            </div>
            <div className='flex flex-col space-y-2 lg:space-y-2.5 bg-zinc-800 rounded-b-md p-3'>
                <div className='flex flex-row justify-between items-center'>
                    <div className='flex flex-row items-center'>
                        <div
                            onClick={watchMovie} 
                            className='w-6 h-6 lg:w-10 lg:h-10 cursor-pointer text-white hover:text-neutral-300 transition'
                        >
                            <AiFillPlayCircle size="90%" />
                        </div>
                        <FavoriteButton movieId={data?.id} className='w-6 h-6 lg:w-10 lg:h-10' />
                    </div>
                    <div
                        onClick={handleOpenModal}
                        className='w-6 h-6 lg:w-10 lg:h-10 cursor-pointer text-white hover:text-neutral-300 transition'
                    >
                        <BiChevronDownCircle size="90%" />
                    </div>
                </div>
                <p className='text-white font-semibold'><span className='text-green-400'>New</span> 2023</p>
                <p className='text-white text-[10px] lg:text-sm'>{data.duration}</p>
                <p className='text-white text-[8px] lg:text-sm'>{data.genre}</p>    
            </div>
        </div>
    </div>
  )
}

export default MovieCard