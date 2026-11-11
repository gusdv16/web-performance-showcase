/* Simula un script de terceros pesado, cargado de forma síncrona en el <head> (bloquea el parseo del HTML). */
(function () {
  var t = Date.now();
  var x = 0;
  while (Date.now() - t < 400) { x += Math.sqrt(x + 1); }
  window.__trabajoSimulado = x;
})();
