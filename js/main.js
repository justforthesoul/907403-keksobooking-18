'use strict';

var CURRENT_COUNT = 8;
var map = document.querySelector('.map');
var pinImg = document.querySelector('.map__pin--main img');

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

map.classList.remove('map--faded');

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

for (var i = 0; i < newMockArray.length; i++) {
  fragmentPin.appendChild(createPinElem(newMockArray[i]));
}

map.appendChild(fragmentPin);
