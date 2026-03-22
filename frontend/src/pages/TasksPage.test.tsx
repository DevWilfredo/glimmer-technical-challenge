import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { tasksService } from '../services/tasks.service'
import { TasksPage } from './TasksPage'

vi.mock('../services/tasks.service', () => ({
  tasksService: {
    list: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    remove: vi.fn()
  }
}))

const mockedTasksService = vi.mocked(tasksService)

const emptyListResponse = {
  data: [],
  pagination: {
    page: 1,
    limit: 5,
    total: 0,
    totalPages: 1,
    hasNextPage: false,
    hasPreviousPage: false
  }
}

describe('TasksPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('muestra tareas al cargar la pagina', async () => {
    mockedTasksService.list.mockResolvedValueOnce({
      data: [
        {
          id: 1,
          title: 'Comprar cafe',
          description: 'Ir al super',
          completed: false,
          created_at: new Date().toISOString()
        }
      ],
      pagination: {
        page: 1,
        limit: 5,
        total: 1,
        totalPages: 1,
        hasNextPage: false,
        hasPreviousPage: false
      }
    })

    render(<TasksPage />)

    await waitFor(() => expect(mockedTasksService.list).toHaveBeenCalled())
    expect(await screen.findByText('Comprar cafe')).toBeInTheDocument()
  })

  it('crea una tarea desde el modal', async () => {
    const user = userEvent.setup()

    mockedTasksService.list
      .mockResolvedValueOnce(emptyListResponse)
      .mockResolvedValueOnce({
        data: [
          {
            id: 99,
            title: 'Mi tarea nueva',
            description: 'Descripcion nueva',
            completed: false,
            created_at: new Date().toISOString()
          }
        ],
        pagination: {
          page: 1,
          limit: 5,
          total: 1,
          totalPages: 1,
          hasNextPage: false,
          hasPreviousPage: false
        }
      })

    mockedTasksService.create.mockResolvedValueOnce({
      id: 99,
      title: 'Mi tarea nueva',
      description: 'Descripcion nueva',
      completed: false,
      created_at: new Date().toISOString()
    })

    render(<TasksPage />)

    await waitFor(() => expect(mockedTasksService.list).toHaveBeenCalledTimes(1))

    await user.click(screen.getByRole('button', { name: 'Nueva tarea' }))
    expect(screen.getByRole('dialog')).toBeInTheDocument()

    await user.type(screen.getByLabelText('Titulo de la tarea'), 'Mi tarea nueva')
    await user.type(screen.getByLabelText('Descripcion de la tarea'), 'Descripcion nueva')
    await user.click(screen.getByRole('button', { name: 'Crear tarea' }))

    await waitFor(() => expect(mockedTasksService.create).toHaveBeenCalled())

    await waitFor(() => expect(mockedTasksService.list).toHaveBeenCalledTimes(2))
    expect(await screen.findByText('Mi tarea nueva')).toBeInTheDocument()
  })
})
