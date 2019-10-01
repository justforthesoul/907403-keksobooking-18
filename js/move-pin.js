'use strict';

(function () {
  window.utils.mainPin.addEventListener('mousedown', function (evt) {

    window.pagehandler.activationPageHandler();

    var XMinLimit = 130;
    var XMaxLimit = 630;

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var MouseMoveHandler = function (moveEvt) {

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var coordsX = window.utils.mainPin.offsetLeft - shift.x;
      var coordsY = window.utils.mainPin.offsetTop - shift.y;
      var coordsXMin = XMinLimit - window.utils.pinImg.offsetHeight;
      var coordsXMax = XMaxLimit - window.utils.pinImg.offsetHeight;
      var coordsYMin = -window.utils.pinImg.offsetWidth / 2;
      var coordsYMax = window.utils.map.clientWidth - window.utils.pinImg.offsetWidth / 2;

      coordsX = coordsX < coordsYMin ? coordsYMin : coordsX;
      coordsX = coordsX > coordsYMax ? coordsYMax : coordsX;

      coordsY = coordsY < coordsXMin ? coordsXMin : coordsY;
      coordsY = coordsY > coordsXMax ? coordsXMax : coordsY;

      window.utils.mainPin.style.left = coordsX + 'px';
      window.utils.mainPin.style.top = coordsY + 'px';
      window.utils.setAdressCoordinates();
    };

    var MouseUpHandler = function () {
      document.removeEventListener('mousemove', MouseMoveHandler);
      document.removeEventListener('mouseup', MouseUpHandler);
    };

    document.addEventListener('mousemove', MouseMoveHandler);
    document.addEventListener('mouseup', MouseUpHandler);
  });
})();
