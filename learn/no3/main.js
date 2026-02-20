// Main JS for VirtualLab Website
(function(){
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // Mobile menu
  const hamburger = $('#hamburger');
  const navMenu = $('#navMenu');
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      navMenu?.classList.toggle('open');
      hamburger.classList.toggle('open');
    });
  }

  // Modal controls
  const showModal = id => { const m = document.getElementById(id); if (m) { m.style.display = 'flex'; } };
  const closeModal = id => { const m = document.getElementById(id); if (m) { m.style.display = 'none'; } };
  window.showLogin = () => showModal('loginModal');
  window.showSignup = () => showModal('signupModal');
  window.closeModal = closeModal;
  window.switchToSignup = () => { closeModal('loginModal'); showModal('signupModal'); };
  window.switchToLogin = () => { closeModal('signupModal'); showModal('loginModal'); };

  // Demo CTA
  window.startFreeTrial = () => alert('Free trial flow would start here (integrate with backend auth).');
  window.exploreDemo = () => {
    document.getElementById('labs')?.scrollIntoView({behavior: 'smooth'});
  };
  window.scheduleDemo = () => alert('Scheduling demo... connect to your calendar/CRM.');

  // Forms (basic demo validation)
  const loginForm = $('#loginForm');
  loginForm?.addEventListener('submit', e => {
    e.preventDefault();
    alert('Logged in (demo). Wire this to your backend / Keycloak / Firebase.');
    closeModal('loginModal');
  });

  const signupForm = $('#signupForm');
  signupForm?.addEventListener('submit', e => {
    e.preventDefault();
    alert('Account created (demo).');
    closeModal('signupModal');
  });

  // Access lab buttons
  window.accessLab = (slug) => {
    alert(`Launching ${slug} lab... In production, provision a sandbox (VM/container) and open the workspace.`);
  };

  // Typing animation demo
  const cmd = document.querySelector('.typing-animation');
  if (cmd) {
    const text = cmd.textContent;
    cmd.textContent = '';
    let i = 0;
    const type = () => {
      if (i <= text.length) {
        cmd.textContent = text.slice(0, i);
        i++;
        setTimeout(type, 80);
      }
    };
    type();
  }
})();