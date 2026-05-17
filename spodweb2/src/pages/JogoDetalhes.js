import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

function normalizeCoverPath(capa) {
  if (!capa) return "/imgs/default.svg";
  const value = String(capa).trim();
  if (value === "") return "/imgs/default.svg";
  if (/^https?:\/\//i.test(value)) return value;
  return value.startsWith("/") ? value : `/${value}`;
}

function makePlaceholderImage(nome) {
  const text = encodeURIComponent(nome || "Imagem indisponível");
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='900' height='500'%3E%3Crect width='100%25' height='100%25' fill='%230b1120'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial,sans-serif' font-size='36' fill='%23f8fafc'%3E${text}%3C/text%3E%3C/svg%3E`;
}

function JogoDetalhes() {
  const { slug } = useParams();
  const [jogo, setJogo] = useState(null);

  useEffect(() => {
    async function carregarJogo() {
      const { data, error } = await supabase
        .from("jogos")
        .select("*")
        .eq("slug", slug)
        .single(); // garante um único resultado

      if (error) {
        console.error("Erro ao buscar jogo:", error);
      } else {
        setJogo(data);
      }
    }

    carregarJogo();
  }, [slug]);

  if (!jogo) return <p>Carregando...</p>;

  const imagem = normalizeCoverPath(jogo.capa);
  const fallback = makePlaceholderImage(jogo.nome);

  return (
    <main>
      <h1>{jogo.nome}</h1>
      <img
        src={imagem}
        alt={jogo.nome}
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = fallback;
        }}
      />
      <p>{jogo.descricao}</p>
      <p>Gênero: {jogo.genero}</p>
      <p>Preço: R$ {jogo.preco.toFixed(2)}</p>
    </main>
  );
}

export default JogoDetalhes;