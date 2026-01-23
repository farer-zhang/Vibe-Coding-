# 待办事项应用

一个现代化的待办事项管理应用，使用 React + MUI + TypeScript 构建。

## 功能特性

- ✅ 添加新的待办事项
- ✅ 标记任务完成/未完成
- ✅ 删除任务
- ✅ 实时统计已完成和未完成任务数量
- ✅ 本地存储，刷新页面数据不丢失
- ✅ 响应式设计，支持移动端
- ✅ 现代化 UI 设计，清新蓝色主题

## 技术栈

- React 18
- Material-UI (MUI)
- TypeScript
- Vite
- ESLint + Prettier
- Git 版本控制

## 开发

```bash
# 克隆项目
git clone <repository-url>
cd todo-app

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 代码格式化
npm run format

# 代码检查
npm run lint
```

## Git 工作流

```bash
# 初始化 Git 仓库
git init

# 添加所有文件
git add .

# 提交初始版本
git commit -m "feat: 初始化待办事项应用"

# 添加远程仓库
git remote add origin <your-repository-url>

# 推送到远程仓库
git push -u origin main
```

## 项目结构

```
src/
├── components/          # React 组件
│   ├── TodoInput.tsx   # 输入组件
│   ├── TodoItem.tsx    # 单个任务组件
│   ├── TodoList.tsx    # 任务列表组件
│   └── TodoStats.tsx   # 统计组件
├── hooks/              # 自定义 Hooks
│   └── useTodos.ts     # 任务管理逻辑
├── types/              # TypeScript 类型定义
│   └── Todo.ts         # Todo 类型
├── App.tsx             # 主应用组件
└── main.tsx            # 应用入口
```

## 开发规范

- 使用 TypeScript 进行类型检查
- 使用 ESLint 进行代码质量检查
- 使用 Prettier 进行代码格式化
- 遵循 Git 提交规范：
  - `feat:` 新功能
  - `fix:` 修复 bug
  - `docs:` 文档更新
  - `style:` 代码格式调整
  - `refactor:` 代码重构
  - `test:` 测试相关
  - `chore:` 构建过程或辅助工具的变动