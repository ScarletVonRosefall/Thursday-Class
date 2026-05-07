/*
  PRODUCT LANDING PAGE SCRIPT

  Quick edit guide:
  1. The image preview code starts near the middle of this file.
  2. Change the note text if you want a different classroom example.
  3. Change the highlight color if you want the clicked card to look different.
*/

(function () {
  // Select the elements that JavaScript will control.
  const featureSection = document.getElementById('features');
  const featureCards = document.querySelectorAll('#features .card');
  const learnMoreButton = document.querySelector('.button');
  const productInput = document.getElementById('product-input');
  const productImage = document.getElementById('product-image');

  if (!featureSection || featureCards.length === 0 || !learnMoreButton || !productInput || !productImage) {
    return;
  }

  // Create a note to show that JavaScript can add new content.
  const tutorialNote = document.createElement('p');
  tutorialNote.textContent = 'Tutorial example: JavaScript found ' + featureCards.length + ' feature cards.';
  tutorialNote.style.color = '#3655b3';
  tutorialNote.style.fontWeight = 'bold';

  const featureHeading = featureSection.querySelector('h2');
  if (featureHeading) {
    featureHeading.insertAdjacentElement('afterend', tutorialNote);
  }

  // Make the button scroll smoothly to the feature section.
  learnMoreButton.addEventListener('click', function (event) {
    event.preventDefault();
    featureSection.scrollIntoView({ behavior: 'smooth' });
  });

  // Clicking a feature card highlights it.
  featureCards.forEach(function (card, index) {
    card.style.cursor = 'pointer';

    card.addEventListener('click', function () {
      const isActive = card.dataset.active === 'yes';

      featureCards.forEach(function (otherCard) {
        otherCard.dataset.active = 'no';
        otherCard.style.outline = '';
      });

      if (!isActive) {
        card.dataset.active = 'yes';
        card.style.outline = '3px solid #3f6df6';
        tutorialNote.textContent = 'Tutorial example: Feature card ' + (index + 1) + ' is active.';
      } else {
        tutorialNote.textContent = 'Tutorial example: JavaScript found ' + featureCards.length + ' feature cards.';
      }
    });
  });

  // This part previews an image from the computer without uploading it.
  productInput.addEventListener('change', function (event) {
    const selectedFile = event.target.files && event.target.files[0];

    if (!selectedFile) {
      return;
    }

    // Check the file type so only images are accepted.
    if (!selectedFile.type.startsWith('image/')) {
      alert('Please choose an image file.');
      return;
    }

    // Create a temporary local link so the image can be shown on the page.
    const imageUrl = URL.createObjectURL(selectedFile);
    productImage.src = imageUrl;

    // Clean up the temporary link after the image loads.
    productImage.onload = function () {
      URL.revokeObjectURL(imageUrl);
    };
  });
})();