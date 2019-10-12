'use strict';

(function () {
  var filter = document.querySelector('.map__filters');
  var housingType = filter.querySelector('#housing-type');
  var housingPrice = filter.querySelector('#housing-price');
  var housingRooms = filter.querySelector('#housing-rooms');
  var housingGuests = filter.querySelector('#housing-guests');
  var mapFeature = filter.querySelectorAll('.map__checkbox');

  var PriceRange = {
    low: {
      min: 0,
      max: 9999
    },
    middle: {
      min: 10000,
      max: 50000
    },
    high: {
      min: 50000,
      max: Infinity
    }
  };

  var filteringData = function (data, input, name) {
    var filteredData = data;
    if (input.value !== 'any') {
      filteredData = filteredData.filter(function (arr) {
        return String(arr.offer[name]) === String(input.value);
      });
    }
    return filteredData;
  };

  var filteringPrice = function (data) {
    var filteredData = data;
    if (housingPrice.value !== 'any') {
      filteredData = filteredData.filter(function (arr) {
        if (Number(arr.offer.price) >= Number(PriceRange[housingPrice.value].min) && Number(arr.offer.price) <= Number(PriceRange[housingPrice.value].max)) {
          var filteringArr = arr;
        }
        return filteringArr;
      });
    }
    return filteredData;
  };

  var getInputsValue = function () {
    var inputsValue = [];
    mapFeature.forEach(function (input) {
      if (input.checked) {
        inputsValue.push(input.value);
      }
    });
    return inputsValue;
  };

  var getArrayCompare = function (arr1, arr2) {
    for (var i = 0; i < arr2.length; i++) {
      if (arr1.indexOf(arr2[i]) === -1) {
        return false;
      }
    }
    return true;
  };

  var filteringInputs = function (data) {
    var filteredInputs = data;
    var filteredFeatures = getInputsValue();
    filteredInputs = filteredInputs.filter(function (arr) {
      var loadFeatures = arr.offer.features;
      if (getArrayCompare(loadFeatures, filteredFeatures)) {
        var filteringArr = arr;
      }
      return filteringArr;
    });
    return filteredInputs;
  };

  var getFilteringData = function (data) {
    return filteringInputs(filteringData(filteringData(filteringPrice(filteringData(data, housingType, 'type')), housingRooms, 'rooms'), housingGuests, 'guests'));
  };

  var changeTypeHandler = window.debounce(function () {
    window.pagehandler.clearMap();
    window.map.renderPins(getFilteringData(window.adverts).slice(0, window.utils.PINS_LIMIT));
  });

  filter.addEventListener('change', changeTypeHandler);

  window.filter = {
    filter: filter
  };

})();
