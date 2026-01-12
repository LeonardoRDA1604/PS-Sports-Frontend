import { useState } from "react";
import { FiLogOut } from "react-icons/fi";

import ModalConfirmarSaida from "../../modals/ModalConfirmarSaida";

export default function Logout() {
  const [abrirModal, setAbrirModal] = useState(false);

  return (
    <>
      {/* Container do botão com className "group" (para afetar elementos com group-hover ao dar hover no container em si) */}
      <button
        onClick={() => setAbrirModal(true)}
        className="group cursor-pointer hover:scale-115 py-2.5"
      >
        {/* Elementos do botão */}
        <p className="text-primary-50 text-xs group-hover:text-red-600">Sair</p>
        <FiLogOut size={28} className="text-primary-50 transition-transform duration-20 group-hover:text-red-600" />
      </button>

      {/* Modal aberto ao clicar no botão */}
      <ModalConfirmarSaida
        aberto={abrirModal}
        onClose={() => setAbrirModal(false)}
      />
    </>
  );
}