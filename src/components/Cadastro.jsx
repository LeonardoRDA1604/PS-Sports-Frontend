import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Cadastro() {
  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    cargo: "",
    email: "",
    senha: "",
    confirmarSenha: "",
  });

  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem("");

    if (formData.senha !== formData.confirmarSenha) {
      setMensagem("As senhas não coincidem.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/cadastro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("usuario", JSON.stringify(data.usuario || data));
        navigate("/app"); // Redireciona após cadastro
      } else {
        setMensagem(data.mensagem || "Erro ao processar a solicitação");
      }
    } catch (error) {
      console.error(error);
      setMensagem("Erro de conexão com o servidor.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-xl rounded-2xl overflow-hidden w-full max-w-4xl flex flex-col md:flex-row">
        {/* Formulário de cadastro */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Adicionar Novo Usuário
          </h2>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              placeholder="Nome completo"
              className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              name="cpf"
              value={formData.cpf}
              onChange={handleChange}
              placeholder="CPF"
              className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <select
              name="cargo"
              value={formData.cargo}
              onChange={handleChange}
              className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Selecione o cargo</option>
              <option value="medico">Médico</option>
              <option value="administrador">Administrador</option>
            </select>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="E-mail"
              className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="password"
              name="senha"
              value={formData.senha}
              onChange={handleChange}
              placeholder="Senha"
              className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="password"
              name="confirmarSenha"
              value={formData.confirmarSenha}
              onChange={handleChange}
              placeholder="Confirmar Senha"
              className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            {mensagem && (
              <p className="text-center text-red-600 font-semibold">{mensagem}</p>
            )}

            <button
              type="submit"
              className="bg-green-600 text-white rounded-lg p-2 mt-2 hover:bg-blue-700 transition-all"
            >
              Cadastrar
            </button>
          </form>
        </div>

        {/* Lado visual */}
        <div className="hidden md:flex w-1/2 bg-green-600 items-center justify-center text-white flex-col p-8">
          <h2 className="text-3xl font-bold mb-4">Junte-se à nossa equipe!</h2>
          <p className="text-center text-blue-100">
            Crie sua conta e comece a usar o sistema da unidade de saúde.
          </p>
        </div>
      </div>
    </div>
  );
}

