import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AlterarJogo from "../components/AlterarJogo";
import { atualizarJogo, listarJogos } from "../services/jogosService";
import "../visuals/App.css";

function AlterarPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [jogos, setJogos] = useState([]);
  const [jogo, setJogo] = useState(null);

  useEffect(() => {
    async function carregarJogos() {
      try {
        const lista = await listarJogos();
        setJogos(lista);
        setJogo(lista.find((j) => j.id === parseInt(id)));
      } catch {
        alert("Erro ao carregar jogo.");
      }
    }

    carregarJogos();
  }, [id]);

  const salvarAlteracoes = async (atualizado) => {
    if (!atualizado.nome || !atualizado.genero || isNaN(Number(atualizado.preco))) {
      alert("Preencha nome, gênero e preço válidos antes de salvar.");
      return;
    }

    try {
      const jogoAtualizado = await atualizarJogo(atualizado);
      const novaLista = jogos.map((j) =>
        j.id === jogoAtualizado.id ? jogoAtualizado : j
      );

      setJogos(novaLista);
      alert("Jogo alterado com sucesso!");
      navigate("/catalogo");
    } catch {
      alert("Erro ao salvar alterações. Tente novamente.");
    }
  };

  return (
    <main>
      {jogo ? (
        <AlterarJogo jogo={jogo} salvarAlteracoes={salvarAlteracoes} />
      ) : (
        <p>Carregando jogo...</p>
      )}
    </main>
  );
}

export default AlterarPage;
