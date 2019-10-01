'use strict';

(function () {
  var address = document.querySelector('#address');
  var mapPins = window.utils.map.querySelector('.map__pins');
  var mainPin = window.utils.map.querySelector('.map__pin--main');
  var formFieldset = document.querySelectorAll('.notice form fieldset');
  var sectionForm = document.querySelector('.notice form');

  var setAdressCoordinates = function () {
    var pinCoordinates = (mainPin.offsetLeft + window.utils.pinImg.offsetWidth / 2) + ', ' + (mainPin.offsetTop + window.utils.pinImg.offsetHeight);
    address.setAttribute('value', pinCoordinates);
  };

  var activateFormFildset = function () {
    formFieldset.forEach(function (field) {
      field.disabled = false;
    });
  };

  var fragmentPin = document.createDocumentFragment();

  var createPins = function (fragment, arr) {
    arr.forEach(function (el) {
      fragment.appendChild(window.map.createPinElem(el));
    });
  };

  var renderPins = function () {
    var pinBtn = document.querySelector('button[type="button"]');
    if (!pinBtn) {
      createPins(fragmentPin, window.data.newMockArray);
      mapPins.appendChild(fragmentPin);
    }
  };

  var activationPageHandler = function () {
    window.utils.map.classList.remove('map--faded');
    sectionForm.classList.remove('ad-form--disabled');
    renderPins();
    setAdressCoordinates();
    activateFormFildset();
  };

  mainPin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.utils.ENTER_KEYCODE) {
      evt.preventDefault();
      activationPageHandler();
    }
  });

  mainPin.addEventListener('click', function () {
    activationPageHandler();
  });

  var blockFormFieldset = function () {
    formFieldset.forEach(function (field) {
      field.disabled = true;
    });
  };

  blockFormFieldset();

  var clearMap = function () {
    var pinsBtn = document.querySelectorAll('button[type="button"]');
    var card = document.querySelector('.map__card');
    if (card) {
      card.remove();
    }
    pinsBtn.forEach(function (btn) {
      btn.remove();
    });
  };

  var removeAdressCoordinates = function () {
    address.setAttribute('value', null);
  };

  var blockPageHandler = function () {
    window.utils.map.classList.add('map--faded');
    sectionForm.classList.add('ad-form--disabled');
    clearMap();
    removeAdressCoordinates();
    blockFormFieldset();
  };

  var resetButton = document.querySelector('.ad-form__reset');
  resetButton.addEventListener('click', blockPageHandler);
})();
