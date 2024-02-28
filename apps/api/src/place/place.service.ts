import prisma from 'src/prisma'
import { PrismaPlace } from './types'

const placeService = {
  createNewPlace: async (data: CreatePlaceData): Promise<PrismaPlace> => {
    const place = await prisma.place.create({
      data,
    })

    return place
  },
  getAll: async (): Promise<PrismaPlace[]> => {
    const places = await prisma.place.findMany()

    return places
  },
}

interface CreatePlaceData {
  address: string
  contactInfo?: string
  creatorId: number
  description: string
  geo?: string
  name: string
  public: boolean
  schedule: string
}

export default placeService
