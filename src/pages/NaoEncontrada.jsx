// Página 404 — Leonardo
// Aparece quando o endereço não existe.

import { Link } from "react-router-dom";
import useTitulo from "../components/useTitulo.js";

export default function NaoEncontrada() {
  useTitulo("Página não encontrada — PKZ / One to One");

  return (
    <section className="secao">
      <div className="container">
        <p className="etiqueta">Erro 404</p>
        <h2>Página não encontrada</h2>
        <p className="subtitulo">O endereço que você abriu não existe. Volte ao início para escolher seu estúdio.</p>
        <p style={{ marginTop: 24 }}>
          <Link to="/" className="botao botao-escuro">Voltar ao início</Link>
        </p>
      </div>
    </section>
  );
}
