/* aymanissa.dev — vanilla JS, no dependencies.
   Edit CONFIG to update links and contact details. */

const CONFIG = {
  github: "",                       // e.g. "https://github.com/your-handle"
  githubHandle: "",                 // e.g. "@your-handle"
  phone: "",                        // e.g. "+254712345678" (digits, with country code)
  whatsapp: "",                     // e.g. "254712345678" (no +, no spaces); leave empty to reuse phone
  booking: "https://calendar.app.google/Q9jeqinx4CshxG396",
  hashnodeHost: "aymanissa-dev-notes.hashnode.dev",
};

const BUILDS = [
  {
    id: "biasharaops", name: "BiasharaOps", status: "progress", kind: "Product",
    pitch: "A business management app for Kenyan small businesses: sales, inventory, debts, and invoicing in one place.",
    tagline: "Simplify your business. Rahisisha biashara yako.",
    stack: ["Vanilla JS", "Supabase", "IndexedDB", "Service Workers", "PWA", "GitHub Pages"],
    live: "", repo: "", img: "",
    problem: "Small businesses in Kenya often run on notebooks, WhatsApp threads, and memory. Sales, stock, and customer debts live in different places, and connectivity is not always reliable.",
    built: [
      "<b>One app for the whole business:</b> sales, inventory and stock movements, customers, suppliers, expenses, debts, invoices, quotations, and receipts.",
      "<b>Templates by business type,</b> including retail, salons, hardware stores, consultants, and boda boda operators.",
      "<b>Built-in business agents</b> that watch sales, stock, debts, and expenses and flag what needs attention, with rule-based logic instead of a black box.",
      "<b>English and Kiswahili</b> throughout, plus call, SMS, and WhatsApp shortcuts to reach customers.",
    ],
    decisions: [
      "<b>Offline-first PWA.</b> IndexedDB, service workers, and background sync keep the app working on patchy connections.",
      "<b>Vanilla HTML, CSS, and JavaScript</b> to keep it fast on low-end phones.",
      "<b>Supabase with row-level security</b> for per-business data isolation, role-based access, and audit logs.",
    ],
    learned: [],
  },
  {
    id: "fotoally", name: "FotoAlly", status: "progress", kind: "Product",
    pitch: "A marketplace connecting clients with photographers and videographers.",
    tagline: "Find the right photographer or videographer for the moment.",
    stack: ["Angular", "Tailwind", "Capacitor", "Monorepo", "Supabase (planned)"],
    live: "", repo: "", img: "",
    problem: "Finding and booking a photographer or videographer usually means scrolling social media and chasing DMs. Creatives, in turn, have no simple way to be found and booked.",
    built: [
      "<b>A landing page</b> that explains the product, currently the first piece in progress.",
      "<b>A core app</b> for clients and creatives, designed UI-first before the backend is wired in.",
    ],
    decisions: [
      "<b>Angular and Tailwind in a monorepo</b>, with the landing page and the app as separate apps sharing code.",
      "<b>Capacitor</b> so the same app can ship to mobile.",
      "<b>UI-first build order:</b> design and validate the experience, then connect Supabase.",
    ],
    learned: [],
  },
  {
    id: "noted", name: "noted.", status: "progress", kind: "Side project",
    pitch: "A minimal, private note-taking app. Write it down. Find it later.",
    tagline: "Write it down. Find it later.",
    stack: ["React", "React Router", "Tailwind", "Express", "MongoDB", "JWT"],
    live: "", repo: "", img: "",
    problem: "Most note apps grow into everything apps. noted. stays small: a private place to write things down and find them again.",
    built: [
      "<b>Private notes</b> behind your own account.",
      "<b>A clean, minimal interface</b> focused on writing and finding.",
    ],
    decisions: [
      "<b>React and React Router</b> on the front end, styled with Tailwind.",
      "<b>Node and Express REST API</b> with JWT and bcrypt for authentication.",
      "<b>MongoDB Atlas with Mongoose</b> for storage.",
      "<b>Built step by step</b> as a full-stack learning project.",
    ],
    learned: [],
  },
];

