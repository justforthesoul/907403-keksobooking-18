'use strict';

(function () {
  var filter = document.querySelector('.map__filters');
  var housingType = filter.querySelector('#housing-type');

  var filteringData = function (data) {
    var filteredData = data;
    if (housingType.value === 'any') {
      filteredData = filteredData.slice(0, window.utils.PINS_LIMIT);
    } else {
      filteredData = filteredData.filter(function (obj) {
        return obj.offer.type === housingType.value;
      }).slice(0, window.utils.PINS_LIMIT);
    }
    return filteredData;
  };

  var successHandler = function (data) {
    window.map.renderPins(filteringData(data));
  };

  var changeTypeHandler = function () {
    window.pagehandler.clearMap();
    window.backend.load(successHandler, window.pagehandler.errorHandler);
  };

  housingType.addEventListener('change', changeTypeHandler);

})();
