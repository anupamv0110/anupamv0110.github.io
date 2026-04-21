// ===== Navbar scroll =====
const navbar = document.getElementById('navbar');
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
