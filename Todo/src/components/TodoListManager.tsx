import React, { useState } from 'react'
import {
  Box,
  Paper,
  Tabs,
  Tab,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Menu,
  MenuItem,
  Chip,
} from '@mui/material'
import {
  Add as AddIcon,
  MoreVert as MoreVertIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material'
import { TodoList } from '../types/Todo'
import { useLanguage } from '../hooks/useLanguage'

interface TodoListManagerProps {
  lists: TodoList[]
  currentListId: string
  onListChange: (listId: string) => void
  onAddList: (name: string, color: string) => void
  onDeleteList: (listId: string) => void
}

const listColors = [
  '#2196f3', '#4caf50', '#ff9800', '#f44336', 
  '#9c27b0', '#00bcd4', '#795548', '#607d8b'
]

export const TodoListManager: React.FC<TodoListManagerProps> = ({
  lists,
  currentListId,
  onListChange,
  onAddList,
  onDeleteList,
}) => {
  const [openDialog, setOpenDialog] = useState(false)
  const [newListName, setNewListName] = useState('')
  const [selectedColor, setSelectedColor] = useState(listColors[0])
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [menuListId, setMenuListId] = useState<string | null>(null)
  const { t } = useLanguage()

  const handleAddList = () => {
    if (newListName.trim()) {
      onAddList(newListName.trim(), selectedColor)
      setNewListName('')
      setSelectedColor(listColors[0])
      setOpenDialog(false)
    }
  }

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, listId: string) => {
    event.stopPropagation()
    setAnchorEl(event.currentTarget)
    setMenuListId(listId)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setMenuListId(null)
  }

  const handleDeleteList = () => {
    if (menuListId && menuListId !== 'default') {
      onDeleteList(menuListId)
    }
    handleMenuClose()
  }

  return (
    <>
      <Paper
        elevation={0}
        sx={{
          mb: 3,
          backgroundColor: 'background.paper',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', px: 2, py: 1 }}>
          <Tabs
            value={currentListId}
            onChange={(_, newValue) => onListChange(newValue)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ flex: 1 }}
          >
            {lists.map((list) => (
              <Tab
                key={list.id}
                value={list.id}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        backgroundColor: list.color,
                      }}
                    />
                    {list.name}
                    {list.id !== 'default' && (
                      <IconButton
                        size="small"
                        onClick={(e) => handleMenuClick(e, list.id)}
                        sx={{ ml: 0.5, p: 0.25 }}
                      >
                        <MoreVertIcon fontSize="small" />
                      </IconButton>
                    )}
                  </Box>
                }
                sx={{
                  textTransform: 'none',
                  minHeight: 48,
                }}
              />
            ))}
          </Tabs>
          <IconButton
            onClick={() => setOpenDialog(true)}
            sx={{
              color: 'primary.main',
              '&:hover': {
                backgroundColor: 'rgba(33, 150, 243, 0.08)',
              },
            }}
          >
            <AddIcon />
          </IconButton>
        </Box>
      </Paper>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{t.createList}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label={t.listName}
            fullWidth
            variant="outlined"
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
            sx={{ mb: 3 }}
          />
          <Box>
            <Box sx={{ mb: 2, fontWeight: 'medium' }}>选择颜色:</Box>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {listColors.map((color) => (
                <Box
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    backgroundColor: color,
                    cursor: 'pointer',
                    border: selectedColor === color ? '3px solid' : '2px solid transparent',
                    borderColor: selectedColor === color ? 'primary.main' : 'transparent',
                    '&:hover': {
                      transform: 'scale(1.1)',
                    },
                    transition: 'all 0.2s',
                  }}
                />
              ))}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>{t.cancel}</Button>
          <Button onClick={handleAddList} variant="contained">
            {t.createList}
          </Button>
        </DialogActions>
      </Dialog>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleDeleteList}>
          <DeleteIcon sx={{ mr: 1 }} />
          {t.deleteList}
        </MenuItem>
      </Menu>
    </>
  )
}