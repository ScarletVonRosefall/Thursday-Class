/* ============================================================
   🧩 CUSTOMIZE YOUR INFO HERE
   Change the values between the quotes to make it YOUR website!
   ============================================================ */

// --- YOUR PERSONAL INFO ---
const myName      = "Your Name Here";                // 📛 Your full name
const myTagline   = "Student · Dreamer · Future Developer"; // 🏷️ A short description about you
const myAbout     = `Hello! My name is <strong>Your Name</strong> and I am a student who loves
  learning new things. I enjoy spending time with friends, exploring the internet, and discovering
  what technology can do. This is my very first personal website — and I made it myself! 🎉`;

// --- FUN FACTS ---
const myAge       = "?? years old";               // 🎂 How old are you?
const myLocation  = "Your City, Philippines";     // 📍 Where are you from?
const mySchool    = "Your School Name";           // 🏫 What school do you go to?
const myDream     = "To become awesome!";         // 🌟 What is your dream?
const mySong      = "Your Favorite Song";         // 🎵 What's your favorite song?

// --- FAVORITE QUOTE ---
const myQuote     = '"The secret of getting ahead is getting started."'; // 💬 Your fave quote
const quoteAuthor = "— Mark Twain";                                      // ✍️ Who said it?

// --- FOOTER ---
const footerName  = "Your Name";  // 🦶 Your name in the footer

/* ============================================================
   🎨 CHANGE YOUR THEME COLORS
   Try different hex color codes! Some ideas:
     Red:    "#e63946"   Blue:   "#457b9d"
     Green:  "#2a9d8f"   Purple: "#7b2d8b"
     Orange: "#f4a261"   Pink:   "#e76f9a"
   ============================================================ */
const themeAccentColor = "#e07a5f";   // 🎨 Buttons, highlights, accents
const themeDarkColor   = "#3d405b";   // 🌑 Text color and nav background
const themeBgColor     = "#fdf6ec";   // 🌅 Page background color


/* ============================================================
   ⚙️ ENGINE BELOW — Applies all your customizations.
   You don't need to change anything below this line!
   But feel free to read it and try to understand how it works 😊
   ============================================================ */

// Apply colors to CSS variables
document.documentElement.style.setProperty('--primary-color',   themeAccentColor);
document.documentElement.style.setProperty('--secondary-color', themeDarkColor);
document.documentElement.style.setProperty('--bg-color',        themeBgColor);

// Fill in personal info on the page
document.getElementById('hero-name').textContent     = myName;
document.getElementById('hero-tagline').textContent  = myTagline;
document.getElementById('about-text').innerHTML      = myAbout;
document.getElementById('fact-age').textContent      = myAge;
document.getElementById('fact-location').textContent = myLocation;
document.getElementById('fact-school').textContent   = mySchool;
document.getElementById('fact-dream').textContent    = myDream;
document.getElementById('fact-song').textContent     = mySong;
document.getElementById('fav-quote').textContent     = myQuote;
document.getElementById('quote-author').textContent  = quoteAuthor;
document.getElementById('footer-name').textContent   = footerName;

// ---- Smooth scroll when clicking a nav link or button ----
function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

// ---- Skill bar animation (fills when you scroll to that section) ----
function animateSkillBars() {
  document.querySelectorAll('.skill-bar-fill').forEach(bar => {
    const level = bar.getAttribute('data-level');
    bar.style.width = level + '%';
  });
}

// ---- Fade-in sections as you scroll down the page ----
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Trigger skill bars when the skills section appears
      if (entry.target.querySelector && entry.target.querySelector('.skill-bar-fill')) {
        setTimeout(animateSkillBars, 200);
      }
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// ---- Hobby card: click to randomly change its emoji ----
document.querySelectorAll('.hobby-card').forEach(card => {
  card.addEventListener('click', () => {
    const emojis = ['🎮','🎵','📚','🍕','🎨','⚽','🌸','🎤','✈️','🐶','🎭','📸','🧩','🏄','🍦','💃'];
    const iconEl = card.querySelector('.hobby-icon');
    const current = iconEl.textContent;
    let next;
    do { next = emojis[Math.floor(Math.random() * emojis.length)]; } while (next === current);
    iconEl.textContent = next;
  });
});

// ---- Dark / Light mode toggle: Press the "D" key on your keyboard! ----
let darkMode = false;
document.addEventListener('keydown', e => {
  if (e.key === 'd' || e.key === 'D') {
    darkMode = !darkMode;
    document.documentElement.style.setProperty('--bg-color',         darkMode ? '#1a1a2e' : themeBgColor);
    document.documentElement.style.setProperty('--card-color',       darkMode ? '#16213e' : '#ffffff');
    document.documentElement.style.setProperty('--secondary-color',  darkMode ? '#e0e0e0' : themeDarkColor);
  }
});
