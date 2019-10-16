'use strict';

(function () {
  var mainElement = document.querySelector('main');
  var pinImgElement = document.querySelector('.map__pin--main img');
  var mapElement = document.querySelector('.map');
  var mainPinElement = mapElement.querySelector('.map__pin--main');
  var addressElement = document.querySelector('#address');
  var filterElement = document.querySelector('.map__filters');
  var formElement = document.querySelector('.ad-form');

  var setSratrAdressCoordinates = function () {
    var pinCoordinates = (mainPinElement.offsetLeft + pinImgElement.offsetWidth / 2) + ', ' + (mainPinElement.offsetTop + pinImgElement.offsetHeight / 2);
    addressElement.value = pinCoordinates;
  };

  setSratrAdressCoordinates();


  var setAdressCoordinates = function () {
    var pinCoordinates = (mainPinElement.offsetLeft + window.const.MAIN_PIN_WIDTH / 2) + ', ' + (mainPinElement.offsetTop + window.const.MAIN_PIN_HEIGHT);
    addressElement.value = pinCoordinates;
  };

  window.utils = {
    mainElement: mainElement,
    pinImg: pinImgElement,
    map: mapElement,
    mainPin: mainPinElement,
    address: addressElement,
    filter: filterElement,
    setAdressCoordinates: setAdressCoordinates,
    setSratrAdressCoordinates: setSratrAdressCoordinates,
    formElement: formElement
  };
})();
