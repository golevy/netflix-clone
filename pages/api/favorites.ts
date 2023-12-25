import { NextApiRequest, NextApiResponse } from "next"
import { without } from "lodash"
import prismadb from "~/lib/prismadb"
import serverAuth from "~/lib/serverAuth"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end()
  }

  try {
    const { currentUser } = await serverAuth(req)

    const favoriteMovies = await prismadb.movie.findMany({
      where: {
        id: {
          in: currentUser?.favoriteIds,
        },
      },
    })

    return res.status(200).json(favoriteMovies)
  } catch (error) {
    console.log(error)
    return res.status(400).json({ Error: "Bad Request" })
  }
}
