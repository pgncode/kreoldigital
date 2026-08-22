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
    name: "Chantal R.",
    role: "Traiteur / Food-truck (Guyane)",
    text: "Génial pour afficher mon menu de la semaine ! Les clients flashent le QR code au comptoir et tombent directement sur la page adaptée au smartphone. C'est simple, rapide et bien plus propre qu'un fichier PDF lourd à télécharger. Pour 39 €, il ne faut pas hésiter.",
    rating: 5
  },
  {
    name: "Sandrine T",
    role: "Esthéticienne indépendante (Martinique)",
    text: "Un vrai diagnostic à 360° qui va droit au but. Prisca a pointé du doigt exactement ce qui bloquait ma visibilité sur mobile. J'ai pu corriger 2 ou 3 trucs urgents la semaine même et j'ai déjà vu la différence sur les demandes de rendez-vous.",
    rating: 5
  },
  {
    name: "David M.",
    role: "Gérant de restaurant (Guadeloupe)",
    text: "Honnêtement, je ne savais pas trop à quoi m'attendre pour 89 €, mais le rapport est tombé en 48h chrono. Ça m'a ouvert les yeux sur le nombre de clients qui ne me trouvaient pas à cause de petites erreurs sur ma fiche Google et mon site. Le plan d'action était très clair, sans jargon technique. Très bon investissement.",
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
  const targets = document.querySelectorAll('.service-card, .step');
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
    el.style.transitionDelay = `${i * 150}ms`; // 0ms, 150ms, 300ms → effet cascade
    observer.observe(el);
  });
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
   Formulaire de contact — ouvre la messagerie avec le message pré-rempli
   -------------------------------------------------------------------------- */
(function initContactForm(){
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const phone = form.phone.value.trim();
    const message = form.message.value.trim();

    const subject = `Demande de devis — ${name}`;
    const body =
      `Nom : ${name}\n` +
      `E-mail : ${email}\n` +
      (phone ? `Téléphone : ${phone}\n` : '') +
      `\nProjet :\n${message}`;

    window.location.href =
      `mailto:p.godran@kreoldigital.fr?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
})();

/* --------------------------------------------------------------------------
   Année courante dans le footer
   -------------------------------------------------------------------------- */
document.getElementById('year').textContent = new Date().getFullYear();
