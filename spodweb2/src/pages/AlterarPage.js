import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import AlterarJogo from "../components/AlterarJogo";

function AlterarPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [jogo, setJogo] = useState(null);

  // 🔽 Buscar jogo direto do banco
  useEffect(() => {
    async function carregarJogo() {
      const { data, error } = await supabase
        .from("jogos")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Erro ao buscar jogo:", error);
      } else {
        setJogo(data);
      }
    }

    carregarJogo();
  }, [id]);

  // ✏️ Atualizar no banco
  const salvarAlteracoes = async (atualizado) => {
    const { error } = await supabase
      .from("jogos")
      .update(atualizado)
      .eq("id", atualizado.id);

    if (!error) {
      alert("Jogo alterado com sucesso!");
      navigate("/catalogo");
    } else {
      console.error("Erro ao atualizar:", error);
    }
  };

  return (
    <main>
      {jogo && (
        <AlterarJogo
          jogo={jogo}
          salvarAlteracoes={salvarAlteracoes}
        />
      )}
    </main>
  );
}

export default AlterarPage;