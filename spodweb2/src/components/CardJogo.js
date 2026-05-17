import { Link } from "react-router-dom";

function normalizeCoverPath(capa) {
  if (!capa) return "/imgs/default.svg";
  const value = String(capa).trim();
  if (value === "") return "/imgs/default.svg";
  if (/^https?:\/\//i.test(value)) return value;
  return value.startsWith("/") ? value : `/${value}`;
}

function makePlaceholderImage(nome) {
  const text = encodeURIComponent(nome || "Imagem indisponível");
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='340'%3E%3Crect width='100%25' height='100%25' fill='%230b1120'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial,sans-serif' font-size='32' fill='%23f8fafc'%3E${text}%3C/text%3E%3C/svg%3E`;
}

function CardJogo({ jogo }) {
  const imagem = normalizeCoverPath(jogo.capa);
  const fallback = makePlaceholderImage(jogo.nome);

  return (
    <div className="card">
      <img
        src={imagem}
        alt={jogo.nome}
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = fallback;
        }}
      />
      <h3>{jogo.nome}</h3>
      <p>{jogo.genero}</p>
      <p>R$ {jogo.preco.toFixed(2)}</p>
      <Link to={`/jogo/${jogo.slug}`}>Ver detalhes</Link>
    </div>
  );
}

export default CardJogo;
