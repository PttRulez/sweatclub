import { Prisma } from 'database'

const prismaGame = Prisma.validator<Prisma.GameDefaultArgs>()({})
export type PrismaGame = Prisma.GameGetPayload<typeof prismaGame>

const gameWithRelations = Prisma.validator<Prisma.GameDefaultArgs>()({
  include: { gameSessions: true },
})
export type PrismaGameWithRelations = Prisma.GameGetPayload<
  typeof gameWithRelations
>
