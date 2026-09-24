/* ==========================================================================
   播音主持訓練體系 — 互動腳本
   無外部依賴；所有狀態可選地存在 localStorage（file:// 下失效也不影響使用）
   ========================================================================== */

const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

/* ---------- 安全的本地儲存 ---------- */
const store = {
  get(k, d) { try { const v = localStorage.getItem('bc:' + k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem('bc:' + k, JSON.stringify(v)); } catch (e) {} }
};

/* ---------- 音檔播放（支援語速） ---------- */
let current = null;

function playAudio(btn) {
  const src = btn.dataset.src;
  const rate = parseFloat(btn.dataset.rate || '1');
  if (!src) return;

  if (current && current.btn === btn && !current.el.paused) {
    current.el.pause();
    current.el.currentTime = 0;
    btn.classList.remove('playing');
    btn.textContent = '▶';
    return;
  }
  if (current) {
    current.el.pause();
    current.btn.classList.remove('playing');
    current.btn.textContent = '▶';
  }

  const el = new Audio(src);
  el.playbackRate = rate;
  el.preservesPitch = true;
  el.onended = () => { btn.classList.remove('playing'); btn.textContent = '▶'; };
  el.play().catch(() => {
    btn.textContent = '!';
    setTimeout(() => { btn.textContent = '▶'; }, 1200);
  });
  btn.classList.add('playing');
  btn.textContent = '❚❚';
  current = { el, btn };
}

function initAudio() {
  $$('.play').forEach(btn => {
    btn.addEventListener('click', () => playAudio(btn));
  });
  $$('.audio-line').forEach(line => {
    const btn = $('.play', line);
    if (!btn) return;
    $$('.sp', line).forEach(sp => {
      sp.addEventListener('click', () => {
        $$('.sp', line).forEach(x => x.classList.remove('on'));
        sp.classList.add('on');
        btn.dataset.rate = sp.dataset.rate;
      });
    });
  });
}

/* ---------- 手風琴（初班關卡） ---------- */
function initAccordion() {
  $$('.game-head').forEach(head => {
    head.addEventListener('click', () => head.parentElement.classList.toggle('open'));
  });
}

/* ---------- 抽卡 ---------- */
const KQ_CARDS = [
  ['大嘴巴', '像獅子打呵欠一樣張大嘴巴，停三秒。'],
  ['小嘴巴', '嘴唇收圓，像小魚吐泡泡。'],
  ['微笑嘴', '嘴角向兩邊拉起，露出牙齒。'],
  ['火車嘴', '嘴唇快速打嘟嚕，讓嘴唇震起來。'],
  ['吹蠟燭',   '嘴唇向前集中，慢慢把氣吹出去。'],
  ['吃檸檬', '做一個酸酸的誇張表情。'],
  ['吃西瓜', '誇張咀嚼，讓下巴活動起來。'],
  ['舌頭散步', '舌頭伸出來，慢慢繞嘴唇一圈。']
];

const HOST_CARDS = [
  ['介紹水果', '大家好，我是小主持人。今天我要介紹蘋果。蘋果是紅色的，又香又甜，大家喜歡吃蘋果嗎？'],
  ['天氣報道', '現在為大家報道，今天陽光充足，天氣很炎熱，大家外出時要記得多喝水。'],
  ['活動開場', '各位小朋友，大家好！歡迎來到今天的故事時間，請大家坐好，準備一起出發！'],
  ['介紹自己', '大家好，我是______。我最喜歡的事情是______，希望和大家一起玩得開心。'],
  ['介紹學校', '大家好，今天我要帶大家參觀我的學校。這裡是我們的操場，每天我們都在這裡跑步。'],
  ['感謝結尾', '今天的節目到這裡就結束了，謝謝大家的收看，我們下次再見！']
];

function draw(btnSel, boxSel, pool, render) {
  const btn = $(btnSel), box = $(boxSel);
  if (!btn || !box) return;
  let last = -1;
  btn.addEventListener('click', () => {
    let i = Math.floor(Math.random() * pool.length);
    if (pool.length > 1 && i === last) i = (i + 1) % pool.length;
    last = i;
    box.innerHTML = render(pool[i]);
    if (box.animate) {
      box.animate(
        [{ opacity: 0, transform: 'translateY(8px)' }, { opacity: 1, transform: 'none' }],
        { duration: 260, easing: 'ease-out' }
      );
    }
  });
}

/* ---------- 動作卡（嘴巴健身房） ---------- */
function initFaceCards() {
  const grid = $('#faceGrid'), tip = $('#faceTip');
  if (!grid || !tip) return;
  $$('.face', grid).forEach(f => {
    f.addEventListener('click', () => {
      $$('.face', grid).forEach(x => x.classList.remove('active'));
      f.classList.add('active');
      tip.innerHTML = '<div class="big">' + $('b', f).textContent + '</div><div class="hint">' + f.dataset.tip + '</div>';
    });
  });
}

/* ---------- 關卡徽章 ---------- */
function initBadges() {
  const badges = $$('.badge');
  if (!badges.length) return;
  let done = store.get('badges', []);

  function paint() {
    badges.forEach(b => {
      if (!b.dataset.base) b.dataset.base = b.textContent.trim() || ('關卡 ' + b.dataset.badge);
      let lbl = $('.lbl', b);
      if (!lbl) {
        Array.from(b.childNodes).forEach(n => { if (n.nodeType === 3) n.remove(); });
        lbl = document.createElement('span'); lbl.className = 'lbl'; b.appendChild(lbl);
      }
      const on = done.includes(+b.dataset.badge);
      b.classList.toggle('done', on);
      lbl.textContent = b.dataset.base + (on ? ' ✓' : '');
    });
    $$('.mark').forEach(btn => {
      const on = done.includes(+btn.dataset.badge);
      btn.textContent = on ? '已標記 ✓（再按取消）' : '標記完成 ✓';
    });
  }

  $$('.mark').forEach(btn => btn.addEventListener('click', () => {
    const n = +btn.dataset.badge;
    done = done.includes(n) ? done.filter(x => x !== n) : done.concat(n);
    store.set('badges', done);
    paint();
  }));
  paint();
}

/* ---------- 呼吸節拍器 ---------- */
function initBreath() {
  const btn = $('#breathBtn');
  if (!btn) return;
  const ball = $('#breathBall'), info = $('#breathInfo');
  let running = false, cycles = 0;

  const wait = ms => new Promise(r => setTimeout(r, ms));

  async function loop() {
    running = true;
    btn.textContent = '停止';
    let n = 0;
    while (running) {
      n++;
      ball.className = 'breath in';
      ball.textContent = '吸氣 4 拍';
      info.textContent = '第 ' + n + ' 組：鼻子吸氣，肩膀不要聳起。';
      await wait(4000);
      if (!running) break;
      ball.className = 'breath out';
      ball.textContent = '吐氣 8 拍';
      info.textContent = '第 ' + n + ' 組：用 s—— 或 sh—— 把氣慢慢送出去。';
      await wait(8000);
      if (!running) break;
      cycles = n;
      if (n >= 6) {
        ball.textContent = '完成 6 組';
        info.textContent = '很棒。現在用剛才的氣息念一段繞口令試試。';
        break;
      }
    }
    running = false;
    btn.textContent = '重新開始';
  }

  btn.addEventListener('click', () => {
    if (running) { running = false; ball.className = 'breath'; ball.textContent = '已停止'; info.textContent = ''; btn.textContent = '重新開始'; return; }
    loop();
  });
}

/* ---------- 話筒距離 ---------- */
function initMic() {
  const r = $('#micRange'), out = $('#micMeter');
  if (!r || !out) return;
  const levels = [
    [0, 24,  '太近了', '話筒幾乎貼著嘴巴，會爆音、噴麥。往後退一點。'],
    [25, 42, '稍近', '有噴氣聲。試著把話筒拉到下巴前方一拳的位置。'],
    [43, 62, '剛剛好', '距離合適，聲音自然清楚。說話時不要一直前後晃。'],
    [63, 82, '稍遠', '聲音開始發散。往前一點，或把聲音集中送出去。'],
    [83, 100,'太遠了', '聽不清字音。話筒要靠近一點，但不是貼上去。']
  ];
  function upd() {
    const v = +r.value;
    const lv = levels.find(l => v >= l[0] && v <= l[1]);
    out.innerHTML = '<span>' + lv[2] + '</span><small>' + lv[3] + '</small>';
  }
  r.addEventListener('input', upd);
  upd();
}

/* ---------- 眼神操 ---------- */
const EYE_SPOTS = [
  ['左邊的朋友', '看向左前方，把一句話說給他聽。'],
  ['中間的觀眾', '這是你的主要方向，停留的時間可以長一點。'],
  ['右邊的朋友', '看向右前方，記得嘴角也要跟著走。'],
  ['後排的觀眾', '下巴微微抬起，把聲音和眼神一起送到最後一排。']
];

function initEyes() {
  const stage = $('#stage');
  if (!stage) return;
  const stars = $$('.star', stage);
  stars.forEach((s, i) => {
    s.addEventListener('click', () => {
      stars.forEach(x => x.classList.remove('lit'));
      s.classList.add('lit');
      const t = EYE_SPOTS[i % EYE_SPOTS.length];
      const box = $('#eyeNow');
      if (box) box.innerHTML = '<b>' + t[0] + '</b><span>' + t[1] + '</span>';
    });
  });

  const rnd = $('#eyeRandom');
  if (rnd) {
    rnd.addEventListener('click', () => {
      const i = Math.floor(Math.random() * stars.length);
      stars[i].click();
    });
  }
}

/* ---------- 翻卡 ---------- */
function initFlip() {
  $$('.flip').forEach(c => c.addEventListener('click', () => c.classList.toggle('on')));
}

/* ---------- 一分鐘主持 ---------- */
function initHostTimer() {
  const start = $('#hostStart'), face = $('#hostTimer'), bar = $('#hostBar'), box = $('#hostBox');
  if (!start) return;
  const total = 60;
  let t = total, timer = null, running = false;

  function render() {
    const m = Math.floor(t / 60), s = t % 60;
    face.textContent = m + ':' + String(s).padStart(2, '0');
    face.classList.toggle('warn', t <= 10);
    if (bar) bar.style.width = ((total - t) / total * 100) + '%';
  }

  function stop() {
    clearInterval(timer); running = false; start.textContent = '開始計時 60 秒'; t = total; render();
  }

  start.addEventListener('click', () => {
    if (running) { stop(); return; }
    t = total; running = true; render();
    start.textContent = '停止';
    timer = setInterval(() => {
      t--; render();
      if (t <= 0) { clearInterval(timer); running = false; start.textContent = '再來一次'; face.textContent = '完成'; }
    }, 1000);
  });
  render();
}

/* ---------- 30 分鐘訓練流程 ---------- */
const SEQ = [
  [3,  '身體放鬆與姿態', '伸展肩頸、搓臉、放鬆下巴，站好，雙腳踩穩。'],
  [5,  '呼吸與氣息', '吸 4 拍、吐 8 拍，做 6 組；最後用一口氣數葫蘆。'],
  [7,  '發聲與共鳴', '唇顫音暖聲，再由 m—— 過渡到 mi、ma、mu。'],
  [5,  '口部操與吐字', '抽卡做口部操，再念兩段繞口令，慢的準了才加快。'],
  [4,  '普通話易錯音', '四聲、平翹舌、前後鼻音，各念三遍。'],
  [4,  '稿件朗讀', '先標停連與重音，再讀一遍，錄音。'],
  [2,  '即興表達與自檢', '抽一張任務卡說 30 秒，然後聽錄音找一個要改的地方。']
];

function initSequencer() {
  const btn = $('#seqStart');
  if (!btn) return;
  const face = $('#seqTimer'), task = $('#seqTask'), bar = $('#seqBar'), list = $('#seqList');
  if (list) {
    list.innerHTML = SEQ.map((s, i) =>
      '<li data-i="' + i + '"><b>' + (i + 1) + '</b> ' + s[1] + ' <em>' + s[0] + ' 分鐘</em></li>'
    ).join('');
  }

  let idx = -1, left = 0, timer = null, running = false;

  function paint() {
    if (idx < 0) {
      face.textContent = '30:00'; task.innerHTML = '<b>準備開始</b><p>找一個安靜的地方，站好，深呼吸一次。</p>';
      if (bar) bar.style.width = '0%';
      return;
    }
    const [min, name, tip] = SEQ[idx];
    face.textContent = String(Math.floor(left / 60)).padStart(2, '0') + ':' + String(left % 60).padStart(2, '0');
    task.innerHTML = '<b>' + (idx + 1) + '／7　' + name + '</b><p>' + tip + '</p>';
    const done = SEQ.slice(0, idx).reduce((a, s) => a + s[0], 0) + (min - left / 60);
    if (bar) bar.style.width = Math.min(100, done / 30 * 100) + '%';
    $$('#seqList li').forEach(li => li.classList.toggle('on', +li.dataset.i === idx));
  }

  function next() {
    idx++;
    if (idx >= SEQ.length) {
      clearInterval(timer); running = false; btn.textContent = '重新開始';
      face.textContent = '完成'; task.innerHTML = '<b>今天練完了</b><p>聽一遍錄音，寫下明天要改的一件事。</p>';
      if (bar) bar.style.width = '100%';
      return;
    }
    left = SEQ[idx][0] * 60;
    paint();
  }

  btn.addEventListener('click', () => {
    if (running) { clearInterval(timer); running = false; btn.textContent = '繼續'; return; }
    running = true; btn.textContent = '暫停';
    if (idx < 0) next();
    clearInterval(timer);
    timer = setInterval(() => {
      left--; if (left < 0) { next(); return; } paint();
    }, 1000);
    paint();
  });
  paint();
}

/* ---------- 30 天打卡 ---------- */
function initCalendar() {
  const cal = $('#cal.cal');
  if (!cal) return;
  let done = store.get('days', []);
  cal.innerHTML = Array.from({ length: 30 }, (_, i) => i + 1)
    .map(d => '<button class="day' + (done.includes(d) ? ' done' : '') + '" data-d="' + d + '">' + d + '</button>')
    .join('');
  cal.addEventListener('click', e => {
    const b = e.target.closest('.day');
    if (!b) return;
    const d = +b.dataset.d;
    done = done.includes(d) ? done.filter(x => x !== d) : done.concat(d);
    b.classList.toggle('done');
    store.set('days', done);
    const n = $('#calCount');
    if (n) n.textContent = done.length;
  });
  const n = $('#calCount');
  if (n) n.textContent = done.length;
}

/* ==========================================================================
   集誦訓練（choral.html）
   ========================================================================== */

/* ---------- 齊一拍點器 ---------- */
function initChoralBeat() {
  const row = $('#beatRow');
  if (!row) return;
  const toggle = $('#beatToggle');
  const bpmOut = $('#beatBpm');
  const BEATS = 8, PER_BAR = 4;

  for (let i = 0; i < BEATS; i++) {
    const d = document.createElement('div');
    d.className = 'beat' + (i % PER_BAR === 0 ? ' accent' : '');
    row.appendChild(d);
  }
  const dots = $$('.beat', row);
  let bpm = 75, timer = null, idx = 0;

  function tick() {
    dots.forEach(d => d.classList.remove('on'));
    dots[idx % BEATS].classList.add('on');
    idx++;
  }

  function start() {
    stop();
    idx = 0;
    tick();
    timer = setInterval(tick, 60000 / bpm);
  }
  function stop() {
    if (timer) clearInterval(timer);
    timer = null;
    dots.forEach(d => d.classList.remove('on'));
  }

  if (toggle) {
    toggle.addEventListener('click', () => {
      if (timer) { stop(); toggle.textContent = '開始拍點'; }
      else { start(); toggle.textContent = '停止'; }
    });
  }
  $$('.beat-tempo').forEach(b => {
    b.addEventListener('click', () => {
      $$('.beat-tempo').forEach(x => x.classList.remove('on'));
      b.classList.add('on');
      bpm = +b.dataset.bpm;
      if (bpmOut) bpmOut.textContent = bpm;
      if (timer) start();
    });
  });
  if (bpmOut) bpmOut.textContent = bpm;
}

/* ---------- 起句倒數 ---------- */
function initChoralCue() {
  const box = $('#cueBox');
  const btn = $('#cueBtn');
  if (!box || !btn) return;
  const fastBtn = $('#cueFast');
  let half = false, running = false;
  const wait = ms => new Promise(r => setTimeout(r, ms));

  function paint(text, cls) {
    box.className = 'cuebox ' + (cls || '');
    box.textContent = text;
  }

  async function run() {
    if (running) return;
    running = true;
    btn.disabled = true;
    const beat = half ? 1400 : 800;
    const lead = half ? 1600 : 1000;
    paint('預備', 'ready');
    await wait(lead);
    for (const n of ['三', '二', '一']) {
      paint(n, 'tick');
      await wait(beat);
    }
    paint('開口！', 'go');
    running = false;
    btn.disabled = false;
    setTimeout(() => { if (!running) paint('可以再來一次', 'ready'); }, 2000);
  }

  btn.addEventListener('click', run);
  if (fastBtn) {
    fastBtn.addEventListener('click', () => {
      half = !half;
      fastBtn.textContent = half ? '換回「原速」起句' : '換成「半速」起句';
      box.className = 'cuebox ready';
      box.textContent = half ? '半速：每拍慢一點' : '原速';
    });
  }
}

/* ---------- 一起呼吸（跟示範音同步） ---------- */
function initChoralBreath() {
  const btn = $('#choBreathBtn');
  if (!btn) return;
  const ball = $('#choBreath'), phase = $('#choBreathPhase');
  const CYCLE = 15;
  let el = null, on = false;

  // 0-1.1 準備 1.1-5.1 吸 5.1-7.3 屏住 7.3-15 吐
  const phases = [
    [0, 1.1, '準備', '', '準備：站好，肩膀放鬆'],
    [1.1, 5.1, '吸氣 4 拍', 'in', '鼻子吸氣，肩膀不要聳起來'],
    [5.1, 7.3, '屏住', 'hold', '屏住，全班一起數兩拍'],
    [7.3, 15, '吐氣 8 拍', 'out', '用 s—— 慢慢把氣送出去，吐到最後還在吐']
  ];

  function paint(t) {
    const p = phases.find(x => t >= x[0] && t < x[1]) || phases[0];
    if (ball.className !== 'breath ' + p[3]) {
      ball.className = 'breath ' + p[3];
      ball.innerHTML = p[2];
    }
    phase.textContent = p[4];
  }

  btn.addEventListener('click', () => {
    if (on) {
      on = false;
      if (el) { el.pause(); el.currentTime = 0; }
      ball.className = 'breath';
      ball.innerHTML = '按開始，<br>全班一起呼吸';
      phase.textContent = '準備';
      btn.textContent = '開始 · 吸 4 吐 8';
      return;
    }
    if (!el) {
      el = new Audio('audio/c02_huxi_4_8.mp3');
      el.onended = () => {
        if (!on) return;
        el.currentTime = 0; el.play();
      };
      el.ontimeupdate = () => paint(el.currentTime % CYCLE);
    }
    on = true;
    el.currentTime = 0;
    el.play().catch(() => { btn.textContent = '音檔讀不到，請用「開啟網站.command」'; });
    paint(0);
    btn.textContent = '停止';
  });
}

/* ---------- 聲部混音台 ---------- */
function initMixer() {
  const mixer = $('#mixer');
  if (!mixer) return;
  const playBtn = $('#mixPlay');
  const rows = $$('.mixrow', mixer);
  const tracks = rows.map(r => {
    const input = $('input', r), val = $('.val', r);
    const audio = new Audio(r.dataset.src);
    audio.loop = true;
    audio.volume = (+input.value) / 100;
    input.addEventListener('input', () => {
      audio.volume = (+input.value) / 100;
      val.textContent = input.value;
    });
    return { input, val, audio };
  });

  let on = false;
  function play() { tracks.forEach(t => t.audio.play().catch(() => {})); }
  function stop() { tracks.forEach(t => { t.audio.pause(); t.audio.currentTime = 0; }); }
  function setVolumes(map) {
    tracks.forEach(t => {
      const v = map[t.input.getAttribute('aria-label')];
      if (v === undefined) return;
      t.input.value = v;
      t.audio.volume = v / 100;
      t.val.textContent = v;
    });
  }

  if (playBtn) {
    playBtn.addEventListener('click', () => {
      if (on) { stop(); on = false; playBtn.textContent = '一起播放三個聲部'; return; }
      play();
      on = true;
      playBtn.textContent = '停止';
    });
  }

  const presets = {
    mid:     { '高音部音量': 0, '主音部音量': 100, '低音部音量': 0 },
    balance: { '高音部音量': 55, '主音部音量': 100, '低音部音量': 55 },
    lowbig:  { '高音部音量': 40, '主音部音量': 100, '低音部音量': 100 },
    highbig: { '高音部音量': 100, '主音部音量': 100, '低音部音量': 40 }
  };
  $$('.mix-preset').forEach(b => {
    b.addEventListener('click', () => {
      const p = presets[b.dataset.preset];
      if (p) setVolumes(p);
      if (!on && playBtn) { play(); on = true; playBtn.textContent = '停止'; }
    });
  });
}

/* ---------- 隊形切換 ---------- */
function initFormation() {
  const row = $('#formRow');
  if (!row) return;
  const img = $('#formImg'), cap = $('#formCap');
  $$('.formbtn', row).forEach(b => {
    b.addEventListener('click', () => {
      $$('.formbtn', row).forEach(x => x.classList.remove('on'));
      b.classList.add('on');
      if (img) img.src = b.dataset.img;
      if (cap) cap.innerHTML = b.dataset.cap;
    });
  });
}

/* ---------- 集誦自檢表 ---------- */
function initSelfCheck() {
  const host = $('#selfCheck');
  if (!host) return;
  const ITEMS = [
    '一起呼吸：閉眼聽，只聽到一個吸氣聲',
    '一起起句：第一個字沒有「兩層」',
    '一起收句：最後一個字同時收乾淨，沒有拖尾',
    '節奏一致：沒有愈念愈快，也沒有拖慢',
    '咬字清楚：在教室最後面也聽得見字',
    '主音部聽得見：加了低音部和高音部之後，還聽得清主音',
    '音量層次：變小聲時咬字還清楚，變大聲時不是喊',
    '整體情緒：全班的強弱是同一條線，不是平的'
  ];
  const OPTS = [[1, '還要練'], [2, '可以'], [3, '很好']];
  const scores = new Array(ITEMS.length).fill(0);

  ITEMS.forEach((q, i) => {
    const row = document.createElement('div');
    row.className = 'scrow';
    const label = document.createElement('div');
    label.className = 'scq';
    label.textContent = (i + 1) + '. ' + q;
    const btns = document.createElement('div');
    btns.className = 'scbtns';
    OPTS.forEach(o => {
      const b = document.createElement('button');
      b.className = 'scbtn';
      b.dataset.v = o[0];
      b.textContent = o[1];
      b.addEventListener('click', () => {
        scores[i] = o[0];
        $$('.scbtn', btns).forEach(x => x.classList.remove('on'));
        b.classList.add('on');
        paint();
      });
      btns.appendChild(b);
    });
    row.appendChild(label);
    row.appendChild(btns);
    host.appendChild(row);
  });

  const num = $('#scoreNum'), word = $('#scoreWord');
  function paint() {
    const total = scores.reduce((a, b) => a + b, 0);
    const done = scores.filter(Boolean).length;
    if (num) num.textContent = total;
    if (!word) return;
    if (!done) { word.textContent = ''; return; }
    if (done < ITEMS.length) { word.textContent = '還有 ' + (ITEMS.length - done) + ' 項沒打'; return; }
    if (total <= 11) word.textContent = '先把「一起」練好：呼吸、起句、收句。';
    else if (total <= 18) word.textContent = '整齊有基礎了。下一步練分聲部與音量層次。';
    else if (total <= 22) word.textContent = '很齊了。現在把情緒放進去，不要只是正確。';
    else word.textContent = '很完整。上台前再錄一次、再打一次分，看有沒有退步。';
  }

  const reset = $('#scoreReset');
  if (reset) {
    reset.addEventListener('click', () => {
      scores.fill(0);
      $$('.scbtn.on', host).forEach(b => b.classList.remove('on'));
      paint();
    });
  }
  paint();
}

/* ---------- 集誦十項圖示總覽：點卡展開並跳位 ---------- */
function initTenGrid() {
  const grid = $('#tenGrid');
  if (!grid) return;
  $$('.tcard', grid).forEach(card => {
    card.addEventListener('click', e => {
      const id = (card.getAttribute('href') || '').replace('#', '');
      const target = id && document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      target.classList.add('open');
      const y = target.getBoundingClientRect().top + window.scrollY - 82;
      window.scrollTo({ top: y, behavior: 'smooth' });
      if (history.replaceState) history.replaceState(null, '', '#' + id);
      target.style.transition = 'box-shadow .35s ease';
      target.style.boxShadow = '0 0 0 3px rgba(194, 86, 42, .28)';
      setTimeout(() => { target.style.boxShadow = ''; }, 1500);
    });
  });
}

/* ---------- 導覽與目錄高亮 ---------- */
function initNav() {
  const here = location.pathname.split('/').pop() || 'index.html';
  $$('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === here) a.classList.add('on');
  });

  const links = $$('.toc a');
  if (links.length) {
    const targets = links.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          links.forEach(l => l.classList.toggle('on', l.getAttribute('href') === '#' + en.target.id));
        }
      });
    }, { rootMargin: '-84px 0px -70% 0px' });
    targets.forEach(t => io.observe(t));
  }
}

