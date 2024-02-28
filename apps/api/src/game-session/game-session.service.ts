import { CreateGameSessionDto } from 'contracts'
import { PrismaGameSession } from './types'
import prisma from 'src/prisma'

const gameSessionService = {
  createNewGame: async (
    data: CreateGameSessionData
  ): Promise<PrismaGameSession | null> => {
    try {
      const game = await prisma.gameSession.create({
        data: {
          ...data,
          datetime: new Date(data.datetime).toISOString(),
        },
      })

      return game
    } catch (e) {
      console.log(e)
      return null
    }
  },
  getAllGameSessions: async (): Promise<PrismaGameSession[]> => {
    const gameSessions = await prisma.gameSession.findMany()

    return gameSessions
  },
}

interface CreateGameSessionData extends CreateGameSessionDto {}

export default gameSessionService
