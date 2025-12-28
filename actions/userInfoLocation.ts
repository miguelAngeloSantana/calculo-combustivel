"use server";

import { prisma } from "@/lib/prisma";

type prismaInfoLocationProps = {
    tripId: string 
    preco_combustivel: number
    distancia: number
    combustivel: string
    custoTotal: number
    combustivelNecessario: number
    totParadas: number
    origem: string 
    destino: string
}


export async function UserInfoLocation(
  userId: string,
  data: prismaInfoLocationProps
) {
    
    return prisma.location.upsert({
        where: { tripId: data.tripId  },
        update: {},
        create: {
            tripId: data.tripId,
            userId,
            preco_combustivel: data.preco_combustivel,
            distancia: data.distancia,
            combustivel: data.combustivel,
            custoTotal: data.custoTotal,
            combustivelNecessario: data.combustivelNecessario,
            totParadas: Math.ceil(data.totParadas),
            origem: data.origem,
            destino: data.destino,
        }
    })
}

export async function getInfoPrisma(id: string) {
    await new Promise((resolve) => setTimeout(resolve, 1500))
    return prisma.location.findMany({
        where: {
            userId: id
        }
    })
}

export const runtime = "nodejs";