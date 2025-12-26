import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json();

  const location = await prisma.location.create({
    data: body,
  });

  return Response.json(location);
}