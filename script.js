// Mobile menu
var menuBtn = document.getElementById('menu');
var links = document.getElementById('links');
menuBtn.addEventListener('click', function () {
  var open = links.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open);
});
links.addEventListener('click', function (e) {
  if (e.target.tagName === 'A') { links.classList.remove('open'); menuBtn.setAttribute('aria-expanded', 'false'); }
});

// Highlight the section in view
var navLinks = Array.prototype.slice.call(links.querySelectorAll('a'));
var observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (!entry.isIntersecting) return;
    navLinks.forEach(function (a) { a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id); });
  });
}, { rootMargin: '-45% 0px -50% 0px' });
document.querySelectorAll('main section[id]').forEach(function (s) { observer.observe(s); });

// Copy email
var copyBtn = document.getElementById('copy');
copyBtn.addEventListener('click', function () {
  var text = copyBtn.dataset.copy;
  var done = function () {
    copyBtn.textContent = 'Copied';
    setTimeout(function () { copyBtn.textContent = 'Copy email'; }, 1600);
  };
  if (navigator.clipboard) navigator.clipboard.writeText(text).then(done, function () {});
});

// Contact form (sent through Web3Forms to my email)
var form = document.getElementById('contact-form');
var statusEl = document.getElementById('f-status');
var sendBtn = document.getElementById('f-send');
function showStatus(text, kind) {
  statusEl.textContent = text;
  statusEl.className = 'form-status ' + (kind || '');
}
form.addEventListener('submit', function (e) {
  e.preventDefault();
  var name = form.elements.name.value.trim();
  var email = form.elements.email.value.trim();
  var message = form.elements.message.value.trim();
  if (!name || !message) return showStatus('Please fill in your name and a message.', 'err');
  if (!form.elements.email.checkValidity() || !email) return showStatus('Please enter a valid email address so I can reply.', 'err');
  if (form.elements.access_key.value === 'YOUR_ACCESS_KEY_HERE') return showStatus('The form is not set up yet. Please email me directly.', 'err');

  sendBtn.disabled = true;
  sendBtn.textContent = 'Sending...';
  showStatus('');
  fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify(Object.fromEntries(new FormData(form)))
  })
    .then(function (res) { return res.json(); })
    .then(function (data) {
      if (data.success) {
        form.reset();
        showStatus("Thanks! Your message was sent. I'll reply to your email soon.", 'ok');
      } else {
        showStatus('Sending failed. Please try again or email me directly.', 'err');
      }
    })
    .catch(function () { showStatus('Could not reach the server. Please email me directly.', 'err'); })
    .then(function () { sendBtn.disabled = false; sendBtn.textContent = 'Send message'; });
});

document.getElementById('year').textContent = new Date().getFullYear();
