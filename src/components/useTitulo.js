// Troca o título da aba do navegador (no vanilla era a tag <title> de cada HTML).
// Uso dentro de uma página: useTitulo("PKZ — Aqui nascem atletas");

import { useEffect } from "react";

export default function useTitulo(titulo) {
  useEffect(() => {
    document.title = titulo;
  }, [titulo]);
}
