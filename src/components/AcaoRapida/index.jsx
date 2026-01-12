import { HiOutlineUserAdd } from "react-icons/hi";
import { IoLockClosed } from "react-icons/io5";

export function AcaoRapida(props) {
  return (
    <>
      <button
        type="button"
        disabled={props.disabled}
        className={`
        flex flex-col sm:flex-row items-center justify-center p-2 sm:p-3 md:p-4
        rounded-lg text-primary-50 font-semibold text-xs sm:text-sm md:text-base
        transform scale-100 transition-all duration-200 min-h-20 sm:min-h-25 md:min-h-30
        active:scale-95 touch-manipulation
        ${
          props.disabled
            ? "bg-gray-400 cursor-not-allowed opacity-60"
            : "bg-primary-900 hover:bg-primary-400 hover:scale-102 cursor-pointer active:bg-primary-500"
        }
        `}
        onClick={props.onClick}
        title={props.disabled ? "Treinadores não podem realizar esta ação" : ""}
      >
        {props.disabled ? (
          <IoLockClosed className="text-2xl sm:text-3xl md:text-4xl text-primary-50 mb-1 sm:mb-0 sm:mr-2" />
        ) : (
          <HiOutlineUserAdd className="text-2xl sm:text-3xl md:text-4xl text-primary-50 mb-1 sm:mb-0 sm:mr-2" />
        )}
        <span className="text-center sm:text-left line-clamp-2">
          {props.subTitle}
        </span>
      </button>
    </>
  );
}
