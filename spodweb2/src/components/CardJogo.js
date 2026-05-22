import { Link } from "react-router-dom";

function CardJogo({ jogo }) {
  // load images from src/assets/imgs at build time
  const images = require.context("../assets/imgs", false, /\.(png|jpe?g|webp)$/);

  const resolveSrc = (capa) => {
    if (!capa) return images("./logo.png");

    if (capa.startsWith("/")) {
      const maybeName = capa.replace(/^\/?imgs\//, "");
      try {
        return images(`./${maybeName}`);
      } catch (e) {
        return capa;
      }
    }

    const name = capa.replace(/^\.?\/?imgs\//, "");

    try {
      return images(`./${name}`);
    } catch (e) {
      return images("./logo.png");
    }
  };

  const src = resolveSrc(jogo.capa);

  return (
    <article className="game-card" aria-label={jogo.nome}>
      <div className="cover-wrapper">
        <img className="jogo-cover" src={src} alt={jogo.nome} />
      </div>

      <div className="game-info">
        <h3 className="game-title">{jogo.nome}</h3>
        <div className="game-meta">{jogo.genero}</div>
        <p className="game-desc">
          {jogo.descricao ? (jogo.descricao.length > 120 ? jogo.descricao.slice(0,120) + '…' : jogo.descricao) : 'Sem descrição.'}
        </p>
        <div className="game-bottom">
          <span className="game-price">R$ {Number(jogo.preco).toFixed(2)}</span>
          <Link to={`/jogo/${jogo.slug}`} className="card-link">Ver detalhes</Link>
        </div>
      </div>
    </article>
  );
}

export default CardJogo;
