
import { Link } from "react-router-dom";
import "./OneToOne.css";
import useTitulo from "../components/useTitulo.js";

export default function OneToOne() {
  useTitulo("One to One — Seu treino, seu ritmo");

  return (
    <div className="pagina-onetoone">
      <section id="hero" className="secao secao-onetoone">
        <div className="container">
          <div className="grade-2">
            <div>
              <span className="etiqueta">ONE TO ONE · PERSONAL TRAINING</span>
              <h1>SEU TREINO, SEU RITMO</h1>
              <p className="subtitulo">
                Personal training para todas as idades — atletas e não atletas —
                para você performar melhor no esporte que gosta: futevôlei, corrida,
                o que for.
              </p>
              <div className="hero-acoes">
                <Link to="/agendamento" className="botao botao-claro">
                  Agendar meu treino
                </Link>
              </div>
              <div className="grade-3 hero-numeros">
                <div>
                  <span className="numero">80+</span> alunos ativos
                </div>
                <div>
                  <span className="numero">3</span> alunos no máximo por horário
                </div>
                <div>
                  <span className="numero">2</span> unidades
                </div>
              </div>
            </div>
            <img
              className="foto"
              src="/img/onetoone/hero-aluna.jpg"
              alt="Aluna em treino funcional com halteres"
              width={960}
              height={640}
            />
          </div>
        </div>
      </section>

      <section id="sobre" className="secao">
        <div className="container">
          <div className="grade-2">
            <div>
              <span className="etiqueta">SOBRE NÓS</span>
              <h2>PERSONAL DE VERDADE</h2>
              <p>
                O One to One nasceu como estúdio de personal training na Barra da
                Tijuca e hoje atende mais de 80 alunos, de todas as idades. Atletas
                e não atletas treinam aqui para ganhar força, condicionamento e
                performance no esporte que praticam.
              </p>
              <p>
                Cada professor atende no máximo três alunos por horário. Assim, ele
                sabe o que você treinou na última aula, como você se sentiu e o que
                vem a seguir.
              </p>
              <div>
                <span className="pilula">HIPERTROFIA</span>
                <span className="pilula">FUTEVÔLEI</span>
                <span className="pilula">CORRIDA</span>
                <span className="pilula">MOBILIDADE</span>
              </div>
            </div>
            <img
              className="foto"
              src="/img/onetoone/estudio.jpg"
              alt="Estúdio de treino com bicicletas e equipamentos"
              width={960}
              height={640}
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </section>

      <section id="modalidades" className="secao secao-clara">
        <div className="container">
          <span className="etiqueta">O QUE VOCÊ PODE TREINAR</span>
          <h2>UM TREINO PARA CADA OBJETIVO</h2>
          <p className="subtitulo">
            Todos os treinos são individualizados — o que muda é onde você quer
            chegar.
          </p>
          <div className="grade-4">
            <div className="card">
              <img
                className="foto"
                src="/img/onetoone/forca.jpg"
                alt="Aluno fazendo treino de força"
                width={960}
                height={640}
                loading="lazy"
                decoding="async"
              />
              <h3>Força e hipertrofia</h3>
              <p>
                Treinos de membros superiores e inferiores com progressão planejada.
              </p>
            </div>
            <div className="card">
              <img
                className="foto"
                src="/img/onetoone/performance.jpg"
                alt="Corredor em uma estrada"
                width={960}
                height={640}
                loading="lazy"
                decoding="async"
              />
              <h3>Performance no esporte</h3>
              <p>
                Preparação específica para futevôlei, corrida, beach tennis e
                outros.
              </p>
            </div>
            <div className="card">
              <img
                className="foto"
                src="/img/onetoone/condicionamento.jpg"
                alt="Aluna saltando durante treino ao ar livre"
                width={960}
                height={640}
                loading="lazy"
                decoding="async"
              />
              <h3>Condicionamento e saúde</h3>
              <p>
                Para quem quer mais disposição, resistência e qualidade de vida.
              </p>
            </div>
            <div className="card">
              <img
                className="foto"
                src="/img/onetoone/pos-lesao.jpg"
                alt="Aluna fazendo alongamento"
                width={960}
                height={639}
                loading="lazy"
                decoding="async"
              />
              <h3>Retorno pós-lesão</h3>
              <p>
                Treino acompanhado, levando em conta os laudos do fisioterapeuta.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="diferenciais" className="secao secao-escura">
        <div className="container">
          <span className="etiqueta">POR QUE O ONE TO ONE</span>
          <h2>TECNOLOGIA NO TREINO</h2>
          <div className="grade-4">
            <div>
              <span className="numero">3</span>
              <p>alunos no máximo por professor em cada horário</p>
            </div>
            <div>
              <span className="numero">100%</span>
              <p>dos treinos com relatório do professor</p>
            </div>
            <div>
              <span className="numero">0</span>
              <p>mensagens para saber se tem vaga — você agenda sozinho</p>
            </div>
            <div>
              <span className="numero">1 clique</span>
              <p>para o professor ver o que você treinou na última aula</p>
            </div>
          </div>
        </div>
      </section>

      <section id="avaliacoes" className="secao">
        <div className="container">
          <span className="etiqueta">CLIENTES SATISFEITOS</span>
          <h2>QUEM TREINA, RECOMENDA</h2>
          <div className="nota-geral">
            <span className="numero">4,9</span>
            <span className="estrelas">★★★★★</span>
            <p>nota média que os alunos dão aos treinos</p>
          </div>
          <div className="grade-3">
            <div className="card">
              <strong>Mariana, 34 anos</strong>
              <span className="estrelas">★★★★★</span>
              <p>
                Voltei a jogar futevôlei sem dor no joelho. O professor lembrava de
                cada detalhe da aula anterior.
              </p>
              <span className="pilula">FUTEVÔLEI</span>
            </div>
            <div className="card">
              <strong>Carlos, 52 anos</strong>
              <span className="estrelas">★★★★★</span>
              <p>
                Agendar é muito fácil, faço tudo pelo celular. E o treino é
                realmente pensado pra mim.
              </p>
              <span className="pilula">CONDICIONAMENTO</span>
            </div>
            <div className="card">
              <strong>Juliana, 28 anos</strong>
              <span className="estrelas">★★★★★</span>
              <p>
                Baixei meu tempo nos 10 km em quatro meses. A evolução fica
                registrada e dá pra ver.
              </p>
              <span className="pilula">CORRIDA</span>
            </div>
          </div>
          <p>
            <small>Avaliações e depoimentos ilustrativos</small>
          </p>
        </div>
      </section>

      <section id="unidades" className="secao secao-clara">
        <div className="container">
          <span className="etiqueta">ONDE ESTAMOS</span>
          <h2>DUAS UNIDADES PARA VOCÊ</h2>
          <div className="grade-2">
            <div className="card">
              <iframe
                className="mapa"
                src="https://maps.google.com/maps?q=Barra+da+Tijuca+Rio+de+Janeiro&z=14&output=embed"
                title="Mapa da unidade Barra da Tijuca"
                loading="lazy"
              />
              <h3>Barra da Tijuca</h3>
              <p>Estúdio principal, ao lado da PKZ.</p>
              <a
                href="https://maps.google.com/?q=Barra+da+Tijuca+Rio+de+Janeiro"
                className="botao botao-escuro"
                target="_blank"
                rel="noopener"
              >
                Ver no mapa
              </a>
            </div>
            <div className="card">
              <iframe
                className="mapa"
                src="https://maps.google.com/maps?q=Shopping+Square+Barra+da+Tijuca+Rio+de+Janeiro&z=14&output=embed"
                title="Mapa da unidade Shopping Square"
                loading="lazy"
              />
              <h3>Shopping Square</h3>
              <p>Unidade nova, mais perto de quem mora ou trabalha na região.</p>
              <a
                href="https://maps.google.com/?q=Shopping+Square+Rio+de+Janeiro"
                className="botao botao-escuro"
                target="_blank"
                rel="noopener"
              >
                Ver no mapa
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="agendar" className="secao secao-onetoone">
        <div className="container">
          <h2>BORA TREINAR?</h2>
          <p>Escolha o dia no calendário e o horário que funciona para você.</p>
          <Link to="/agendamento" className="botao botao-claro">
            Escolher dia no calendário →
          </Link>
        </div>
      </section>
    </div>
  );
}