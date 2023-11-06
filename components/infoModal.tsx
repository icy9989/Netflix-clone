import { useCallback, useEffect, useState } from "react";
import { HiMiniXMark } from "react-icons/hi2";
import { MdOutlineTimer } from "react-icons/md";
import { BiMoviePlay } from "react-icons/bi";

import useInfoModal from "@/hooks/useInfoModal";
import useMovie from "@/hooks/useMovie";
import PlayButton from "./playButton";
import FavoriteButton from "./favoriteButton";

interface InfoModalProps {
    visible?: boolean,
    onClose: () => void
}

const InfoModal:React.FC<InfoModalProps> = ({ visible, onClose }) => {

    const [ isVisible, setIsVisible ] = useState<boolean>(!!visible);
    const { movieId } = useInfoModal();
    const { data = {}} = useMovie(movieId);

    useEffect(() => {
        setIsVisible(!!visible);
    },[visible])

    const handleClose = useCallback(() => {
        setIsVisible(false);
        setTimeout(() => {
            onClose();
        },300)
    },[onClose])

    if(!visible) {
        return null;
    }

  return (
    <div 
        className="
            z-50
            bg-black
            bg-opacity-80
            inset-0
            fixed
            overflow-x-hidden
            overflow-y-auto
            flex 
            justify-center
            items-center
            transition
            duration-300
        ">
        <div 
            className=
                {`${isVisible ? "scale-100" : "scale-0"} 
                w-auto max-w-3xl 
                bg-zinc-900 
                mx-auto 
                rounded-md 
                drop-shadow-md
                overflow-hidden
                transition
                duration-300
                `}
        >
            <div className="relative h-96">
                <video
                    autoPlay
                    loop
                    muted
                    poster={data.thumbnailUrl}
                    src={data.videoUrl} 
                    className="w-full h-full object-cover brightness-[60%]"
                />
                <div
                    onClick={handleClose} 
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black text-white bg-opacity-70 flex justify-center items-center cursor-pointer"
                >
                    <HiMiniXMark size="80%" />
                </div>
                <div className="absolute bottom-[10%] left-10">
                    <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-8">{data.title}</h1>
                    <div className="flex flex-row items-center gap-3">
                        <PlayButton movieId={data.id} />
                        <FavoriteButton movieId={data.id} className="w-6 h-6 md:w-8 md:h-8 lg:w-12 lg:h-12" />
                    </div>
                </div>
            </div> 

            <div className="px-12 py-8 text-white text-md md:text-lg space-y-1">
                <p className="text-green-400 font-semibold">New</p>
                <p className="flex flex-row items-center gap-2"><MdOutlineTimer />{data.duration}</p>
                <p className="flex flex-row items-center gap-2"><BiMoviePlay />{data.genre}</p>
                <p>{data.description}</p>
            </div>

        </div>    
    </div>
  )
}

export default InfoModal