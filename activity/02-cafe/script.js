/*
  CAFE PAGE SCRIPT

  Quick edit guide:
  1. Change "Today's Pick" if you want a different label.
  2. Change the outline color if you want a new accent.
  3. Study the click events below to learn how interactivity works.
*/

(function () {
  // Find the menu section and its cards.
  const menuSection = document.getElementById('menu');
  const menuCards = document.querySelectorAll('#menu .card');
  const pageLinks = document.querySelectorAll('a[href^="#"]');

  if (!menuSection || menuCards.length === 0) {
    return;
  }

  // Build a note with JavaScript so students can see live page changes.
  const tutorialNote = document.createElement('p');
  tutorialNote.textContent = 'Tutorial example: This menu currently shows ' + menuCards.length + ' cards.';
  tutorialNote.style.color = '#6b4f3a';
  tutorialNote.style.fontWeight = 'bold';

  const menuHeading = menuSection.querySelector('h2');
  if (menuHeading) {
    menuHeading.insertAdjacentElement('afterend', tutorialNote);
  }

  // Add a small label to the first menu card.
  const firstCardHeading = menuCards[0].querySelector('h3');
  if (firstCardHeading) {
    firstCardHeading.textContent = firstCardHeading.textContent + ' - Today\'s Pick';
  }

  // Smooth scrolling makes anchor links feel nicer for students.
  pageLinks.forEach(function (link) {
    link.addEventListener('click', function (event) {
      const targetId = link.getAttribute('href');
      const target = targetId ? document.querySelector(targetId) : null;

      if (!target) {
        return;
      }

      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Clicking a card gives it a simple highlight.
  menuCards.forEach(function (card, index) {
    card.style.cursor = 'pointer';

    card.addEventListener('click', function () {
      const isActive = card.dataset.active === 'yes';

      menuCards.forEach(function (otherCard) {
        otherCard.dataset.active = 'no';
        otherCard.style.outline = '';
      });

      if (!isActive) {
        card.dataset.active = 'yes';
        card.style.outline = '3px solid #b06f3b';
        tutorialNote.textContent = 'Tutorial example: Menu card ' + (index + 1) + ' is highlighted.';
      } else {
        tutorialNote.textContent = 'Tutorial example: This menu currently shows ' + menuCards.length + ' cards.';
      }
    });
  });
})();