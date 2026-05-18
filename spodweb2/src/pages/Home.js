import { useEffect, useState } from "react";
import CardJogo from "../components/CardJogo";
import { listarJogos } from "../services/jogosService";
import "../visuals/App.css";

function Home() {
  const [jogos, setJogos] = useState([]);

  useEffect(() => {
    async function carregarJogos() {
      try {
        setJogos(await listarJogos());
      } catch {
        setJogos([]);
      }
    }

    carregarJogos();
  }, []);

  return (
    <main className="App-body">
      <h1>Jogos em Destaque</h1>

      <div className="carrossel">
        {jogos.map((j) => (
          <CardJogo capa={j.capa} key={j.id} jogo={j} />
        ))}
      </div>
    </main>
  );
}

export default Home;
