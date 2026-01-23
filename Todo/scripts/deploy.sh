#!/bin/bash

# 待办事项应用部署脚本

echo "🚀 开始部署待办事项应用..."

# 检查是否有未提交的更改
if [[ -n $(git status --porcelain) ]]; then
  echo "❌ 检测到未提交的更改，请先提交所有更改"
  exit 1
fi

# 安装依赖
echo "📦 安装依赖..."
npm install

# 运行代码检查
echo "🔍 运行 ESLint 检查..."
npm run lint

# 格式化代码
echo "✨ 格式化代码..."
npm run format

# 构建项目
echo "🏗️ 构建项目..."
npm run build

echo "✅ 部署完成！"
echo "📁 构建文件位于 dist/ 目录"
echo "🌐 可以将 dist/ 目录部署到任何静态文件服务器"