import React, { useEffect, useState } from "react";
import MenuTabela from "../components/MenuTabela";
import TabelaJogos from "../components/TabelaJogos";
import CadastroJogo from "../components/CadastroJogo";
import { criarJogo, excluirJogo, listarJogos } from "../services/jogosService";
import "../visuals/App.css";

function Catalogo() {
  const [jogos, setJogos] = useState([]);

  useEffect(() => {
    async function carregarJogos() {
      try {
        setJogos(await listarJogos());
      } catch {
        alert("Erro ao carregar jogos.");
      }
    }

    carregarJogos();
  }, []);

  const excluir = async (id) => {
    const jogo = jogos.find((j) => j.id === id);
    if (!jogo) return;

    if (!window.confirm(`Confirma exclusão do jogo "${jogo.nome}"?`)) return;

    try {
      await excluirJogo(id);
      setJogos((listaAtual) => listaAtual.filter((j) => j.id !== id));
    } catch {
      alert("Erro ao excluir jogo.");
    }
  };

  const generateId = () => {
    if (!jogos || jogos.length === 0) return 1;
    const maxId = jogos.reduce((max, j) => {
      const idNum = Number(j.id) || 0;
      return idNum > max ? idNum : max;
    }, 0);
    return maxId + 1;
  };

  const makeUniqueSlug = (base) => {
    const baseSlug = base
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");

    const existing = new Set(jogos.map((j) => j.slug));
    let slug = baseSlug;
    let i = 1;
    while (existing.has(slug)) {
      slug = `${baseSlug}-${i++}`;
    }
    return slug;
  };

  const cadastrar = async (novo) => {
    if (!novo.nome || !novo.genero || isNaN(Number(novo.preco))) {
      alert("Preencha nome, gênero e preço válidos antes de cadastrar.");
      return;
    }

    const id = generateId();
    const slug = makeUniqueSlug(novo.nome);

    const item = {
      id,
      nome: novo.nome,
      genero: novo.genero,
      preco: Number(novo.preco),
      descricao: novo.descricao || "Jogo cadastrado manualmente.",
      capa: novo.capa || "./imgs/abstract.webp",
      slug,
    };

    try {
      let jogoCriado = await criarJogo(item);
      if (Array.isArray(jogoCriado)) {
        jogoCriado = jogoCriado[0];
      }
      if (!jogoCriado || !jogoCriado.id) {
        throw new Error("Resposta inválida ao cadastrar jogo");
      }
      setJogos((listaAtual) => [...listaAtual, jogoCriado]);
      alert(`Jogo "${jogoCriado.nome}" cadastrado com sucesso.`);
    } catch {
      alert("Erro ao cadastrar jogo.");
    }
  };

  return (
    <main>
      <h1>Catálogo de Jogos</h1>
      <MenuTabela />
      <TabelaJogos jogos={jogos} excluir={excluir} />
      <CadastroJogo cadastrar={cadastrar} />
    </main>
  );
}

export default Catalogo;
