import L from "leaflet";

import {UserInfoLocation} from "@/actions/userInfoLocation"
import { authClient } from "@/lib/auth-client";
import { useRef } from "react";
import { v4 as uuid } from "uuid"

interface InfoLocationProps {
  origem: string,
  destino: string,
  locationFromLat: number
  locationFromLlon: number
  locationToLat: number
  locationToLon: number
  fuelPrice: string | null | undefined
  fuel: string
  veiculoConsumo: number
  capacidadeTanque: number
};

export default function InfoLocation({
    origem,
    destino,
    locationFromLat, 
    locationFromLlon, 
    locationToLat, 
    locationToLon,
    fuelPrice,
    fuel,
    veiculoConsumo,
    capacidadeTanque
  }: InfoLocationProps) 
{

    // const [ precoCombustivel, setPrecoCombustivel ] = useState<number>(0);
  const fuelPriceType = Number(fuelPrice?.replace(",", ".").trim())
  const localizacaoOrigem = L.latLng(locationFromLat, locationFromLlon);
  const localizacaoDestino = L.latLng(locationToLat, locationToLon);  

  const distancia = localizacaoOrigem.distanceTo(localizacaoDestino);

  const convertDisnaticaKm = Number((distancia / 1000).toFixed(2));


  const combustivelNecessario:number = convertDisnaticaKm / veiculoConsumo;
  const custoTotal: number = combustivelNecessario * fuelPriceType;
  const numeroParadas = combustivelNecessario / capacidadeTanque;
 const tripId = useRef<string>(uuid()); 

  async function handlerGetInfo() {
      const session = await authClient.useSession();
  
      if (!session.data?.user.id) return;

      await UserInfoLocation(session.data.user.id, {
        tripId: tripId.current,
        origem: origem,
        destino: destino,
        preco_combustivel: fuelPriceType,
        distancia: convertDisnaticaKm,
        combustivel: fuel, 
        custoTotal,
        combustivelNecessario,
        totParadas: numeroParadas,
      })
        return;
  }
  handlerGetInfo() 
 

   return (
    <>
      <div className="grid gap-8 items-center mb-6 md:grid-cols-3 grid-cols-1">

        <div className="bg-[#121212] rounded-4xl" style={{padding: "1.2rem"}}>
          <p className="text-center">Distancia da viagem: {convertDisnaticaKm}km</p>
        </div>
        
        <div className="bg-[#121212] rounded-4xl" style={{padding: '1rem'}}>
          <p className="text-center">Tipo de Combustivel: {fuel}</p>
        </div>

        <div className="bg-[#121212] rounded-4xl" style={{padding: '1rem'}}>
          <p className="text-center">Preço do Combustivel: {fuelPriceType}</p>
        </div>

        <div className="bg-[#121212] rounded-4xl" style={{padding: '1rem'}}>
          <p className="text-center">Custo Estimado: R${custoTotal.toFixed(2)}</p>
        </div>

        <div className="bg-[#121212] rounded-4xl" style={{padding: '1rem'}}>
          <p className="text-center">Combustivel Necessario: {combustivelNecessario.toFixed(2)} Litros</p>
        </div>

        <div className="bg-[#121212] rounded-4xl" style={{padding: '1rem'}}>
          <p className="text-center">Total de Paradas: {Math.round(numeroParadas)}</p>
        </div>
      </div>
    </>
   )

};