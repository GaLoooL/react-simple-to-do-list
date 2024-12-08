
const es = {
    title: 'REACT: Simple lista de tareas',
    pagination: {
        entriesPerPage: 'resultados por página',
        pageableMessage: 'Mostrando $1 - $2 de $3 resultados',
    },
    table: {
        tableHeader: {
            todo: 'Tarea',
            actions: 'Acciones'
        },
        tableHeaderOrder: {
            todo: {
                asc: 'Orden a-z',
                desc: 'Orden z-a'
            }
        },
        emptyState: 'No se han encontrado tareas con ese criterio de búsqueda',
    },
    buttons: {
        add: 'Añadir',
    },
    filter: {
        search: 'Buscar...',
        clear: 'Limpiar filtro'
    },
    modal: {
        title: {
            view: 'Visualizar tarea',
            edit: 'Editar tarea',
            add: 'Crear tarea',
            delete: 'Eliminar tarea'
        },
        intpuPlaceholder: 'Tarea',
        buttons: {
            cancel: 'Cancelar',
            edit: 'Actualizar',
            add: 'Crear',
            view: 'Cerrar',
            delete: 'Eliminar'
        },
        deleteConfirm: '¿Está seguro de que desea eliminar la tarea con id $1?',
        editNotPossible: 'No se puede editar la tarea con id $1, porque ya ha sido finalizada',
    }
}

export default es