/* ==========================================================================
   Kreol'Digital — script.js
   ========================================================================== */

/* --------------------------------------------------------------------------
   AVIS CLIENTS — à compléter
   Ajoutez un objet par avis (name, role, text, rating de 1 à 5).
   Le carrousel ci-dessous s'adapte automatiquement, aucune autre
   modification n'est nécessaire.
   -------------------------------------------------------------------------- */
const testimonials = [
  {
    name: "Coming soon",
    role: "X",
    text: "X",
    rating: 5
  },
  {
    name: "Coming soon",
    role: "X",
    text: "X",
    rating: 5
  },
  {
    name: "Coming soon",
    role: "X",
    text: "X",
    rating: 5
  }
];

/* --------------------------------------------------------------------------
   Carrousel d'avis
   -------------------------------------------------------------------------- */
(function initTestimonials(){
  const track = document.getElementById('testimonialTrack');
  const dotsWrap = document.getElementById('tDots');
  const prevBtn = document.getElementById('tPrev');
  const nextBtn = document.getElementById('tNext');

  if (!track || testimonials.length === 0) return;

  let current = 0;

  function starString(rating){
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  }

  function render(){
    track.innerHTML = testimonials.map((t, i) => `
      <div class="t-card${i === current ? ' is-active' : ''}">
        <div class="t-stars">${starString(t.rating)}</div>
        <p class="t-text">« ${t.text} »</p>
        <p class="t-name">${t.name} <span>— ${t.role}</span></p>
      </div>
    `).join('');

    dotsWrap.innerHTML = testimonials.map((_, i) => `
      <button class="t-dot${i === current ? ' is-active' : ''}" data-index="${i}" aria-label="Avis ${i + 1}"></button>
    `).join('');

    dotsWrap.querySelectorAll('.t-dot').forEach(dot => {
      dot.addEventListener('click', () => {
        current = parseInt(dot.dataset.index, 10);
        render();
      });
    });
  }

  prevBtn?.addEventListener('click', () => {
    current = (current - 1 + testimonials.length) % testimonials.length;
    render();
  });
  nextBtn?.addEventListener('click', () => {
    current = (current + 1) % testimonials.length;
    render();
  });

  // Hide navigation entirely if there's only one testimonial
  if (testimonials.length <= 1){
    document.querySelector('.testimonial-controls')?.style.setProperty('display', 'none');
  }

  render();
})();

/* --------------------------------------------------------------------------
   Écran de chargement
   Le minimum se compte à partir du moment où l'écran est réellement peint,
   pas depuis le <head> : sur mobile le CSS met parfois 3 s à arriver, et
   décompter avant l'affichage revient à couper l'animation dès son départ.
   -------------------------------------------------------------------------- */
(function initPreloader(){
  const MIN_AFFICHAGE = 1000; // ms visibles, une fois l'écran peint
  const MAX_AFFICHAGE = 2200; // ms — plafond de sécurité

  const root = document.documentElement;
  if (!root.classList.contains('is-loading')) return;

  let fini = false;
  const masquer = () => {
    if (fini) return;
    fini = true;
    root.classList.remove('is-loading');
  };

  // Deux frames : la première déclenche le rendu, la seconde confirme qu'il a eu lieu.
  let debut = Date.now();
  requestAnimationFrame(() => requestAnimationFrame(() => { debut = Date.now(); }));

  const terminer = () => {
    setTimeout(masquer, Math.max(0, MIN_AFFICHAGE - (Date.now() - debut)));
  };

  if (document.readyState === 'complete') terminer();
  else window.addEventListener('load', terminer);

  setTimeout(masquer, MAX_AFFICHAGE + MIN_AFFICHAGE);
})();

/* --------------------------------------------------------------------------
   Menu mobile
   -------------------------------------------------------------------------- */
