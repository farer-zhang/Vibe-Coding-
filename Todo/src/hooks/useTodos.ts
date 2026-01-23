import { useState, useEffect, useMemo } from 'react'
import { Todo, Priority, Category, Reminder } from '../types/Todo'

const STORAGE_KEY = 'todos'

export const useTodos = (currentListId: string) => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all')

  // 从本地存储加载数据
  useEffect(() => {
    const savedTodos = localStorage.getItem(STORAGE_KEY)
    if (savedTodos) {
      try {
        const parsedTodos = JSON.parse(savedTodos).map((todo: any) => ({
          ...todo,
          createdAt: new Date(todo.createdAt),
          dueDate: todo.dueDate ? new Date(todo.dueDate) : undefined,
          reminder: {
            enabled: todo.reminder?.enabled || false,
            date: todo.reminder?.date ? new Date(todo.reminder.date) : undefined,
            notifyPerson: todo.reminder?.notifyPerson || '',
          },
          category: todo.category || 'other',
          order: todo.order || 0,
          listId: todo.listId || 'default',
        }))
        setTodos(parsedTodos)
      } catch (error) {
        console.error('Failed to parse todos from localStorage:', error)
      }
    }
  }, [])

  // 保存到本地存储
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  const addTodo = (
    text: string, 
    priority: Priority = 'medium', 
    category: Category = 'other',
    dueDate?: Date,
    reminder: Reminder = { enabled: false }
  ) => {
    const maxOrder = Math.max(...todos.filter(t => t.listId === currentListId).map(t => t.order), -1)
    const newTodo: Todo = {
      id: Date.now().toString(),
      text: text.trim(),
      completed: false,
      priority,
      category,
      dueDate,
      reminder,
      createdAt: new Date(),
      order: maxOrder + 1,
      listId: currentListId,
    }
    setTodos((prev) => [newTodo, ...prev])
  }

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  const editTodo = (id: string, newText: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, text: newText.trim() } : todo
      )
    )
  }

  const updateTodo = (id: string, updates: Partial<Todo>) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, ...updates } : todo
      )
    )
  }

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const reorderTodos = (startIndex: number, endIndex: number) => {
    const currentListTodos = todos.filter(todo => todo.listId === currentListId)
    const result = Array.from(currentListTodos)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    const reorderedTodos = result.map((todo, index) => ({
      ...todo,
      order: index,
    }))

    setTodos(prev => [
      ...prev.filter(todo => todo.listId !== currentListId),
      ...reorderedTodos,
    ])
  }

  const clearCompleted = () => {
    setTodos((prev) => prev.filter((todo) => !todo.completed || todo.listId !== currentListId))
  }

  const clearAll = () => {
    setTodos((prev) => prev.filter((todo) => todo.listId !== currentListId))
  }

  const exportTodos = () => {
    const currentListTodos = todos.filter(todo => todo.listId === currentListId)
    const dataStr = JSON.stringify(currentListTodos, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `todos-${currentListId}-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  // 当前列表的任务
  const currentListTodos = useMemo(() => {
    return todos
      .filter(todo => todo.listId === currentListId)
      .sort((a, b) => a.order - b.order)
  }, [todos, currentListId])

  // 过滤后的任务列表
  const filteredTodos = useMemo(() => {
    return currentListTodos.filter((todo) => {
      const matchesSearch = todo.text.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === 'all' || todo.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [currentListTodos, searchQuery, selectedCategory])

  const completedCount = currentListTodos.filter((todo) => todo.completed).length
  const uncompletedCount = currentListTodos.filter((todo) => !todo.completed).length

  // 检查提醒
  const checkReminders = () => {
    const now = new Date()
    return currentListTodos.filter(todo => {
      if (!todo.reminder.enabled || !todo.reminder.date || todo.completed) {
        return false
      }
      return todo.reminder.date <= now
    })
  }

  return {
    todos: filteredTodos,
    allTodos: currentListTodos,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    addTodo,
    toggleTodo,
    editTodo,
    updateTodo,
    deleteTodo,
    reorderTodos,
    clearCompleted,
    clearAll,
    exportTodos,
    checkReminders,
    completedCount,
    uncompletedCount,
  }
}