import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { buscarJogoPorSlug } from "../services/jogosService";
import "../visuals/App.css";

function JogoDetalhes() {
  const { slug } = useParams();
  const [jogo, setJogo] = useState(null);

  useEffect(() => {
    async function carregarJogo() {
      try {
        setJogo(await buscarJogoPorSlug(slug));
      } catch {
        setJogo(null);
      }
    }

    carregarJogo();
  }, [slug]);

  // resolver imagens do mesmo jeito que em CardJogo
  const images = require.context("../assets/imgs", false, /\.(png|jpe?g|webp)$/);

  const resolveSrc = (capa) => {
    if (!capa) return images("./logo.png");

    // se começar com '/', tente primeiro resolver pelo assets (bundled), senão use caminho público
    if (capa.startsWith("/")) {
      const maybeName = capa.replace(/^\/?imgs\//, "");
      try {
        return images(`./${maybeName}`);
      } catch (e) {
        return capa;
      }
    }

    const name = capa.replace(/^\.?\/imgs\//, "");
    try {
      return images(`./${name}`);
    } catch (e) {
      return images("./logo.png");
    }
  };

  if (!jogo) return <p>Carregando...</p>;

  const src = resolveSrc(jogo.capa);

  return (
    <main className="App-body">
      <h1>{jogo.nome}</h1>

      <div className="jogo-details" style={{ display: "flex", gap: "1.25rem", alignItems: "flex-start" }}>
        <img className="jogo-cover" src={src} alt={jogo.nome} />

        <table className="tabela" style={{ width: "100%", maxWidth: "720px" }}>
          <tbody>
            <tr>
              <th>Gênero</th>
              <td>{jogo.genero}</td>
            </tr>
            <tr>
              <th>Preço</th>
              <td>R$ {jogo.preco.toFixed(2)}</td>
            </tr>
            <tr>
              <th>Descrição</th>
              <td>{jogo.descricao}</td>
            </tr>
            <tr>
              <th>Slug</th>
              <td>{jogo.slug}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
}

export default JogoDetalhes;
