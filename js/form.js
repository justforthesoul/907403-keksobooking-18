'use strict';

(function () {
  var form = document.querySelector('.ad-form');
  var typeInput = form.querySelector('select[name="type"]');
  var titleInput = form.querySelector('input[name="title"]');
  var priceInput = form.querySelector('input[name="price"]');
  var timeInInput = form.querySelector('select[name="timein"]');
  var timeOutInput = form.querySelector('select[name="timeout"]');
  var roomsInput = form.querySelector('select[name="rooms"]');
  var capacityInput = form.querySelector('select[name="capacity"]');
  var capacityOption = capacityInput.querySelectorAll('option');
  var formInputs = form.querySelectorAll('input');
  var sendBtn = form.querySelector('.ad-form__submit');

  var checkPrice = function () {
    if (Number(priceInput.value) > 1000000) {
      priceInput.setCustomValidity('Максимальная цена не может превашать 1000000');
    } else if (Number(priceInput.value) < Number(priceInput.placeholder)) {
      priceInput.setCustomValidity('Минимальная цена для данного вида жилья не может быть меньше' + ' ' + priceInput.placeholder);
    } else {
      priceInput.setCustomValidity('');
    }
  };

  var RoomType = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  var checkTypeInput = function () {
    priceInput.placeholder = RoomType[typeInput.value];
  };

  var checkTimeInput = function (evt) {
    switch (evt.target) {
      case timeInInput:
        timeOutInput.value = timeInInput.value;
        break;
      case timeOutInput:
        timeInInput.value = timeOutInput.value;
        break;
    }
  };

  var RoomValue = {
    1: [1],
    2: [1, 2],
    3: [1, 2, 3],
    100: [0]
  };

  var checkRoomsOptions = function () {
    capacityOption.forEach(function (option) {
      option.disabled = true;
    });
    RoomValue[roomsInput.value].forEach(function (option) {
      capacityOption.forEach(function (op) {
        if (Number(op.value) === option) {
          op.disabled = false;
          capacityInput.value = op.value;
        }
      });
    });
  };

  typeInput.addEventListener('change', checkTypeInput);

  priceInput.addEventListener('input', checkPrice);

  timeInInput.addEventListener('change', function (evt) {
    checkTimeInput(evt);
  });

  timeOutInput.addEventListener('change', function (evt) {
    checkTimeInput(evt);
  });

  roomsInput.addEventListener('change', checkRoomsOptions);

  var checkValidity = function () {
    formInputs.forEach(function (input) {
      if (!input.validity.valid) {
        input.style.border = '3px solid red';
      }
    });
  };
  var successHandler = function () {
    var successTemplate = document.querySelector('#success').content.querySelector('.success');
    var successElem = successTemplate.cloneNode(true);
    document.querySelector('main').appendChild(successElem);
    window.pagehandler.blockPageHandler();

    document.addEventListener('click', function () {
      successElem.remove();
    });
    window.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.const.ESC_KEYCODE) {
        evt.preventDefault();
        successElem.remove();
      }
    });
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
      if (evt.keyCode === window.const.ESC_KEYCODE) {
        evt.preventDefault();
        errorElem.remove();
      }
    });
  };

  sendBtn.addEventListener('click', checkValidity);

  form.addEventListener('submit', function (evt) {
    window.backend.upload(new FormData(form), successHandler, errorHandler);
    evt.preventDefault();
  });

  priceInput.addEventListener('blur', function () {
    priceInput.style.border = null;
  });

  titleInput.addEventListener('blur', function () {
    titleInput.style.border = null;
  });

  var resetButton = document.querySelector('.ad-form__reset');
  resetButton.addEventListener('click', window.pagehandler.blockPageHandler);

})();
