'use strict';

(function () {
  var RoomValueType = {
    1: [1],
    2: [1, 2],
    3: [1, 2, 3],
    100: [0]
  };
  var RoomPriceType = {
    BUNGALO: 0,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000
  };
  var typeInputElement = window.utils.formElement.querySelector('select[name="type"]');
  var titleInputElement = window.utils.formElement.querySelector('input[name="title"]');
  var priceInputElement = window.utils.formElement.querySelector('input[name="price"]');
  var timeInInputElement = window.utils.formElement.querySelector('select[name="timein"]');
  var timeOutInputElement = window.utils.formElement.querySelector('select[name="timeout"]');
  var roomsInputElement = window.utils.formElement.querySelector('select[name="rooms"]');
  var capacityInputElement = window.utils.formElement.querySelector('select[name="capacity"]');
  var capacityOptionElement = capacityInputElement.querySelectorAll('option');
  var formInputsElement = window.utils.formElement.querySelectorAll('input');
  var sendBtnElement = window.utils.formElement.querySelector('.ad-form__submit');
  var successTemplateElement = document.querySelector('#success').content.querySelector('.success');
  var successElement = successTemplateElement.cloneNode(true);

  var selectTypeChangeHandler = function () {
    priceInputElement.placeholder = RoomPriceType[typeInputElement.value.toUpperCase()];
    priceInputElement.min = RoomPriceType[typeInputElement.value.toUpperCase()];
  };

  var selectTimeChangeHandler = function (evt) {
    switch (evt.target) {
      case timeInInputElement:
        timeOutInputElement.value = timeInInputElement.value;
        break;
      case timeOutInputElement:
        timeInInputElement.value = timeOutInputElement.value;
        break;
    }
  };

  var selectRoomsChangeHandler = function () {
    capacityOptionElement.forEach(function (option) {
      option.disabled = true;
    });
    RoomValueType[roomsInputElement.value].forEach(function (option) {
      capacityOptionElement.forEach(function (op) {
        if (Number(op.value) === option) {
          op.disabled = false;
          capacityInputElement.value = op.value;
        }
      });
    });
  };

  typeInputElement.addEventListener('change', selectTypeChangeHandler);
  timeInInputElement.addEventListener('change', selectTimeChangeHandler);
  timeOutInputElement.addEventListener('change', selectTimeChangeHandler);
  roomsInputElement.addEventListener('change', selectRoomsChangeHandler);
  var checkInputValidityHandler = function () {
    formInputsElement.forEach(function (input) {
      if (!input.validity.valid) {
        input.style.border = '3px solid red';
      }
    });
  };

  var buttonKeydownHandler = function (evt) {
    if (evt.keyCode === window.const.ESC_KEYCODE) {
      evt.preventDefault();
      successElement.remove();
      window.removeEventListener('keydown', buttonKeydownHandler);
    }
  };

  var documentClickHandler = function (evt) {
    if (evt.target.classList.contains('success')) {
      evt.preventDefault();
      successElement.remove();
      window.removeEventListener('click', documentClickHandler);
    }
  };

  var successHandler = function () {
    window.utils.mainElement.appendChild(successElement);
    window.control.blockPage();
    document.addEventListener('click', documentClickHandler);
    window.addEventListener('keydown', buttonKeydownHandler);
  };

  sendBtnElement.addEventListener('click', checkInputValidityHandler);

  window.utils.formElement.addEventListener('submit', function (evt) {
    window.backend.upload(successHandler, window.control.errorHandler, new FormData(window.utils.formElement));
    evt.preventDefault();
  });

  priceInputElement.addEventListener('blur', function () {
    priceInputElement.style.border = null;
  });

  titleInputElement.addEventListener('blur', function () {
    titleInputElement.style.border = null;
  });

  var buttonClickHandler = function (evt) {
    evt.preventDefault();
    window.control.blockPage();
    window.removeEventListener('click', buttonClickHandler);
  };

  var resetButtonElement = document.querySelector('.ad-form__reset');
  resetButtonElement.addEventListener('click', buttonClickHandler);

})();
