import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { HiChevronDown } from "react-icons/hi";
import { temAcessoBloqueado } from "../../utils/permissoes";

/**
 * Modal para visualizar e editar dados de um responsável
 * Permite gerenciar informações pessoais e endereço do responsável
 * Acesso restrito a administradores (treinadores não podem editar)
 */
export default function ModalVisualizarCadastroResponsavel({
  aberto,
  onClose,
  onSave,
  atletaContexto,
  responsavel,
}) {
  // ========================
  // ESTADOS DO FORMULÁRIO
  // ========================
  const [isEditing, setIsEditing] = useState(false);
  const [enderecoMesmoAtleta, setEnderecoMesmoAtleta] = useState(true);
  const [formData, setFormData] = useState({
    id: "",
    respCpf: "",
    respNome: "",
    respEmail: "",
    respTelefone: "",
    respParentesco: "",
    respCep: "",
    respBairro: "",
    respCidade: "",
    respLogradouro: "",
    respComplemento: "",
  });

  // ========================
  // CICLO DE VIDA
  // ========================
  useEffect(() => {
    if (responsavel) {
      setFormData({
        id: responsavel.id || "",
        respCpf: responsavel.cpf || responsavel.respCpf || "",
        respNome: responsavel.name || responsavel.respNome || "",
        respEmail: responsavel.email || responsavel.respEmail || "",
        respTelefone:
          responsavel.phone ||
          responsavel.phoneNumber ||
          responsavel.respTelefone ||
          "",
        respParentesco: responsavel.kinship || responsavel.respParentesco || "",
        respCep: responsavel.cep || responsavel.respCep || "",
        respBairro: responsavel.neighborhood || responsavel.respBairro || "",
        respCidade: responsavel.city || responsavel.respCidade || "",
        respLogradouro: responsavel.street || responsavel.respLogradouro || "",
        respComplemento:
          responsavel.complement || responsavel.respComplemento || "",
      });
      setIsEditing(false);
    }
  }, [responsavel, aberto]);

  // ========================
  // FUNÇÕES DE MÁSCARA
  // ========================
  /** Máscara para CPF: XXX.XXX.XXX-XX */
  const maskCPF = (v) =>
    v
      .replace(/\D/g, "")
      .substring(0, 11)
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");

  /** Máscara para Telefone: (XX) XXXXX-XXXX */
  const maskTelefone = (v) =>
    v
      .replace(/\D/g, "")
      .substring(0, 11)
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2");

  /** Máscara para CEP: XXXXX-XXX */
  const maskCEP = (v) =>
    v
      .replace(/\D/g, "")
      .substring(0, 8)
      .replace(/(\d{5})(\d)/, "$1-$2");

  // ========================
  // FUNÇÕES UTILITÁRIAS
  // ========================
  /** Capitaliza a primeira letra de cada palavra */
  const capitalizarNome = (nome) => {
    if (!nome) return "";
    return nome
      .toLowerCase()
      .split(" ")
      .map((palavra) => palavra.charAt(0).toUpperCase() + palavra.slice(1))
      .join(" ");
  };

  // ========================
  // MANIPULAÇÃO DE DADOS
  // ========================
  const handleChange = (e) => {
    const { name, value } = e.target;
    let maskedValue = value;

    if (isEditing) {
      if (name === "respCpf") maskedValue = maskCPF(value);
      if (name === "respTelefone") maskedValue = maskTelefone(value);
      if (name === "respCep") maskedValue = maskCEP(value);
    }

    setFormData((prev) => ({ ...prev, [name]: maskedValue }));
  };

  const handleFinalSave = () => {
    // ✓ Validação de campos obrigatórios
    if (!formData.respNome || !formData.respCpf || !formData.respTelefone) {
      alert("Por favor, preencha os campos obrigatórios.");
      return;
    }

    // Se o endereço for o mesmo, injeta os dados do atletaContexto antes de salvar
    const dataToSave = enderecoMesmoAtleta
      ? {
          ...formData,
          respNome: capitalizarNome(formData.respNome),
          respBairro: capitalizarNome(
            atletaContexto?.address?.neighborhood || ""
          ),
          respCidade: capitalizarNome(atletaContexto?.address?.city || ""),
          respCep: atletaContexto?.address?.cep || "",
          respLogradouro: capitalizarNome(
            atletaContexto?.address?.street || ""
          ),
          respComplemento: capitalizarNome(
            atletaContexto?.address?.complement || ""
          ),
        }
      : {
          ...formData,
          respNome: capitalizarNome(formData.respNome),
          respBairro: capitalizarNome(formData.respBairro),
          respCidade: capitalizarNome(formData.respCidade),
          respLogradouro: capitalizarNome(formData.respLogradouro),
          respComplemento: capitalizarNome(formData.respComplemento),
        };

    onSave(dataToSave);
    setIsEditing(false);
  };

  const handleDiscard = () => {
    /** Restaura os dados originais do responsável ao descartar edições */
    setIsEditing(false);
    if (responsavel) {
      setFormData({
        id: responsavel.id || "",
        respCpf: responsavel.cpf || responsavel.respCpf || "",
        respNome: responsavel.name || responsavel.respNome || "",
        respEmail: responsavel.email || responsavel.respEmail || "",
        respTelefone:
          responsavel.phone ||
          responsavel.phoneNumber ||
          responsavel.respTelefone ||
          "",
        respParentesco: responsavel.kinship || responsavel.respParentesco || "",
        respCep: responsavel.cep || responsavel.respCep || "",
        respBairro: responsavel.neighborhood || responsavel.respBairro || "",
        respCidade: responsavel.city || responsavel.respCidade || "",
        respLogradouro: responsavel.street || responsavel.respLogradouro || "",
        respComplemento:
          responsavel.complement || responsavel.respComplemento || "",
      });
    }
  };

  if (!aberto) return null;

  // ========================
  // ESTILOS REUTILIZÁVEIS
  // ========================
  const getInputStyle = () => {
    if (!isEditing) {
      return "w-full px-4 py-2.5 border border-gray-300 rounded-xl bg-gray-100 text-gray-600 cursor-not-allowed outline-none transition-all text-sm placeholder:text-gray-400 font-medium";
    }
    return "w-full px-4 py-2.5 border border-blue-500 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none transition-all text-sm placeholder:text-gray-400 text-gray-800 font-medium";
  };
  const inputStyle = getInputStyle();
  const labelStyle = "block text-sm font-bold text-[#101944] mb-1";

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-110000 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* HEADER - Título e Botão Fechar */}
        <div className="flex justify-between items-center px-6 py-5 border-b border-gray-100 bg-white sticky top-0 z-10">
          <h2 className="text-xl font-bold text-[#101944]">
            {isEditing ? "Editar Responsável" : "Dados do Responsável"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded-full hover:bg-red-50"
          >
            <IoClose size={24} />
          </button>
        </div>

        {/* CONTEÚDO - Formulário com campos do responsável */}
        <div className="overflow-y-auto p-6 space-y-5 custom-scrollbar bg-white">
          {/* Seção: Dados Básicos */}
          <div>
            <label className={labelStyle}>CPF *</label>
            <input
              name="respCpf"
              value={formData.respCpf}
              onChange={handleChange}
              disabled={!isEditing}
              className={inputStyle}
              placeholder="000.000.000-00"
            />
          </div>

          <div>
            <label className={labelStyle}>Nome completo *</label>
            <input
              name="respNome"
              value={formData.respNome}
              onChange={handleChange}
              disabled={!isEditing}
              className={inputStyle}
              placeholder="Digite o nome completo"
            />
          </div>

          <div>
            <label className={labelStyle}>E-mail *</label>
            <input
              name="respEmail"
              type="email"
              value={formData.respEmail}
              onChange={handleChange}
              disabled={!isEditing}
              className={inputStyle}
              placeholder="exemplo@email.com"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelStyle}>Telefone *</label>
              <input
                name="respTelefone"
                value={formData.respTelefone}
                onChange={handleChange}
                disabled={!isEditing}
                className={inputStyle}
                placeholder="(00) 00000-0000"
              />
            </div>
            <div className="relative">
              <label className={labelStyle}>Parentesco *</label>
              <select
                name="respParentesco"
                value={formData.respParentesco}
                onChange={handleChange}
                disabled={!isEditing}
                className={`${inputStyle} appearance-none bg-white cursor-pointer`}
              >
                <option value="">Selecione</option>
                <option value="Pai">Pai</option>
                <option value="Mãe">Mãe</option>
                <option value="Avô/Avó">Avô/Avó</option>
                <option value="Tio/Tia">Tio/Tia</option>
                <option value="Outro">Outro</option>
              </select>
              <HiChevronDown
                className="absolute right-3 bottom-3 text-gray-400 pointer-events-none"
                size={20}
              />
            </div>
          </div>

          {/* Toggle de Endereço - Determina se usa endereço do atleta */}
          <div className="pt-2">
            <label className="text-sm font-bold text-[#101944]">
              Endereço Responsável é o mesmo do atleta? *
            </label>
            <div className="flex gap-6 mt-3">
              <label
                className={`flex items-center gap-2 cursor-pointer font-bold text-[#101944] ${
                  !isEditing ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={() => isEditing && setEnderecoMesmoAtleta(true)}
              >
                <div
                  className={`w-5 h-5 border-2 rounded flex items-center justify-center transition-all ${
                    enderecoMesmoAtleta
                      ? "bg-[#003366] border-[#003366]"
                      : "border-gray-300"
                  }`}
                >
                  {enderecoMesmoAtleta && (
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  )}
                </div>
                Sim
              </label>
              <label
                className={`flex items-center gap-2 cursor-pointer font-bold text-[#101944] ${
                  !isEditing ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={() => isEditing && setEnderecoMesmoAtleta(false)}
              >
                <div
                  className={`w-5 h-5 border-2 rounded flex items-center justify-center transition-all ${
                    !enderecoMesmoAtleta
                      ? "bg-[#003366] border-[#003366]"
                      : "border-gray-300"
                  }`}
                >
                  {!enderecoMesmoAtleta && (
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  )}
                </div>
                Não
              </label>
            </div>
          </div>

          {/* Seção de Endereço Manual - Exibida quando endereço é diferente do atleta */}
          {!enderecoMesmoAtleta && (
            <div className="space-y-4 pt-4 border-t border-gray-100 animate-fadeIn">
              <h3 className="text-base font-bold text-[#101944] uppercase tracking-wide">
                Endereço do Responsável
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelStyle}>CEP *</label>
                  <input
                    name="respCep"
                    value={formData.respCep}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={inputStyle}
                    placeholder="00000-000"
                  />
                </div>
                <div>
                  <label className={labelStyle}>Bairro *</label>
                  <input
                    name="respBairro"
                    value={formData.respBairro}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={inputStyle}
                  />
                </div>
              </div>
              <div>
                <label className={labelStyle}>Cidade *</label>
                <input
                  name="respCidade"
                  value={formData.respCidade}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={inputStyle}
                />
              </div>
              <div>
                <label className={labelStyle}>Logradouro *</label>
                <input
                  name="respLogradouro"
                  value={formData.respLogradouro}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={inputStyle}
                />
              </div>
              <div>
                <label className={labelStyle}>Complemento</label>
                <input
                  name="respComplemento"
                  value={formData.respComplemento}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={inputStyle}
                />
              </div>
            </div>
          )}
        </div>

        {/* RODAPÉ - Botões de ação (Voltar/Editar/Salvar) */}
        <div className="p-6 border-t border-gray-100 flex gap-4 justify-end bg-gray-50 shrink-0">
          {/* Botão Voltar/Descartar */}
          <button
            onClick={isEditing ? handleDiscard : onClose}
            className="px-8 py-2.5 font-bold rounded-full transition-colors shadow-sm bg-gray-400 text-white hover:bg-gray-500"
          >
            {isEditing ? "Descartar" : "Voltar"}
          </button>
          {/* Botão Editar - Bloqueado para treinadores */}
          {!isEditing && (
            <button
              onClick={() => temAcessoBloqueado() || setIsEditing(true)}
              disabled={temAcessoBloqueado()}
              className={`px-10 py-2.5 text-white font-bold rounded-full transition-all shadow-md active:scale-95 ${
                temAcessoBloqueado()
                  ? "bg-gray-400 cursor-not-allowed opacity-50 hover:bg-gray-400"
                  : "bg-[#003366] hover:bg-[#050a24]"
              }`}
              title={
                temAcessoBloqueado()
                  ? "Treinadores não podem editar responsáveis"
                  : ""
              }
            >
              Editar
            </button>
          )}
          {/* Botão Salvar - Visível apenas em modo edição */}
          {isEditing && (
            <button
              onClick={handleFinalSave}
              className="px-10 py-2.5 text-white font-bold rounded-full transition-all shadow-md active:scale-95 bg-green-600 hover:bg-green-700"
            >
              Salvar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
