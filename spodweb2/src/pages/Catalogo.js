import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import MenuTabela from "../components/MenuTabela";
import TabelaJogos from "../components/TabelaJogos";
import CadastroJogo from "../components/CadastroJogo";

function Catalogo() {
  const [jogos, setJogos] = useState([]);

  //Buscar dados do banco
  useEffect(() => {
    async function carregarJogos() {
      const { data, error } = await supabase
        .from("jogos")
        .select("*");

      if (error) {
        console.error("Erro ao buscar jogos:", error);
      } else {
        setJogos(data);
      }
    }

    carregarJogos();
  }, []);

  //Deletar do banco + atualizar tela
  const excluir = async (id) => {
    const { error } = await supabase
      .from("jogos")
      .delete()
      .eq("id", id);

    if (!error) {
      setJogos(jogos.filter((j) => j.id !== id));
    } else {
      console.error(error);
    }
  };

  //Inserir no banco + atualizar tela
  const cadastrar = async (novo) => {
    const { data, error } = await supabase
      .from("jogos")
      .insert([novo])
      .select(); // retorna o item inserido

    if (!error) {
      setJogos([...jogos, data[0]]);
    } else {
      console.error(error);
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