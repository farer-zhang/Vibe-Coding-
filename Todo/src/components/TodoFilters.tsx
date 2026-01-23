import React from 'react'
import {
  Box,
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
} from '@mui/material'
import { Search as SearchIcon } from '@mui/icons-material'
import { Category } from '../types/Todo'
import { useLanguage } from '../hooks/useLanguage'

interface TodoFiltersProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  selectedCategory: Category | 'all'
  onCategoryChange: (category: Category | 'all') => void
}

export const TodoFilters: React.FC<TodoFiltersProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
}) => {
  const { t } = useLanguage()

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        mb: 3,
        backgroundColor: 'white',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          alignItems: 'center',
          flexDirection: { xs: 'column', sm: 'row' },
        }}
      >
        <TextField
          fullWidth
          size="small"
          placeholder={t.search}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              height: 40, // 确保高度一致
            },
          }}
        />
        <FormControl sx={{ minWidth: { xs: '100%', sm: 150 } }}>
          <InputLabel>分类筛选</InputLabel>
          <Select
            value={selectedCategory}
            label="分类筛选"
            onChange={(e) => onCategoryChange(e.target.value as Category | 'all')}
            sx={{
              borderRadius: 2,
              height: 40, // 确保高度一致
            }}
          >
            <MenuItem value="all">🔍 全部</MenuItem>
            <MenuItem value="work">{t.categories.work}</MenuItem>
            <MenuItem value="personal">{t.categories.personal}</MenuItem>
            <MenuItem value="shopping">{t.categories.shopping}</MenuItem>
            <MenuItem value="health">{t.categories.health}</MenuItem>
            <MenuItem value="study">{t.categories.study}</MenuItem>
            <MenuItem value="other">{t.categories.other}</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Paper>
  )
}