import { useRouter } from "next/router"
import React from "react"
import { BsFillPlayFill } from "react-icons/bs"
import { cn } from "~/lib/utils"

interface PlayButtonProps {
  movieId: string
}

const PlayButton: React.FC<PlayButtonProps> = ({ movieId }) => {
  const router = useRouter()

  return (
    <button
      onClick={() => router.push(`/watch/${movieId}`)}
      className={cn(
        "w-auto px-2 md:px-4 py-1 md:py-2",
        "flex flex-row items-center",
        "text-xs lg:text-lg font-semibold",
        "rounded-md transition bg-white hover:bg-neutral-300"
      )}
    >
      <BsFillPlayFill className="mr-1" size={22} />
      Play
    </button>
  )
}

export default PlayButton
