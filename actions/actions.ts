"use server";
// import puppeteer from "puppeteer";


export interface Cidade {
    id: number 
    nome: string 
    latitude: number 
    longitude: number
};

// export async function RobotScraping({fuel}: String) {
    
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();

//     const url = `https://precos.petrobras.com.br/sele%C3%A7%C3%A3o-de-estados-${fuel}`
//     await page.goto(url);

//     const result = await page.evaluate(() => {
//         return document.querySelector('#telafinal-precofinal.h1.real-value')?.textContent
//     })

//     console.log(result);

//     await browser.close();

//     return {
//         info: result
//     }
// }

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