import React, { useState } from 'react'
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Checkbox,
  Typography,
  TextField,
  Box,
  Chip,
  Slide,
  Grow,
} from '@mui/material'
import { 
  Delete as DeleteIcon, 
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Schedule as ScheduleIcon,
  NotificationsActive as NotificationsIcon,
  DragIndicator as DragIcon,
} from '@mui/icons-material'
import { Draggable } from 'react-beautiful-dnd'
import { format, isToday, isTomorrow, isPast } from 'date-fns'
import { Todo, Priority, Category } from '../types/Todo'
import { useLanguage } from '../hooks/useLanguage'

interface TodoItemProps {
  todo: Todo
  index: number
  onToggle: (id: string) => void
  onEdit: (id: string, newText: string) => void
  onDelete: (id: string) => void
  isNew?: boolean
}

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  index,
  onToggle,
  onEdit,
  onDelete,
  isNew = false,
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)
  const [isDeleting, setIsDeleting] = useState(false)
  const { t } = useLanguage()

  const handleSave = () => {
    if (editText.trim()) {
      onEdit(todo.id, editText)
      setIsEditing(false)
    }
  }

  const handleCancel = () => {
    setEditText(todo.text)
    setIsEditing(false)
  }

  const handleDelete = () => {
    setIsDeleting(true)
    setTimeout(() => {
      onDelete(todo.id)
    }, 300)
  }

  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case 'high': return '#f44336'
      case 'medium': return '#ff9800'
      case 'low': return '#4caf50'
      default: return '#ff9800'
    }
  }

  const getCategoryColor = (category: Category) => {
    switch (category) {
      case 'work': return '#2196f3'
      case 'personal': return '#9c27b0'
      case 'shopping': return '#ff5722'
      case 'health': return '#4caf50'
      case 'study': return '#ff9800'
      case 'other': return '#607d8b'
      default: return '#607d8b'
    }
  }

  const getDueDateInfo = () => {
    if (!todo.dueDate) return null
    
    const now = new Date()
    const isOverdue = isPast(todo.dueDate) && !isToday(todo.dueDate)
    
    let label = ''
    let color = ''
    
    if (isOverdue) {
      label = t.overdue
      color = '#f44336'
    } else if (isToday(todo.dueDate)) {
      label = t.dueToday
      color = '#ff9800'
    } else if (isTomorrow(todo.dueDate)) {
      label = t.dueTomorrow
      color = '#2196f3'
    } else {
      label = format(todo.dueDate, 'MM/dd')
      color = '#757575'
    }
    
    return { label, color, isOverdue }
  }

  const dueDateInfo = getDueDateInfo()
  return (
    <Draggable draggableId={todo.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <Slide direction="left" in={!isDeleting} timeout={300}>
            <Grow in={true} timeout={isNew ? 500 : 0}>
              <ListItem
                disablePadding
                sx={{
                  mb: 1,
                  borderRadius: 2,
                  overflow: 'hidden',
                  backgroundColor: snapshot.isDragging ? 'action.hover' : 'background.paper',
                  boxShadow: snapshot.isDragging 
                    ? '0 8px 24px rgba(0, 0, 0, 0.15)' 
                    : '0 2px 8px rgba(0, 0, 0, 0.06)',
                  '&:hover': {
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  },
                  transition: 'all 0.2s ease-in-out',
                  borderLeft: `4px solid ${getPriorityColor(todo.priority)}`,
                  transform: snapshot.isDragging ? 'rotate(2deg)' : 'none',
                }}
              >
                <ListItemButton
                  onClick={() => !isEditing && onToggle(todo.id)}
                  sx={{
                    py: 2,
                    '&:hover': {
                      backgroundColor: 'rgba(33, 150, 243, 0.04)',
                    },
                  }}
                  disabled={isEditing}
                >
                  <Box
                    {...provided.dragHandleProps}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      mr: 1,
                      cursor: 'grab',
                      '&:active': {
                        cursor: 'grabbing',
                      },
                    }}
                  >
                    <DragIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                  </Box>
                  
                  <ListItemIcon sx={{ minWidth: 48 }}>
                    <Checkbox
                      checked={todo.completed}
                      sx={{
                        color: 'primary.main',
                        '&.Mui-checked': {
                          color: 'primary.main',
                        },
                      }}
                    />
                  </ListItemIcon>
                  
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        {isEditing ? (
                          <TextField
                            fullWidth
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                handleSave()
                              } else if (e.key === 'Escape') {
                                handleCancel()
                              }
                            }}
                            size="small"
                            autoFocus
                            onClick={(e) => e.stopPropagation()}
                          />
                        ) : (
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                            <Typography
                              variant="body1"
                              sx={{
                                textDecoration: todo.completed ? 'line-through' : 'none',
                                color: todo.completed ? 'text.secondary' : 'text.primary',
                                opacity: todo.completed ? 0.6 : 1,
                                transition: 'all 0.2s ease-in-out',
                                flex: 1,
                                minWidth: 0,
                                wordBreak: 'break-word',
                              }}
                            >
                              {todo.text}
                            </Typography>
                          </Box>
                        )}
                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
                          <Chip
                            label={t.priorities[todo.priority]}
                            size="small"
                            sx={{
                              backgroundColor: `${getPriorityColor(todo.priority)}20`,
                              color: getPriorityColor(todo.priority),
                              fontWeight: 'bold',
                              fontSize: '0.75rem',
                              height: 24,
                              flexShrink: 0,
                            }}
                          />
                          <Chip
                            label={t.categories[todo.category]}
                            size="small"
                            sx={{
                              backgroundColor: `${getCategoryColor(todo.category)}20`,
                              color: getCategoryColor(todo.category),
                              fontWeight: 'bold',
                              fontSize: '0.75rem',
                              height: 24,
                              flexShrink: 0,
                            }}
                          />
                          {dueDateInfo && (
                            <Chip
                              icon={<ScheduleIcon sx={{ fontSize: '0.75rem' }} />}
                              label={dueDateInfo.label}
                              size="small"
                              sx={{
                                backgroundColor: `${dueDateInfo.color}20`,
                                color: dueDateInfo.color,
                                fontWeight: 'bold',
                                fontSize: '0.75rem',
                                height: 24,
                                flexShrink: 0,
                                ...(dueDateInfo.isOverdue && {
                                  animation: 'pulse 2s infinite',
                                  '@keyframes pulse': {
                                    '0%': { opacity: 1 },
                                    '50%': { opacity: 0.7 },
                                    '100%': { opacity: 1 },
                                  },
                                }),
                              }}
                            />
                          )}
                          {todo.reminder.enabled && (
                            <Chip
                              icon={<NotificationsIcon sx={{ fontSize: '0.75rem' }} />}
                              label={t.reminderSet}
                              size="small"
                              sx={{
                                backgroundColor: 'rgba(156, 39, 176, 0.2)',
                                color: '#9c27b0',
                                fontWeight: 'bold',
                                fontSize: '0.75rem',
                                height: 24,
                                flexShrink: 0,
                              }}
                            />
                          )}
                        </Box>
                      </Box>
                    }
                  />
                  
                  <Box sx={{ 
                    display: 'flex', 
                    gap: { xs: 0.5, sm: 1 },
                    flexShrink: 0,
                  }}>
                    {isEditing ? (
                      <>
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleSave()
                          }}
                          sx={{
                            color: 'success.main',
                            '&:hover': {
                              backgroundColor: 'rgba(76, 175, 80, 0.08)',
                            },
                          }}
                        >
                          <SaveIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleCancel()
                          }}
                          sx={{
                            color: 'text.secondary',
                            '&:hover': {
                              backgroundColor: 'rgba(0, 0, 0, 0.08)',
                            },
                          }}
                        >
                          <CancelIcon fontSize="small" />
                        </IconButton>
                      </>
                    ) : (
                      <>
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation()
                            setIsEditing(true)
                          }}
                          sx={{
                            color: 'primary.main',
                            '&:hover': {
                              backgroundColor: 'rgba(33, 150, 243, 0.08)',
                            },
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDelete()
                          }}
                          sx={{
                            color: 'error.main',
                            '&:hover': {
                              backgroundColor: 'rgba(244, 67, 54, 0.08)',
                            },
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </>
                    )}
                  </Box>
                </ListItemButton>
              </ListItem>
            </Grow>
          </Slide>
        </div>
      )}
    </Draggable>
  )
}