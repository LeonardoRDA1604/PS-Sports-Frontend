import Logout from "../Logout/Logout";
import AnimatedTitle from "../../modals/AnimatedTitle";
import NotificationIcon from "../Notificacao/NotificationIcon";
import { HiMenu, HiX } from "react-icons/hi";

const Header = ({
  title,
  subtitle,
  expanded,
  setExpanded,
  onMobileMenuToggle,
  mobileMenuOpen,
}) => {
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  return (
    <header className="min-h-14 sm:min-h-16 md:min-h-20 bg-primary-900 flex items-center justify-between px-3 sm:px-6 md:px-8 text-white w-full border-b border-white/10">
      {/* Lado Esquerdo: Título Dinâmico */}
      <div className="text-center sm:text-left space-y-0.5 sm:space-y-1 flex-1">
        <AnimatedTitle
          text={title || "Título"}
          className="text-sm sm:text-lg md:text-2xl font-bold tracking-tight line-clamp-1"
        />
        <p className="text-[10px] sm:text-xs md:text-sm text-gray-400 line-clamp-1">
          {subtitle || "Subtítulo"}
        </p>
      </div>

      {/* Lado Direito: Notificação, Perfil e Hamburger */}
      <div className="flex items-center gap-2 sm:gap-3 md:gap-4 lg:gap-6 shrink-0">
        {/* Notificação */}
        <NotificationIcon
          count={3}
          className="hover:bg-white/10 rounded-full p-1.5 sm:p-2 transition min-w-10 min-h-10 flex items-center justify-center"
        />

        {/* Separador Vertical */}
        <div className="hidden md:block h-6 w-px bg-white/20"></div>

        {/* Perfil do Usuário */}
        <div className="hidden sm:flex items-center gap-2 md:gap-3">
          {/* Nome e Cargo (oculto em mobile) */}
          <div className="hidden md:block text-right">
            <p className="text-xs sm:text-sm font-semibold leading-tight truncate max-w-32.5">
              {usuario?.nome || "Ricardo Silva"}
            </p>
            <p className="text-[9px] sm:text-[10px] text-gray-400 uppercase tracking-widest">
              {usuario?.tipoUsuario || "Administrador"}
            </p>
          </div>

          {/* Avatar */}
          <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-blue-600 flex items-center justify-center ring-2 ring-white/20 overflow-hidden shrink-0">
            <span className="text-[10px] sm:text-xs font-bold">
              {usuario?.nome
                ? usuario.nome
                    .split(" ")
                    .map((word) => word.charAt(0))
                    .join("")
                    .toUpperCase()
                    .substring(0, 2)
                : "RS"}
            </span>
          </div>

          {/* Botão de Sair */}
          <Logout />
        </div>

        {/* Botão Hamburger (Mobile) - Menu Mobile */}
        <button
          onClick={onMobileMenuToggle}
          className="lg:hidden flex items-center justify-center p-2 hover:bg-primary-800 rounded-lg transition"
        >
          {mobileMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
        </button>
      </div>
    </header>
  );
};

export default Header;
