export default function LoginForm() {
   return (
        <div className="">
            <form className="w-full flex flex-col items-center justify-center">
                <div className="flex flex-col w-full md:mt-6" style={{marginBottom: "1.75rem"}}>
                    <label className="mb-4">Nome</label>
                    <input
                        type="text"
                        className="bg-black rounded-xl"
                        style={{padding: '0.9rem 1rem', marginTop: "0.7rem"}}
                        placeholder="Qual seu nome completo"
                        required
                    />
                </div>

                <div className="flex flex-col w-full" style={{marginBottom: "1.75rem"}}>
                    <label className="mb-4">Email</label>
                    <input 
                        type="email"
                        placeholder="Qual seu melhor email" 
                        style={{padding: '0.7rem 0.75rem', marginTop: "0.7rem"}}
                        className="bg-black rounded-sm"
                        required
                    />
                </div>

                <div className="flex flex-col w-full" style={{marginBottom: "1.75rem"}}>
                    <label className="mb-4 text-sm md:text-base">Senha</label>
                    <input 
                        type="password"
                        placeholder="Escolha uma senha"
                        style={{padding: '0.7rem 0.75rem', marginTop: "0.7rem"}}
                        className="bg-black rounded-sm"
                        />
                </div>

               <div className="flex flex-col w-full" style={{marginBottom: "1.75rem"}}>
                    <label className="mb-4 text-sm md:text-base">Confirmar Senha</label>
                    <input 
                        type="password"
                        placeholder="Digite a mesma senha que colocou anteriormente"
                        style={{padding: '0.7rem 0.75rem', marginTop: "0.7rem"}}
                        className="bg-black rounded-sm"
                        />
                </div> 

               <button type="submit" className="bg-gray-50 w-full text-black rounded-4xl font-bold cursor-pointer" 
                    style={{padding: "0.7rem 0", marginBottom: "0.5rem"}}
                >
                    Cadastrar
                </button> 
            </form>
        </div>
   )
}