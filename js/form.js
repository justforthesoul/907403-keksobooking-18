'use strict';

(function () {
  var form = document.querySelector('.ad-form');
  var typeInput = form.querySelector('select[name="type"]');
  var priceInput = form.querySelector('input[name="price"]');
  var timeInInput = form.querySelector('select[name="timein"]');
  var timeOutInput = form.querySelector('select[name="timeout"]');
  var roomsInput = form.querySelector('select[name="rooms"]');
  var capacityInput = form.querySelector('select[name="capacity"]');
  var capacityOption = capacityInput.querySelectorAll('option');

  var checkPrice = function () {
    if (Number(priceInput.value) > 1000000) {
      priceInput.setCustomValidity('Максимальная цена не может превашать 1000000');
    } else if (Number(priceInput.value) < Number(priceInput.placeholder)) {
      priceInput.setCustomValidity('Минимальная цена для данного вида жилья не может быть меньше' + ' ' + priceInput.placeholder);
    } else {
      priceInput.setCustomValidity('');
    }
  };

  var typeRooms = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  var checkTypeInput = function () {
    priceInput.placeholder = typeRooms[typeInput.value];
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

  var roomsValues = {
    1: [1],
    2: [1, 2],
    3: [1, 2, 3],
    100: [0]
  };

  var checkRoomsOptions = function () {
    capacityOption.forEach(function (option) {
      option.disabled = true;
    });
    roomsValues[roomsInput.value].forEach(function (option) {
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
})();
