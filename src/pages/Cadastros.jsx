import { useState, useEffect } from "react";

import { FaUser } from "react-icons/fa";
import { FaUserFriends } from "react-icons/fa";
import { FaPersonChalkboard } from "react-icons/fa6";
import { HiMiniUserGroup } from "react-icons/hi2";
import { FaTableList } from "react-icons/fa6";
import { FaRunning } from "react-icons/fa";
import { MdPersonAdd } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IoLockClosed } from "react-icons/io5";
import BotaoAdicionar from "../components/BotaoAdicionar/BotaoAdicionar";
import { list, create, remove, update } from "../data/api";
import Layout from "../components/Navbar/Navbar";
import ModalCadastroInteressado from "../modals/forms/ModalCadastroInteressado";
import ModalCadastroAtleta from "../modals/forms/ModalCadastroAtleta";
import ModalCadastroResponsavel from "../modals/forms/ModalCadastroResponsavel";
import ModalCadastroTreinador from "../modals/forms/ModalCadastroTreinador";
import ModalCadastroTurma from "../modals/forms/ModalCadastroTurma";
import ModalCadastroCategoria from "../modals/forms/ModalCadastroCategoria";
import ModalCadastroModalidade from "../modals/forms/ModalCadastroModalidade";
import ModalVisualizarAtleta from "../modals/views/ModalVisualizarAtleta";
import { temAcessoBloqueado } from "../utils/permissoes";

// Dados dos atletas
const athletesData = [
  { id: 1, name: "Mateus A.", age: 12, category: "Sub-12", classes: "B12" },
  { id: 2, name: "Gabriel A.", age: 13, category: "Sub-14", classes: "A14" },
  { id: 3, name: "Enzo G.", age: 15, category: "Sub-16", classes: "A16" },
  { id: 4, name: "Thiago P.", age: 16, category: "Sub-16", classes: "B16" },
  { id: 5, name: "Nathan J.", age: 16, category: "Sub-16", classes: "B16" },
  { id: 6, name: "Wesley S.", age: 17, category: "Sub-18", classes: "B17" },
];

// Dados dos responsáveis
const responsibleData = [
  // Exemplo de responsável por MÚLTIPLOS atletas
  {
    id: 1,
    name: "Roberto C",
    athletes: ["Mateus A", "João A"],
    kinship: "Pai",
    phoneNumber: "(00) 0.0000-0000 ",
  },
  {
    id: 2,
    name: "Ronaldo F",
    athletes: ["Gabriel A"],
    kinship: "Pai",
    phoneNumber: "(00) 0.0000-0000",
  },
  // Exemplo de responsável por MÚLTIPLOS atletas
  {
    id: 3,
    name: "Miraildes M",
    athletes: ["Enzo G", "Thiago P", "Nathan J"],
    kinship: "Mãe",
    phoneNumber: "(00) 0.0000-0000",
  },
  {
    id: 4,
    name: "Thiago S",
    athletes: ["Thiago P"],
    kinship: "Pai",
    phoneNumber: "(00) 0.0000-0000",
  },
  {
    id: 5,
    name: "Marta",
    athletes: ["Nathan J"],
    kinship: "Mãe",
    phoneNumber: "(00) 8.8888-8888",
  },
  {
    id: 6,
    name: "Lionel M",
    athletes: ["Wesley S"],
    kinship: "Pai",
    phoneNumber: "(00) 9.9999-9999",
  },
];

// Dados dos treinadores
const coachData = [
  {
    id: 1,
    name: "Pep Guardiola",
    classes: "Sub-12",
    workTimes: "06:00 - 12:00",
    PhoneNumber: "(00) 0.0000-0000",
  },
  {
    id: 2,
    name: "Carlo Ancelotti",
    classes: "Sub-14",
    workTimes: "06:00 - 12:00",
    PhoneNumber: "(00) 0.0000-0000",
  },
  {
    id: 3,
    name: "Xabi Alonso",
    classes: "Sub-16",
    workTimes: "06:00 - 12:00",
    PhoneNumber: "(00) 0.0000-000",
  },
  {
    id: 4,
    name: "Mikel Arteta",
    classes: "Sub-16",
    workTimes: "12:35 - 18:35",
    PhoneNumber: "(99) 9.9999-9999",
  },
  {
    id: 5,
    name: "Luis Enrique",
    classes: "Sub-16",
    workTimes: "12:35 - 18:35",
    PhoneNumber: "(88) 8.8888-8888",
  },
];

// Dados das Turmas
const classesData = [
  {
    id: 1,
    classes: "A12",
    workTimes: "06:00 - 12:00",
    coach: "Pep Guardiola",
    category: "Sub-12",
    modality: "Futebol",
  },
  {
    id: 2,
    classes: "B14",
    workTimes: "06:00 - 12:00",
    coach: "Carlo Ancelotti",
    category: "Sub-14",
    modality: "Futsal",
  },
  {
    id: 3,
    classes: "A16",
    workTimes: "06:00 - 12:00",
    coach: "Xabi Alonso",
    category: "Sub-16",
    modality: "Beach Soccer",
  },
  {
    id: 4,
    classes: "B16",
    workTimes: "12:35 - 18:35",
    coach: "Mikel Arteta",
    category: "Sub-16",
    modality: "Fut7",
  },
  {
    id: 5,
    classes: "C16",
    workTimes: "12:35 - 18:35",
    coach: "Luis Enrique",
    category: "Sub-16",
    modality: "Futebol",
  },
];

