'use strict';

(function () {
  var formFieldset = document.querySelectorAll('.notice form fieldset');
  var sectionForm = document.querySelector('.notice form');

  var activateFormFildset = function () {
    formFieldset.forEach(function (field) {
      field.disabled = false;
    });
  };

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
    window.utils.mainPin.style.left = window.utils.START_COORDS_X + 'px';
    window.utils.mainPin.style.top = window.utils.START_COORDS_Y + 'px';
    window.utils.setAdressCoordinates();
  };

  var blockPageHandler = function () {
    window.utils.map.classList.add('map--faded');
    sectionForm.classList.add('ad-form--disabled');
    clearMap();
    removeAdressCoordinates();
    blockFormFieldset();
    document.querySelector('.ad-form').reset();
    window.filter.filter.reset();
    window.utils.mainPin.addEventListener('click', activationPageHandler);
  };

  var successHandler = function (adverts) {
    window.adverts = adverts;
  };

  var errorHandler = function (errorMessage) {
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorElem = errorTemplate.cloneNode(true);
    errorElem.querySelector('.error__message').textContent = errorMessage;
    document.querySelector('main').appendChild(errorElem);
    errorElem.querySelector('.error__button').addEventListener('click', function () {
      errorElem.remove();
    });
    window.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.utils.ESC_KEYCODE) {
        evt.preventDefault();
        errorElem.remove();
        blockPageHandler();
      }
    });
  };

  var activationPageHandler = function () {
    window.utils.map.classList.remove('map--faded');
    sectionForm.classList.remove('ad-form--disabled');
    window.utils.setAdressCoordinates();
    activateFormFildset();
    window.map.renderPins(window.adverts.slice(0, window.utils.PINS_LIMIT));
    window.utils.mainPin.removeEventListener('click', activationPageHandler);
  };

  window.utils.mainPin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.utils.ENTER_KEYCODE) {
      evt.preventDefault();
      activationPageHandler();
    }
  });

  window.backend.load(successHandler, errorHandler);
  window.utils.mainPin.addEventListener('click', activationPageHandler);

  window.pagehandler = {
    activationPageHandler: activationPageHandler,
    blockPageHandler: blockPageHandler,
    clearMap: clearMap,
    errorHandler: errorHandler
  };
})();