/* ---------- 示範影片（media.html） ----------
   只是一次只播一段：頁面上不放 iframe，點播放鍵才會把唯一的
   那個 iframe 掛上去；關掉時把 iframe 從 DOM 移除（聲音立刻斷）。 ---------- */
function initMedia() {
  const host = $('#videoGroups');
  if (!host) return;
  const modal = $('#vidPlayer');
  const frame = $('#pmFrame');
  if (!modal || !frame) return;
  if (typeof MEDIA_VIDEOS === 'undefined' || !MEDIA_VIDEOS.length) {
    host.innerHTML = '<div class="note" style="margin-top:18px"><b>影片清單還在整理中。</b>目前這一頁已有自己畫的兩張圖解，可以直接用。</div>';
    return;
  }
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const mmss = t => Math.floor(t / 60) + ':' + String(Math.floor(t % 60)).padStart(2, '0');

  /* 攤平成一維清單，每段影片一個固定編號 */
  const FLAT = [];
  MEDIA_VIDEOS.forEach(g => g.items.forEach(v => FLAT.push(v)));

  /* 自動播放：使用者已經主動按了播放鍵，所以帶上 autoplay=1 */
  const withAutoplay = url => url + (url.indexOf('?') === -1 ? '?' : '&') + 'autoplay=1';

  host.innerHTML = MEDIA_VIDEOS.map(function (g) {
    const cards = g.items.map(function (v) {
      const idx = FLAT.indexOf(v);
      const chips = (v.chapters && v.chapters.length)
        ? '<div class="chaps" role="group" aria-label="跳到其中一節">' +
            '<span class="chaps-lab">跳到其中一節</span>' +
            v.chapters.map(function (c) {
              return '<button type="button" class="chap" data-idx="' + idx + '" data-t="' + c.t + '">' +
                '<b>' + mmss(c.t) + '</b>' + esc(c.name) + '</button>';
            }).join('') +
          '</div>'
        : '';
      return '<article class="vid" data-idx="' + idx + '">' +
        '<button class="poster" type="button" aria-label="播放：' + esc(v.title) + '">' +
          '<span class="pl" aria-hidden="true">▶</span>' +
          '<span class="plabel">按這裡播放</span>' +
        '</button>' +
        '<div class="meta">' +
          '<h4>' + esc(v.title) + '</h4>' +
          '<p class="by">' + esc(v.by) + '</p>' +
          chips +
          '<p class="open"><a href="' + esc(v.page) + '" target="_blank" rel="noopener">原站 ↗</a></p>' +
        '</div></article>';
    }).join('');
    return '<h3 style="margin-top:32px">' + esc(g.group) + '</h3>' +
      '<div class="vids">' + cards + '</div>';
  }).join('');

  let current = -1;
  let currentVideo = null;
  let returnFocus = null;
  const kill = $('#vidKill');

  function markPlaying(idx) {
    current = idx;
    host.querySelectorAll('.vid').forEach(function (c) {
      c.classList.toggle('playing', Number(c.dataset.idx) === idx);
    });
    if (kill) kill.hidden = idx < 0;
  }

  /* 把 iframe 從 DOM 裡拔掉——這一步才是真的把聲音斷乾淨。 */
  function stopVideo() {
    frame.innerHTML = '';
    frame.classList.remove('portrait');
    currentVideo = null;
    modal.hidden = true;
    markPlaying(-1);
    if (returnFocus && document.body.contains(returnFocus)) returnFocus.focus();
    returnFocus = null;
  }

  function openVideo(idx, seekTo) {
    const v = FLAT[idx];
    if (!v) return;
    const card = host.querySelector('.vid[data-idx="' + idx + '"]');
    const wasCurrent = current === idx;
    const keepFocus = wasCurrent ? returnFocus : null;
    stopVideo();
    returnFocus = keepFocus || (card ? card.querySelector('.poster') : null);
    $('#pmTitle').textContent = v.title;
    $('#pmBy').textContent = v.by;
    $('#pmOpen').href = v.page;
    /* 外站嵌入：把唯一的 iframe 掛上去 */
    function playEmbed() {
      frame.classList.remove('portrait');
      const ifr = document.createElement('iframe');
      ifr.src = withAutoplay(v.embed);
      ifr.title = v.title;
      ifr.setAttribute('allowfullscreen', '');
      ifr.setAttribute('allow', 'autoplay; fullscreen; encrypted-media; picture-in-picture');
      ifr.setAttribute('scrolling', 'no');
      ifr.setAttribute('frameborder', '0');
      frame.appendChild(ifr);
    }

    if (v.local) {
      /* 本機檔案：用 <video> 播，不用登入、不用連網、沒有彈幕 */
      const vd = document.createElement('video');
      vd.src = v.local;
      vd.controls = true;
      vd.preload = 'metadata';
      vd.setAttribute('playsinline', '');
      frame.appendChild(vd);
      currentVideo = vd;
      /* 直式影片：播放器換成直式的框，不要讓人物縮成中間一小條 */
      frame.classList.toggle('portrait', !!v.portrait);
      const start = function () {
        if (seekTo != null) vd.currentTime = seekTo;
        const p = vd.play();
        if (p && p.catch) p.catch(function () { /* 瀏覽器不讓自動播就等使用者按 */ });
      };
      if (vd.readyState >= 1) start();
      else vd.addEventListener('loadedmetadata', start, { once: true });
      /* 線上版沒有帶這個 mp4 時：能改播外站就連外站，不能就說明一下 */
      let fellBack = false;
      vd.addEventListener('error', function () {
        if (fellBack || !currentVideo) return;
        fellBack = true;
        frame.innerHTML = '';
        currentVideo = null;
        if (v.embed) {
          playEmbed();
          return;
        }
        const msg = document.createElement('div');
        msg.className = 'vmiss';
        msg.innerHTML = '<b>' + esc(v.title) + '</b><span>這一段放在教室電腦裡，線上版沒有。</span>';
        frame.appendChild(msg);
      });
    } else {
      playEmbed();
    }
    modal.hidden = false;
    markPlaying(idx);
    /* 已經在看同一段就只跳時間，不把頁面捲上去 */
    if (wasCurrent) return;
    /* 把播放器帶到看得見的位置 */
    modal.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  host.addEventListener('click', function (e) {
    const chap = e.target.closest('.chap');
    if (chap) {
      const idx = Number(chap.dataset.idx);
      const t = Number(chap.dataset.t);
      if (current === idx && currentVideo) {
        currentVideo.currentTime = t;
        const p = currentVideo.play();
        if (p && p.catch) p.catch(function () {});
      } else {
        openVideo(idx, t);
      }
      return;
    }
    const btn = e.target.closest('.poster');
    if (!btn) return;
    const card = btn.closest('.vid');
    if (card) openVideo(Number(card.dataset.idx));
  });

  $('#pmStop').addEventListener('click', stopVideo);
  if (kill) kill.addEventListener('click', stopVideo);
  $('#vidStop').addEventListener('click', function () {
    stopVideo();
    const self = this;
    const was = self.textContent;
    self.textContent = '✓ 已停止';
    setTimeout(function () { self.textContent = was; }, 1400);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.hidden) stopVideo();
  });
}

/* ---------- 啟動 ---------- */
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initAudio();
  initAccordion();
  initBreath();
  initMic();
  initEyes();
  initFlip();
  initHostTimer();
  initSequencer();
  initCalendar();
  initFaceCards();
  initBadges();
  initMedia();
  initChoralBeat();
  initChoralCue();
  initChoralBreath();
  initMixer();
  initFormation();
  initSelfCheck();
  initTenGrid();

  draw('#drawKoubu', '#koubuCard', KQ_CARDS,
    c => '<div class="big">' + c[0] + '</div><div class="hint">' + c[1] + '</div>');
  draw('#drawHost', '#hostCard', HOST_CARDS,
    c => '<div class="big">' + c[0] + '</div><div class="hint">' + c[1] + '</div>');
});
