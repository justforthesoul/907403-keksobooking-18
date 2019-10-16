'use strict';

(function () {
  var avatarChooser = document.querySelector('.ad-form-header__input');
  var photoChooser = document.querySelector('.ad-form__input');
  var avatarContainer = document.querySelector('.ad-form-header__upload');
  var photoContainer = document.querySelector('.ad-form__photo');
  var preview = avatarContainer.querySelector('img');

  var loadChangeHandler = function (evt) {
    var fileChooser = evt.target;
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = window.const.FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        var result = reader.result;
        switch (fileChooser) {
          case avatarChooser:
            preview.src = result;
            break;
          case photoChooser:
            var imgElement = document.createElement('img');
            imgElement.src = result;
            imgElement.style.maxWidth = '70px';
            imgElement.style.maxHeight = '70px';
            photoContainer.appendChild(imgElement);
            break;
        }
      });
      reader.readAsDataURL(file);
    }
  };

  var clearImg = function () {
    preview.src = window.const.AVATAR_START_SRC;
    var formPfotos = photoContainer.querySelectorAll('img');
    formPfotos.forEach(function (img) {
      img.remove();
    });
  };

  avatarChooser.addEventListener('change', loadChangeHandler);
  photoChooser.addEventListener('change', loadChangeHandler);

  window.loadPhooto = {
    clearImg: clearImg
  };
})();
