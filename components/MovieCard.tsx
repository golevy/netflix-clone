import React from "react"
import { cn } from "~/lib/utils"
import { BsFillPlayFill } from "react-icons/bs"

interface MovieCardProps {
  data: Record<string, any>
}

const MovieCard: React.FC<MovieCardProps> = ({ data }) => {
  return (
    <div className="group bg-zinc-900 col-span-1 relative">
      <img
        className={cn(
          "w-full h-[12vh] lg:h-[16vh] xl:h-[20vh] 2xl:h-[22vh] rounded-md shadow-xl",
          "cursor-pointer object-cover",
          "transition duration-0 group-hover:opacity-90 sm:group-hover:opacity-0 delay-300"
        )}
        src={data.thumbnailUrl}
        alt="Thumbnail"
      />
      <div
        className={cn(
          "absolute top-0 z-10 w-full scale-0",
          "opacity-0 transition duration-200 delay-300",
          "invisible sm:visible",
          "group-hover:scale-110 group-hover:-translate-y-[6vh] group-hover:translate-x-[2vw] group-hover:opacity-100"
        )}
      >
        <img
          className={cn(
            "w-full h-[12vh] lg:h-[16vh] xl:h-[20vh] 2xl:h-[22vh]",
            "cursor-pointer object-cover shadow-xl rounded-t-md",
            "transition duration-0"
          )}
          src={data.thumbnailUrl}
          alt="Thumbnail"
        />
        <div
          className={cn(
            "w-full z-10 p-2 lg:p-4",
            "shadow-md rounded-b-md transition bg-zinc-800"
          )}
        >
          <div className="flex flex-row items-center gap-3">
            <div
              onClick={() => {}}
              className={cn(
                "w-6 h-6 lg:w-10 lg:h-10",
                "cursor-pointer rounded-full",
                "flex items-center justify-center",
                "transition bg-white hover:bg-neutral-300"
              )}
            >
              <BsFillPlayFill size={30} />
            </div>
          </div>

          <p className="text-green-400 font-semibold mt-4">
            New <span className="text-white">{new Date().getFullYear()}</span>
          </p>

          <div className="flex mt-4 gap-2 items-center">
            <p className="text-white text-[0.65rem] lg:text-sm">
              {data.duration}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieCard
