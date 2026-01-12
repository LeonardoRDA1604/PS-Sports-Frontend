import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Navbar/Navbar";

export default function Administracao() {
  const navigate = useNavigate();
  const usuarioAtual = JSON.parse(localStorage.getItem("usuario") || "{}");
  const isAdmin = usuarioAtual.tipoUsuario === "administrador";

  useEffect(() => {
    if (!isAdmin) {
      alert("Acesso negado! Apenas administradores podem acessar esta página.");
      navigate("/dashboard");
    }
  }, [isAdmin, navigate]);

  if (!isAdmin) {
    return null;
  }

  return (
    <Layout title="Administração" subtitle="Configurações e gestão do sistema.">
      <div className="p-4">Página de Administração</div>
    </Layout>
  );
}
