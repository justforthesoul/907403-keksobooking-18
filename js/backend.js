'use strict';

(function () {

  var connect = function (onSuccess, onError, data) {
    var xhr = new XMLHttpRequest();
    var requestType = 'GET';
    var url = window.const.LOAD_URL;
    xhr.responseType = 'json';

    if (data) {
      requestType = 'POST';
      url = window.const.UPLOAD_URL;
    }

    xhr.addEventListener('load', function () {
      if (xhr.status === window.const.SUCCESS_CODE) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.timeout = window.const.XHR_TIMEOUT;

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.open(requestType, url);
    xhr.send(data);
  };

  var load = function (onSuccess, onError) {
    connect(onSuccess, onError);
  };

  var upload = function (onSuccess, onError, data) {
    connect(onSuccess, onError, data);
  };

  window.backend = {
    load: load,
    upload: upload
  };

})();
