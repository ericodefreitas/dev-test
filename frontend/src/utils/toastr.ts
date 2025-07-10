import Swal, { SweetAlertOptions } from "sweetalert2"

export const toastr = async (props: SweetAlertOptions) => {
    return Swal.fire({
        title: props.title,
        text: props.text,
        icon: props.icon ?? "error",
        position: "top-end",
        timer: props.timer ?? 3000,
        timerProgressBar: props.timerProgressBar ?? true,
        toast: props.toast ?? true,
        showConfirmButton: props.showConfirmButton ?? false,
        background: color[props.icon ?? "error"],
        color: "#fff",
        ...props
    });
}

const color = {
    success: "#28a745",
    error: "#dc3545",
    warning: "#ffc107",
    info: "#17a2b8",
    question: "#6c757d"
}