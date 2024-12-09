import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { Todo } from './components/todo/todo'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className="sm:container sm:w-full mx-auto w-[400px]">
      <Todo />
    </div>
  </StrictMode>,
)