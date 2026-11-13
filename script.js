/* ============================================================
   AXIVRA - App logic
   Views: home | notes | quiz | progress  (hash based routing)
   ============================================================ */
(function () {
  'use strict';

  const $ = (s, p = document) => p.querySelector(s);
  const $$ = (s, p = document) => [...p.querySelectorAll(s)];

  /* ---------- Saved progress (localStorage) ---------- */
  const KEY = 'axivra_progress_v1';
  let state = { done: {}, scores: {} };
  try {
    const saved = JSON.parse(localStorage.getItem(KEY));
    if (saved && saved.done && saved.scores) state = saved;
  } catch (e) { /* ignore */ }
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* ignore */ } };

  /* ---------- Helpers ---------- */
  const getSub = id => SUBJECTS.find(s => s.id === id);
  const doneList = s => state.done[s.id] || [];
  const donePct = s => Math.round((doneList(s).length / s.topics.length) * 100);
  const shuffle = arr => {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };
  const fmtTime = sec => String(Math.floor(sec / 60)).padStart(2, '0') + ':' + String(sec % 60).padStart(2, '0');

  let toastTimer;
  function toast(msg) {
    const t = $('#toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('show'), 2200);
  }

  // Precompute plain text for search
  SUBJECTS.forEach(s => s.topics.forEach(t => {
    t.text = (t.title + ' ' + t.content.replace(/<[^>]+>/g, ' ')).toLowerCase();
  }));

  /* ============================================================
     ROUTER
     ============================================================ */
  const VIEWS = ['home', 'notes', 'quiz', 'progress'];

  function showView(v) {
    VIEWS.forEach(x => $('#view-' + x).classList.toggle('active', x === v));
    window.scrollTo(0, 0);
  }
  function setActiveNav(name) {
    $$('.nav-links a').forEach(a => a.classList.toggle('active', a.dataset.view === name));
  }

  function route() {
    stopTimer();
    $('#navLinks').classList.remove('open');
    const parts = (location.hash.slice(1) || 'home').split('/');
    const v = parts[0];

    if (v === 'notes') {
      const sub = getSub(parts[1]) || SUBJECTS[0];
      renderNotes(sub, parts[2]);
      showView('notes');
      setActiveNav('subjects');
    } else if (v === 'quiz') {
      renderQuizSetup(parts[1]);
      showView('quiz');
      setActiveNav('quiz');
    } else if (v === 'progress') {
      renderProgress();
      showView('progress');
      setActiveNav('progress');
    } else {
      renderSubjects();
      showView('home');
      setActiveNav(v === 'subjects' ? 'subjects' : 'home');
      if (v === 'subjects') {
        setTimeout(() => $('#subjects').scrollIntoView({ behavior: 'smooth' }), 60);
      }
    }
  }
  window.addEventListener('hashchange', route);

  /* ============================================================
     HOME
     ============================================================ */
  function renderHeroStats() {
    const topics = SUBJECTS.reduce((n, s) => n + s.topics.length, 0);
    const qs = SUBJECTS.reduce((n, s) => n + s.questions.length, 0);
    const items = [
      [SUBJECTS.length, 'Subjects'],
      [topics, 'Detailed Topics'],
      [qs, 'Practice Questions']
    ];
    $('#heroStats').innerHTML = items.map(i =>
      `<div class="stat"><h3 class="count" data-t="${i[0]}">0</h3><p>${i[1]}</p></div>`).join('');
    $$('.count').forEach(el => {
      const target = +el.dataset.t;
      let n = 0;
      const step = Math.max(1, Math.round(target / 25));
      const timer = setInterval(() => {
        n = Math.min(target, n + step);
        el.textContent = n;
        if (n >= target) clearInterval(timer);
      }, 40);
    });
  }

  function renderSubjects() {
    $('#subjectGrid').innerHTML = SUBJECTS.map(s => {
      const p = donePct(s);
      return `
      <div class="s-card" style="--c:${s.color}">
        <div class="s-icon">${s.icon}</div>
        <h3>${s.name}</h3>
        <p class="tag">${s.tagline}</p>
        <div class="s-meta"><span>${s.topics.length} topics · ${s.questions.length} questions</span><span>${p}% done</span></div>
        <div class="bar"><div data-w="${p}"></div></div>
        <div class="s-actions">
          <a class="a-notes" href="#notes/${s.id}">Read Notes</a>
          <a class="a-test" href="#quiz/${s.id}">Practice</a>
        </div>
      </div>`;
    }).join('');
    setTimeout(() => $$('#subjectGrid .bar > div').forEach(b => { b.style.width = b.dataset.w + '%'; }), 100);
  }

  /* ---------- Search ---------- */
  const searchBox = $('#search');
  const results = $('#searchResults');
  searchBox.addEventListener('input', () => {
    const q = searchBox.value.trim().toLowerCase();
    if (q.length < 2) { results.classList.remove('show'); return; }
    const hits = [];
    SUBJECTS.forEach(s => s.topics.forEach(t => {
      if (t.text.includes(q)) hits.push({ s, t });
    }));
    results.innerHTML = hits.length
      ? hits.slice(0, 8).map(h => `<a href="#notes/${h.s.id}/${h.t.id}"><b>${h.t.title}</b><small>${h.s.name}</small></a>`).join('')
      : '<div class="none">Koi topic nahi mila. Doosra keyword try karo.</div>';
    results.classList.add('show');
  });
  document.addEventListener('click', e => {
    if (!e.target.closest('.search-wrap')) results.classList.remove('show');
  });
  results.addEventListener('click', () => { results.classList.remove('show'); searchBox.value = ''; });

  /* ============================================================
     NOTES
     ============================================================ */
  function renderNotes(sub, topicId) {
    const topic = sub.topics.find(t => t.id === topicId) || sub.topics[0];
    const idx = sub.topics.indexOf(topic);
    const isDone = doneList(sub).includes(topic.id);
    const prev = sub.topics[idx - 1];
    const next = sub.topics[idx + 1];

    const side = $('#notesSide');
    side.style.setProperty('--c', sub.color);
    side.innerHTML = `
      <a class="back-link" href="#subjects">← All Subjects</a>
      <div class="side-head">
        <div class="s-icon" style="--c:${sub.color}">${sub.icon}</div>
        <div><small>Subject</small><h3>${sub.name}</h3></div>
      </div>
      <ul>
        ${sub.topics.map((t, i) => `
          <li><a href="#notes/${sub.id}/${t.id}" class="${t.id === topic.id ? 'on' : ''}">
            <span class="num">${i + 1}</span><span>${t.title}</span>
            <i class="tick">${doneList(sub).includes(t.id) ? '✔' : ''}</i>
          </a></li>`).join('')}
      </ul>
      <a class="btn small" href="#quiz/${sub.id}">Practice Test →</a>`;

    const main = $('#notesMain');
    main.style.setProperty('--c', sub.color);
    main.innerHTML = `
      <p class="crumb"><b>${sub.name}</b> · Topic ${idx + 1} of ${sub.topics.length}</p>
      <h1>${topic.title}</h1>
      <div class="note-body">${topic.content}</div>
      <div class="note-actions">
        ${prev ? `<a class="btn btn-ghost small" href="#notes/${sub.id}/${prev.id}">← Previous</a>` : ''}
        <button class="btn small btn-done ${isDone ? 'is-done' : ''}" id="doneBtn">${isDone ? '✔ Completed' : 'Mark as Completed'}</button>
        <span class="spacer"></span>
        ${next
          ? `<a class="btn small" href="#notes/${sub.id}/${next.id}">Next Topic →</a>`
          : `<a class="btn small" href="#quiz/${sub.id}">Take the Test →</a>`}
      </div>`;

    $('#doneBtn').addEventListener('click', () => {
      const list = state.done[sub.id] || [];
      const i = list.indexOf(topic.id);
      if (i === -1) { list.push(topic.id); toast('🎉 Topic completed!'); }
      else { list.splice(i, 1); toast('Marked as not completed'); }
      state.done[sub.id] = list;
      save();
      renderNotes(sub, topic.id);
    });
  }

  /* ============================================================
     QUIZ
     ============================================================ */
  let quiz = null;
  let timer = null;
  function stopTimer() { clearInterval(timer); timer = null; }

  function poolFor(subId) {
    if (subId === 'all') {
      return SUBJECTS.flatMap(s => s.questions.map(q => Object.assign({ sub: s.short }, q)));
    }
    const s = getSub(subId);
    return s.questions.map(q => Object.assign({ sub: s.short }, q));
  }

  function renderQuizSetup(pre) {
    stopTimer();
    quiz = null;
    let selSub = (pre === 'all' || getSub(pre)) ? pre : SUBJECTS[0].id;
    let selCount = 5;

    const box = $('#quizBox');

    function draw() {
      const total = poolFor(selSub).length;
      const choices = [...new Set([5, 10, 20, total].filter(n => n <= total))].sort((a, b) => a - b);
      if (!choices.includes(selCount)) selCount = choices[0] <= 5 ? Math.min(5, total) : choices[0];
      if (selCount > total) selCount = total;

      box.innerHTML = `
        <h1 class="q-title">Practice <span>Test</span></h1>
        <p class="section-sub">Subject chuno, questions ki ginti chuno aur shuru ho jao.</p>
        <div class="glass q-card">
          <h3>1. Select Subject</h3>
          <div class="pills" id="subPills">
            ${SUBJECTS.map(s => `<button class="pill ${selSub === s.id ? 'on' : ''}" data-sub="${s.id}">${s.icon} ${s.short}</button>`).join('')}
            <button class="pill ${selSub === 'all' ? 'on' : ''}" data-sub="all">🎲 Mixed</button>
          </div>
          <h3>2. Number of Questions</h3>
          <div class="pills" id="cntPills">
            ${choices.map(n => `<button class="pill ${selCount === n ? 'on' : ''}" data-n="${n}">${n === total ? 'All (' + n + ')' : n}</button>`).join('')}
          </div>
          <div class="row-btns"><button class="btn" id="startQuiz">Start Test 🚀</button></div>
        </div>`;

      $$('#subPills .pill').forEach(b => b.addEventListener('click', () => { selSub = b.dataset.sub; draw(); }));
      $$('#cntPills .pill').forEach(b => b.addEventListener('click', () => { selCount = +b.dataset.n; draw(); }));
      $('#startQuiz').addEventListener('click', () => startQuiz(selSub, selCount));
    }
    draw();
  }

  function startQuiz(subId, count) {
    const list = shuffle(poolFor(subId)).slice(0, count).map(q => {
      const order = shuffle([0, 1, 2, 3]);
      return {
        q: q.q, sub: q.sub, exp: q.exp,
        opts: order.map(i => q.options[i]),
        ans: order.indexOf(q.a)
      };
    });
    quiz = { subId, list, i: 0, score: 0, wrong: [], answered: false, sec: 0 };
    stopTimer();
    timer = setInterval(() => {
      quiz.sec++;
      const t = $('#qTimer');
      if (t) t.textContent = '⏱ ' + fmtTime(quiz.sec);
    }, 1000);
    renderQuestion();
  }

  function renderQuestion() {
    const item = quiz.list[quiz.i];
    const total = quiz.list.length;
    const letters = ['A', 'B', 'C', 'D'];
    quiz.answered = false;

    $('#quizBox').innerHTML = `
      <div class="glass q-card">
        <div class="q-top">
          <span>Question <b>${quiz.i + 1}</b> / ${total} · ${item.sub}</span>
          <span class="timer" id="qTimer">⏱ ${fmtTime(quiz.sec)}</span>
        </div>
        <div class="bar"><div style="width:${(quiz.i / total) * 100}%"></div></div>
        <p class="q-text">${item.q}</p>
        <div class="opts">
          ${item.opts.map((o, i) => `<button class="opt" data-i="${i}"><span class="letter">${letters[i]}</span><span>${o}</span></button>`).join('')}
        </div>
        <div class="explain" id="explain"><b>💡 Explanation:</b> ${item.exp}</div>
        <div class="q-nav"><button class="btn small" id="nextQ" disabled>${quiz.i === total - 1 ? 'Finish ✔' : 'Next →'}</button></div>
      </div>`;

    $$('.opt').forEach(btn => btn.addEventListener('click', () => {
      if (quiz.answered) return;
      quiz.answered = true;
      const chosen = +btn.dataset.i;
      $$('.opt').forEach((b, i) => {
        b.disabled = true;
        if (i === item.ans) b.classList.add('correct');
      });
      if (chosen === item.ans) {
        quiz.score++;
      } else {
        btn.classList.add('wrong');
        quiz.wrong.push({ q: item.q, correct: item.opts[item.ans], mine: item.opts[chosen], exp: item.exp });
      }
      $('#explain').classList.add('show');
      $('#nextQ').disabled = false;
    }));

    $('#nextQ').addEventListener('click', () => {
      if (quiz.i < total - 1) { quiz.i++; renderQuestion(); }
      else finishQuiz();
    });
  }

  function finishQuiz() {
    stopTimer();
    const total = quiz.list.length;
    const pct = Math.round((quiz.score / total) * 100);

    const rec = state.scores[quiz.subId] || { best: 0, attempts: 0, last: 0 };
    rec.attempts++;
    rec.last = pct;
    rec.best = Math.max(rec.best, pct);
    state.scores[quiz.subId] = rec;
    save();

    let title = 'Keep Practicing!', msg = 'Notes dobara padho aur phir try karo, tum zaroor improve karoge. 💪';
    if (pct >= 90) { title = 'Outstanding! 🏆'; msg = 'Kamaal ka score! Tum is subject mein ekdum ready ho.'; }
    else if (pct >= 70) { title = 'Great Job! 🔥'; msg = 'Bahut badhiya, bas thodi si aur practice chahiye.'; }
    else if (pct >= 40) { title = 'Good Effort! 👍'; msg = 'Sahi raste par ho. Galat wale questions ka review karo.'; }

    const sub = quiz.subId === 'all' ? null : getSub(quiz.subId);
    const wrongHtml = quiz.wrong.length ? `
      <div class="review">
        <h3>📝 Review: galat jawab (${quiz.wrong.length})</h3>
        ${quiz.wrong.map(w => `
          <div class="review-item">
            <p><b>${w.q}</b></p>
            <p>Tumhara answer: ${w.mine}</p>
            <p class="ans">Sahi answer: ${w.correct}</p>
            <p class="muted">${w.exp}</p>
          </div>`).join('')}
      </div>` : '<p class="msg" style="margin-top:20px">🎯 Perfect! Ek bhi galat jawab nahi.</p>';

    $('#quizBox').innerHTML = `
      <div class="glass q-card result">
        <h2>${title}</h2>
        <div class="ring" id="ring"><span>${pct}%</span></div>
        <p class="msg">You scored <b>${quiz.score}</b> out of <b>${total}</b> in ${fmtTime(quiz.sec)}. ${msg}</p>
        <div class="row-btns">
          <a class="btn" href="#quiz/${quiz.subId}" id="retry">Try Again</a>
          ${sub ? `<a class="btn btn-ghost" href="#notes/${sub.id}">Revise Notes</a>` : ''}
          <a class="btn btn-ghost" href="#progress">My Progress</a>
        </div>
        ${wrongHtml}
      </div>`;

    // animate ring
    let p = 0;
    const ring = $('#ring');
    const anim = setInterval(() => {
      p = Math.min(pct, p + 2);
      ring.style.setProperty('--p', p);
      if (p >= pct) clearInterval(anim);
    }, 20);

    // "Try Again" uses the same hash, so force a re-render
    $('#retry').addEventListener('click', e => {
      e.preventDefault();
      renderQuizSetup(quiz.subId);
    });
  }

  /* ============================================================
     PROGRESS
     ============================================================ */
  function renderProgress() {
    const totalTopics = SUBJECTS.reduce((n, s) => n + s.topics.length, 0);
    const doneTopics = SUBJECTS.reduce((n, s) => n + doneList(s).length, 0);
    const overall = Math.round((doneTopics / totalTopics) * 100);
    const mixed = state.scores.all;

    $('#progressBox').innerHTML = `
      <h1 class="q-title">My <span>Progress</span></h1>
      <p class="section-sub">Tumhari learning journey ek nazar mein.</p>

      <div class="glass overall">
        <div class="ring" style="--p:${overall}"><span>${overall}%</span></div>
        <p><b>${doneTopics}</b> of <b>${totalTopics}</b> topics completed</p>
      </div>

      ${SUBJECTS.map(s => {
        const p = donePct(s);
        const sc = state.scores[s.id];
        return `
        <div class="glass p-row" style="--c:${s.color}">
          <div class="p-row-top">
            <div class="s-icon" style="--c:${s.color}">${s.icon}</div>
            <h3>${s.name}</h3>
            <div class="p-badges">
              <span class="badge">Topics: <b>${doneList(s).length}/${s.topics.length}</b></span>
              <span class="badge">Best score: <b>${sc ? sc.best + '%' : '–'}</b></span>
              <span class="badge">Attempts: <b>${sc ? sc.attempts : 0}</b></span>
            </div>
          </div>
          <div class="bar" style="--c:${s.color}"><div style="width:${p}%"></div></div>
          <div class="s-actions">
            <a class="a-notes" href="#notes/${s.id}" style="--c:${s.color}">Continue Notes</a>
            <a class="a-test" href="#quiz/${s.id}" style="--c:${s.color}">Practice</a>
          </div>
        </div>`;
      }).join('')}

      <div class="glass p-row">
        <div class="p-row-top">
          <div class="s-icon">🎲</div>
          <h3>Mixed Tests</h3>
          <div class="p-badges">
            <span class="badge">Best score: <b>${mixed ? mixed.best + '%' : '–'}</b></span>
            <span class="badge">Attempts: <b>${mixed ? mixed.attempts : 0}</b></span>
          </div>
        </div>
      </div>

      <div class="reset-wrap"><button class="btn btn-danger small" id="resetBtn">Reset All Progress</button></div>`;

    $('#resetBtn').addEventListener('click', () => {
      if (confirm('Kya tum sach mein saara progress delete karna chahte ho?')) {
        state = { done: {}, scores: {} };
        save();
        renderProgress();
        toast('Progress reset ho gaya');
      }
    });
  }

  /* ============================================================
     NAVBAR, SCROLL EFFECTS, BACKGROUND
     ============================================================ */
  $('#menuBtn').addEventListener('click', () => $('#navLinks').classList.toggle('open'));

  const topBtn = $('#topBtn');
  window.addEventListener('scroll', () => { topBtn.style.display = window.scrollY > 500 ? 'block' : 'none'; });
  topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  const io = new IntersectionObserver(entries => {
    entries.forEach(en => { if (en.isIntersecting) en.target.classList.add('show'); });
  }, { threshold: 0.12 });
  $$('.reveal').forEach(el => io.observe(el));

  // Animated particle network background
  (function particles() {
    const c = $('#bg');
    const ctx = c.getContext('2d');
    let w, h, pts;
    function resize() {
      w = c.width = window.innerWidth;
      h = c.height = window.innerHeight;
      const n = Math.min(80, Math.floor((w * h) / 18000));
      pts = Array.from({ length: n }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4
      }));
    }
    function frame() {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 229, 255, 0.7)';
        ctx.fill();
        for (let j = i + 1; j < pts.length; j++) {
          const q = pts[j];
          const d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < 130) {
            ctx.strokeStyle = 'rgba(139, 92, 246,' + (0.22 * (1 - d / 130)) + ')';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(frame);
    }
    window.addEventListener('resize', resize);
    resize();
    frame();
  })();

  /* ---------- Start ---------- */
  renderHeroStats();
  route();
})();