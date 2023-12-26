import axios, { AxiosResponse } from "axios"
import React, { useCallback, useEffect, useMemo, useState } from "react"
import { AiOutlineCheck, AiOutlinePlus } from "react-icons/ai"
import useCurrentUser from "~/hooks/useCurrentUser"
import useFavorites from "~/hooks/useFavorites"
import { cn } from "~/lib/utils"

interface FavoriteButtonProps {
  movieId: string
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
  const { mutate: mutateFavorites } = useFavorites()
  const { data: currentUser, mutate: mutateUser } = useCurrentUser()
  const [favoriteStatus, setFavoriteStatus] = useState(false)

  const isFavorite = useMemo(() => favoriteStatus, [favoriteStatus, movieId])

  const toggleFavorites = useCallback(async () => {
    try {
      const userId = currentUser?.id
      if (!userId) {
        throw new Error("User ID is missing")
      }

      let response: AxiosResponse<{ favoriteIds: string[] }>

      if (isFavorite) {
        response = await axios.delete("/api/favorite", {
          data: { movieId, userId },
        })
      } else {
        response = await axios.post("/api/favorite", { movieId, userId })
      }

      if (response?.data?.favoriteIds) {
        mutateUser((currentUser: any) => ({
          ...currentUser,
          favorites: response.data.favoriteIds,
        }))

        mutateFavorites()
      }
    } catch (error) {
      console.error("Error toggling favorites: ", error)
    }

    mutateFavorites()
  }, [isFavorite, movieId, mutateFavorites, mutateUser, currentUser?.id])

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      try {
        const response = await axios.get(
          `/api/check-favorites?movieId=${movieId}`
        )
        setFavoriteStatus(response.data.isFavorite)
      } catch (error) {
        console.error("Error checking favorite status: ", error)
      }
    }

    checkFavoriteStatus()
  }, [movieId, toggleFavorites, currentUser?.id, isFavorite])

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
