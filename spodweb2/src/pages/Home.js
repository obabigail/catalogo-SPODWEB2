import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import CardJogo from "../components/CardJogo";

function Home() {
  const [jogos, setJogos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarJogos() {
      const { data, error } = await supabase
        .from("jogos")
        .select("*");

      console.log("DATA:", data);
      console.log("ERROR:", error);

      if (error) {
        console.error("Erro ao buscar jogos:", error);
      } else {
        setJogos(data);
      }

      setLoading(false);
    }

    carregarJogos();
  }, []);

  // 🔄 enquanto carrega
  if (loading) {
    return <p>Carregando jogos...</p>;
  }

  return (
    <main>
      <h1>Jogos em Destaque</h1>

      {/* 🚨 caso não tenha dados */}
      {jogos.length === 0 ? (
        <p>Nenhum jogo encontrado.</p>
      ) : (
        <div className="lista">
          {jogos.map((j) => (
            <CardJogo key={j.id} jogo={j} />
          ))}
        </div>
      )}
    </main>
  );
}

export default Home;