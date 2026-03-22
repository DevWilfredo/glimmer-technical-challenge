import { useCallback, useEffect, useState } from 'react'
import { EditTaskModal } from '../components/EditTaskModal'
import { PaginationControls } from '../components/PaginationControls'
import { TaskFilters } from '../components/TaskFilters'
import { TaskForm } from '../components/TaskForm'
import { TaskList } from '../components/TaskList'
import { tasksService } from '../services/tasks.service'
import type {
  CreateTaskInput,
  ListTasksQuery,
  Task,
  TaskStatusFilter,
  TasksPagination,
  UpdateTaskInput
} from '../types/task'

const getMessage = (error: unknown) => {
  if (error instanceof Error) {
    return error.message
  }

  return 'Ocurrio un error inesperado.'
}

const DEFAULT_LIMIT = 5

const INITIAL_PAGINATION: TasksPagination = {
  page: 1,
  limit: DEFAULT_LIMIT,
  total: 0,
  totalPages: 1,
  hasNextPage: false,
  hasPreviousPage: false
}

export const TasksPage = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [pagination, setPagination] = useState<TasksPagination>(INITIAL_PAGINATION)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [busyTaskId, setBusyTaskId] = useState<number | null>(null)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [refreshKey, setRefreshKey] = useState(0)
  const [query, setQuery] = useState<ListTasksQuery>({
    page: 1,
    limit: DEFAULT_LIMIT,
    search: '',
    status: 'all'
  })

  const loadTasks = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await tasksService.list(query)
      setTasks(response.data)
      setPagination(response.pagination)
    } catch (requestError) {
      setError(getMessage(requestError))
      setTasks([])
      setPagination(INITIAL_PAGINATION)
    } finally {
      setIsLoading(false)
    }
  }, [query])

  useEffect(() => {
    void loadTasks()
  }, [loadTasks, refreshKey])

  const refetch = () => {
    setRefreshKey((previousKey) => previousKey + 1)
  }

  const handleCreateTask = async (payload: CreateTaskInput) => {
    setIsSubmitting(true)
    setError(null)

    try {
      await tasksService.create(payload)
      setIsCreateModalOpen(false)
      if ((query.page ?? 1) === 1) {
        refetch()
      } else {
        setQuery((previousQuery) => ({
          ...previousQuery,
          page: 1
        }))
      }
    } catch (requestError) {
      setError(getMessage(requestError))
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleToggleTask = async (task: Task) => {
    setBusyTaskId(task.id)
    setError(null)

    try {
      await tasksService.update(task.id, {
        completed: !task.completed
      })
      refetch()
    } catch (requestError) {
      setError(getMessage(requestError))
    } finally {
      setBusyTaskId(null)
    }
  }

  const handleDeleteTask = async (task: Task) => {
    setBusyTaskId(task.id)
    setError(null)

    try {
      await tasksService.remove(task.id)
      refetch()
    } catch (requestError) {
      setError(getMessage(requestError))
    } finally {
      setBusyTaskId(null)
    }
  }

  const handleOpenEditTask = (task: Task) => {
    setError(null)
    setEditingTask(task)
  }

  const handleCloseEditTask = () => {
    if (isEditing) {
      return
    }

    setEditingTask(null)
  }

  const handleSaveEditedTask = async (payload: UpdateTaskInput) => {
    if (!editingTask) {
      return
    }

    setIsEditing(true)
    setError(null)

    try {
      await tasksService.update(editingTask.id, payload)
      setEditingTask(null)
      refetch()
    } catch (requestError) {
      setError(getMessage(requestError))
    } finally {
      setIsEditing(false)
    }
  }

  const handleApplyFilters = ({ search, status }: { search: string; status: TaskStatusFilter }) => {
    setQuery((previousQuery) => ({
      ...previousQuery,
      page: 1,
      search,
      status
    }))
  }

  const handlePageChange = (page: number) => {
    setQuery((previousQuery) => ({
      ...previousQuery,
      page
    }))
  }

  const handleOpenCreateTask = () => {
    setError(null)
    setIsCreateModalOpen(true)
  }

  const handleCloseCreateTask = () => {
    if (isSubmitting) {
      return
    }

    setIsCreateModalOpen(false)
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10 text-slate-900">
      <section className="mx-auto w-full max-w-2xl space-y-5">
        <header className="flex items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold">Task Manager</h1>
            <p className="mt-1 text-sm text-slate-600">
              Tareas encontradas: <span className="font-semibold text-slate-800">{pagination.total}</span>
            </p>
          </div>
          <button
            type="button"
            onClick={handleOpenCreateTask}
            className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
          >
            Nueva tarea
          </button>
        </header>

        <TaskFilters
          initialSearch={query.search ?? ''}
          initialStatus={query.status ?? 'all'}
          isLoading={isLoading}
          onApply={handleApplyFilters}
        />

        {error ? (
          <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>
        ) : null}

        {isLoading ? (
          <div className="rounded-xl border border-slate-200 bg-white p-6 text-center text-sm text-slate-500">
            Cargando tareas...
          </div>
        ) : (
          <TaskList
            tasks={tasks}
            busyTaskId={busyTaskId}
            onToggle={handleToggleTask}
            onDelete={handleDeleteTask}
            onEdit={handleOpenEditTask}
          />
        )}

        <PaginationControls pagination={pagination} isLoading={isLoading} onPageChange={handlePageChange} />

        <EditTaskModal
          key={editingTask?.id ?? 'closed'}
          task={editingTask}
          isSubmitting={isEditing}
          onClose={handleCloseEditTask}
          onSave={handleSaveEditedTask}
        />

        <TaskForm
          isOpen={isCreateModalOpen}
          isSubmitting={isSubmitting}
          onClose={handleCloseCreateTask}
          onCreate={handleCreateTask}
        />
      </section>
    </main>
  )
}
