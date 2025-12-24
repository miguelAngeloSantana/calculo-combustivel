"use client";

import { useRouter } from "next/navigation";

export default function ButtonLogin() {

    const router = useRouter();

    return (
        <>
            <button 
                    className="bg-blue-700 rounded-xl cursor-pointer" 
                    style={{padding: "0.74rem", marginTop: "2rem"}}
                    type="button"
                    onClick={() => router.push("/login")}
                >
                    Login/Cadastrar
                </button>
        </>
    )
}