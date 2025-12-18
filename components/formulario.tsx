"use client"
// import Form from "next/form";
import ButtonMap from "./ButtonMap";
import { submitForm } from "@/actions/actions";
import { useState } from "react";

import dynamic from "next/dynamic";

interface Cidade {
    id: number 
    nome: string 
    latitude: number 
    longitude: number
}

const Map = dynamic(() => import("./Map"), {ssr: false});

export default function Formulario() {
    
    const [origem, setOrigem] = useState<Cidade | null>(null);
    const [destino, setDestino] = useState<Cidade | null>(null);

    // Origem
    const [query, setQuery] = useState("");
    const [cidadeOrigem, setCidadeOrigem] = useState<Cidade[]>([]);

    //Destino
    const [queryDestiny, setQueryDestiny] = useState("");
    const [cidadeDestino, setCidadeDestino] = useState<Cidade[]>([]);

    const [ loading, setLoading ] = useState<boolean>(false);
    const [indexMouse, setIndexMouse] = useState<number | null>(null)

    async function selectCity(city: string): Promise<void>{
        setQuery(city);
        setOrigem(null);

        if(city.length < 3) {
            setCidadeOrigem([]);
            return;
        }

        setLoading(true)

        const newData = new FormData();
        newData.append("pontoPartida", city);

        const result = await submitForm(newData);
        setCidadeOrigem(result.info);

        setLoading(false)
    }

    function chooseCity(cidade: Cidade): void {
        setOrigem(cidade);
        setQuery(cidade.nome);
        setCidadeOrigem([]);
    }

    async function selectCityDestiny(city: string): Promise<void>{
        setQueryDestiny(city);
        setDestino(null);

        if(city.length < 3) {
            setCidadeDestino([]);
            return;
        }

        const newData = new FormData();
        newData.append("pontoPartida", city);

        const result = await submitForm(newData);
        setCidadeDestino(result.info);
    }

    function chooseCityDestiny(cidade: Cidade): void {
        setDestino(cidade);
        setQueryDestiny(cidade.nome);
        setCidadeDestino([]);
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
    };

    return (
        <div className="flex flex-1 h-full">
            <form onSubmit={handleSubmit} className="w-full flex flex-col items-center justify-center">
                <div className="flex flex-col w-[80%]" style={{marginBottom: "1.75rem"}}>
                    <label  className="mb-4">Digite o local de partida</label>
                    <input
                        value={query}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            selectCity(e.target.value)
                        }
                        placeholder="Escolha uma cidade"
                    />

                    { loading && <p>Carregando</p> }

                    {
                        cidadeOrigem.length > 0 && (
                            <ul>
                                {
                                    cidadeOrigem.map((c) => (
                                        <li 
                                            key={c.id} 
                                            onClick={() => chooseCity(c)}
                                            onMouseOver={() => setIndexMouse(c.id)}
                                            style={{
                                                border: indexMouse === c.id? "1px solid #f0f0f0": "0px #141B29",
                                                padding: "2px"
                                            }}
                                            className="cursor-pointer"
                                        >
                                            {c.nome}
                                        </li>
                                    ))
                                }
                            </ul>
                        )
                    }
                </div>

                <div className="flex flex-col w-[80%]" style={{marginBottom: "1.75rem"}} >
                    <label className="mb-4">Digite o local de Destino</label>
                    <input
                        value={queryDestiny}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                            selectCityDestiny(e.target.value)
                        }
                        placeholder="Qaul o destino da viagem?"
                    />

                   { loading && <p>Carregando</p> } 

                    {
                        cidadeDestino.length > 0 && (
                            <ul>
                                {
                                    cidadeDestino.map((c) => (
                                        <li 
                                            key={c.id} 
                                            onClick={() => chooseCityDestiny(c)}
                                            onMouseOver={() => setIndexMouse(c.id)}
                                            style={{
                                                border: indexMouse === c.id? "1px solid #f0f0f0": "0px #141B29",
                                                padding: "2px"
                                            }}
                                            className="cursor-pointer"
                                        >
                                            {c.nome}
                                        </li>
                                    ))
                                }
                            </ul>
                        )
                    }
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

                {
                    origem && destino && (
                        <Map 
                            latitude={origem.latitude} 
                            longitude={origem?.longitude}
                            latitudeDestino={destino?.latitude}
                            longitudeDestino={destino?.longitude}
                            
                        />
                        
                    )
                }
               
                <ButtonMap />
            </form>
        </div>
    )
};