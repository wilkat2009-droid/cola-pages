/* 華語辯論訓練網站 — 前端邏輯
   資料來自 assets/data.js（由 build/build_db.py 產生）
   路由：hash（#/formats、#/lesson/xxx …）*/

const DB = window.DEBATE_DB || {};
const T = {
  competitions: DB.competitions || [],
  formats: DB.formats || [],
  format_stages: DB.format_stages || [],
  judging_criteria: DB.judging_criteria || [],
  fallacies: DB.fallacies || [],
  cases: DB.cases || [],
  debaters: DB.debaters || [],
  moments: DB.moments || [],
  motions: DB.motions || [],
  methods: DB.methods || [],
  resources: DB.resources || [],
  courses: DB.courses || [],
  lessons: DB.lessons || [],
};

/* ---------- 小工具 ---------- */
const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const split = (s) => String(s ?? "").split(/[;；]/).map((x) => x.trim()).filter(Boolean);
const chips = (s, cls = "") => split(s).map((x) => `<span class="chip ${cls}">${esc(x)}</span>`).join("");
const byId = (arr, id) => arr.find((x) => String(x.id) === String(id));
const sortBy = (arr, key) => [...arr].sort((a, b) => (a[key] > b[key] ? 1 : a[key] < b[key] ? -1 : 0));
const has = (v, q) => String(v ?? "").toLowerCase().includes(q);
const yes = (v) => v !== undefined && v !== null && String(v).trim() !== "" && String(v).trim() !== "—";

function filterRows(rows, q, fields) {
  if (!q) return rows;
  const k = q.toLowerCase();
  return rows.filter((r) => fields.some((f) => has(r[f], k)));
}

/* ---------- 卡片零件 ---------- */
function motionCard(m) {
  return `<div class="card">
    <h3>${esc(m.text)}</h3>
    <div class="meta">
      <span class="chip blue">${esc(m.type || "—")}</span>
      <span class="chip green">${esc(m.level || "—")}</span>
      <span class="chip orange">${esc(m.topic || "—")}</span>
      ${"★".repeat(Number(m.difficulty) || 0)}
    </div>
    ${yes(m.pro_hooks) ? `<p style="margin:8px 0 2px"><b>正方切入</b></p><ul class="plain">${split(m.pro_hooks).map((x) => `<li>${esc(x)}</li>`).join("")}</ul>` : ""}
    ${yes(m.con_hooks) ? `<p style="margin:8px 0 2px"><b>反方切入</b></p><ul class="plain">${split(m.con_hooks).map((x) => `<li>${esc(x)}</li>`).join("")}</ul>` : ""}
  </div>`;
}

function formatCard(f) {
  const stages = sortBy(T.format_stages.filter((s) => s.format_id === f.id), "seq");
  return `<div class="card">
    <h3>${esc(f.name)}</h3>
    <div class="meta">
      ${yes(f.team_size) ? `<span class="chip">每隊 ${esc(f.team_size)} 人</span>` : ""}
      ${yes(f.total_min) ? `<span class="chip grey">約 ${esc(f.total_min)} 分鐘</span>` : ""}
      ${yes(f.level) ? `<span class="chip green">${esc(f.level)}</span>` : ""}
    </div>
    ${yes(f.summary) ? `<p>${esc(f.summary)}</p>` : ""}
    ${stages.length ? `<details><summary>發言流程（${stages.length} 環節）</summary>
      <table><thead><tr><th>#</th><th>環節</th><th>發言</th><th>時長</th><th>規則</th></tr></thead><tbody>
      ${stages.map((s) => `<tr><td>${esc(s.seq)}</td><td>${esc(s.phase)}</td><td>${esc(s.speaker || "—")}</td><td>${yes(s.minutes) ? esc(s.minutes) + "′" : "—"}</td><td>${esc(s.rules || "")}</td></tr>`).join("")}
      </tbody></table></details>` : ""}
    ${yes(f.best_for) ? `<div class="box tip"><h4>適合訓練</h4>${esc(f.best_for)}</div>` : ""}
    ${yes(f.watch_out) ? `<div class="box warn"><h4>新手常踩的坑</h4>${esc(f.watch_out)}</div>` : ""}
    <div class="meta">${yes(f.used_in) ? "用於：" + esc(f.used_in) : ""}</div>
  </div>`;
}

