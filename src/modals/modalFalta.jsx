import React from 'react';
import { X } from 'lucide-react';

const ModalFalta = ({ isOpen, onClose, onSalvar, nomeAluno }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Cabeçalho */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-indigo-950">Motivo da Falta</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Corpo do Modal */}
        <div className="p-6">
          <p className="text-sm text-gray-500 mb-4">Justificativa para: <span className="font-semibold text-gray-700">{nomeAluno}</span></p>
          <textarea
            className="w-full h-40 p-4 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 resize-none text-gray-700 placeholder:text-gray-300 transition-all"
            placeholder="Escreva algo..."
          />
        </div>

        {/* Rodapé / Botões */}
        <div className="flex justify-end items-center gap-6 p-6 pt-0">
          <button 
            onClick={onClose}
            className="text-indigo-900 font-bold hover:text-black transition-colors"
          >
            Cancelar
          </button>
          <button 
            onClick={onSalvar}
            className="bg-indigo-950 hover:bg-black text-white px-8 py-2 rounded-xl font-bold transition-all shadow-md"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalFalta;