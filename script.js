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
    name: "X",
    role: "Exemple — Commerce, Guadeloupe",
    text: "X",
    rating: 5
  },
  {
    name: "X",
    role: "Exemple — Indépendant, Martinique",
    text: "X",
    rating: 5
  },
  {
    name: "X",
    role: "Exemple — Profession libérale, Guyane",
    text: "X",
    rating: 5
  }
];

/* --------------------------------------------------------------------------
   FAQ — à compléter
   Ajoutez, modifiez ou réordonnez les objets { question, answer }.
   La liste ci-dessous s'adapte automatiquement, aucune autre
   modification n'est nécessaire.
   -------------------------------------------------------------------------- */
const faqItems = [
  {
    question: "Combien de temps faut-il pour avoir mon site en ligne ?",
    answer: "Ça dépend de la formule choisie et de votre disponibilité pour valider les étapes, mais comptez en général quelques jours pour une visibilité express et de deux à quatre semaines pour un site sur-mesure, révisions incluses."
  },
  {
    question: "Intervenez-vous partout en Guadeloupe, Martinique et Guyane ?",
    answer: "Oui, l'essentiel de l'accompagnement se fait à distance, avec des points d'étape par téléphone ou visio. Un déplacement peut s'organiser selon les besoins du projet."
  },
  {
    question: "Combien coûte un site internet ?",
    answer: "Les sites démarrent à 790€ selon vos besoins (vitrine, prise de RDV, paiement en ligne, boutique). Le devis, gratuit et sans engagement, précise le tarif exact après notre premier échange."
  },
  {
    question: "Que se passe-t-il une fois le site en ligne ?",
    answer: "Vous repartez avec une prise en main rapide de votre site. Si vous avez choisi un abonnement de pilotage, la maintenance, le suivi et la gestion des avis et réseaux sont assurés en continu."
  },
  {
    question: "Puis-je modifier moi-même le contenu de mon site ensuite ?",
    answer: "Oui, une prise en main vous est proposée pour gérer les mises à jour simples. Pour tout le reste, l'abonnement de pilotage ou un service à la carte prend le relais."
  },
  {
    question: "Le référencement (SEO) et la fiche Google sont-ils inclus ?",
    answer: "Un socle SEO est intégré à chaque site. L'optimisation complète de votre fiche Google Business est un service à part, disponible dès 150€, et peut être combinée à la création du site."
  },
  {
    question: "Faut-il un engagement long terme sur les abonnements de pilotage ?",
    answer: "Non, les abonnements démarrent à 39€/mois sans engagement de durée. Vous gardez la liberté d'ajuster ou d'arrêter selon l'évolution de votre activité."
  }
];

/* --------------------------------------------------------------------------
   Réalisations — à compléter
   Ajoutez un objet par livraison : { client, category, location, need,
   solution, image }. "image" est optionnel (chemin vers un visuel) ;
   sans image, une vignette de couleur est générée automatiquement.
   La grille sur realisations.html s'adapte automatiquement, aucune autre
   modification n'est nécessaire.
   -------------------------------------------------------------------------- */
const projects = [
  {
    client: "Nom du client",
    category: "Site vitrine",
    location: "Guadeloupe",
    need: "Résumé du besoin exprimé par le client en une ou deux phrases.",
    solution: "Résumé de la solution mise en place et du résultat obtenu.",
    image: null
  },
  {
    client: "Nom du client",
    category: "Fiche Google Business",
    location: "Martinique",
    need: "Résumé du besoin exprimé par le client en une ou deux phrases.",
    solution: "Résumé de la solution mise en place et du résultat obtenu.",
    image: null
  },
  {
    client: "Nom du client",
    category: "Boutique en ligne",
    location: "Guyane",
    need: "Résumé du besoin exprimé par le client en une ou deux phrases.",
    solution: "Résumé de la solution mise en place et du résultat obtenu.",
    image: null
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
   FAQ — accordéon
   -------------------------------------------------------------------------- */
(function initFaq(){
  const list = document.getElementById('faqList');
  if (!list || faqItems.length === 0) return;

  list.innerHTML = faqItems.map((item, i) => `
    <div class="faq-item">
      <button class="faq-question" id="faqQ${i}" aria-expanded="false" aria-controls="faqA${i}">
        <span>${item.question}</span>
        <span class="faq-icon" aria-hidden="true">+</span>
      </button>
      <div class="faq-answer" id="faqA${i}" role="region" aria-labelledby="faqQ${i}">
        <p>${item.answer}</p>
      </div>
    </div>
  `).join('');

  list.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('is-open');

      list.querySelectorAll('.faq-item.is-open').forEach(open => {
        open.classList.remove('is-open');
        open.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });

      if (!isOpen){
        item.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
})();

/* --------------------------------------------------------------------------
   Réalisations — mur de projets
   -------------------------------------------------------------------------- */
(function initWork(){
  const grid = document.getElementById('workGrid');
  if (!grid || projects.length === 0) return;

  grid.innerHTML = projects.map(p => `
    <article class="work-card">
      <div class="work-visual"${p.image ? '' : ` data-fallback="${p.category.charAt(0)}"`}>
        ${p.image ? `<img src="${p.image}" alt="Aperçu du projet ${p.client}" loading="lazy">` : ''}
      </div>
      <div class="work-body">
        <p class="work-tag">${p.category} · ${p.location}</p>
        <h3>${p.client}</h3>
        <p class="work-label">Besoin</p>
        <p class="work-text">${p.need}</p>
        <p class="work-label">Solution</p>
        <p class="work-text">${p.solution}</p>
      </div>
    </article>
  `).join('');
})();

/* --------------------------------------------------------------------------
   Formulaire de contact
   Site 100% statique (sans serveur) : le formulaire ouvre la messagerie
   du visiteur avec le message pré-rempli, prêt à envoyer.
   -------------------------------------------------------------------------- */
(function initContactForm(){
  const form = document.getElementById('contactForm');
  if (!form) return;

  const CONTACT_EMAIL = 'p.godran@kreoldigital.fr';

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const phone = form.phone.value.trim();
    const message = form.message.value.trim();

    const subject = `Demande de devis — ${name}`;
    const bodyLines = [
      `Nom : ${name}`,
      `E-mail : ${email}`,
      phone ? `Téléphone : ${phone}` : null,
      '',
      message
    ].filter(line => line !== null);

    const mailtoUrl = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join('\n'))}`;
    window.location.href = mailtoUrl;
  });
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
  const targets = document.querySelectorAll('.service-card, .step, .work-card');
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
   Année courante dans le footer
   -------------------------------------------------------------------------- */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
