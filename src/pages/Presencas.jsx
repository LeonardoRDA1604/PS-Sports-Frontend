import React, { useState, useEffect } from 'react';
import Layout from "../components/Navbar/Navbar"; 
import { Bell, User, LogOut, ChevronDown, Loader2 } from 'lucide-react';
import ModalFalta from "../modals/modalFalta";


// Dados fictícios para a lista de chamada
const DADOS_ALUNOS_MOCK = [
  { id: 1, nome: 'José dos Anjos', status: 'presente' },
  { id: 2, nome: 'Alan Henrique Santos', status: 'ausente' },
  { id: 3, nome: 'Maria Eduarda Costa', status: 'presente' },
  { id: 4, nome: 'Pedro Lucas Oliveira', status: 'presente' },
  { id: 5, nome: 'Carla Cristina Souza', status: 'ausente' },
];

const Presenca = () => {
  // Estados para os filtros e controle de dados
  const [turmaSelecionada, setTurmaSelecionada] = useState('Sub-16 - Seg/Qua - 14h');
  const [dataSelecionada, setDataSelecionada] = useState('2026-01-10'); // Data atual
  const [listaAlunos, setListaAlunos] = useState([]);
  const [salvando, setSalvando] = useState(false);
  const [modalFaltaAberto, setModalFaltaAberto] = useState(false);
  const [alunoParaJustificar, setAlunoParaJustificar] = useState(null);


  // Simulação de carregamento de dados ao mudar filtros
  useEffect(() => {
    setListaAlunos(DADOS_ALUNOS_MOCK);
  }, [turmaSelecionada, dataSelecionada]);

  // Cálculos dinâmicos para os cards de resumo
  const totalAlunos = listaAlunos.length;
  const presentes = listaAlunos.filter(a => a.status === 'presente').length;
  const ausentes = totalAlunos - presentes;

  // Função para alternar presença (Toggle)
  const togglePresenca = (id) => {
    setListaAlunos(prev => prev.map(aluno => 
      aluno.id === id ? { ...aluno, status: aluno.status === 'presente' ? 'ausente' : 'presente' } : aluno
    ));
  };

  // Função para salvar os dados
  const handleSalvar = () => {
    setSalvando(true);
    setTimeout(() => {
      setSalvando(false);
      alert("Lista de presença salva com sucesso!");
    }, 1500);
  };

  const abrirModalJustificativa = (aluno) => {
    setAlunoParaJustificar(aluno);
    setModalFaltaAberto(true);
  };

  return (
    <Layout title="Presenças" subtitle="Registre a presença dos atletas nas aulas">
      
      <div className="bg-white shadow-xl rounded-2xl p-6 border border-gray-100">
        <h2 className="font-bold text-xl text-indigo-950 mb-1">Controle de Presença</h2>
        <p className="text-sm text-gray-500 mb-6">Selecione a turma e a data para realizar a chamada.</p>

        {/* Seção de Filtros de turma */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 items-end">
          <div className="relative">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Turma</label>
            <select 
              className="w-full p-2 border border-gray-300 rounded-lg appearance-none bg-white focus:ring-2 focus:ring-blue-500 outline-none"
              value={turmaSelecionada}
              onChange={(e) => setTurmaSelecionada(e.target.value)}
            >
              <option>Sub-16 - Seg/Qua - 14h</option>
              <option>Sub-14 - Ter/Qui - 10h</option>
            </select>
            <ChevronDown className="absolute right-3 top-9 text-gray-400 w-4 h-4 pointer-events-none" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Data da Aula</label>
            <input 
              type="date" 
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={dataSelecionada}
              onChange={(e) => setDataSelecionada(e.target.value)}
            />
          </div>

          <button className="bg-indigo-900 hover:bg-black text-white font-bold py-2 px-4 rounded-lg transition-all shadow-md">
            Carregar Presenças
          </button>
        </div>

        {/* Cards de Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-slate-50 border border-gray-200 p-4 rounded-xl text-center">
            <p className="text-gray-500 text-xs font-bold uppercase">Total de Atletas</p>
            <p className="text-3xl font-black text-slate-800">{totalAlunos}</p>
          </div>
          <div className="bg-green-50 border border-green-100 p-4 rounded-xl text-center">
            <p className="text-green-600 text-xs font-bold uppercase">Presentes</p>
            <p className="text-3xl font-black text-green-600">{presentes}</p>
          </div>
          <div className="bg-red-50 border border-red-100 p-4 rounded-xl text-center">
            <p className="text-red-600 text-xs font-bold uppercase">Ausentes</p>
            <p className="text-3xl font-black text-red-600">{ausentes}</p>
          </div>
        </div>

        {/* Lista de Alunos */}
        <div className="space-y-3 max-h-[450px] overflow-y-auto pr-2">
          {listaAlunos.map(aluno => (
            <div key={aluno.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                {/* Placeholder de Avatar Cinza */}
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center border border-gray-300">
                <User size={20} className="text-gray-400" />
                </div>
                <span className="font-semibold text-gray-800">{aluno.nome}</span>
              </div>

              <div className="flex items-center gap-6">
                {/* Custom Toggle Switch */}
                <div className="flex items-center gap-3">
                  <div 
                    onClick={() => togglePresenca(aluno.id)}
                    className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${aluno.status === 'presente' ? 'bg-indigo-900' : 'bg-gray-300'}`}
                  >
                    <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${aluno.status === 'presente' ? 'translate-x-6' : 'translate-x-0'}`} />
                  </div>
                  <span className={`text-sm font-bold w-16 ${aluno.status === 'presente' ? 'text-green-600' : 'text-red-500'}`}>
                    {aluno.status === 'presente' ? 'Presente' : 'Ausente'}
                  </span>
                </div>

                {/* Botão Justificar */}
                {aluno.status === 'ausente' && (
                    <button 
                        onClick={() => abrirModalJustificativa(aluno)} 
                        className="text-indigo-900 font-bold text-sm hover:underline cursor-pointer"
                    >
                        Justificar
                    </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Ações Finais */}
        <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-100">
          <button className="px-6 py-2 font-bold text-gray-500 hover:text-gray-700 transition-colors">Cancelar</button>
          <button 
            onClick={handleSalvar}
            disabled={salvando}
            className="bg-indigo-900 hover:bg-black text-white px-10 py-2 rounded-xl font-bold transition-all flex items-center gap-2 shadow-lg disabled:opacity-70"
          >
            {salvando ? <Loader2 className="animate-spin" /> : "Salvar Presença"}
          </button>
        </div>
      </div>
        {/* Modal justificativa de falta */}
        <ModalFalta 
            isOpen={modalFaltaAberto}
            onClose={() => setModalFaltaAberto(false)}
            nomeAluno={alunoParaJustificar?.nome}
            onSalvar={() => {
                alert("Justificativa salva com sucesso!");
                setModalFaltaAberto(false);
        }}
      />
    </Layout>
  );
};

export default Presenca;