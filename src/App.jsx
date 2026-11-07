// Rotas do site — Leonardo
// Cada endereço mostra uma página. O header e o footer vêm do Layout.

import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import Pkz from "./pages/pkz/Pkz.jsx";
import OneToOne from "./pages/OneToOne.jsx";
import Agendamento from "./pages/Agendamento.jsx";
import Confirmado from "./pages/Confirmado.jsx";
import NaoEncontrada from "./pages/NaoEncontrada.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/pkz" element={<Pkz />} />
        <Route path="/onetoone" element={<OneToOne />} />
        <Route path="/agendamento" element={<Agendamento />} />
        <Route path="/confirmado" element={<Confirmado />} />
        <Route path="*" element={<NaoEncontrada />} />
      </Route>
    </Routes>
  );
}
