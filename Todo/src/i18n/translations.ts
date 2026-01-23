export interface Translations {
  title: string
  subtitle: string
  inputPlaceholder: string
  addButton: string
  priority: string
  category: string
  dueDate: string
  reminder: string
  notifyPerson: string
  search: string
  export: string
  clearCompleted: string
  clearAll: string
  confirmClearAll: string
  confirmClearAllMessage: string
  cancel: string
  confirm: string
  taskStats: string
  completed: string
  uncompleted: string
  emptyTitle: string
  emptySubtitle: string
  emptyDescription: string
  darkMode: string
  lightMode: string
  addList: string
  listName: string
  createList: string
  deleteList: string
  overdue: string
  dueToday: string
  dueTomorrow: string
  noDueDate: string
  reminderSet: string
  noReminder: string
  priorities: {
    high: string
    medium: string
    low: string
  }
  categories: {
    work: string
    personal: string
    shopping: string
    health: string
    study: string
    other: string
  }
}

export const translations = {
  zh: {
    title: '我的待办清单',
    subtitle: '高效管理你的日常任务',
    inputPlaceholder: '今天要做什么？',
    addButton: '➕ 添加任务',
    priority: '优先级',
    category: '分类',
    dueDate: '截止日期',
    reminder: '提醒',
    notifyPerson: '提醒人',
    search: '搜索任务...',
    export: '导出',
    clearCompleted: '清空已完成',
    clearAll: '全部清空',
    confirmClearAll: '⚠️ 确认清空所有任务',
    confirmClearAllMessage: '你确定要清空所有任务吗？这个操作无法撤销。',
    cancel: '取消',
    confirm: '确认清空',
    taskStats: '任务统计',
    completed: '已完成',
    uncompleted: '未完成',
    emptyTitle: '🎉 太棒了！',
    emptySubtitle: '你的待办清单是空的',
    emptyDescription: '看起来你已经完成了所有任务，或者还没有添加新的任务。\n添加一个新任务开始新的一天吧！ ✨',
    darkMode: '深色模式',
    lightMode: '浅色模式',
    addList: '添加列表',
    listName: '列表名称',
    createList: '创建列表',
    deleteList: '删除列表',
    overdue: '已逾期',
    dueToday: '今天到期',
    dueTomorrow: '明天到期',
    noDueDate: '无截止日期',
    reminderSet: '已设置提醒',
    noReminder: '无提醒',
    priorities: {
      high: '🔴 高',
      medium: '🟡 中',
      low: '🟢 低',
    },
    categories: {
      work: '💼 工作',
      personal: '👤 个人',
      shopping: '🛒 购物',
      health: '💪 健康',
      study: '📚 学习',
      other: '📝 其他',
    },
  },
  en: {
    title: 'My Todo List',
    subtitle: 'Efficiently manage your daily tasks',
    inputPlaceholder: 'What do you want to do today?',
    addButton: '➕ Add Task',
    priority: 'Priority',
    category: 'Category',
    dueDate: 'Due Date',
    reminder: 'Reminder',
    notifyPerson: 'Notify Person',
    search: 'Search tasks...',
    export: 'Export',
    clearCompleted: 'Clear Completed',
    clearAll: 'Clear All',
    confirmClearAll: '⚠️ Confirm Clear All Tasks',
    confirmClearAllMessage: 'Are you sure you want to clear all tasks? This action cannot be undone.',
    cancel: 'Cancel',
    confirm: 'Confirm Clear',
    taskStats: 'Task Statistics',
    completed: 'Completed',
    uncompleted: 'Uncompleted',
    emptyTitle: '🎉 Awesome!',
    emptySubtitle: 'Your todo list is empty',
    emptyDescription: 'It looks like you have completed all tasks or haven\'t added any new tasks yet.\nAdd a new task to start your day! ✨',
    darkMode: 'Dark Mode',
    lightMode: 'Light Mode',
    addList: 'Add List',
    listName: 'List Name',
    createList: 'Create List',
    deleteList: 'Delete List',
    overdue: 'Overdue',
    dueToday: 'Due Today',
    dueTomorrow: 'Due Tomorrow',
    noDueDate: 'No Due Date',
    reminderSet: 'Reminder Set',
    noReminder: 'No Reminder',
    priorities: {
      high: '🔴 High',
      medium: '🟡 Medium',
      low: '🟢 Low',
    },
    categories: {
      work: '💼 Work',
      personal: '👤 Personal',
      shopping: '🛒 Shopping',
      health: '💪 Health',
      study: '📚 Study',
      other: '📝 Other',
    },
  },
} as const

export type Language = keyof typeof translations