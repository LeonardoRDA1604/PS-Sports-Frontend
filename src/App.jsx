import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./pages/Dashboard";
import Cadastro from "./components/Cadastro";
import Cadastros from "./pages/Cadastros";
import VisualizarImagens from "./pages/VisualizarImagens";

import "./index.css";




function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/Cadastro" element={<Cadastro />} />
      <Route path="/Cadastros" element={<Cadastros />} />
      <Route path="/VisualizarImagens" element={<VisualizarImagens />} />
    </Routes>
  );
}

export default App;
