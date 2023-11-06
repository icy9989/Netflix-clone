import { useRouter } from "next/navigation";
import { BsFillPlayFill } from "react-icons/bs";

interface PlayButtonProps {
  movieId: string
}

const PlayButton:React.FC<PlayButtonProps> = ({ movieId }) => {

  const router = useRouter();

  return (
    <div
        className="
            bg-white
            rounded-md
            px-2 md:px-4
            py-1 md:py-2
            font-semibold
            text-xs lg:text-lg
            hover:bg-neutral-300
            cursor-pointer
            transition
            flex 
            items-center
        "
        onClick={() => router.push(`/watch/${movieId}`)} 
    >
        <span className="w-4 h-4 lg:w-7 lg:h-7">
            <BsFillPlayFill size="100%" />
        </span>
        Play
    </div>
  )
}

export default PlayButton