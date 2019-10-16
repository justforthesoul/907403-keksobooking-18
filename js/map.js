'use strict';

(function () {
  var AccommodationType = {
    FLAT: 'Квартира',
    BUNGALO: 'Бунгало',
    HOUSE: 'Дом',
    PALACE: 'Дворец'
  };
  var mapFilterElement = window.utils.map.querySelector('.map__filters-container');
  var createPinElem = function (data) {
    var pinTemplateElement = document.querySelector('#pin').content.querySelector('.map__pin');
    var pinElement = pinTemplateElement.cloneNode(true);

    if (data.offer) {
      pinElement.style.left = (data.location.x - window.const.PIN_WIDTH / 2) + 'px';
      pinElement.style.top = (data.location.y - window.const.PIN_HEIGHT) + 'px';
      var pinImgElement = pinElement.querySelector('img');
      pinImgElement.src = data.author.avatar;
      pinImgElement.alt = data.offer.title;
      pinElement.classList.add('map__pin');
      pinElement.addEventListener('click', function () {
        showCard(data, pinElement);
        window.activePin = pinElement;
        window.activePin.classList.add('map__pin--active');
      });
      return pinElement;
    }
    return true;
  };

  var checkOffer = function (offer) {
    return offer === '' ? '' : offer;
  };

  var checkPriceOffer = function (data) {
    return data.offer.price === '' || data.offer.price === undefined ? '' : data.offer.price + '₽/ночь';
  };

  var checkCapacityOffer = function (data) {
    return data.offer.rooms === '' || data.offer.rooms === undefined || data.offer.guests === '' || data.offer.guests === undefined ? '' : data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
  };

  var checkTimeOffer = function (data) {
    return data.offer.checkin === '' || data.offer.checkin === undefined || data.offer.checkout === '' || data.offer.checkout === undefined ? '' : 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;
  };

  var showCard = function (data, elem) {
    var cardElement = document.querySelector('.map__card');
    if (cardElement) {
      var activePinElement = document.querySelector('.map__pin--active');
      window.utils.map.replaceChild(createCardElement(data), cardElement);
      activePinElement.classList.remove('map__pin--active');
    } else {
      window.utils.map.insertBefore(createCardElement(data), mapFilterElement);
      elem.classList.add('map__pin--active');
    }
    var popupCloseElement = window.utils.map.querySelector('.popup__close');
    popupCloseElement.focus();
  };

  var cardTemplateElement = document.querySelector('#card').content.querySelector('.map__card');
  var createCardElement = function (data) {
    var cardElement = cardTemplateElement.cloneNode(true);

    cardElement.querySelector('.popup__title').textContent = checkOffer(data.offer.title);
    cardElement.querySelector('.popup__text--address').textContent = checkOffer(data.offer.address);
    cardElement.querySelector('.popup__text--price').textContent = checkPriceOffer(data);
    cardElement.querySelector('.popup__type').textContent = AccommodationType[checkOffer(data.offer.type).toUpperCase()];
    cardElement.querySelector('.popup__text--capacity').textContent = checkCapacityOffer(data);
    cardElement.querySelector('.popup__text--time').textContent = checkTimeOffer(data);

    var arrFeatures = data.offer.features;
    cardElement.querySelector('.popup__features').innerHTML = '';
    arrFeatures.forEach(function (feature) {
      var featureElement = document.createElement('li');
      featureElement.className = 'popup__feature popup__feature--' + feature;
      cardElement.querySelector('.popup__features').appendChild(featureElement);
    });
    cardElement.querySelector('.popup__description').textContent = '';
    var arrPhotos = data.offer.photos;
    cardElement.querySelector('.popup__photos').innerHTML = '';
    arrPhotos.forEach(function (photo) {
      var imgElement = document.createElement('img');
      imgElement.className = 'popup__photo';
      imgElement.alt = 'Фотография жилья';
      imgElement.width = '45';
      imgElement.height = '40';
      imgElement.src = photo;
      cardElement.querySelector('.popup__photos').appendChild(imgElement);
    });
    cardElement.querySelector('.popup__avatar').src = data.author.avatar;
    cardElement.classList.add('map__card');

    var buttonClickHandler = function (evt) {
      evt.preventDefault();
      cardElement.remove();
      window.activePin.classList.remove('map__pin--active');
      document.removeEventListener('click', buttonClickHandler);
    };

    var buttonKeydownHandler = function (evt) {
      if (evt.keyCode === window.const.ESC_KEYCODE) {
        evt.preventDefault();
        window.activePin.classList.remove('map__pin--active');
        cardElement.remove();
        document.removeEventListener('keydown', buttonKeydownHandler);
      }
    };

    cardElement.querySelector('.popup__close').addEventListener('click', buttonClickHandler);
    document.addEventListener('keydown', buttonKeydownHandler);

    return cardElement;
  };

  var mapPinsElement = window.utils.map.querySelector('.map__pins');
  var fragmentPinElement = document.createDocumentFragment();

  var renderPins = function (data) {
    data.forEach(function (el) {
      fragmentPinElement.appendChild(window.map.createPinElem(el));
    });
    mapPinsElement.appendChild(fragmentPinElement);
  };

  window.map = {
    createPinElem: createPinElem,
    renderPins: renderPins
  };

})();
