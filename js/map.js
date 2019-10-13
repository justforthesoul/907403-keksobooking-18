'use strict';

(function () {
  var mapFilter = window.utils.map.querySelector('.map__filters-container');

  var createPinElem = function (data) {
    var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
    var pinElem = pinTemplate.cloneNode(true);
    pinElem.style.left = data.location.x + 'px';
    pinElem.style.top = data.location.y + 'px';
    pinElem.querySelector('img').src = data.author.avatar;
    pinElem.querySelector('img').alt = data.offer.title;
    pinElem.classList.add('map__pin');

    pinElem.addEventListener('click', function () {
      showCardHandler(data);
    });

    return pinElem;
  };

  var showCardHandler = function (data) {
    var card = document.querySelector('.map__card');
    if (card) {
      window.utils.map.replaceChild(createCardElem(data), card);
    } else {
      window.utils.map.insertBefore(createCardElem(data), mapFilter);
    }
    var popupClose = window.utils.map.querySelector('.popup__close');
    popupClose.focus();
  };

  var OfferType = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец'
  };

  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var createCardElem = function (data) {
    var cardElem = cardTemplate.cloneNode(true);
    cardElem.querySelector('.popup__title').textContent = data.offer.title;
    cardElem.querySelector('.popup__text--address').textContent = data.offer.address;
    cardElem.querySelector('.popup__text--price').textContent = data.offer.price + '₽/ночь';
    cardElem.querySelector('.popup__type').textContent = OfferType[data.offer.type];
    cardElem.querySelector('.popup__text--capacity').textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
    cardElem.querySelector('.popup__text--time').textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;
    var arrFeatures = data.offer.features;
    cardElem.querySelector('.popup__features').innerHTML = '';
    for (var i = 0; i < arrFeatures.length; i++) {
      var featureElement = document.createElement('li');
      featureElement.className = 'popup__feature popup__feature--' + arrFeatures[i];
      cardElem.querySelector('.popup__features').appendChild(featureElement);
    }
    cardElem.querySelector('.popup__description').textContent = '';
    var arrPhotos = data.offer.photos;
    cardElem.querySelector('.popup__photos').innerHTML = '';
    for (var j = 0; j < arrPhotos.length; j++) {
      var imgElement = document.createElement('img');
      imgElement.className = 'popup__photo';
      imgElement.alt = 'Фотография жилья';
      imgElement.width = '45';
      imgElement.height = '40';
      imgElement.src = arrPhotos[j];
      cardElem.querySelector('.popup__photos').appendChild(imgElement);
    }
    cardElem.querySelector('.popup__avatar').src = data.author.avatar;
    cardElem.classList.add('map__card');

    cardElem.querySelector('.popup__close').addEventListener('click', function () {
      cardElem.remove();
    });

    document.addEventListener('keydown', function (evt) {
      closeCardHandler(evt);
    });

    return cardElem;
  };

  var closeCardHandler = function (evt) {
    var card = document.querySelector('.map__card');
    if (evt.keyCode === window.utils.ESC_KEYCODE && card) {
      evt.preventDefault();
      card.remove();
    }
  };

  var mapPins = window.utils.map.querySelector('.map__pins');
  var fragmentPin = document.createDocumentFragment();

  var renderPins = function (data) {
    data.forEach(function (el) {
      fragmentPin.appendChild(window.map.createPinElem(el));
    });
    mapPins.appendChild(fragmentPin);
  };

  window.map = {
    createPinElem: createPinElem,
    renderPins: renderPins
  };

})();
