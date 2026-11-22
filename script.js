(() => {
  // Desktop cursor: a sunflower-yellow dot that follows the pointer.
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    const cursor = document.createElement('span');
    cursor.className = 'custom-cursor';
    cursor.setAttribute('aria-hidden', 'true');
    document.body.append(cursor);
    document.body.classList.add('has-custom-cursor');
    window.addEventListener('pointermove', event => {
      cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate(-50%, -50%)`;
      cursor.classList.add('is-visible');
    });
    document.addEventListener('pointerover', event => {
      cursor.classList.toggle('is-hovering', Boolean(event.target.closest('a, button')));
    });
    document.addEventListener('pointerout', event => {
      if (!event.relatedTarget) cursor.classList.remove('is-visible');
    });
  }

  // CASE STUDY IMAGE SWAP: each project's image path is the 8th value in its array.
  // Put a replacement file in assets/ and update that value, e.g. 'assets/my-poster.jpg'.
  const projectData = {
    'small-wings-big-impact': ['Mission Blue', 'Environmental awareness campaign', '2026', 'An environmental awareness campaign for the endangered Mission Blue butterfly, native to the Bay Area.', 'Developed an environmental awareness campaign focused on the endangered Mission Blue butterfly, native to the Bay Area. Through visual storytelling, imagery, and typography, the campaign highlights the importance of wildlife conservation and habitat preservation, encouraging community engagement and action to protect endangered species and their ecosystems.', ['Illustrator, Photoshop'], 'assets/small-wings-big-impact.jpg', ['#1876ba', '#e97925', '#dce7ef']],
    'field-notes': ['We Have No Art', 'Poster Design', '2025', 'An exhibition poster exploring how to communicate an exhibition’s ethos without depicting the featured artwork.', 'Created an exhibition poster exploring how to communicate an exhibition’s ethos without depicting the featured artwork. Using visual metaphor and symbolism, the design draws inspiration from radical modernists Dan Friedman and Corita Kent, reflecting their challenges to conventional design practices and their experimental approaches to art and education.', ['Illustrator', 'Photoshop', 'Xerox'], 'assets/WeHaveNoArt_Poster.png', ['#e7d5af', '#c9d3cf', '#e5c5ad']],
    'play-mode': ['Radical Modernists', 'Poster Design', '2025', 'An exhibition poster using a gas can as a visual metaphor for creative energy and change.', 'The work of Corita Kent and Dan Friedman can be read as metaphorically explosive, challenging the prevailing norms of Modernism. The gas can works as a visual metaphor for that energy and the potential to ignite change, while the color palette draws inspiration from Kent’s vibrant use of color.', ['Illustrator', 'Photoshop'], 'assets/RadicalModernists_Poster.png', ['#d8b9a2', '#b8ced0', '#e4cd8f']],
    'objects-of-use': ['Mysophobia', 'Kombucha Packaging Design', '2025', 'A kombucha packaging concept inspired by mysophobia, the fear of germs.', 'Developed a kombucha packaging concept inspired by mysophobia, the fear of germs. Translated microscopic forms into abstract patterns, using vibrant colors and textured typography to transform an unsettling subject into a playful and approachable visual identity.', ['Procreate', 'Illustrator', 'Photoshop'], 'assets/Mysophobia_bottle.jpg', ['#d4d6ca', '#e2c3ae', '#c8d4d2']]
  };
  const casePage = document.querySelector('.case-study');
  if (casePage) {
    const id = new URLSearchParams(location.search).get('project') || 'small-wings-big-impact';
    const [title, category, year, summary, overview, tools, image, palette] = projectData[id] || projectData['small-wings-big-impact'];
    document.title = `${title} — Kat P`;
    casePage.querySelector('[data-title]').textContent = title;
    casePage.querySelector('[data-category]').textContent = category;
    casePage.querySelector('[data-year]').textContent = year;
    casePage.querySelector('[data-summary]').textContent = summary;
    casePage.querySelector('[data-overview]').textContent = overview;
    const heroImage = casePage.querySelector('[data-hero-image]');
    heroImage.style.setProperty('--case-image', `url("${image}")`);
    heroImage.setAttribute('aria-label', `${title} project image`);
    if (id === 'small-wings-big-impact' || id === 'field-notes' || id === 'play-mode') heroImage.classList.add('is-poster');
    casePage.querySelector('[data-tools]').textContent = tools.join(', ');
    casePage.querySelectorAll('[data-process]').forEach((tile, index) => tile.style.setProperty('--process-bg', palette[index]));
    // PROJECT 4 PROCESS PHOTO: replace this asset path to swap the first Mysophobia process image.
    if (id === 'objects-of-use') {
      const processGrid = casePage.querySelector('.process-grid');
      const processTile = processGrid?.querySelector('[data-process="01"]');
      if (processGrid && processTile) {
        const processImage = document.createElement('img');
        processImage.src = 'assets/kombucha2.jpeg';
        processImage.alt = 'Mysophobia kombucha bottles displayed alongside other kombucha products';
        processTile.replaceChildren(processImage);
        processTile.classList.add('has-process-image');
        processGrid.classList.add('has-project-photo');
      }
    }
    if (id === 'small-wings-big-impact' || id === 'field-notes' || id === 'play-mode') casePage.querySelector('.process-section')?.remove();
  }

  const introTitle = document.querySelector('.intro-statement');
  const sprinkleLayer = document.querySelector('.sprinkle-layer');
  if (introTitle && sprinkleLayer && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const colors = ['#f4c542', '#fa633d', '#4f91c8', '#7c9588'];
    introTitle.addEventListener('pointerenter', event => {
      if (event.pointerType === 'touch') return;
      const bounds = sprinkleLayer.getBoundingClientRect();
      const originX = event.clientX - bounds.left;
      const originY = event.clientY - bounds.top;
      for (let index = 0; index < 36; index += 1) {
        const sprinkle = document.createElement('span');
        sprinkle.className = 'sprinkle';
        sprinkle.style.left = `${originX + (Math.random() - .5) * 90}px`;
        sprinkle.style.top = `${originY + (Math.random() - .5) * 35}px`;
        sprinkle.style.setProperty('--sprinkle-color', colors[index % colors.length]);
        sprinkle.style.setProperty('--sprinkle-dx', `${(Math.random() - .5) * 760}px`);
        sprinkle.style.setProperty('--sprinkle-dy', `${(Math.random() - .5) * window.innerHeight * 1.15}px`);
        sprinkle.style.setProperty('--sprinkle-x1', `${(Math.random() - .5) * 420}px`);
        sprinkle.style.setProperty('--sprinkle-y1', `${(Math.random() - .5) * window.innerHeight * .7}px`);
        sprinkle.style.setProperty('--sprinkle-rotate1', `${Math.random() * 720 - 360}deg`);
        sprinkle.style.setProperty('--sprinkle-rotate', `${Math.random() * 1440 - 720}deg`);
        sprinkle.style.setProperty('--sprinkle-size', `${5 + Math.random() * 8}px`);
        sprinkle.style.setProperty('--sprinkle-height', `${7 + Math.random() * 8}px`);
        sprinkle.style.setProperty('--sprinkle-radius', index % 4 === 0 ? '50%' : '2px');
        sprinkleLayer.append(sprinkle);
        window.setTimeout(() => sprinkle.remove(), 1900);
      }
    });
  }

  const section = document.querySelector('.work-section');
  const track = document.querySelector('.project-track');
  const progress = document.querySelector('.gallery-progress span');
  if (!section || !track || !progress) return;

  let travel = 0;
  let sectionTop = 0;
  let sectionHeight = 0;
  let frame = 0;

  function measure() {
    const viewportWidth = document.documentElement.clientWidth;
    travel = Math.max(0, track.scrollWidth - viewportWidth);
    sectionTop = section.getBoundingClientRect().top + window.scrollY;
    sectionHeight = window.innerHeight + travel;
    section.style.height = `${sectionHeight}px`;
    update();
  }

  function update() {
    frame = 0;
    const distance = Math.max(0, Math.min(travel, window.scrollY - sectionTop));
    track.style.transform = `translate3d(${-distance}px, 0, 0)`;
    progress.style.transform = `scaleX(${travel ? distance / travel : 0})`;
  }

  function onScroll() {
    if (!frame) frame = requestAnimationFrame(update);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', measure);
  window.addEventListener('load', measure, { once: true });
  if (document.fonts?.ready) document.fonts.ready.then(measure);
  measure();
})();
