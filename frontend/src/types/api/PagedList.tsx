export type PagedList<T> = {
    values: T[];
    currentPage: number,
    totalPages: number,
    pageSize: number,
    totalCount: number,
    hasPreviousPage: boolean,
    hasNextPage: boolean,
}


export type PagedListWithSummary<T,S> = {
    values: T[];
    summary: S;
    currentPage: number,
    totalPages: number,
    pageSize: number,
    totalCount: number,
    hasPreviousPage: boolean,
    hasNextPage: boolean,
}