// Dados das Categorias
const categoriesData = [
  { id: 1, name: "Sub-12", classes: "A12", modality: "Futebol" },
  { id: 2, name: "Sub-14", classes: "B14", modality: "Futsal" },
  { id: 3, name: "Sub-16", classes: "A16", modality: "Beach Soccer" },
  { id: 4, name: "Sub-16", classes: "B16", modality: "Fut7" },
  { id: 5, name: "Sub-16", classes: "C16", modality: "Futebol" },
];

// Dados das Modalidades
const modalitiesData = [
  { id: 1, name: "Futebol", category: "Sub-12", classes: "A12" },
  { id: 2, name: "Futsal", category: "Sub-14", classes: "B14" },
  { id: 3, name: "Beach Soccer", category: "Sub-16", classes: "A16" },
  { id: 4, name: "Fut7", category: "Sub-16", classes: "B16" },
];

// Dados dos Interessados
const interestedData = [
  {
    id: 1,
    name: "João Silva",
    modality: "Futebol",
    phoneNumber: "(11) 99999-8888",
  },
  {
    id: 2,
    name: "Maria Santos",
    modality: "Futsal",
    phoneNumber: "(21) 98888-7777",
  },
];

// Mapeamento das abas
const abas = [
  {
    id: "atletas",
    label: "Atletas",
    labelSingular: "Atleta",
    icon: <FaUser />,
  },
  {
    id: "responsaveis",
    label: "Responsáveis",
    labelSingular: "Responsável",
    icon: <FaUserFriends />,
  },
  {
    id: "treinadores",
    label: "Treinadores",
    labelSingular: "Treinador",
    icon: <FaPersonChalkboard />,
  },
  {
    id: "turmas",
    label: "Turmas",
    labelSingular: "Turma",
    icon: <HiMiniUserGroup />,
  },
  {
    id: "categorias",
    label: "Categorias",
    labelSingular: "Categoria",
    icon: <FaTableList />,
  },
  {
    id: "modalidades",
    label: "Modalidades",
    labelSingular: "Modalidade",
    icon: <FaRunning />,
  },
  {
    id: "interessados",
    label: "Interessados",
    labelSingular: "Interessado",
    icon: <MdPersonAdd />,
  },
];

