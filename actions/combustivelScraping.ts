"use server"

// type TipoCombustivel =
//   | "Gasolina"
//   | "Etanol"
//   | "Diesel";

import puppeteer from "puppeteer";

// interface CombustivelProps{
//     tipo: TipoCombustivel,
//     preco: number,
// }

export async function BuscarPrecoCombustivel(formData: FormData) {
    const browser = await puppeteer.launch();
    const fuelOptions = formData.get("fuelOptions")
    // const page = await browser.newPage();

    try {
        const page = await browser.newPage();
    
        const url = `https://precos.petrobras.com.br/sele%C3%A7%C3%A3o-de-estados-${fuelOptions}`
        await page.goto(url);
    
        const resultado = await page.evaluate(() => {
            return document.querySelector('#telafinal-precofinal.h1.real-value')?.textContent
        })
    
        // console.log(fuelOptions);
        
    
        await browser.close();

        return resultado
    } catch(error){
        console.log("Error no servidor: ", error)
        return null;
    }

} 
