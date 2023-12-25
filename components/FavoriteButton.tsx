import axios from "axios"
import React, { useCallback, useMemo } from "react"
import { AiOutlineCheck, AiOutlinePlus } from "react-icons/ai"
import useCurrentUser from "~/hooks/useCurrentUser"
import useFavorites from "~/hooks/useFavorites"
import { cn } from "~/lib/utils"

interface FavoriteButtonProps {
  movieId: string
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
  const { mutate: mutateFavorites } = useFavorites()
  const { data: currentUser, mutate } = useCurrentUser()

  const isFavorite = useMemo(() => {
    const list = currentUser?.favorites || []

    return list.includes(movieId)
  }, [currentUser, movieId])

  const toggleFavorites = useCallback(async () => {
    let response

    if (isFavorite) {
      response = await axios.delete("/api/favorite", { data: movieId })
    } else {
      response = await axios.post("/api/favorite", { movieId })
    }

    const updatedFavoriteIds = response?.data?.favoriteIds

    mutate({
      ...currentUser,
      favoriteIds: updatedFavoriteIds,
    })

    mutateFavorites()
  }, [movieId, isFavorite, currentUser, mutate, mutateFavorites])

  const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus

  return (
    <div
      onClick={toggleFavorites}
      className={cn(
        "w-6 h-6 lg:w-10 lg:h-10",
        "flex items-center justify-center",
        "cursor-pointer border-2 border-white rounded-full",
        "group/item",
        "transition hover:border-neutral-300"
      )}
    >
      <Icon className="text-white" size={25} />
    </div>
  )
}

export default FavoriteButton
