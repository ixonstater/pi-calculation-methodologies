
function onWindowDrag(e, win, oldPosition){
  var leftOffset = e.clientX - oldPosition.clickLeft
  var topOffset = e.clientY - oldPosition.clickTop
  win.style.left = oldPosition.left + leftOffset + 'px'
  win.style.top = oldPosition.top + topOffset + 'px'
}

function onWindowClick(e){
  var rect = this.getBoundingClientRect()
  var oldPosition = {
    left: rect.left,
    top: rect.top,
    clickLeft: e.clientX,
    clickTop: e.clientY,
  }
  var win = document.getElementById('moveable-window')
  var func = function(e){ onWindowDrag(e, this, oldPosition) }
  this.addEventListener('pointermove', func)
  this.addEventListener('pointerup', function callback(e){
    this.removeEventListener('pointerup', callback)
    this.removeEventListener('pointermove', func)
  })
}

function attachWindowEvents(win){
  win.addEventListener('pointerdown', onWindowClick)
}

function makeWindow(){
  var attachPoint = document.getElementById('window-attach-point')
  var win = document.createElement('div')
  var winTopBorder = document.createElement('hr')
  var winLabel = document.createElement('p')

  win.appendChild(winLabel)
  win.appendChild(winTopBorder)
  attachPoint.appendChild(win)

  win.id='moveable-window'
  win.className = 'moveable-window'
  winTopBorder.className = 'window-top-deliminator'
  winLabel.id = 'win-label'
  winLabel.className = 'win-label'

  attachWindowEvents(win)

  return win
}

function displayText(val){
  document.getElementById('archimedes-explanation-container').style.display = 'none'
  document.getElementById('leibniz-explanation-container').style.display = 'none'
  document.getElementById('monte-carlo-explanation-container').style.display = 'none'
  document.getElementById(val + '-explanation-container').style.display = 'block'
}

function submit(e){
  var selector = document.getElementById('main-selector')
  var option = selector.value
  displayText(option)
  var oldWindow = document.getElementById('moveable-window')
  if(oldWindow){ oldWindow.remove() }
  var newWindow = makeWindow()
  switch (option){
    case 'monte-carlo':
      monteCarloWrapper(newWindow)
      break;
    case 'archimedes':
      archimedesWrapper(newWindow)
      break;
    case 'leibniz':
      leibnizWrapper(newWindow)
      break;
  }
}

function init(){
  document.getElementById('submit-selection').addEventListener('click', submit)
}

document.addEventListener('DOMContentLoaded', init)
