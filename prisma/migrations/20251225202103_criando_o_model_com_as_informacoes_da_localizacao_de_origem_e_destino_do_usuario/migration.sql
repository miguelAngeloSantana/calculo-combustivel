-- CreateTable
CREATE TABLE "location" (
    "id" SERIAL NOT NULL,
    "preco_combustivel" INTEGER NOT NULL,
    "distancia" INTEGER NOT NULL,
    "combustivel" TEXT NOT NULL,
    "custoTotal" DOUBLE PRECISION NOT NULL,
    "combustivelNecessario" DOUBLE PRECISION NOT NULL,
    "totParadas" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "location_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "location_userId_idx" ON "location"("userId");

-- AddForeignKey
ALTER TABLE "location" ADD CONSTRAINT "location_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
