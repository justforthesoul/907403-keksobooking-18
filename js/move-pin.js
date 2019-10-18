'use strict';

(function () {
  window.utils.mainPin.addEventListener('mousedown', function (evt) {
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var mouseMoveHandler = function (moveEvt) {
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
      var coordsMinY = window.const.MIN_LIMIT_X - window.const.MAIN_PIN_HEIGHT;
      var coordsMaxY = window.const.MAX_LIMIT_X - window.const.MAIN_PIN_HEIGHT;
      var coordsMinX = -window.utils.pinImg.offsetWidth / 2;
      var coordsMaxX = window.utils.map.clientWidth - window.utils.pinImg.offsetWidth / 2;

      if (coordsX < coordsMinX) {
        coordsX = coordsMinX;
      } else if (coordsX > coordsMaxX) {
        coordsX = coordsMaxX;
      }

      if (coordsY < coordsMinY) {
        coordsY = coordsMinY;
      } else if (coordsY > coordsMaxY) {
        coordsY = coordsMaxY;
      }

      window.utils.mainPin.style.left = coordsX + 'px';
      window.utils.mainPin.style.top = coordsY + 'px';
      window.utils.setAddressCoordinates();
    };

    var mouseUpHandler = function () {
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  });
})();
