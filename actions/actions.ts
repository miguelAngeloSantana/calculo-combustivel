"use server";

export interface Cidade {
    id: number 
    nome: string 
    latitude: number 
    longitude: number
}

export async function submitForm(formData: FormData) {

    const pontoPartida = formData.get("pontoPartida");

    // if (typeof pontoPartida !== "string" || pontoPartida.length > 0) {
    //     return { info: [] }
    // }

    // const pontoChegada = formData.get("pontoFinal");
    // const tipoCombustivel = formData.get("fuelOptions");
    // const consumoVeiculo = formData.get("consumo");
    // const capacidadeTanque = formData.get("capacidade");

    const responseApi = await fetch(`https://nominatim.openstreetmap.org/search?q=${pontoPartida}&format=json`)
        .then(response => response.json());

    // const data: unknown = await responseApi.json();

    // if (!Array.isArray(data)) {
    //     return { info: [] }
    // }

    const cidades: Cidade[] = responseApi.map((item: {place_id: number, display_name: string, lat: number, lon: number}) => ({
        id: Number(item.place_id),
        nome: String(item.display_name),
        latitude: Number(item.lat),
        longitude: Number(item.lon)
    }))

    console.log()

    return {
        info: cidades
    }

    //const dadosChegada = await fetch(`https://nominatim.openstreetmap.org/search?q=${pontoPartida}&format=json`)
    //     .then(response => response.json());
    // const dadosDestino = await fetch(`https://nominatim.openstreetmap.org/search?q=${pontoChegada}&format=json`)
    //     .then(res => res.json())



    //     const teste = dadosChegada.map((item: {place_id: number, display_name: string, lat: number, lon: number})=> ({
    //         id: item.place_id,
    //         nome: item.display_name,
    //         latitude: Number(item.lat),
    //         longitude: Number(item.lon)
    //     }))

    //      const teste2 = dadosDestino.map((item: {place_id: number, display_name: string, lat: number, lon: number})=> ({
    //         id: item.place_id,
    //         nome: item.display_name,
    //         latitudeDestino: Number(item.lat),
    //         longitudeDestino: Number(item.lon)
    //     }))

    //     return {
    //         info: teste,
    //         infoDestino: teste2
    //     }
};