(function initNav(){
  const toggle = document.getElementById('navToggle');
  const nav = document.getElementById('mainNav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    toggle.classList.toggle('is-open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      toggle.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
})();

/* --------------------------------------------------------------------------
   Révélation au scroll (cartes services + étapes)
   -------------------------------------------------------------------------- */
(function initScrollReveal(){
  const targets = document.querySelectorAll('.service-card, .step, .pain-card, .stage-card');
  if (!('IntersectionObserver' in window) || targets.length === 0){
    return; // pas de classe js-anim => tout reste visible par défaut (CSS)
  }

  document.body.classList.add('js-anim');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  targets.forEach((el, i) => {
    el.classList.add('reveal'); // le CSS ne masque que ce que le JS observe vraiment
    el.style.transitionDelay = `${(i % 4) * 60}ms`;
    observer.observe(el);
  });
})();

/* --------------------------------------------------------------------------
   Révélation au scroll — numéros 01/02/03 (effet distinct, en cascade)
   -------------------------------------------------------------------------- */
(function initStepNumbers(){
  const nums = document.querySelectorAll('.step-num');
  if (!('IntersectionObserver' in window) || nums.length === 0){
    return;
  }

  document.body.classList.add('js-anim');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  nums.forEach((el, i) => {
    el.classList.add('reveal-num');
    el.style.transitionDelay = `${i * 150}ms`; // 0ms, 150ms, 300ms → effet cascade
    observer.observe(el);
  });
})();


/* --------------------------------------------------------------------------
   Révélation au scroll — contenu du hero (cascade)
   -------------------------------------------------------------------------- */
(function initHeroReveal(){
  const items = document.querySelectorAll('.hero-inner > *');
  if (!('IntersectionObserver' in window) || items.length === 0) return;

  document.body.classList.add('js-anim');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  items.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${i * 130}ms`;
    observer.observe(el);
  });
})();


/* --------------------------------------------------------------------------
   Simulateur chèque TIC
   Taux et bases issus de la grille officielle des dépenses éligibles.
   Plafond global de l'aide : 10 000 €.
   -------------------------------------------------------------------------- */
(function initSimulateurTIC(){
  const site = document.getElementById('simSite');
  if (!site) return;

  const heb   = document.getElementById('simHeb');
  const audit = document.getElementById('simAudit');
  const form  = document.getElementById('simForm');
  const anim  = document.getElementById('simAnim');

  const PLAFOND_GLOBAL = 10000;
  const BASE = 500;               // base de calcul des postes plafonnés
  const euros = n => Math.round(n).toLocaleString('fr-FR') + ' €';

  function maj(){
    const mSite = Number(site.value);
    const mHeb  = Number(heb.value);
    const mAudit = audit.checked ? BASE : 0;
    const mForm  = form.checked  ? BASE : 0;
    const mAnim  = anim.checked  ? BASE : 0;

    const projet = mSite + mHeb + mAudit + mForm + mAnim;

    const aideBrute = (mSite * 0.80) + (mHeb * 0.80)
                    + (mAudit * 0.80) + (mForm * 0.80) + (mAnim * 0.40);
    const aide = Math.min(aideBrute, PLAFOND_GLOBAL);
    const reste = projet - aide;

    document.getElementById('simSiteVal').textContent = euros(mSite);
    document.getElementById('simHebVal').textContent  = euros(mHeb);
    document.getElementById('simProjet').textContent  = euros(projet);
    document.getElementById('simAide').textContent    = euros(aide);
    document.getElementById('simReste').textContent   = euros(reste);

    const note = document.getElementById('simNote');
    if (projet === 0){
      note.textContent = '';
    } else if (aideBrute > PLAFOND_GLOBAL){
      note.textContent = "Votre projet dépasse le plafond : l'aide est ramenée à 10 000 €.";
    } else {
      const part = Math.round((aide / projet) * 100);
      note.textContent = 'Soit ' + part + ' % de votre projet pris en charge. '
        + 'Vous réglez la totalité, puis la Région rembourse sa part sur facture acquittée.';
    }
  }

  [site, heb].forEach(el => el.addEventListener('input', maj));
  [audit, form, anim].forEach(el => el.addEventListener('change', maj));
  maj();
})();

/* --------------------------------------------------------------------------
   FAQ — accordéon
   -------------------------------------------------------------------------- */
(function initFAQ(){
  document.querySelectorAll('.faq-item').forEach(item => {
    const btn = item.querySelector('.faq-question');
    btn?.addEventListener('click', () => {
      const isOpen = item.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', String(isOpen));
    });
  });
})();

/* --------------------------------------------------------------------------
   Formulaire de contact — envoi via Web3Forms
   Le <form> garde action et method : si ce script échoue, le navigateur
   soumet quand même le formulaire de façon classique. On n'a jamais un
   bouton mort.
   -------------------------------------------------------------------------- */
(function initContactForm(){
  const form = document.getElementById('contactForm');
  if (!form) return;

  const statut = document.getElementById('formStatus');
  const bouton = form.querySelector('button[type="submit"]');
  const libelle = bouton ? bouton.textContent : '';

  const dire = (texte, type) => {
    if (!statut) return;
    statut.textContent = texte;
    statut.className = 'form-status is-' + type;
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    dire('Envoi en cours…', 'pending');
    if (bouton){ bouton.disabled = true; bouton.textContent = 'Envoi…'; }

    try {
      const reponse = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form)))
      });
      const data = await reponse.json();

      if (data.success){
        form.reset();
        dire('Message envoyé. Vous recevez une réponse sous 24h.', 'ok');
      } else {
        dire("L'envoi a échoué. Écrivez-nous directement à p.godran@kreoldigital.fr.", 'error');
      }
    } catch (err) {
      dire("Connexion impossible. Écrivez-nous à p.godran@kreoldigital.fr ou appelez le 06 90 50 48 87.", 'error');
    } finally {
      if (bouton){ bouton.disabled = false; bouton.textContent = libelle; }
    }
  });
})();

/* --------------------------------------------------------------------------
   Année courante dans le footer
   -------------------------------------------------------------------------- */
const anneeEl = document.getElementById('year');
if (anneeEl) anneeEl.textContent = new Date().getFullYear();
