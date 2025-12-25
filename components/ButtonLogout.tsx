"use client";

import { useRouter } from "next/navigation";

import { authClient } from "../lib/auth-client"

export default function ButtonLogout() {

    const router = useRouter();

    async function singOut() {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.replace("/")
                }
            }
        })
    }

    return (
        <>
            <button 
                    className="bg-blue-700 rounded-xl cursor-pointer" 
                    style={{padding: "0.74rem", marginTop: "2rem"}}
                    type="button"
                    onClick={singOut}
                >
                    Deslogar
                </button>
        </>
    )
}