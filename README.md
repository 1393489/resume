# 个人简历网站 · resume-site

线上：**https://1393489.github.io/resume/**（GitHub Pages，`main` 分支根目录，推上去自动重建）

纯静态单页简历。没有构建步骤、没有第三方依赖、没有网络请求 —— 双击 `index.html` 就能看。

## 文件

| 文件 | 作用 |
|---|---|
| `index.html` | 页面骨架（侧栏、页脚、图标模板） |
| `data/resume.js` | **简历内容全在这里，只改这个文件** |
| `assets/styles.css` | 样式（深/浅色、响应式、A4 打印） |
| `assets/app.js` | 渲染逻辑（目录高亮、进场动画、主题切换） |
| `_check/shot.mjs` | 自检脚本：借本机 Chromium 截图、量溢出、导出打印 PDF（不是网站运行所需，可以整目录删掉） |

## 改内容之前先知道的

内容不是编的：真实条目来自 Obsidian 库 `个人信息资产库.md`（标注【已确认】的部分）与实际交付过的项目，写进 `data/resume.js` 顶部注释里也注明了来源。**没确认过的东西一律 `ph: true`**，页面上看得出来。

## 怎么改

1. 打开 `data/resume.js`，改 `profile`（名字、职位、一句话、联系方式）。
2. 改 `stats`（首屏四个数字）、`skills`（技能与自评分数 0–100）。
3. 改 `experience` / `projects` / `education` / `extras`。
4. 刷新页面即可。

### 占位内容

标了 `ph: true` 的字段是**示例占位**，页面上会有虚线下划线。点页脚「显示示例占位内容」或按键盘 **P**，所有占位会被高亮，方便一眼找出来替换。

**把整份内容改成你自己的之后，记得把 `ph: true` 全删掉**（搜索 `ph: true` 即可）。

## 功能

- 深色 / 浅色主题，跟随系统偏好，选择记在 localStorage
- 左侧固定资料卡 + 目录，滚动时当前区块自动高亮
- 区块进场动画、技能条动画（尊重 `prefers-reduced-motion`）
- 响应式：980px / 520px 两个断点，手机上单列
- **A4 打印**：点「打印 / 存为 PDF」，或 Ctrl+P → 目标「另存为 PDF」，边距 13mm/12mm，会隐藏导航与背景、避免卡片被切断
- 无障碍：跳转链接、语义化标签、可见焦点环、`aria-label`

## 想加功能的话

- **英文版**：复制 `data/resume.js` 成 `resume.en.js`，加一个语言切换按钮重新渲染即可（`app.js` 的渲染函数都是纯函数，改 `window.RESUME` 后重跑一遍 `main.innerHTML=''` + 装配逻辑就行）。
- **换头像图片**：把 `profile.avatar` 换成 `<img>` —— 更简单的做法是在 `.avatar` 里塞 `background-image: url(...)`，CSS 里已有 `place-items:center` 的布局。
- **部署**：整个目录扔到 GitHub Pages / Cloudflare Pages / 任意静态托管都能用，不需要任何环境变量。

## 自检过的事

不是「看着没问题」，是真跑了一遍：`node _check/shot.mjs _check` 会借本机已经在跑的 Chromium（CDP 9334）打开 `index.html`，量数字、出截图、顺便导一份 PDF。实测结果：

- 1440px 桌面：控制台 0 条错误/警告；无横向滚动（`scrollWidth` 1399 ≤ 视口 1414）
- 390px 手机（DPR 2）：单列布局，无横向滚动（`scrollWidth` 390 = 视口 390）
- 深色 / 浅色两套主题各截一张确认（没有 localStorage 时跟系统偏好，无头浏览器报 light）
- 占位高亮：按 **P** 后 2 个占位节点全部点亮（只剩邮箱和作品集链接没填）
- A4 打印：`@page` 边距 13mm/12mm，正文实测宽 688px 未越界；技能条在纸上并排成两列，整份落到 3 页（`Page.printToPDF` 读回来 `/Count` = 3）；卡片与时间线条目设了 `break-inside: avoid`，不会被拦腰截断
- 打印视图里 `color-scheme: light`、浅色强调字统一压成深灰，黑白激光打印也读得清
- 全站零第三方请求：图标是内联 SVG `<template>`，favicon 是 data-URI

截图和那份 PDF 都在 `_check/` 里，可以随时重跑覆盖。注意：**用 794px 宽（A4 的 96dpi 宽度）量打印视图会「右边被切」，那只是测量假象** —— 有 `@page` 边距时可排版宽度是 186mm ≈ 703px，脚本用的是 703。
