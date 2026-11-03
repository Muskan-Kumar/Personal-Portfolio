// Theme toggle (remembered in the browser)
const root = document.documentElement;
try { root.setAttribute('data-theme', localStorage.getItem('theme') || 'dark'); } catch (e) {}
document.getElementById('theme-toggle').addEventListener('click', () => {
  const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  try { localStorage.setItem('theme', next); } catch (e) {}
});

// Mobile nav
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
hamburger.addEventListener('click', () => {
  const open = navLinks.classList.toggle('active');
  hamburger.setAttribute('aria-expanded', open);
});
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  navLinks.classList.remove('active');
  hamburger.setAttribute('aria-expanded', 'false');
}));

// Typing effect
const roles = ['RAG pipelines', 'multi-agent systems', 'ML services', 'MLOps workflows'];
const out = document.getElementById('dynamic-text');
let r = 0, c = 0, del = false;
function type() {
  const word = roles[r];
  out.textContent = word.slice(0, c);
  if (!del && c === word.length) { del = true; return setTimeout(type, 1400); }
  if (del && c === 0) { del = false; r = (r + 1) % roles.length; }
  c += del ? -1 : 1;
  setTimeout(type, del ? 45 : 85);
}
if (matchMedia('(prefers-reduced-motion: reduce)').matches) out.textContent = roles[0]; else type();

// Soft cursor glow (desktop only, normal cursor stays visible)
const glow = document.getElementById('cursor-glow');
document.addEventListener('mousemove', e => {
  glow.style.opacity = 1;
  glow.style.left = e.clientX + 'px';
  glow.style.top = e.clientY + 'px';
});

// Highlight the nav link of the section in view
const links = [...navLinks.querySelectorAll('a[href^="#"]')];
const io = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (en.isIntersecting) {
      links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + en.target.id));
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });
document.querySelectorAll('main section[id]').forEach(s => io.observe(s));

// Contact form -> opens the email app
document.getElementById('contact-form').addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const msg = document.getElementById('message').value;
  location.href = 'mailto:muskanku9525@gmail.com?subject=' +
    encodeURIComponent('Portfolio message from ' + name) +
    '&body=' + encodeURIComponent(msg + '\n\n' + name + ' (' + email + ')');
});
