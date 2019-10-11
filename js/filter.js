'use strict';

(function () {
  var filter = document.querySelector('.map__filters');
  var housingType = filter.querySelector('#housing-type');

  var filteringData = function (data) {
    var filteredData = data;
    if (housingType.value !== 'any') {
      filteredData = filteredData.filter(function (obj) {
        return obj.offer.type === housingType.value;
      });
    }
    return filteredData;
  };

  var successHandler = function (data) {
    window.map.renderPins(filteringData(data).slice(0, window.utils.PINS_LIMIT));
  };

  var changeTypeHandler = function () {
    window.pagehandler.clearMap();
    window.backend.load(successHandler, window.pagehandler.errorHandler);
  };

  housingType.addEventListener('change', changeTypeHandler);

})();
