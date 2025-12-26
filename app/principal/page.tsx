//Rota privada para usuario logados

import ButtonLogout from "@/components/ButtonLogout"

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";

import { redirect } from "next/navigation"
import { getInfoPrisma } from "@/actions/userInfoLocation"

type prismaProps = {
    destino: string 
    origem: string 
    combustivel: string 
    combustivelNecessario: number  
    custoTotal: number
    totParadas: number
    id: number
}

export default async function PaginaAposLogin() {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if(!session) {
        redirect("/")
    }

    const teste: prismaProps[] = await getInfoPrisma(session.user.id);

    return (
        <>
            <div className="flex flex-col items-center justify-center w-screen" style={{marginBottom: "1.2rem"}}>
                <h1 style={{marginTop: "1rem"}}>Bem vindo, {session.user.name}</h1>
                <div className="flex flex-col w-[98vw]" style={{padding: '1rem'}}>
                    <ul>    
                        {
                            teste.map((item) => (
                                <li 
                                    key={item.id} 
                                    className="gap-6 border-2 border-white"
                                    style={{marginBottom: "1.2rem", padding: '1rem'}}
                                >
                                    <h2 className="text-base" style={{marginBottom: "1rem"}}>
                                        Local de origem: {item.origem}
                                    </h2>

                                    <h2 className="text-base" style={{marginBottom: "1rem"}}>
                                        Local de destino: {item.destino}
                                    </h2>

                                    <p className="text-base" style={{marginBottom: "1rem"}}>
                                        Foi escolhido {item.combustivel}
                                    </p>

                                    <p className="text-base" style={{marginBottom: "1rem"}}>
                                        O combustivel necessario foi {item.combustivelNecessario.toFixed(2)} Litros
                                    </p>

                                    <p className="text-base" style={{marginBottom: "1rem"}}>
                                        O custo total da viagem foi R$${item.custoTotal.toFixed(2)}
                                    </p>

                                    <p className="text-base" style={{marginBottom: "1rem"}}>
                                        Foi necessario {item.totParadas} para chegar no destino
                                    </p>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <Link href="/">Calcular uma viagem</Link>
                <ButtonLogout />
            </div>
        </>
    )
}