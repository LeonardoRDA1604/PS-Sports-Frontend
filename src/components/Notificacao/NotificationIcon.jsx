import { useState, useEffect } from "react";
import { IoIosNotificationsOutline } from "react-icons/io";
import { HiX } from "react-icons/hi";

export default function NotificationIcon({ count = 3 }) {
  const [isOpen, setIsOpen] = useState(false);
  const [notificacoes, setNotificacoes] = useState([]);

  useEffect(() => {
    // Carrega notificações do localStorage ou cria padrão
    const notificacoesArmazenadas = localStorage.getItem("notificacoes");
    if (notificacoesArmazenadas) {
      setNotificacoes(JSON.parse(notificacoesArmazenadas));
    } else {
      // Dados padrão para demonstração
      const notificacoesPadrao = [
        {
          id: 1,
          pessoa: "João Silva",
          mensagem: "Enviou nova documentação de cadastro",
          data: "2026-01-12",
          hora: "14:30",
        },
        {
          id: 2,
          pessoa: "Maria Santos",
          mensagem: "Confirmou presença na próxima turma",
          data: "2026-01-12",
          hora: "13:45",
        },
        {
          id: 3,
          pessoa: "Pedro Oliveira",
          mensagem: "Solicitou alteração de modalidade",
          data: "2026-01-12",
          hora: "12:15",
        },
      ];
      setNotificacoes(notificacoesPadrao);
      localStorage.setItem("notificacoes", JSON.stringify(notificacoesPadrao));
    }
  }, []);

  const formatarDataHora = (data, hora) => {
    return `${data} às ${hora}`;
  };

  return (
    <>
      <div
        className="relative cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <IoIosNotificationsOutline
          size={24}
          className="text-primary-50 hover:text-white transition"
        />
        {count > 0 && (
          <span className="absolute -top-1 -right-2 bg-red-600 text-white font-bold text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {count}
          </span>
        )}
      </div>

      {/* Modal de Notificações */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
      {isOpen && (
        <div className="absolute top-12 right-0 bg-white text-primary-900 border border-gray-300 rounded-lg shadow-2xl w-80 max-h-96 overflow-y-auto z-50 md:right-0">
          {/* Cabeçalho */}
          <div className="sticky top-0 bg-primary-900 text-white p-4 flex items-center justify-between border-b">
            <h3 className="font-bold text-sm">Notificações</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-primary-800 rounded transition"
            >
              <HiX size={18} />
            </button>
          </div>

          {/* Lista de Notificações */}
          {notificacoes.length > 0 ? (
            <div className="divide-y">
              {notificacoes.map((notif) => (
                <div
                  key={notif.id}
                  className="p-4 hover:bg-gray-50 transition border-l-4 border-transparent hover:border-blue-600"
                >
                  <p className="font-semibold text-sm text-primary-900">
                    {notif.pessoa}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">{notif.mensagem}</p>
                  <p className="text-[10px] text-gray-400 mt-2">
                    {formatarDataHora(notif.data, notif.hora)}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500 text-sm">
              Nenhuma notificação no momento
            </div>
          )}
        </div>
      )}
    </>
  );
}
