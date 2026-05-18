import React, { useEffect, useState } from "react";
import CardJogo from "../components/CardJogo";
import { listarJogos } from "../services/jogosService";
import "../visuals/App.css";

function RPG() {
  const [jogos, setJogos] = useState([]);

  useEffect(() => {
    async function carregarJogos() {
      try {
        const todosJogos = await listarJogos();
        setJogos(todosJogos.filter((j) => j.genero === "RPG"));
      } catch {
        setJogos([]);
      }
    }

    carregarJogos();
  }, []);

  return (
    <main>
      <h1>Jogos de RPG</h1>
      <div className="carrossel">
        {jogos.map((j) => (
          <CardJogo key={j.id} jogo={j} />
        ))}
      </div>
    </main>
  );
}

export default RPG;
