const horizontalLine = document.querySelector('.app__line--horizontal')
const verticalLine = document.querySelector('.app__line--vertical')


document.addEventListener('mousemove', event => {
  const { clientX, clientY, pageX, pageY } = event;

  horizontalLine.style.top = clientY < 100 ? clientY: clientY + 'px';
  horizontalLine.style.width = clientX + 'px';
  horizontalLine.childNodes[1].innerHTML = 'pageX:' + pageX;

  verticalLine.style.left = clientX + 'px';
  verticalLine.style.height = clientY < 100 ? clientY: clientY + 'px';
  verticalLine.childNodes[1].innerHTML = 'pageY:' + pageY;
  verticalLine.childNodes[3].innerHTML = '--clientY:' + (clientY - 100);
})

