# AGENTS.md

## 项目概览

这是一个可编辑的个人主页项目，包含基本情况和科研成果展示功能。用户可以在预览模式和编辑模式之间切换，实时编辑个人信息和科研成果。

### 技术栈

- **Framework**: Next.js 16 (App Router)
- **Core**: React 19
- **Language**: TypeScript 5
- **UI 组件**: shadcn/ui (基于 Radix UI)
- **Styling**: Tailwind CSS 4
- **Database**: Supabase (PostgreSQL)
- **Icons**: lucide-react

## 目录结构

```
├── public/                 # 静态资源
├── scripts/                # 构建与启动脚本
├── src/
│   ├── app/                # 页面路由与布局
│   │   ├── api/            # API 路由
│   │   │   ├── profile/    # 个人基本情况 API
│   │   │   └── research-results/  # 科研成果 API
│   │   ├── globals.css     # 全局样式
│   │   ├── layout.tsx      # 根布局
│   │   └── page.tsx        # 个人主页页面
│   ├── components/ui/      # Shadcn UI 组件库
│   ├── hooks/              # 自定义 Hooks
│   ├── lib/                # 工具库
│   │   └── utils.ts        # 通用工具函数 (cn)
│   └── storage/            # 数据存储
│   │   └── database/       # 数据库相关
│   │       ├── supabase-client.ts  # Supabase 客户端
│   │       └── shared/     # 数据库模型
│   │           └── schema.ts  # 数据表定义
├── next.config.ts          # Next.js 配置
├── package.json            # 项目依赖管理
├── tsconfig.json           # TypeScript 配置
├── DESIGN.md               # 设计风格规范
└── AGENTS.md               # 本文件
```

## 构建和测试命令

### 开发环境

```bash
# 启动开发服务器（端口 5000）
pnpm run dev

# 类型检查
pnpm ts-check

# ESLint 检查
pnpm lint:build

# 安装依赖
pnpm install
```

### 数据库操作

```bash
# 生成数据库模型（从远端同步到本地）
coze-coding-ai db generate-models

# 同步本地模型到远端数据库
coze-coding-ai db upgrade
```

## 代码风格指南

### 编码规范

- 使用 TypeScript strict 模式，禁止隐式 `any` 和 `as any`
- 字段名必须使用 snake_case（数据库列名）
- 所有 Supabase 调用必须检查 `{ data, error }`，遇到 `error` 立刻 `throw`
- 使用 pnpm 作为包管理器，严禁 npm 或 yarn

### 数据库字段规范

- 主键使用 `serial().primaryKey()` 或 `varchar().primaryKey().default(sql\`gen_random_uuid()\`)`
- 外键必须使用 `.references()` 并添加索引
- 时间字段必须使用 `timestamp("col", { withTimezone: true })`
- 常用过滤字段、排序字段必须创建索引

### Hydration 问题防范

- 严禁在 JSX 渲染逻辑中直接使用 `typeof window`、`Date.now()`、`Math.random()`
- 必须使用 `'use client'` 并配合 `useEffect` + `useState` 确保动态内容仅在客户端渲染
- 严禁非法 HTML 嵌套（如 `<p>` 嵌套 `<div>`）

### UI 组件规范

- 使用 shadcn/ui 组件库，位于 `src/components/ui/` 目录
- 遵循 DESIGN.md 中的设计风格规范
- 主色：深石墨色 `#2C3E50`
- 次色：象牙白 `#FBF9F7`
- 强调色：深琥珀色 `#D4A574`

## API 接口说明

### 个人基本情况 API

- `GET /api/profile` - 获取个人基本情况
- `POST /api/profile` - 创建或更新个人基本情况

### 科研成果 API

- `GET /api/research-results?profile_id={id}` - 获取科研成果列表
- `POST /api/research-results` - 创建科研成果
- `PUT /api/research-results/[id]` - 更新科研成果
- `DELETE /api/research-results/[id]` - 删除科研成果

## 数据表结构

### personal_profile（个人基本情况）

- `id`: 主键
- `name`: 姓名
- `title`: 职称
- `avatar_url`: 头像URL
- `email`: 邮箱
- `phone`: 电话
- `education`: 教育背景
- `research_interests`: 研究兴趣
- `created_at`: 创建时间
- `updated_at`: 更新时间

### research_results（科研成果）

- `id`: 主键
- `profile_id`: 外键（关联 personal_profile）
- `type`: 类型（论文/项目/专利等）
- `title`: 标题
- `description`: 描述
- `authors`: 作者（论文）
- `journal`: 期刊/会议（论文）
- `year`: 年份
- `link`: 链接
- `created_at`: 创建时间
- `updated_at`: 更新时间

## 安全注意事项

- RLS 已启用，后端使用 service_role_key 绕过 RLS
- 所有 API 调用都有错误处理
- 删除和更新操作必须带 filter 条件
- 禁止删除或修改 Supabase 内置 schema（auth、storage、realtime、extensions）

## 测试说明

本项目使用轻量级测试策略：

1. 静态检查：`pnpm ts-check` 和 `pnpm lint:build`
2. 接口冒烟测试：通过 curl 命令测试 API 端点
3. 不编写单元测试文件

## 常见问题

### 数据库连接失败

- 确认 Supabase 服务已开通
- 检查环境变量 `COZE_SUPABASE_URL` 和 `COZE_SUPABASE_ANON_KEY` 是否正确

### Hydration 错误

- 检查是否在组件渲染中使用了动态数据
- 确保 `'use client'` 组件使用 `useEffect` 处理客户端逻辑

### 字体加载问题

- 使用 Google Fonts CN 域名：`fonts.googleapis.cn`
- 在 `globals.css` 中通过 `@import` 引入字体

## 优化建议

### 性能优化

- 图片使用 WebP/AVIF 格式
- 非首屏图片使用 `loading="lazy"`
- 使用 `will-change: transform` 优化动画性能

### SEO 优化

- 使用 `metadata` API 而非 `<head>` 标签
- 添加 JSON-LD 结构化数据

### 可访问性

- 使用语义化 HTML 标签
- 确保颜色对比度符合 WCAG 标准
- 为交互元素添加适当的 aria 属性