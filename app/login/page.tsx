import Link from "next/link";

import LoginForm from "@/components/LoginForm";

export default function Login() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen w-screen" 
            style ={{padding: "0 0.8rem"}}
        >
            <div className="w-full max-w-md space-y-8" style={{marginTop: "0.6rem"}}>
                <div className="text-center" style={{marginBottom: "2rem"}}>
                    <h1 className="text-2xl mb-1" style={{marginBottom: "0.4rem"}}>Login</h1>
                    <p className="text-sm">Crie uma conta para salvar as informações das viagens </p>
                </div>

                <LoginForm />

                <div className="text-center">
                    <p>Já tem uma conta</p>
                    <Link href="/registro">Acesse ela</Link>
                </div>
            </div>
        </div>
    )
}