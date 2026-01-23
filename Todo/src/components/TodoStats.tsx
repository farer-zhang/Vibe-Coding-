import React, { useState } from 'react'
import { 
  Box, 
  Paper, 
  Typography, 
  Chip, 
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from '@mui/material'
import {
  CheckCircle as CheckCircleIcon,
  RadioButtonUnchecked as RadioButtonUncheckedIcon,
  ClearAll as ClearAllIcon,
  DeleteSweep as DeleteSweepIcon,
  Download as DownloadIcon,
} from '@mui/icons-material'
import { useLanguage } from '../hooks/useLanguage'

interface TodoStatsProps {
  completedCount: number
  uncompletedCount: number
  totalCount: number
  onClearCompleted: () => void
  onClearAll: () => void
  onExport: () => void
}

export const TodoStats: React.FC<TodoStatsProps> = ({
  completedCount,
  uncompletedCount,
  totalCount,
  onClearCompleted,
  onClearAll,
  onExport,
}) => {
  const [openDialog, setOpenDialog] = useState(false)
  const { t } = useLanguage()

  const handleClearAll = () => {
    onClearAll()
    setOpenDialog(false)
  }
  return (
    <>
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
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', sm: 'center' },
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 2,
          }}
        >
          <Typography variant="h6" color="text.primary">
            {t.taskStats}
          </Typography>
          <Box sx={{ 
            display: 'flex', 
            gap: 1, 
            flexWrap: 'wrap', 
            alignItems: 'center',
            width: { xs: '100%', sm: 'auto' },
            justifyContent: { xs: 'flex-start', sm: 'flex-end' },
          }}>
            <Chip
              icon={<RadioButtonUncheckedIcon />}
              label={`${t.uncompleted}: ${uncompletedCount}`}
              color="primary"
              variant="outlined"
              size="small"
              sx={{
                borderRadius: 3,
                '& .MuiChip-icon': {
                  color: 'primary.main',
                },
              }}
            />
            <Chip
              icon={<CheckCircleIcon />}
              label={`${t.completed}: ${completedCount}`}
              color="success"
              variant="outlined"
              size="small"
              sx={{
                borderRadius: 3,
                '& .MuiChip-icon': {
                  color: 'success.main',
                },
              }}
            />
            {totalCount > 0 && (
              <Button
                variant="outlined"
                size="small"
                startIcon={<DownloadIcon />}
                onClick={onExport}
                sx={{
                  borderRadius: 3,
                  color: 'info.main',
                  borderColor: 'info.main',
                  fontSize: '0.75rem',
                  height: 32, // 统一小按钮高度
                  '&:hover': {
                    backgroundColor: 'rgba(33, 150, 243, 0.08)',
                    borderColor: 'info.main',
                  },
                }}
              >
                {t.export}
              </Button>
            )}
            {completedCount > 0 && (
              <Button
                variant="outlined"
                size="small"
                startIcon={<ClearAllIcon />}
                onClick={onClearCompleted}
                sx={{
                  borderRadius: 3,
                  color: 'warning.main',
                  borderColor: 'warning.main',
                  fontSize: '0.75rem',
                  height: 32, // 统一小按钮高度
                  '&:hover': {
                    backgroundColor: 'rgba(255, 152, 0, 0.08)',
                    borderColor: 'warning.main',
                  },
                }}
              >
                {t.clearCompleted}
              </Button>
            )}
            {totalCount > 0 && (
              <Button
                variant="outlined"
                size="small"
                startIcon={<DeleteSweepIcon />}
                onClick={() => setOpenDialog(true)}
                sx={{
                  borderRadius: 3,
                  color: 'error.main',
                  borderColor: 'error.main',
                  fontSize: '0.75rem',
                  height: 32, // 统一小按钮高度
                  '&:hover': {
                    backgroundColor: 'rgba(244, 67, 54, 0.08)',
                    borderColor: 'error.main',
                  },
                }}
              >
                {t.clearAll}
              </Button>
            )}
          </Box>
        </Box>
      </Paper>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {t.confirmClearAll}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {t.confirmClearAllMessage}
            <br />
            <br />
            当前共有 <strong>{totalCount}</strong> 个任务将被删除。
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setOpenDialog(false)}
            sx={{ borderRadius: 2 }}
          >
            {t.cancel}
          </Button>
          <Button 
            onClick={handleClearAll} 
            color="error" 
            variant="contained"
            sx={{ borderRadius: 2 }}
            autoFocus
          >
            {t.confirm}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}