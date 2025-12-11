import Formulario from "./formulario";

export default function Main() {
    return (
        <div>
            <div className="flex flex-col justify-center items-center" style={{margin: "2rem 0"}}>
                <h1 >Calculo de combustivel</h1>
                <h2>Calcule o preço da sua viagem</h2>
            </div>
            <div className="flex flex-col items-center justify-center pt-3.5 pb-7" >
                <div className="w-[92%] h-full flex items-start justify-start p-4">
                    <Formulario />
                </div>
            </div>
        </div>
    )
}