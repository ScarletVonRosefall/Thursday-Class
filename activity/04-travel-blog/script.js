/*
  TRAVEL BLOG PAGE SCRIPT

  Quick edit guide:
  1. Change the note text if you want a different classroom example.
  2. Change the check mark symbol if you want a different style.
  3. Change the outline color if you want selected blog cards to stand out more.
*/

(function () {
  // Grab the parts of the page we want to make interactive.
  const hero = document.querySelector('.hero');
  const postCards = document.querySelectorAll('.post');
  const noteItems = document.querySelectorAll('.sidebar li');

  if (!hero || postCards.length === 0 || noteItems.length === 0) {
    return;
  }

  // Add a note below the hero text.
  const tutorialNote = document.createElement('p');
  tutorialNote.textContent = 'Tutorial example: JavaScript counted ' + postCards.length + ' story cards on this page.';
  tutorialNote.style.fontWeight = 'bold';
  tutorialNote.style.color = '#0f6f88';
  hero.appendChild(tutorialNote);

  // Let students click a blog post to highlight it.
  postCards.forEach(function (card, index) {
    card.style.cursor = 'pointer';

    card.addEventListener('click', function () {
      const isActive = card.dataset.active === 'yes';

      postCards.forEach(function (otherCard) {
        otherCard.dataset.active = 'no';
        otherCard.style.outline = '';
      });

      if (!isActive) {
        card.dataset.active = 'yes';
        card.style.outline = '3px solid #0f8aa8';
        tutorialNote.textContent = 'Tutorial example: Story card ' + (index + 1) + ' is highlighted.';
      } else {
        tutorialNote.textContent = 'Tutorial example: JavaScript counted ' + postCards.length + ' story cards on this page.';
      }
    });
  });

  // Let the travel notes act like a checklist.
  noteItems.forEach(function (item) {
    item.dataset.originalText = item.textContent.trim();
    item.style.cursor = 'pointer';

    item.addEventListener('click', function () {
      const isDone = item.dataset.done === 'yes';

      if (isDone) {
        item.dataset.done = 'no';
        item.textContent = item.dataset.originalText;
        item.style.textDecoration = '';
      } else {
        item.dataset.done = 'yes';
        item.textContent = '✓ ' + item.dataset.originalText;
        item.style.textDecoration = 'line-through';
      }
    });
  });
})();