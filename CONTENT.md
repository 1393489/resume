# 以后怎么往里加东西

**只有一句话：改 `data/resume.js`，保存，刷新页面。** 不用构建、不用装东西、不用碰 `assets/` 里的代码。

改完想发到网上（https://krlito7.github.io/resume/ ），执行一次：

```powershell
cd C:\Users\Administrator\Documents\deepseek-harness\default-workspace\resume-site
git add -A; git commit -m "更新内容"; git push
```

等约 30 秒，GitHub Pages 自动重建。想让大肥鱼推，跟它说一声就行。

---

## 一、加一个项目卡

找到 `projects: [` 那个数组，在任意两个 `},` 之间插一个对象：

```js
    {
      name: '项目名',
      subtitle: '一句话副标题',
      tags: ['Python', '开源'],
      desc: '两三句说清：解决什么问题、你负责什么、做成什么样。',
      metric: '可选的亮点数字',                       // 可删
      link: { label: 'GitHub', href: 'https://…' }    // 可删
    },
```

只有 `name` 是必需的，其余都能省。

## 二、加一段经历

`experience: [` 里插：

```js
    {
      time: '2026.11 — 至今',
      title: '职位 / 身份',
      org: '公司 / 组织',
      summary: '一句话总结这段。',                      // 可删
      points: ['要点一（动词 + 做了什么 + 结果）', '要点二']
    },
```

`education: [` 是同一个渲染方式（时间线），字段一样。

## 三、加一整个新板块（重点）

这是这套结构"流动"的地方：**板块由 `sections` 数组决定，不由代码决定。**

### 第 1 步：在 `sections: [` 里加一行

```js
  sections: [
    { id: 'about',      title: '概要', type: 'about' },
    { id: 'skills',     title: '技能', type: 'skills', hint: '自评，非绝对' },
    { id: 'experience', title: '经历', type: 'timeline' },
    { id: 'projects',   title: '项目', type: 'cards', count: true },
    { id: 'education',  title: '教育', type: 'timeline' },
    { id: 'extras',     title: '其他', type: 'blocks' },

    { id: 'notes',   title: '最近在做的', type: 'list' },    // ← 加这行
    { id: 'reading', title: '在读 / 在听', type: 'links' }   // ← 和这行
  ],
```

编号（01、02…）自动按顺序排，**不用手写**；没内容的板块会自动隐藏；侧栏目录也会自动出现这两项。

### 第 2 步：给它数据（两种写法任选）

**A. 单独写字段**（推荐，和 `id` 同名）：

```js
  notes: [
    { when: '2026.11', text: '把简历站重构成数据驱动，加内容不用改代码。' },
    { when: '2026.10', text: '抖音知识短片更新到第 11 支。' }
  ],

  reading: [
    { label: '《C Primer Plus》', note: '第 6 版，配合课程过' },
    { label: '某篇好文章', href: 'https://…', note: '一句话笔记' }
  ],
```

**B. 直接写在 sections 里**（适合只有三五条、不想多开一个字段）：

```js
    { id: 'notes', title: '最近在做的', type: 'list', items: [
      { when: '2026.11', text: '……' }
    ]},
```

---

## 四、`type` 对照表

| type | 长什么样 | 数据格式 |
|---|---|---|
| `about` | 几段正文 | `['第一段', '第二段']` |
| `skills` | 带进度条的技能组（两列） | `[{ group, items: [{ name, level }] }]` |
| `timeline` | 竖线 + 圆点的时间线 | `[{ time, title, org, summary, points }]` |
| `cards` | 卡片墙（默认两列） | `[{ name, subtitle, desc, metric, tags, link }]` |
| `blocks` | 并排的小块 | `[{ title, items: ['…'] }]` |
| `list` | 一行一条，左侧可带日期 | `['纯文本', { when, text }]` |
| `links` | 链接列表 | `[{ label, href, note }]` |

写了一个不存在的 `type` 不会白屏：控制台会警告，然后按 `list` 渲染出来。

## 五、几个可用的写法

- **整段数据不存在也不会崩**：数组空 → 那个板块直接隐藏。
- **`ph: true`**：标记"这是占位"。页面上会有虚线下划线，按 **P** 全部高亮，方便替换。都填完记得删掉（搜 `ph: true`）。
- **改顺序**：挪 `sections` 里那几行的位置就行，编号会自动重排。
- **删板块**：从 `sections` 里删掉那行（数据留着不会显示）。
- **只加链接**：`contacts` 里加一行 `{ icon: 'link', label: '微信', value: '…', href: '…' }`，图标可选 `gh / mail / link / pin`。

## 六、改坏了怎么办

页面白屏 = 语法错了（漏逗号、引号没配对、把英文逗号 `,` 写成中文 `，`）。浏览器按 F12 看 Console，红字会指到 `resume.js` 第几行。

实在改乱套了：`git checkout data/resume.js` 回到上一次提交，重来一遍。

## 七、本地怎么看效果

- **双击 `index.html`** 直接看（不需要任何服务器）
- 想跑全套自检（截图 + 打印 PDF + 排版体检）：`node _check\shot.mjs _check`，结果在 `_check\` 里
