'use strict';

(function () {
  var MAX_PRICE = 50000;
  var MIN_PRICE = 10000;
  var filter = document.querySelector('.map__filters');
  var housingType = filter.querySelector('#housing-type');
  var housingPrice = filter.querySelector('#housing-price');
  var housingRooms = filter.querySelector('#housing-rooms');
  var housingGuests = filter.querySelector('#housing-guests');
  var mapFeature = filter.querySelectorAll('.map__checkbox');

  var PriceRange = {
    LOW: 'low',
    MIDDLE: 'middle',
    HIGH: 'high'
  };

  var filteringData = function (data, input, name) {
    return String(input.value) === 'any' ? data : String(input.value) === String(data.offer[name]);
  };

  var filteringPrice = function (data) {
    switch (housingPrice.value) {
      case PriceRange.LOW:
        return data.offer.price < MIN_PRICE;
      case PriceRange.MIDDLE:
        return data.offer.price >= MIN_PRICE && data.offer.price <= MAX_PRICE;
      case PriceRange.HIGH:
        return data.offer.price > MAX_PRICE;
      default:
        return data;
    }
  };

  var getCheckboxesValue = function () {
    var checkboxesValue = [];
    mapFeature.forEach(function (input) {
      if (input.checked) {
        checkboxesValue.push(input.value);
      }
    });
    return checkboxesValue;
  };

  var getArrayCompare = function (arr1, arr2) {
    for (var i = 0; i < arr2.length; i++) {
      if (arr1.indexOf(arr2[i]) === -1) {
        return false;
      }
    }
    return true;
  };

  var filteringCheckboxes = function (data) {
    return (getArrayCompare(data.offer.features, getCheckboxesValue())) ? data : false;
  };

  var getFilteringData = function (data) {
    return data.filter(function (it) {
      return filteringData(it, housingType, 'type') &&
             filteringPrice(it, housingType, 'type') &&
             filteringData(it, housingRooms, 'rooms') &&
             filteringData(it, housingGuests, 'guests') &&
             filteringCheckboxes(it);
    }).slice(0, window.utils.PINS_LIMIT);
  };

  var changeTypeHandler = window.debounce(function () {
    window.pagehandler.clearMap();
    window.map.renderPins(getFilteringData(window.adverts));
  });

  filter.addEventListener('change', changeTypeHandler);

  window.filter = {
    filter: filter,
    getFilteringData: getFilteringData
  };

})();
