import type { Task } from '../types/task'
import { formatDate } from '../utils/format'

interface TaskItemProps {
  task: Task
  isBusy: boolean
  onToggle: (task: Task) => Promise<void>
  onDelete: (task: Task) => Promise<void>
  onEdit: (task: Task) => void
}

export const TaskItem = ({ task, isBusy, onToggle, onDelete, onEdit }: TaskItemProps) => {
  return (
    <li className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 flex-1 gap-3">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => {
              void onToggle(task)
            }}
            className="mt-1 h-4 w-4 accent-slate-800"
            disabled={isBusy}
            aria-label={`Marcar ${task.title} como ${task.completed ? 'pendiente' : 'completada'}`}
          />

          <div className="min-w-0">
            <p className={`text-sm font-semibold ${task.completed ? 'text-slate-400 line-through' : 'text-slate-800'}`}>
              {task.title}
            </p>

            {task.description ? (
              <p className={`mt-1 text-sm ${task.completed ? 'text-slate-400' : 'text-slate-600'}`}>{task.description}</p>
            ) : (
              <p className="mt-1 text-sm text-slate-400">Sin descripcion</p>
            )}

            <p className="mt-2 text-xs text-slate-400">Creada: {formatDate(task.created_at)}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onEdit(task)}
            disabled={isBusy}
            className="rounded-md border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Editar
          </button>
          <button
            type="button"
            onClick={() => {
              void onDelete(task)
            }}
            disabled={isBusy}
            className="rounded-md border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Eliminar
          </button>
        </div>
      </div>
    </li>
  )
}
