import { useEffect, useState } from "react";
import CardJogo from "../components/CardJogo";
import { listarJogos } from "../services/jogosService";
import "../visuals/App.css";

function Corrida() {
  const [lista, setLista] = useState([]);

  useEffect(() => {
    async function carregarJogos() {
      try {
        const jogos = await listarJogos();
        setLista(jogos.filter((j) => j.genero === "Corrida"));
      } catch {
        setLista([]);
      }
    }

    carregarJogos();
  }, []);

  return (
    <main>
      <h1>Jogos de Corrida</h1>

      <div className="carrossel">
        {lista.map((jogo) => (
          <CardJogo key={jogo.id} jogo={jogo} />
        ))}
      </div>
    </main>
  );
}

export default Corrida;
