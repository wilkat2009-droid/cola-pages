/* =========================================================
   語荷教育 · 兒童戲劇培訓 — 共用站台邏輯
   （純前端，file:// 直接開啟可用）
   ========================================================= */

const SITE = {
  brand: "語荷教育",
  brandSub: "Yuhe Drama Studio",
  tagline: "兒童戲劇 · 表演訓練 · 校隊培訓",
};

const NAV = [
  { href: "index.html",       label: "首頁" },
  { href: "paradigms.html",   label: "戲劇教育範式" },
  { href: "games.html",       label: "戲劇遊戲庫" },
  { href: "training.html",    label: "表演訓練體系" },
  { href: "curriculum.html",  label: "分階段課程" },
  { href: "festival.html",    label: "戲劇節專區" },
  { href: "resources.html",   label: "課堂資源" },
  { href: "about.html",       label: "關於導師" },
];

function renderShell() {
  const page = document.body.dataset.page || "";
  const header = document.getElementById("site-header");
  if (header) {
    header.className = "topbar";
    header.innerHTML = `
      <div class="wrap topbar-inner">
        <a class="brand" href="index.html">
          <span class="brand-mark">語</span>
          <span class="brand-text">
            <strong>${SITE.brand} · 兒童戲劇</strong>
            <span>${SITE.brandSub}</span>
          </span>
        </a>
        <button class="nav-toggle" id="navToggle" aria-expanded="false">選單</button>
        <nav class="nav" id="mainNav">
          ${NAV.map(n => `<a href="${n.href}" class="${n.href === page ? "active" : ""}">${n.label}</a>`).join("")}
        </nav>
      </div>`;
    const btn = document.getElementById("navToggle");
    btn.addEventListener("click", () => {
      const nav = document.getElementById("mainNav");
      const open = nav.classList.toggle("open");
      btn.setAttribute("aria-expanded", String(open));
    });
  }

  const footer = document.getElementById("site-footer");
  if (footer) {
    footer.innerHTML = `
      <div class="wrap">
        <div class="foot-grid">
          <div>
            <h5>語荷教育 · 兒童戲劇</h5>
            <p class="small" style="margin:0; color:var(--ink-soft)">
            </p>
          </div>
          <div>
            <h5>課程內容</h5>
            <a href="paradigms.html">戲劇教育範式</a>
            <a href="games.html">戲劇遊戲庫</a>
            <a href="training.html">表演訓練體系</a>
            <a href="curriculum.html">分階段課程設計</a>
          </div>
          <div>
            <h5>校隊與比賽</h5>
            <a href="festival.html">香港學校戲劇節專區</a>
            <a href="festival.html#winners">優秀作品賞析</a>
            <a href="festival.html#plan">備賽時間線</a>
            <a href="resources.html">課堂資源下載</a>
          </div>
          <div>
            <h5>聯絡</h5>
            <a href="mailto:yuheeducation@gmail.com">yuheeducation@gmail.com</a>
            <span class="small" style="color:var(--muted)">香港 · 青衣</span>
          </div>
        </div>
        <div class="foot-bottom">
          <span>© 2026 語荷教育 · 兒童戲劇課程</span>
        </div>
      </div>`;
  }
}

/* ---------- 自製手繪風線條圖示（手寫 SVG，無外部素材、無版權問題） ---------- */
const ICONS = {
  // 面具（戲劇的通用標誌）
  mask: '<path d="M4.9 4.4h14.2v7.5a7.1 7.1 0 0 1-14.2 0z"/><circle cx="9.4" cy="8.5" r="0.85" fill="currentColor" stroke="none"/><circle cx="14.6" cy="8.5" r="0.85" fill="currentColor" stroke="none"/><path d="M9.7 12.7a3.2 3.2 0 0 0 4.6 0"/>',
  // 兩個交疊圓（範式互相疊加）
  venn: '<circle cx="9" cy="12" r="6.2"/><circle cx="15" cy="12" r="6.2"/>',
  // 骰子（遊戲）
  dice: '<rect x="4" y="4" width="16" height="16" rx="3.8"/><circle cx="9" cy="9" r="1.1" fill="currentColor" stroke="none"/><circle cx="15" cy="9" r="1.1" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.1" fill="currentColor" stroke="none"/><circle cx="9" cy="15" r="1.1" fill="currentColor" stroke="none"/><circle cx="15" cy="15" r="1.1" fill="currentColor" stroke="none"/>',
  // 動態人形（形體與表演訓練）
  figure: '<circle cx="12" cy="4.4" r="2.3"/><path d="M12 6.9v6.6"/><path d="M4.9 10.2 12 8.3l7.1 1.9"/><path d="M8.3 21 12 13.5l3.7 7.5"/>',
  // 階梯（分階段）
  steps: '<path d="M3 21V16.2h4.6V11.4h4.6V6.6H16.8V2.9"/><path d="M3 21h18.2"/><path d="M21.2 21V2.9"/>',
  // 獎座（戲劇節）
  trophy: '<path d="M7 3.4h10v5.3a5 5 0 0 1-10 0z"/><path d="M7 5.2H4.4v1.9A3.6 3.6 0 0 0 8 10.7"/><path d="M17 5.2h2.6v1.9A3.6 3.6 0 0 1 16 10.7"/><path d="M12 13.7v4.4"/><path d="M9.6 18.1h4.8"/><path d="M8.2 20.6h7.6"/>',
  // 文件（資源）
  doc: '<path d="M6.5 3h7.1l4 4v14H6.5z"/><path d="M13.6 3v4h4"/><path d="M9.2 8.3h2.5"/><path d="M9.2 12.1h6"/><path d="M9.2 15.9h6"/>',
  // 人物（導師）
  person: '<circle cx="12" cy="8" r="3.6"/><path d="M5.2 20.6a6.8 6.8 0 0 1 13.6 0"/>',
};

