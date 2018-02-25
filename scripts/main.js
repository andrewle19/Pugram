var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';
var LARROW_LINK_SELECTOR = '[data-image-role="leftarrow"]';
var RARROW_LINK_SELECTOR = '[data-image-role="rightarrow"]';


// sets the detail view with an image
// Input: imageurl - name of image, titleText- text of the corrosponding image
function setDetails(imageURL, titleText) {
    'use strict';
    var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
    detailImage.setAttribute('src', imageURL);

    var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
    detailTitle.textContent = titleText;
}

// returns the url of image
function imageFromThumb(thumbnail) {
    'use strict';
    return thumbnail.getAttribute('data-image-url');
}

// returns the title of an image
function titleFromThumb(thumbnail) {
    'use strict';
    return thumbnail.getAttribute('data-image-title');
}

// sets the image when user clicks on the thumbnail
function setDetailsFromThumb(thumbnail) {
    'use strict';
    setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}
// adds an event clicker to the thumbnails
function addThumbClickHandler(thumb) {
    'use strict';
    thumb.addEventListener('click', function(event) {
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

// add click for arrow keys depending on direction
// Input: arrow object and direction - tell which direction the arrow is
function addArrowClickHandler(arrow, direction) {
    'use strict';

    // for right cycle left to right looping back to start
    if (direction == 'R') {
        var count = 0;
        arrow.addEventListener('click', function(event) {
            count += 1;
            event.preventDefault();
            cycleDetailView(count);
        });
    }
    // for left cycle right to left looping back to end
    else {
        count = 5;
        arrow.addEventListener('click', function(event) {
        // make sure the count stays positive
            if (count == 0) {
                count = 5;
            } else {
                count -= 1;
            }
            event.preventDefault();
            cycleDetailView(count);
        });
    }
}

// cycles through the detail view images with arrow keys
function cycleDetailView(count) {
    'use strict';
    var thumbnails = getThumbnailsArray();
    setDetailsFromThumb(thumbnails[count % 5]);
}

function initializeArrowKeys() {
    'use strict';
    var leftArrow = document.querySelector(LARROW_LINK_SELECTOR);
    var rightArrow = document.querySelector(RARROW_LINK_SELECTOR);
    addArrowClickHandler(leftArrow, 'L');
    addArrowClickHandler(rightArrow, 'R');
}


function initializeEvents() {
    'use strict';
    var thumbnails = getThumbnailsArray();
    thumbnails.forEach(addThumbClickHandler);
}

initializeArrowKeys();
initializeEvents();
