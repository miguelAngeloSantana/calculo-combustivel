"use server";

export interface Cidade {
    id: number 
    nome: string 
    latitude: number 
    longitude: number
};

export async function submitForm(formData: FormData) {

    const pontoPartida = formData.get("pontoPartida");
    // const tipoCombustivel = formData.get("fuelOptions");
    // const consumoVeiculo = formData.get("consumo");
    // const capacidadeTanque = formData.get("capacidade");

    const responseApi = await fetch(`https://nominatim.openstreetmap.org/search?q=${pontoPartida}&format=json`)
        .then(response => response.json());

    const cidades: Cidade[] = responseApi.map((item: {place_id: number, display_name: string, lat: number, lon: number}) => ({
        id: Number(item.place_id),
        nome: String(item.display_name),
        latitude: Number(item.lat),
        longitude: Number(item.lon)
    }));

    return {
        info: cidades
    };
};