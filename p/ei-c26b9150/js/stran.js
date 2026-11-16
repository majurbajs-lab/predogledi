/* ENERGOINVEST – predogled v1: mobilni meni. Brez knjižnic. */
(function () {
  'use strict';
  var gumb = document.querySelector('.meni-gumb');
  var nav = document.querySelector('.navigacija');
  if (!gumb || !nav) return;
  gumb.addEventListener('click', function () {
    var odprt = gumb.getAttribute('aria-expanded') === 'true';
    gumb.setAttribute('aria-expanded', odprt ? 'false' : 'true');
    nav.classList.toggle('odprt', !odprt);
    var b = gumb.querySelector('.meni-besedilo');
    if (b) b.textContent = odprt ? gumb.getAttribute('data-odpri') : gumb.getAttribute('data-zapri');
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && gumb.getAttribute('aria-expanded') === 'true') { gumb.click(); gumb.focus(); }
  });
})();
