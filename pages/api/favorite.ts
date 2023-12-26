import { NextApiRequest, NextApiResponse } from "next"
import { without } from "lodash"
import prismadb from "~/lib/prismadb"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const { movieId, userId } = req.body

      // Check Movie
      const existingMovie = await prismadb.movie.findUnique({
        where: { id: movieId },
      })

      if (!existingMovie) {
        throw new Error("Invalid ID")
      }

      // Check User
      const user = await prismadb.user.findUnique({
        where: { id: userId },
      })

      if (!user) {
        throw new Error("User not found")
      }

      // Check Favorites
      if (user.favoriteIds.includes(movieId)) {
        return res.status(200).json(user)
      }

      const updatedUser = await prismadb.user.update({
        where: { id: userId },
        data: { favoriteIds: { push: movieId } },
      })

      return res.status(200).json(updatedUser)
    }

    if (req.method === "DELETE") {
      const { movieId, userId } = req.body

      const existingMovie = await prismadb.movie.findUnique({
        where: {
          id: movieId,
        },
      })

      if (!existingMovie) {
        throw new Error("Invalid ID")
      }

      const user = await prismadb.user.findUnique({
        where: { id: userId },
      })

      if (!user) {
        throw new Error("User not found")
      }

      const updatedFavoriteIds = without(user.favoriteIds, movieId)

      const updatedUser = await prismadb.user.update({
        where: { id: userId },
        data: { favoriteIds: updatedFavoriteIds },
      })
      return res.status(200).json(updatedUser)
    }

    return res.status(405).json({ Error: "Method Not Allowed" })
  } catch (error) {
    console.log(error)
    return res.status(400).json({ Error: "Bad Request" })
  }
}
