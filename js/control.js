'use strict';

(function () {
  var formFieldsetElement = document.querySelectorAll('.notice form fieldset');
  var sectionFormElement = document.querySelector('.notice form');
  var errorTemplateElement = document.querySelector('#error').content.querySelector('.error');
  var errorElemElement = errorTemplateElement.cloneNode(true);

  var activateFormFildset = function () {
    formFieldsetElement.forEach(function (field) {
      field.disabled = false;
    });
  };

  var blockFormFieldset = function () {
    formFieldsetElement.forEach(function (field) {
      field.disabled = true;
    });
  };

  blockFormFieldset();

  var clearMap = function () {
    var pinsBtnElement = document.querySelectorAll('button[type="button"]');
    var cardElement = document.querySelector('.map__card');
    if (cardElement) {
      cardElement.remove();
    }
    pinsBtnElement.forEach(function (btn) {
      btn.remove();
    });
  };

  var removeAdressCoordinates = function () {
    window.utils.mainPin.style.left = window.const.START_COORDS_X + 'px';
    window.utils.mainPin.style.top = window.const.START_COORDS_Y + 'px';
    window.utils.setAdressCoordinates();
  };

  var blockPage = function () {
    window.utils.map.classList.add('map--faded');
    sectionFormElement.classList.add('ad-form--disabled');
    clearMap();
    removeAdressCoordinates();
    blockFormFieldset();
    window.filter.block();
    window.loadPhooto.clearImg();
    window.utils.formElement.reset();
    window.utils.filter.reset();
    window.utils.setSratrAdressCoordinates();
    window.utils.mainPin.addEventListener('mousedown', pinMousedownHandler);
  };

  var successHandler = function (adverts) {
    window.adverts = adverts;
    window.map.renderPins(window.filter.getData(adverts));
    window.filter.unBlock();
  };

  var closeErrorMassage = function () {
    errorElemElement.remove();
    blockPage();
  };

  var buttonKeydownHandler = function (evt) {
    if (evt.keyCode === window.const.ESC_KEYCODE) {
      evt.preventDefault();
      closeErrorMassage();
      window.removeEventListener('keydown', buttonKeydownHandler);
    }
  };

  var buttonClickHandler = function (evt) {
    evt.preventDefault();
    closeErrorMassage();
    window.removeEventListener('click', buttonClickHandler);
  };

  var documentClickHandler = function (evt) {
    if (evt.target.classList.contains('error')) {
      evt.preventDefault();
      closeErrorMassage();
      window.removeEventListener('click', documentClickHandler);
    }
  };

  var errorHandler = function (errorMessage) {
    errorElemElement.querySelector('.error__message').textContent = errorMessage;
    window.utils.mainElement.appendChild(errorElemElement);
    document.querySelector('.error__button').addEventListener('click', buttonClickHandler);
    window.addEventListener('click', documentClickHandler);
    window.addEventListener('keydown', buttonKeydownHandler);
  };

  var activatePage = function () {
    window.backend.load(successHandler, errorHandler);
    window.utils.map.classList.remove('map--faded');
    sectionFormElement.classList.remove('ad-form--disabled');
    window.utils.setAdressCoordinates();
    activateFormFildset();
  };

  var pinMousedownHandler = function (evt) {
    evt.preventDefault();
    activatePage();
    window.utils.mainPin.removeEventListener('mousedown', pinMousedownHandler);
  };

  var pinKeydownHandler = function (evt) {
    if (evt.keyCode === window.const.ENTER_KEYCODE) {
      evt.preventDefault();
      activatePage();
      window.utils.mainPin.removeEventListener('keydown', pinKeydownHandler);
    }
  };

  window.utils.mainPin.addEventListener('keydown', pinKeydownHandler);

  window.utils.mainPin.addEventListener('mousedown', pinMousedownHandler);

  window.control = {
    blockPage: blockPage,
    clearMap: clearMap,
    errorHandler: errorHandler
  };
})();
