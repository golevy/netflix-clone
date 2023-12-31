import useSWR from "swr"
import fetcher from "~/lib/fetcher"

const useMovieList = () => {
  const { data, error, isLoading } = useSWR("/api/all-movies", fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })

  return {
    data,
    error,
    isLoading,
  }
}

export default useMovieList
