import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useTitulo from "../components/useTitulo.js";
import { horarios, estudios, obterVagas } from "./dadosAgendamento.js";
import "./Agendamento.css";

const filtros = ["Todos", ...estudios];
const diasDaSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

function normalizarData(data) {
  return new Date(data.getFullYear(), data.getMonth(), data.getDate());
}

function formatarData(data, opcoes) {
  const texto = new Intl.DateTimeFormat("pt-BR", opcoes).format(data);
  return texto.charAt(0).toLocaleUpperCase("pt-BR") + texto.slice(1);
}

function obterStatus(vagas, data) {
  if (data.getDay() === 0) return { classe: "ponto-fechado", texto: "Fechado" };
  if (vagas >= 5) return { classe: "ponto-livre", texto: "6 horários" };
  if (vagas > 0) return { classe: "ponto-poucos", texto: "2 horários" };
  return { classe: "ponto-lotado", texto: "Lotado" };
}

function obterNomeDia(data) {
  return new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(data);
}

function montarResumoErros(erros) {
  const resumo = [];
  if (erros.nome) resumo.push("preencha o nome");
  if (erros.telefone === "Informe um telefone para contato.") {
    resumo.push("preencha o telefone");
  } else if (erros.telefone) {
    resumo.push("revise o telefone");
  }
  if (erros.estudio) resumo.push("escolha um estúdio");
  if (erros.horario) resumo.push("escolha um horário");

  if (resumo.length > 1) {
    return `${resumo.slice(0, -1).join(", ")} e ${resumo[resumo.length - 1]}.`;
  }
  return resumo.length > 0
    ? `${resumo[0].charAt(0).toLocaleUpperCase("pt-BR")}${resumo[0].slice(1)}.`
    : "";
}

