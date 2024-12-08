
export interface Language {
    code: 'es' | 'en';
}

export interface Sortable {
    sortBy: string;
    sortDirection: 'asc' | 'desc';
}

export interface Pageable {
    pageNumber: number;
    pageSize: number;
    sortable: Sortable;
    totalItems: number;
}

export interface DialogParams {
    todo: TodoTO;
    mode: 'view' | 'edit' | 'add' | 'no-edit' | 'delete';
}

export interface TodoTO {
    id: number;
    tarea: string;
    done: boolean;
}