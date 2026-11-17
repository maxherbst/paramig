'use strict';

// Product dropdowns keep normal links and work with a mouse, touch and keyboard.
const buyToggles = [...document.querySelectorAll('.buy-toggle')];
function closeBuyMenus(except) {
  buyToggles.forEach((button) => {
    if (button === except) return;
    button.setAttribute('aria-expanded', 'false');
    document.getElementById(button.getAttribute('aria-controls')).hidden = true;
  });
}
buyToggles.forEach((button) => {
  button.addEventListener('click', () => {
    const open = button.getAttribute('aria-expanded') !== 'true';
    closeBuyMenus(button);
    button.setAttribute('aria-expanded', String(open));
    document.getElementById(button.getAttribute('aria-controls')).hidden = !open;
  });
});
document.addEventListener('click', (event) => {
  if (!event.target.closest('.buy-menu')) closeBuyMenus();
});
document.addEventListener('focusin', (event) => {
  const menu = event.target.closest('.buy-menu');
  closeBuyMenus(menu?.querySelector('.buy-toggle'));
});

// Responsive navigation; anchors use the browser's native hash navigation.
const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.getElementById('main-navigation');
function closeNavigation() {
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Otwórz menu');
  navigation.classList.remove('is-open');
  closeBuyMenus();
}
menuToggle.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') !== 'true';
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Zamknij menu' : 'Otwórz menu');
  navigation.classList.toggle('is-open', open);
  if (!open) closeBuyMenus();
});
navigation.querySelectorAll('.menu a').forEach((link) => {
  link.addEventListener('click', () => {
    const mobileOpen = navigation.classList.contains('is-open');
    closeNavigation();
    if (mobileOpen) {
      const destination = document.querySelector(link.hash);
      destination.setAttribute('tabindex', '-1');
      destination.focus({ preventScroll: true });
    }
  });
});
document.addEventListener('click', (event) => {
  if (navigation.classList.contains('is-open') && !event.target.closest('.site-header')) closeNavigation();
});
window.matchMedia('(min-width: 1024px)').addEventListener('change', closeNavigation);
document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;
  const openBuy = buyToggles.find((button) => button.getAttribute('aria-expanded') === 'true');
  if (openBuy) {
    closeBuyMenus();
    openBuy.focus();
  } else if (navigation.classList.contains('is-open')) {
    closeNavigation();
    menuToggle.focus();
  }
});

// Accessible FAQ tabs with arrow/Home/End keys and a separate accordion per tab.
const faqTabs = [...document.querySelectorAll('[role="tab"]')];
function selectFaqTab(selected, focus = false) {
  faqTabs.forEach((tab) => {
    const active = tab === selected;
    tab.setAttribute('aria-selected', String(active));
    tab.tabIndex = active ? 0 : -1;
    document.getElementById(tab.getAttribute('aria-controls')).hidden = !active;
  });
  if (focus) selected.focus();
}
faqTabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectFaqTab(tab));
  tab.addEventListener('keydown', (event) => {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % faqTabs.length;
    if (event.key === 'ArrowLeft') next = (index + faqTabs.length - 1) % faqTabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = faqTabs.length - 1;
    if (next === undefined) return;
    event.preventDefault();
    selectFaqTab(faqTabs[next], true);
  });
});
document.querySelectorAll('.faq-question').forEach((button) => {
  button.addEventListener('click', () => {
    const open = button.getAttribute('aria-expanded') !== 'true';
    button.closest('.faq-panel').querySelectorAll('.faq-question').forEach((other) => {
      other.setAttribute('aria-expanded', 'false');
      document.getElementById(other.getAttribute('aria-controls')).hidden = true;
    });
    button.setAttribute('aria-expanded', String(open));
    document.getElementById(button.getAttribute('aria-controls')).hidden = !open;
  });
});

// Preserve the existing medicine notice without hiding the end of the page.
const notice = document.querySelector('.medicine-notice');
function updateNoticeSpace() {
  const height = `${Math.ceil(notice.getBoundingClientRect().height)}px`;
  document.documentElement.style.setProperty('--notice-height', height);
  document.documentElement.style.scrollPaddingBottom = height;
}
new ResizeObserver(updateNoticeSpace).observe(notice);
updateNoticeSpace();
