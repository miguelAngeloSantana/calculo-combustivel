"use client";

export default function ButtonMap() {
    function showMap() {
        console.log("teste")
    };

    return (
        <>
            <button 
                    className="bg-blue-700 rounded-xl cursor-pointer" 
                    style={{padding: "0.74rem"}}
                    type="submit"
                    onClick={() => showMap()}
                >
                    Calcular viagem
                </button>
        </>
    )
}