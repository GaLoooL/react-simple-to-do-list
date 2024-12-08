
const en = {
    title: 'REACT: Simple todo list',
    pagination: {
        entriesPerPage: 'entries per page',
        pageableMessage: 'Showing $1 - $2 of $3 entries',
    },
    table: {
        tableHeader: {
            todo: 'Todo',
            actions: 'Actions'
        },
        tableHeaderOrder: {
            todo: {
                asc: 'Sort by a-z',
                desc: 'Sort by z-a'
            }
        },
        emptyState: 'No todo found with that search criteria',
    },
    buttons: {
        add: 'Add',
    },
    filter: {
        search: 'Search...',
        clear: 'Clear filter'
    },
    modal: {
        title: {
            view: 'View todo',
            edit: 'Edit todo',
            add: 'Create todo',
            delete: 'Delete todo',
        },
        intpuPlaceholder: 'Todo',
        buttons: {
            cancel: 'Cancel',
            edit: 'Update',
            add: 'Create',
            view:  'Close',
            delete: 'Delete',
        },
        deleteConfirm: 'Are you sure you want to delete the todo with id $1?',
        editNotPossible: 'You can not edit the todo with id $1, because it is already finished',
    }
}

export default en