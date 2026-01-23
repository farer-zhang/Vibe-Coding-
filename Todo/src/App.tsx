import React from 'react'
import { Container, Typography, Box, IconButton } from '@mui/material'
import { 
  ChecklistRtl as ChecklistIcon, 
  Language as LanguageIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
} from '@mui/icons-material'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { TodoInput } from './components/TodoInput'
import { TodoFilters } from './components/TodoFilters'
import { TodoList } from './components/TodoList'
import { TodoStats } from './components/TodoStats'
import { TodoListManager } from './components/TodoListManager'
import { useTodos } from './hooks/useTodos'
import { useTodoLists } from './hooks/useTodoLists'
import { useLanguage } from './hooks/useLanguage'
import { useTheme } from './hooks/useTheme'

const App: React.FC = () => {
  const { isDarkMode, toggleTheme, theme } = useTheme()
  const { t, toggleLanguage } = useLanguage()
  const {
    lists,
    currentListId,
    currentList,
    setCurrentListId,
    addList,
    deleteList,
  } = useTodoLists()

  const {
    todos,
    allTodos,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    addTodo,
    toggleTodo,
    editTodo,
    deleteTodo,
    reorderTodos,
    clearCompleted,
    clearAll,
    exportTodos,
    completedCount,
    uncompletedCount,
  } = useTodos(currentListId)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          background: isDarkMode 
            ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
            : 'linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%)',
          py: { xs: 2, sm: 4 },
          px: { xs: 1, sm: 0 },
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center', mb: { xs: 3, sm: 4 }, position: 'relative' }}>
            <Box sx={{ 
              position: 'absolute',
              top: 0,
              right: 0,
              display: 'flex',
              gap: 1,
            }}>
              <IconButton
                onClick={toggleTheme}
                sx={{
                  color: '#667eea',
                  '&:hover': {
                    backgroundColor: 'rgba(102, 126, 234, 0.1)',
                  },
                }}
              >
                {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
              <IconButton
                onClick={toggleLanguage}
                sx={{
                  color: '#667eea',
                  '&:hover': {
                    backgroundColor: 'rgba(102, 126, 234, 0.1)',
                  },
                }}
              >
                <LanguageIcon />
              </IconButton>
            </Box>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              mb: 2,
              flexDirection: { xs: 'column', sm: 'row' },
              gap: { xs: 1, sm: 2 },
            }}>
              <ChecklistIcon 
                sx={{ 
                  fontSize: { xs: 40, sm: 48 }, 
                  color: '#667eea',
                }} 
              />
              <Typography
                variant="h3"
                component="h1"
                sx={{
                  fontWeight: 'bold',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontSize: { xs: '2rem', sm: '3rem' },
                }}
              >
                {t.title}
              </Typography>
            </Box>
            <Typography 
              variant="subtitle1" 
              color="text.secondary"
              sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}
            >
              {t.subtitle}
            </Typography>
          </Box>

          <TodoListManager
            lists={lists}
            currentListId={currentListId}
            onListChange={setCurrentListId}
            onAddList={addList}
            onDeleteList={deleteList}
          />
          
          <TodoInput onAddTodo={addTodo} />
          
          <TodoFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
          
          <TodoStats
            completedCount={completedCount}
            uncompletedCount={uncompletedCount}
            totalCount={allTodos.length}
            onClearCompleted={clearCompleted}
            onClearAll={clearAll}
            onExport={exportTodos}
          />
          
          <TodoList
            todos={todos}
            onToggleTodo={toggleTodo}
            onEditTodo={editTodo}
            onDeleteTodo={deleteTodo}
            onReorderTodos={reorderTodos}
          />
        </Container>
      </Box>
    </ThemeProvider>
  )
}

export default App