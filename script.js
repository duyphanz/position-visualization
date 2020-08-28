const horizontalLine = document.querySelector('.app__line--horizontal')
const verticalLine = document.querySelector('.app__line--vertical')

let PageY = 0;
let ClientY = 0

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
})



document.addEventListener('scroll', event => {
  const scroll = this.scrollY;
  verticalLine.childNodes[1].innerHTML = 'pageY:' + (ClientY + scroll);
})
