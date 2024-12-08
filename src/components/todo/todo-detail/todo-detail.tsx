import { FaRegEdit } from "react-icons/fa";
import { IoCheckbox } from "react-icons/io5";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import { IoMdEye } from "react-icons/io";
import { TodoTO } from "../../../global-interface";

interface TodoDetailParams {
    todo: TodoTO;
    updateTodo: (taskId: number, done: boolean) => void;
    viewTodo: (todo: TodoTO) => void;
    editTodo: (todo: TodoTO) => void;
    removeTodo: (taskId: number) => void;
}

export const TodoDetail = ({todo, updateTodo, viewTodo, editTodo, removeTodo } : TodoDetailParams) => {

    return (
        <tr className="border-t border-border hover:bg-hover-table-selected-row">
            <td className="p-2 ml-4 flex" colSpan={1}>
                <span className="cursor-pointer p-2 rounded-lg hover:bg-hover" onClick={() => {updateTodo(todo.id, !todo.done)}}>{todo.done ? <IoCheckbox className="size-6"/> : <MdCheckBoxOutlineBlank className="size-6"/>}</span>
            </td>
            <td className={`px-4 py-5 ${todo.done ? 'line-through' : ''}`} colSpan={2}>{todo.tarea}</td>
            <td className="px-2 py-3 flex justify-start align-middle space-x-4" colSpan={1}>
                <span className="cursor-pointer p-2 rounded-lg hover:bg-hover" onClick={() => {viewTodo(todo)}}><IoMdEye className="size-6"/></span>
                <span className="cursor-pointer p-2 pl-3 rounded-lg hover:bg-hover" onClick={() => {editTodo(todo)}}><FaRegEdit className="size-6"/></span>
                <span className="cursor-pointer p-2 rounded-lg hover:bg-hover hover:text-red-500" onClick={() => {removeTodo(todo.id)}}><RiDeleteBin5Line className="size-6"/></span>
            </td>
        </tr>
    )
}