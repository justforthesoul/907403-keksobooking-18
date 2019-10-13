'use strict';

(function () {
  var filter = document.querySelector('.map__filters');
  var housingType = window.utils.filter.querySelector('#housing-type');
  var housingPrice = window.utils.filter.querySelector('#housing-price');
  var housingRooms = window.utils.filter.querySelector('#housing-rooms');
  var housingGuests = window.utils.filter.querySelector('#housing-guests');
  var mapFeature = window.utils.filter.querySelectorAll('.map__checkbox');

  var PriceRange = {
    LOW: 'low',
    MIDDLE: 'middle',
    HIGH: 'high'
  };

  var filteringType = function (data) {
    return String(housingType.value) === 'any' ? data : String(housingType.value) === String(data.offer.type);
  };

  var filteringPrice = function (data) {
    switch (housingPrice.value) {
      case PriceRange.LOW:
        return data.offer.price < window.const.MIN_PRICE;
      case PriceRange.MIDDLE:
        return data.offer.price >= window.const.MIN_PRICE && data.offer.price <= window.const.MAX_PRICE;
      case PriceRange.HIGH:
        return data.offer.price > window.const.MAX_PRICE;
      default:
        return data;
    }
  };

  var filteringRooms = function (data) {
    return String(housingRooms.value) === 'any' ? data : String(housingRooms.value) === String(data.offer.rooms);
  };

  var filteringGuests = function (data) {
    return String(housingGuests.value) === 'any' ? data : String(housingGuests.value) === String(data.offer.guests);
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
      return filteringType(it) &&
             filteringPrice(it) &&
             filteringRooms(it) &&
             filteringGuests(it) &&
             filteringCheckboxes(it);
    }).slice(0, window.const.PINS_LIMIT);
  };

  var changeTypeHandler = window.debounce(function () {
    window.pagehandler.clearMap();
    window.map.renderPins(getFilteringData(window.adverts));
  });

  filter.addEventListener('change', changeTypeHandler);

  window.filter = {
    getFilteringData: getFilteringData
  };

})();
