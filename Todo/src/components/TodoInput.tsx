import React, { useState } from 'react'
import {
  Box,
  TextField,
  Button,
  Paper,
  FormControl,
  Select,
  MenuItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Switch,
  FormControlLabel,
} from '@mui/material'
import {
  ExpandMore as ExpandMoreIcon,
  Schedule as ScheduleIcon,
  NotificationsActive as NotificationsIcon,
} from '@mui/icons-material'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { Priority, Category, Reminder } from '../types/Todo'
import { useLanguage } from '../hooks/useLanguage'

interface TodoInputProps {
  onAddTodo: (text: string, priority: Priority, category: Category, dueDate?: Date, reminder?: Reminder) => void
}

export const TodoInput: React.FC<TodoInputProps> = ({ onAddTodo }) => {
  const [inputValue, setInputValue] = useState('')
  const [priority, setPriority] = useState<Priority>('medium')
  const [category, setCategory] = useState<Category>('other')
  const [dueDate, setDueDate] = useState<Date | null>(null)
  const [reminderEnabled, setReminderEnabled] = useState(false)
  const [reminderDate, setReminderDate] = useState<Date | null>(null)
  const [notifyPerson, setNotifyPerson] = useState('')
  const [expanded, setExpanded] = useState(false)
  const { t } = useLanguage()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputValue.trim()) {
      const reminder: Reminder = {
        enabled: reminderEnabled,
        date: reminderDate || undefined,
        notifyPerson: notifyPerson.trim() || undefined,
      }
      
      onAddTodo(inputValue, priority, category, dueDate || undefined, reminder)
      
      // 重置表单
      setInputValue('')
      setPriority('medium')
      setCategory('other')
      setDueDate(null)
      setReminderEnabled(false)
      setReminderDate(null)
      setNotifyPerson('')
      setExpanded(false)
    }
  }

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        mb: 3,
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          gap: 2,
          alignItems: 'flex-start',
          flexDirection: { xs: 'column', sm: 'row' },
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder={t.inputPlaceholder}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          sx={{
            flex: { sm: 1 },
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              '& fieldset': {
                borderColor: 'transparent',
              },
              '&:hover fieldset': {
                borderColor: 'rgba(255, 255, 255, 0.8)',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'white',
              },
            },
          }}
        />
        <Box
          sx={{
            display: 'flex',
            gap: 1,
            width: { xs: '100%', sm: 'auto' },
            flexDirection: { xs: 'row', sm: 'row' },
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '0.75rem', whiteSpace: 'nowrap' }}>
              {t.priority}:
            </Typography>
            <FormControl 
              size="small"
              sx={{ 
                minWidth: { xs: 60, sm: 80 },
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  height: 40, // 确保高度一致
                  '& fieldset': {
                    borderColor: 'transparent',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.8)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'white',
                  },
                },
              }}
            >
              <Select
                value={priority}
                onChange={(e) => setPriority(e.target.value as Priority)}
                displayEmpty
                sx={{
                  height: 40, // 确保高度一致
                  '& .MuiSelect-select': {
                    fontSize: '0.75rem',
                    padding: '8px 14px',
                    display: 'flex',
                    alignItems: 'center',
                  },
                }}
              >
                <MenuItem value="high" sx={{ fontSize: '0.75rem' }}>{t.priorities.high}</MenuItem>
                <MenuItem value="medium" sx={{ fontSize: '0.75rem' }}>{t.priorities.medium}</MenuItem>
                <MenuItem value="low" sx={{ fontSize: '0.75rem' }}>{t.priorities.low}</MenuItem>
              </Select>
            </FormControl>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '0.75rem', whiteSpace: 'nowrap' }}>
              {t.category}:
            </Typography>
            <FormControl 
              size="small"
              sx={{ 
                minWidth: { xs: 60, sm: 80 },
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  height: 40, // 确保高度一致
                  '& fieldset': {
                    borderColor: 'transparent',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.8)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'white',
                  },
                },
              }}
            >
              <Select
                value={category}
                onChange={(e) => setCategory(e.target.value as Category)}
                displayEmpty
                sx={{
                  height: 40, // 确保高度一致
                  '& .MuiSelect-select': {
                    fontSize: '0.75rem',
                    padding: '8px 14px',
                    display: 'flex',
                    alignItems: 'center',
                  },
                }}
              >
                <MenuItem value="work" sx={{ fontSize: '0.75rem' }}>{t.categories.work}</MenuItem>
                <MenuItem value="personal" sx={{ fontSize: '0.75rem' }}>{t.categories.personal}</MenuItem>
                <MenuItem value="shopping" sx={{ fontSize: '0.75rem' }}>{t.categories.shopping}</MenuItem>
                <MenuItem value="health" sx={{ fontSize: '0.75rem' }}>{t.categories.health}</MenuItem>
                <MenuItem value="study" sx={{ fontSize: '0.75rem' }}>{t.categories.study}</MenuItem>
                <MenuItem value="other" sx={{ fontSize: '0.75rem' }}>{t.categories.other}</MenuItem>
              </Select>
            </FormControl>
          </Box>
          
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
              },
              minWidth: { xs: 80, sm: 120 },
              whiteSpace: 'nowrap',
              fontSize: { xs: '0.75rem', sm: '0.875rem' },
              height: 40, // 确保与其他元素高度一致
            }}
          >
            {t.addButton}
          </Button>
        </Box>
      </Box>

      <Accordion
        expanded={expanded}
        onChange={(_, isExpanded) => setExpanded(isExpanded)}
        sx={{
          mt: 2,
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          color: 'white',
          '&:before': {
            display: 'none',
          },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
          sx={{
            '& .MuiAccordionSummary-content': {
              alignItems: 'center',
              gap: 1,
            },
          }}
        >
          <ScheduleIcon />
          <Typography>高级选项</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '0.875rem', minWidth: 80 }}>
                  {t.dueDate}:
                </Typography>
                <DateTimePicker
                  value={dueDate}
                  onChange={setDueDate}
                  slotProps={{
                    textField: {
                      size: 'small',
                      placeholder: '选择截止日期',
                      sx: {
                        flex: 1,
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: 'rgba(255, 255, 255, 0.9)',
                          '& fieldset': {
                            borderColor: 'transparent',
                          },
                        },
                        '& .MuiInputLabel-root': {
                          color: 'rgba(0, 0, 0, 0.6)',
                        },
                      },
                    },
                  }}
                />
              </Box>
              
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: reminderEnabled ? 2 : 0 }}>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '0.875rem', minWidth: 80 }}>
                    {t.reminder}:
                  </Typography>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={reminderEnabled}
                        onChange={(e) => setReminderEnabled(e.target.checked)}
                        size="small"
                        sx={{
                          '& .MuiSwitch-switchBase.Mui-checked': {
                            color: 'white',
                          },
                          '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                            backgroundColor: 'rgba(255, 255, 255, 0.5)',
                          },
                        }}
                      />
                    }
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <NotificationsIcon sx={{ fontSize: '1rem' }} />
                        <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                          启用提醒
                        </Typography>
                      </Box>
                    }
                    sx={{ ml: 0 }}
                  />
                </Box>
                
                {reminderEnabled && (
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, ml: 10 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '0.875rem', minWidth: 80 }}>
                        提醒时间:
                      </Typography>
                      <DateTimePicker
                        value={reminderDate}
                        onChange={setReminderDate}
                        slotProps={{
                          textField: {
                            size: 'small',
                            placeholder: '选择提醒时间',
                            sx: {
                              flex: 1,
                              '& .MuiOutlinedInput-root': {
                                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                '& fieldset': {
                                  borderColor: 'transparent',
                                },
                              },
                              '& .MuiInputLabel-root': {
                                color: 'rgba(0, 0, 0, 0.6)',
                              },
                            },
                          },
                        }}
                      />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '0.875rem', minWidth: 80 }}>
                        {t.notifyPerson}:
                      </Typography>
                      <TextField
                        size="small"
                        value={notifyPerson}
                        onChange={(e) => setNotifyPerson(e.target.value)}
                        placeholder="输入邮箱或姓名"
                        sx={{
                          flex: 1,
                          '& .MuiOutlinedInput-root': {
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            '& fieldset': {
                              borderColor: 'transparent',
                            },
                          },
                          '& .MuiInputLabel-root': {
                            color: 'rgba(0, 0, 0, 0.6)',
                          },
                        }}
                      />
                    </Box>
                  </Box>
                )}
              </Box>
            </Box>
          </LocalizationProvider>
        </AccordionDetails>
      </Accordion>
    </Paper>
  )
}