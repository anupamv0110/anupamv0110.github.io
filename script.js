// ===== Custom Cursor =====
const cursorDot  = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');
let ringX = 0, ringY = 0, dotX = 0, dotY = 0;
let cursorReady = false;

document.addEventListener('mousemove', e => {
  dotX = e.clientX; dotY = e.clientY;
  cursorDot.style.left  = dotX + 'px';
  cursorDot.style.top   = dotY + 'px';
  if (!cursorReady) {
    cursorReady = true;
    ringX = dotX; ringY = dotY;
    document.body.classList.add('custom-cursor');
    cursorDot.style.opacity  = '1';
    cursorRing.style.opacity = '1';
  }
});
function animateRing() {
  ringX += (dotX - ringX) * 0.12;
  ringY += (dotY - ringY) * 0.12;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top  = ringY + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

document.querySelectorAll('a, button, .project-card, .timeline-card, .skill-category, .cert-card, .edu-card, .achievement-card, .tag').forEach(el => {
  el.addEventListener('mouseenter', () => { cursorDot.classList.add('hovering'); cursorRing.classList.add('hovering'); });
  el.addEventListener('mouseleave', () => { cursorDot.classList.remove('hovering'); cursorRing.classList.remove('hovering'); });
});

// ===== Scroll Progress Bar =====
const scrollProgress = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
  const pct = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
  scrollProgress.style.width = pct + '%';
});

// ===== Navbar scroll =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== Mobile hamburger =====
const hamburger = document.getElementById('hamburger');
const navLinks  = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ===== Typewriter =====
const roles = ['AIML Engineer','Python Developer','Django Expert','Data Scientist','Cloud Architect (GCP)','LLM Engineer'];
let roleIdx = 0, charIdx = 0, deleting = false;
const roleText = document.getElementById('roleText');
function typeWriter() {
  const current = roles[roleIdx];
  if (!deleting) {
    roleText.textContent = current.substring(0, charIdx + 1);
    charIdx++;
    if (charIdx === current.length) { deleting = true; setTimeout(typeWriter, 1800); return; }
  } else {
    roleText.textContent = current.substring(0, charIdx - 1);
    charIdx--;
    if (charIdx === 0) { deleting = false; roleIdx = (roleIdx + 1) % roles.length; }
  }
  setTimeout(typeWriter, deleting ? 50 : 100);
}
typeWriter();

// ===== Interactive Canvas Network =====
(function initCanvas() {
  const canvas = document.getElementById('networkCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, nodes = [], mouse = { x: -999, y: -999 };
  const NODE_COUNT = 80, CONNECT_DIST = 140, MOUSE_DIST = 180;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  canvas.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });
  canvas.addEventListener('mouseleave', () => { mouse.x = -999; mouse.y = -999; });

  for (let i = 0; i < NODE_COUNT; i++) {
    nodes.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2 + 1.5,
      color: Math.random() > 0.5 ? '108,99,255' : '0,212,170'
    });
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    // Mouse repulsion
    nodes.forEach(n => {
      const dx = n.x - mouse.x, dy = n.y - mouse.y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < MOUSE_DIST) {
        const force = (MOUSE_DIST - dist) / MOUSE_DIST * 0.6;
        n.vx += (dx / dist) * force;
        n.vy += (dy / dist) * force;
      }
      n.vx *= 0.99; n.vy *= 0.99;
      n.x += n.vx; n.y += n.vy;
      if (n.x < 0 || n.x > W) n.vx *= -1;
      if (n.y < 0 || n.y > H) n.vy *= -1;
    });
    // Connections
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < CONNECT_DIST) {
          const alpha = (1 - dist / CONNECT_DIST) * 0.5;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = `rgba(108,99,255,${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
      // Node dot
      const n = nodes[i];
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${n.color},0.8)`;
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }
  draw();
})();