const PAGE_ICON = {
  "index.html": "mask",
  "paradigms.html": "venn",
  "games.html": "dice",
  "training.html": "figure",
  "curriculum.html": "steps",
  "festival.html": "trophy",
  "resources.html": "doc",
  "about.html": "person",
};

function iconSvg(name, cls) {
  const d = ICONS[name];
  if (!d) return "";
  return `<svg class="pico ${cls || ""}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
}

function initIcons() {
  // 1) 任何帶 data-icon 的容器，把圖示塞進去
  document.querySelectorAll("[data-icon]").forEach(el => {
    el.insertAdjacentHTML("afterbegin", iconSvg(el.dataset.icon));
  });
  // 2) 每頁 hero 的眉標前面自動掛上該頁的圖示
  const key = PAGE_ICON[document.body.dataset.page || ""];
  if (!key) return;
  const eyebrow = document.querySelector("main .hero .eyebrow");
  if (eyebrow) eyebrow.insertAdjacentHTML("afterbegin", iconSvg(key, "pico-hero"));
}

/* ---------- 遊戲庫篩選 ---------- */

/* 訓練目標分桶：遊戲卡片保留原始的細緻描述，篩選按鈕則用統一類目，
   否則 90 多個標籤會把篩選列撐爆。 */
const GOAL_BUCKETS = [
  { name: "專注聆聽", aliases: ["專注", "專注力", "聆聽", "觀察", "眼神接觸", "群體聆聽", "定力", "記憶", "模仿", "細微觀察"] },
  { name: "反應",     aliases: ["反應", "反應速度", "即時反應"] },
  { name: "破冰熱身", aliases: ["破冰", "趣味", "情緒轉換"] },
  { name: "群體默契", aliases: ["默契", "群體默契", "群體節奏", "群體意識", "群體歸屬", "合群", "集體參與", "集體同步", "群體合作", "節奏", "同步"] },
  { name: "信任合作", aliases: ["信任", "合作", "責任感", "細心", "加入與接納", "安全意識", "身體合作", "跟隨", "群體連結"] },
  { name: "想像力",   aliases: ["想像力", "創造力", "聽覺想像", "無實物表演", "抽象表達"] },
  { name: "即興反應", aliases: ["即興", "即興反應", "即興應答", "接受與加碼", "台詞彈性", "接受"] },
  { name: "敘事",     aliases: ["敘事", "敘事結構", "視覺敘事", "時間感", "共同建構", "故事"] },
  { name: "角色塑造", aliases: ["角色塑造", "角色關係", "角色分析", "角色建立", "角色內心", "角色決策", "情境建立", "獨白"] },
  { name: "情緒表達", aliases: ["情緒表達", "情緒記憶", "情緒層次", "情感表達", "勇氣", "情感"] },
  { name: "同理心",   aliases: ["同理心", "價值思考"] },
  { name: "形體控制", aliases: ["形體表達", "身體控制", "身體協調", "身體表達", "感官替代", "形體", "非語言表達"] },
  { name: "空間感",   aliases: ["空間感", "空間構成", "空間意識", "空間關係", "氛圍建立"] },
  { name: "聲音與咬字", aliases: ["音量控制", "聲音穩定", "聲音投射", "聲音彈性", "聲音協調", "呼吸支持", "咬字", "正音", "口型", "咬字器官活化", "共鳴", "聲音"] },
  { name: "語言表達", aliases: ["語言精煉", "語言表達", "語言組織", "書寫表達", "群體討論", "詞語", "觀點", "書寫", "詩意劇場"] },
  { name: "反思",     aliases: ["反思", "自我評估"] },
];

function bucketsOf(game) {
  const out = [];
  GOAL_BUCKETS.forEach(b => {
    if (game.goals.some(g => b.aliases.includes(g) || g === b.name)) out.push(b.name);
  });
  return out;
}

function initGameFilter() {
  const list = document.getElementById("gameList");
  if (!list || typeof DRAMA_GAMES === "undefined") return;

  const state = { q: "", age: "全部", goal: "全部", type: "全部" };

  const ageSet  = ["全部", "初小", "高小", "高小／中學", "全階段"];
  const goalSet = ["全部", ...GOAL_BUCKETS.map(b => b.name)];
  const typeSet = ["全部", ...new Set(DRAMA_GAMES.map(g => g.type))];

  function btnRow(label, values, key) {
    return `<div class="filter-row"><span class="filter-label">${label}</span>` +
      values.map(v => `<button class="filter-btn${state[key] === v ? " on" : ""}" data-key="${key}" data-val="${v}">${v}</button>`).join("") +
      `</div>`;
  }

  const bar = document.getElementById("gameFilters");
  if (bar) {
    bar.innerHTML =
      `<div class="filter-row"><span class="filter-label">搜尋</span>
         <input class="search-box" id="gameSearch" type="search" placeholder="輸入遊戲名稱、目標或關鍵字…" value="${state.q}">
       </div>` +
      btnRow("類型", typeSet, "type") +
      btnRow("年齡", ageSet, "age") +
      btnRow("訓練目標", goalSet, "goal");

    bar.addEventListener("click", e => {
      const b = e.target.closest(".filter-btn");
      if (!b) return;
      state[b.dataset.key] = b.dataset.val;
      render();
    });
    bar.addEventListener("input", e => {
      if (e.target.id === "gameSearch") { state.q = e.target.value.trim(); render(); }
    });
  }

  function goalMatch(g) { return state.goal === "全部" || bucketsOf(g).includes(state.goal); }
  function ageMatch(g) {
    return state.age === "全部" ||
      g.age.includes(state.age) ||
      (g.age.includes("全階段") && state.age !== "全部");
  }
  function textMatch(g) {
    if (!state.q) return true;
    const hay = [g.name, g.en, g.source, g.type, g.goals.join(" "), g.desc].join(" ").toLowerCase();
    return hay.includes(state.q.toLowerCase());
  }

  function render() {
    const items = DRAMA_GAMES.filter(g => goalMatch(g) && ageMatch(g) && textMatch(g) &&
      (state.type === "全部" || g.type === state.type));

    // 更新按鈕狀態
    bar.querySelectorAll(".filter-btn").forEach(b => {
      b.classList.toggle("on", state[b.dataset.key] === b.dataset.val);
    });

    const note = document.getElementById("gameCount");
    if (note) note.textContent = `顯示 ${items.length} / ${DRAMA_GAMES.length} 個遊戲`;

    const body = document.getElementById("gameList");
    if (!items.length) {
      body.innerHTML = `<div class="card"><p>沒有符合條件的遊戲，換個篩選條件試試。</p></div>`;
      return;
    }
    body.innerHTML = items.map((g, i) => `
      <details class="item" data-name="${g.name.replace(/"/g, "&quot;")}">
        <summary>
          <span class="item-title">
            <strong>${g.name}</strong>
            <em>${g.en ? g.en + " · " : ""}${g.source}</em>
          </span>
          <span class="item-meta">
            <span class="chip plain">${g.type}</span>
            <span class="chip gold">${g.age}</span>
            <span class="chip">${g.people}</span>
            <span class="chip terra">${g.minutes}</span>
          </span>
        </summary>
        <div class="item-body">
          <div class="chips" style="margin-top:16px">
            ${g.goals.map(x => `<span class="chip">${x}</span>`).join("")}
            ${g.props ? `<span class="chip plain">道具：${g.props}</span>` : ""}
          </div>
          ${g.desc ? `<p class="mt-2" style="font-size:14.6px;color:var(--ink-soft)">${g.desc}</p>` : ""}
          <dl class="prop">
            <dt>步驟</dt><dd><ol class="steps">${g.how.map(s => `<li>${s}</li>`).join("")}</ol></dd>
            ${g.tips ? `<dt>導師提示</dt><dd>${g.tips}</dd>` : ""}
            ${g.mandarin ? `<dt>普通話結合</dt><dd>${g.mandarin}</dd>` : ""}
          </dl>
          ${g.variation ? `<div class="tip"><strong>變化／加難度：</strong>${g.variation}</div>` : ""}
        </div>
      </details>`).join("");
  }

  // 讓外部（備課工具）有需要時可以把篩選歸零
  window.__gamesResetFilter = () => {
    state.q = ""; state.age = "全部"; state.goal = "全部"; state.type = "全部";
    const sb = document.getElementById("gameSearch");
    if (sb) sb.value = "";
    render();
  };

  render();
}

/* ---------- 備課工具：隨機抽一個遊戲 / 配一節 70 分鐘 ---------- */
function initGameTools() {
  const list = document.getElementById("gameList");
  const out  = document.getElementById("lessonOut");
  if (!list || !out || typeof DRAMA_GAMES === "undefined") return;

  const pick = a => a[Math.floor(Math.random() * a.length)];
  const cards = () => [...list.querySelectorAll("details.item")];
  const byName = n => cards().find(d => d.dataset.name === n);

  function focusGame(name) {
    let el = byName(name);
    if (!el && typeof window.__gamesResetFilter === "function") {
      window.__gamesResetFilter();
      el = byName(name);
    }
    if (!el) return false;
    el.open = true;
    el.scrollIntoView({ block: "center", behavior: "smooth" });
    el.classList.remove("flash");
    void el.offsetWidth;
    el.classList.add("flash");
    return true;
  }

  // 照着課堂骨架排：0–10 暖身、10–15 基本功、15–50 主課、50–63 整合、63–70 收整
  const LESSON_SLOTS = [
    { time: "0–10 分",  slot: "暖身與聚集", types: ["暖身破冰"] },
    { time: "10–15 分", slot: "基本功",     types: ["聲音發聲", "咬字正音"] },
    { time: "15–50 分", slot: "主課",       types: ["即興反應", "形體空間", "情緒角色", "敘事場景", "集體創作"] },
    { time: "50–63 分", slot: "整合與重複", types: ["集體創作", "敘事場景"] },
    { time: "63–70 分", slot: "收整與反思", types: ["專注聆聽"] },
  ];

  const rndBtn = document.getElementById("pickRandom");
  const pickOut = document.getElementById("pickResult");
  if (rndBtn) rndBtn.addEventListener("click", () => {
    const pool = cards().map(d => DRAMA_GAMES.find(g => g.name === d.dataset.name)).filter(Boolean);
    if (!pool.length) {
      if (pickOut) pickOut.innerHTML = "目前的篩選條件下沒有遊戲，先放寬條件再按。";
      return;
    }
    const g = pick(pool);
    if (pickOut) {
      pickOut.innerHTML = `抽到 <strong>${g.name}</strong> —— ${g.type} · ${g.age} · ${g.people} · ${g.minutes}`;
    }
    focusGame(g.name);
  });

  const lesBtn = document.getElementById("buildLesson");
  if (lesBtn) lesBtn.addEventListener("click", () => {
    const rows = LESSON_SLOTS.map(s => {
      const pool = DRAMA_GAMES.filter(g => s.types.includes(g.type));
      if (!pool.length) return "";
      const g = pick(pool);
      return `<div class="lesson-row">
          <span class="lr-time">${s.time}</span>
          <span class="lr-slot">${s.slot}</span>
          <span class="lr-game"><button type="button" data-jump="${g.name.replace(/"/g, "&quot;")}">${g.name}</button></span>
        </div>`;
    }).filter(Boolean);
    out.innerHTML = `<h4>今天這一節 · 70 分鐘</h4>
      ${rows.join("")}`;
    out.querySelectorAll("button[data-jump]").forEach(b => {
      b.addEventListener("click", () => focusGame(b.dataset.jump));
    });
  });
}

/* ---------- 目錄／頁內導覽高亮 ---------- */
function initToc() {
  const toc = document.querySelector(".toc");
  if (!toc) return;
  const links = [...toc.querySelectorAll("a[href^='#']")];
  const targets = links.map(a => document.querySelector(a.getAttribute("href"))).filter(Boolean);
  if (!targets.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      links.forEach(a => a.classList.toggle("on", a.getAttribute("href") === "#" + en.target.id));
    });
  }, { rootMargin: "-90px 0px -70% 0px" });
  targets.forEach(t => obs.observe(t));
}

/* ---------- 首頁統計數字即時更新 ---------- */
function initStats() {
  const el = document.getElementById("statGames");
  if (el && typeof DRAMA_GAMES !== "undefined") el.textContent = String(DRAMA_GAMES.length);
}

document.addEventListener("DOMContentLoaded", () => {
  renderShell();
  initIcons();
  initGameFilter();
  initGameTools();
  initStats();
  initToc();
});
