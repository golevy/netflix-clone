import useSWR from "swr"
import fetcher from "~/lib/fetcher"

const useMovie = (id: string) => {
  const { data, error, isLoading } = useSWR(`/api/movie/${id}`, fetcher, {
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

export default useMovie
