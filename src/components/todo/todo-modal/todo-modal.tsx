import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react"
import { DialogParams, TodoTO } from "../../../global-interface";
import { useI18n } from "../../../hook/i18ntranslate";

interface TodoModalParams {
    todo: TodoTO;
    mode: DialogParams['mode'];
    isOpen: boolean;
    setOpen: (open: boolean) => void;
    setDialogParams: (params: DialogParams) => void;
    actionToTodo: (todo: TodoTO) => void;
}

export function TodoModal({todo, mode, isOpen, setOpen, setDialogParams, actionToTodo} : TodoModalParams) {

    const size = () : string => {
        return mode === 'delete' || (mode === 'edit' && todo.done === true) ? 'w-4/6 sm:w-3/6 ' : 'w5/6 sm:w-4/6'
    }

    return (
        <Dialog open={isOpen} onClose={setOpen} className="relative z-10">
                    
            <DialogBackdrop transition 
                className={`
                    fixed inset-0 bg-gray-500/75 transition-opacity 
                    data-[closed]:opacity-0 data-[enter]:duration-300 
                    data-[leave]:duration-200 data-[enter]:ease-out 
                    data-[leave]:ease-in`}
            />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto container mx-auto">
                <div className="flex min-h-full justify-center p-4 text-center items-center">

                    <DialogPanel
                        transition
                        className={`
                            relative transform overflow-hidden bg-section rounded-lg text-left transition-all 
                            data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 
                            data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in ${size()}
                        `}
                    >
                        <div className="px-6 pb-3 pt-7">
                            <div className="mx-3">
                                <DialogTitle as="h3" className="text-sm sm:text-base font-semibold">
                                    {useI18n('modal.title.' + mode)}
                                </DialogTitle>

                                <div className="mt-5 text-sm sm:text-base">
                                    {
                                        mode === 'delete' || (mode === 'edit' && todo.done === true) ?
                                            mode === 'edit' ?
                                                <p>{useI18n('modal.editNotPossible', [todo.id + ''])}</p>
                                                :
                                                <p>{useI18n('modal.deleteConfirm', [todo.id + ''])}</p>
                                            :
                                            <textarea 
                                                className="resize-none p-2 rounded-lg bg-input w-full h-40" 
                                                placeholder={useI18n('modal.intpuPlaceholder')}
                                                value={todo.tarea}
                                                readOnly={mode === 'view'}
                                                onChange={(e) => setDialogParams({...{todo, mode}, todo: {...todo, tarea: e.target.value}})}
                                            />
                                    }
                                </div>

                            </div>
                        </div>

                        <div className="px-9 pt-2 mb-6 flex flex-row-reverse gap-4">
                            
                            { 
                                (mode === 'edit' || mode === 'add' || mode === 'delete') &&
                                <button
                                    type="button" onClick={() => setOpen(false)}
                                    className={`inline-flex justify-center rounded-md ${(mode === 'edit' && todo.done === true) ?  'bg-button' : 'bg-section'} px-3 py-2 text-sm sm:text-base font-semibold hover:bg-hover`}
                                >
                                    {useI18n('modal.buttons.cancel')}
                                </button>
                            }
                            { (mode === 'edit' && todo.done === true) == false &&
                                <button
                                    type="button" onClick={() => {
                                        if (mode === 'edit' || (mode === 'add' || mode === 'delete')) {
                                            actionToTodo(todo)
                                        }
                                        setOpen(false)
                                    }}
                                    className="inline-flex justify-center rounded-md bg-button px-3 py-2 text-sm sm:text-base font-semibold hover:bg-hover"
                                >
                                    {useI18n('modal.buttons.' + mode)}
                                </button>
                            }

                        </div>

                    </DialogPanel>

                </div>
            </div>

        </Dialog> 
    )
}


                