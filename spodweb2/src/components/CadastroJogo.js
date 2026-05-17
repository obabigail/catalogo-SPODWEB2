import { useState } from "react";

function CadastroJogo({ cadastrar }) {
  const [nome, setNome] = useState("");
  const [genero, setGenero] = useState("");
  const [preco, setPreco] = useState("");

  const salvar = (e) => {
    e.preventDefault();

    const novo = {
      nome,
      genero,
      slug: nome.toLowerCase().replace(/\s+/g, "-") + "-" + Date.now(), // 🔥 evita duplicação
      preco: parseFloat(preco),
      capa: "/imgs/default.svg",
      descricao: "Jogo cadastrado manualmente."
    };

    cadastrar(novo);

    setNome("");
    setGenero("");
    setPreco("");
  };

  return (
    <form className="formulario" onSubmit={salvar}>
      <h2>Cadastro de Novo Jogo</h2>

      <input
        type="text"
        placeholder="Nome do jogo"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />

      <input
        type="text"
        placeholder="Gênero"
        value={genero}
        onChange={(e) => setGenero(e.target.value)}
      />

      <input
        type="number"
        placeholder="Preço"
        value={preco}
        onChange={(e) => setPreco(e.target.value)}
      />

      <button type="submit">Cadastrar</button>
    </form>
  );
}

export default CadastroJogo;