/* ---------- 頁面 ---------- */
const PAGES = {
  home() {
    const n = (k) => (DB._meta?.counts?.[k] ?? T[k].length) || 0;
    return `
      <h1>華語辯論訓練基地</h1>
      <p class="lead">資料庫 + 訓練課程。資料可持續增補，課程可持續延展。</p>
      <div class="grid">
        ${[["formats", "🏛", "賽制庫", "各類華語辯論賽制、發言流程與規則"],
        ["judging", "⚖️", "評判標準", "評分表、優劣判準、邏輯謬誤"],
        ["motions", "🗂", "辯題庫", "分類辯題 + 正反切入點"],
        ["methods", "🧰", "方法工具箱", "立論、反駁、質詢、策略"],
        ["cases", "🎬", "經典名場面", "名局、名辯手、可教學片段"],
        ["course", "🎓", "訓練課程", "階段式課程與課節教案"],
        ["ladder", "🪜", "訓練路徑", "六級能力階梯與可列印檢核表"]]
        .map(([go, icon, t, d]) => `<div class="big-card" onclick="location.hash='#/${go}'">
          <div class="icon">${icon}</div><div class="t">${t}</div><div class="d">${d}</div>
          <div class="n">${go === "judging" ? n("judging_criteria") + n("fallacies") + " 條" :
            go === "cases" ? n("cases") + n("moments") + n("debaters") + " 條" :
              go === "ladder" ? "6 級" :
              go === "course" ? n("courses") + " 課程 · " + n("lessons") + " 節" : n(go) + " 條"}</div>
        </div>`).join("")}
      </div>
      <h2>怎麼用</h2>
      <ol class="steps">
        <li><b>揀賽制</b>：到「賽制庫」選一個適合學生程度的賽制，照著它開一場練習賽。</li>
        <li><b>定標準</b>：到「評判標準」把評分表印出來，讓學生知道什麼叫好。</li>
        <li><b>出題</b>：到「辯題庫」按程度和主題揀題，直接用上面的正反切入點做備稿練習。</li>
        <li><b>教技術</b>：到「方法工具箱」逐個技術練；用「經典名場面」播片段做拆解。</li>
        <li><b>上課</b>：到「訓練課程」按階段走，每節有流程、練習、作業、評估。</li>
      </ol>
      <div class="box tip"><h4>擴充方式</h4>
      在專案 <code>content/</code> 加 JSON 條目，再跑一次 <code>python3 build/build_db.py</code>，
      資料庫與本網站會同步更新。</div>
      <p class="footer">資料產生時間：${esc(DB._meta?.generated_at || "—")}</p>`;
  },

  formats(q) {
    let rows = filterRows(T.formats, q, ["name", "also_known_as", "summary", "used_in", "level", "origin"]);
    const comps = filterRows(T.competitions, q, ["name", "organizer", "region", "level", "notes"]);
    return `
      <h1>賽制庫</h1>
      <p class="lead">先認清賽制，才知道要練什麼。</p>
      ${toolbar("formats", q, `共 ${rows.length} 種賽制 · ${comps.length} 項賽事`)}
      <div class="grid">${rows.map(formatCard).join("") || empty()}</div>
      <h2>賽事一覽</h2>
      ${comps.length ? `<table><thead><tr><th>賽事</th><th>年份</th><th>主辦</th><th>層級</th><th>地區</th><th>狀態</th></tr></thead>
      <tbody>${comps.map((c) => `<tr><td><b>${esc(c.name)}</b>${yes(c.notes) ? `<div class="meta">${esc(c.notes)}</div>` : ""}</td>
        <td>${esc(c.founded || "—")}</td><td>${esc(c.organizer || "—")}</td><td>${esc(c.level || "—")}</td>
        <td>${esc(c.region || "—")}</td><td>${esc(c.status || "—")}</td></tr>`).join("")}</tbody></table>`
        : empty()}`;
  },

  judging(q) {
    let crit = filterRows(T.judging_criteria, q, ["name", "category", "definition", "good_looks_like", "bad_looks_like", "used_in"]);
    let fal = filterRows(T.fallacies, q, ["name_zh", "name_en", "definition", "example", "how_to_break", "category"]);
    return `
      <h1>評判標準</h1>
      <p class="lead">比賽是評判判的；先教學生用評判的眼睛看自己。</p>
      ${toolbar("judging", q, `${crit.length} 項評分標準 · ${fal.length} 條謬誤`)}
      <h2>評分標準與優劣判準</h2>
      ${crit.length ? `<table><thead><tr><th>標準</th><th>類別</th><th>配分</th><th>什麼叫好</th><th>什麼叫不好</th></tr></thead>
      <tbody>${crit.map((c) => `<tr><td><b>${esc(c.name)}</b>${yes(c.definition) ? `<div class="meta">${esc(c.definition)}</div>` : ""}</td>
        <td>${esc(c.category || "—")}</td><td>${esc(c.weight || "—")}</td>
        <td>${esc(c.good_looks_like || "")}</td><td>${esc(c.bad_looks_like || "")}</td></tr>`).join("")}</tbody></table>`
        : empty()}
      <h2>邏輯謬誤速查</h2>
      ${fal.length ? `<table><thead><tr><th>謬誤</th><th>類別</th><th>定義</th><th>例子</th><th>怎麼破</th></tr></thead>
      <tbody>${fal.map((f) => `<tr><td><b>${esc(f.name_zh)}</b>${yes(f.name_en) ? `<div class="meta">${esc(f.name_en)}</div>` : ""}</td>
        <td>${esc(f.category || "—")}</td><td>${esc(f.definition || "")}</td><td>${esc(f.example || "")}</td>
        <td>${esc(f.how_to_break || "")}</td></tr>`).join("")}</tbody></table>`
        : empty()}`;
  },

  motions(q, params) {
    let rows = T.motions.slice();
    const level = params.get("level") || "", topic = params.get("topic") || "", type = params.get("type") || "";
    if (level) rows = rows.filter((m) => m.level === level);
    if (topic) rows = rows.filter((m) => m.topic === topic);
    if (type) rows = rows.filter((m) => m.type === type);
    rows = filterRows(rows, q, ["text", "tags", "pro_hooks", "con_hooks", "topic", "type", "level"]);
    const opt = (name, all, cur) => `<select onchange="setParam('${name}',this.value)">
      <option value="">全部${name === "level" ? "程度" : name === "topic" ? "主題" : "類型"}</option>
      ${all.map((v) => `<option ${v === cur ? "selected" : ""}>${esc(v)}</option>`).join("")}</select>`;
    const levels = [...new Set(T.motions.map((m) => m.level).filter(Boolean))];
    const topics = [...new Set(T.motions.map((m) => m.topic).filter(Boolean))];
    const types = [...new Set(T.motions.map((m) => m.type).filter(Boolean))];
    return `
      <h1>辯題庫</h1>
      <p class="lead">按程度、主題、類型篩選；每題附正反切入點。</p>
      <div class="toolbar">
        <input type="search" placeholder="搜尋辯題／關鍵字…" value="${esc(q)}"
               oninput="setQuery(this.value,'motions')">
        ${opt("level", levels, level)}${opt("topic", topics, topic)}${opt("type", types, type)}
        <span class="count">共 ${rows.length} 題</span>
      </div>
      <div class="grid">${rows.map(motionCard).join("") || empty()}</div>`;
  },

  methods(q) {
    const rows = filterRows(T.methods, q, ["name", "category", "definition", "steps", "example", "teaches"]);
    return `
      <h1>方法工具箱</h1>
      <p class="lead">一項技術一節課，練到能用為止。</p>
      ${toolbar("methods", q, `${rows.length} 項技術`)}
      <div class="grid">${rows.map((m) => `<div class="card">
        <h3>${esc(m.name)}</h3>
        <div class="meta">${yes(m.category) ? `<span class="chip blue">${esc(m.category)}</span>` : ""}${yes(m.level) ? `<span class="chip green">${esc(m.level)}</span>` : ""}</div>
        ${yes(m.definition) ? `<p>${esc(m.definition)}</p>` : ""}
        ${split(m.steps).length ? `<p><b>操作步驟</b></p><ol class="steps">${split(m.steps).map((s) => `<li>${esc(s)}</li>`).join("")}</ol>` : ""}
        ${yes(m.example) ? `<div class="box tip"><h4>例子</h4>${esc(m.example)}</div>` : ""}
        ${yes(m.teaches) ? `<div class="meta">練什麼：${esc(m.teaches)}</div>` : ""}
      </div>`).join("") || empty()}</div>`;
  },

  cases(q) {
    const cs = filterRows(T.cases, q, ["title", "competition", "motion", "pro_team", "con_team", "why_classic", "teaches"]);
    const mo = filterRows(T.moments, q, ["title", "event", "quote", "speaker", "why_powerful", "teaches"]);
    const db = filterRows(T.debaters, q, ["name", "team", "era", "style", "signature_line", "teachable"]);
    const res = filterRows(T.resources, q, ["title", "kind", "note", "url"]);
    return `
      <h1>經典名場面</h1>
      <p class="lead">播片段、拆技術。每個片段都要問：他示範了什麼招？</p>
      ${toolbar("cases", q, `${cs.length} 場名局 · ${mo.length} 個名場面 · ${db.length} 位辯手`)}
      <h2>名局</h2>
      <div class="grid">${cs.map((c) => `<div class="card">
        <h3>${esc(c.title)}</h3>
        <div class="meta">${yes(c.year) ? `<span class="chip">${esc(c.year)}</span>` : ""}${yes(c.competition) ? `<span class="chip grey">${esc(c.competition)}</span>` : ""}</div>
        ${yes(c.motion) ? `<p><b>辯題：</b>${esc(c.motion)}</p>` : ""}
        ${yes(c.pro_team) || yes(c.con_team) ? `<p class="meta">正：${esc(c.pro_team || "—")}｜反：${esc(c.con_team || "—")}｜勝：${esc(c.winner || "—")}</p>` : ""}
        ${yes(c.why_classic) ? `<div class="box tip"><h4>為什麼經典</h4>${esc(c.why_classic)}</div>` : ""}
        ${yes(c.teaches) ? `<div class="meta">可教：${esc(c.teaches)}</div>` : ""}
        ${yes(c.video_url) ? `<p><a href="${esc(c.video_url)}" target="_blank" rel="noopener">▶ 影片</a></p>` : ""}
      </div>`).join("") || empty()}</div>
      <h2>名場面與金句</h2>
      <div class="grid">${mo.map((m) => `<div class="card">
        <h3>${esc(m.title)}</h3>
        <div class="meta">${yes(m.speaker) ? `<span class="chip orange">${esc(m.speaker)}</span>` : ""}${yes(m.year) ? `<span class="chip">${esc(m.year)}</span>` : ""}${yes(m.event) ? `<span class="chip grey">${esc(m.event)}</span>` : ""}</div>
        ${yes(m.quote) ? `<blockquote style="border-left:4px solid var(--yellow);margin:10px 0;padding-left:12px">${esc(m.quote)}</blockquote>` : ""}
        ${yes(m.why_powerful) ? `<p>${esc(m.why_powerful)}</p>` : ""}
        ${yes(m.teaches) ? `<div class="meta">可教：${esc(m.teaches)}</div>` : ""}
        ${yes(m.video_url) ? `<p><a href="${esc(m.video_url)}" target="_blank" rel="noopener">▶ 影片</a></p>` : ""}
      </div>`).join("") || empty()}</div>
      <h2>名辯手</h2>
      <table><thead><tr><th>姓名</th><th>隊伍</th><th>年代</th><th>風格</th><th>可教</th></tr></thead>
      <tbody>${db.map((d) => `<tr><td><b>${esc(d.name)}</b></td><td>${esc(d.team || "—")}</td><td>${esc(d.era || "—")}</td>
        <td>${esc(d.style || "")}${yes(d.signature_line) ? `<div class="meta">「${esc(d.signature_line)}」</div>` : ""}</td>
        <td>${esc(d.teachable || "")}</td></tr>`).join("") || `<tr><td colspan="5">暫無資料</td></tr>`}</tbody></table>
      <h2>影音與網路資源</h2>
      ${res.length ? `<table><thead><tr><th>名稱</th><th>類型</th><th>說明</th><th>狀態</th><th>連結</th></tr></thead>
      <tbody>${res.map((r) => `<tr><td><b>${esc(r.title)}</b></td><td>${esc(r.kind || "—")}</td>
        <td>${esc(r.note || "")}</td>
        <td><span class="chip ${r.status === "可用" ? "green" : "grey"}">${esc(r.status || "未確認")}</span></td>
        <td>${yes(r.url) ? `<a href="${esc(r.url)}" target="_blank" rel="noopener">開啟</a>` : "—"}</td></tr>`).join("")}</tbody></table>`
        : empty()}`;
  },

  ladder(q) {
    const LEVELS = [
      { n: 1, name: "敢開口", desc: "在全班面前站好、講完一段話，不怕被聽。",
        checks: ["能站好、看著聽眾講 30 秒", "聲音能送到課室最後一排", "講錯也不停下來"],
        lessons: ["core-1", "pri-1"] },
      { n: 2, name: "講得出理由", desc: "由「我覺得」進到「因為……而且……如果……」。",
        checks: ["一句主張配兩個理由", "理由不重複", "能給一個具體例子"],
        lessons: ["pri-3", "core-5", "core-7"] },
      { n: 3, name: "聽得清、記得住", desc: "聽完對方的話才回應，並記下對方論點。",
        checks: ["能覆述對方三個論點", "筆記分欄清楚", "能指出哪一點最重要"],
        lessons: ["pri-2", "core-3"] },
      { n: 4, name: "拆得開", desc: "能針對對方論證找到斷點並反駁。",
        checks: ["說得出反駁用了哪一招", "打在核心論點而非小毛病", "能辨識八種以上謬誤"],
        lessons: ["core-10", "adv-3", "adv-4"] },
      { n: 5, name: "組織與分工", desc: "知道自己和其他人的位置，全隊像一個整體。",
        checks: ["寫得出一辯稿與結辯稿", "質詢有明確目標", "自由辯論有承接與收束"],
        lessons: ["core-7", "core-8", "core-9", "adv-6", "adv-7"] },
      { n: 6, name: "評自己", desc: "用評判的眼睛看自己，知道下一步練什麼。",
        checks: ["能按評分表打分並說明理由", "寫得出 100 字自我判詞", "訂得出下一個月訓練重點"],
        lessons: ["core-12", "adv-8"] },
    ];
    const count = DB._meta?.counts || {};
    return `
      <h1>訓練路徑與檢核表</h1>
      <p class="lead">六級能力階梯。每級要「做到什麼」才算過關，過關了才往上走。</p>
      ${LEVELS.map((L) => `<div class="card" style="margin-bottom:14px">
        <h3>第 ${L.n} 級 · ${esc(L.name)}</h3>
        <p>${esc(L.desc)}</p>
        <p><b>過關標準</b></p>
        <ul class="plain">${L.checks.map((c) => `<li>${esc(c)}</li>`).join("")}</ul>
        <p>${L.lessons.map((id) => {
          const l = byId(T.lessons, id);
          return l ? `<a class="chip blue" href="#/lesson/${esc(id)}">${esc(l.title)}</a>` : "";
        }).join(" ")}</p>
      </div>`).join("")}
      <h2>學生能力檢核表（可列印）</h2>
      <div class="toolbar no-print"><button class="btn" onclick="window.print()">🖨 列印檢核表</button>
        <span class="count">資料庫現有：評分標準 ${count.judging_criteria || 0} 項 · 技術 ${count.methods || 0} 項</span></div>
      <table><thead><tr>
        <th>姓名：＿＿＿＿＿＿</th><th>日期：＿＿＿＿</th><th>1–5 分</th><th>評語</th></tr></thead>
      <tbody>${LEVELS.map((L) => `<tr><td colspan="4" style="background:var(--yellow-soft)"><b>第 ${L.n} 級 ${esc(L.name)}</b></td></tr>
        ${L.checks.map((c) => `<tr><td>${esc(c)}</td><td></td><td></td><td></td></tr>`).join("")}`).join("")}</tbody></table>
      <div class="box tip"><h4>怎麼用這張表</h4>
        每次評估只勾一級，別跨級打分。學生在同一級連續兩次拿到 4 分以上，就可以進下一級；
        低於 3 分就回去練該級對應的課節。</div>`;
  },

  course(q, params) {
    const courses = T.courses || [];
    const cid = params.get("c") || (courses[0] && courses[0].id);
    const course = byId(courses, cid) || courses[0];
    if (!course) return `<h1>訓練課程</h1>${empty()}`;
    const lessons = sortBy(T.lessons.filter((l) => l.course_id === course.id), "seq");
    const stages = [...new Set(lessons.map((l) => l.stage).filter(Boolean))];
    return `
      <h1>${esc(course.title)}</h1>
      <p class="lead">${esc(course.description || "")}</p>
      <div class="toolbar">
        ${courses.length > 1 ? courses.map((c) => `<button class="btn ${c.id === course.id ? "" : "ghost"}"
          onclick="setParam('c','${esc(c.id)}')">${esc(c.title)}</button>`).join("") : ""}
        <button class="btn ghost no-print" onclick="window.print()">🖨 列印整份課程</button>
      </div>
      <div class="box goal"><h4>課程目標</h4>${esc(course.goal || "")}
        <div class="meta">對象：${esc(course.audience || "—")}｜程度：${esc(course.level || "—")}｜
        ${esc(course.sessions || lessons.length)} 節 × ${esc(course.minutes || "—")} 分鐘</div></div>
      ${stages.map((st) => `<div class="stage-title">${esc(st)}</div>
        ${lessons.filter((l) => l.stage === st).map((l, i) => `<div class="lesson-row" onclick="location.hash='#/lesson/${esc(l.id)}'">
          <div class="no">${esc(l.seq)}</div>
          <div><div class="ttl">${esc(l.title)}</div><div class="sub">${esc(split(l.objectives)[0] || "")}</div></div>
          <div class="mins">${esc(l.minutes || "")} 分鐘</div></div>`).join("")}`).join("")}
      ${yes(course.extend_note) ? `<div class="box tip"><h4>如何延展</h4>${esc(course.extend_note)}</div>` : ""}`;
  },

  lesson(q, params) {
    const id = params.get("id") || location.hash.split("/")[2];
    const l = byId(T.lessons, id);
    if (!l) return `<h1>找不到課節</h1><p class="back"><a href="#/course">← 回課程</a></p>`;
    const course = byId(T.courses, l.course_id);
    let flow = [];
    try { flow = JSON.parse(l.flow || "[]"); } catch (e) { flow = []; }
    const links = split(l.link_topics).map((t) => {
      const [kind, rid] = t.split(":");
      const table = { motion: "motions", method: "methods", case: "cases", moment: "moments",
        debater: "debaters", format: "formats", fallacy: "fallacies", criteria: "judging_criteria" }[kind];
      const rec = table && byId(T[table] || [], rid);
      return rec ? { kind, label: rec.text || rec.name || rec.name_zh || rec.title, href: "#/" + (kind === "motion" ? "motions" : kind === "method" ? "methods" : kind === "format" ? "formats" : kind === "fallacy" || kind === "criteria" ? "judging" : "cases") } : null;
    }).filter(Boolean);
    return `
      <p class="back no-print"><a href="#/course?c=${esc(l.course_id)}">← 回課程</a>
        <button class="btn ghost" onclick="window.print()" style="margin-left:12px">🖨 列印本節</button></p>
      <h1>第 ${esc(l.seq)} 節 · ${esc(l.title)}</h1>
      <p class="lead">${esc(course?.title || "")}${yes(l.stage) ? " ／ " + esc(l.stage) : ""}｜${esc(l.minutes || "")} 分鐘</p>
      <div class="box goal"><h4>本節目標</h4><ul class="plain">${split(l.objectives).map((o) => `<li>${esc(o)}</li>`).join("")}</ul></div>
      ${flow.length ? `<h2>課堂流程</h2>${flow.map((f) => `<div class="flow-item">
        <div class="m">${esc(f.min)}′</div>
        <div class="b"><b>${esc(f.step)}</b>${esc(f.detail || "")}</div></div>`).join("")}` : ""}
      ${split(l.drills).length ? `<h2>課堂練習</h2><ol class="steps">${split(l.drills).map((d) => `<li>${esc(d)}</li>`).join("")}</ol>` : ""}
      ${yes(l.homework) ? `<div class="box do"><h4>作業</h4>${esc(l.homework)}</div>` : ""}
      ${yes(l.assessment) ? `<div class="box tip"><h4>怎麼看學生做到了</h4>${esc(l.assessment)}</div>` : ""}
      ${yes(l.teacher_notes) ? `<div class="box warn"><h4>教師提示</h4>${esc(l.teacher_notes)}</div>` : ""}
      ${links.length ? `<h2>本節用到的資料庫條目</h2><p>${links.map((x) => `<a class="chip blue" href="${esc(x.href)}">${esc(x.label)}</a>`).join(" ")}</p>` : ""}`;
  },
};

