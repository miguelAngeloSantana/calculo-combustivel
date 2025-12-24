import Link from "next/link";

import RegistroFrom from "@/components/RegistroForm";

export default function Registro() {
     return (
        <div className="flex flex-col items-center justify-center p-4 min-h-screen w-screen" 
            style ={{padding: "0 0.8rem"}}
        >
            <div className="w-full max-w-md space-y-8">
                <div className="text-center" style={{marginBottom: "2rem"}}>
                    <h1 className="text-2xl mb-1" style={{marginBottom: "0.4rem"}}>Registro</h1>
                    <p className="text-sm">Entre com suas informações </p>
                </div>

                <RegistroFrom />

                <div className="text-center">
                    <p>Não tem uma conta</p>
                    <Link href="/login" className="font-medium hover:underline">Crie uma</Link>
                </div>
            </div>
        </div>
   )
};