import type {
  CreateTaskInput,
  ListTasksQuery,
  Task,
  TaskStatusFilter,
  TasksListResponse,
  UpdateTaskInput
} from '../types/task'

const API_BASE_URL = (import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api').replace(/\/$/, '')

const statusToCompleted = (status: TaskStatusFilter) => {
  if (status === 'completed') {
    return 'true'
  }

  if (status === 'pending') {
    return 'false'
  }

  return null
}

interface ApiErrorPayload {
  message?: string
}

const getErrorMessage = async (response: Response): Promise<string> => {
  try {
    const payload = (await response.json()) as ApiErrorPayload
    return payload.message ?? `Request failed with status ${response.status}`
  } catch {
    return `Request failed with status ${response.status}`
  }
}

const request = async <T>(path: string, options?: RequestInit): Promise<T> => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers ?? {})
    }
  })

  if (!response.ok) {
    throw new Error(await getErrorMessage(response))
  }

  if (response.status === 204) {
    return undefined as T
  }

  return (await response.json()) as T
}

export const tasksService = {
  list: (query: ListTasksQuery = {}) => {
    const params = new URLSearchParams()

    if (query.page) {
      params.set('page', String(query.page))
    }

    if (query.limit) {
      params.set('limit', String(query.limit))
    }

    if (query.search) {
      params.set('search', query.search)
    }

    if (query.status) {
      const completedValue = statusToCompleted(query.status)
      if (completedValue !== null) {
        params.set('completed', completedValue)
      }
    }

    const queryString = params.toString()
    const path = queryString ? `/tasks?${queryString}` : '/tasks'
    return request<TasksListResponse>(path)
  },
  create: (payload: CreateTaskInput) =>
    request<Task>('/tasks', {
      method: 'POST',
      body: JSON.stringify(payload)
    }),
  update: (taskId: number, payload: UpdateTaskInput) =>
    request<Task>(`/tasks/${taskId}`, {
      method: 'PUT',
      body: JSON.stringify(payload)
    }),
  remove: (taskId: number) =>
    request<void>(`/tasks/${taskId}`, {
      method: 'DELETE'
    })
}
