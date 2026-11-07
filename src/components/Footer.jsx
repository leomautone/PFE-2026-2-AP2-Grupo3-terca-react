// Footer — Leonardo (igual em todas as páginas)

import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer" id="contato">
      <div className="container">
        <div className="footer-colunas">
          <div>
            <Link to="/" className="logo">
              <img src="/img/logo-pkz.png" alt="PKZ" />
              <span>ONE TO ONE</span>
            </Link>
            <p>Treinamento esportivo e personal training</p>
            <p>Barra da Tijuca · Rio de Janeiro</p>
          </div>
          <div>
            <h3>Estúdios</h3>
            <ul>
              <li><Link to="/pkz">PKZ — jovens atletas</Link></li>
              <li><Link to="/onetoone">One to One — personal training</Link></li>
            </ul>
          </div>
          <div>
            <h3>Unidades</h3>
            <ul>
              <li>Barra da Tijuca</li>
              <li>Shopping Square</li>
            </ul>
          </div>
          <div>
            <h3>Contato</h3>
            <ul>
              <li>WhatsApp: (21) 90000-0000</li>
              <li>Instagram: @playmakerz_pkz</li>
            </ul>
          </div>
        </div>
        <div className="footer-final">
          <p>© 2026 PKZ / One to One — projeto acadêmico · PFE 2026.2 · Grupo 3</p>
          <p>Dados, fotos e depoimentos ilustrativos</p>
        </div>
      </div>
    </footer>
  );
}
