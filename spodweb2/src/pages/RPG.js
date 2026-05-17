import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import CardJogo from "../components/CardJogo";

function RPG() {
  const [jogos, setJogos] = useState([]);

  useEffect(() => {
    async function carregarJogos() {
      const { data, error } = await supabase
        .from("jogos")
        .select("*")
        .eq("genero", "RPG"); // filtro direto no banco

      if (error) {
        console.error("Erro ao buscar jogos:", error);
      } else {
        setJogos(data);
      }
    }

    carregarJogos();
  }, []);

  return (
    <main>
      <h1>Jogos de RPG</h1>
      <div className="lista">
        {jogos.map((j) => (
          <CardJogo key={j.id} jogo={j} />
        ))}
      </div>
    </main>
  );
}

export default RPG;