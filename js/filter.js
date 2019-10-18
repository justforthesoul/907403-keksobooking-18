'use strict';

(function () {
  var housingTypeElement = window.utils.filter.querySelector('#housing-type');
  var housingPriceElement = window.utils.filter.querySelector('#housing-price');
  var housingRoomsElement = window.utils.filter.querySelector('#housing-rooms');
  var housingGuestsElement = window.utils.filter.querySelector('#housing-guests');
  var mapFeatureElements = window.utils.filter.querySelectorAll('.map__checkbox');
  var filtersSelectElements = window.utils.filter.querySelectorAll('.map__filter');
  var filterByFeaturesElements = window.utils.filter.querySelectorAll('[name="features"]');

  var blockFilter = function () {
    filtersSelectElements.forEach(function (sel) {
      sel.disabled = true;
    });
    filterByFeaturesElements.forEach(function (box) {
      box.disabled = true;
    });
  };

  var unBlockFilter = function () {
    filtersSelectElements.forEach(function (sel) {
      sel.disabled = false;
    });
    filterByFeaturesElements.forEach(function (box) {
      box.disabled = false;
    });
  };

  var filterType = function (data) {
    return housingTypeElement.value === 'any' ? data : housingTypeElement.value === String(data.offer.type);
  };

  var getLowPrice = function (data) {
    return data.offer.price <= window.const.MIN_PRICE;
  };

  var getMiddlePrice = function (data) {
    return data.offer.price >= window.const.MIN_PRICE && data.offer.price <= window.const.MAX_PRICE;
  };

  var getHighPrice = function (data) {
    return data.offer.price >= window.const.MAX_PRICE;
  };

  var getAllPrice = function (data) {
    return data;
  };

  var priceRange = {
    low: getLowPrice,
    middle: getMiddlePrice,
    high: getHighPrice,
    any: getAllPrice
  };

  var filterPrice = function (data) {
    return priceRange[housingPriceElement.value](data);
  };

  var filterRooms = function (data) {
    return housingRoomsElement.value === 'any' ? data : housingRoomsElement.value === String(data.offer.rooms);
  };

  var filterGuests = function (data) {
    return housingGuestsElement.value === 'any' ? data : housingGuestsElement.value === String(data.offer.guests);
  };

  var getCheckboxesValue = function () {
    var checkboxesValues = [];
    mapFeatureElements.forEach(function (input) {
      if (input.checked) {
        checkboxesValues.push(input.value);
      }
    });
    return checkboxesValues;
  };

  var getArrayCompare = function (arr1, arr2) {
    for (var i = 0; i < arr2.length; i++) {
      if (arr1.indexOf(arr2[i]) === -1) {
        return false;
      }
    }
    return true;
  };

  var filterCheckboxes = function (data) {
    return (getArrayCompare(data.offer.features, getCheckboxesValue())) ? data : false;
  };

  var getFilteringData = function (data) {
    return data.filter(function (it) {
      return filterType(it) &&
             filterPrice(it) &&
             filterRooms(it) &&
             filterGuests(it) &&
             filterCheckboxes(it);
    }).slice(0, window.const.PINS_LIMIT);
  };

  var changeTypeHandler = window.debounce(function () {
    window.control.clearMap();
    window.map.renderPins(getFilteringData(window.adverts));
  });

  window.utils.filter.addEventListener('change', changeTypeHandler);

  window.filter = {
    getData: getFilteringData,
    block: blockFilter,
    unBlock: unBlockFilter
  };

})();
