import { NextApiRequest, NextApiResponse } from "next"
import serverAuth from "~/lib/serverAuth"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" })
  }

  try {
    const { currentUser } = await serverAuth(req)

    const movieId = req.query.movieId

    if (!movieId || typeof movieId !== "string") {
      return res.status(400).json({ message: "Invalid Movie ID" })
    }

    const isFavorite = currentUser?.favoriteIds?.includes(movieId) || false

    return res.status(200).json({ isFavorite })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Internal Server Error" })
  }
}
