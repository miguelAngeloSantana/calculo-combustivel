import Form from "next/form"

export default function Formulario() {
    return (
        <div className="flex flex-1 h-full">
            <Form action={"/search"} className="w-full flex flex-col items-center justify-center">
                <div className="flex flex-col w-[80%]" style={{marginBottom: "1.75rem"}}>
                    <label  className="mb-4">Digite o local de partida</label>
                    <input type="text" name="pontoPartida" 
                        placeholder="Ex. Petropolis, Caxambu, Rio de Janeiro" 
                        style={{padding: '0.7rem 0.75rem', marginTop: ""}}
                        className="bg-black rounded-sm"
                        required 
                    />
                </div>

                <div className="flex flex-col w-[80%]" style={{marginBottom: "1.75rem"}} >
                    <label className="mb-4">Digite o local de Destino</label>
                    <input type="text" name="ponto-final" 
                        placeholder="Ex. Maracana, Rio de Janeiro" 
                        style={{padding: '0.7rem 0.75rem', marginTop: ""}}
                        className="bg-black rounded-sm"
                        required 
                    />
                </div>

                <div className="flex flex-col w-[80%]" style={{marginBottom: "1.75rem"}}>
                    <label style={{paddingBottom: "0.75rem", display: "block"}}>Qual combustivel o veiculo usa</label>
                    <select required name="fuelOptions" 
                        className="bg-black rounded-xl"
                        style={{padding: '1.2rem 1rem'}}
                    >
                        <option className="bg-black">tipo de combustivel</option>
                        <option value="Gasolina" className="bg-black">Gasolina (L)</option>
                        <option value="Etanol" className="bg-black">Etanol (L)</option>
                        <option value="Dielsel" className="bg-black">Dielse (L)</option>
                    </select>
                </div> 

                <div className="flex flex-col w-[80%]" style={{marginBottom: "1.75rem"}}>
                    <label className="mb-4">Consuno do veiculo</label>
                    <input type="number" name="consumo" 
                        placeholder="Qual o gasto de combustivel do seu veiculo" 
                        style={{padding: '0.7rem 0.75rem', marginTop: ""}}
                        className="bg-black rounded-sm"
                        required
                    />
                </div>

                <div className="flex flex-col w-[80%]" style={{marginBottom: "1.75rem"}}>
                    <label className="mb-4 text-sm md:text-base">Capacidade do tanque ( Opcional )</label>
                    <input type="number" name="capacidade" 
                        placeholder="Com isso, podemos calcular quantas paradas terá que fazer até o destino final"
                        style={{padding: '0.7rem 0.75rem', marginTop: ""}}
                        className="bg-black rounded-sm"
                        />
                </div>

                <button>
                    Calcular viagem
                </button>
            </Form>
        </div>
    )
}