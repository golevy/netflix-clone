import { NextPageContext } from "next"
import { getSession } from "next-auth/react"
import BillBoard from "~/components/BillBoard"
import MovieList from "~/components/MovieList"
import Navbar from "~/components/Navbar"
import useFavorites from "~/hooks/useFavorites"
import useMovieList from "~/hooks/useMovieList"

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}

export default function Home() {
  const { data: movies = [] } = useMovieList()
  const { data: favorites = [] } = useFavorites()

  return (
    <>
      <Navbar />
      <BillBoard />
      <div className="pb-40">
        <MovieList title="Trending Now" data={movies} />
        <MovieList title="My Favorite List" data={favorites} />
      </div>
    </>
  )
}
