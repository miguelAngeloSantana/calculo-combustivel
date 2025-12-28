import fs from "fs";
import path from "path";
import Papa from "papaparse"
// import Papa from "papaparse";

type ANPRow = {
  Municipio: string;
  Estado: string;
  Produto: string;
  'Valor de Venda': string;
};

// type AnpProps = {
//     query: string;
//     fuel: string
// }

function normalize(text: string) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

export default async function getPriceAnp( Cidade:string, Combustivel:string):Promise<number | null> {
    const teste = path.join(process.cwd(), "lib", "preços-semestrais.csv");
    const read = fs.readFileSync(teste, "utf-8");

   const parsed = Papa.parse<ANPRow>(read, {
    header: true,
    skipEmptyLines: true,
  });

  const cidadeNorm = normalize(Cidade);
  const combustivelNorm = normalize(Combustivel);

  const data = parsed.data.find((row) => normalize(row.Municipio) === cidadeNorm && normalize(row.Produto) === combustivelNorm);
    // console.log(data)
    if (!data) return null;
    // console.log(parsed)
    return Number(data['Valor de Venda'].replace(",", ".").trim())
}
