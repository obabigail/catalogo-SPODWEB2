import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import CardJogo from "../components/CardJogo";

function Terror() {
  const [lista, setLista] = useState([]);

  useEffect(() => {
    async function carregarJogos() {
      const { data, error } = await supabase
        .from("jogos")
        .select("*")
        .eq("genero", "Terror");

      if (error) {
        console.error("Erro ao buscar jogos:", error);
      } else {
        setLista(data);
      }
    }

    carregarJogos();
  }, []);

  return (
    <main>
      <h1>Jogos de Terror</h1>

      <div className="lista">
        {lista.map((jogo) => (
          <CardJogo key={jogo.id} jogo={jogo} />
        ))}
      </div>
    </main>
  );
}

export default Terror;