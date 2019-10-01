'use strict';

(function () {
  var mapPins = window.utils.map.querySelector('.map__pins');
  var formFieldset = document.querySelectorAll('.notice form fieldset');
  var sectionForm = document.querySelector('.notice form');

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
    window.utils.setAdressCoordinates();
    activateFormFildset();
  };

  window.utils.mainPin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.utils.ENTER_KEYCODE) {
      evt.preventDefault();
      activationPageHandler();
    }
  });

  window.utils.mainPin.addEventListener('click', function () {
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
    window.utils.address.setAttribute('value', null);
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

  window.pagehandler = {
    activationPageHandler: activationPageHandler
  };
})();
