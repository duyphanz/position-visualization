const horizontalLine = document.querySelector('.app__line--horizontal');
const verticalLine = document.querySelector('.app__line--vertical');

const draggingEl = document.querySelector('.app__dragging-element');
const draggingVerticalLine = draggingEl.childNodes[1];
const draggingHorizontalLine = draggingEl.childNodes[3];

let PageY = 0;
let ClientY = 0;

let draggingTop = 0;

document.addEventListener('mousemove', event => {
  const { clientX, clientY, pageX, pageY } = event;

  PageY = pageY;
  ClientY = clientY;


  horizontalLine.style.top = clientY < 100 ? clientY: clientY + 'px';
  horizontalLine.style.width = clientX + 'px';
  horizontalLine.childNodes[1].innerHTML = 'pageX:' + pageX;

  verticalLine.style.left = clientX + 'px';
  verticalLine.style.height = clientY < 100 ? clientY: clientY + 'px';
  verticalLine.childNodes[1].innerHTML = 'pageY:' + PageY;
  verticalLine.childNodes[3].innerHTML = '--clientY:' + (clientY - 100);


  const rect = draggingEl.getBoundingClientRect();
  draggingTop = rect.top

  draggingVerticalLine.style.left = rect + 'px';
  draggingVerticalLine.style.height = rect.top + 'px';
  draggingHorizontalLine.style.top = rect.top + 'px';
  draggingHorizontalLine.style.width = rect.left + 'px';
})

document.addEventListener('scroll', event => {
  const scroll = this.scrollY;
  verticalLine.childNodes[1].innerHTML = 'pageY:' + (ClientY + scroll);

  draggingVerticalLine.style.height = draggingTop - scroll + 'px';
  draggingHorizontalLine.style.top = draggingTop - scroll + 'px';


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
  draggingEl.style.top = `${e.pageY - y}px`; 
  draggingEl.style.left = `${e.pageX - x}px`;
};

const mouseUpHandler = function() {
  // Remove the handlers of `mousemove` and `mouseup`
  draggingEl.removeEventListener('mousemove', mouseMoveHandler);
  draggingEl.removeEventListener('mouseup', mouseUpHandler);
};

draggingEl.addEventListener('mousedown', mouseDownHandler)