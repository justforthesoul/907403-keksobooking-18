'use strict';

var CURRENT_COUNT = 8;
var ENTER_KEYCODE = 13;
var ESC__KEYCODE = 27;
var map = document.querySelector('.map');
var pinImg = document.querySelector('.map__pin--main img');
var mapPins = map.querySelector('.map__pins');
var mapFilter = map.querySelector('.map__filters-container');
var mainPin = document.querySelector('.map__pin--main');
var formFieldset = document.querySelectorAll('.notice form fieldset');
var sectionForm = document.querySelector('.notice form');

var MOCK = {
  author: {
    avatar: [
      'img/avatars/user01.png',
      'img/avatars/user02.png',
      'img/avatars/user03.png',
      'img/avatars/user04.png',
      'img/avatars/user05.png',
      'img/avatars/user06.png',
      'img/avatars/user07.png',
      'img/avatars/user08.png'
    ]
  },
  offer: {
    title: [
      'Большая уютная квартира',
      'Маленькая неуютная квартира',
      'Огромный прекрасный дворец',
      'Маленький ужасный дворец',
      'Красивый гостевой домик',
      'Некрасивый негостеприимный домик',
      'Уютное бунгало далеко от моря',
      'Неуютное бунгало по колено в воде'
    ],
    address: '600, 350',
    price: {
      min: 1000,
      max: 1000000
    },
    type: ['palace', 'flat', 'house', 'bungalo'],
    rooms: {
      min: 1,
      max: 5
    },
    guests: {
      min: 1,
      max: 20
    },
    checkin: ['12:00', '13:00', '14:00'],
    checkout: ['12:00', '13:00', '14:00'],
    features: [
      'wifi',
      'dishwasher',
      'parking',
      'washer',
      'elevator',
      'conditioner'
    ],
    description: '',
    photos: [
      'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
      'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
      'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
    ]
  },
  location: {
    x: {
      min: 0,
      max: 1200
    },
    y: {
      min: 130,
      max: 630
    }
  }
};

var getRandom = function (min, max) {
  return Math.round(min - 0.5 + Math.random() * (max - min + 1));
};

var getRandomArrayItems = function (arr) {
  var copiedItems = arr.slice();

  for (var i = 0; i < getRandom(0, arr.length - 1); i++) {
    copiedItems.splice(getRandom(0, copiedItems.length - 1), 1);
  }
  return copiedItems;
};


var blockFormFieldset = function () {
  formFieldset.forEach(function (field) {
    field.disabled = true;
  });
};

blockFormFieldset();

var shuffleArray = function (arr) {

  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
};

var createObject = function () {
  var arr = [];

  for (var i = 0; i < CURRENT_COUNT; i++) {
    var object = {
      author: {
        avatar: MOCK.author.avatar[i]
      },
      offer: {
        title:
          MOCK.offer.title[
            getRandom(0, MOCK.offer.title.length - 1)
          ],
        address: '600, 350',
        price: getRandom(
            MOCK.offer.price.min,
            MOCK.offer.price.max
        ),
        type:
          MOCK.offer.type[
            getRandom(0, MOCK.offer.type.length - 1)
          ],
        rooms: getRandom(
            MOCK.offer.rooms.min,
            MOCK.offer.rooms.max
        ),
        guests: getRandom(
            MOCK.offer.guests.min,
            MOCK.offer.guests.max
        ),
        checkin:
          MOCK.offer.checkin[
            getRandom(0, MOCK.offer.checkin.length - 1)
          ],
        checkout:
          MOCK.offer.checkout[
            getRandom(0, MOCK.offer.checkout.length - 1)
          ],
        features: getRandomArrayItems(MOCK.offer.features),
        description: '',
        photos: shuffleArray(MOCK.offer.photos)
      },
      location: {
        x: getRandom(MOCK.location.x.min + pinImg.offsetWidth / 2, MOCK.location.x.max - pinImg.offsetWidth / 2),
        y: getRandom(MOCK.location.y.min - pinImg.offsetHeight, MOCK.location.y.max - pinImg.offsetHeight)
      }
    };
    arr.push(object);
  }
  return arr;
};

var newMockArray = createObject();

var createPinElem = function (pinElements) {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinElem = pinTemplate.cloneNode(true);
  pinElem.style.left = pinElements.location.x + 'px';
  pinElem.style.top = pinElements.location.y + 'px';
  pinElem.querySelector('img').src = pinElements.author.avatar;
  pinElem.querySelector('img').alt = pinElements.offer.title;
  pinElem.classList.add('map__pin');
  return pinElem;
};

var fragmentPin = document.createDocumentFragment();

var createPin = function (fragment, arr) {
  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(createPinElem(arr[i]));
  }
};

var renderPin = function () {
  createPin(fragmentPin, newMockArray);
  mapPins.appendChild(fragmentPin);
};

var delPin = function () {
  var pinsBtn = document.querySelectorAll('button[type="button"]');
  var oldMapFragment = map.querySelector('.map__card');
  if (oldMapFragment) {
    oldMapFragment.remove();
  }
  pinsBtn.forEach(function (btn) {
    btn.remove();
  });
};

var translateType = function (type) {
  switch (type) {
    case 'flat':
      return 'Квартира';
    case 'bungalo':
      return 'Бунгало';
    case 'house':
      return 'Дом';
    case 'palace':
      return 'Дворец';
  }
  return true;
};

