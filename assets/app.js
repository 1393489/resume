/* ============================================================================
   渲染逻辑：把 data/resume.js 里的内容画成页面。
   没有框架、没有网络请求 —— 直接双击 index.html 也能跑。
   ========================================================================== */
(function () {
  'use strict';

  var D = window.RESUME;
  var main = document.getElementById('main');
  if (!main) return;

  if (!D) {
    main.innerHTML =
      '<p class="fatal">没读到简历数据。请确认 <code>data/resume.js</code> 跟 <code>index.html</code> 在一起，' +
      '并且这个文件没有语法错误。</p>';
    return;
  }

  /* ---------------- 小工具 ---------------- */
  function h(tag, attrs) {
    var n = document.createElement(tag);
    attrs = attrs || {};
    Object.keys(attrs).forEach(function (k) {
      var v = attrs[k];
      if (v === null || v === undefined || v === false) return;
      if (k === 'class') n.className = v;
      else if (k === 'text') n.textContent = v;
      else if (k === 'ph') { if (v) markPh(n); }
      else if (k.slice(0, 2) === 'on') n.addEventListener(k.slice(2), v);
      else n.setAttribute(k, v);
    });
    for (var i = 2; i < arguments.length; i++) {
      var kid = arguments[i];
      if (kid === null || kid === undefined || kid === false) continue;
      if (Array.isArray(kid)) {
        kid.forEach(function (x) { if (x !== null && x !== undefined && x !== false) n.append(x); });
      } else if (kid.nodeType) {
        n.append(kid);
      } else {
        n.append(document.createTextNode(String(kid)));
      }
    }
    return n;
  }

  function markPh(node) {
    node.classList.add('ph');
    node.setAttribute('data-ph', '示例占位内容 —— 在 data/resume.js 里改成你的真实信息');
    node.setAttribute('title', '示例占位内容，请替换');
    if (!node.matches('a')) node.setAttribute('aria-label', (node.getAttribute('aria-label') || '') + '（示例占位内容）');
    return node;
  }

  function icon(name) {
    var tpl = document.getElementById('icon-' + name);
    return tpl ? tpl.content.firstElementChild.cloneNode(true) : null;
  }

  /* ---------------- 侧栏 ---------------- */
  var P = D.profile || {};

  function fillSide() {
    document.title = (D.meta && D.meta.title) || document.title;
    var desc = document.querySelector('meta[name="description"]');
    if (desc && D.meta && D.meta.description) desc.setAttribute('content', D.meta.description);

    var letter = document.getElementById('avatar-letter');
    if (letter) letter.textContent = P.avatar || (P.name || 'K').slice(0, 1);

    var nameEl = document.getElementById('name');
    if (nameEl) nameEl.textContent = P.name || '';

    var latinEl = document.getElementById('latin');
    if (latinEl) {
      if (P.latin) latinEl.textContent = P.latin;
      else latinEl.remove();
    }

    var roleEl = document.getElementById('role');
    if (roleEl) roleEl.textContent = P.role || '';

    var statusEl = document.getElementById('status');
    if (statusEl) {
      if (P.status) {
        statusEl.querySelector('span').textContent = P.status;
      } else {
        statusEl.remove();
      }
    }

    var list = document.getElementById('contact');
    if (list) {
      list.innerHTML = '';
      (P.contacts || []).forEach(function (c) {
        var ic = icon(c.icon);
        var body = [
          h('span', { class: 'k', text: c.label || '' }),
          h('span', { text: c.value || '' })
        ];
        var node;
        if (c.href) {
          node = h('a', {
            href: c.href,
            ph: !!c.ph,
            target: /^https?:/.test(c.href) ? '_blank' : null,
            rel: /^https?:/.test(c.href) ? 'noopener noreferrer' : null
          }, ic, body);
        } else {
          node = h('span', { class: 'row', ph: !!c.ph }, ic, body);
        }
        list.append(h('li', {}, node));
      });
    }
  }

  /* ---------------- 区块骨架 ---------------- */
  var sections = [];

  function section(id, num, title, hint, build) {
    var body = build();
    var head = h('div', { class: 'section-head' },
      h('span', { class: 'num', text: num }),
      h('h2', { text: title }),
      hint ? h('span', { class: 'hint', text: hint }) : null
    );
    var sec = h('section', { class: 'section reveal', id: id, 'data-title': title }, head, body);
    sections.push({ id: id, title: title, num: num });
    return sec;
  }

  function buildHero() {
    var wrap = h('header', { class: 'hero' },
      h('p', { class: 'hero-eyebrow', text: 'CURRICULUM VITAE' }),
      h('h2', {}, P.name || '', '，把 AI ', h('em', { text: '用进真实流程' })),
      h('p', { class: 'lede', text: P.tagline || '' })
    );
    if (P.contacts) {
      // 邮箱还是占位时先不渲染「发邮件」按钮：指向假地址比没有按钮更坑人
      var mail = (P.contacts || []).filter(function (c) { return c.icon === 'mail' && c.href && !c.ph; })[0];
      var gh = (P.contacts || []).filter(function (c) { return c.icon === 'gh' && c.href; })[0];
      var actions = h('div', { class: 'hero-actions' });
      actions.append(h('button', {
        class: 'btn btn-primary', type: 'button', onclick: doPrint
      }, icon('mail'), '存为 PDF'));
      if (mail) {
        actions.append(h('a', { class: 'btn', href: mail.href, ph: !!mail.ph }, '发邮件给' + (P.name || '我')));
      }
      if (gh) {
        actions.append(h('a', { class: 'btn', href: gh.href, target: '_blank', rel: 'noopener noreferrer' }, icon('gh'), '看 GitHub'));
      }
      wrap.append(actions);
    }

    if (D.stats && D.stats.length) {
      var stats = h('div', { class: 'stats' });
      D.stats.forEach(function (s) {
        stats.append(h('div', { class: 'stat', ph: !!s.ph },
          h('div', { class: 'v', text: s.value }),
          h('div', { class: 'l', text: s.label }),
          s.note ? h('div', { class: 'n', text: s.note }) : null
        ));
      });
      wrap.append(stats);
    }
    return wrap;
  }

  function buildAbout() {
    var box = h('div', { class: 'about' });
    (D.about || []).forEach(function (t) { box.append(h('p', { text: t })); });
    return box;
  }

  function buildSkills() {
    var box = h('div', { class: 'skills' });
    (D.skills || []).forEach(function (g) {
      var list = h('div', { class: 'skill-list' });
      (g.items || []).forEach(function (it) {
        var lv = Math.max(0, Math.min(100, Number(it.level) || 0));
        list.append(h('div', { class: 'skill reveal', style: '--v:' + lv + '%' },
          h('span', { class: 'nm', text: it.name }),
          h('span', { class: 'lv', text: lv }),
          h('span', { class: 'track' }, h('span', { class: 'fill' }))
        ));
      });
      box.append(h('div', { class: 'skill-group' }, h('h3', { text: g.group }), list));
    });
    return box;
  }

  function buildExperience() {
    var box = h('div', { class: 'timeline' });
    (D.experience || []).forEach(function (e) {
      var pts = h('ul', { class: 'tl-points' });
      (e.points || []).forEach(function (p) { pts.append(h('li', { text: p })); });
      box.append(h('article', { class: 'tl-item reveal', ph: !!e.ph },
        h('div', { class: 'tl-time', text: e.time || '' }),
        h('h3', { text: e.title || '' }),
        e.org ? h('div', { class: 'tl-org', text: e.org }) : null,
        e.summary ? h('p', { class: 'tl-sum', text: e.summary }) : null,
        pts
      ));
    });
    return box;
  }

  function buildProjects() {
    var box = h('div', { class: 'projects' });
    (D.projects || []).forEach(function (p) {
      var tags = h('div', { class: 'tags' });
      (p.tags || []).forEach(function (t) { tags.append(h('span', { class: 'tag', text: t })); });
      var card = h('article', { class: 'card reveal', ph: !!p.ph },
        h('div', { class: 'card-top' }, h('h3', { text: p.name }), h('span', { class: 'sub', text: p.subtitle || '' })),
        h('p', { class: 'desc', text: p.desc || '' }),
        p.metric ? h('p', { class: 'metric', text: '· ' + p.metric }) : null,
        tags
      );
      if (p.link && p.link.href) {
        card.append(h('a', { class: 'card-link', href: p.link.href, target: '_blank', rel: 'noopener noreferrer' },
          p.link.label || '查看', ' →'));
      }
      box.append(card);
    });
    return box;
  }

  function buildEducation() {
    var box = h('div', { class: 'timeline' });
    (D.education || []).forEach(function (e) {
      var pts = h('ul', { class: 'tl-points' });
      (e.points || []).forEach(function (p) { pts.append(h('li', { text: p })); });
      box.append(h('article', { class: 'tl-item reveal', ph: !!e.ph },
        h('div', { class: 'tl-time', text: e.time || '' }),
        h('h3', { text: e.title || '' }),
        e.org ? h('div', { class: 'tl-org', text: e.org }) : null,
        pts
      ));
    });
    return box;
  }

  function buildExtras() {
    var box = h('div', { class: 'extras' });
    (D.extras || []).forEach(function (b) {
      var ul = h('ul');
      (b.items || []).forEach(function (i) { ul.append(h('li', { text: i })); });
      box.append(h('div', { class: 'block reveal', ph: !!b.ph }, h('h3', { text: b.title }), ul));
    });
    return box;
  }

  /* ---------------- 目录 ---------------- */
  function buildToc() {
    var ul = document.getElementById('toc');
    if (!ul) return;
    ul.innerHTML = '';
    sections.forEach(function (s) {
      ul.append(h('li', {},
        h('a', { href: '#' + s.id, 'data-target': s.id },
          h('span', { class: 'idx', text: s.num }),
          h('span', { text: s.title })
        )
      ));
    });
  }

  var tocLinks = {};
  function spy() {
    if (!('IntersectionObserver' in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var id = en.target.id;
        Object.keys(tocLinks).forEach(function (k) {
          tocLinks[k].classList.toggle('active', k === id);
        });
      });
    }, { rootMargin: '-30% 0px -55% 0px', threshold: 0 });
    sections.forEach(function (s) {
      var el = document.getElementById(s.id);
      if (el) io.observe(el);
    });
  }

  function reveal() {
    var nodes = main.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      nodes.forEach(function (n) { n.classList.add('in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('in');
          io.unobserve(en.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    nodes.forEach(function (n, i) {
      n.style.transitionDelay = Math.min(i % 6, 5) * 55 + 'ms';
      io.observe(n);
    });
  }

  /* ---------------- 主题 ---------------- */
  var themeBtn = document.getElementById('theme-btn');
  var themeIcon = document.getElementById('theme-icon');
  var themeText = document.getElementById('theme-text');

  function paintTheme() {
    var cur = document.documentElement.getAttribute('data-theme') || 'dark';
    if (themeText) themeText.textContent = cur === 'dark' ? '浅色' : '深色';
    if (themeIcon) themeIcon.textContent = cur === 'dark' ? '☀' : '☾';
    var mc = document.querySelector('meta[name="theme-color"]');
    if (mc) mc.setAttribute('content', cur === 'dark' ? '#0a0e13' : '#f4f7fb');
  }

  function toggleTheme() {
    var cur = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', cur);
    try { localStorage.setItem('resume-theme', cur); } catch (e) {}
    paintTheme();
  }

  /* ---------------- 打印 ---------------- */
  function doPrint() {
    // 打印前把动画状态全部落地，避免 PDF 里出现半透明的元素
    main.querySelectorAll('.reveal').forEach(function (n) { n.classList.add('in'); });
    window.print();
  }

  /* ---------------- 占位开关 ---------------- */
  var phBtn = document.getElementById('ph-toggle');
  function togglePh(force) {
    var on = typeof force === 'boolean' ? force : !document.body.classList.contains('show-ph');
    document.body.classList.toggle('show-ph', on);
    if (phBtn) {
      phBtn.setAttribute('aria-pressed', on ? 'true' : 'false');
      phBtn.textContent = on ? '已高亮 · 点这里收起' : '显示示例占位内容';
    }
    try { localStorage.setItem('resume-show-ph', on ? '1' : '0'); } catch (e) {}
  }

  /* ---------------- 装配 ---------------- */
  fillSide();

  if (D.about && D.about.length) {
    main.append(section('about', '01', '概要', null, buildAbout));
  }
  if (D.skills && D.skills.length) {
    main.append(section('skills', '02', '技能', '自评，非绝对', buildSkills));
  }
  if (D.experience && D.experience.length) {
    main.append(section('experience', '03', '经历', null, buildExperience));
  }
  if (D.projects && D.projects.length) {
    main.append(section('projects', '04', '项目', D.projects.length + ' 个', buildProjects));
  }
  if (D.education && D.education.length) {
    main.append(section('education', '05', '教育', null, buildEducation));
  }
  if (D.extras && D.extras.length) {
    main.append(section('extras', '06', '其他', null, buildExtras));
  }

  main.prepend(buildHero());

  buildToc();
  document.querySelectorAll('#toc a').forEach(function (a) {
    tocLinks[a.getAttribute('data-target')] = a;
  });
  spy();
  reveal();

  if (themeBtn) themeBtn.addEventListener('click', toggleTheme);
  paintTheme();

  var printBtn = document.getElementById('print-btn');
  if (printBtn) printBtn.addEventListener('click', doPrint);

  if (phBtn) {
    phBtn.addEventListener('click', function () { togglePh(); });
    try {
      if (localStorage.getItem('resume-show-ph') === '1') togglePh(true);
    } catch (e) {}
  }

  document.addEventListener('keydown', function (ev) {
    if (ev.target && /INPUT|TEXTAREA|SELECT/.test(ev.target.tagName)) return;
    if (ev.key === 'p' || ev.key === 'P') togglePh();
  });

  var note = document.getElementById('footer-note');
  if (note) {
    note.textContent = ((D.footer && D.footer.note) || '') +
      ' © ' + ((D.footer && D.footer.year) || new Date().getFullYear()) +
      ' ' + (P.name || '');
  }
})();
