import { PagedList } from "@/types/api/PagedList";

export function emptyPagedPromise<T>(): Promise<PagedList<T>> {
    return new Promise((resolve) => resolve({
        currentPage: 1,
        hasNextPage: false,
        hasPreviousPage: false,
        pageSize: 10,
        totalCount: 0,
        totalPages: 1,
        values: [] as T[]
    }))
}