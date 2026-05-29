# Tab Manager

A Chrome extension that replaces your new tab page with a clean, domain-grouped tab manager. Supports smart categorization, light/dark theme, and quick search.

一个 Chrome 扩展，用简洁的域名分组标签管理器替代新标签页。支持智能分类、深色/浅色主题和快速搜索。

---

## Screenshots / 截图

### Light Mode / 浅色模式
![screenshot-light](screenshot-light.jpg)

### Dark Mode / 深色模式
![screenshot-dark](screenshot-dark.jpg)

---

## Features / 功能

- **Domain grouping** — Tabs are automatically grouped by domain for a clean overview
- **Smart categorization** — Automatically detects what each tab is about (Code, AI, Design, Video, Social, Shopping, etc.)
- **Light/Dark theme** — Auto-switches based on time of day, with manual toggle
- **Tab search** — Quickly find tabs by title or URL
- **Batch close** — Close all tabs from a domain with one click
- **Time tracking** — See how long each tab has been open
- **Greeting** — Time-based greeting with tab count

---

## Install / 安装

1. Clone this repo or download the ZIP
2. Open Chrome and go to `chrome://extensions/`
3. Turn on **Developer mode** (top right)
4. Click **Load unpacked** and select the project folder

---

## Project Structure / 项目结构

```
chrome-tab-manager/
├── manifest.json       # Extension config / 扩展配置
├── background.js       # Service worker — tracks tab lifecycle
├── newtab.html         # New tab page layout / 新标签页布局
├── newtab.js           # New tab page logic / 新标签页逻辑
├── newtab.css          # New tab page styles / 新标签页样式
├── icon.svg            # Vector icon / 矢量图标
├── icon16.png          # Icon 16x16
├── icon48.png          # Icon 48x48
└── icon128.png         # Icon 128x128
```

## Permissions / 权限

| Permission | Reason |
|-----------|--------|
| `tabs` | Read and close tabs for grouping and management |

Only the `tabs` permission is required — no data is collected or sent anywhere.

## License

MIT
