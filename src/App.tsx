import React, { useEffect, useState } from 'react';

function App() {
  const [contadores, setContadores] = useState({ quantidadeGotenks: 0, numeroAleatorio: 1 });

  const pegarNumeroAleatorio = () => {
    const numero = Math.floor(Math.random() * 6) + 1;
    setContadores((prevState) => ({ ...prevState, numeroAleatorio: numero}));
  }

  useEffect(() => {
    const pegarDadosSayajin = async (numero: number) => {
      const resposta = await fetch(`https://dragonball-api.com/api/characters?page=${numero}`);
      const data = await resposta.json()
      if (data.items) {
        for (const character of data.items) {
          if (character.name === "Gotenks") {
            setContadores((prevState) => ({ ...prevState, quantidadeGotenks: prevState.quantidadeGotenks + 1 }));
          }
        }
      } else {
        console.error("Personagens não encontrados na resposta");
      }
    }

    pegarDadosSayajin(contadores.numeroAleatorio);
  }, [contadores.numeroAleatorio])

  return (
    <div>
      <h1>Counter Sayajin</h1>

      <button onClick={pegarNumeroAleatorio}>
        +
      </button>

      <h1>{contadores.quantidadeGotenks}</h1>

    </div>
  );
}

export default App;
