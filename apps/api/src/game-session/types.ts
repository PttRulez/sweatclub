import { Prisma } from 'database'

const prismaGameSession = Prisma.validator<Prisma.GameSessionDefaultArgs>()({})
export type PrismaGameSession = Prisma.GameSessionGetPayload<
  typeof prismaGameSession
>

const gameSessionWithRelations =
  Prisma.validator<Prisma.GameSessionDefaultArgs>()({
    include: { game: true, place: true },
  })
export type PrismaGameSessionWithRelations = Prisma.GameSessionGetPayload<
  typeof gameSessionWithRelations
>