// ===== Floating Code Snippets =====
(function floatingCode() {
  const hero = document.querySelector('.hero-bg');
  if (!hero) return;
  const wrap = document.createElement('div');
  wrap.className = 'code-floats';
  hero.appendChild(wrap);
  const snippets = [
    'import torch', 'def train():', 'model.fit(X, y)',
    'FastAPI()', 'SELECT * FROM', 'git push origin',
    'docker build', 'async def', 'GPT-4o', 'NLP.parse()',
    'streamlit run', 'celery -A', 'pd.DataFrame()',
    'torch.cuda', 'gcloud deploy', 'kubectl apply',
    'df.groupby()', 'model.predict()', 'loss.backward()',
  ];
  for (let i = 0; i < 14; i++) {
    const el = document.createElement('div');
    el.className = 'code-float';
    el.textContent = snippets[Math.floor(Math.random() * snippets.length)];
    const dur = 12 + Math.random() * 18;
    el.style.cssText = `left:${Math.random()*100}%;animation-duration:${dur}s;animation-delay:${-Math.random()*dur}s;font-size:${0.6+Math.random()*0.4}rem;`;
    wrap.appendChild(el);
  }
})();

// ===== Ripple on Buttons =====
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', e => {
    const r = document.createElement('span');
    r.className = 'ripple';
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    r.style.width = r.style.height = size + 'px';
    r.style.left = (e.clientX - rect.left - size/2) + 'px';
    r.style.top  = (e.clientY - rect.top  - size/2) + 'px';
    btn.appendChild(r);
    setTimeout(() => r.remove(), 700);
  });
});

// ===== 3D Tilt on Cards =====
document.querySelectorAll('.project-card, .edu-card, .achievement-card').forEach(card => {
  // inject glow layer
  if (!card.querySelector('.card-glow')) {
    const glow = document.createElement('div');
    glow.className = 'card-glow';
    card.insertBefore(glow, card.firstChild);
  }
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left, y = e.clientY - rect.top;
    const cx = rect.width / 2, cy = rect.height / 2;
    const rotX = ((y - cy) / cy) * -8;
    const rotY = ((x - cx) / cx) * 8;
    card.style.transform = `perspective(700px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(6px)`;
    const glow = card.querySelector('.card-glow');
    if (glow) { glow.style.setProperty('--mx', (x/rect.width*100)+'%'); glow.style.setProperty('--my', (y/rect.height*100)+'%'); }
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ===== Animated Counters =====
function animateCounter(el, target, suffix = '') {
  let start = 0;
  const dur = 1800, step = 16;
  const inc = target / (dur / step);
  const timer = setInterval(() => {
    start = Math.min(start + inc, target);
    el.textContent = Math.floor(start) + suffix;
    if (start >= target) clearInterval(timer);
  }, step);
}
const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.querySelectorAll('.stat-num').forEach(el => {
      const raw = el.textContent.trim();
      const num = parseInt(raw);
      const suffix = raw.replace(/[0-9]/g, '');
      animateCounter(el, num, suffix);
    });
    statsObserver.unobserve(entry.target);
  });
}, { threshold: 0.5 });
const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

// ===== Scroll Reveal =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      entry.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
        bar.style.width = bar.dataset.width + '%';
      });
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.timeline-card, .skill-category, .skills-bars, .project-card, .edu-card, .cert-card, .achievement-card, .contact-info, .contact-form-wrap').forEach(el => {
  el.classList.add('animate-on-scroll');
  observer.observe(el);
});

// ===== Skill bars init (ensure 0 on load) =====
document.querySelectorAll('.skill-bar-fill').forEach(b => b.style.width = '0');

// ===== Active nav highlight =====
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) current = s.getAttribute('id'); });
  navAnchors.forEach(a => { a.style.color = a.getAttribute('href') === `#${current}` ? 'var(--accent)' : ''; });
});

