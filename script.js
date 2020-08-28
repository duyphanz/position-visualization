// lines of mousemove event
const horizontalLine = document.querySelector('.app__line--horizontal');
const verticalLine = document.querySelector('.app__line--vertical');

// lines of dragging element
const draggingEl = document.querySelector('.app__dragging-element');
const draggingVerticalLine = draggingEl.childNodes[3];
const draggingHorizontalLine = draggingEl.childNodes[5];

const scrollY = document.querySelector('.app__scroll-label');

let PageY = 0;
let ClientY = 0;
let draggingTop = 0;
const topSimulatedCover = 100;

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

  draggingVerticalLine.style.left = rect + 'px';
  draggingVerticalLine.style.top = topSimulatedCover + 'px';
  draggingVerticalLine.style.height = rect.top - topSimulatedCover + 'px';
  draggingVerticalLine.childNodes[1].innerHTML = 'rect.top/y:' + (rect.top - topSimulatedCover);

  draggingHorizontalLine.style.top = rect.top + 'px';
  draggingHorizontalLine.style.width = rect.left + 'px';
  draggingHorizontalLine.childNodes[1].innerHTML = 'rect.left/x:' + rect.left;
})

document.addEventListener('scroll', event => {
  const scroll = this.scrollY;
  verticalLine.childNodes[1].innerHTML = 'pageY:' + (ClientY + scroll);

  const draggingHeight = draggingTop - topSimulatedCover - scroll;
  draggingVerticalLine.style.height = draggingHeight + 'px';
  draggingHorizontalLine.style.top = draggingTop - scroll + 'px';
  draggingVerticalLine.childNodes[1].innerHTML = draggingHeight < 0 ? '' : 'rect.top/y:' + draggingHeight;

  scrollY.innerHTML = 'scrollY:' + (topSimulatedCover + scroll);
})


// Dragging elment
let x = 0;
let y = 0;

const mouseDownHandler = function(e) {
  e.preventDefault();
  // Calculate the mouse position
  const rect = draggingEl.getBoundingClientRect();
  x = e.pageX - rect.left;
  y = e.pageY - rect.top;

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