"use server"

import chromium from "chrome-aws-lambda";
import puppeteer from "puppeteer-core";

export async function BuscarPrecoCombustivel(formData: FormData) {
    const browser = await puppeteer.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath,
        headless: chromium.headless
    });
    const fuelOptions = formData.get("fuelOptions")

    try {
        const page = await browser.newPage();
    
        const url = `https://precos.petrobras.com.br/sele%C3%A7%C3%A3o-de-estados-${fuelOptions}`
        await page.goto(url);
    
        const resultado = await page.evaluate(() => {
            return document.querySelector('#telafinal-precofinal.h1.real-value')?.textContent
        })
        
    
        await browser.close();

        return resultado
    } catch(error){
        console.log("Error no servidor: ", error)
        return null;
    }

} 