import Head from "next/head"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { AiOutlineArrowLeft } from "react-icons/ai"
import useMovie from "~/hooks/useMovie"
import { cn } from "~/lib/utils"

const NAV_DISAPPEAR_TIME = 2000

const Watch = () => {
  const router = useRouter()
  const { movieId } = router.query

  const { data } = useMovie(movieId as string)

  const [showNav, setShowNav] = useState(true)

  useEffect(() => {
    let timer: any

    const handleUserInteraction = () => {
      setShowNav(true)
      clearTimeout(timer)
      timer = setTimeout(() => setShowNav(false), NAV_DISAPPEAR_TIME)
    }

    window.addEventListener("mousemove", handleUserInteraction)
    window.addEventListener("keypress", handleUserInteraction)
    window.addEventListener("touchstart", handleUserInteraction)

    timer = setTimeout(() => setShowNav(false), NAV_DISAPPEAR_TIME)

    return () => {
      clearTimeout(timer)
      window.removeEventListener("mousemove", handleUserInteraction)
      window.removeEventListener("keypress", handleUserInteraction)
      window.removeEventListener("touchstart", handleUserInteraction)
    }
  }, [])

  return (
    <>
      <Head>
        <title>Video | {data?.title}</title>
        <meta name="description" content="Video" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="h-screen w-screen bg-black">
        <nav
          className={cn(
            "w-full p-4",
            "flex flex-row items-center gap-8 fixed",
            "z-10 bg-black bg-opacity-70 transition",
            showNav ? "opacity-100" : "opacity-0"
          )}
        >
          <AiOutlineArrowLeft
            onClick={() => router.push("/")}
            className="text-white cursor-pointer"
            size={40}
          />
          <p className="text-white text-xl md:text-3xl font-bold">
            <span className="font-light">Watching:</span>
            {data?.title}
          </p>
        </nav>

        <video
          autoPlay
          controls
          className="w-full h-full"
          src={data?.videoUrl}
        />
      </div>
    </>
  )
}

export default Watch
