function monteCarloWrapper(win){
  function makeWidgets(win){
    var dartBoard = document.createElement('canvas')
    dartBoard.id = 'dart-board'
    dartBoard.height = 300
    dartBoard.width = 300
    drawCircle(dartBoard)
    win.appendChild(dartBoard)

    var numDartsLabel = document.createElement('p')
    numDartsLabel.innerHTML = 'Number of Darts'
    numDartsLabel.id = 'num-darts-label'
    win.appendChild(numDartsLabel)

    var numDartsInput = document.createElement('input')
    numDartsInput.id = 'num-darts-input'
    win.appendChild(numDartsInput)

    var boxSizeLabel = document.createElement('p')
    boxSizeLabel.innerHTML = 'Box Wall Length'
    boxSizeLabel.id = 'box-size-label'
    win.appendChild(boxSizeLabel)

    var boxSizeInput = document.createElement('input')
    boxSizeInput.id = 'box-size-input'
    win.appendChild(boxSizeInput)

    var startSim = document.createElement('button')
    startSim.innerHTML = 'Start Sim'
    startSim.className = 'start-sim-button'
    startSim.id = 'monte-carlo-start-sim-button'
    win.appendChild(startSim)

    var clearSimButton = document.createElement('button')
    clearSimButton.innerHTML = 'Clear Sim'
    clearSimButton.className = 'clear-sim-button'
    clearSimButton.id = 'monte-carlo-clear-sim-button'
    win.appendChild(clearSimButton)

    var simResult = document.createElement('p')
    simResult.className = 'sim-result-display'
    simResult.id = 'monte-carlo-sim-result-display'
    simResult.innerHTML = 'Pi calculated to be: '
    win.appendChild(simResult)

    return [numDartsInput, boxSizeInput, startSim, clearSimButton]
  }

  function drawCircle(dartBoard){
    var circle = dartBoard.getContext('2d')
    circle.beginPath()
    circle.arc(150, 150, 150, 0, 2 * Math.PI)
    circle.stroke()
  }

  function attachEvents(startSim, clearSimButton, dartsInput, boxInput){
    startSim.addEventListener('click', function(e){ runSim(dartsInput, boxInput) })
    clearSimButton.addEventListener('click', clearSim)
  }

  function calculate(boxSize, radiusSquared){
    var x = Math.random() * boxSize
    var y = Math.random() * boxSize
    var squaredDistFromCenter = Math.pow((x - boxSize / 2), 2) + Math.pow((y - boxSize / 2), 2)
    var inCircle = true
    if(squaredDistFromCenter > radiusSquared){
      inCircle = false
    }
    return[[x,y], inCircle]
  }

  function draw(coords, ctx, boxSize){
    var canvasX = coords[0] / boxSize * 300
    var canvasY = coords[1] / boxSize * 300
    ctx.fillRect(canvasX, canvasY, 1, 1)
  }

  function calculateAndDraw(numDarts, boxSize){
    var numInCircle = 0
    var area = boxSize * boxSize
    var ctx = document.getElementById('dart-board').getContext('2d')
    var radiusSquared = Math.pow(boxSize / 2, 2)
    for (var i = 0; i < numDarts; i++){
      var [coords, inCircle] = calculate(boxSize, radiusSquared)
      if(inCircle){ numInCircle++ }
      draw(coords, ctx, boxSize)
    }
    var pi = numInCircle / numDarts * Math.pow(boxSize, 2) / radiusSquared
    return pi
  }

  function runSim(dartsInput, boxInput){
    var numDarts = Number(dartsInput.value)
    var boxSize = Number(boxInput.value)
    if(isNaN(numDarts) || isNaN(boxSize)){
      alert('Invalid non-numeric input recieved, please fill out the boxes properly.')
      return null
    } else if (dartsInput.value == '' || boxInput.value == ''){
      alert('Invalid non-numeric input recieved, please fill out the boxes properly.')
      return null
    }else {
      var pi = calculateAndDraw(numDarts, boxSize)
    }
    document.getElementById('monte-carlo-sim-result-display').innerHTML = 'Pi calculated to be: ' + pi
  }

  function clearSim(){
    var dartBoard = document.getElementById('dart-board')
    dartBoard.getContext('2d').clearRect(0, 0, 300, 300)
    drawCircle(dartBoard)
    document.getElementById('monte-carlo-sim-result-display').innerHTML = 'Pi calculated to be: '
  }

  function runMonteCarloSim(win){
    document.getElementById('win-label').innerHTML = 'Monte-Carlo'
    var [dartsInput, boxInput, startSim, clearSimButton] = makeWidgets(win)
    attachEvents(startSim, clearSimButton, dartsInput, boxInput)
  }
  runMonteCarloSim(win)
}
