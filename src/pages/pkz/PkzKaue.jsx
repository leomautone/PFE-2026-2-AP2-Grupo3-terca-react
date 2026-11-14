// PKZ — blocos do Kaue: prévia do relatório, cuidado e segurança, depoimentos, perguntas frequentes, chamada para agendar

import { Link } from "react-router-dom";
import "./PkzKaue.css";

export default function PkzKaue() {
  return (
    <div className="pkz-kaue">
      {/* Prévia do relatório — Kaue */}
      <section id="relatorio" className="secao secao-escura">
        <div className="container grade-2">
          <div>
            <span className="etiqueta">Relatório visual mensal</span>
            <h2>Evolução em 1 minuto</h2>
            <p className="subtitulo">Nada de relatório de 17 páginas. Gráficos simples, comparação com atletas da mesma idade e um recado do professor.</p>
            <ul className="relatorio-lista">
              <li>Setas e cores mostram o que melhorou</li>
              <li>Comparação com a mesma faixa etária</li>
              <li>Comentário escrito pelo professor</li>
              <li>Botão para falar direto com a equipe</li>
            </ul>
          </div>

          <div>
            <div className="card relatorio-card">
              <div className="relatorio-topo">
                <div>
                  <h3>Lucas, 12 anos</h3>
                  <p>Futebol · Relatório de setembro</p>
                </div>
                <span className="relatorio-selo">Evoluiu em 3 de 3</span>
              </div>

              <div className="relatorio-item">
                <div className="relatorio-legenda">
                  <span>Velocidade (20 m)</span>
                  <span className="relatorio-melhora">↑ +8%</span>
                </div>
                <div className="relatorio-barra"><div style={{ width: "72%" }}></div></div>
              </div>

              <div className="relatorio-item">
                <div className="relatorio-legenda">
                  <span>Salto vertical</span>
                  <span className="relatorio-melhora">↑ +12%</span>
                </div>
                <div className="relatorio-barra"><div style={{ width: "80%" }}></div></div>
              </div>

              <div className="relatorio-item">
                <div className="relatorio-legenda">
                  <span>Agilidade</span>
                  <span className="relatorio-melhora">↑ +5%</span>
                </div>
                <div className="relatorio-barra"><div style={{ width: "58%" }}></div></div>
              </div>

              <div className="relatorio-recado">
                <strong>Recado do professor</strong>
                <p>Lucas está mais rápido na saída. Próximo mês vamos focar em mudança de direção.</p>
              </div>
            </div>
            <p className="relatorio-aviso">Exemplo ilustrativo de relatório. Dados fictícios.</p>
          </div>
        </div>
      </section>
      {/* fim Prévia do relatório */}

      {/* Cuidado e segurança — Kaue */}
      <section id="cuidado" className="secao">
        <div className="container">
          <span className="etiqueta">Para você ficar tranquilo</span>
          <h2>Cuidado em cada detalhe</h2>

          <div className="grade-4 cuidado-cards">
            <div className="card">
              <span className="cuidado-icone" aria-hidden="true">👥</span>
              <h3>Turmas por idade</h3>
              <p>Atletas treinam e são comparados com quem tem a mesma idade e modalidade.</p>
            </div>
            <div className="card">
              <span className="cuidado-icone" aria-hidden="true">🩺</span>
              <h3>Saúde registrada</h3>
              <p>Laudos e observações (ex.: de fisioterapeuta) são registrados pela equipe e considerados no plano de treino.</p>
            </div>
            <div className="card">
              <span className="cuidado-icone" aria-hidden="true">💬</span>
              <h3>Contato direto com a equipe</h3>
              <p>Ficou com alguma dúvida sobre o treino? A equipe responde você pelo WhatsApp.</p>
            </div>
            <div className="card">
              <span className="cuidado-icone" aria-hidden="true">🔔</span>
              <h3>Reteste sem atraso</h3>
              <p>O sistema avisa a equipe quando a reavaliação do seu filho está chegando.</p>
            </div>
          </div>
        </div>
      </section>
      {/* fim Cuidado e segurança */}

      {/* Depoimentos de pais — Kaue */}
      <section id="depoimentos" className="secao secao-clara">
        <div className="container">
          <div className="depoimentos-titulo">
            <span className="etiqueta">Pais que acompanham</span>
            <h2>O que dizem as famílias</h2>
          </div>

          <div className="grade-3">
            <div className="card">
              <div className="estrelas">★★★★★</div>
              <div className="depoimentos-destaque">
                <span className="numero">-0,3 s</span>
                <span>no sprint de 20 m em 3 meses</span>
              </div>
              <p className="depoimentos-texto">“Pela primeira vez eu entendi o relatório do meu filho. Os gráficos mostram tudo.”</p>
              <p className="depoimentos-autor">Mãe do Pedro, 11 anos</p>
            </div>
            <div className="card">
              <div className="estrelas">★★★★★</div>
              <div className="depoimentos-destaque">
                <span className="numero">+15%</span>
                <span>no salto vertical em 4 meses</span>
              </div>
              <p className="depoimentos-texto">“Ele chega em casa animado para contar o que treinou. E a equipe sempre responde a gente.”</p>
              <p className="depoimentos-autor">Pai da Sofia, 13 anos</p>
            </div>
            <div className="card">
              <div className="estrelas">★★★★★</div>
              <div className="depoimentos-destaque">
                <span className="numero">4 meses</span>
                <span>sem lesão na temporada</span>
              </div>
              <p className="depoimentos-texto">“Gosto de saber que tem alguém de olho em cada detalhe, inclusive quando é a babá que leva.”</p>
              <p className="depoimentos-autor">Mãe do Rafael, 9 anos</p>
            </div>
          </div>

          <p className="depoimentos-aviso">Depoimentos ilustrativos</p>
        </div>
      </section>
      {/* fim Depoimentos de pais */}

      {/* Perguntas frequentes — Kaue */}
      <section id="faq" className="secao">
        <div className="container">
          <span className="etiqueta">Dúvidas frequentes</span>
          <h2>Perguntas dos pais</h2>

          <div className="grade-2 faq-lista">
            <details className="card">
              <summary>A partir de que idade meu filho pode treinar?</summary>
              <p>Atendemos crianças e adolescentes, sempre avaliados dentro da própria faixa etária.</p>
            </details>
            <details className="card">
              <summary>Ele precisa jogar em clube?</summary>
              <p>Não. A PKZ atende quem já compete e quem quer começar a evoluir no esporte.</p>
            </details>
            <details className="card">
              <summary>Como recebo o relatório?</summary>
              <p>Todo mês, em formato visual, com gráficos e um comentário do professor.</p>
            </details>
            <details className="card">
              <summary>Como faço para agendar a avaliação?</summary>
              <p>Escolha um dia no calendário do site e deixe seu nome e telefone. A equipe confirma pelo WhatsApp.</p>
            </details>
          </div>
        </div>
      </section>
      {/* fim Perguntas frequentes */}

      {/* Chamada para agendar — Kaue */}
      <section id="agendar" className="secao secao-pkz">
        <div className="container">
          <h2>Agende uma avaliação</h2>
          <p className="subtitulo">Escolha um dia no calendário, deixe seu nome e telefone — nossa equipe confirma com você.</p>
          <Link to="/agendamento" className="botao botao-claro">Escolher dia no calendário →</Link>
        </div>
      </section>
      {/* fim Chamada para agendar */}
    </div>
  );
}
