import React, { useState, useEffect } from 'react'
import { List, Paper, Typography, Box } from '@mui/material'
import { 
  Assignment as AssignmentIcon,
} from '@mui/icons-material'
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd'
import { TodoItem } from './TodoItem'
import { Todo } from '../types/Todo'
import { useLanguage } from '../hooks/useLanguage'

interface TodoListProps {
  todos: Todo[]
  onToggleTodo: (id: string) => void
  onEditTodo: (id: string, newText: string) => void
  onDeleteTodo: (id: string) => void
  onReorderTodos: (startIndex: number, endIndex: number) => void
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  onToggleTodo,
  onEditTodo,
  onDeleteTodo,
  onReorderTodos,
}) => {
  const [newTodoIds, setNewTodoIds] = useState<Set<string>>(new Set())
  const { t } = useLanguage()

  useEffect(() => {
    if (todos.length > 0) {
      const latestTodo = todos[0]
      const now = new Date()
      const todoAge = now.getTime() - latestTodo.createdAt.getTime()
      
      if (todoAge < 1000) {
        setNewTodoIds(prev => new Set(prev).add(latestTodo.id))
        setTimeout(() => {
          setNewTodoIds(prev => {
            const newSet = new Set(prev)
            newSet.delete(latestTodo.id)
            return newSet
          })
        }, 500)
      }
    }
  }, [todos])

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return
    
    const { source, destination } = result
    if (source.index === destination.index) return
    
    onReorderTodos(source.index, destination.index)
  }

  if (todos.length === 0) {
    return (
      <Paper
        elevation={0}
        sx={{
          p: 6,
          textAlign: 'center',
          backgroundColor: 'white',
          background: 'linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%)',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <AssignmentIcon
            sx={{
              fontSize: 80,
              color: '#e0e7ff',
              mb: 1,
            }}
          />
          <Typography 
            variant="h5" 
            sx={{
              color: '#6366f1',
              fontWeight: 'bold',
              mb: 1,
            }}
          >
            {t.emptyTitle}
          </Typography>
          <Typography 
            variant="body1" 
            color="text.secondary"
            sx={{ mb: 1 }}
          >
            {t.emptySubtitle}
          </Typography>
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{
              maxWidth: 300,
              lineHeight: 1.6,
              whiteSpace: 'pre-line',
            }}
          >
            {t.emptyDescription}
          </Typography>
        </Box>
      </Paper>
    )
  }

  return (
    <Paper
      elevation={0}
      sx={{
        backgroundColor: 'transparent',
      }}
    >
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="todo-list">
          {(provided, snapshot) => (
            <List
              ref={provided.innerRef}
              {...provided.droppableProps}
              sx={{
                p: 0,
                backgroundColor: snapshot.isDraggingOver ? 'action.hover' : 'transparent',
                borderRadius: 2,
                transition: 'background-color 0.2s ease',
              }}
            >
              {todos.map((todo, index) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  index={index}
                  onToggle={onToggleTodo}
                  onEdit={onEditTodo}
                  onDelete={onDeleteTodo}
                  isNew={newTodoIds.has(todo.id)}
                />
              ))}
              {provided.placeholder}
            </List>
          )}
        </Droppable>
      </DragDropContext>
    </Paper>
  )
}