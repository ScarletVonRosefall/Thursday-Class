/*
  PET ADOPTION PAGE SCRIPT

  Quick edit guide:
  1. Change the status text if you want a different classroom example.
  2. Change the outline color if you want another highlight color.
  3. Study the click event to learn how JavaScript updates each card.
*/

(function () {
  // Find the first grid, because that grid holds the pet cards.
  const pageGrids = document.querySelectorAll('.grid');
  const petCards = pageGrids[0] ? pageGrids[0].querySelectorAll('.card') : [];
  const firstHeading = document.querySelector('main h2');

  if (!firstHeading || petCards.length === 0) {
    return;
  }

  // Add a tutorial note under the heading.
  const tutorialNote = document.createElement('p');
  tutorialNote.textContent = 'Tutorial example: JavaScript found ' + petCards.length + ' pets in the first adoption list.';
  tutorialNote.style.fontWeight = 'bold';
  tutorialNote.style.color = '#8a4b12';
  firstHeading.insertAdjacentElement('afterend', tutorialNote);

  // Give every pet card a click event and a status line.
  petCards.forEach(function (card, index) {
    const statusLine = document.createElement('p');
    statusLine.textContent = 'Click this card to mark it as a favorite.';
    statusLine.style.fontWeight = 'bold';
    statusLine.style.marginBottom = '0';
    card.appendChild(statusLine);

    card.style.cursor = 'pointer';

    card.addEventListener('click', function () {
      const isFavorite = card.dataset.favorite === 'yes';

      if (isFavorite) {
        card.dataset.favorite = 'no';
        card.style.outline = '';
        statusLine.textContent = 'Click this card to mark it as a favorite.';
        tutorialNote.textContent = 'Tutorial example: JavaScript found ' + petCards.length + ' pets in the first adoption list.';
      } else {
        card.dataset.favorite = 'yes';
        card.style.outline = '3px solid #f28c3a';
        statusLine.textContent = 'Favorite saved for tutorial practice on pet card ' + (index + 1) + '.';
        tutorialNote.textContent = 'Tutorial example: Pet card ' + (index + 1) + ' is marked as a favorite.';
      }
    });
  });
})();