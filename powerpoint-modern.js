const thumbnailList = document.getElementById('thumbnailList');
const slideTotal = document.getElementById('slideTotal');
const slideCountHeadline = document.getElementById('slideCountHeadline');
const gallerySlidesMount = document.getElementById('gallerySlidesMount');
const status = document.getElementById('slideStatus');
const deckProgress = document.getElementById('deckProgress');
const editorProgress = document.getElementById('editorProgress');
const canvasTitle = document.getElementById('canvasTitle');
const canvasSubline = document.getElementById('canvasSubline');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');

let slides = [];
let thumbnails = [];
let activeIndex = 0;
let isAnimating = false;

function encodePath(...segments) {
  return segments.map((segment) => encodeURIComponent(segment)).join('/');
}

const profilePhotoSrc = encodePath('Photos', 'Profile photo', 'Kim.png');
const photoFiles = [
  '20250220_091809.jpg',
  '20250314_214216.jpg',
  '20250424_122341.jpg',
  '20250424_122342.jpg',
  '20250507_154803 (1).jpg',
  '20250509_105651.jpg',
  '20250524_110752.jpg',
  '20250601_162318.jpg',
  '20250601_163220.jpg',
  '20250601_163656 (1).jpg',
  '20250601_164932.jpg',
  '20250601_170253 (1).jpg',
  '20250625_071407.jpg',
  '20250721_123235(1).jpg',
  '20251130_110141_edited (2).png',
  '20251217_161229 (1).jpg',
  '20251217_161229.jpg',
  '20251217_161822.jpg',
  '20260101_000633(0).jpg',
  '20260114_101450.jpg',
  '20260114_101453.jpg',
  '20260204_162229.jpg',
  '20260303_084230_edited.jpg',
  'received_1145317827672028 (3).jpg',
  'received_1145317827672028 (4).jpg',
  'received_1639050880128665 (3).jpg',
  'received_1890009761953652 (1).jpg',
  'received_2061672887943199 (6).jpg',
  'received_894919426819016.jpg'
];

const photoTitles = [
  'Campus Portrait',
  'Golden Hour Frame',
  'Street Detail',
  'Event Story',
  'Travel Study',
  'Quiet Texture',
  'Editorial Moment',
  'Natural Light Shot',
  'Motion Capture',
  'Composition Test'
];

const toneGroupOrder = ['warm', 'cool', 'mono'];

function chunk(array, size) {
  const chunks = [];

  for (let index = 0; index < array.length; index += size) {
    chunks.push(array.slice(index, index + size));
  }

  return chunks;
}

function buildPhotoEntries(files) {
  return files.map((fileName, index) => {
    return {
      src: encodePath('Photos', 'Photographs', fileName),
      title: `${photoTitles[index % photoTitles.length]} ${String(index + 1).padStart(2, '0')}`,
      caption: 'Loaded from local photograph archive.',
      alt: `Photography showcase image ${index + 1}`
    };
  });
}

function rgbToHsl(red, green, blue) {
  const r = red / 255;
  const g = green / 255;
  const b = blue / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const lightness = (max + min) / 2;
  const delta = max - min;

  if (delta === 0) {
    return { hue: 0, saturation: 0, lightness };
  }

  const saturation = lightness > 0.5
    ? delta / (2 - max - min)
    : delta / (max + min);

  let hue;

  switch (max) {
    case r:
      hue = ((g - b) / delta) % 6;
      break;
    case g:
      hue = (b - r) / delta + 2;
      break;
    default:
      hue = (r - g) / delta + 4;
      break;
  }

  hue *= 60;

  if (hue < 0) {
    hue += 360;
  }

  return { hue, saturation, lightness };
}

function classifyPhotoTone(image) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d', { willReadFrequently: true });

  if (!context || !image.naturalWidth || !image.naturalHeight) {
    return 'Cool';
  }

  const sampleWidth = 48;
  const sampleHeight = Math.max(48, Math.round(sampleWidth * (image.naturalHeight / image.naturalWidth)));

  canvas.width = sampleWidth;
  canvas.height = sampleHeight;
  context.drawImage(image, 0, 0, sampleWidth, sampleHeight);

  const { data } = context.getImageData(0, 0, sampleWidth, sampleHeight);
  let totalPixels = 0;
  let saturatedPixels = 0;
  let saturationSum = 0;
  let warmScore = 0;
  let coolScore = 0;
  let monoScore = 0;

  for (let index = 0; index < data.length; index += 4) {
    const alpha = data[index + 3] / 255;

    if (alpha < 0.2) {
      continue;
    }

    const red = data[index];
    const green = data[index + 1];
    const blue = data[index + 2];
    const { hue, saturation, lightness } = rgbToHsl(red, green, blue);
    const chroma = (Math.max(red, green, blue) - Math.min(red, green, blue)) / 255;
    const weightedSaturation = saturation * (0.35 + lightness * 0.65);

    totalPixels += 1;
    saturationSum += saturation;

    if (chroma < 0.08 || saturation < 0.12) {
      monoScore += (1 - chroma) * 1.2;
      continue;
    }

    saturatedPixels += 1;

    if (hue < 70 || hue >= 320) {
      warmScore += weightedSaturation * 1.15;
    } else if (hue < 200) {
      coolScore += weightedSaturation * 0.8;
    } else if (hue < 290) {
      coolScore += weightedSaturation * 1.2;
    } else {
      warmScore += weightedSaturation * 0.55;
      coolScore += weightedSaturation * 0.45;
    }
  }

  if (totalPixels === 0) {
    return 'Cool';
  }

  const avgSaturation = saturationSum / totalPixels;
  const colorfulShare = saturatedPixels / totalPixels;

  if (avgSaturation < 0.12 || colorfulShare < 0.1) {
    return 'Mono';
  }

  return warmScore >= coolScore ? 'Warm' : 'Cool';
}

