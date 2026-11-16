/* Rajska vrata – predogled v1: mobilni meni in povečava fotografij v galeriji. Brez knjižnic. */
(function () {
  'use strict';
  var gumb = document.querySelector('.meni-gumb');
  var nav = document.querySelector('.navigacija');
  if (gumb && nav) {
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
  }

  var povezave = Array.prototype.slice.call(document.querySelectorAll('.galerija a'));
  var dlg = document.getElementById('lb');
  if (!povezave.length || !dlg || typeof dlg.showModal !== 'function') return;
  var slika = dlg.querySelector('img');
  var opis = dlg.querySelector('p');
  var i = 0;
  function pokazi(n) {
    i = (n + povezave.length) % povezave.length;
    var a = povezave[i];
    slika.src = a.getAttribute('href');
    slika.alt = a.querySelector('img').alt;
    opis.textContent = a.querySelector('img').alt;
  }
  povezave.forEach(function (a, n) {
    a.addEventListener('click', function (e) { e.preventDefault(); pokazi(n); dlg.showModal(); });
  });
  dlg.querySelector('.zapri').addEventListener('click', function () { dlg.close(); });
  dlg.querySelector('.prej').addEventListener('click', function () { pokazi(i - 1); });
  dlg.querySelector('.naprej').addEventListener('click', function () { pokazi(i + 1); });
  dlg.addEventListener('click', function (e) { if (e.target === dlg || e.target.classList.contains('lb-notr')) dlg.close(); });
  dlg.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') pokazi(i - 1);
    if (e.key === 'ArrowRight') pokazi(i + 1);
  });
})();
