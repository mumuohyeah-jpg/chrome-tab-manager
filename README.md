# Tab Manager

**[English](#english) | [中文](#chinese)**

A Chrome extension that replaces your new tab page with a clean, domain-grouped tab manager. Supports smart categorization, light/dark theme, and quick search.

一个用域名分组标签管理器替代新标签页的 Chrome 扩展，支持智能分类、深浅色主题和快速搜索。

---

## Screenshots

**Light Mode / 浅色模式**

![screenshot-light](screenshot-light.jpg)

**Dark Mode / 深色模式**

![screenshot-dark](screenshot-dark.jpg)

---

## <a id="english">English</a>

### Features

- **Domain grouping** — Tabs are automatically grouped by domain for a clean overview
- **Smart categorization** — Automatically detects what each tab is about (Code, AI, Design, Video, Social, Shopping, etc.)
- **Light/Dark theme** — Auto-switches based on time of day, with manual toggle
- **Tab search** — Quickly find tabs by title or URL
- **Batch close** — Close all tabs from a domain with one click
- **Time tracking** — See how long each tab has been open
- **Greeting** — Time-based greeting with tab count

### Installation

**Option 1: Download ZIP (Recommended)**

1. Click the green **Code** button at the top of this page, then click **Download ZIP**
2. Unzip the downloaded file to a folder on your computer
3. Open Chrome and go to `chrome://extensions/`
4. Turn on **Developer mode** (toggle in the top-right corner)
5. Click **Load unpacked** and select the unzipped folder
6. The extension is now active — open a new tab to see it in action

**Option 2: Clone with Git**

```bash
git clone https://github.com/mumuohyeah-jpg/chrome-tab-manager.git
```

Then follow steps 3-6 from Option 1 above.

**After installation**

Open a new tab (`Cmd+T` / `Ctrl+T`) and you should see the Tab Manager interface instead of Chrome's default new tab page.

### Usage

**View your tabs**

When you open a new tab, all your current tabs are displayed, **grouped by domain** (e.g., all `github.com` tabs together). Each group shows:

- **Domain name** and a **category label** (e.g., "Code", "AI", "Design")
- The **number of tabs** in that group
- Each tab's title, path, and how long it's been open

**Search tabs**

Type in the search box at the top to filter tabs by **title or URL**. The list updates as you type.

**Close tabs**

- **Close a single tab** — Click the **×** button on the right side of any tab
- **Close all tabs from a domain** — Click the **Close** button in the domain header. A confirmation dialog will appear before closing.

**Switch theme**

The theme auto-switches based on time of day:
- **Light mode** during daytime (6:00 AM – 6:00 PM)
- **Dark mode** at night (6:00 PM – 6:00 AM)

You can also manually toggle the theme by clicking the **sun/moon switch** in the top-right corner.

**Refresh**

The tab list auto-refreshes every 30 seconds. You can also click the **Refresh** button at the bottom to update immediately.

### Permissions

| Permission | Reason |
|-----------|--------|
| `tabs` | Read and close tabs for grouping and management |

Only the `tabs` permission is required — no data is collected or sent anywhere.

### Project Structure

```
chrome-tab-manager/
├── manifest.json       # Extension config
├── background.js       # Service worker — tracks tab lifecycle
├── newtab.html         # New tab page layout
├── newtab.js           # New tab page logic
├── newtab.css          # New tab page styles
├── icon.svg            # Vector icon
├── icon16.png          # Icon 16x16
├── icon48.png          # Icon 48x48
└── icon128.png         # Icon 128x128
```

---

## <a id="chinese">中文</a>

### 功能

- **域名分组** — 自动按域名对标签页进行分组，界面清爽一目了然
- **智能分类** — 自动识别标签页类型（代码、AI、设计、视频、社交、购物等）
- **深色/浅色主题** — 根据时间段自动切换，也可手动切换
- **标签搜索** — 按标题或 URL 快速查找标签页
- **批量关闭** — 一键关闭某个域名下的所有标签页
- **时间追踪** — 显示每个标签页打开了多久
- **问候语** — 根据时间段显示问候语和标签页数量

### 安装

**方式一：下载 ZIP（推荐）**

1. 点击页面顶部的绿色 **Code** 按钮，选择 **Download ZIP**
2. 将下载的 ZIP 文件解压到电脑上的某个文件夹
3. 打开 Chrome，地址栏输入 `chrome://extensions/`
4. 打开右上角的 **开发者模式** 开关
5. 点击 **加载已解压的扩展程序**，选择刚才解压的文件夹
6. 扩展已激活 — 打开新标签页即可看到效果

**方式二：Git 克隆**

```bash
git clone https://github.com/mumuohyeah-jpg/chrome-tab-manager.git
```

然后按照方式一的步骤 3-6 继续操作。

**安装后**

打开新标签页（`Cmd+T` / `Ctrl+T`），你应该会看到 Tab Manager 界面，而不是 Chrome 默认的新标签页。

### 使用指南

**查看标签页**

打开新标签页时，所有当前标签页会按**域名分组**显示（例如所有 `github.com` 标签页归为一组）。每个分组显示：

- **域名**和**分类标签**（如"代码"、"AI"、"设计"）
- 该分组下的**标签页数量**
- 每个标签页的标题、路径和打开时长

**搜索标签页**

在顶部搜索框中输入关键词，可按**标题或 URL** 过滤标签页，列表会实时更新。

**关闭标签页**

- **关闭单个标签页** — 点击标签页右侧的 **×** 按钮
- **批量关闭域名下所有标签页** — 点击域名标题栏的 **Close** 按钮，会弹出确认对话框

**切换主题**

主题会根据时间段自动切换：
- **浅色模式**（早上 6:00 – 下午 6:00）
- **深色模式**（下午 6:00 – 早上 6:00）

也可以点击右上角的**太阳/月亮开关**手动切换主题。

**刷新**

标签页列表每 30 秒自动刷新。也可以点击底部的 **Refresh** 按钮立即更新。

### 权限

| 权限 | 用途 |
|------|------|
| `tabs` | 读取和关闭标签页，用于分组管理 |

该扩展仅需要 `tabs` 权限，不会收集或发送任何数据。

### 项目结构

```
chrome-tab-manager/
├── manifest.json       # 扩展配置
├── background.js       # Service Worker — 追踪标签页生命周期
├── newtab.html         # 新标签页布局
├── newtab.js           # 新标签页逻辑
├── newtab.css          # 新标签页样式
├── icon.svg            # 矢量图标
├── icon16.png          # 图标 16x16
├── icon48.png          # 图标 48x48
└── icon128.png         # 图标 128x128
```

---

## License

MIT
