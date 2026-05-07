/*
  EVENT INVITE PAGE SCRIPT

  Quick edit guide:
  1. Change the note message if you want a new tutorial sentence.
  2. Change the outline color if you want a different highlight color.
  3. Study the click event to learn how users can interact with cards.
*/

(function () {
  // Find the main event detail cards.
  const leadParagraph = document.querySelector('.lead');
  const detailCards = document.querySelectorAll('.detail-card');

  if (!leadParagraph || detailCards.length === 0) {
    return;
  }

  // Insert a small message after the lead paragraph.
  const tutorialNote = document.createElement('p');
  tutorialNote.textContent = 'Tutorial example: JavaScript found ' + detailCards.length + ' detail cards for this event.';
  tutorialNote.style.fontWeight = 'bold';
  tutorialNote.style.color = '#7a3250';
  leadParagraph.insertAdjacentElement('afterend', tutorialNote);

  // Clicking a detail card highlights it so students can see event handling.
  detailCards.forEach(function (card, index) {
    card.style.cursor = 'pointer';

    card.addEventListener('click', function () {
      const isActive = card.dataset.active === 'yes';

      detailCards.forEach(function (otherCard) {
        otherCard.dataset.active = 'no';
        otherCard.style.outline = '';
      });

      if (!isActive) {
        card.dataset.active = 'yes';
        card.style.outline = '3px solid #b54577';
        tutorialNote.textContent = 'Tutorial example: Detail card ' + (index + 1) + ' is selected.';
      } else {
        tutorialNote.textContent = 'Tutorial example: JavaScript found ' + detailCards.length + ' detail cards for this event.';
      }
    });
  });
})();