import type { Task } from '../types/task'
import { TaskItem } from './TaskItem'

interface TaskListProps {
  tasks: Task[]
  busyTaskId: number | null
  onToggle: (task: Task) => Promise<void>
  onDelete: (task: Task) => Promise<void>
  onEdit: (task: Task) => void
}

export const TaskList = ({ tasks, busyTaskId, onToggle, onDelete, onEdit }: TaskListProps) => {
  if (!tasks.length) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-white p-6 text-center text-sm text-slate-500">
        Aun no hay tareas. Crea la primera.
      </div>
    )
  }

  return (
    <ul className="space-y-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          isBusy={busyTaskId === task.id}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  )
}
