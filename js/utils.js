'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var ESC__KEYCODE = 27;
  var pinImg = document.querySelector('.map__pin--main img');
  var map = document.querySelector('.map');

  window.utils = {
    ENTER_KEYCODE: ENTER_KEYCODE,
    ESC__KEYCODE: ESC__KEYCODE,
    pinImg: pinImg,
    map: map
  };
})();
