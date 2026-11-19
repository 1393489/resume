/* ============================================================================
   简历内容 —— 要改的东西全在这一个文件里。
   改完刷新页面就行，不需要任何构建步骤。

   约定：字段上写 ph: true 表示「示例占位」，页面里会自动加下划线标出来
        （页脚按钮 或 按键盘 P 键 可以一键高亮所有占位内容）。

   本版内容来源：Obsidian 知识库里的「个人信息资产库.md」（标注【已确认】的条目）
     + 实际交付过的项目（memloom / 大肥鱼 QQ 机器人 / 社媒自动化 / 《对焦》短片）。
   还没有的东西一律标 ph: true，不编。
   ========================================================================== */

window.RESUME = {
  meta: {
    title: '尉城源 · 化学在读 · AI 工具实践',
    description:
      '尉城源的个人页面：宁波大学化学专业 2026 级在读，把 AI 工具用进编程学习、系统维护与真实项目里的记录。'
  },

  profile: {
    name: '尉城源',
    latin: 'WEI  CHENGYUAN',
    role: '宁波大学 · 化学（本科）在读',
    tagline: '把 AI 从「会聊天」用到「能干活」—— 环境自己配，结论自己验。',
    status: '2026 级 · 开放实习与合作',
    avatar: 'W', // 头像里显示的字；中文首字在这个渐变块里太糊，用拼音首字母
    contacts: [
      { icon: 'gh',   label: 'GitHub', value: 'github.com/KrLito7', href: 'https://github.com/KrLito7' },
      { icon: 'mail', label: '邮箱',   value: '2305792795@qq.com', href: 'mailto:2305792795@qq.com' },
      { icon: 'link', label: '抖音', value: '@晨雨安' },
      { icon: 'pin',  label: '所在地', value: '中国 · 浙江宁波', href: null }
    ]
  },

  // 首屏四个数字 —— 全部可核验，没有估的
  stats: [
    { value: '1',    label: 'GitHub 公开发布', note: 'memloom v0.1.2' },
    { value: '71',   label: '离线自检项',     note: '发布前全绿' },
    { value: '11',   label: '支原创知识短片', note: '抖音 @晨雨安 · 代码直出' },
    { value: '16',   label: 'C 语言学习周计划', note: '正在执行' }
  ],

  about: [
    '我是尉城源，宁波大学材料科学与化学工程学院化学专业 2026 级本科生。比起「学过什么」，我更在意「能不能自己把一件事跑通」。',
    '我的习惯是不背没验证过的结论：先笔算预测、再实跑对照 —— C 语言第 3 周的预测表做到 14/14 一致，就是这么练出来的。这套方法现在被我拿去学编程、装机器、管训练。',
    'AI 上我不停在聊天框：自己配 API 中转和模型切换、把终端环境搭起来，让它进到编程、系统维护、决策这些真实流程里；同时保留核验习惯 —— 要求区分「已确认事实」和「待推测」，不接受模糊话术。'
  ],

  skills: [
    {
      group: '编程（进行中）',
      items: [
        { name: 'C 语言基础（变量 / 运算 / 输入输出 / 流程控制）', level: 60 },
        { name: 'Dev-C++ / gcc 编译与调试', level: 55 },
        { name: 'OJ 判题机逻辑与排错（AC / WA / CE / RE / TLE）', level: 55 },
        { name: 'Git / GitHub 发布流程', level: 45 }
      ]
    },
    {
      group: 'AI 工具运用',
      items: [
        { name: '自建 AI 编程环境（Claude Code + CC Switch + DeepSeek）', level: 75 },
        { name: '提示词结构化与多轮追问', level: 78 },
        { name: '输出核验：区分事实与推测', level: 80 },
        { name: 'Obsidian 知识库（双链 / frontmatter / 结构化笔记）', level: 72 }
      ]
    },
    {
      group: '工程与系统',
      items: [
        { name: 'Windows 软件安全基线（注册表 / 服务 / 启动项）', level: 65 },
        { name: '微信小程序（WXML / WXSS / 开发者工具）', level: 50 },
        { name: 'AI 协作下的自动化脚本落地', level: 55 },
        { name: '英文技术文档阅读（备考中）', level: 50 }
      ]
    },
    {
      group: '学习与执行',
      items: [
        { name: '系统化笔记与复盘归档', level: 85 },
        { name: '实跑验证与预测校准', level: 82 },
        { name: '长期执行（训练 / 饮食 / 护肤 / 记账）', level: 80 },
        { name: '信息检索与路径调研', level: 78 }
      ]
    }
  ],

  experience: [
    {
      time: '2026.10 — 至今',
      title: 'AI 工具链实践（个人 · 独立）',
      org: '自学 + 项目实践 · 宁波',
      summary: '把自己从「用 AI 聊天」推到「用 AI 交付」：环境自己搭、项目自己做、验收自己定。',
      points: [
        '自建 AI 编程环境：API 中转、模型切换、终端工具全部自己配，不停留在网页聊天框。',
        '把 AI 当教练而不是代写：C 语言明确要求「只教不替做」，在 NBU OJ 上独立完成答题并通过。',
        '主导四条项目线（memloom / QQ 机器人 / 社媒自动化 / 知识短视频与自媒体账号），负责需求、判收与上线，实现与 AI 结对完成。',
        '把每类踩过的坑沉淀成可查卡片（编码、限流、沙箱限制、计费预扣），下次同类问题直接查表。'
      ]
    }
  ],

  projects: [
    {
      name: 'memloom',
      subtitle: '把 AI 会话档案织成 Obsidian 记忆库',
      tags: ['Python', '开源', '零依赖', 'Obsidian'],
      desc: '把 DSH / Claude Code / Codex 的历史会话整理成可检索、可双链的 markdown 知识库。我负责选题、需求与验收，实现在 AI 结对下完成。',
      points: [
        '71 项离线自检覆盖解析、去重、双链、断链修复、增量复用与跨平台路径。',
        '实测 131 个会话 → 201 页；冷跑 10.0s，二次运行 2.7s（复用 131，新解析 0）。',
        '零依赖：只用 Python 标准库，clone 即跑。'
      ],
      metric: 'v0.1.2 · 71 项自检全绿',
      link: { label: 'GitHub', href: 'https://github.com/KrLito7/memloom' }
    },
    {
      name: '大肥鱼 QQ 机器人',
      subtitle: '一个能自己活着的聊天搭子',
      tags: ['Node.js', 'MCP', 'OneBot', '守护进程'],
      desc: '以 qq-bridge + OneBot 网关 + MCP 工具链搭的人格化机器人，能读未读、引用回复、发语音表情、自己判断该不该插话。',
      points: [
        '30 秒巡检 + 会话超限自动重置（400 自愈），长期无人值守在线。',
        'MCP 工具覆盖：读未读、引用回复、发语音表情、按语境判断要不要插话。',
        '踩坑全部沉淀成卡片：编码、限流、沙箱限制、计费预扣。'
      ],
      metric: '无人值守 · 故障自愈'
    },
    {
      name: '社媒自动化插件组',
      subtitle: '无头浏览器 + 只读接口',
      tags: ['CDP', '逆向', '风控克制'],
      desc: '私信、评论、分享卡片、内容挑选走无头 Chrome 或只读接口，不碰写接口所以不掉登录态。',
      points: [
        '两条通道：无头 Chrome 与只读接口，都不碰写接口。',
        '发完回读核实是否真的落地（分享卡片、语音都有 verified 回读）。',
        '内容按关键词与互动数据打分挑选，不靠手点。'
      ],
      metric: '发送回读核实 · 不掉登录态'
    },
    {
      name: '知识短视频 · 自媒体',
      subtitle: '抖音 @晨雨安',
      tags: ['Canvas', 'Remotion', 'ffmpeg', '内容运营'],
      desc: '从零跑一个科学科普号：选题、脚本、分镜、逐帧绘制、合成、发布全自己把控。每支片子先给概念找一个观众认得的形象，再由代码画出来。',
      points: [
        '11 支片子全部由代码逐帧绘制，没有素材库。',
        '累计获赞 688，单条最高播放 2939；选题覆盖对焦 / 峰终定律 / 曝光效应 / 心理账户 / 锚定效应。',
        '每支片子先做「找形象」再动笔：形象定错了，整支片子白画。'
      ]
    },
    {
      name: '习惯打卡 · 网页 + 微信小程序',
      subtitle: '从双击就能开，一路做到小程序审核',
      tags: ['HTML / CSS', 'JavaScript', '微信小程序', '产品'],
      desc: '给自己做的习惯打卡工具：加习惯（名字 + 颜色）、每天点勾、连续打卡天数、最近 7 天热力图、今日进度环，数据存 localStorage，关掉再开还在。先做网页版随时能用，再改写为 WXML / WXSS / JS 的小程序，走完注册、开发者工具导入、测试号预览的完整流程，实现与 AI 结对完成。',
      points: [
        '修过真实 bug：表头少一个占位空格，7 个星期标签整体串了一列，靠逐列比对热力格修好。',
        '手机适配三处坑：SVG 进度环写死 84px 会溢出、aspect-ratio 在手机浏览器不生效被拉成竖条、边距按屏幕重调。',
        '走过小程序审核：原名「今日达成」被驳回（「达成」易被判为金融 / 业绩类，要资质证明），据此换成不触发行业审核的命名。'
      ],
      metric: '网页版 + 小程序 · 完整走完上线流程'
    }
  ],

  education: [
    {
      time: '2026.09 — 至今',
      title: '宁波大学 · 化学（本科）',
      org: '材料科学与化学工程学院',
      points: [
        '在修：C 语言程序设计（第 1 学期，进行中）、大学英语、无机化学等基础课。',
        'C 语言：建立 16 周学习计划与考点总结，NBU OJ 独立完成答题，笔算预测表 14/14 一致。'
      ]
    }
  ],

  extras: [
    {
      title: '证书 · 语言',
      items: ['驾驶证：已取得', '英语：四六级备考路径调研中（暂无成绩）', '中文（母语），英文（可读技术文档）']
    },
    {
      title: '开源与社区',
      items: ['memloom —— GitHub 公开发布，clone 即跑', 'GitHub：github.com/KrLito7']
    }
  ],

  /* 学业规划：入学前自己查的硬信息（门槛、规则、赛道），不是想当然 */
  plan: [
    { when: '保研', text: '门槛 GPA ≥ 2.83（约 75 分）· 专业前 45% · 英语四级 425 · 2 个创新学分 + 标志性成果' },
    { when: '升学', text: '2026 届材化学院 77 人升学，其中 87% 进入双一流高校（复旦 / 中科大 / 北大 / 浙大等）' },
    { when: '竞赛', text: '可参与：浙江省大学生化学竞赛 · 化工设计竞赛 · 「挑战杯」' },
    { when: '转专业', text: '入学后 4 次机会，第 1–4 学期第 12 周申请' }
  ],

  reading: [
    { label: '《C Primer Plus》第 6 版', note: '配合课程一起过' },
    { label: '《C 语言程序设计·在线实践·微课视频》', note: '主教材' },
    { label: '宁波大学化学专业发展指南', note: '自己整理：保研 / 考研 / 竞赛三条路径' }
  ],

  /* ===== 区块清单：决定页面上按什么顺序、出现哪些块 =====
     想加一个新板块，就在这里加一行（改完刷新页面就出现），例如：

       { id: 'notes',   title: '最近在做的', type: 'list' },
       { id: 'reading', title: '在读 / 在听', type: 'links' },

     type 可选：about（段落）/ skills（技能条）/ timeline（时间线）/
                cards（卡片墙）/ blocks（分组小块）/ list（一行一条，可带日期）/
                links（链接列表）
       · 数据默认取 RESUME[同名 id]；也能用 from 指向别的字段，或用 items 直接写在这里
       · 没写 num 就按顺序自动编号 01、02、03…
       · 没内容的区块会自动隐藏，不会留空壳
     把整段删掉也能跑：会回退到和现在一模一样的默认 6 个区块。 */
  sections: [
    { id: 'about',      title: '概要', type: 'about' },
    { id: 'skills',     title: '技能', type: 'skills', hint: '自评，非绝对' },
    { id: 'experience', title: '经历', type: 'timeline' },
    { id: 'projects',   title: '项目', type: 'cards', count: true },
    { id: 'education',  title: '教育', type: 'timeline' },
    { id: 'plan',       title: '学业规划', type: 'list', hint: '入学前自己查的' },
    { id: 'extras',     title: '其他', type: 'blocks' },
    { id: 'reading',    title: '在读 / 在听', type: 'links' }
  ],

  footer: {
    note: '本站为纯静态单页，无构建、无第三方依赖、无追踪。',
    year: new Date().getFullYear()
  }
};