/* ---------- 版面零件 ---------- */
function toolbar(page, q, count) {
  return `<div class="toolbar">
    <input type="search" placeholder="搜尋…" value="${esc(q)}" oninput="setQuery(this.value,'${page}')">
    <span class="count">${esc(count)}</span></div>`;
}
function empty() { return `<p class="lead">這部分還沒有資料 —— 在 <code>content/</code> 補上條目再跑一次建置腳本。</p>`; }

function setQuery(v, page) {
  const hash = location.hash.slice(2) || page;
  const [path, qs] = hash.split("?");
  const p = new URLSearchParams(qs || "");
  if (v) p.set("q", v); else p.delete("q");
  const next = "#/" + path + (p.toString() ? "?" + p.toString() : "");
  history.replaceState(null, "", next);
  render(true);
}
function setParam(k, v) {
  const [path, qs] = (location.hash.slice(2) || "home").split("?");
  const p = new URLSearchParams(qs || "");
  if (v) p.set(k, v); else p.delete(k);
  location.hash = "#/" + path + (p.toString() ? "?" + p.toString() : "");
}

/* ---------- 路由 ---------- */
const NAV = [
  ["home", "🏠 首頁"], ["formats", "🏛 賽制庫"], ["judging", "⚖️ 評判標準"],
  ["motions", "🗂 辯題庫"], ["methods", "🧰 方法工具箱"], ["cases", "🎬 經典名場面"],
  ["course", "🎓 訓練課程"], ["ladder", "🪜 訓練路徑"],
];