function applyPhotoTone(image, card) {
  const tone = classifyPhotoTone(image);
  const caption = card.querySelector('.caption');
  const captionTitle = caption?.querySelector('strong');

  if (caption) {
    const titleMarkup = captionTitle ? `<strong>${captionTitle.textContent}</strong>` : '';
    caption.innerHTML = `${titleMarkup}Loaded from local photograph archive.`;
  }

  card.dataset.toneCategory = tone.toLowerCase();
  card.classList.remove('warm', 'cool', 'mono');
  card.classList.add(tone.toLowerCase());
}

function sortGalleryCardsByTone() {
  const collageGrid = document.querySelector('.gallery-slide .collage-grid');

  if (!collageGrid) {
    return;
  }

  const cards = Array.from(collageGrid.querySelectorAll('.photo-card'));

  if (!cards.length || cards.some((card) => !card.dataset.toneCategory)) {
    return;
  }

  const toneRank = toneGroupOrder.reduce((rankMap, tone, index) => {
    rankMap[tone] = index;
    return rankMap;
  }, {});

  cards
    .slice()
    .sort((leftCard, rightCard) => {
      const leftRank = toneRank[leftCard.dataset.toneCategory] ?? toneGroupOrder.length;
      const rightRank = toneRank[rightCard.dataset.toneCategory] ?? toneGroupOrder.length;
      return leftRank - rightRank;
    })
    .forEach((card) => {
      collageGrid.appendChild(card);
    });
}

