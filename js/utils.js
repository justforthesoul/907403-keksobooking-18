'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var ESC__KEYCODE = 27;
  var pinImg = document.querySelector('.map__pin--main img');
  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  var address = document.querySelector('#address');
  var setAdressCoordinates = function () {
    var pinCoordinates = (mainPin.offsetLeft + pinImg.offsetWidth / 2) + ', ' + (mainPin.offsetTop + pinImg.offsetHeight);
    address.setAttribute('value', pinCoordinates);
  };

  window.utils = {
    ENTER_KEYCODE: ENTER_KEYCODE,
    ESC__KEYCODE: ESC__KEYCODE,
    pinImg: pinImg,
    map: map,
    mainPin: mainPin,
    address: address,
    setAdressCoordinates: setAdressCoordinates
  };
})();
