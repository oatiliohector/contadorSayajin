import React, { useEffect, useState } from "react"

export default function App(){

  const [informacao, setInformacao] = useState({ quantidadeGotenks: 0, numeroAleatorio: 1 });

  const gerarNumeroAleatorio = () => {
    const numero = Math.floor((Math.random() * 6) + 1);
    setInformacao((information) => ({ ...information, numeroAleatorio: numero }))
    console.log(informacao.numeroAleatorio)
  }
  
  useEffect(() => {
    const chamadaAPI = async(numero: number) => {
      const requisicao = await fetch(`https://dragonball-api.com/api/characters?page=${numero}`)
      const data = await requisicao.json()

      if(data.items){
        for(const personagem of data.items){
          if(personagem.name === "Gotenks"){
            setInformacao((information) => ({ ...information, quantidadeGotenks: informacao.quantidadeGotenks + 1 }))
          }
        }
      }
    }

    chamadaAPI(informacao.numeroAleatorio)
    
  }, [informacao.numeroAleatorio])

  return(
    <div>
      <button onClick={gerarNumeroAleatorio}>
        Gerar numero aleatorio
      </button>

      <h1>Quantidade de Gotenks: {informacao.quantidadeGotenks}</h1>
    </div>
  )
}