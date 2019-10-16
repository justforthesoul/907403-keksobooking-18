'use strict';

(function () {
  var avatarChooserElement = document.querySelector('.ad-form-header__input');
  var photoChooserElement = document.querySelector('.ad-form__input');
  var avatarContainerElement = document.querySelector('.ad-form-header__upload');
  var photoContainerElement = document.querySelector('.ad-form__photo');
  var previewElement = avatarContainerElement.querySelector('img');

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
          case avatarChooserElement:
            previewElement.src = result;
            break;
          case photoChooserElement:
            var imgElement = document.createElement('img');
            imgElement.src = result;
            imgElement.style.maxWidth = '70px';
            imgElement.style.maxHeight = '70px';
            photoContainerElement.appendChild(imgElement);
            break;
        }
      });
      reader.readAsDataURL(file);
    }
  };

  var clearImg = function () {
    previewElement.src = window.const.AVATAR_START_SRC;
    var formPfotoslement = photoContainerElement.querySelectorAll('img');
    formPfotoslement.forEach(function (img) {
      img.remove();
    });
  };

  avatarChooserElement.addEventListener('change', loadChangeHandler);
  photoChooserElement.addEventListener('change', loadChangeHandler);

  window.loadPhooto = {
    clearImg: clearImg
  };
})();
