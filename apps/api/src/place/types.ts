import { Prisma } from 'database'

const prismaPlace = Prisma.validator<Prisma.PlaceDefaultArgs>()({})
export type PrismaPlace = Prisma.PlaceGetPayload<typeof prismaPlace>

const placeWithRelations = Prisma.validator<Prisma.PlaceDefaultArgs>()({
  include: { games: true },
})
export type PrismaPlaceWithRelations = Prisma.PlaceGetPayload<
  typeof placeWithRelations
>
