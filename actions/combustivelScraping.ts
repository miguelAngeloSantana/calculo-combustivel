"use server"

import getPriceAnp from "../lib/anp"

type serveAnpProps = {
    query: string;
    fuel: string
}

export async function BuscarPrecoCombustivel({query, fuel}: serveAnpProps) {

    const preco = await getPriceAnp(query, fuel)
    return preco

} 
