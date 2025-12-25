//Rota privada para usuario logados
import ButtonLogout from "@/components/ButtonLogout"

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";

import { redirect } from "next/navigation"

export default async function PaginaAposLogin() {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if(!session) {
        redirect("/")
    }

    return (
        <>
            <div className="flex flex-col items-center justify-center w-screen">
                <h1>Bem vindo, {session.user.name}</h1>
                <Link href="/">Calcular uma viagem</Link>
                <ButtonLogout />
            </div>
        </>
    )
}