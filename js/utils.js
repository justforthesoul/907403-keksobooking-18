'use strict';

(function () {
  var pinImg = document.querySelector('.map__pin--main img');
  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  var address = document.querySelector('#address');
  var filter = document.querySelector('.map__filters');
  var setAdressCoordinates = function () {
    var pinCoordinates = (mainPin.offsetLeft + pinImg.offsetWidth / 2) + ', ' + (mainPin.offsetTop + pinImg.offsetHeight);
    address.setAttribute('value', pinCoordinates);
  };

  window.utils = {
    pinImg: pinImg,
    map: map,
    mainPin: mainPin,
    address: address,
    filter: filter,
    setAdressCoordinates: setAdressCoordinates
  };
})();
