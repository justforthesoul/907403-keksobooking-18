'use strict';

(function () {
  var mainElement = document.querySelector('main');
  var pinImgElement = document.querySelector('.map__pin--main img');
  var mapElement = document.querySelector('.map');
  var mainPinElement = mapElement.querySelector('.map__pin--main');
  var addressElement = document.querySelector('#address');
  var filterElement = document.querySelector('.map__filters');
  var formElement = document.querySelector('.ad-form');
  var pinRadius = window.const.MAIN_PIN_WIDTH / 2;

  var getXCoord = function () {
    return (mainPinElement.offsetLeft + pinRadius);
  };

  var getYCoord = function (height) {
    return (mainPinElement.offsetTop + height);
  };

  var setSratrAddressCoordinates = function () {
    var pinCoordinates = getXCoord() + ', ' + getYCoord(pinRadius);
    addressElement.value = pinCoordinates;
  };

  var setAddressCoordinates = function () {
    var pinCoordinates = getXCoord() + ', ' + getYCoord(window.const.MAIN_PIN_HEIGHT);
    addressElement.value = pinCoordinates;
  };

  window.utils = {
    mainElement: mainElement,
    pinImg: pinImgElement,
    map: mapElement,
    mainPin: mainPinElement,
    address: addressElement,
    filter: filterElement,
    setAddressCoordinates: setAddressCoordinates,
    setSratrAddressCoordinates: setSratrAddressCoordinates,
    formElement: formElement
  };
})();
