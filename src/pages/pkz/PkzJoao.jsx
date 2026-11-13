import { Link } from "react-router-dom";
import "./PkzJoao.css";

export default function PkzJoao() {
  return (
    <div className="pkz-joao">
      {/* Hero — João */}
      <section id="hero" className="secao secao-pkz">
        <div className="container hero-conteudo">
          <div className="hero-texto">
            <p className="etiqueta">PKZ · CRIANÇAS E ADOLESCENTES ATLETAS</p>
            <h1>AQUI NASCEM ATLETAS</h1>
            <p className="subtitulo">
              Preparação física para jovens atletas com avaliação completa, treino planejado mês a mês e um relatório visual que você entende em um minuto.
            </p>
            <div className="hero-acoes">
              <Link className="botao botao-claro" to="/agendamento">Agendar avaliação do meu filho</Link>
              <a className="botao botao-claro" href="#como-funciona">Ver como acompanhamos ↓</a>
            </div>
          </div>
          <img
            className="foto hero-foto"
            src="/img/pkz/hero-atletas.jpg"
            alt="Crianças disputando bola em um jogo de futebol"
            width="1024"
            height="683"
          />
        </div>
      </section>
      {/* fim Hero */}

      {/* Faixa de confiança — João */}
      <section id="confianca">
        <div className="container confianca-grade">
          <article className="confianca-item">
            <h2>Comparado com a mesma idade</h2>
            <p>Seu filho é avaliado dentro da própria faixa etária e modalidade.</p>
          </article>
          <article className="confianca-item">
            <h2>Presença confirmada</h2>
            <p>O professor confirma a presença do atleta em todo treino.</p>
          </article>
          <article className="confianca-item">
            <h2>Relatório todo mês</h2>
            <p>Evolução em gráficos simples, sem 17 páginas de texto.</p>
          </article>
          <article className="confianca-item">
            <h2>Equipe próxima</h2>
            <p>Automatizamos processos, não o relacionamento com a família.</p>
          </article>
        </div>
      </section>
      {/* fim Faixa de confiança */}

      {/* Sobre nós — João */}
      <section id="sobre" className="secao">
        <div className="container sobre-conteudo">
          <img
            className="foto sobre-foto"
            src="/img/pkz/sobre-atletas.jpg"
            alt="Jovens atletas em treino de futebol no campo"
            width="1080"
            height="720"
            loading="lazy"
            decoding="async"
          />
          <div className="sobre-texto">
            <p className="etiqueta">SOBRE NÓS</p>
            <h2>NOSSA HISTÓRIA</h2>
            <p>
              O Henrique trabalha há anos com preparação física de atletas. Começou atendendo de carro e de moto, em clubes e condomínios da Barra, do Recreio e da Zona Sul — até a procura ficar grande demais para rodar a cidade.
            </p>
            <p>
              Foi aí que nasceu a PKZ: um centro de treinamento pensado para jovens atletas, ao lado do estúdio One to One. Hoje são cerca de 60 atletas treinando com um plano feito sob medida para cada um.
            </p>
            <blockquote>
              <p>“A tecnologia existe para facilitar — a conexão com o atleta e com a família é o que faz a PKZ ser a PKZ.”</p>
              <cite>— Henrique, fundador</cite>
            </blockquote>
          </div>
        </div>
      </section>
      {/* fim Sobre nós */}

      {/* Como funciona — João */}
      <section id="como-funciona" className="secao secao-clara">
        <div className="container">
          <header className="como-cabecalho">
            <p className="etiqueta">COMO ACOMPANHAMOS SEU FILHO</p>
            <h2>PASSO A PASSO</h2>
            <p className="subtitulo">Um ciclo simples, que se repete todo mês — e que você acompanha de perto.</p>
          </header>
          <ol className="etapas-grade">
            <li className="card etapa">
              <span className="numero">01</span>
              <h3>Avaliação inicial</h3>
              <p>Mais de 16 testes físicos no primeiro dia: salto, velocidade, agilidade, tempo de reação e foco.</p>
            </li>
            <li className="card etapa">
              <span className="numero">02</span>
              <h3>Plano do mês</h3>
              <p>Com base nos resultados, montamos o ciclo de treinos do mês, sob medida para os atletas.</p>
            </li>
            <li className="card etapa">
              <span className="numero">03</span>
              <h3>Treino com registro</h3>
              <p> A cada aula o professor registra o que foi treinado e como o atleta respondeu.</p>
            </li>
            <li className="card etapa">
              <span className="numero">04</span>
              <h3>Reteste e relatório</h3>
              <p>Um mês depois, repetimos os testes e você recebe a evolução em gráficos.</p>
            </li>
          </ol>
        </div>
      </section>
      {/* fim Como funciona */}
    </div>
  );
}
