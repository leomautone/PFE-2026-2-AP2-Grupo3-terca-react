// Header — Leonardo (igual em todas as páginas)
// No vanilla, o js/base.js adicionava e tirava a classe "menu-aberto".
// Aqui o React faz isso com o estado "menuAberto".

import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

// NavLink marca sozinho o link da página atual (e já coloca aria-current="page")
const classeDoLink = ({ isActive }) => (isActive ? "ativo" : undefined);

export default function Header({ claro = false }) {
  const [menuAberto, setMenuAberto] = useState(false);
  const menuBotao = useRef(null);
  const { pathname } = useLocation();

  // fecha o menu ao trocar de página
  useEffect(() => {
    setMenuAberto(false);
  }, [pathname]);

  // Escape fecha o menu e devolve o foco ao botão ☰
  useEffect(() => {
    if (!menuAberto) return;
    function aoApertarTecla(evento) {
      if (evento.key === "Escape") {
        setMenuAberto(false);
        menuBotao.current?.focus();
      }
    }
    document.addEventListener("keydown", aoApertarTecla);
    return () => document.removeEventListener("keydown", aoApertarTecla);
  }, [menuAberto]);

  // ao voltar para o desktop, o menu não fica preso aberto
  useEffect(() => {
    const celular = window.matchMedia("(max-width: 800px)");
    function aoMudarTela(evento) {
      if (!evento.matches) setMenuAberto(false);
    }
    celular.addEventListener("change", aoMudarTela);
    return () => celular.removeEventListener("change", aoMudarTela);
  }, []);

  const classes = ["header", claro && "header-claro", menuAberto && "menu-aberto"]
    .filter(Boolean)
    .join(" ");

  const fecharMenu = () => setMenuAberto(false);

  return (
    <header className={classes}>
      <div className="container header-conteudo">
        <Link to="/" className="logo">
          <img src="/img/logo-pkz.png" alt="PKZ" />
          <span>ONE TO ONE</span>
        </Link>

        <button
          ref={menuBotao}
          className="menu-botao"
          type="button"
          aria-controls="menu-principal"
          aria-expanded={menuAberto}
          aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
          onClick={() => setMenuAberto(!menuAberto)}
        >
          ☰
        </button>

        <nav className="menu" id="menu-principal">
          <NavLink to="/" end className={classeDoLink} onClick={fecharMenu}>Início</NavLink>
          <NavLink to="/pkz" className={classeDoLink} onClick={fecharMenu}>PKZ</NavLink>
          <NavLink to="/onetoone" className={classeDoLink} onClick={fecharMenu}>One to One</NavLink>
          <NavLink to="/agendamento" className={classeDoLink} onClick={fecharMenu}>Agendamento</NavLink>
          <a href="#contato" onClick={fecharMenu}>Contato</a>
        </nav>

        <Link to="/agendamento" className="botao botao-claro">Agendar aula</Link>
      </div>
    </header>
  );
}
