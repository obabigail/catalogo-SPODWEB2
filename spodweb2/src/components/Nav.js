import { NavLink } from "react-router-dom";

function Nav() {
  return (
    <nav className="menu">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/acao">Ação</NavLink>
      <NavLink to="/rpg">RPG</NavLink>
      <NavLink to="/corrida">Corrida</NavLink>
      <NavLink to="/terror">Terror</NavLink>
      <NavLink to="/catalogo">Catálogo</NavLink>
    </nav>
  );
}

export default Nav;
