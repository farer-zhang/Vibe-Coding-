export type Priority = 'high' | 'medium' | 'low'
export type Category = 'work' | 'personal' | 'shopping' | 'health' | 'study' | 'other'

export interface Reminder {
  enabled: boolean
  date?: Date
  notifyPerson?: string
}

export interface Todo {
  id: string
  text: string
  completed: boolean
  priority: Priority
  category: Category
  dueDate?: Date
  reminder: Reminder
  createdAt: Date
  order: number
  listId: string
}

export interface TodoList {
  id: string
  name: string
  color: string
  createdAt: Date
}