import { useState } from 'react'
import type { FormEvent } from 'react'
import type { TaskStatusFilter } from '../types/task'

interface TaskFiltersProps {
  initialSearch: string
  initialStatus: TaskStatusFilter
  isLoading: boolean
  onApply: (filters: { search: string; status: TaskStatusFilter }) => void
}

export const TaskFilters = ({ initialSearch, initialStatus, isLoading, onApply }: TaskFiltersProps) => {
  const [searchValue, setSearchValue] = useState(initialSearch)
  const [statusValue, setStatusValue] = useState<TaskStatusFilter>(initialStatus)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onApply({
      search: searchValue.trim(),
      status: statusValue
    })
  }

  const handleClear = () => {
    setSearchValue('')
    setStatusValue('all')
    onApply({ search: '', status: 'all' })
  }

  return (
    <form className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_180px_auto_auto] md:items-end">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="task-search">
            Buscar
          </label>
          <input
            id="task-search"
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            placeholder="Buscar por titulo o descripcion"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-slate-500"
            disabled={isLoading}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="task-status">
            Estado
          </label>
          <select
            id="task-status"
            value={statusValue}
            onChange={(event) => setStatusValue(event.target.value as TaskStatusFilter)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-slate-500"
            disabled={isLoading}
          >
            <option value="all">Todas</option>
            <option value="completed">Completadas</option>
            <option value="pending">Pendientes</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Aplicar
        </button>

        <button
          type="button"
          onClick={handleClear}
          disabled={isLoading}
          className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Limpiar
        </button>
      </div>
    </form>
  )
}
