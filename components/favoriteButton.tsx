import { useCallback, useMemo } from "react";
import axios from "axios";
import { AiOutlinePlusCircle, AiOutlineCheckCircle } from "react-icons/ai";

import useCurrentUser from "@/hooks/useCurrentUser";
import useFavorites from "@/hooks/useFavorites";

interface FavoriteButtonProps {
    movieId: string,
    className: string
}

const FavoriteButton:React.FC<FavoriteButtonProps> = ({ movieId, className }) => {

    const { mutate: mutateFavorites }= useFavorites();
    const { data:currentUser, mutate } = useCurrentUser();

    const isFavorite = useMemo(() => {
        const list = currentUser?.favoriteIds || []

        return list.includes(movieId);
    },[currentUser, movieId]);

    const toggleFavorites = useCallback(async () => {
        let response;

        if(isFavorite) {
            response = await axios.delete("/api/favorite", { data: { movieId } });
        } else {
            response = await axios.post("/api/favorite", { movieId });
        }

        const updatedFavoriteIds = response?.data?.favoriteIds;

        mutate({
            ...currentUser,
            updatedFavoriteIds
        })

        mutateFavorites();
    },[isFavorite, currentUser, movieId, mutate, mutateFavorites]);

    const Icon = isFavorite ? AiOutlineCheckCircle : AiOutlinePlusCircle;

  return (
    <div
        onClick={toggleFavorites} 
        className={`${className} text-white hover:text-neutral-300 transition cursor-pointer`}
    >
        <Icon size="90%" />
    </div>
  )
}

export default FavoriteButton