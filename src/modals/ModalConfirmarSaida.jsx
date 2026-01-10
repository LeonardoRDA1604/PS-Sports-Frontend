import { useNavigate } from "react-router-dom";

export default function ModalConfirmarSaida({ aberto, onClose }) {
  const navigate = useNavigate();

  if (!aberto) return null; // Não renderiza nada quando estiver fechado

  return (
    // z-99999 (z-index: 99999) para o modal aparecer acima de tudo, independente de onde esteja no código
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-99999">
      <div className="bg-white p-6 rounded shadow-lg">
        <p className="text-primary-900 text-lg font-semibold mb-4">
          Tem certeza que deseja sair?
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 rounded hover:bg-gray-600 cursor-pointer"
          >
            Cancelar
          </button>

          <button
            onClick={() => {
              localStorage.removeItem("usuario");
              navigate("/");
            }}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 cursor-pointer"
          >
            Sair
          </button>
        </div>
      </div>
    </div>
  );
}
