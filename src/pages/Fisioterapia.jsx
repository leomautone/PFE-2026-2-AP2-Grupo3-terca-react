// Fisioterapia — Leonardo
// Página ligada à PKZ e ao One to One. Não aparece no menu: entra pelo card da Home.
// Textos provisórios, a confirmar com o cliente.

import { Link } from "react-router-dom";
import "./Fisioterapia.css";
import useTitulo from "../components/useTitulo.js";

export default function Fisioterapia() {
  useTitulo("Fisioterapia — PKZ / One to One");

  return (
    <div className="pagina-fisio">
      <section id="hero" className="secao secao-escura">
        <div className="container">
          <div className="grade-2">
            <div>
              <span className="etiqueta">FISIOTERAPIA · PKZ E ONE TO ONE</span>
              <h1>CUIDAR PARA VOLTAR MAIS FORTE</h1>
              <p className="subtitulo">
                Fisioterapia integrada aos treinos dos dois estúdios: prevenção de
                lesões, reabilitação e retorno seguro ao esporte.
              </p>
              <div className="fisio-acoes">
                <Link to="/agendamento" className="botao botao-claro">
                  Agendar avaliação
                </Link>
                <a href="#como-funciona" className="botao botao-claro">
                  Como funciona ↓
                </a>
              </div>
            </div>
            <img
              className="foto"
              src="/img/onetoone/pos-lesao.jpg"
              alt="Aluna fazendo alongamento"
              width={960}
              height={639}
            />
          </div>
        </div>
      </section>

      <section id="como-funciona" className="secao">
        <div className="container">
          <span className="etiqueta">COMO FUNCIONA</span>
          <h2>DO DIAGNÓSTICO AO TREINO</h2>
          <p className="subtitulo">
            O fisioterapeuta e o professor trabalham juntos, com as mesmas
            informações sobre o aluno.
          </p>
          <div className="grade-3">
            <div className="card">
              <span className="numero">1</span>
              <h3>Avaliação</h3>
              <p>
                Entrevista, testes de movimento e análise de dores ou lesões
                anteriores.
              </p>
            </div>
            <div className="card">
              <span className="numero">2</span>
              <h3>Tratamento</h3>
              <p>
                Sessões de fisioterapia com plano definido e evolução registrada.
              </p>
            </div>
            <div className="card">
              <span className="numero">3</span>
              <h3>Volta ao treino</h3>
              <p>
                O laudo vai para o professor, que adapta o treino até a liberação
                completa.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="estudios" className="secao secao-clara">
        <div className="container">
          <span className="etiqueta">LIGADA AOS DOIS ESTÚDIOS</span>
          <h2>PARA QUEM É</h2>
          <div className="grade-2">
            <div className="card">
              <span className="pilula">PKZ</span>
              <h3>Jovens atletas</h3>
              <p>
                Prevenção de lesões na fase de crescimento e acompanhamento depois
                de jogos e competições.
              </p>
              <Link to="/pkz" className="botao botao-escuro">
                Conhecer a PKZ →
              </Link>
            </div>
            <div className="card">
              <span className="pilula">ONE TO ONE</span>
              <h3>Todas as idades</h3>
              <p>
                Reabilitação de lesões, dores do dia a dia e retorno pós-cirurgia
                com treino acompanhado.
              </p>
              <Link to="/onetoone" className="botao botao-escuro">
                Conhecer o One to One →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="agendar" className="secao secao-onetoone">
        <div className="container">
          <h2>SENTIU ALGUMA DOR?</h2>
          <p>Agende uma avaliação e a gente monta o plano com você.</p>
          <Link to="/agendamento" className="botao botao-claro">
            Escolher dia no calendário →
          </Link>
        </div>
      </section>
    </div>
  );
}