(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const root = document.documentElement;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = matchMedia("(pointer: fine)").matches;
  const esc = (t) => String(t ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  if (!reduce) root.classList.add("motion");

  /* ---------- Text splitting ---------- */
  function splitChars(el) {
    const text = el.textContent;
    el.innerHTML = [...text].map((c, i) => `<span class="ch${c === " " ? " sp" : ""}" style="--i:${i}" aria-hidden="true">${c === " " ? " " : esc(c)}</span>`).join("");
  }
  function splitWords(el) {
    if (el.dataset.split) return;
    el.dataset.split = "1";
    el.setAttribute("aria-label", el.textContent);
    const words = el.textContent.trim().split(/\s+/);
    el.innerHTML = words.map((w, i) => `<span class="w" aria-hidden="true"><span style="--i:${i}">${esc(w)}</span></span>`).join(" ");
  }
  $$(".split-chars").forEach(splitChars);
  $$(".split-words").forEach(splitWords);

  /* ---------- Config wiring ---------- */
  const digits = (s) => String(s || "").replace(/[^\d]/g, "");
  function applyConfig() {
    $$('[data-link="github"]').forEach((a) => {
      a.href = CONFIG.github || "https://github.com/";
    });
    $$('[data-text="github-handle"]').forEach((s) => (s.textContent = (CONFIG.githubHandle || "github") + " ↗"));
    $$('[data-link="booking"]').forEach((a) => (a.href = CONFIG.booking));
    const phone = CONFIG.phone;
    const wa = digits(CONFIG.whatsapp || CONFIG.phone);
    const vPhone = $("#v-phone"), vWa = $("#v-wa");
    if (phone) { vPhone.textContent = phone; } else { vPhone.classList.add("pending"); }
    if (wa) { vWa.textContent = CONFIG.whatsapp ? "+" + wa : phone; } else { vWa.classList.add("pending"); }
    $$('[data-link="phone"]').forEach((a) => { if (phone) a.href = "tel:" + phone.replace(/\s/g, ""); else a.classList.add("disabled"); });
    $$('[data-link="whatsapp"]').forEach((a) => { if (wa) a.href = "https://wa.me/" + wa; else a.classList.add("disabled"); });
    $$(".year").forEach((y) => (y.textContent = new Date().getFullYear()));
  }
  applyConfig();

  /* ---------- Entry animations ---------- */
  function playEntry(view) {
    if (reduce) return;
    const els = $$("[data-anim], .split-words", view).filter((el) => !el.closest("[data-reveal]"));
    els.forEach((el) => el.classList.remove("in"));
    void view.offsetWidth;
    els.forEach((el, i) => {
      el.style.setProperty("--d", `${120 + i * 70}ms`);
      requestAnimationFrame(() => el.classList.add("in"));
    });
  }
  const io = "IntersectionObserver" in window && !reduce
    ? new IntersectionObserver((entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          $$(".split-words", e.target).forEach((s) => s.classList.add("in"));
          io.unobserve(e.target);
        }
      }), { rootMargin: "0px 0px -8% 0px", threshold: 0.05 })
    : null;
  function watchReveals(scope) {
    $$("[data-reveal]", scope).forEach((el) => {
      if (!io) { el.classList.add("in"); return; }
      el.classList.remove("in");
      $$(".split-words", el).forEach((s) => s.classList.remove("in"));
      io.observe(el);
    });
  }

  /* ---------- Preloader ---------- */
  const loader = $("#loader");
  function runLoader(done) {
    const count = $("#count"), bar = $("#bar");
    const dur = reduce ? 200 : 2400, t0 = performance.now();
    const ease = (t) => 1 - Math.pow(1 - t, 3);
    (function tick(now) {
      const t = Math.min(1, (now - t0) / dur), v = Math.round(ease(t) * 100);
      count.textContent = v; bar.style.width = v + "%";
      if (t < 1) requestAnimationFrame(tick);
      else setTimeout(() => { loader.classList.add("done"); setTimeout(done, reduce ? 0 : 380); }, reduce ? 0 : 300);
    })(t0);
  }

  /* ---------- Builds ---------- */
  const LABEL = { shipped: "Shipped", progress: "In progress", experiment: "Experiment" };
  let buildFilter = "all";
  function preview(b) {
    if (b.img) return `<img src="${esc(b.img)}" alt="${esc(b.name)} screenshot" loading="lazy">`;
    return `<div class="mock" aria-hidden="true">
      <div class="mock-bar"><i></i><i></i><i></i><span>${esc(b.id)}.app</span></div>
      <div class="mock-body">
        <div class="mock-nav"><b>${esc(b.name)}</b><span></span><span></span><span></span><em></em></div>
        <p class="mock-h">${esc(b.tagline)}</p>
        <p class="mock-s">${esc(b.pitch)}</p>
        <span class="mock-btn">Get started</span>
        <div class="mock-cards"><span></span><span></span><span></span><span></span><span></span></div>
      </div>
      <span class="mock-note">Screenshot coming soon</span>
    </div>`;
  }
  function renderBuilds() {
    const list = $("#builds-list"), empty = $("#builds-empty");
    const items = BUILDS.filter((b) => buildFilter === "all" || b.status === buildFilter);
    list.innerHTML = items.map((b) => `<li class="card tilt" data-reveal>
      <a class="shot" href="#build-${b.id}" aria-label="${esc(b.name)} case study"><div class="shot-inner">${preview(b)}</div></a>
      <div class="panel">
        <span class="eyebrow">${String(BUILDS.indexOf(b) + 1).padStart(2, "0")} · ${esc(b.kind)} · <span class="status ${b.status}">${LABEL[b.status]}</span></span>
        <h2><a href="#build-${b.id}">${esc(b.name)}</a></h2>
        <p class="b-pitch">${esc(b.pitch)}</p>
        <div class="panel-foot">
          <div class="tags">${b.stack.map((t) => `<span>${esc(t)}</span>`).join("")}</div>
          <div class="acts">${b.live ? `<a href="${esc(b.live)}" target="_blank" rel="noopener">Live ↗</a>` : ""}${b.repo ? `<a href="${esc(b.repo)}" target="_blank" rel="noopener">Code ↗</a>` : ""}<a href="#build-${b.id}">View more ↗</a></div>
        </div>
      </div></li>`).join("");
    empty.hidden = items.length > 0;
    empty.textContent = buildFilter === "shipped"
      ? "Nothing marked shipped yet. Everything here is still being built, so check back soon."
      : "Nothing here yet. Experiments land here as soon as they exist.";
    $$("[data-count]").forEach((n) => { const k = n.dataset.count; n.textContent = BUILDS.filter((b) => k === "all" || b.status === k).length; });
    watchReveals(list);
    bindTilt(list);
    bindCursorTargets(list);
    updateParallax();
  }
  $$("#view-builds .chip").forEach((c) => c.addEventListener("click", () => {
    buildFilter = c.dataset.filter;
    $$("#view-builds .chip").forEach((x) => x.setAttribute("aria-pressed", String(x === c)));
    renderBuilds();
  }));

  function renderBuild(id) {
    const b = BUILDS.find((x) => x.id === id), el = $("#build-detail");
    if (!b) { el.innerHTML = `<div class="note-state"><h2>That build doesn’t exist.</h2><a class="cta" href="#builds">All builds →</a></div>`; return; }
    const li = (a) => `<ul class="bullets">${a.map((x) => `<li>${x}</li>`).join("")}</ul>`;
    const links = [b.live && `<a class="cta magnetic" href="${esc(b.live)}" target="_blank" rel="noopener">Live site ↗</a>`, b.repo && `<a class="cta magnetic" href="${esc(b.repo)}" target="_blank" rel="noopener">Source code ↗</a>`].filter(Boolean);
    el.innerHTML = `
      <div class="d-shot" data-anim><div class="shot-inner">${preview(b)}</div></div>
      <div class="d-head">
        <span class="status ${b.status}" data-anim>${LABEL[b.status]} · ${esc(b.kind)}</span>
        <h1 class="split-words">${esc(b.name)}</h1>
        <p class="tagline" data-anim>${esc(b.tagline)}</p>
        <div class="facts" data-anim><span><b>role</b>Designer &amp; developer</span><span><b>stack</b>${esc(b.stack.join(", "))}</span></div>
      </div>
      <section class="row" data-reveal><span class="label">The problem</span><div class="prose"><p>${esc(b.problem)}</p></div></section>
      <section class="row" data-reveal><span class="label">What I built</span><div>${li(b.built)}</div></section>
      <section class="row" data-reveal><span class="label">Stack &amp; decisions</span><div>${li(b.decisions)}</div></section>
      <section class="row" data-reveal><span class="label">What I learned</span><div>${b.learned.length ? li(b.learned) : `<p class="draft-note">Placeholder. Add two or three honest lessons from building ${esc(b.name)}: what surprised you, what you would do differently.</p>`}</div></section>
      <section class="row" data-reveal><span class="label">Links</span><div class="next">${links.length ? `<div class="links">${links.join("")}</div>` : `<p class="draft-note">Placeholder. Add the live site and repository links when they are ready.</p>`}</div></section>`;
    $$(".split-words", el).forEach(splitWords);
    bindMagnetic(el);
    bindCursorTargets(el);
    document.title = `${b.name} · Ayman Issa`;
  }

  /* ---------- Notes (Hashnode) ---------- */
  const BLOG_URL = "https://" + CONFIG.hashnodeHost;
  const GQL = "https://gql.hashnode.com";
  let NOTES = null, noteTag = "all", notesLoading = null;
  const fmtDate = (d) => new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
  async function gql(query, variables) {
    const r = await fetch(GQL, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ query, variables }) });
    if (!r.ok) throw new Error("HTTP " + r.status);
    const j = await r.json();
    if (j.errors) throw new Error(j.errors[0].message);
    return j.data;
  }
  function loadNotes() {
    if (notesLoading) return notesLoading;
    notesLoading = gql(
      `query($host:String!){publication(host:$host){posts(first:50){edges{node{title slug brief url publishedAt readTimeInMinutes tags{name slug}}}}}}`,
      { host: CONFIG.hashnodeHost }
    ).then((d) => (NOTES = (d.publication?.posts?.edges || []).map((e) => e.node)))
     .catch((e) => { notesLoading = null; throw e; });
    return notesLoading;
  }
  function notesState(kind) {
    $("#notes-list").innerHTML = "";
    const st = $("#notes-state");
    st.hidden = false;
    st.innerHTML = kind === "empty"
      ? `<h2>The first note is on its way.</h2><p>Notes here sync automatically from my blog. As soon as I publish, posts show up on this page.</p><a class="cta" href="${BLOG_URL}" target="_blank" rel="noopener">Visit the blog ↗</a>`
      : `<h2>Notes couldn’t load right now.</h2><p>They sync from my blog on Hashnode, which didn’t respond. You can read everything there directly.</p><a class="cta" href="${BLOG_URL}" target="_blank" rel="noopener">Read on Hashnode ↗</a>`;
  }
  function renderNotes() {
    const list = $("#notes-list"), st = $("#notes-state"), tagsEl = $("#note-tags");
    if (!NOTES.length) { tagsEl.hidden = true; notesState("empty"); return; }
    st.hidden = true;
    const tags = [...new Map(NOTES.flatMap((n) => n.tags || []).map((t) => [t.slug, t.name])).entries()];
    tagsEl.hidden = tags.length === 0;
    tagsEl.innerHTML = [["all", "All"], ...tags].map(([slug, name]) => `<button type="button" class="chip" data-tag="${esc(slug)}" aria-pressed="${slug === noteTag}">${esc(name)}</button>`).join("");
    $$(".chip", tagsEl).forEach((c) => (c.onclick = () => { noteTag = c.dataset.tag; renderNotes(); }));
    const items = NOTES.filter((n) => noteTag === "all" || (n.tags || []).some((t) => t.slug === noteTag));
    list.innerHTML = items.map((n) => `<li data-reveal><a href="#note-${esc(n.slug)}">
      <span class="n-date">${fmtDate(n.publishedAt)}</span>
      <span class="n-main"><h2>${esc(n.title)}</h2>${n.brief ? `<p class="n-brief">${esc(n.brief)}</p>` : ""}<span class="n-tags">${(n.tags || []).map((t) => `<span>${esc(t.name)}</span>`).join("")}</span></span>
      <span class="n-time">${n.readTimeInMinutes || 1} min read</span></a></li>`).join("");
    $("#notes-synced").textContent = `Synced from ${CONFIG.hashnodeHost}`;
    watchReveals(list);
    bindCursorTargets(list);
  }
  function showNotes() {
    if (NOTES) { renderNotes(); return; }
    loadNotes().then(renderNotes).catch(() => notesState("error"));
  }
  function showNote(slug) {
    const el = $("#note-detail");
    el.innerHTML = `<p class="synced mono">Loading note…</p>`;
    gql(
      `query($host:String!,$slug:String!){publication(host:$host){post(slug:$slug){title subtitle url publishedAt readTimeInMinutes coverImage{url} tags{name} content{html}}}}`,
      { host: CONFIG.hashnodeHost, slug }
    ).then((d) => {
      const p = d.publication?.post;
      if (!p) { el.innerHTML = `<div class="note-state"><h2>That note doesn’t exist.</h2><p>It may have moved or been unpublished.</p><a class="cta" href="#notes">All notes →</a></div>`; return; }
      const body = p.content.html.replace(/<script[\s\S]*?<\/script>/gi, "");
      el.innerHTML = `<div class="a-meta"><span>${fmtDate(p.publishedAt)}</span><span>${p.readTimeInMinutes || 1} min read</span>${(p.tags || []).map((t) => `<span>#${esc(t.name)}</span>`).join("")}</div>
        <h1 class="a-title split-words">${esc(p.title)}</h1>${p.subtitle ? `<p class="a-sub">${esc(p.subtitle)}</p>` : ""}
        ${p.coverImage?.url ? `<img class="a-cover" src="${esc(p.coverImage.url)}" alt="">` : ""}
        <div class="a-body">${body}</div>
        <div class="a-foot"><a class="cta" href="${esc(p.url)}" target="_blank" rel="noopener">Read on Hashnode ↗</a><a class="cta" href="#hello">Say hello <b>→</b></a></div>`;
      $$(".split-words", el).forEach((s) => { splitWords(s); requestAnimationFrame(() => s.classList.add("in")); });
      document.title = `${p.title} · Ayman Issa`;
    }).catch(() => {
      el.innerHTML = `<div class="note-state"><h2>This note couldn’t load right now.</h2><p>You can read it on Hashnode instead.</p><a class="cta" href="${BLOG_URL}/${esc(slug)}" target="_blank" rel="noopener">Read on Hashnode ↗</a></div>`;
    });
  }

  /* ---------- Router + page transitions ---------- */
  const VIEWS = { home: "view-home", who: "view-who", builds: "view-builds", notes: "view-notes", hello: "view-hello" };
  const TITLES = { home: "Ayman Issa · Software Engineer & Developer Advocate", who: "Who · Ayman Issa", builds: "Builds · Ayman Issa", notes: "Notes · Ayman Issa", hello: "Hello · Ayman Issa" };
  const curtain = $("#curtain"), curtainLabel = $("#curtain-label");
  let current = null, firstRoute = true, transitioning = false;

  const parse = () => {
    const r = (location.hash || "#home").slice(1) || "home";
    if (r.startsWith("build-")) return { r, view: "view-build", nav: "builds", label: BUILDS.find((b) => b.id === r.slice(6))?.name || "Builds" };
    if (r.startsWith("note-")) return { r, view: "view-note", nav: "notes", label: "Notes" };
    if (VIEWS[r]) return { r, view: VIEWS[r], nav: r, label: r === "home" ? "Ayman Issa" : r[0].toUpperCase() + r.slice(1) };
    return { r, view: "view-lost", nav: "", label: "404" };
  };

  function show(route) {
    $$("[data-view]").forEach((v) => (v.hidden = v.id !== route.view));
    const view = $("#" + route.view);
    document.body.classList.toggle("locked", route.view === "view-home");
    $$("nav a[data-route]").forEach((a) => (a.dataset.route === route.nav ? a.setAttribute("aria-current", "page") : a.removeAttribute("aria-current")));
    document.title = TITLES[route.r] || TITLES.home;
    $("#topbar").classList.remove("hide");
    window.scrollTo(0, 0);
    if (route.view === "view-build") renderBuild(route.r.slice(6));
    if (route.view === "view-note") showNote(route.r.slice(5));
    if (route.r === "notes") showNotes();
    if (route.r === "builds") renderBuilds();
    watchReveals(view);
    current = route.r;
    playEntry(view);
    if (route.view === "view-home") requestAnimationFrame(placeName);
  }

  function navigate() {
    const route = parse();
    if (route.r === current) return;
    if (firstRoute || reduce) { firstRoute = false; show(route); return; }
    if (transitioning) { show(route); return; }
    transitioning = true;
    curtainLabel.textContent = route.label;
    curtain.classList.remove("reveal");
    void curtain.offsetWidth;
    curtain.classList.add("cover");
    setTimeout(() => {
      show(route);
      curtain.classList.remove("cover");
      curtain.classList.add("reveal");
      setTimeout(() => { curtain.classList.remove("reveal"); transitioning = false; }, 700);
    }, 700);
  }
  addEventListener("hashchange", navigate);

  /* ---------- Hero parallax ---------- */
  const name = $("#hero-name"), portrait = $("#portrait");
  let tx = 0, ty = 0, cx = 0, cy = 0;
  if (!reduce && finePointer) {
    addEventListener("mousemove", (e) => {
      tx = (e.clientX / innerWidth - 0.5) * 2;
      ty = (e.clientY / innerHeight - 0.5) * 2;
    });
  }


  /* ---------- Keep the name behind the head at every size ---------- */
  function placeName() {
    if (!portrait.complete || current !== "home") return;
    // layout boxes ignore the entry/parallax transforms
    const w = portrait.offsetWidth, h = portrait.offsetHeight, s = Math.min(w, h);
    const imgTop = portrait.offsetTop + h - s;
    name.style.top = Math.max(0, imgTop + s * (innerWidth <= 760 ? 0.14 : 0.3) - name.offsetHeight) + "px";
  }
  portrait.addEventListener("load", placeName);
  addEventListener("resize", placeName);

  /* ---------- Cursor ---------- */
  const cursor = $(".cursor"), dot = $(".cursor-dot"), ring = $(".cursor-ring");
  let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
  if (!reduce && finePointer) {
    addEventListener("mousemove", (e) => { mx = e.clientX; my = e.clientY; dot.style.transform = `translate(${mx}px,${my}px)`; });
    addEventListener("mousedown", () => cursor.classList.add("down"));
    addEventListener("mouseup", () => cursor.classList.remove("down"));
  }
  function bindCursorTargets(scope = document) {
    if (reduce || !finePointer) return;
    $$("a, button, .tilt", scope).forEach((el) => {
      if (el.dataset.cur) return;
      el.dataset.cur = "1";
      el.addEventListener("mouseenter", () => cursor.classList.add("hover"));
      el.addEventListener("mouseleave", () => cursor.classList.remove("hover"));
    });
  }

  /* ---------- Magnetic + tilt ---------- */
  function bindMagnetic(scope = document) {
    if (reduce || !finePointer) return;
    $$(".magnetic", scope).forEach((el) => {
      if (el.dataset.mag) return;
      el.dataset.mag = "1";
      el.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
        el.style.transform = `translate(${dx * 0.3}px, ${dy * 0.4}px)`;
      });
      el.addEventListener("mouseleave", () => (el.style.transform = ""));
    });
  }
  function bindTilt(scope = document) {
    if (reduce || !finePointer) return;
    $$(".tilt", scope).forEach((el) => {
      if (el.dataset.tilt) return;
      el.dataset.tilt = "1";
      el.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5;
        const k = el.classList.contains("card") ? 3 : 7;
        el.style.transition = "transform .15s linear";
        el.style.transform = `perspective(1200px) rotateY(${px * k}deg) rotateX(${-py * k}deg)`;
      });
      el.addEventListener("mouseleave", () => {
        el.style.transition = "transform .8s cubic-bezier(.2,.7,.1,1)";
        el.style.transform = "";
      });
    });
  }

  /* ---------- Scramble on nav hover ---------- */
  const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&*+=<>/";
  function scramble(el) {
    if (reduce || el.dataset.busy) return;
    const final = el.dataset.text || (el.dataset.text = el.textContent);
    el.dataset.busy = "1";
    let frame = 0;
    const total = final.length * 3;
    (function step() {
      el.textContent = [...final].map((c, i) => (i < frame / 3 ? c : GLYPHS[(Math.random() * GLYPHS.length) | 0])).join("");
      if (frame++ < total) requestAnimationFrame(step);
      else { el.textContent = final; delete el.dataset.busy; }
    })();
  }
  $$("[data-scramble]").forEach((a) => a.addEventListener("mouseenter", () => scramble(a)));

  /* ---------- Scroll: hide bar, card parallax ---------- */
  let lastY = 0;
  function updateParallax() {
    if (reduce) return;
    $$(".shot-inner").forEach((s) => {
      const r = s.parentElement.getBoundingClientRect();
      const p = (r.top + r.height / 2) / innerHeight;
      s.style.setProperty("--sy", `${Math.max(-10, Math.min(40, (p - 0.4) * 60))}px`);
    });
  }
  addEventListener("scroll", () => {
    const y = scrollY, bar = $("#topbar");
    if (y > 120 && y > lastY + 4) bar.classList.add("hide");
    else if (y < lastY - 4 || y < 120) bar.classList.remove("hide");
    lastY = y;
    updateParallax();
  }, { passive: true });

  /* ---------- Animation loop (cursor ring + hero parallax) ---------- */
  function loop() {
    rx += (mx - rx) * 0.16; ry += (my - ry) * 0.16;
    if (ring) ring.style.transform = `translate(${rx}px,${ry}px)`;
    cx += (tx - cx) * 0.06; cy += (ty - cy) * 0.06;
    if (current === "home") {
      name.style.setProperty("--nx", `${cx * -26}px`); name.style.setProperty("--ny", `${cy * -14}px`);
      portrait.style.setProperty("--px", `${cx * 16}px`); portrait.style.setProperty("--py", `${cy * 8}px`);
    }
    requestAnimationFrame(loop);
  }
  if (!reduce) requestAnimationFrame(loop);

  /* ---------- Copy buttons ---------- */
  $$("[data-copy]").forEach((b) => b.addEventListener("click", () => {
    const el = document.getElementById(b.dataset.copy), t = el.textContent.trim();
    const done = () => { b.textContent = "Copied"; setTimeout(() => (b.textContent = "Copy"), 1600); };
    const select = () => { const r = document.createRange(); r.selectNodeContents(el); const s = getSelection(); s.removeAllRanges(); s.addRange(r); b.textContent = "Selected"; };
    try { navigator.clipboard.writeText(t).then(done, select); } catch { select(); }
  }));

  /* ---------- Mobile menu ---------- */
  const sheet = $("#sheet"), burger = $("#burger");
  const openSheet = (open) => { sheet.hidden = !open; burger.setAttribute("aria-expanded", String(open)); };
  burger.addEventListener("click", () => openSheet(sheet.hidden));
  $("#sheet-close").addEventListener("click", () => openSheet(false));
  $$("a", sheet).forEach((a) => a.addEventListener("click", () => openSheet(false)));
  addEventListener("keydown", (e) => { if (e.key === "Escape") openSheet(false); });

  /* ---------- Boot ---------- */
  bindMagnetic();
  bindTilt();
  bindCursorTargets();
  const start = parse();
  if (start.view === "view-home") {
    root.classList.add("intro-hidden");
    navigate();
    runLoader(() => {
      root.classList.remove("intro-hidden");
      playEntry($("#view-home"));
    });
  } else {
    loader.classList.add("done");
    navigate();
  }
})();
