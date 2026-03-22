export interface Task {
  id: number
  title: string
  description: string | null
  completed: boolean
  created_at: string
}

export interface TasksPagination {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}

export interface TasksListResponse {
  data: Task[]
  pagination: TasksPagination
}

export type TaskStatusFilter = 'all' | 'completed' | 'pending'

export interface CreateTaskInput {
  title: string
  description?: string
}

export interface UpdateTaskInput {
  title?: string
  description?: string
  completed?: boolean
}

export interface ListTasksQuery {
  page?: number
  limit?: number
  search?: string
  status?: TaskStatusFilter
}