function buildGallerySlides() {
  const photoEntries = buildPhotoEntries(photoFiles);
  gallerySlidesMount.innerHTML = `
    <article class="slide hobby-slide gallery-slide" data-kind="gallery" data-title="Hobbies &amp; Side Work" data-thumb-title="Hobbies &amp; Side Work" data-thumb-desc="Photography gallery" data-subline="Full photograph archive collected into one large scrollable gallery slide." data-thumb-image="${photoEntries[0].src}">
      <div class="slide-panel">
        <div class="slide-inner">
          <div class="section-head">
            <div class="section-copy">
              <div class="slide-kicker" data-animate="fade" style="--delay: 40;">Photography Showcase</div>
              <h2 class="slide-title" data-animate style="--delay: 120;">Hobbies &amp; Side Work</h2>
              <p class="slide-copy" data-animate style="--delay: 220;">
                Full photograph archive sits in one long gallery slide. Scroll inside the slide to browse everything without splitting the story across many pages.
              </p>
            </div>
          </div>

          <div class="collage-card" data-animate="scale" style="--delay: 300;">
            <div class="collage-grid">
              ${photoEntries.map((item, itemIndex) => `
                <figure class="photo-card" data-animate="scale" style="--delay: ${360 + Math.min(itemIndex, 10) * 50};">
                  <img class="photo-media" src="${item.src}" alt="${item.alt}" loading="${itemIndex < 6 ? 'eager' : 'lazy'}" />
                  <figcaption class="caption">
                    <strong>${item.title}</strong>
                    ${item.caption}
                  </figcaption>
                </figure>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    </article>
  `;
}

function syncPhotoCardRatios() {
  const images = Array.from(document.querySelectorAll('.photo-media'));
  let processedImages = 0;

  images.forEach((image) => {
    const card = image.closest('.photo-card');

    if (!card) {
      return;
    }

    const applyRatio = () => {
      if (image.naturalWidth && image.naturalHeight) {
        const ratio = image.naturalWidth / image.naturalHeight;
        let sizeCategory = 'portrait';

        if (ratio > 1.15) {
          sizeCategory = 'landscape';
        } else if (ratio >= 0.85) {
          sizeCategory = 'square';
        }

        card.style.setProperty('--media-ratio', `${image.naturalWidth} / ${image.naturalHeight}`);
        card.dataset.sizeCategory = sizeCategory;
        card.classList.remove('portrait', 'square', 'landscape');
        card.classList.add(sizeCategory);
        applyPhotoTone(image, card);
        processedImages += 1;

        if (processedImages === images.length) {
          sortGalleryCardsByTone();
        }
      }
    };

    if (image.complete) {
      applyRatio();
    } else {
      image.addEventListener('load', applyRatio, { once: true });
    }
  });
}

function buildThumbnails() {
  thumbnailList.innerHTML = slides.map((slide, index) => {
    const title = slide.dataset.thumbTitle || slide.dataset.title || `Slide ${index + 1}`;
    const description = slide.dataset.thumbDesc || slide.dataset.subline || 'Presentation slide';
    const kind = slide.dataset.kind || 'default';

    return `
      <button class="thumbnail ${index === activeIndex ? 'active' : ''}" type="button" data-index="${index}" data-kind="${kind}" aria-current="${index === activeIndex}">
        <span class="thumb-number">${index + 1}</span>
        <span>
          <span class="thumb-preview"></span>
          <span class="thumb-label">
            <strong>${title}</strong>
            <span>${description}</span>
          </span>
        </span>
      </button>
    `;
  }).join('');

  thumbnails = Array.from(thumbnailList.querySelectorAll('.thumbnail'));

  thumbnails.forEach((thumbnail) => {
    const slide = slides[Number(thumbnail.dataset.index)];
    const preview = thumbnail.querySelector('.thumb-preview');
    const thumbImage = slide.dataset.thumbImage || (slide.dataset.kind === 'profile' ? profilePhotoSrc : '');

    if (thumbImage && preview) {
      preview.style.backgroundImage = `linear-gradient(180deg, rgba(255,255,255,0.02), rgba(19,34,56,0.18)), url("${thumbImage}")`;
    }

    thumbnail.addEventListener('click', () => {
      showSlide(Number(thumbnail.dataset.index));
    });
  });
}

function initializeDeck() {
  buildGallerySlides();
  syncPhotoCardRatios();
  slides = Array.from(document.querySelectorAll('.slide'));
  buildThumbnails();
  slideTotal.textContent = `${slides.length} total`;
  slideCountHeadline.textContent = `${slides.length} slides`;
}

function updateProgress(index) {
  const percentage = ((index + 1) / slides.length) * 100;
  deckProgress.style.width = `${percentage}%`;
  editorProgress.style.width = `${Math.max(35, percentage)}%`;
}

function updateMeta(index) {
  const slide = slides[index];
  canvasTitle.textContent = slide.dataset.title;
  canvasSubline.textContent = slide.dataset.subline;
  status.innerHTML = `Slide ${index + 1} of ${slides.length} <span>· Arrow keys enabled</span>`;

  thumbnails.forEach((thumb, thumbIndex) => {
    const active = thumbIndex === index;
    thumb.classList.toggle('active', active);
    thumb.setAttribute('aria-current', active ? 'true' : 'false');
  });

  prevButton.disabled = index === 0;
  nextButton.disabled = index === slides.length - 1;

  if (thumbnails[index]) {
    thumbnails[index].scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }
}

function resetAnimations(slide) {
  slide.querySelectorAll('[data-animate], .step').forEach((element) => {
    element.style.animation = 'none';
    element.offsetHeight;
    element.style.animation = '';
  });
}

function showSlide(index) {
  if (isAnimating || index === activeIndex || index < 0 || index >= slides.length) {
    return;
  }

  isAnimating = true;
  const outgoing = slides[activeIndex];
  const incoming = slides[index];
  const direction = index > activeIndex ? 'forward' : 'backward';

  slides.forEach((slide, slideIndex) => {
    slide.classList.remove('exit-left');
    slide.style.zIndex = slideIndex === index ? '2' : '1';
  });

  outgoing.classList.remove('active');
  outgoing.classList.toggle('exit-left', direction === 'forward');
  outgoing.style.transform = direction === 'forward' ? '' : 'translateX(64px) scale(0.98)';

  incoming.style.transform = direction === 'forward' ? 'translateX(64px) scale(0.98)' : 'translateX(-64px) scale(0.98)';
  incoming.offsetHeight;
  incoming.classList.add('active');
  incoming.style.transform = '';
  resetAnimations(incoming);

  activeIndex = index;
  updateMeta(activeIndex);
  updateProgress(activeIndex);

  window.setTimeout(() => {
    outgoing.style.transform = '';
    outgoing.classList.remove('exit-left');
    isAnimating = false;
  }, 780);
}

function move(delta) {
  const next = activeIndex + delta;

  if (next < 0 || next >= slides.length) {
    return;
  }

  showSlide(next);
}

function handleKeydown(event) {
  const target = event.target;
  const editable = target instanceof HTMLElement && (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName));

  if (editable) {
    return;
  }

  if (event.key === 'ArrowRight') {
    event.preventDefault();
    move(1);
  }

  if (event.key === 'ArrowLeft') {
    event.preventDefault();
    move(-1);
  }
}

prevButton.addEventListener('click', () => move(-1));
nextButton.addEventListener('click', () => move(1));
document.addEventListener('keydown', handleKeydown);
window.addEventListener('keydown', handleKeydown);

initializeDeck();
updateMeta(activeIndex);
updateProgress(activeIndex);