var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var createCardElem = function (cardElements) {
  var cardElem = cardTemplate.cloneNode(true);
  cardElem.querySelector('.popup__title').textContent = cardElements.offer.title;
  cardElem.querySelector('.popup__text--address').textContent = cardElements.offer.address;
  cardElem.querySelector('.popup__text--price').textContent = cardElements.offer.price + '₽/ночь';
  cardElem.querySelector('.popup__type').textContent = translateType(cardElements.offer.type);
  cardElem.querySelector('.popup__text--capacity').textContent = cardElements.offer.rooms + ' комнаты для ' + cardElements.offer.guests + ' гостей';
  cardElem.querySelector('.popup__text--time').textContent = 'Заезд после ' + cardElements.offer.checkin + ', выезд до ' + cardElements.offer.checkout;
  var arrFeatures = cardElements.offer.features;
  cardElem.querySelector('.popup__features').innerHTML = '';
  for (var i = 0; i < arrFeatures.length; i++) {
    var featureElement = document.createElement('li');
    featureElement.className = 'popup__feature popup__feature--' + arrFeatures[i];
    cardElem.querySelector('.popup__features').appendChild(featureElement);
  }
  cardElem.querySelector('.popup__description').textContent = '';
  var arrPhotos = cardElements.offer.photos;
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
  cardElem.querySelector('.popup__avatar').src = cardElements.author.avatar;
  cardElem.classList.add('map__card');
  return cardElem;
};

var address = document.querySelector('#address');

var setAdressCoordinates = function () {
  var pinCoordinates = (mainPin.offsetLeft + pinImg.offsetWidth / 2) + ', ' + (mainPin.offsetTop + pinImg.offsetHeight);
  address.setAttribute('value', pinCoordinates);
};

var removeAdressCoordinates = function () {
  address.setAttribute('value', null);
};

var activateFormFildset = function () {
  formFieldset.forEach(function (field) {
    field.disabled = false;
  });
};

var activationPageHandler = function () {
  map.classList.remove('map--faded');
  sectionForm.classList.remove('ad-form--disabled');
  renderPin();
  setAdressCoordinates();
  activateFormFildset();

  var showCardHandler = function (element, index) {
    element.addEventListener('click', function () {
      var oldMapFragment = map.querySelector('.map__card');
      var fragmentCard = createCardElem(newMockArray[index]);

      if (oldMapFragment) {
        map.replaceChild(fragmentCard, oldMapFragment);
      } else {
        map.insertBefore(fragmentCard, mapFilter);
      }

      var popupClose = map.querySelector('.popup__close');
      popupClose.focus();
      popupClose.addEventListener('click', function () {
        map.removeChild(fragmentCard);
      });

      window.addEventListener('keydown', function (evt) {
        if (evt.keyCode === ESC__KEYCODE) {
          evt.preventDefault();
          if (map.contains(fragmentCard)) {
            map.removeChild(fragmentCard);
          }
        }
      });
    });
  };
  var pinsBtn = document.querySelectorAll('button[type="button"]');
  pinsBtn.forEach(function (pin, i) {
    showCardHandler(pin, i);
  });
};

var blockPageHandler = function () {
  map.classList.add('map--faded');
  sectionForm.classList.add('ad-form--disabled');
  delPin();
  removeAdressCoordinates();
  blockFormFieldset();
};

mainPin.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    evt.preventDefault();
    activationPageHandler();
  }
});

mainPin.addEventListener('click', function () {
  activationPageHandler();
});

var form = document.querySelector('.ad-form');
var typeInput = form.querySelector('select[name="type"]');
var priceInput = form.querySelector('input[name="price"]');
var timeInInput = form.querySelector('select[name="timein"]');
var timeOutInput = form.querySelector('select[name="timeout"]');
var roomsInput = form.querySelector('select[name="rooms"]');
var capacityInput = form.querySelector('select[name="capacity"]');
var capacityOption = capacityInput.querySelectorAll('option');

var checkPrice = function () {
  if (Number(priceInput.value) > 1000000) {
    priceInput.setCustomValidity('Максимальная цена не может превашать 1000000');
  } else if (Number(priceInput.value) < Number(priceInput.placeholder)) {
    priceInput.setCustomValidity('Минимальная цена для данного вида жилья не может быть меньше' + ' ' + priceInput.placeholder);
  } else {
    priceInput.setCustomValidity('');
  }
};

var typeRooms = {
  bungalo: 0,
  flat: 1000,
  house: 5000,
  palace: 10000
};

var checkTypeInput = function () {
  priceInput.placeholder = typeRooms[typeInput.value];
};

var checkTimeInput = function (evt) {
  switch (evt.target) {
    case timeInInput:
      timeOutInput.value = timeInInput.value;
      break;
    case timeOutInput:
      timeInInput.value = timeOutInput.value;
      break;
  }
};

var roomsValues = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0]
};

var checkRoomsOptions = function () {
  capacityOption.forEach(function (option) {
    option.disabled = true;
  });
  roomsValues[roomsInput.value].forEach(function (option) {
    capacityOption.forEach(function (op) {
      if (Number(op.value) === option) {
        op.disabled = false;
        capacityInput.value = op.value;
      }
    });
  });
};

typeInput.addEventListener('change', checkTypeInput);

priceInput.addEventListener('input', checkPrice);

timeInInput.addEventListener('change', function (evt) {
  checkTimeInput(evt);
});

timeOutInput.addEventListener('change', function (evt) {
  checkTimeInput(evt);
});

roomsInput.addEventListener('change', checkRoomsOptions);

var resetButton = document.querySelector('.ad-form__reset');

resetButton.addEventListener('click', blockPageHandler);
