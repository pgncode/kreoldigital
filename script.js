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
    name: "Prénom Nom",
    role: "Exemple — Commerce, Guadeloupe",
    text: "Ceci est un avis d'exemple. Remplacez ce texte par le vrai retour de votre client une fois la mission terminée.",
    rating: 5
  },
  {
    name: "Prénom Nom",
    role: "Exemple — Indépendant, Martinique",
    text: "Deuxième avis d'exemple, pour montrer que le carrousel gère plusieurs témoignages avec la navigation ci-dessous.",
    rating: 5
  },
  {
    name: "Prénom Nom",
    role: "Exemple — Profession libérale, Guyane",
    text: "Troisième avis d'exemple. Supprimez ou dupliquez ces objets dans le tableau `testimonials` selon vos besoins.",
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
   Logo — retour en haut de page, fiable à chaque clic
   (un simple lien "#top" ne re-déclenche pas le scroll si le hash
   ne change pas dans l'URL — on gère donc le clic nous-mêmes)
   -------------------------------------------------------------------------- */
(function initLogoScrollTop(){
  const brand = document.querySelector('.brand');
  if (!brand) return;

  brand.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    history.replaceState(null, '', window.location.pathname + window.location.search);
  });
})();

/* --------------------------------------------------------------------------
   Année courante dans le footer
   -------------------------------------------------------------------------- */
document.getElementById('year').textContent = new Date().getFullYear();
