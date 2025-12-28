"use client"
import ButtonMap from "./ButtonMap";
import { submitForm } from "@/actions/actions";
import { BuscarPrecoCombustivel } from "@/actions/combustivelScraping";
import { useState } from "react";

// import InfoLocation from "./InfoLocation"

import dynamic from "next/dynamic";
import Link from "next/link";

interface Cidade {
    id: number 
    nome: string 
    latitude: number 
    longitude: number
};

const Map = dynamic(() => import("./Map"), {ssr: false});
const InfoLocation = dynamic(() => import("./InfoLocation"), {ssr: false})

export default function Formulario() {

    const [ fuel, setFuel ] = useState<string>("");

    const [ price, setPrice ] = useState<string | null | undefined>("");

    const [ veiculoConsumo, setVeiculoConsumo ] = useState<number>(0);

    const [capacidadeTanque, setCapacidadeTanque] = useState<number>(0);
    
    const [origem, setOrigem] = useState<Cidade | null>(null);
    const [destino, setDestino] = useState<Cidade | null>(null);

    // Origem
    const [query, setQuery] = useState("");
    const [cidadeOrigem, setCidadeOrigem] = useState<Cidade[]>([]);

    //Destino
    const [queryDestiny, setQueryDestiny] = useState("");
    const [cidadeDestino, setCidadeDestino] = useState<Cidade[]>([]);

    const [ loading, setLoading ] = useState<boolean>(false);
    const [indexMouse, setIndexMouse] = useState<number | null>(null);

    async function selectCity(city: string): Promise<void>{
    //         const teste = await fetch ("https://view.officeapps.live.com/op/view.aspx?src=https%3A%2F%2Fwww.gov.br%2Fanp%2Fpt-br%2Fassuntos%2Fprecos-e-defesa-da-concorrencia%2Fprecos%2Fprecos-revenda-e-de-distribuicao-combustiveis%2Fshlp%2Fsemanal%2Fsemanal-municipio-2024-2025.xlsx&wdOrigin=BROWSELINK")
    // console.log("Testando novo jeito>: ", teste.json())
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

        setLoading(false);
    };

    function chooseCity(cidade: Cidade): void {
        setOrigem(cidade);
        setQuery(cidade.nome);
        setCidadeOrigem([]);
    };

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
    };

    function chooseCityDestiny(cidade: Cidade): void {
        setDestino(cidade);
        setQueryDestiny(cidade.nome);
        setCidadeDestino([]);
    };

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();

        const newData = new FormData()
        newData.append("fuelOptions", fuel)

        const preco = await BuscarPrecoCombustivel({query: "Petropolis", fuel: "Gasolina"});
        setPrice(preco?.toString());
    };



    return (
        <div className="flex flex-1 h-full">
            <form onSubmit={handleSubmit} className="w-full flex flex-col items-center justify-center">
                <div className="flex flex-col w-[80%] md:mt-6" style={{marginBottom: "1.75rem"}}>
                    <label className="mb-4">Digite o local de partida</label>
                    <input
                        value={query}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            selectCity(e.target.value)
                        }
                        className="bg-black rounded-xl"
                        style={{padding: '0.9rem 1rem', marginTop: "0.7rem"}}
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
                        className="bg-black rounded-xl"
                        style={{padding: '0.9rem 1rem', marginTop: "0.7rem"}}
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
                    <select 
                        value={fuel}
                        required 
                        name="fuelOptions" 
                        className="bg-black rounded-xl"
                        style={{padding: '1.2rem 1rem'}}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                            setFuel(e.target.value)
                        }}
                    >
                        <option value="" className="bg-black" hidden>tipo de combustivel</option>
                        <option value="Gasolina" className="bg-black">Gasolina (L)</option>
                        <option value="Etanol" className="bg-black">Etanol (L)</option>
                        <option value="Diesel" className="bg-black">Dielse (L)</option>
                    </select>
                </div> 

                <div className="flex flex-col w-[80%]" style={{marginBottom: "1.75rem"}}>
                    <label className="mb-4">Consuno do veiculo</label>
                    <input 
                        type="number" 
                        step="any"
                        name="consumo" 
                        placeholder="Qual o gasto de combustivel do seu veiculo" 
                        style={{padding: '0.7rem 0.75rem', marginTop: "0.7rem"}}
                        className="bg-black rounded-sm"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setVeiculoConsumo(Number(e.target.value))
                        }}
                        required
                    />
                </div>

                <div className="flex flex-col w-[80%]" style={{marginBottom: "1.75rem"}}>
                    <label className="mb-4 text-sm md:text-base">Capacidade do tanque ( Opcional )</label>
                    <input 
                        type="number" 
                        name="capacidade" 
                        placeholder="Com isso, podemos calcular quantas paradas terá que fazer até o destino final"
                        style={{padding: '0.7rem 0.75rem', marginTop: "0.7rem"}}
                        className="bg-black rounded-sm"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setCapacidadeTanque(Number(e.target.value))
                        }}
                        />
                </div>

                {
                    origem && destino && (
                        <>
                          <Map 
                            latitude={origem.latitude} 
                            longitude={origem?.longitude}
                            latitudeDestino={destino?.latitude}
                            longitudeDestino={destino?.longitude}
                            
                        />
                        </>
                      
                        
                    )
                }

                {
                    fuel && price && origem && destino &&(
                        <>
                            <InfoLocation
                                origem={origem.nome}
                                destino={destino.nome}
                                locationFromLat={origem.latitude}
                                locationFromLlon={origem.longitude}
                                locationToLat={destino.latitude}
                                locationToLon={destino.longitude}
                                fuelPrice={price}
                                fuel={fuel}
                                veiculoConsumo={veiculoConsumo}
                                capacidadeTanque={capacidadeTanque}
                            />
                        </>
                    )
                }
               <div>

                <div className="flex items-center justify-between w-[60vw]">
                    <Link href="/principal">Telha de Perfil</Link>
                    <ButtonMap />
                </div>

               </div>
            </form>
        </div>
    )
};
