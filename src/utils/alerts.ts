import Swal from "sweetalert2";

export function showErrorAlert(message: string) {
  Swal.fire({
    icon: "error",
    title: "Erro!",
    text: message,
  });
}

export function showSuccessAlert(message: string) {
  Swal.fire({
    icon: "success",
    title: "Sucesso!",
    text: message,
  });
}

export async function confirmDelete(actionName: string): Promise<boolean> {
  const result = await Swal.fire({
    title: `Tem certeza que deseja excluir ${actionName}?`,
    text: "Esta ação não pode ser desfeita!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sim, excluir!",
    cancelButtonText: "Cancelar",
    confirmButtonColor: "#ff0000",
  })
  return result.isConfirmed;
}

export function showSuccessMessage(message: string) {
  Swal.fire("Sucesso!", message, "success");
}