export default function Agendamento() {
  useTitulo("Agendamento — PKZ / One to One");

  const navigate = useNavigate();
  const modalRef = useRef(null);
  const botaoDiaAnteriorRef = useRef(null);
  const [mesVisivel, setMesVisivel] = useState(() => {
    const hoje = new Date();
    return new Date(hoje.getFullYear(), hoje.getMonth(), 1);
  });
  const [filtro, setFiltro] = useState("Todos");
  const [dataSelecionada, setDataSelecionada] = useState(null);
  const [estudio, setEstudio] = useState("");
  const [horario, setHorario] = useState("");
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [erros, setErros] = useState({});
  const [anuncio, setAnuncio] = useState("");

  useEffect(() => {
    if (!dataSelecionada || !modalRef.current) return undefined;

    const modal = modalRef.current;
    const regioesFundo = [
      ...document.querySelectorAll("header.header, footer.footer"),
      ...document.querySelectorAll(".pagina-agendamento-conteudo"),
    ];
    const estadosInertes = regioesFundo.map((regiao) => ({
      regiao,
      inerte: regiao.inert,
    }));
    const overflowAnterior = document.body.style.overflow;

    regioesFundo.forEach((regiao) => {
      regiao.inert = true;
    });
    document.body.style.overflow = "hidden";

    function obterControlesModal() {
      return Array.from(
        modal.querySelectorAll(
          'a[href], button, input, select, textarea, [tabindex]',
        ),
      ).filter(
        (controle) =>
          !controle.disabled &&
          controle.tabIndex >= 0 &&
          !controle.closest("[hidden], [inert]") &&
          controle.getClientRects().length > 0,
      );
    }

    function focarInicioModal() {
      const primeiro = obterControlesModal()[0] || modal;
      primeiro.focus();
    }

    function lidarComTeclado(evento) {
      if (evento.key === "Escape") {
        evento.preventDefault();
        setDataSelecionada(null);
        return;
      }
      if (evento.key !== "Tab") return;

      const controles = obterControlesModal();
      const primeiro = controles[0];
      const ultimo = controles[controles.length - 1];
      const focoAtual = document.activeElement;

      if (!primeiro || !modal.contains(focoAtual)) {
        evento.preventDefault();
        focarInicioModal();
      } else if (
        evento.shiftKey &&
        (focoAtual === primeiro || !controles.includes(focoAtual))
      ) {
        evento.preventDefault();
        ultimo.focus();
      } else if (
        !evento.shiftKey &&
        (focoAtual === ultimo || !controles.includes(focoAtual))
      ) {
        evento.preventDefault();
        primeiro.focus();
      }
    }

    function manterFocoNoModal(evento) {
      if (!modal.contains(evento.target)) focarInicioModal();
    }

    document.addEventListener("keydown", lidarComTeclado);
    document.addEventListener("focusin", manterFocoNoModal);
    modal.querySelector(".modal-fechar")?.focus();

    return () => {
      document.removeEventListener("keydown", lidarComTeclado);
      document.removeEventListener("focusin", manterFocoNoModal);
      estadosInertes.forEach(({ regiao, inerte }) => {
        regiao.inert = inerte;
      });
      document.body.style.overflow = overflowAnterior;
      if (botaoDiaAnteriorRef.current?.isConnected) {
        botaoDiaAnteriorRef.current.focus();
      }
    };
  }, [dataSelecionada]);

  const ano = mesVisivel.getFullYear();
  const mes = mesVisivel.getMonth();
  const primeiroDiaSemana = new Date(ano, mes, 1).getDay();
  const totalDias = new Date(ano, mes + 1, 0).getDate();
  const quantidadeCelulas = primeiroDiaSemana + totalDias;
  const quantidadeVaziosFinais = (7 - (quantidadeCelulas % 7)) % 7;
  const dias = [
    ...Array(primeiroDiaSemana).fill(null),
    ...Array.from({ length: totalDias }, (_, indice) =>
      new Date(ano, mes, indice + 1),
    ),
    ...Array(quantidadeVaziosFinais).fill(null),
  ];
  const hoje = normalizarData(new Date());
  const tituloMes = formatarData(mesVisivel, {
    month: "long",
    year: "numeric",
  });
  const mesAnterior = formatarData(
    new Date(ano, mes - 1, 1),
    { month: "long" },
  );
  const proximoMes = formatarData(
    new Date(ano, mes + 1, 1),
    { month: "long" },
  );

  function obterDisponibilidade(data) {
    const estudiosConsiderados = filtro === "Todos" ? estudios : [filtro];
    return Math.max(
      ...estudiosConsiderados.map((nomeEstudio) =>
        obterVagas(data, nomeEstudio),
      ),
    );
  }

  function abrirModal(data, evento) {
    botaoDiaAnteriorRef.current = evento.currentTarget;
    setDataSelecionada(data);
    setEstudio(filtro === "Todos" ? "" : filtro);
    setHorario("");
    setNome("");
    setTelefone("");
    setErros({});
  }

  function fecharModal() {
    setDataSelecionada(null);
  }

  function limparErro(campo) {
    setErros((errosAtuais) => {
      if (!errosAtuais[campo]) return errosAtuais;
      const novosErros = { ...errosAtuais };
      delete novosErros[campo];
      return novosErros;
    });
  }

  function selecionarEstudio(nomeEstudio) {
    setEstudio(nomeEstudio);
    setHorario("");
    limparErro("estudio");
    limparErro("horario");
  }

  function confirmar(evento) {
    evento.preventDefault();
    const novosErros = {};
    const nomeLimpo = nome.trim();
    const telefoneLimpo = telefone.trim();
    const digitosTelefone = telefoneLimpo.replace(/\D/g, "");

    if (!nomeLimpo) novosErros.nome = "Informe o nome do aluno.";
    if (!telefoneLimpo) {
      novosErros.telefone = "Informe um telefone para contato.";
    } else if (digitosTelefone.length < 10 || digitosTelefone.length > 11) {
      novosErros.telefone = "Informe um telefone válido com DDD.";
    }
    if (!estudio) {
      novosErros.estudio = "Escolha um estúdio para continuar.";
    }
    if (!horario) {
      novosErros.horario = "Escolha um horário para continuar.";
    }

    setErros(novosErros);
    if (Object.keys(novosErros).length > 0) return;

    const dia = [
      dataSelecionada.getFullYear(),
      String(dataSelecionada.getMonth() + 1).padStart(2, "0"),
      String(dataSelecionada.getDate()).padStart(2, "0"),
    ].join("-");
    const parametros = new URLSearchParams({
      nome: nomeLimpo,
      telefone: telefoneLimpo,
      estudio,
      dia,
      horario,
    });
    navigate(`/confirmado?${parametros.toString()}`);
  }

  function selecionarFiltro(novoFiltro) {
    setFiltro(novoFiltro);
    setAnuncio(`Disponibilidade filtrada por ${novoFiltro}.`);
  }

  return (
    <div className="pagina-agendamento">
      <section className="agenda-secao">
        <div className="container">
          <div className="pagina-agendamento-conteudo agendamento-layout">
            <section
              className="calendario-card"
              aria-labelledby="titulo-calendario"
            >
              <p className="etiqueta">Aula experimental</p>
              <h1 id="titulo-calendario">Agende seu treino</h1>
              <p className="calendario-intro">
                Clique em um dia disponível para escolher o horário.
              </p>

              <div
                className="filtro-estudios"
                role="group"
                aria-label="Filtrar por estúdio"
              >
                {filtros.map((opcao) => (
                  <button
                    key={opcao}
                    className={`filtro-botao${filtro === opcao ? " ativo" : ""}`}
                    type="button"
                    aria-pressed={filtro === opcao}
                    onClick={() => selecionarFiltro(opcao)}
                  >
                    {opcao}
                  </button>
                ))}
              </div>

              <div className="calendario-navegacao">
                <button
                  className="mes-controle mes-anterior"
                  type="button"
                  aria-label="Mês anterior"
                  onClick={() => setMesVisivel(new Date(ano, mes - 1, 1))}
                >
                  ‹ <span>{mesAnterior}</span>
                </button>
                <h2 id="mes-atual" aria-live="polite">
                  {tituloMes}
                </h2>
                <button
                  className="mes-controle proximo-mes"
                  type="button"
                  aria-label="Próximo mês"
                  onClick={() => setMesVisivel(new Date(ano, mes + 1, 1))}
                >
                  <span>{proximoMes}</span> ›
                </button>
              </div>

              <div
                className="calendario-grade dias-semana"
                aria-label="Dias da semana"
              >
                {diasDaSemana.map((diaSemana) => (
                  <span key={diaSemana}>{diaSemana}</span>
                ))}
              </div>
              <div
                className="calendario-grade dias-calendario"
                role="grid"
                aria-label="Calendário de disponibilidade"
              >
                {dias.map((data, indice) => {
                  if (data === null) {
                    return (
                      <span
                        key={`vazio-${indice}`}
                        className="dia-vazio"
                        aria-hidden="true"
                      />
                    );
                  }

                  const vagas = obterDisponibilidade(data);
                  const status = obterStatus(vagas, data);
                  const passado = data < hoje;
                  const ehHoje = data.getTime() === hoje.getTime();
                  const indisponivel =
                    status.texto === "Lotado" ||
                    status.texto === "Fechado" ||
                    passado;
                  const rotuloData = obterNomeDia(data);
                  const dataIso = [
                    data.getFullYear(),
                    String(data.getMonth() + 1).padStart(2, "0"),
                    String(data.getDate()).padStart(2, "0"),
                  ].join("-");

                  return (
                    <button
                      key={dataIso}
                      className={`dia-calendario${status.texto === "Fechado" ? " fechado" : ""}${passado ? " passado" : ""}${ehHoje ? " hoje" : ""}`}
                      type="button"
                      role="gridcell"
                      disabled={indisponivel}
                      aria-label={`${rotuloData}: ${ehHoje ? "Hoje, " : ""}${status.texto}${passado ? ", data passada" : ""}`}
                      title={`${rotuloData}: ${status.texto}`}
                      onClick={(evento) => abrirModal(data, evento)}
                    >
                      <span className="dia-numero">{data.getDate()}</span>
                      {ehHoje && <span className="dia-hoje">Hoje</span>}
                      <span className="dia-status">
                        <span
                          className={`status-ponto ${status.classe}`}
                          aria-hidden="true"
                        />
                        <span className="status-texto">{status.texto}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
              <p className="sr-only" aria-live="polite">
                {anuncio}
              </p>
            </section>

            <aside
              className="agenda-lateral"
              aria-label="Informações do agendamento"
            >
              <section className="info-card">
                <h2>Como funciona</h2>
                <ol className="passos-agendamento">
                  <li>
                    <span>1</span>Escolha um dia com horários livres
                  </li>
                  <li>
                    <span>2</span>Informe nome, horário e telefone
                  </li>
                  <li>
                    <span>3</span>Receba a confirmação da equipe
                  </li>
                </ol>
              </section>

              <section className="info-card">
                <h2>Legenda</h2>
                <ul className="legenda-disponibilidade">
                  <li>
                    <span
                      className="legenda-ponto ponto-livre"
                      aria-hidden="true"
                    />
                    Muitos horários livres
                  </li>
                  <li>
                    <span
                      className="legenda-ponto ponto-poucos"
                      aria-hidden="true"
                    />
                    Poucos horários
                  </li>
                  <li>
                    <span
                      className="legenda-ponto ponto-lotado"
                      aria-hidden="true"
                    />
                    Lotado
                  </li>
                  <li>
                    <span
                      className="legenda-ponto ponto-fechado"
                      aria-hidden="true"
                    />
                    Estúdio fechado
                  </li>
                </ul>
              </section>

              <section className="contato-card">
                <h2>Prefere falar com alguém?</h2>
                <p>
                  Nossa recepção ajuda você a encontrar o melhor horário.
                </p>
                <a
                  className="botao botao-claro"
                  href="https://wa.me/5521900000000"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Chamar no WhatsApp
                </a>
              </section>
            </aside>
          </div>
        </div>
      </section>

      {dataSelecionada && (
        <section
          ref={modalRef}
          className="modal-overlay"
          onClick={(evento) => {
            if (evento.target === evento.currentTarget) fecharModal();
          }}
        >
          <div
            className="modal-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="titulo-modal"
            tabIndex={-1}
          >
            <button
              className="modal-fechar"
              type="button"
              aria-label="Fechar"
              onClick={fecharModal}
            >
              ×
            </button>
            <p className="etiqueta">Reserve sua aula</p>
            <h2 id="titulo-modal">
              {formatarData(dataSelecionada, {
                weekday: "long",
                day: "numeric",
                month: "long",
              })}
            </h2>
            <p className="modal-intro">
              Preencha os dados para reservar seu horário.
            </p>

            <form id="form-agendamento" noValidate onSubmit={confirmar}>
              {Object.keys(erros).length > 0 && (
                <div className="aviso-formulario" role="alert">
                  <strong>Faltam informações para confirmar</strong>
                  <span>{montarResumoErros(erros)}</span>
                </div>
              )}

              <div
                className={`campo-formulario${erros.nome ? " campo-invalido" : ""}`}
                data-campo="nome"
              >
                <label htmlFor="nome-aluno">Nome do aluno</label>
                <input
                  id="nome-aluno"
                  name="nome"
                  type="text"
                  autoComplete="name"
                  placeholder="Seu nome completo"
                  aria-describedby="erro-nome"
                  aria-invalid={Boolean(erros.nome)}
                  value={nome}
                  onChange={(evento) => {
                    setNome(evento.target.value);
                    if (evento.target.value.trim()) limparErro("nome");
                  }}
                />
                <span id="erro-nome" className="mensagem-erro">
                  {erros.nome}
                </span>
              </div>

              <div
                className={`campo-formulario${erros.telefone ? " campo-invalido" : ""}`}
                data-campo="telefone"
              >
                <label htmlFor="telefone-aluno">Telefone (WhatsApp)</label>
                <input
                  id="telefone-aluno"
                  name="telefone"
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  placeholder="(21) 9 0000-0000"
                  aria-describedby="erro-telefone"
                  aria-invalid={Boolean(erros.telefone)}
                  value={telefone}
                  onChange={(evento) => {
                    setTelefone(evento.target.value);
                    if (evento.target.value.trim()) limparErro("telefone");
                  }}
                />
                <span id="erro-telefone" className="mensagem-erro">
                  {erros.telefone}
                </span>
              </div>

              <fieldset
                className={`campo-formulario campo-opcoes${erros.estudio ? " campo-invalido" : ""}`}
                data-campo="estudio"
                aria-describedby="erro-estudio"
              >
                <legend>Estúdio</legend>
                <div className="opcoes-estudio">
                  {estudios.map((opcao) => (
                    <button
                      key={opcao}
                      className={`opcao-estudio${estudio === opcao ? " ativo" : ""}`}
                      type="button"
                      aria-pressed={estudio === opcao}
                      disabled={obterVagas(dataSelecionada, opcao) === 0}
                      onClick={() => selecionarEstudio(opcao)}
                    >
                      {opcao}
                    </button>
                  ))}
                </div>
                <span id="erro-estudio" className="mensagem-erro">
                  {erros.estudio}
                </span>
              </fieldset>

              <fieldset
                className={`campo-formulario campo-opcoes${erros.horario ? " campo-invalido" : ""}`}
                data-campo="horario"
                aria-describedby="erro-horario"
              >
                <legend>Horário</legend>
                <div className="opcoes-horario">
                  {!estudio && (
                    <span className="horario-ajuda">
                      Escolha um estúdio para ver os horários disponíveis.
                    </span>
                  )}
                  {estudio &&
                    horarios.map((opcao, indice) => {
                      const quantidadeLivre = obterVagas(
                        dataSelecionada,
                        estudio,
                      );
                      const indicesLivres =
                        quantidadeLivre === 6
                          ? [0, 1, 2, 5, 6, 7]
                          : quantidadeLivre === 2
                            ? [2, 6]
                            : [];
                      const disponivel = indicesLivres.includes(indice);
                      const selecionado = horario === opcao;

                      return (
                        <button
                          key={opcao}
                          className={`opcao-horario${selecionado ? " ativo" : ""}`}
                          type="button"
                          disabled={!disponivel}
                          aria-pressed={selecionado}
                          onClick={() => {
                            setHorario(opcao);
                            limparErro("horario");
                          }}
                        >
                          <strong>{opcao}</strong>
                          <span>
                            {selecionado
                              ? "selecionado"
                              : disponivel
                                ? "livre"
                                : "lotado"}
                          </span>
                        </button>
                      );
                    })}
                </div>
                <span id="erro-horario" className="mensagem-erro">
                  {erros.horario}
                </span>
              </fieldset>

              <p className="aviso-whatsapp">
                Você recebe a confirmação no WhatsApp, e nossa equipe entra em
                contato se precisar de algo.
              </p>
              <div className="acoes-modal">
                <button
                  className="botao botao-cancelar"
                  type="button"
                  onClick={fecharModal}
                >
                  Cancelar
                </button>
                <button className="botao botao-escuro" type="submit">
                  Confirmar agendamento
                </button>
              </div>
            </form>
          </div>
        </section>
      )}
    </div>
  );
}
