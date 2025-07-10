export type ApiError = {
    message: string;
    items?: ApiErrorItem[]
}

type ApiErrorItem = {
    key: string;
    value: string
}