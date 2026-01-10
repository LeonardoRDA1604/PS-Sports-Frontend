import Logout from "../Logout/Logout";
import AnimatedTitle from "../../modals/AnimatedTitle";
import NotificationIcon from "../Notificacao/NotificationIcon";

const Header = ({ title, subtitle }) => {
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  return (
    <header className="h-20 bg-primary-900 flex items-center justify-between px-8 text-white w-full border-b border-white/10">
      {/* Lado Esquerdo: Título Dinâmico */}
      <div>
        <AnimatedTitle text={title || "Título"} className="text-2xl font-bold tracking-tight" />
        <p className="text-xs sm:text-base text-gray-500">
          {subtitle || "Subtítulo"}
        </p>
      </div>
      
      {/* Lado Direito: Notificação e Perfil */}
      <div className="flex items-center gap-6">
        {/* Notificação */}
        <NotificationIcon count={3} className="hover:bg-white/10 rounded-full" />

        {/* Separador Vertical */}
        <div className="h-8 w-px bg-white/20 mx-2"></div>

        {/* Perfil do Usuário */}
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm font-semibold leading-tight">{usuario?.nome || "Ricardo Silva"}</p>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest">
              {usuario?.cargo || "Administrador"}
            </p>
          </div>
          
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center ring-2 ring-white/20 overflow-hidden">
             <span className="text-sm font-bold">
               {usuario?.nome ? usuario.nome.substring(0, 2).toUpperCase() : "RS"}
             </span>
          </div>

          {/* Botão de Sair */}
          <Logout />
        </div>
      </div>
    </header>
  );
};

export default Header;