import { ApiError } from "@/types/ApiError";
import { toastr } from "./toastr";

export function errorHandling(err: any, message?: string, title?: string) {
    const apiError = err as ApiError;
    let errorMessage = apiError?.items?.[0]?.value ?? apiError?.message;
    if (!errorMessage)
        errorMessage = typeof apiError === "string" ? apiError : "Ocorreu um erro inesperado. Por favor tente novamente"

    const timer = calculateToastTime(errorMessage);

    void toastr({
        title: title ?? "A requisição falhou!",
        text: message ?? errorMessage,
        icon: "error",
        timer
    });
}

function calculateToastTime(text: string): number {
    const palavras = text.trim().split(/\s+/).length;
    const tempoCalculado = palavras * 267;

    return Math.min(Math.max(tempoCalculado, 3000), 10000);
}