import useSWR from "swr"

import fetcher from "~/lib/fetcher"

const useBillBoard = () => {
  const { data, error, isLoading } = useSWR("/api/random-movie", fetcher, {
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

export default useBillBoard
