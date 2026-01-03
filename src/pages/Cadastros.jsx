import { useState } from "react";
import Navbar from "../components/Navbar";
import AnimatedTitle from "../modals/AnimatedTitle";

import { FaUser } from "react-icons/fa";
import { FaUserFriends } from "react-icons/fa";
import { FaPersonChalkboard } from "react-icons/fa6";
import { HiMiniUserGroup } from "react-icons/hi2";
import { FaTableList } from "react-icons/fa6";
import { FaRunning } from "react-icons/fa";
import { IoIosAddCircleOutline } from "react-icons/io";

// Dados dos atletas)
const atletasData = [
  { id: 1, nome: 'Mateus A.', idade: 12, categoria: 'Sub-12', turma: 'B12' },
  { id: 2, nome: 'Gabriel A.', idade: 13, categoria: 'Sub-14', turma: 'A14' },
  { id: 3, nome: 'Enzo G.', idade: 15, categoria: 'Sub-16', turma: 'A16' },
  { id: 4, nome: 'Thiago P.', idade: 16, categoria: 'Sub-16', turma: 'B16' },
  { id: 5, nome: 'Nathan J.', idade: 16, categoria: 'Sub-16', turma: 'B16' },
  { id: 6, nome: 'Wesley S.', idade: 17, categoria: 'Sub-18', turma: 'B17' },
];

// Dados dos responsáveis
const responsaveisData = [
  { id: 1, nome: 'Roberto C.', atleta: 'Mateus A.', parentesco: 'Pai', telefone: '(81) 0.0000-0000 ' },
  { id: 2, nome: 'Ronaldo F.', atleta: 'Gabriel A.', parentesco: 'Pai', telefone: '(81) 0.0000-0000' },
  { id: 3, nome: 'Miraildes M.', atleta: 'Enzo G.', parentesco: 'Mãe', telefone: '(81) 0.0000-0000' },
  { id: 4, nome: 'Thiago S.', atleta: 'Thiago P.', parentesco: 'Pai', telefone: '(81) 0.0000-0000' },
  { id: 5, nome: 'Marta.', atleta: 'Nathan J.', parentesco: 'Mãe', telefone: '(81) 0.0000-0000' },
  { id: 6, nome: 'Lionel M.', atleta: 'Wesley S.', parentesco: 'Pai', telefone: '(81) 0.0000-0000' },
];

// Mapeamento das abas (mantidas)
// Mapeamento das abas (MODIFICADO)
const abas = [
  { id: 'atletas', label: 'Atletas', labelSingular: 'Atleta', icon: <FaUser /> },
  { id: 'responsaveis', label: 'Responsáveis', labelSingular: 'Responsável', icon: <FaUserFriends /> }, // <-- Modificado!
  { id: 'treinadores', label: 'Treinadores', labelSingular: 'Treinador', icon: <FaPersonChalkboard /> }, 
  // label no singular adicionado para consistência
  { id: 'turmas', label: 'Turmas', labelSingular: 'Turma', icon: <HiMiniUserGroup /> },
  { id: 'categorias', label: 'Categorias', labelSingular: 'Categoria', icon: <FaTableList /> },
  { id: 'modalidades', label: 'Modalidades', labelSingular: 'Modalidade', icon: <FaRunning /> },
];

