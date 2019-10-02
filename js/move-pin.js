'use strict';

(function () {
  window.utils.mainPin.addEventListener('mousedown', function (evt) {

    window.pagehandler.activationPageHandler();

    var minLimitX = 130;
    var maxLimitX = 630;

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
      var coordsMinX = minLimitX - window.utils.pinImg.offsetHeight;
      var coordsMaxX = maxLimitX - window.utils.pinImg.offsetHeight;
      var coordsMinY = -window.utils.pinImg.offsetWidth / 2;
      var coordsMaxY = window.utils.map.clientWidth - window.utils.pinImg.offsetWidth / 2;

      coordsX = coordsX < coordsMinY ? coordsMinY : coordsX;
      coordsX = coordsX > coordsMaxY ? coordsMaxY : coordsX;

      coordsY = coordsY < coordsMinX ? coordsMinX : coordsY;
      coordsY = coordsY > coordsMaxX ? coordsMaxX : coordsY;

      window.utils.mainPin.style.left = coordsX + 'px';
      window.utils.mainPin.style.top = coordsY + 'px';
      window.utils.setAdressCoordinates();
    };

    var mouseUpHandler = function () {
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  });
})();
