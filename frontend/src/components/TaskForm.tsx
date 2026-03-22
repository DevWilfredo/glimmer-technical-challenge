import { useState } from 'react'
import type { FormEvent } from 'react'
import type { CreateTaskInput } from '../types/task'

interface TaskFormProps {
  isOpen: boolean
  isSubmitting: boolean
  onClose: () => void
  onCreate: (payload: CreateTaskInput) => Promise<void>
}

export const TaskForm = ({ isOpen, isSubmitting, onClose, onCreate }: TaskFormProps) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  if (!isOpen) {
    return null
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const titleValue = title.trim()
    const descriptionValue = description.trim()

    if (!titleValue) {
      return
    }

    await onCreate({
      title: titleValue,
      description: descriptionValue || undefined
    })

    setTitle('')
    setDescription('')
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4" role="dialog" aria-modal="true">
      <div className="w-full max-w-lg rounded-xl border border-slate-200 bg-white p-5 shadow-xl">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Nueva tarea</h2>
            <p className="text-sm text-slate-500">Completa los campos para crear una tarea.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="rounded-md border border-slate-300 px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Cerrar
          </button>
        </div>

        <form
          className="space-y-4"
          onSubmit={(event) => {
            void handleSubmit(event)
          }}
        >
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="create-task-title">
              Titulo de la tarea
            </label>
            <input
              id="create-task-title"
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Ej. Preparar demo"
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-slate-500"
              disabled={isSubmitting}
              maxLength={255}
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="create-task-description">
              Descripcion de la tarea
            </label>
            <textarea
              id="create-task-description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Detalles de la tarea"
              className="min-h-24 w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-slate-500"
              disabled={isSubmitting}
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? 'Guardando...' : 'Crear tarea'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
