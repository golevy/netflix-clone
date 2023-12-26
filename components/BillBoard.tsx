import React from "react"
import useBillBoard from "~/hooks/useBillboard"
import { cn } from "~/lib/utils"
import { AiOutlineInfoCircle } from "react-icons/ai"
import PlayButton from "~/components/PlayButton"

const BillBoard = () => {
  const { data } = useBillBoard()

  return (
    <div className="relative h-[56.25vh]">
      <video
        className="w-full h-[56.25vh] object-cover brightness-[60%]"
        autoPlay
        muted
        loop
        poster={data?.thumbnailUrl}
        src={data?.videoUrl}
      />
      <div className="absolute top-[30%] md:top-[40%] ml-4 md:ml-16">
        <p className="text-white text-xl md:text-5xl h-full w-[50%] lg:text-6xl font-bold drop-shadow-xl">
          {data?.title}
        </p>
        <p className="text-white text-[8px] md:text-lg mt-3 md:mt-8 w-[90%] md:w-[80%] lg:w-[50%] drop-shadow-xl">
          {data?.description}
        </p>
        <div className="flex flex-row items-center mt-3 md:mt-4 gap-3">
          <PlayButton movieId={data?.id} />
          <button
            className={cn(
              "flex flex-row items-center",
              "rounded-md bg-opacity-30 hover:bg-opacity-20 transition bg-white",
              "py-1 md:py-2 px-2 md:px-4 w-auto",
              "text-xs lg:text-lg font-semibold text-white "
            )}
          >
            <AiOutlineInfoCircle className="mr-1" size={22} />
            More info
          </button>
        </div>
      </div>
    </div>
  )
}

export default BillBoard
