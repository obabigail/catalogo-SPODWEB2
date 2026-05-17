import { useState, useEffect } from "react";

function AlterarJogo({ jogo, salvarAlteracoes }) {
  const [nome, setNome] = useState("");
  const [genero, setGenero] = useState("");
  const [preco, setPreco] = useState("");

  useEffect(() => {
    if (jogo) {
      setNome(jogo.nome);
      setGenero(jogo.genero);
      setPreco(jogo.preco);
    }
  }, [jogo]);

  const salvar = (e) => {
    e.preventDefault();

    salvarAlteracoes({
      id: jogo.id, // 🔥 importante
      nome,
      genero,
      preco: parseFloat(preco)
      // slug removido (evita conflito)
    });
  };

  return (
    <form className="formulario" onSubmit={salvar}>
      <h2>Alterar Jogo</h2>

      <input
        type="text"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />

      <input
        type="text"
        value={genero}
        onChange={(e) => setGenero(e.target.value)}
      />

      <input
        type="number"
        value={preco}
        onChange={(e) => setPreco(e.target.value)}
      />

      <button type="submit">Salvar alterações</button>
    </form>
  );
}

export default AlterarJogo;