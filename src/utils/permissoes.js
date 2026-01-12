/**
 * Utilitário para verificação de permissões baseado no tipo de usuário
 */

export const getTipoUsuario = () => {
  const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");
  return usuario.tipoUsuario || null;
};

export const isAdministrador = () => {
  return getTipoUsuario() === "administrador";
};

export const isTreinador = () => {
  return getTipoUsuario() === "treinador";
};

export const podeEditar = () => {
  return isAdministrador();
};

export const podeDeletar = () => {
  return isAdministrador();
};

export const podeCadastrar = () => {
  return isAdministrador();
};

export const temAcessoBloqueado = () => {
  return isTreinador();
};

export const podeAcessarAdministracao = () => {
  return isAdministrador();
};

/**
 * Mensagens de erro padronizadas
 */
export const MENSAGENS = {
  ACESSO_NEGADO_ADMINISTRADOR:
    "Acesso negado! Apenas administradores podem acessar esta página.",
  NAO_PODE_EDITAR: "Apenas administradores podem editar itens",
  NAO_PODE_DELETAR: "Apenas administradores podem deletar itens",
  NAO_PODE_CADASTRAR: "Apenas administradores podem cadastrar itens",
};
