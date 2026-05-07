/*
  FITNESS PAGE SCRIPT

  Quick edit guide:
  1. Change the note text if you want a different teaching example.
  2. Change the outline color if you want a different selected-plan color.
  3. Read the button click code to learn smooth scrolling.
*/

(function () {
  // Select the parts of the page we want to control with JavaScript.
  const plansSection = document.getElementById('plans');
  const planCards = document.querySelectorAll('#plans .card');
  const viewPlansButton = document.querySelector('.button');

  if (!plansSection || planCards.length === 0 || !viewPlansButton) {
    return;
  }

  // Add a note to prove that JavaScript can create new content.
  const tutorialNote = document.createElement('p');
  tutorialNote.textContent = 'Tutorial example: JavaScript found ' + planCards.length + ' training plans.';
  tutorialNote.style.color = '#2f6a45';
  tutorialNote.style.fontWeight = 'bold';

  const plansHeading = plansSection.querySelector('h2');
  if (plansHeading) {
    plansHeading.insertAdjacentElement('afterend', tutorialNote);
  }

  // Smoothly scroll to the plans section when the hero button is clicked.
  viewPlansButton.addEventListener('click', function (event) {
    event.preventDefault();
    plansSection.scrollIntoView({ behavior: 'smooth' });
  });

  // Let students click a plan card to highlight it.
  planCards.forEach(function (card, index) {
    card.style.cursor = 'pointer';

    card.addEventListener('click', function () {
      const isActive = card.dataset.active === 'yes';

      planCards.forEach(function (otherCard) {
        otherCard.dataset.active = 'no';
        otherCard.style.outline = '';
      });

      if (!isActive) {
        card.dataset.active = 'yes';
        card.style.outline = '3px solid #44a169';
        tutorialNote.textContent = 'Tutorial example: Plan card ' + (index + 1) + ' is selected.';
      } else {
        tutorialNote.textContent = 'Tutorial example: JavaScript found ' + planCards.length + ' training plans.';
      }
    });
  });
})();