// ===== Contact Form =====
function handleFormSubmit(e) {
  e.preventDefault();
  const btn  = e.target.querySelector('button[type="submit"]');
  const msg  = document.getElementById('formMsg');
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();
  if (!name || !email || !subject || !message) {
    msg.style.color = 'var(--accent2)';
    msg.textContent = 'Please fill in all fields.';
    return;
  }
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  window.location.href = `mailto:anupam.v0110@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
  setTimeout(() => {
    msg.style.color = 'var(--accent)';
    msg.textContent = 'Opening your email client... Thank you!';
    btn.disabled = false;
    btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    e.target.reset();
  }, 1000);
}

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== Mobile hamburger =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ===== Typewriter =====
const roles = [
  'AIML Engineer',
  'Python Developer',
  'Django Expert',
  'Data Scientist',
  'Cloud Architect (GCP)',
  'LLM Engineer'
];
let roleIdx = 0, charIdx = 0, deleting = false;
const roleText = document.getElementById('roleText');

function typeWriter() {
  const current = roles[roleIdx];
  if (!deleting) {
    roleText.textContent = current.substring(0, charIdx + 1);
    charIdx++;
    if (charIdx === current.length) {
      deleting = true;
      setTimeout(typeWriter, 1800);
      return;
    }
  } else {
    roleText.textContent = current.substring(0, charIdx - 1);
    charIdx--;
    if (charIdx === 0) {
      deleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
    }
  }
  setTimeout(typeWriter, deleting ? 50 : 100);
}
typeWriter();

// ===== Particles =====
(function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  for (let i = 0; i < 50; i++) {
    const p = document.createElement('div');
    const size = Math.random() * 3 + 1;
    p.style.cssText = `
      position:absolute;
      width:${size}px;height:${size}px;
      border-radius:50%;
      background:rgba(108,99,255,${Math.random() * 0.5 + 0.1});
      left:${Math.random() * 100}%;
      top:${Math.random() * 100}%;
      animation:particleFloat ${Math.random() * 10 + 8}s ease-in-out ${Math.random() * -15}s infinite;
    `;
    container.appendChild(p);
  }
  const style = document.createElement('style');
  style.textContent = `
    @keyframes particleFloat {
      0%,100%{transform:translateY(0) translateX(0) scale(1);}
      33%{transform:translateY(-${Math.random()*40+20}px) translateX(${Math.random()*30-15}px) scale(1.1);}
      66%{transform:translateY(${Math.random()*20+10}px) translateX(${Math.random()*30-15}px) scale(0.9);}
    }
  `;
  document.head.appendChild(style);
})();

// ===== Scroll animations =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Animate skill bars
      entry.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
        bar.style.width = bar.dataset.width + '%';
      });
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

// Observe all animatable elements
document.querySelectorAll('.timeline-card, .skill-category, .skills-bars, .project-card, .edu-card, .cert-card, .achievement-card, .contact-info, .contact-form-wrap').forEach(el => {
  el.classList.add('animate-on-scroll');
  observer.observe(el);
});

// Trigger skill bars when section is visible
const skillBarsSection = document.querySelector('.skills-bars');
if (skillBarsSection) {
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
          bar.style.width = bar.dataset.width + '%';
        });
        barObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  barObserver.observe(skillBarsSection);
}

// ===== Active nav link on scroll =====
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 120) {
      current = section.getAttribute('id');
    }
  });
  navAnchors.forEach(a => {
    a.style.color = a.getAttribute('href') === `#${current}` ? 'var(--accent)' : '';
  });
});

// ===== Contact form =====
function handleFormSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  const msg = document.getElementById('formMsg');
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();

  // Basic validation
  if (!name || !email || !subject || !message) {
    msg.style.color = 'var(--accent2)';
    msg.textContent = 'Please fill in all fields.';
    return;
  }

  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

  // Build mailto link as fallback (no server needed for static site)
  const mailto = `mailto:anupam.v0110@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
  window.location.href = mailto;

  setTimeout(() => {
    msg.style.color = 'var(--accent)';
    msg.textContent = 'Opening your email client... Thank you!';
    btn.disabled = false;
    btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    e.target.reset();
  }, 1000);
}
