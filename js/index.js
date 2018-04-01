'use strict';

var NUM_ROWS = 3;
var NUM_IMAGES = 100;
var IMAGES = [];
for (var i = 0; i < NUM_IMAGES; i++) {
  var width = (Math.floor(Math.random() * 3) + 2) * 100;
  var height = (Math.floor(Math.random() * 3) + 2) * 100;
  IMAGES.push('http://unsplash.it/' + width + '/' + height);
}

var rows = [];
for (var i = 0; i < NUM_ROWS; i++) {
  var row = document.createElement('div');
  row.classList.add('row');
  rows.push(row);
}

var wall = document.getElementById('wall');
for (var i = 0; i < IMAGES.length; i++) {
  var index = i % rows.length;
  var row = rows[index];
  var onBottomRow = index === rows.length - 1;
  if (onBottomRow) {
    var frame = document.createElement('div');
    frame.classList.add('frame');
    frame.innerHTML = '\n      <img src="' + IMAGES[i] + '">\n      <div class="reflection">\n        <img src="' + IMAGES[i] + '">\n      </div>\n    ';
    row.appendChild(frame);
  } else {
    var img = document.createElement('img');
    img.src = IMAGES[i];
    row.appendChild(img);
  }
}

rows.forEach(function (row) {
  wall.appendChild(row);
});

var debounce = function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
        args = arguments;
    var later = function later() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

var scrollPosition = 0;
var scrollWall = debounce(function (event) {
  scrollPosition -= event.deltaY;
  wall.style.transform = 'rotateY(45deg) translateX(' + scrollPosition + 'px)';
}, 10);

window.addEventListener('wheel', scrollWall);