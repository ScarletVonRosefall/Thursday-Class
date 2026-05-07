/*
  PORTFOLIO PAGE SCRIPT

  Quick edit guide:
  1. Change the note text below if you want a different tutorial message.
  2. Change the color code in the outline style if you want a new highlight color.
  3. Remove any section you do not want students to study yet.
*/

(function () {
  // Grab the button, the project section, and all project cards.
  const projectButton = document.querySelector('.button');
  const projectsSection = document.getElementById('projects');
  const projectCards = document.querySelectorAll('#projects .card');

  // Stop the script early if the HTML is changed and these elements are missing.
  if (!projectButton || !projectsSection || projectCards.length === 0) {
    return;
  }

  // Create a note with JavaScript so students can see that JS can build elements.
  const tutorialNote = document.createElement('p');
  tutorialNote.textContent = 'Tutorial example: JavaScript counted ' + projectCards.length + ' project cards on this page.';
  tutorialNote.style.color = '#4b5563';
  tutorialNote.style.fontWeight = 'bold';

  const projectsHeading = projectsSection.querySelector('h2');
  if (projectsHeading) {
    projectsHeading.insertAdjacentElement('afterend', tutorialNote);
  }

  // Make the hero button scroll smoothly instead of jumping instantly.
  projectButton.addEventListener('click', function (event) {
    event.preventDefault();
    projectsSection.scrollIntoView({ behavior: 'smooth' });
  });

  // Let students click a project card to highlight it.
  projectCards.forEach(function (card, index) {
    card.style.cursor = 'pointer';

    card.addEventListener('click', function () {
      const cardIsSelected = card.dataset.selected === 'yes';

      // Clear the style from every card first.
      projectCards.forEach(function (otherCard) {
        otherCard.dataset.selected = 'no';
        otherCard.style.outline = '';
      });

      // If the clicked card was not active, highlight it now.
      if (!cardIsSelected) {
        card.dataset.selected = 'yes';
        card.style.outline = '3px solid #5b7cfa';
        tutorialNote.textContent = 'Tutorial example: You clicked project card ' + (index + 1) + '.';
      } else {
        tutorialNote.textContent = 'Tutorial example: JavaScript counted ' + projectCards.length + ' project cards on this page.';
      }
    });
  });
})();