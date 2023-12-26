import React, { useCallback, useEffect, useState } from "react"
import { AiOutlineClose } from "react-icons/ai"
import useInfoModal from "~/hooks/useInfoModal"
import useMovie from "~/hooks/useMovie"
import { cn } from "~/lib/utils"
import PlayButton from "~/components/PlayButton"
import FavoriteButton from "~/components/FavoriteButton"

const MODAL_CLOSE_DURATION = 300

interface InfoModalProps {
  visible?: boolean
  onClose: any
}

const InfoModal: React.FC<InfoModalProps> = ({ visible, onClose }) => {
  const [isVisible, setIsVisible] = useState(!!visible)

  const { movieId } = useInfoModal()
  const { data = {} } = useMovie(movieId as string)

  useEffect(() => {
    setIsVisible(!!visible)
  }, [visible])

  const handleClose = useCallback(() => {
    setIsVisible(false)
    setTimeout(() => {
      onClose()
    }, MODAL_CLOSE_DURATION)
  }, [onClose])

  if (!visible) {
    return null
  }

  return (
    <div
      className={cn(
        "z-50 fixed inset-0 bg-black bg-opacity-80",
        "flex items-center justify-center",
        "transition duration-300",
        "overflow-x-hidden overflow-y-auto"
      )}
    >
      <div className="relative w-auto mx-auto max-w-3xl rounded-md overflow-hidden">
        <div
          className={cn(
            "relative flex-auto",
            "drop-shadow-md bg-zinc-900",
            "transform duration-300",
            isVisible ? "scale-100" : "scale-0"
          )}
        >
          <div className="relative h-96">
            <video
              autoPlay
              muted
              loop
              poster={data?.thumbnailUrl}
              src={data?.videoUrl}
              className="w-full brightness-[60%] object-cover h-full"
            />
            <div
              onClick={handleClose}
              className={cn(
                "w-10 h-10",
                "flex items-center justify-center",
                "absolute top-3 right-3",
                "rounded-full cursor-pointer bg-black bg-opacity-70"
              )}
            >
              <AiOutlineClose className="text-white" size={20} />
            </div>
            <div className="absolute bottom-[10%] left-10">
              <p className="text-white text-3xl md:text-4xl h-full lg:text-5xl font-bold mb-8">
                {data?.title}
              </p>
              <div className="flex gap-4 items-center">
                <PlayButton movieId={data?.id} />
                <FavoriteButton movieId={data?.id} />
              </div>
            </div>
          </div>

          <div className="px-12 py-8">
            <p className="text-green-400 font-semibold text-lg">New</p>
            <p className="text-white text-lg">{data?.duration}</p>
            <p className="text-white text-lg">{data?.genre}</p>
            <p className="text-white text-lg">{data?.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InfoModal
