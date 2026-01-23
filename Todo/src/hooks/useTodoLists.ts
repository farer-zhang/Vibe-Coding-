import { useState, useEffect } from 'react'
import { TodoList } from '../types/Todo'

const LISTS_KEY = 'todo-lists'

const defaultList: TodoList = {
  id: 'default',
  name: '默认列表',
  color: '#2196f3',
  createdAt: new Date(),
}

export const useTodoLists = () => {
  const [lists, setLists] = useState<TodoList[]>([])
  const [currentListId, setCurrentListId] = useState('default')

  useEffect(() => {
    const savedLists = localStorage.getItem(LISTS_KEY)
    if (savedLists) {
      try {
        const parsedLists = JSON.parse(savedLists).map((list: any) => ({
          ...list,
          createdAt: new Date(list.createdAt),
        }))
        setLists(parsedLists)
      } catch (error) {
        console.error('Failed to parse lists from localStorage:', error)
        setLists([defaultList])
      }
    } else {
      setLists([defaultList])
    }
  }, [])

  useEffect(() => {
    if (lists.length > 0) {
      localStorage.setItem(LISTS_KEY, JSON.stringify(lists))
    }
  }, [lists])

  const addList = (name: string, color: string = '#2196f3') => {
    const newList: TodoList = {
      id: Date.now().toString(),
      name: name.trim(),
      color,
      createdAt: new Date(),
    }
    setLists(prev => [...prev, newList])
    return newList.id
  }

  const deleteList = (listId: string) => {
    if (listId === 'default') return // 不能删除默认列表
    setLists(prev => prev.filter(list => list.id !== listId))
    if (currentListId === listId) {
      setCurrentListId('default')
    }
  }

  const updateList = (listId: string, updates: Partial<TodoList>) => {
    setLists(prev => prev.map(list => 
      list.id === listId ? { ...list, ...updates } : list
    ))
  }

  const currentList = lists.find(list => list.id === currentListId) || lists[0]

  return {
    lists,
    currentListId,
    currentList,
    setCurrentListId,
    addList,
    deleteList,
    updateList,
  }
}