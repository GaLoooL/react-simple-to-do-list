import { TodoDetail } from "../todo-detail/todo-detail"
import { LuListTodo } from "react-icons/lu";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { TodoTO, Pageable, DialogParams } from "../../../global-interface";
import { useI18n } from "../../../hook/i18ntranslate";

interface TodoListParams {
    todos: TodoTO[];
    pageable: Pageable;
    todoFilter: () => TodoTO[];
    setTodo: (todos: TodoTO[]) => void;
    setDialogParams: (params: DialogParams) => void;
    setOpen: (open: boolean) => void;
    changeSort: (by: string, direction: 'asc' | 'desc') => void;
}

export const TodoList = ({
    todos, pageable, todoFilter, setTodo, setDialogParams, setOpen, changeSort
}: TodoListParams) => {

    // Funciones //    
    const updateTodo = (taskId: number, done: boolean) => {
        setTodo(todos.map((tarea) => tarea.id === taskId ? {...tarea, done} : tarea))
    }

    const editTodo = (todo: TodoTO) => {
        setDialogParams({todo, mode: 'edit' })
        setOpen(true)
    }
    
    const removeTodo = (taskId: number) => {
        setDialogParams({todo: {id: taskId, tarea: '', done: false}, mode: 'delete' })
        setOpen(true)
    }
    
    const viewTodo = (todo: TodoTO) => {
        setDialogParams({todo, mode: 'view' })
        setOpen(true)
    }
    
    // Variables locales //
    const filteredTodos = todoFilter()
    
    return (   
        <div className="overflow-x-auto">
            <table className="table-auto w-full">
                <thead className="py-10 bg-table-header">
                    <tr className="text-left">
                        <th className="px-4 py-3" colSpan={1}/>
                        <th className="px-4 py-3 uppercase font-bold w-8/12 " colSpan={2}>
                            <div className="flex justify-between items-center text-xs sm:text-base">
                                {useI18n('table.tableHeader.todo')} 
                                {   pageable.sortable.sortDirection === 'asc' ? 
                                    <span onClick={() => changeSort('todo', 'desc')} className="tooltip" data-tooltip={useI18n('table.tableHeaderOrder.todo.asc')}><TiArrowSortedDown className="size-4 sm:size-6"/></span> : 
                                    <span onClick={() => changeSort('todo', 'asc')} className="tooltip" data-tooltip={useI18n('table.tableHeaderOrder.todo.desc')}><TiArrowSortedUp className="size-4 sm:size-6"/></span>
                                }
                            </div>
                        </th>
                        <th className="px-4 py-3 uppercase font-bold text-xs sm:text-base" colSpan={1}>{useI18n('table.tableHeader.actions')}</th>
                    </tr>
                </thead>
                <tbody>
                    { filteredTodos.length === 0 ? (
                        <tr>
                            <td className="text-center" colSpan={4}>
                                <div className="flex justify-center items-center gap-4 my-10">
                                    <LuListTodo  className="size-6 sm:size-10"/>
                                    <h5 className="text-center py-2 text-xs sm:text-base">{useI18n('table.emptyState')}</h5>
                                </div>
                            </td> 
                        </tr>
                        )
                        :
                        (
                            todoFilter().map((tarea) => (
                                <TodoDetail
                                    key={tarea.id}
                                    todo={tarea}
                                    updateTodo={updateTodo}
                                    viewTodo={viewTodo}
                                    editTodo={editTodo}
                                    removeTodo={removeTodo}
                                >
                                </TodoDetail>
                            ))
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}