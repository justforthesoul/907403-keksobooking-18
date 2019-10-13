'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var AVATAR_START_SRC = 'img/muffin-grey.svg';
  var LOAD_URL = 'https://js.dump.academy/keksobooking/data';
  var UPLOAD_URL = 'https://js.dump.academy/keksobooking';
  var SUCCES_CODE = 200;
  var DEBOUNCE_INTERVAL = 500;
  var MAX_PRICE = 50000;
  var MIN_PRICE = 10000;
  var MIN_LIMIT_X = 130;
  var MAX_LIMIT_X = 630;
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;
  var START_COORDS_X = 570;
  var START_COORDS_Y = 375;
  var PINS_LIMIT = 5;

  window.const = {
    FILE_TYPES: FILE_TYPES,
    AVATAR_START_SRC: AVATAR_START_SRC,
    LOAD_URL: LOAD_URL,
    UPLOAD_URL: UPLOAD_URL,
    SUCCES_CODE: SUCCES_CODE,
    DEBOUNCE_INTERVAL: DEBOUNCE_INTERVAL,
    MAX_PRICE: MAX_PRICE,
    MIN_PRICE: MIN_PRICE,
    MIN_LIMIT_X: MIN_LIMIT_X,
    MAX_LIMIT_X: MAX_LIMIT_X,
    ENTER_KEYCODE: ENTER_KEYCODE,
    START_COORDS_X: START_COORDS_X,
    START_COORDS_Y: START_COORDS_Y,
    ESC_KEYCODE: ESC_KEYCODE,
    PINS_LIMIT: PINS_LIMIT
  };
})();
