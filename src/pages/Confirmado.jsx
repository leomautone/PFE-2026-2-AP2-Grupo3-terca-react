// Confirmado — Arthur
// Migração da página vanilla; recebe os parâmetros do agendamento do David.

import { Link, useSearchParams } from "react-router-dom";
import useTitulo from "../components/useTitulo.js";
import "./Confirmado.css";

const diasSemana = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
const unidades = new Map([
  ["PKZ", "PKZ · Barra da Tijuca"],
  ["One to One", "One to One · Barra da Tijuca"],
]);
const diaExemplo = { iso: "2026-10-14", texto: "Quarta, 14/10/2026" };

// Meio-dia local preserva o dia informado, sem conversão para UTC.
function formatarDia(dia) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dia)) return diaExemplo;
  const [ano, mes, numeroDia] = dia.split("-");
  const data = new Date(`${dia}T12:00:00`);
  if (data.getFullYear() !== Number(ano)
    || data.getMonth() + 1 !== Number(mes)
    || data.getDate() !== Number(numeroDia)) return diaExemplo;
  return { iso: dia, texto: `${diasSemana[data.getDay()]}, ${numeroDia}/${mes}/${ano}` };
}

export default function Confirmado() {
  useTitulo("Agendamento confirmado — PKZ / One to One");
  const [params] = useSearchParams();
  // Os exemplos e as validações são os mesmos da página vanilla.
  const nome = params.get("nome")?.trim() || "Lucas Andrade";
  const telefone = params.get("telefone")?.trim() || "(21) 98888-7777";
  const estudio = unidades.get(params.get("estudio")?.trim()) || "PKZ · Barra da Tijuca";
  const horarioInformado = params.get("horario")?.trim() || "";
  const horario = /^([01]\d|2[0-3]):[0-5]\d$/.test(horarioInformado) ? horarioInformado : "18:00";
  const dia = formatarDia(params.get("dia")?.trim() || "");

  return (
    <div className="pagina-confirmado">
      <section id="confirmacao" className="secao secao-clara" aria-labelledby="confirmacao-titulo">
        <div className="container">
          <div className="card confirmacao-card">
            <span className="confirmacao-icone" aria-hidden="true">
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none" focusable="false">
                <path d="m8 18 7 7L28 11" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <h1 id="confirmacao-titulo">Agendamento confirmado!</h1>
            <p className="confirmacao-texto">Enviamos a confirmação para <strong id="resumo-telefone">{telefone}</strong>.</p>
            <dl className="confirmacao-resumo">
              <div>
                <dt>Dia</dt>
                <dd><time id="resumo-dia" dateTime={dia.iso}>{dia.texto}</time></dd>
              </div>
              <div>
                <dt>Horário</dt>
                <dd id="resumo-horario">{horario}</dd>
              </div>
              <div>
                <dt>Estúdio</dt>
                <dd id="resumo-estudio">{estudio}</dd>
              </div>
              <div>
                <dt>Aluno</dt>
                <dd id="resumo-nome">{nome}</dd>
              </div>
            </dl>
            <p className="confirmacao-aviso">Você recebe a confirmação no WhatsApp, e nossa equipe entra em contato se precisar de algo.</p>
            <div className="confirmacao-botoes">
              <Link to="/" className="botao botao-escuro">Voltar ao início</Link>
              <a href="https://wa.me/5521900000000" className="botao botao-whatsapp" target="_blank" rel="noopener noreferrer">Falar no WhatsApp</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
