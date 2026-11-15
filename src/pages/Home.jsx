// Home — Pedro Henrique
// Hero, números das marcas e escolha entre PKZ e One to One (migrado do vanilla).

import { Link } from "react-router-dom";
import "./Home.css";
import useTitulo from "../components/useTitulo.js";

export default function Home() {
  useTitulo("PKZ / One to One — Treinamento esportivo");

  return (
    <div className="pagina-home">
      {/* Hero — Pedro Henrique */}
      <section id="hero" className="secao-pkz hero">
        <div className="container hero-conteudo">
          <div className="hero-texto">
            <p className="etiqueta">BARRA DA TIJUCA · SHOPPING SQUARE</p>
            <h1>NASCIDOS PARA PERFORMAR</h1>
            <p className="subtitulo">
              Dois estúdios, uma mesma equipe: PKZ para crianças e adolescentes
              atletas, One to One para personal training de todas as idades.
            </p>
            <div className="hero-botoes">
              <a href="#estudios" className="botao botao-claro">
                Conhecer os estúdios ↓
              </a>
              <Link to="/agendamento" className="botao botao-claro">
                Agendar aula experimental
              </Link>
            </div>
          </div>
          <div className="foto hero-foto">
            <img src="/img/index/hero-treino.jpg" alt="Atleta treinando com cordas navais ao ar livre" width="960" height="541" />
          </div>
        </div>
        <p className="hero-rolar">Role para escolher seu estúdio ↓</p>
      </section>

      {/* Números das marcas — Pedro Henrique */}
      <section id="numeros" className="secao-escura numeros">
        <div className="container grade-4">
          <div className="numero-item">
            <span className="numero">140+</span>
            <span className="numero-legenda">alunos ativos nos dois estúdios</span>
          </div>
          <div className="numero-item">
            <span className="numero">16+</span>
            <span className="numero-legenda">testes físicos na avaliação inicial</span>
          </div>
          <div className="numero-item">
            <span className="numero">2</span>
            <span className="numero-legenda">unidades, Barra e Shopping Square</span>
          </div>
          <div className="numero-item">
            <span className="numero">1×/mês</span>
            <span className="numero-legenda">reavaliação com relatório visual</span>
          </div>
        </div>
      </section>

      {/* Escolha seu caminho — Pedro Henrique */}
      <section id="estudios" className="secao secao-clara">
        <div className="container">
          <div className="estudios-cabecalho">
            <p className="etiqueta">DOIS ESTÚDIOS, UMA EQUIPE</p>
            <h2>ESCOLHA SEU CAMINHO</h2>
            <p className="subtitulo">
              Cada estúdio tem seu foco. Escolha o que combina com você — ou com o
              seu filho.
            </p>
          </div>

          <div className="grade-2">
            <article className="estudio-card estudio-pkz">
              <p className="etiqueta">Crianças e adolescentes</p>
              <h3>PKZ</h3>
              <p>
                Preparação física para jovens atletas, com avaliação completa e
                relatórios que os pais entendem de verdade.
              </p>
              <ul>
                <li>Mais de 16 testes físicos por faixa etária</li>
                <li>Plano de treino mensal para cada atleta</li>
                <li>Relatório visual mensal para os pais</li>
              </ul>
              <Link to="/pkz" className="botao botao-claro">
                Conhecer a PKZ →
              </Link>
              <p className="estudio-frase">Aqui nascem atletas.</p>
            </article>

            <article className="estudio-card estudio-onetoone">
              <p className="etiqueta">Todas as idades</p>
              <h3>ONE TO ONE</h3>
              <p>
                Personal training para atletas e não atletas performarem melhor no
                esporte que gostam.
              </p>
              <ul>
                <li>No máximo 3 alunos por horário</li>
                <li>Treino anterior sempre à mão do professor</li>
                <li>Agendamento sem precisar perguntar se tem vaga</li>
              </ul>
              <Link to="/onetoone" className="botao botao-claro">
                Conhecer o One to One →
              </Link>
              <p className="estudio-frase">Seu treino, seu ritmo.</p>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}
