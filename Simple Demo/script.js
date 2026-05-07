// Wait until the HTML is loaded before accessing elements
document.addEventListener('DOMContentLoaded', () => {
  // Simple helpers: $ for one node, $$ for many
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  /* ======= Greeting example =======
     Demonstrates: selecting an element, adding a click handler, and
     updating text inside the page. */
  const hiBtn = $('#say-hi');
  const greetBox = $('#greeting');
  if (hiBtn) {
    hiBtn.addEventListener('click', () => {
      // Template strings are an easy way to build strings with variables
      const name = 'Learner';
      greetBox.textContent = `Hello, ${name}! Welcome to JavaScript.`;
    });
  }

  /* ======= localStorage example =======
     Demonstrates: reading and writing simple persistent data in the browser.
     localStorage stores strings. Use JSON.stringify/parse for objects. */
  const saveBtn = $('#save-persist');
  const loadBtn = $('#load-persist');
  const persistInput = $('#persist-input');
  const persistResult = $('#persist-result');

  if (saveBtn && persistInput) {
    saveBtn.addEventListener('click', () => {
      const value = persistInput.value;
      localStorage.setItem('simple-demo-saved', value);
      persistResult.textContent = 'Saved to localStorage.';
    });
  }

  if (loadBtn) {
    loadBtn.addEventListener('click', () => {
      const v = localStorage.getItem('simple-demo-saved');
      persistResult.textContent = v === null ? '(no value saved yet)' : v;
    });
  }

  /* ======= Simple TODO list =======
     Demonstrates: handling form submit, creating DOM nodes, and event
     delegation for removing items. */
  const todoForm = $('#todo-form');
  const todoInput = $('#todo-input');
  const todoList = $('#todo-list');

  if (todoForm && todoList) {
    todoForm.addEventListener('submit', (e) => {
      e.preventDefault(); // stop page reload
      const text = (todoInput.value || '').trim();
      if (!text) return; // ignore empty
      const li = document.createElement('li');
      li.textContent = text;
      // add a small Done button on the right
      const done = document.createElement('button');
      done.textContent = 'Done';
      li.appendChild(done);
      todoList.appendChild(li);
      todoInput.value = '';
    });

    // Event delegation: put one listener on the list instead of each button
    todoList.addEventListener('click', (e) => {
      if (e.target.tagName === 'BUTTON') {
        const item = e.target.closest('li');
        if (item) item.remove();
      }
    });
  }

  /* ======= Modal show/hide =======
     Demonstrates: toggling attributes, simple focus/keyboard handling.
     We use `aria-hidden` to reflect visibility for accessibility. */
  const modal = $('#modal');
  const openModal = $('#open-modal');
  if (openModal && modal) {
    openModal.addEventListener('click', () => {
      modal.setAttribute('aria-hidden', 'false');
    });
    const close = modal.querySelector('.close');
    if (close) close.addEventListener('click', () => modal.setAttribute('aria-hidden', 'true'));
    // close with Escape key
    document.addEventListener('keydown', (ev) => {
      if (ev.key === 'Escape') modal.setAttribute('aria-hidden', 'true');
    });
  }

  /* ======= Fetch / async example =======
     Demonstrates a simple network request using fetch and async/await.
     Note: network may fail when offline; we show a friendly message. */
  const fetchBtn = $('#fetch-zen');
  const fetchOut = $('#fetch-result');
  if (fetchBtn && fetchOut) {
    fetchBtn.addEventListener('click', async () => {
      fetchOut.textContent = 'Loading...';
      try {
        const resp = await fetch('https://api.github.com/zen');
        if (!resp.ok) throw new Error('Network response not ok');
        const text = await resp.text();
        fetchOut.textContent = text;
      } catch (err) {
        fetchOut.textContent = 'Fetch failed: ' + err.message;
      }
    });
  }

  /* ======= Canvas example =======
     Demonstrates 2D drawing basics. You can clear and re-draw here. */
  const canvas = $('#canvas');
  if (canvas && canvas.getContext) {
    const ctx = canvas.getContext('2d');
    // clear
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // rectangle with gradient
    const grad = ctx.createLinearGradient(0, 0, canvas.width, 0);
    grad.addColorStop(0, '#2b6cb0');
    grad.addColorStop(1, '#9ae6b4');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // text
    ctx.font = '16px sans-serif';
    ctx.fillStyle = '#fff';
    ctx.fillText('Canvas demo — try changing this text', 10, 50);
  }

  /* ======= Small examples printed to the console ======= */
  console.log('Simple demo initialized — open the HTML and script to experiment');
});
