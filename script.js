
// variables
let PageY = 0;
let ClientY = 0;
let draggingTop = 0;
let draggingBottom = 0;
const topSimulatedCover = 100;

// lines of mousemove event
const horizontalLine = document.querySelector('.app__line--horizontal');
const verticalLine = document.querySelector('.app__line--vertical');

// lines of dragging element
const draggingEl = document.querySelector('.app__dragging-element');
const draggingVerticalLine = draggingEl.childNodes[5];
const draggingHorizontalLine = draggingEl.childNodes[7];
const draggingDimensions = draggingEl.childNodes[11];

const draggingVerticalLineBottom = draggingEl.childNodes[15];
const draggingVerticalLineRight = draggingEl.childNodes[17];

const scrollY = document.querySelector('.app__scroll-label');
const innerHeight = document.querySelector('.inner-height__label');
innerHeight.innerHTML = 'window.innerHeight: ' + (window.innerHeight - topSimulatedCover);



window.addEventListener('resize', event => {
  innerHeight.innerHTML = 'window.innerHeight: ' + (window.innerHeight - topSimulatedCover);
})

document.addEventListener('mousemove', event => {
  const { clientX, clientY, pageX, pageY } = event;

  PageY = pageY;
  ClientY = clientY;


  horizontalLine.style.top = clientY < topSimulatedCover ? clientY: clientY + 'px';
  horizontalLine.style.width = clientX + 'px';
  horizontalLine.childNodes[1].innerHTML = 'e.pageX:' + pageX;

  verticalLine.style.left = clientX + 'px';
  verticalLine.style.height = clientY < topSimulatedCover ? clientY: clientY + 'px';
  verticalLine.childNodes[1].innerHTML = 'e.pageY:' + PageY;
  verticalLine.childNodes[3].innerHTML = '-- e.clientY:' + (clientY - topSimulatedCover);


  const rect = draggingEl.getBoundingClientRect();
  draggingTop = rect.top
  draggingBottom = rect.bottom

  draggingVerticalLine.style.left = rect + 'px';
  draggingVerticalLine.style.top = topSimulatedCover + 'px';
  draggingVerticalLine.style.height = rect.top - topSimulatedCover + 'px';
  draggingVerticalLine.childNodes[1].innerHTML = '--rect.top/y:' + (rect.top - topSimulatedCover);

  draggingVerticalLineBottom.style.left = rect.right + 'px';
  draggingVerticalLineBottom.style.top = topSimulatedCover + 'px';
  draggingVerticalLineBottom.style.height = rect.bottom - topSimulatedCover + 'px';
  draggingVerticalLineBottom.childNodes[1].innerHTML = '--rect.bottom:' + (rect.bottom - topSimulatedCover);

  draggingHorizontalLine.style.top = rect.top + 'px';
  draggingHorizontalLine.style.width = rect.left + 'px';
  draggingHorizontalLine.childNodes[1].innerHTML = 'rect.left/x:' + rect.left;

  draggingVerticalLineRight.style.top = rect.bottom + 'px';
  draggingVerticalLineRight.style.width = rect.right + 'px';
  draggingVerticalLineRight.childNodes[1].innerHTML = 'rect.right:' + rect.right;
})

document.addEventListener('scroll', event => {
  const scroll = this.scrollY;
  verticalLine.childNodes[1].innerHTML = 'pageY:' + (ClientY + scroll);

  const draggingHeight = draggingTop - topSimulatedCover - scroll;
  const draggingHeightBottom = draggingBottom - topSimulatedCover - scroll;

  draggingVerticalLine.style.height = draggingHeight + 'px';
  draggingVerticalLine.childNodes[1].innerHTML = draggingHeight < 0 ? '' : '--rect.top/y:' + draggingHeight;
  draggingVerticalLineBottom.style.height = draggingHeightBottom + 'px';
  draggingVerticalLineBottom.childNodes[1].innerHTML = draggingHeightBottom < 0 ? '' : '--rect.bottom:' + draggingHeightBottom;


  draggingHorizontalLine.style.top = draggingTop - scroll + 'px';
  draggingVerticalLineRight.style.top = draggingBottom - scroll + 'px';


  scrollY.innerHTML = 'scrollY:' + (topSimulatedCover + scroll);
})


// Dragging elment
let x = 0;
let y = 0;

const mouseDownHandler = function(e) {
  e.preventDefault();

  window.scrollTo(0, 0);
  // Calculate the mouse position
  const rect = draggingEl.getBoundingClientRect();
  x = e.pageX - rect.left;
  y = e.pageY - rect.top;

  draggingDimensions.innerHTML = 'rect.width:' + rect.width + ', rect.height: ' + rect.height;

  // Attach the listeners to `document`
  draggingEl.addEventListener('mousemove', mouseMoveHandler);
  draggingEl.addEventListener('mouseup', mouseUpHandler);
};

const mouseMoveHandler = function(e) {
  e.preventDefault();
  // Set position for dragging element
  draggingEl.style.position = 'absolute';
  draggingEl.style.top = e.pageY - y < topSimulatedCover ? x :  `${e.pageY - y}px`; 
  draggingEl.style.left = `${e.pageX - x}px`;
};

const mouseUpHandler = function() {
  // Remove the handlers of `mousemove` and `mouseup`
  draggingEl.removeEventListener('mousemove', mouseMoveHandler);
  draggingEl.removeEventListener('mouseup', mouseUpHandler);
};

draggingEl.addEventListener('mousedown', mouseDownHandler)