function render(keepFocus) {
  const raw = location.hash.slice(2) || "home";
  const [path, qs] = raw.split("?");
  const params = new URLSearchParams(qs || "");
  const q = params.get("q") || "";
  const fn = PAGES[path] || PAGES.home;
  const app = document.getElementById("app");
  const focus = keepFocus && document.activeElement?.type === "search";
  const pos = focus ? document.activeElement.selectionStart : null;
  app.innerHTML = fn(q, params);
  document.querySelectorAll("nav.tabs a").forEach((a) => {
    const p = a.getAttribute("href").slice(2).split("?")[0];
    a.classList.toggle("active", p === path || (path === "lesson" && p === "course"));
  });
  document.getElementById("nav").innerHTML = NAV.map(([p, label]) =>
    `<a href="#/${p}" class="${p === path || (path === "lesson" && p === "course") ? "active" : ""}">${label}</a>`).join("");
  if (focus) { const el = app.querySelector("input[type=search]"); if (el) { el.focus(); el.setSelectionRange(pos, pos); } }
  window.scrollTo(0, 0);
}

window.addEventListener("hashchange", () => render());
document.addEventListener("DOMContentLoaded", () => {
  const counts = DB._meta?.counts || {};
  document.getElementById("stats").textContent =
    `賽制 ${counts.formats || 0}｜賽事 ${counts.competitions || 0}｜評分標準 ${counts.judging_criteria || 0}` +
    `｜謬誤 ${counts.fallacies || 0}｜辯題 ${counts.motions || 0}｜技術 ${counts.methods || 0}` +
    `｜名局 ${counts.cases || 0}｜名場面 ${counts.moments || 0}｜課節 ${counts.lessons || 0}`;
  render();
  // 鍵盤：數字 1-8 切頁
  document.addEventListener("keydown", (e) => {
    if (e.target.tagName === "INPUT" || e.target.tagName === "SELECT") return;
    const i = parseInt(e.key, 10);
    if (i >= 1 && i <= NAV.length) location.hash = "#/" + NAV[i - 1][0];
  });
});
