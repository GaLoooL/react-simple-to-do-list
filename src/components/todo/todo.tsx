import { GiSpain } from "react-icons/gi"
import { LiaFlagUsaSolid } from "react-icons/lia"
import { MdClear, MdDarkMode, MdLightMode } from "react-icons/md"
import { useLocalStorage } from "../../hook/localStorage"
import { useEffect, useState } from "react"
import { IoMdAdd } from "react-icons/io"
import { DialogParams, Language, Pageable, TodoTO } from "../../global-interface"
import { TodoList } from "./todo-list/todo-list"
import { TodoModal } from "./todo-modal/todo-modal"
import { I18n, useI18n } from "../../hook/i18ntranslate"


export const Todo = () => {

    // Variables local-storage global //
    const [darkMode, setDarkMode] = useLocalStorage<boolean>('darkMode', true)
    const [language, setLanguage] = useLocalStorage<Language>('language',{code:'es'})
    I18n.instance.changeLanguage(language)

    // Variables local-storage app //
    const [todos, setTodo] = useLocalStorage<TodoTO[]>('todo', [])

    // Estados locales //
    const [open, setOpen] = useState(false) // Estado para tener abierto o cerrado el dialog //
    const [{todo, mode}, setDialogParams] = useState<DialogParams>({todo: {} as TodoTO, mode: 'view'})
    const [nextId, setNextId] = useState<number>(todos.length > 0 ? Math.max(...todos.map((tarea) => tarea.id)) : 0)
    const [pageable, setPageable] = useState<Pageable>({pageNumber: 1, pageSize: 5, sortable: { sortBy: 'tarea', sortDirection: 'asc' }, totalItems: todos.length})
    const [filter, setFilter] = useState<string>('')

    // Use effect //
    useEffect(() => {
        document.documentElement.classList.remove(darkMode ? 'light' : 'dark')
        document.documentElement.classList.add(darkMode ? 'dark' : 'light')
    }, [darkMode])

    useEffect(() => {
        const filteredTodos = todos.filter((todo) => todo.tarea.toLowerCase().includes(filter.toLowerCase()))
        let page = Math.ceil(filteredTodos.length / pageable.pageSize)
        if (page === 0) page = 1
        setPageable({...pageable, totalItems: filteredTodos.length, pageNumber: pageable.pageNumber > page ? page : pageable.pageNumber})
    }, [filter, todos])

    // Funciones //
    const changeLanguage = (language: Language) => {        
        setLanguage(language)
        I18n.instance.changeLanguage(language)
    }

    const addTodo = () => {
        setDialogParams({todo: {id: nextId + 1, tarea: '', done: false}, mode: 'add' })
        setOpen(true)
    }

    const todoFilter = () => {
        let filteredTodos = todos.filter((todo) => todo.tarea.toLowerCase().includes(filter.toLowerCase()))
        filteredTodos.sort((a, b) => a.tarea.localeCompare(b.tarea))
        if (pageable.sortable.sortDirection === 'desc') {
            filteredTodos.reverse()
        }
        return filteredTodos.slice((pageable.pageNumber - 1) * pageable.pageSize, pageable.pageNumber * pageable.pageSize)
    }

    const todoPages = () => {
        let totalPages = Math.ceil(pageable.totalItems / pageable.pageSize)
        let currentPage = pageable.pageNumber

        if (currentPage === 1) return Array.from({length: Math.min(3, totalPages)}, (_, i) => i + 1);
        if (currentPage === totalPages) return Array.from({length: Math.min(3, totalPages)}, (_, i) => totalPages - i).reverse();

        return [currentPage - 1, currentPage, currentPage + 1]
    }

    const changePage = (pageNumber: number) => {
        setPageable({...pageable, pageNumber})
    }

    const changeSort = (sortBy: string, sortDirection: 'asc' | 'desc') => {
        setPageable({...pageable, sortable: {sortBy, sortDirection}})
    }

    const actionToTodo = (todo: TodoTO) => {
        switch (mode) {
            case 'add':
                setTodo([...todos, todo])
                setNextId(nextId + 1)
                break;
            case 'edit':
                setTodo(todos.map((tarea) => tarea.id === todo.id ? todo : tarea))
                break;
            case 'delete':
                setTodo(todos.filter((tarea) => tarea.id !== todo.id))
                break;
            default:
                break;
        }
    }

    

    return (
        <>
            <div className="flex justify-between items-center">
                <div className="flex justify-end gap-2 p-2 my-3 sm:gap-5 sm:p-4 sm:my-5">
                    <span className={`p-2 rounded-lg ${language.code === 'es' ? 'bg-hover' : 'cursor-pointer hover:bg-hover'}`}>
                        <GiSpain onClick={language.code === 'es' ? () => {} :() => changeLanguage({code:'es'})} className="size-5 sm:size-6"/>
                    </span>
                    <span className={`p-2 rounded-lg ${language.code === 'en' ? 'bg-hover' : 'cursor-pointer hover:bg-hover'}`}>
                        <LiaFlagUsaSolid onClick={language.code === 'en' ? () => {} :() => changeLanguage({code: 'en'})} className="size-5 sm:size-6"/>
                    </span>
                </div>
                <div className="flex justify-end gap-2 p-2 my-3 sm:gap-5 sm:p-4 sm:my-5">
                    <span className={`flex justify-center items-center cursor-pointer p-2 rounded-lg ${darkMode == false ? 'bg-hover' : 'hover:bg-hover'}`}>
                        <MdLightMode onClick={darkMode == false ? () => {} : () => setDarkMode(false)} className="size-5 sm:size-6"/>
                    </span>
                    <span className={`flex justify-center items-center cursor-pointer p-2 rounded-lg ${darkMode == true ? 'bg-hover' : 'hover:bg-hover'}`}>
                        <MdDarkMode onClick={darkMode == true ? () => {} :() => setDarkMode(true)} className="size-5 sm:size-6"/>
                    </span>
                </div>
            </div>

            <div className="w-full bg-section border-2 border-border rounded-lg shadow-md">

                <div className="px-2 py-3 sm:px-4 sm:py-5 border-b border-border">
                    <h1 className="text-base sm:text-1xl font-bold">{useI18n('title')}</h1>
                </div>
                <div className="flex justify-between px-3 py-2 sm:px-4 sm:py-3 flex-wrap gap-2">
                    <div className="flex gap-4 justify-center items-center">
                        <select value={pageable.pageSize} className="text-sm sm:text-base h-10 border-2 border-border rounded-lg px-2 sm:px-3 bg-input" onChange={(e) => setPageable({...pageable, pageSize: parseInt(e.target.value), pageNumber: 1})}>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                            <option value="25">25</option>
                        </select>
                        <h5 className="py-2 text-sm sm:text-base">{useI18n('pagination.entriesPerPage')}</h5>
                    </div>
                    <div className="flex gap-2 sm:gap-4">
                        <div className="relative">
                            <input id="filter-input" className="h-10 w-[200px] p-2 pr-9 rounded-lg bg-input focus:outline-none text-sm sm:text-base" type="input" placeholder={useI18n('filter.search')} 
                                   value={filter} onChange={(e) => { setFilter(e.target.value) }} 
                            />
                            { filter.length > 0 && 
                                <span className="absolute right-0 top-1/2 -translate-y-1/2 p-2 cursor-pointer" 
                                      onClick={() => {setFilter('')}}
                                >
                                    <MdClear className="size-5"/>
                                </span>
                            }
                        </div>
                        <button className={`h-10 items-center py-2 px-5 flex gap-2 rounded-lg bg-button hover:bg-hover font-semibold text-sm sm:text-base`}
                            onClick={() => {addTodo()}}>
                            <IoMdAdd className="size-4 sm:size-5"/> {useI18n('buttons.add')}
                        </button>
                    </div>

                </div>

                <TodoList 
                    todos={todos} pageable={pageable} todoFilter={todoFilter} 
                    setTodo={setTodo} setDialogParams={setDialogParams} 
                    setOpen={setOpen} changeSort={changeSort}
                />

                <div className="flex justify-between items-center px-4 py-5">
                    <div>
                        <h5 className="text-xs sm:text-base">{
                            useI18n('pagination.pageableMessage', [
                                (pageable.totalItems === 0 ? 0 : ((pageable.pageNumber - 1) * pageable.pageSize + 1)) + '', 
                                Math.min((pageable.pageNumber - 1) * pageable.pageSize + pageable.pageSize, pageable.totalItems) + '', 
                                pageable.totalItems + ''
                            ])}
                        </h5>
                    </div>
                    <nav>
                        <ul className="flex gap-2 text-xs sm:text-base">
                            <li className={`flex justify-center items-center sm:w-8 sm:h-8 w-6 h-6 rounded-lg hover:bg-hover cursor-pointer ${pageable.pageNumber === 1 || pageable.totalItems === 0 ? 'invisible' : 'visible'}`} onClick={() => changePage(1)}>{'<'}</li> 
                            {
                                todoPages().map((pageNumber) => (
                                    <li 
                                        key={pageNumber} 
                                        className={`flex justify-center items-center sm:w-8 sm:h-8 w-6 h-6 rounded-lg ${pageable.pageNumber === pageNumber ? 'bg-hover' : 'hover:bg-hover cursor-pointer'}`}
                                        onClick={pageable.pageNumber === pageNumber ? () => {} : () => changePage(pageNumber)}>
                                        {pageNumber}
                                    </li>
                                ))
                            }
                            <li className={`flex justify-center items-center sm:w-8 sm:h-8 w-6 h-6 rounded-lg hover:bg-hover cursor-pointer ${pageable.pageNumber === Math.ceil(pageable.totalItems / pageable.pageSize) ||  pageable.totalItems === 0 ? 'invisible' : 'visible'}`} onClick={() => changePage(Math.ceil(pageable.totalItems / pageable.pageSize))}>{'>'}</li> 
                        </ul>
                    </nav>
                </div>

                <TodoModal
                    todo={todo} mode={mode} isOpen={open} setOpen={setOpen} setDialogParams={setDialogParams} actionToTodo={actionToTodo}
                />

            </div>
        </>
    )

}