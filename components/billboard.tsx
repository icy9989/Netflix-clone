import { AiOutlineInfoCircle } from "react-icons/ai";

import useBillboard from "@/hooks/useBillboard"
import PlayButton from "./playButton";
import { useCallback } from "react";
import useInfoModal from "@/hooks/useInfoModal";

const Billboard = () => {

    const { data } = useBillboard();
    const { openModal } = useInfoModal();

    const handleOpenModal = useCallback(() => {
        openModal(data?.id)
    },[openModal, data?.id]);

  return (
    <div className="relative h-[56.25vw]">
        <video
            src={data?.videoUrl} 
            poster={data?.thumbnailUrl}
            autoPlay
            muted
            loop
            className="w-full h-[56.25vw] object-cover brightness-[60%] transition duration-500"
        />
        <div className="absolute w-full top-[30%] md:top-[40%] ml-4 md:ml-16">
            <h1 className="text-white w-[50%] text-1xl md:text-4xl lg:text-5xl font-bold drop-shadow-xl">{data?.title}</h1>
            <p className="text-white w-[90%] md:w-[80%] lg:w-[50%] text-[8px] md:text-lg mt-3 md:mt-8 drop-shadow-xl">{data?.description}</p>
            <div className="flex flex-row items-center gap-3 mt-3 md:mt-4">
                <PlayButton movieId={data?.id} />
                <button 
                    onClick={handleOpenModal}
                    className="
                        bg-white 
                        text-white
                        bg-opacity-30 
                        hover:bg-opacity-20 
                        px-2 md:px-4
                        py-1 md:py-2
                        rounded-md
                        text-xs lg:text-lg
                        font-semibold
                        transition
                        flex
                        justify-center
                        items-center
                    ">
                    <AiOutlineInfoCircle className="mr-1" />
                    More Info
                </button>
            </div>
        </div>
    </div>
  )
}

export default Billboard