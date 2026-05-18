import { useEffect, useState } from "react";
import CardJogo from "../components/CardJogo";
import { listarJogos } from "../services/jogosService";
import "../visuals/App.css";

function Acao() {
  const [lista, setLista] = useState([]);

  useEffect(() => {
    async function carregarJogos() {
      try {
        const jogos = await listarJogos();
        setLista(jogos.filter((j) => j.genero === "Ação"));
      } catch {
        setLista([]);
      }
    }

    carregarJogos();
  }, []);

  return (
    <main>
      <h1>Jogos de Ação</h1>

      <div className="carrossel">
        {lista.map((jogo) => (
          <CardJogo key={jogo.id} jogo={jogo} />
        ))}
      </div>
    </main>
  );
}

export default Acao;
