import React, { useEffect, useState } from 'react';

function App() {
  const [numeroAleatorio, setNumeroAleatorio] = useState(1);
  const [quantidadeGotens, setQuantidadeGotens] = useState(0);

  const pegarNumeroAleatorio = () => {
    const numero = Math.floor(Math.random() * 6) + 1;
    setNumeroAleatorio(numero);
  }

  useEffect(() => {
    const pegarDadosSayajin = async (numero: number) => {
      const resposta = await fetch(`https://dragonball-api.com/api/characters?page=${numero}`);
      const data = await resposta.json()
      if (data.items) {
        for (const character of data.items) {
          if (character.name === "Gotenks") {
            setQuantidadeGotens(quantidadeGotens+1)
          }
        }
      } else {
        console.error("Personagens não encontrados na resposta");
      }
    }

    pegarDadosSayajin(numeroAleatorio);
  }, [numeroAleatorio])

  return (
    <div>
      <h1>Counter Sayajin</h1>

      <button onClick={pegarNumeroAleatorio}>
        +
      </button>

      <h1>{quantidadeGotens}</h1>

    </div>
  );
}

export default App;