const Cadastros = () => {
  const [abaAtiva, setAbaAtiva] = useState('atletas');
  const [termoPesquisa, setTermoPesquisa] = useState('');

  // Lógica de Filtragem (MUITO IMPORTANTE: Garante que os dados originais sejam retornados
  // quando a pesquisa estiver vazia, corrigindo um bug no código original)
  const atletasFiltrados = termoPesquisa.length > 0 && abaAtiva === 'atletas'
    ? atletasData.filter(atleta =>
        // Filtra pelo nome do atleta (case-insensitive)
        atleta.nome.toLowerCase().includes(termoPesquisa.toLowerCase())
      )
    : atletasData; // Retorna TODOS os dados se a pesquisa estiver vazia

     const responsaveisFiltrados = termoPesquisa.length > 0 && abaAtiva === 'responsaveis'
    ? responsaveisData.filter(responsavel =>
        
      // Filtra pelo nome do responsável (case-insensitive)
        responsavel.nome.toLowerCase().includes(termoPesquisa.toLowerCase())
      )
    : responsaveisData; // Retorna TODOS os dados se a pesquisa estiver vazia


  const TabItem = ({ id, label, icon }) => {
    const isActive = abaAtiva === id;
    const activeClasses = 'text-blue-600 border-b-2 border-blue-600 font-semibold ';
    const inactiveClasses = 'text-gray-500 hover:text-gray-700 cursor-pointer';

    return (
      <button
        key={id}
        className={`flex items-center space-x-2 px-4 py-2 text-sm whitespace-nowrap transition duration-150 ${
          isActive ? activeClasses : inactiveClasses
        }`}
        onClick={() => setAbaAtiva(id)}
      >
        <span className="text-xl">{icon}</span>
        <span>{label}</span>
      </button>
    );
  };

  return (
    // 1. ESTRUTURA PRINCIPAL: Garante layout em coluna, ocupa 100% da largura,
    // e adiciona um padding lateral/vertical consistente.
    <div className="min-h-screen bg-gray-200 flex overflow-x-hidden">  
      <Navbar />
      
      {/* CONTEÚDO PRINCIPAL */}
      <div className="min-h-screen overflow-auto flex-1 p-8 bg-primary-50">
          
        {/* Cabeçalho */}
        <div className="mb-6">
          <AnimatedTitle text="Cadastros" />
          <p className="text-xs sm:text-base text-gray-500 mb-4">
            Gerencie atletas, responsáveis, treinadores turmas, categorias e modalidades.
          </p>
          
          {/* Navegação por Abas (Garantiu o scroll horizontal em telas pequenas) */}
          <div className="flex border-b border-gray-200 overflow-x-auto scrollbar-hide">
            {abas.map((aba) => (
              <TabItem  key={aba.id} {...aba} />
            ))}
          </div>
        </div>

        {/* 3. Área de Ações (Pesquisa e Novo Item) */}
        {/* CORREÇÃO: flex-col por padrão, flex-row em telas maiores que "sm" */}
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 mb-6">
          
          {/* Barra de Pesquisa */}
          <div className="relative w-full sm:max-w-xs order-2 sm:order-1 ">
            <input
              type="text"
              placeholder={`Buscar ${abaAtiva}...`}
              className="
              w-full pl-10 pr-4 py-2 border border-gray-300 bg-white
              rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 text-sm"
              value={termoPesquisa}
              onChange={(e) => setTermoPesquisa(e.target.value)}
            />
            {/* Ícone de Busca (Lupa) */}
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
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

          {/* Botão Adicionar Novo Atleta */}
          
          <button className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition duration-200 order-1 sm:order-2">
            <IoIosAddCircleOutline className="text-3xl" />
            <span className="text-sm sm:text-base">Adicionar {abas.find(a => a.id === abaAtiva)?.labelSingular}</span>
          </button>
        </div>

        {/* 4. CONTEÚDO: Tabela/Dados */}
        <div className="bg-white shadow-xl rounded-lg p-4 sm:p-6 border border-gray-100">
          
          {abaAtiva === 'atletas' && ( 
            <div className="bg-white rounded-lg overflow-x-auto"> 
              {/* overflow-x-auto é crucial para tornar a tabela responsiva! */}
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-white">
                  <tr>
                    {/* Classes de tabela mantidas, que são responsivas com o overflow-x-auto */}
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
                      Idade
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
                      Turma
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {atletasFiltrados.map((atleta) => (
                    <tr key={atleta.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary-900">
                        {atleta.nome}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-primary-900 font-medium">
                        {atleta.idade}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <a href="#" className="text-blue-600 hover:underline">
                          {atleta.categoria}
                        </a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <a href="#" className="text-blue-600 hover:underline">
                          {atleta.turma}
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* Mensagem de "Nenhum resultado" */}
              {atletasFiltrados.length === 0 && termoPesquisa.length > 0 && (
                  <div className="p-6 text-center text-gray-500">
                      Nenhum atleta encontrado com o termo "{termoPesquisa}".
                  </div>
              )}
            </div>
          )}

          {/* Conteúdo para Outras Abas RESPONSAVEIS */}
          {abaAtiva !== 'atletas' && (
                    <div className="bg-white rounded-lg overflow-x-auto"> 
              {/* overflow-x-auto é crucial para tornar a tabela responsiva! */}
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-white">
                  <tr>
                    {/* Classes de tabela mantidas, que são responsivas com o overflow-x-auto */}
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
                      Atleta
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
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {responsaveisFiltrados.map((responsavel) => (
                    <tr key={responsavel.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary-900">
                        {responsavel.nome}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-primary-900 font-medium">
                        {responsavel.atleta}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          {responsavel.parentesco}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <a href="#" className="text-blue-600 hover:underline">
                          {responsavel.telefone}
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* Mensagem de "Nenhum resultado" */}
              {responsaveisFiltrados.length === 0 && termoPesquisa.length > 0 && (
                  <div className="p-6 text-center text-gray-500">
                      Nenhum responsável encontrado com o termo "{termoPesquisa}".
                  </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cadastros;