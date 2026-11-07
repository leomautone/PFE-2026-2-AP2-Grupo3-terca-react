// Layout — Leonardo
// Header e footer de todas as páginas. A página da rota atual entra no <Outlet />.

import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

// páginas que usam o header branco (como no vanilla)
const PAGINAS_HEADER_CLARO = ["/agendamento", "/confirmado"];

export default function Layout() {
  const { pathname, hash } = useLocation();

  // ao trocar de página, volta para o topo (links com #, como "Contato", rolam até o lugar certo)
  useEffect(() => {
    if (hash) {
      document.querySelector(hash)?.scrollIntoView();
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return (
    <>
      <Header claro={PAGINAS_HEADER_CLARO.includes(pathname)} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
