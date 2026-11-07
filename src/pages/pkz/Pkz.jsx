// Página PKZ — Leonardo
// Junta as duas partes da página, na ordem do protótipo. Cada integrante edita só a própria parte.

import useTitulo from "../../components/useTitulo.js";
import PkzJoao from "./PkzJoao.jsx";
import PkzKaue from "./PkzKaue.jsx";

export default function Pkz() {
  useTitulo("PKZ — Aqui nascem atletas");

  return (
    <>
      <PkzJoao />
      <PkzKaue />
    </>
  );
}
