/*
  script.js
  This file contains many commented examples of JavaScript usage.
  It demonstrates:
  - Variables, types, operators
  - Functions, arrays, objects
  - DOM selection and manipulation
  - Events and event delegation
  - Fetch / async-await
  - localStorage
  - Simple canvas drawing
*/

// Wait for DOM to be loaded before accessing elements
document.addEventListener('DOMContentLoaded', () => {
  // --- Basic DOM helpers ---
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => Array.from(root.querySelectorAll(s));

  // Greeting button example (shows event handling and text updates)
  const hiBtn = $('#say-hi');
  const greet = $('#greeting');
  hiBtn.addEventListener('click', () => {
    // Variables, template strings
    const name = 'Learner';
    greet.textContent = `Hello, ${name}! Welcome to JavaScript.`;
  });

  // --- localStorage example ---
  $('#save-persist').addEventListener('click', () => {
    const val = $('#persist-input').value;
    // Save to localStorage (simple persistent storage in browser)
    localStorage.setItem('simple-demo-saved', val);
    $('#persist-result').textContent = 'Saved!';
  });
  $('#load-persist').addEventListener('click', () => {
    const v = localStorage.getItem('simple-demo-saved');
    $('#persist-result').textContent = v === null ? '(no value found)' : v;
  });

  // --- Simple TODO list: create elements and use event delegation ---
  const todoForm = $('#todo-form');
  const todoInput = $('#todo-input');
  const todoList = $('#todo-list');

  todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = todoInput.value.trim();
    if (!text) return;
    const li = document.createElement('li');
    li.textContent = text;
    // Add a remove button for the item
    const btn = document.createElement('button');
    btn.textContent = 'Done';
    btn.style.marginLeft = '8px';
    li.appendChild(btn);
    todoList.appendChild(li);
    todoInput.value = '';
  });

  // Event delegation: handle clicks on the list to remove items
  todoList.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
      const li = e.target.closest('li');
      li.remove();
    }
  });

  // --- Modal demo: show/hide + keyboard handling ---
  const modal = $('#modal');
  const openModal = $('#open-modal');
  openModal.addEventListener('click', () => {
    modal.setAttribute('aria-hidden', 'false');
  });
  modal.querySelector('.close').addEventListener('click', () => {
    modal.setAttribute('aria-hidden', 'true');
  });
  // Close modal with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') modal.setAttribute('aria-hidden', 'true');
  });

  // --- Fetch / async example ---
  $('#fetch-zen').addEventListener('click', async () => {
    const out = $('#fetch-result');
    out.textContent = 'Loading...';
    try {
      // Fetch a simple endpoint. This is cross-origin but public.
      const r = await fetch('https://api.github.com/zen');
      if (!r.ok) throw new Error('Network response was not ok');
      const txt = await r.text();
      out.textContent = txt;
    } catch (err) {
      out.textContent = 'Fetch failed: ' + err.message;
    }
  });

  // --- Canvas drawing example ---
  const canvas = $('#canvas');
  if (canvas && canvas.getContext) {
    const ctx = canvas.getContext('2d');
    // Draw a gradient rectangle
    const g = ctx.createLinearGradient(0, 0, canvas.width, 0);
    g.addColorStop(0, '#2b6cb0');
    g.addColorStop(1, '#9ae6b4');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // Draw some text on top
    ctx.font = '20px sans-serif';
    ctx.fillStyle = '#fff';
    ctx.fillText('Canvas demo — draw shapes, text, images', 10, 50);
  }

  // --- Simple examples of JS data structures and loops (printed to console) ---
  const numbers = [1,2,3,4];
  // map/filter reduce examples
  console.log('numbers -> doubled', numbers.map(n => n*2));

  const user = {name:'Student', role:'learner'}; // object
  console.log('user object:', user);

});
