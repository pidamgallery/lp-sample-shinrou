'use strict';
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'メニューを開く');
  navigation.classList.remove('is-open');
}
menuButton.addEventListener('click', () => {
  const opening = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(opening));
  menuButton.setAttribute('aria-label', opening ? 'メニューを閉じる' : 'メニューを開く');
  navigation.classList.toggle('is-open', opening);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuButton.focus();
  }
});
window.matchMedia('(min-width: 761px)').addEventListener('change', closeMenu);
const dialog = document.querySelector('#contact-dialog');
const form = document.querySelector('#contact-form');
const status = form.querySelector('.form-status');
document.querySelector('#open-contact').addEventListener('click', () => {
  dialog.showModal();
  document.body.classList.add('modal-open');
});
dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  const bounds = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
});
dialog.addEventListener('close', () => {
  document.body.classList.remove('modal-open');
  form.reset();
  status.textContent = '';
});
form.addEventListener('submit', event => {
  event.preventDefault();
  status.textContent = '入力内容を確認しました。これは制作サンプルのため、送信は行われていません。内容はフォームを閉じると消去されます。';
  status.focus();
});
