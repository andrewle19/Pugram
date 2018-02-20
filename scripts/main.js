var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';

// sets the detail view with an image
// Input: imageurl - name of image, titleText- text of the corrosponding image
function setDetails (imageURL, titleText) {
  'use strict';
  var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR)
  detailImage.setAttribute('src', imageURL);

  var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR)
  detailTitle.textContent = titleText;
}

// returns the url of image
function imageFromThumb (thumbnail) {
  'use strict';
  return thumbnail.getAttribute('data-image-url');
}

// returns the title of an image
function titleFromThumb (thumbnail) {
  'use strict';
  return thumbnail.getAttribute('data-image-title');
}

// sets the image when user clicks on the thumbnail
function setDetailsFromThumb (thumbnail) {
  'use strict';
  setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}
// adds an event clicker to the thumbnails
function addThumbClickHandler(thumb) {
  'use strict';
  thumb.addEventListener('click', function (event) {
    event.preventDefault();
    setDetailsFromThumb(thumb);
  });
}

// get all the thumbnail link identifiers into an array
function getThumbnailsArray() {
  'use strict';
  var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
  var thumbnailArray = [].slice.call(thumbnails);
  return thumbnailArray;
}

function initializeEvents() {
  'use strict';
  var thumbnails = getThumbnailsArray();
  thumbnails.forEach(addThumbClickHandler);
}

initializeEvents();
