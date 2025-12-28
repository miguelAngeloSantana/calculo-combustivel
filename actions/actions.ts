"use server";

export interface Cidade {
    id: number 
    nome: string 
    display_nome: string 
    latitude: number 
    longitude: number
};


export async function submitForm(formData: FormData) {

    const pontoPartida = formData.get("pontoPartida");


    const userName = formData.get("userName");
    const userEmail = formData.get("userEmail");
    const userPassword = formData.get("userPassword");

    const responseApi = await fetch(`https://nominatim.openstreetmap.org/search?q=${pontoPartida}&format=json`, {
        headers: {
            "User-Agent": "https://calculocombustivel.vercel.app/"
        },
        cache: "no-store"
    })
        .then(response => response.json());

    const cidades: Cidade[] = responseApi.map((item: {place_id: number, name: string, display_name:string, lat: number, lon: number}) => ({
        id: Number(item.place_id),
        nome: String(item.name),
        display_nome: String(item.display_name),
        latitude: Number(item.lat),
        longitude: Number(item.lon)
    }));

    const userInfo = {
        name: userName,
        email: userEmail,
        password: userPassword
    }

    return {
        info: cidades,
        user: userInfo
    };
};