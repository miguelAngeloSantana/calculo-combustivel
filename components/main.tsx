import { auth } from "@/lib/auth";
import { headers } from "next/headers";

import Formulario from "./Formulario";
import ButtonLogin from "./ButtonLogin";
import ButtonLogout from "./ButtonLogout";

export default async function Main() {

    const session = await auth.api.getSession({
        headers: await headers()
    })


    return (
        <div className="flex flex-col">
            <div className="flex justify-around">
                <div className="flex flex-col justify-center items-center md:w-screen" style={{marginTop: "1.8rem"}}>
                    <h1 >Calculo de combustivel</h1>
                    <h2>Calcule o preço da sua viagem</h2>
                </div>

                <div>
                    {session? <ButtonLogout />: <ButtonLogin />}
                </div>

            </div>

            <div className="flex flex-col items-center justify-center pt-3.5 pb-7" >
                <div className="w-[92%] h-full flex items-start justify-start p-4">
                    <Formulario />
                </div>
            </div>
        </div>
    )
}