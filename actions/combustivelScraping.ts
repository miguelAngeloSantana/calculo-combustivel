"use server"

// import puppeteer from "puppeteer";
import getPriceAnp from "../lib/anp"

type serveAnpProps = {
    query: string;
    fuel: string
}

export async function BuscarPrecoCombustivel(/*formData: FormData*/{query, fuel}: serveAnpProps) {

    const preco = await getPriceAnp(query, fuel)
    console.log(preco)
    return preco

    // const browser = await puppeteer.launch();
    // const fuelOptions = formData.get("fuelOptions")
    // try {
    //     const page = await browser.newPage();
    
    //     const url = `https://precos.petrobras.com.br/sele%C3%A7%C3%A3o-de-estados-${fuelOptions}`
    //     await page.goto(url);
    
    //     const resultado = await page.evaluate(() => {
    //         return document.querySelector('#telafinal-precofinal.h1.real-value')?.textContent
    //     })
        
    
    //     await browser.close();

    //     return resultado
    // } catch(error){
    //     console.log("Error no servidor: ", error)
    //     return null;
    // }

} 