const Cadastros = () => {
  const [abaAtiva, setAbaAtiva] = useState("atletas");
  const [termoPesquisa, setTermoPesquisa] = useState("");
  const [athletes, setAthletes] = useState(athletesData);
  const [responsaveis, setResponsaveis] = useState(responsibleData);
  const [treinadores, setTreinadores] = useState(coachData);
  const [turmas, setTurmas] = useState(classesData);
  const [categorias, setCategorias] = useState(categoriesData);
  const [modalidades, setModalidades] = useState(modalitiesData);
  const [interessados, setInteressados] = useState(interestedData);
  const [confirmDelete, setConfirmDelete] = useState({
    aberto: false,
    recurso: null,
    id: null,
    nome: null,
  });

  // Estados para abrir os modais de edição
  const [abrirCadastroAtleta, setAbrirCadastroAtleta] = useState(false);
  const [abrirCadastroResponsavel, setAbrirCadastroResponsavel] =
    useState(false);
  const [abrirCadastroTreinador, setAbrirCadastroTreinador] = useState(false);
  const [abrirCadastroTurma, setAbrirCadastroTurma] = useState(false);
  const [abrirCadastroCategoria, setAbrirCadastroCategoria] = useState(false);
  const [abrirCadastroModalidade, setAbrirCadastroModalidade] = useState(false);
  const [abrirCadastroInteressado, setAbrirCadastroInteressado] =
    useState(false);

  // Estado para armazenar o item sendo editado
  const [itemEditando, setItemEditando] = useState(null);

  // Estado para visualizar atleta
  const [abrirVisualizarAtleta, setAbrirVisualizarAtleta] = useState(false);
  const [atletaSelecionado, setAtletaSelecionado] = useState(null);

  // Verificar se o usuário é administrador
  const usuarioAtual = JSON.parse(localStorage.getItem("usuario") || "{}");
  const isAdmin = usuarioAtual.tipoUsuario === "administrador";

  // Carregar dados do servidor ao montar
  useEffect(() => {
    Promise.all([
      list("atletas"),
      list("responsaveis"),
      list("treinadores"),
      list("turmas"),
      list("categorias"),
      list("modalidades"),
      list("interessados"),
    ])
      .then(([a, r, t, tu, c, m, i]) => {
        if (Array.isArray(a) && a.length) setAthletes(a);
        if (Array.isArray(r) && r.length) setResponsaveis(r);
        if (Array.isArray(t) && t.length) setTreinadores(t);
        if (Array.isArray(tu) && tu.length) setTurmas(tu);
        if (Array.isArray(c) && c.length) setCategorias(c);
        if (Array.isArray(m) && m.length) setModalidades(m);
        if (Array.isArray(i) && i.length) setInteressados(i);
      })
      .catch(() => {});
  }, []);

  // Lógica de Filtragem de Atletas
  const athletesFiltrados =
    termoPesquisa.length > 0 && abaAtiva === "atletas"
      ? athletes.filter((athlete) =>
          athlete.name.toLowerCase().includes(termoPesquisa.toLowerCase())
        )
      : athletes;

  // Lógica de Filtragem de Responsáveis
  const responsibleFiltrados =
    termoPesquisa.length > 0 && abaAtiva === "responsaveis"
      ? responsaveis.filter((responsible) =>
          responsible.name.toLowerCase().includes(termoPesquisa.toLowerCase())
        )
      : responsaveis;

  // Lógica de Filtragem de Treinadores
  const coachFiltrados =
    termoPesquisa.length > 0 && abaAtiva === "treinadores"
      ? treinadores.filter((coach) =>
          coach.name.toLowerCase().includes(termoPesquisa.toLowerCase())
        )
      : treinadores;

  // Lógica de Filtragem de Turmas
  const classesFiltrados =
    termoPesquisa.length > 0 && abaAtiva === "turmas"
      ? turmas.filter((classes) =>
          classes.classes.toLowerCase().includes(termoPesquisa.toLowerCase())
        )
      : turmas;

  // Lógica de Filtragem de Categorias
  const categoriesFiltrados =
    termoPesquisa.length > 0 && abaAtiva === "categorias"
      ? categorias.filter((categories) =>
          categories.name.toLowerCase().includes(termoPesquisa.toLowerCase())
        )
      : categorias;

  // Lógica de Filtragem de Modalidades
  const modalitiesFiltrados =
    termoPesquisa.length > 0 && abaAtiva === "modalidades"
      ? modalidades.filter((modalities) =>
          modalities.name.toLowerCase().includes(termoPesquisa.toLowerCase())
        )
      : modalidades;

  // Lógica de Filtragem de Interessados
  const interessadosFiltrados =
    termoPesquisa.length > 0 && abaAtiva === "interessados"
      ? interessados.filter((interested) =>
          interested.name.toLowerCase().includes(termoPesquisa.toLowerCase())
        )
      : interessados;

  const handleCreated = async (resource, data) => {
    try {
      const saved = await create(resource, data);
      if (resource === "atletas") setAthletes((prev) => [...prev, saved]);
      if (resource === "responsaveis")
        setResponsaveis((prev) => [...prev, saved]);
      if (resource === "treinadores")
        setTreinadores((prev) => [...prev, saved]);
      if (resource === "turmas") setTurmas((prev) => [...prev, saved]);
      if (resource === "categorias") setCategorias((prev) => [...prev, saved]);
      if (resource === "modalidades")
        setModalidades((prev) => [...prev, saved]);
      if (resource === "interessados")
        setInteressados((prev) => [...prev, saved]);
    } catch (e) {
      console.error("Erro ao salvar", resource, e);
    }
  };

  const handleDeleteClick = (recurso, id, nome) => {
    if (!isAdmin) {
      alert("Apenas administradores podem deletar itens");
      return;
    }
    setConfirmDelete({
      aberto: true,
      recurso,
      id,
      nome,
    });
  };

  const handleConfirmDelete = async () => {
    const { recurso, id } = confirmDelete;
    try {
      await remove(recurso, id);
      if (recurso === "atletas")
        setAthletes((prev) => prev.filter((item) => item.id !== id));
      if (recurso === "responsaveis")
        setResponsaveis((prev) => prev.filter((item) => item.id !== id));
      if (recurso === "treinadores")
        setTreinadores((prev) => prev.filter((item) => item.id !== id));
      if (recurso === "turmas")
        setTurmas((prev) => prev.filter((item) => item.id !== id));
      if (recurso === "categorias")
        setCategorias((prev) => prev.filter((item) => item.id !== id));
      if (recurso === "modalidades")
        setModalidades((prev) => prev.filter((item) => item.id !== id));
      if (recurso === "interessados")
        setInteressados((prev) => prev.filter((item) => item.id !== id));
      setConfirmDelete({ aberto: false, recurso: null, id: null, nome: null });
    } catch (e) {
      console.error("Erro ao deletar", recurso, e);
    }
  };

  // Funções de mapeamento para transformar dados da tabela no formato esperado pelos modais
  const mapearDados = (recurso, item) => {
    switch (recurso) {
      case "atletas":
        return {
          id: item.id,
          nome: item.name || "",
          nascimento: item.nascimento || "",
          cpf: item.cpf || "",
          rg: item.rg || "",
          escola: item.escola || "",
          modalidade: item.modalidade || "",
          categoria: item.category || "",
          turma: item.classes || "",
          cep: item.cep || "",
          bairro: item.bairro || "",
          cidade: item.cidade || "",
          uf: item.uf || "",
          logradouro: item.logradouro || "",
          complemento: item.complemento || "",
          observacoes: item.observacoes || "",
          respCpf: item.respCpf || "",
          respNome: item.respNome || "",
          respEmail: item.respEmail || "",
          respTelefone: item.respTelefone || "",
          respParentesco: item.respParentesco || "",
          respCep: item.respCep || "",
          respBairro: item.respBairro || "",
          respCidade: item.respCidade || "",
          respUf: item.respUf || "",
          respLogradouro: item.respLogradouro || "",
          respComplemento: item.respComplemento || "",
        };
      case "responsaveis":
        return {
          id: item.id,
          nome: item.name || "",
          cpf: item.cpf || "",
          email: item.email || "",
          telefone: item.phoneNumber || "",
          nomeAtleta: item.athletes?.[0] || "",
          parentesco: item.kinship || "",
          cep: item.cep || "",
          bairro: item.bairro || "",
          cidade: item.cidade || "",
          uf: item.uf || "",
          logradouro: item.logradouro || "",
          complemento: item.complemento || "",
        };
      case "treinadores":
        return {
          id: item.id,
          nome: item.name || "",
          cpf: item.cpf || "",
          email: item.email || "",
          telefone: item.PhoneNumber || item.phoneNumber || "",
          cep: item.cep || "",
          bairro: item.bairro || "",
          cidade: item.cidade || "",
          uf: item.uf || "",
          logradouro: item.logradouro || "",
          complemento: item.complemento || "",
          turmas: item.classes || [],
          horarios: item.workTimes || [],
        };
      case "turmas":
        return {
          id: item.id,
          nomeTurma: item.name || "",
          categoria: item.category || "",
          modalidade: item.modality || "",
          treinador: item.coach || "",
          horarios: item.workTimes || [],
        };
      case "categorias":
        return {
          id: item.id,
          nomeCategoria: item.name || "",
        };
      case "modalidades":
        return {
          id: item.id,
          nomeModalidade: item.name || "",
        };
      case "interessados":
        return {
          id: item.id,
          nome: item.name || "",
          email: item.email || "",
          telefone: item.phoneNumber || "",
          modalidade: item.modality || "",
          dataInsercao: item.dataInsercao || "",
        };
      default:
        return item;
    }
  };

  const handleEditClick = (recurso, item) => {
    if (!isAdmin) {
      alert("Apenas administradores podem editar itens");
      return;
    }
    const dadosMapeados = mapearDados(recurso, item);
    setItemEditando(dadosMapeados);
    if (recurso === "atletas") setAbrirCadastroAtleta(true);
    else if (recurso === "responsaveis") setAbrirCadastroResponsavel(true);
    else if (recurso === "treinadores") setAbrirCadastroTreinador(true);
    else if (recurso === "turmas") setAbrirCadastroTurma(true);
    else if (recurso === "categorias") setAbrirCadastroCategoria(true);
    else if (recurso === "modalidades") setAbrirCadastroModalidade(true);
    else if (recurso === "interessados") setAbrirCadastroInteressado(true);
  };

  // Componente para Itens de Aba
  const TabItem = ({ id, label, icon }) => {
    const isActive = abaAtiva === id;
    const activeClasses =
      "text-blue-600 border-b-2 border-blue-600 font-semibold ";
    const inactiveClasses = "text-gray-500 hover:text-gray-700 cursor-pointer";

    return (
      <button
        key={id}
        className={`flex items-center space-x-2 px-7 py-5 text-sm whitespace-nowrap transition duration-150 ${
          isActive ? activeClasses : inactiveClasses
        }`}
        onClick={() => {
          setAbaAtiva(id); // Muda a aba ativa
          setTermoPesquisa(""); // Reseta o termo de pesquisa ao mudar de aba
          window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll para o topo
        }}
      >
        <span className="text-xl">{icon}</span>
        <span>{label}</span>
      </button>
    );
  };

  return (
    <Layout
      title="Cadastros"
      subtitle="Gerencie atletas, responsáveis, treinadores turmas, categorias e modalidades."
    >
      {/* CONTEÚDO PRINCIPAL */}
      <div className="min-h-screen overflow-auto flex-1 ">
        {/* Cabeçalho */}
        <div className="mb-6">
          {/* Navegação por Abas */}
          <div className="flex border-b border-gray-200 overflow-x-auto scrollbar-hide">
            {abas.map((aba) => (
              <TabItem key={aba.id} {...aba} />
            ))}
          </div>
        </div>

        {/* Área de Ações (Pesquisa e Novo Item) */}
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
          {/* Barra de Pesquisa */}
          <div className="relative w-full sm:max-w-xs order-2 sm:order-1 ">
            <input
              type="text"
              placeholder={`Buscar ${
                abas.find((a) => a.id === abaAtiva)?.label
              }...`}
              className="
              w-full pl-10 pr-4 py-2 border border-gray-300 bg-white
              rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 text-xs sm:text-sm"
              value={termoPesquisa}
              onChange={(e) => setTermoPesquisa(e.target.value)}
            />
            {/* Ícone de Busca (Lupa) */}
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 sm:h-5 w-4 sm:w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>

          {/* Botão Adicionar Novo Item */}
          {isAdmin ? (
            <BotaoAdicionar
              aba={abaAtiva}
              label={abas.find((a) => a.id === abaAtiva)?.labelSingular}
              onCreated={handleCreated}
            />
          ) : (
            <div className="text-xs sm:text-sm text-gray-500 italic">
              Apenas administradores podem adicionar itens
            </div>
          )}
        </div>

        {/* 4. CONTEÚDO: Tabela/Dados */}
        <div className="shadow-xl rounded-lg p-3 sm:p-4 md:p-6 border border-gray-100 overflow-x-auto -mx-4 sm:mx-0">
          {/* Tabela Atletas */}
          {abaAtiva === "atletas" && (
            <div className="rounded-lg overflow-x-auto">
              <table className="w-full divide-y divide-gray-200">
                <thead className="bg-white">
                  <tr>
                    <th
                      scope="col"
                      className="px-3 sm:px-6 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Nome
                    </th>
                    <th
                      scope="col"
                      className="px-3 sm:px-6 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Idade
                    </th>
                    <th
                      scope="col"
                      className="hidden sm:table-cell px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Categoria
                    </th>
                    <th
                      scope="col"
                      className="hidden md:table-cell px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Turma
                    </th>
                    <th
                      scope="col"
                      className="px-3 sm:px-6 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {athletesFiltrados.map((athletes) => (
                    <tr key={athletes.id} className="hover:bg-blue-100">
                      <td className="px-3 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm font-medium text-primary-900 truncate">
                        <button
                          onClick={() => {
                            setAtletaSelecionado(athletes);
                            setAbrirVisualizarAtleta(true);
                          }}
                          className="text-blue-600 hover:underline cursor-pointer"
                        >
                          {athletes.name}
                        </button>
                      </td>
                      <td className="px-3 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm text-primary-900 font-medium">
                        {athletes.age}
                      </td>
                      <td className="hidden sm:table-cell px-3 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm font-medium">
                        <a href="#" className="text-blue-600 hover:underline">
                          {athletes.category}
                        </a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <a href="#" className="text-blue-600 hover:underline">
                          {athletes.classes}
                        </a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex gap-3 items-center">
                        <button
                          disabled={!isAdmin}
                          onClick={() =>
                            handleDeleteClick(
                              "atletas",
                              athletes.id,
                              athletes.name
                            )
                          }
                          className={`transition-colors cursor-pointer ${
                            !isAdmin
                              ? "opacity-50 cursor-not-allowed"
                              : "text-red-600 hover:text-red-800"
                          }`}
                          title={
                            isAdmin
                              ? "Deletar"
                              : "Apenas administradores podem deletar"
                          }
                        >
                          {!isAdmin ? (
                            <IoLockClosed size={20} />
                          ) : (
                            <MdDelete size={20} />
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* Mensagem de "Nenhum resultado" */}
              {athletesFiltrados.length === 0 && termoPesquisa.length > 0 && (
                <div className="p-6 text-center text-gray-500 ">
                  Nenhum atleta encontrado com o termo "{termoPesquisa}".
                </div>
              )}
            </div>
          )}

          {/* Conteúdo para Abas RESPONSAVEIS */}
          {abaAtiva === "responsaveis" && (
            <div className="bg-white rounded-lg overflow-x-auto">
              <table className="w-full divide-y divide-gray-200">
                <thead className="bg-white">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                    >
                      Nome
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                    >
                      Atletas
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                    >
                      Parentesco
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                    >
                      Telefone
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                    >
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {responsibleFiltrados.map((responsible) => (
                    <tr key={responsible.id} className="hover:bg-blue-100">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary-900">
                        <a href="#" className="text-blue-600 hover:underline">
                          {responsible.name}
                        </a>
                      </td>

                      {/* exibe múltiplos atletas */}
                      <td className="px-6 py-4 whitespace-wrap text-sm text-primary-900 font-medium max-w-xs">
                        {responsible.athletes.join(", ")}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {responsible.kinship}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <a href="#" className="text-blue-600 hover:underline">
                          {responsible.phoneNumber}
                        </a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex gap-3 items-center">
                        <button
                          disabled={!isAdmin}
                          onClick={() =>
                            handleDeleteClick(
                              "responsaveis",
                              responsible.id,
                              responsible.name
                            )
                          }
                          className={`transition-colors cursor-pointer ${
                            !isAdmin
                              ? "opacity-50 cursor-not-allowed"
                              : "text-red-600 hover:text-red-800"
                          }`}
                          title={
                            isAdmin
                              ? "Deletar"
                              : "Apenas administradores podem deletar"
                          }
                        >
                          {!isAdmin ? (
                            <IoLockClosed size={20} />
                          ) : (
                            <MdDelete size={20} />
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* Mensagem de "Nenhum resultado" */}
              {responsibleFiltrados.length === 0 &&
                termoPesquisa.length > 0 && (
                  <div className="p-6 text-center text-gray-500">
                    Nenhum responsável encontrado com o termo "{termoPesquisa}".
                  </div>
                )}
            </div>
          )}

          {/* Conteúdo para Aba Treinador */}
          {abaAtiva === "treinadores" && (
            <div className="bg-white rounded-lg overflow-x-auto">
              <table className="w-full divide-y divide-gray-200">
                <thead className="bg-white">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                    >
                      Nome
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                    >
                      Turmas
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                    >
                      Horários
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                    >
                      Telefone
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                    >
                      Ações
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                  {coachFiltrados.map((coach) => (
                    <tr key={coach.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary-900">
                        <a href="#" className="text-blue-600 hover:underline">
                          {coach.name}
                        </a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-primary-900 font-medium">
                        {coach.classes}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {coach.workTimes}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <a href="#" className="text-blue-600 hover:underline">
                          {coach.PhoneNumber}
                        </a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex gap-3 items-center">
                        <button
                          disabled={!isAdmin}
                          onClick={() =>
                            handleDeleteClick(
                              "treinadores",
                              coach.id,
                              coach.name
                            )
                          }
                          className={`transition-colors cursor-pointer ${
                            !isAdmin
                              ? "opacity-50 cursor-not-allowed"
                              : "text-red-600 hover:text-red-800"
                          }`}
                          title={
                            isAdmin
                              ? "Deletar"
                              : "Apenas administradores podem deletar"
                          }
                        >
                          {!isAdmin ? (
                            <IoLockClosed size={20} />
                          ) : (
                            <MdDelete size={20} />
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* Mensagem de "Nenhum resultado" */}
              {classesFiltrados.length === 0 && termoPesquisa.length > 0 && (
                <div className="p-6 text-center text-gray-500">
                  Nenhuma turma encontrada com o termo "{termoPesquisa}".
                </div>
              )}
            </div>
          )}
          {/* Conteúdo para Abas TURMAS */}
          {abaAtiva === "turmas" && (
            <div className="bg-white rounded-lg overflow-x-auto">
              <table className="w-full divide-y divide-gray-200">
                <thead className="bg-white">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                    >
                      Turma
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                    >
                      Horário
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                    >
                      Treinador
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                    >
                      Categoria
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                    >
                      Modalidade
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                    >
                      Ações
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                  {classesFiltrados.map((classes) => (
                    <tr key={classes.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary-900">
                        <a href="#" className="text-blue-600 hover:underline">
                          {classes.classes}
                        </a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-primary-900 font-medium">
                        {classes.workTimes}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <a href="#" className="text-blue-600 hover:underline">
                          {classes.coach}
                        </a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <a href="#" className="text-blue-600 hover:underline">
                          {classes.category}
                        </a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <a href="#" className="text-blue-600 hover:underline">
                          {classes.modality}
                        </a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex gap-3 items-center">
                        <button
                          disabled={!isAdmin}
                          onClick={() =>
                            handleDeleteClick(
                              "turmas",
                              classes.id,
                              classes.classes
                            )
                          }
                          className={`transition-colors cursor-pointer ${
                            !isAdmin
                              ? "opacity-50 cursor-not-allowed"
                              : "text-red-600 hover:text-red-800"
                          }`}
                          title={
                            isAdmin
                              ? "Deletar"
                              : "Apenas administradores podem deletar"
                          }
                        >
                          {!isAdmin ? (
                            <IoLockClosed size={20} />
                          ) : (
                            <MdDelete size={20} />
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* Mensagem de "Nenhum resultado" */}
              {coachFiltrados.length === 0 && termoPesquisa.length > 0 && (
                <div className="p-6 text-center text-gray-500">
                  Nenhum treinador encontrado com o termo "{termoPesquisa}".
                </div>
              )}
            </div>
          )}

          {/* Conteúdo para Abas CATEGORIAS */}
          {abaAtiva === "categorias" && (
            <div className="bg-white rounded-lg overflow-x-auto">
              <table className="w-full divide-y divide-gray-200">
                <thead className="bg-white">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                    >
                      Categoria
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                    >
                      Turmas
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                    >
                      Modalidade
                    </th>{" "}
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                    >
                      Ações
                    </th>{" "}
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                  {categoriesFiltrados.map((category) => (
                    <tr key={category.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary-900">
                        <a href="#" className="text-blue-600 hover:underline">
                          {category.name}
                        </a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <a href="#" className="text-blue-600 hover:underline">
                          {category.classes}
                        </a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <a href="#" className="text-blue-600 hover:underline">
                          {category.modality}
                        </a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex gap-3 items-center">
                        <button
                          disabled={!isAdmin}
                          onClick={() =>
                            handleDeleteClick(
                              "categorias",
                              category.id,
                              category.name
                            )
                          }
                          className={`transition-colors cursor-pointer ${
                            !isAdmin
                              ? "opacity-50 cursor-not-allowed"
                              : "text-red-600 hover:text-red-800"
                          }`}
                          title={
                            isAdmin
                              ? "Deletar"
                              : "Apenas administradores podem deletar"
                          }
                        >
                          {!isAdmin ? (
                            <IoLockClosed size={20} />
                          ) : (
                            <MdDelete size={20} />
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* Mensagem de "Nenhum resultado" */}
              {categoriesFiltrados.length === 0 && termoPesquisa.length > 0 && (
                <div className="p-6 text-center text-gray-500">
                  Nenhuma categoria encontrada com o termo "{termoPesquisa}".
                </div>
              )}
            </div>
          )}

          {/* Conteúdo para Abas MODALIDADES */}
          {abaAtiva === "modalidades" && (
            <div className="bg-white rounded-lg overflow-x-auto">
              <table className="w-full divide-y divide-gray-200">
                <thead className="bg-white">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                    >
                      Modalidade
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                    >
                      Categoria
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                    >
                      Turmas
                    </th>{" "}
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                    >
                      Ações
                    </th>{" "}
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                  {modalitiesFiltrados.map((modality) => (
                    <tr key={modality.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary-900">
                        <a href="#" className="text-blue-600 hover:underline">
                          {modality.name}
                        </a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <a href="#" className="text-blue-600 hover:underline">
                          {modality.category}
                        </a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <a href="#" className="text-blue-600 hover:underline">
                          {modality.classes}
                        </a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex gap-3 items-center">
                        <button
                          disabled={!isAdmin}
                          onClick={() =>
                            handleDeleteClick(
                              "modalidades",
                              modality.id,
                              modality.name
                            )
                          }
                          className={`transition-colors cursor-pointer ${
                            !isAdmin
                              ? "opacity-50 cursor-not-allowed"
                              : "text-red-600 hover:text-red-800"
                          }`}
                          title={
                            isAdmin
                              ? "Deletar"
                              : "Apenas administradores podem deletar"
                          }
                        >
                          {!isAdmin ? (
                            <IoLockClosed size={20} />
                          ) : (
                            <MdDelete size={20} />
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* Mensagem de "Nenhum resultado" */}
              {modalitiesFiltrados.length === 0 && termoPesquisa.length > 0 && (
                <div className="p-6 text-center text-gray-500">
                  Nenhuma modalidade encontrada com o termo "{termoPesquisa}".
                </div>
              )}
            </div>
          )}

          {/* Conteúdo para Abas INTERESSADOS */}
          {abaAtiva === "interessados" && (
            <div className="bg-white rounded-lg overflow-x-auto">
              <table className="w-full divide-y divide-gray-200">
                <thead className="bg-white">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                    >
                      Nome
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                    >
                      Modalidade
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                    >
                      Telefone
                    </th>{" "}
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                    >
                      Ações
                    </th>{" "}
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                  {interessadosFiltrados.map((interested) => (
                    <tr key={interested.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary-900">
                        <a href="#" className="text-blue-600 hover:underline">
                          {interested.name}
                        </a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <a href="#" className="text-blue-600 hover:underline">
                          {interested.modality}
                        </a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <a href="#" className="text-blue-600 hover:underline">
                          {interested.phoneNumber}
                        </a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex gap-3 items-center">
                        <button
                          disabled={!isAdmin}
                          onClick={() =>
                            handleDeleteClick(
                              "interessados",
                              interested.id,
                              interested.name
                            )
                          }
                          className={`transition-colors cursor-pointer ${
                            !isAdmin
                              ? "opacity-50 cursor-not-allowed"
                              : "text-red-600 hover:text-red-800"
                          }`}
                          title={
                            isAdmin
                              ? "Deletar"
                              : "Apenas administradores podem deletar"
                          }
                        >
                          {!isAdmin ? (
                            <IoLockClosed size={20} />
                          ) : (
                            <MdDelete size={20} />
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* Mensagem de "Nenhum resultado" */}
              {interessadosFiltrados.length === 0 &&
                termoPesquisa.length > 0 && (
                  <div className="p-6 text-center text-gray-500">
                    Nenhum interessado encontrado com o termo "{termoPesquisa}".
                  </div>
                )}
            </div>
          )}
        </div>

        {/* Modal de Confirmação de Exclusão */}
        {confirmDelete.aberto && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-99999">
            <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm mx-4">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                Confirmar Exclusão
              </h3>
              <p className="text-gray-600 mb-6">
                Tem certeza que deseja deletar{" "}
                <strong>{confirmDelete.nome}</strong>?
              </p>
              <p className="text-sm text-gray-500 mb-6">
                Esta ação não pode ser desfeita.
              </p>
              <div className="flex gap-4 justify-end">
                <button
                  onClick={() =>
                    setConfirmDelete({
                      aberto: false,
                      recurso: null,
                      id: null,
                      nome: null,
                    })
                  }
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Deletar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modais de Cadastro/Edição */}
        <ModalCadastroAtleta
          aberto={abrirCadastroAtleta}
          onClose={() => {
            setAbrirCadastroAtleta(false);
            setItemEditando(null);
          }}
          onSave={(data) => {
            if (itemEditando?.id) {
              // Atualizar
              setAthletes((prev) =>
                prev.map((a) =>
                  a.id === itemEditando.id ? { ...a, ...data } : a
                )
              );
            } else {
              // Criar novo com ID gerado
              const newId = Math.max(...athletes.map((a) => a.id), 0) + 1;
              setAthletes((prev) => [...prev, { id: newId, ...data }]);
            }
            setItemEditando(null);
            setAbrirCadastroAtleta(false);
          }}
          atleta={itemEditando}
        />

        <ModalCadastroResponsavel
          aberto={abrirCadastroResponsavel}
          onClose={() => {
            setAbrirCadastroResponsavel(false);
            setItemEditando(null);
          }}
          onSave={(data) => {
            if (itemEditando?.id) {
              setResponsaveis((prev) =>
                prev.map((r) =>
                  r.id === itemEditando.id ? { ...r, ...data } : r
                )
              );
            } else {
              const newId = Math.max(...responsaveis.map((r) => r.id), 0) + 1;
              setResponsaveis((prev) => [...prev, { id: newId, ...data }]);
            }
            setItemEditando(null);
            setAbrirCadastroResponsavel(false);
          }}
          responsavel={itemEditando}
        />

        <ModalCadastroTreinador
          aberto={abrirCadastroTreinador}
          onClose={() => {
            setAbrirCadastroTreinador(false);
            setItemEditando(null);
          }}
          onSave={(data) => {
            if (itemEditando?.id) {
              setTreinadores((prev) =>
                prev.map((t) =>
                  t.id === itemEditando.id ? { ...t, ...data } : t
                )
              );
            } else {
              const newId = Math.max(...treinadores.map((t) => t.id), 0) + 1;
              setTreinadores((prev) => [...prev, { id: newId, ...data }]);
            }
            setItemEditando(null);
            setAbrirCadastroTreinador(false);
          }}
          treinador={itemEditando}
        />

        <ModalCadastroTurma
          aberto={abrirCadastroTurma}
          onClose={() => {
            setAbrirCadastroTurma(false);
            setItemEditando(null);
          }}
          onSave={(data) => {
            if (itemEditando?.id) {
              setTurmas((prev) =>
                prev.map((t) =>
                  t.id === itemEditando.id ? { ...t, ...data } : t
                )
              );
            } else {
              const newId = Math.max(...turmas.map((t) => t.id), 0) + 1;
              setTurmas((prev) => [...prev, { id: newId, ...data }]);
            }
            setItemEditando(null);
            setAbrirCadastroTurma(false);
          }}
          turma={itemEditando}
        />

        <ModalCadastroCategoria
          aberto={abrirCadastroCategoria}
          onClose={() => {
            setAbrirCadastroCategoria(false);
            setItemEditando(null);
          }}
          onSave={(data) => {
            if (itemEditando?.id) {
              setCategorias((prev) =>
                prev.map((c) =>
                  c.id === itemEditando.id ? { ...c, ...data } : c
                )
              );
            } else {
              const newId = Math.max(...categorias.map((c) => c.id), 0) + 1;
              setCategorias((prev) => [...prev, { id: newId, ...data }]);
            }
            setItemEditando(null);
            setAbrirCadastroCategoria(false);
          }}
          categoria={itemEditando}
        />

        <ModalCadastroModalidade
          aberto={abrirCadastroModalidade}
          onClose={() => {
            setAbrirCadastroModalidade(false);
            setItemEditando(null);
          }}
          onSave={(data) => {
            if (itemEditando?.id) {
              setModalidades((prev) =>
                prev.map((m) =>
                  m.id === itemEditando.id ? { ...m, ...data } : m
                )
              );
            } else {
              const newId = Math.max(...modalidades.map((m) => m.id), 0) + 1;
              setModalidades((prev) => [...prev, { id: newId, ...data }]);
            }
            setItemEditando(null);
            setAbrirCadastroModalidade(false);
          }}
          modalidade={itemEditando}
        />

        <ModalCadastroInteressado
          aberto={abrirCadastroInteressado}
          onClose={() => {
            setAbrirCadastroInteressado(false);
            setItemEditando(null);
          }}
          onSave={(data) => {
            if (itemEditando?.id) {
              setInteressados((prev) =>
                prev.map((i) =>
                  i.id === itemEditando.id ? { ...i, ...data } : i
                )
              );
            } else {
              const newId = Math.max(...interessados.map((i) => i.id), 0) + 1;
              setInteressados((prev) => [...prev, { id: newId, ...data }]);
            }
            setItemEditando(null);
            setAbrirCadastroInteressado(false);
          }}
          interessado={itemEditando}
        />

        {/* Modal Visualizar Atleta */}
        <ModalVisualizarAtleta
          aberto={abrirVisualizarAtleta}
          onClose={() => {
            setAbrirVisualizarAtleta(false);
            setAtletaSelecionado(null);
          }}
          atleta={atletaSelecionado}
          onSave={async (atletaAtualizado) => {
            try {
              await update("atletas", atletaAtualizado.id, atletaAtualizado);
              setAthletes((prev) =>
                prev.map((a) =>
                  a.id === atletaAtualizado.id ? atletaAtualizado : a
                )
              );
              setAbrirVisualizarAtleta(false);
              setAtletaSelecionado(null);
            } catch (e) {
              console.error("Erro ao atualizar atleta", e);
            }
          }}
          onOpenAddResponsible={() => {
            // Aqui você pode adicionar lógica para abrir modal de responsável se necessário
          }}
        />
      </div>
    </Layout>
  );
};

export default Cadastros;
