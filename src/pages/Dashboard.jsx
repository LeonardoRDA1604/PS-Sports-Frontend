import { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  LineChart,
  Line,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { Card } from "../components/Card";
import { AcaoRapida } from "../components/AcaoRapida/index";
import Layout from "../components/Navbar/Navbar";
import ModalCadastroAtleta from "../modals/forms/ModalCadastroAtleta";
import ModalCadastroResponsavel from "../modals/forms/ModalCadastroResponsavel";
import ModalCadastroTreinador from "../modals/forms/ModalCadastroTreinador";
import ModalCadastroTurma from "../modals/forms/ModalCadastroTurma";
import ModalCadastroModalidade from "../modals/forms/ModalCadastroModalidade";
import ModalCadastroCategoria from "../modals/forms/ModalCadastroCategoria";
import ModalCadastroInteressado from "../modals/forms/ModalCadastroInteressado";
import { create, list } from "../data/api";

const API_BASE = "http://localhost:3001";

// Hook para detectar tamanho da tela
function useResponsive() {
  const [screenSize, setScreenSize] = useState("lg");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setScreenSize("sm");
      } else if (window.innerWidth < 1024) {
        setScreenSize("md");
      } else {
        setScreenSize("lg");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return screenSize;
}

export default function Dashboard() {
  const screenSize = useResponsive();
  const [atletas, setAtletas] = useState([]);
  const [responsaveis, setResponsaveis] = useState([]);
  const [treinadores, setTreinadores] = useState([]);
  const [turmas, setTurmas] = useState([]);
  const [modalidades, setModalidades] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [interessados, setInteressados] = useState([]);

  // Estados de abertura dos modais
  const [abrirCadastroAtleta, setAbrirCadastroAtleta] = useState(false);
  const [abrirCadastroResponsavel, setAbrirCadastroResponsavel] =
    useState(false);
  const [abrirCadastroTreinador, setAbrirCadastroTreinador] = useState(false);
  const [abrirCadastroTurma, setAbrirCadastroTurma] = useState(false);
  const [abrirCadastroModalidade, setAbrirCadastroModalidade] = useState(false);
  const [abrirCadastroCategoria, setAbrirCadastroCategoria] = useState(false);
  const [abrirCadastroInteressado, setAbrirCadastroInteressado] =
    useState(false);

  // Verificar se o usuário é administrador
  const usuarioAtual = JSON.parse(localStorage.getItem("usuario") || "{}");
  const isAdmin = usuarioAtual.tipoUsuario === "administrador";

  // 🔵 Buscar dados de todas as coleções
  const carregarDados = async () => {
    try {
      const [
        atlData,
        respData,
        treiData,
        turmaData,
        modData,
        catData,
        intData,
      ] = await Promise.all([
        list("atletas"),
        list("responsaveis"),
        list("treinadores"),
        list("turmas"),
        list("modalidades"),
        list("categorias"),
        list("interessados"),
      ]);

      setAtletas(atlData);
      setResponsaveis(respData);
      setTreinadores(treiData);
      setTurmas(turmaData);
      setModalidades(modData);
      setCategorias(catData);
      setInteressados(intData);
    } catch (err) {
      console.error("Erro ao carregar dados:", err);
    }
  };

  useEffect(() => {
    carregarDados();
  }, []);

  // Funções de cadastro
  const handleSalvarAtleta = async (data) => {
    try {
      await create("atletas", data);
      carregarDados();
    } catch (err) {
      console.error("Erro ao cadastrar atleta:", err);
    }
  };

  const handleSalvarResponsavel = async (data) => {
    try {
      await create("responsaveis", data);
      carregarDados();
    } catch (err) {
      console.error("Erro ao cadastrar responsável:", err);
    }
  };

  const handleSalvarTreinador = async (data) => {
    try {
      await create("treinadores", data);
      carregarDados();
    } catch (err) {
      console.error("Erro ao cadastrar treinador:", err);
    }
  };

  const handleSalvarTurma = async (data) => {
    try {
      await create("turmas", data);
      carregarDados();
    } catch (err) {
      console.error("Erro ao cadastrar turma:", err);
    }
  };

  const handleSalvarModalidade = async (data) => {
    try {
      await create("modalidades", data);
      carregarDados();
    } catch (err) {
      console.error("Erro ao cadastrar modalidade:", err);
    }
  };

  const handleSalvarCategoria = async (data) => {
    try {
      await create("categorias", data);
      carregarDados();
    } catch (err) {
      console.error("Erro ao cadastrar categoria:", err);
    }
  };

  const handleSalvarInteressado = async (data) => {
    try {
      await create("interessados", data);
      carregarDados();
    } catch (err) {
      console.error("Erro ao cadastrar interessado:", err);
    }
  };

  // Funções de abertura/fechamento dos modais
  const abrirFechasAtleta = (salvo) => {
    if (salvo) handleSalvarAtleta(salvo);
    setAbrirCadastroAtleta(false);
  };

  const abrirFechasResponsavel = (salvo) => {
    if (salvo) handleSalvarResponsavel(salvo);
    setAbrirCadastroResponsavel(false);
  };

  const abrirFechasTreinador = (salvo) => {
    if (salvo) handleSalvarTreinador(salvo);
    setAbrirCadastroTreinador(false);
  };

  const abrirFechasTurma = (salvo) => {
    if (salvo) handleSalvarTurma(salvo);
    setAbrirCadastroTurma(false);
  };

  const abrirFechasModalidade = (salvo) => {
    if (salvo) handleSalvarModalidade(salvo);
    setAbrirCadastroModalidade(false);
  };

  const abrirFechasCategoria = (salvo) => {
    if (salvo) handleSalvarCategoria(salvo);
    setAbrirCadastroCategoria(false);
  };

  const abrirFechasInteressado = (salvo) => {
    if (salvo) handleSalvarInteressado(salvo);
    setAbrirCadastroInteressado(false);
  };

  return (
    <Layout title="Dashboard" subtitle="Visão geral do PS Sport’s">
      {/* MAIN */}
      <main className="flex-1 transition-all duration-300 px-4 sm:px-6 md:px-8">
        <section className="cards">
          {/* AÇÕES RÁPIDAS */}
          <div className="acoes-rapidas mt-6 sm:mt-8 md:mt-10">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 md:mb-6">
              Ações Rápidas
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-2 sm:gap-3 md:gap-4 mb-6">
              <AcaoRapida
                subTitle="Cadastrar Atleta"
                onClick={() => setAbrirCadastroAtleta(true)}
                disabled={!isAdmin}
              />
              <AcaoRapida
                subTitle="Cadastrar Responsável"
                onClick={() => setAbrirCadastroResponsavel(true)}
                disabled={!isAdmin}
              />
              <AcaoRapida
                subTitle="Cadastrar Treinador"
                onClick={() => setAbrirCadastroTreinador(true)}
                disabled={!isAdmin}
              />
              <AcaoRapida
                subTitle="Cadastrar Turma"
                onClick={() => setAbrirCadastroTurma(true)}
                disabled={!isAdmin}
              />
              <AcaoRapida
                subTitle="Cadastrar Modalidade"
                onClick={() => setAbrirCadastroModalidade(true)}
                disabled={!isAdmin}
              />
              <AcaoRapida
                subTitle="Cadastrar Categoria"
                onClick={() => setAbrirCadastroCategoria(true)}
                disabled={!isAdmin}
              />
              <AcaoRapida
                subTitle="Cadastrar Interessado"
                onClick={() => setAbrirCadastroInteressado(true)}
                disabled={!isAdmin}
              />
            </div>
          </div>

          {/* CARDS DE ESTATÍSTICAS */}
          <div className="overflow-x-auto -mx-4 sm:-mx-6 md:-mx-8 px-4 sm:px-6 md:px-8">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-2 sm:gap-3 md:gap-4 mb-6">
              <Card title="Atletas" value={atletas.length} />
              <Card title="Responsáveis" value={responsaveis.length} />
              <Card title="Treinadores" value={treinadores.length} />
              <Card title="Turmas" value={turmas.length} />
              <Card title="Modalidades" value={modalidades.length} />
              <Card title="Categorias" value={categorias.length} />
              <Card title="Interessados" value={interessados.length} />
            </div>
          </div>

          {/* GRÁFICO DE DADOS - RESPONSIVO */}
          <div className="mt-8 sm:mt-10 md:mt-12 bg-white rounded-lg shadow-lg p-4 sm:p-6 border border-gray-100 -mx-4 sm:-mx-6 md:-mx-8 px-4 sm:px-6 md:px-8">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">
              Resumo de Cadastros
            </h3>

            {/* Dados comuns para todos os gráficos */}
            {screenSize === "sm" ? (
              // TELA PEQUENA (Mobile) - Gráfico de Colunas Vertical
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={[
                    { name: "Atletas", value: atletas.length },
                    { name: "Responsáveis", value: responsaveis.length },
                    { name: "Treinadores", value: treinadores.length },
                    { name: "Turmas", value: turmas.length },
                    { name: "Modalidades", value: modalidades.length },
                    { name: "Categorias", value: categorias.length },
                    { name: "Interessados", value: interessados.length },
                  ]}
                  margin={{ top: 5, right: 10, left: 10, bottom: 60 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="name" 
                    angle={-45}
                    textAnchor="end"
                    height={80}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis />
                  <Tooltip formatter={(value) => `${value} itens`} />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                    <Cell fill="#003366" />
                    <Cell fill="#0066cc" />
                    <Cell fill="#0099ff" />
                    <Cell fill="#00ccff" />
                    <Cell fill="#66ddff" />
                    <Cell fill="#99eeff" />
                    <Cell fill="#ff6b6b" />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : screenSize === "md" ? (
              // TELA MÉDIA (Tablet) - Gráfico de Linhas
              <ResponsiveContainer width="100%" height={350}>
                <LineChart
                  data={[
                    {
                      name: "Dados",
                      atletas: atletas.length,
                      responsaveis: responsaveis.length,
                      treinadores: treinadores.length,
                      turmas: turmas.length,
                      modalidades: modalidades.length,
                      categorias: categorias.length,
                      interessados: interessados.length,
                    },
                  ]}
                  margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => `${value} itens`} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="atletas"
                    stroke="#003366"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="responsaveis"
                    stroke="#0066cc"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="treinadores"
                    stroke="#0099ff"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="turmas"
                    stroke="#66ccff"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="modalidades"
                    stroke="#99ddff"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="categorias"
                    stroke="#ccecff"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="interessados"
                    stroke="#ff6b6b"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              // TELA GRANDE (Desktop) - Gráfico de Donut
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={[
                      { name: "Atletas", value: atletas.length },
                      { name: "Responsáveis", value: responsaveis.length },
                      { name: "Treinadores", value: treinadores.length },
                      { name: "Turmas", value: turmas.length },
                      { name: "Modalidades", value: modalidades.length },
                      { name: "Categorias", value: categorias.length },
                      { name: "Interessados", value: interessados.length },
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    <Cell fill="#003366" />
                    <Cell fill="#0066cc" />
                    <Cell fill="#0099ff" />
                    <Cell fill="#66ccff" />
                    <Cell fill="#99ddff" />
                    <Cell fill="#ccecff" />
                    <Cell fill="#ff6b6b" />
                  </Pie>
                  <Tooltip formatter={(value) => `${value} itens`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </section>
      </main>
      {/* Modais acionados pelas Ações Rápidas */}
      <ModalCadastroAtleta
        aberto={abrirCadastroAtleta}
        onClose={() => setAbrirCadastroAtleta(false)}
        onSave={handleSalvarAtleta}
      />
      <ModalCadastroResponsavel
        aberto={abrirCadastroResponsavel}
        onClose={() => setAbrirCadastroResponsavel(false)}
        onSave={handleSalvarResponsavel}
      />
      <ModalCadastroTreinador
        aberto={abrirCadastroTreinador}
        onClose={() => setAbrirCadastroTreinador(false)}
        onSave={handleSalvarTreinador}
      />
      <ModalCadastroTurma
        aberto={abrirCadastroTurma}
        onClose={() => setAbrirCadastroTurma(false)}
        onSave={handleSalvarTurma}
      />
      <ModalCadastroModalidade
        aberto={abrirCadastroModalidade}
        onClose={() => setAbrirCadastroModalidade(false)}
        onSave={handleSalvarModalidade}
      />
      <ModalCadastroCategoria
        aberto={abrirCadastroCategoria}
        onClose={() => setAbrirCadastroCategoria(false)}
        onSave={handleSalvarCategoria}
      />
      <ModalCadastroInteressado
        aberto={abrirCadastroInteressado}
        onClose={() => setAbrirCadastroInteressado(false)}
        onSave={handleSalvarInteressado}
      />
    </Layout>
  );
}

/* 🔵 COMPONENTES AUXILIARES */
function Input({ label, ...props }) {
  return (
    <input
      type="text"
      placeholder={label}
      className="border p-2 rounded w-full text-sm sm:text-base"
      {...props}
      required
    />
  );
}

function Th({ children }) {
  return (
    <th className="px-3 py-2 font-semibold text-xs sm:text-sm md:text-base">
      {children}
    </th>
  );
}

function Td({ children }) {
  return (
    <td className="px-3 py-2 text-xs sm:text-sm md:text-base">{children}</td>
  );
}

// (sem exports adicionais)
