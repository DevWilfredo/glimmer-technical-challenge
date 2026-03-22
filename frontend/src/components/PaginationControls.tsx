import type { TasksPagination } from '../types/task'

interface PaginationControlsProps {
  pagination: TasksPagination
  isLoading: boolean
  onPageChange: (page: number) => void
}

export const PaginationControls = ({ pagination, isLoading, onPageChange }: PaginationControlsProps) => {
  return (
    <div className="flex flex-col gap-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-slate-600">
        Pagina <span className="font-semibold text-slate-800">{pagination.page}</span> de{' '}
        <span className="font-semibold text-slate-800">{pagination.totalPages}</span> | Total:{' '}
        <span className="font-semibold text-slate-800">{pagination.total}</span>
      </p>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onPageChange(pagination.page - 1)}
          disabled={!pagination.hasPreviousPage || isLoading}
          className="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Anterior
        </button>

        <button
          type="button"
          onClick={() => onPageChange(pagination.page + 1)}
          disabled={!pagination.hasNextPage || isLoading}
          className="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Siguiente
        </button>
      </div>
    </div>
  )
}
