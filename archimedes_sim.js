function archimedesWrapper (win){
  function makeWidgets(win){
    var drawing = document.createElement('canvas')
    drawing.id = 'archimedes-drawing'
    drawing.height = 400
    drawing.width = 400
    win.appendChild(drawing)
    drawCircle(drawing)

    var numSidesLabel = document.createElement('p')
    numSidesLabel.innerHTML = 'Number of Sides'
    numSidesLabel.id = 'num-sides-label'
    win.appendChild(numSidesLabel)

    var numSidesInput = document.createElement('input')
    numSidesInput.id = 'num-sides-input'
    win.appendChild(numSidesInput)

    var startSimButton = document.createElement('button')
    startSimButton.className = 'start-sim-button'
    startSimButton.id = 'archimedes-start-sim-button'
    startSimButton.innerHTML = 'Start Sim'
    win.appendChild(startSimButton)

    var clearSimButton = document.createElement('button')
    clearSimButton.className = 'clear-sim-button'
    clearSimButton.id = 'archimedes-clear-sim-button'
    clearSimButton.innerHTML = 'Clear Sim'
    win.appendChild(clearSimButton)

    var simResult = document.createElement('p')
    simResult.className = 'sim-result-display'
    simResult.id = 'archimedes-sim-result-display'
    simResult.innerHTML = 'Pi calculated to be: '
    win.appendChild(simResult)

    return [drawing, numSidesInput, startSimButton, clearSimButton, simResult]
  }

  function drawCircle(drawing){
    var ctx = drawing.getContext('2d')
    ctx.beginPath()
    ctx.arc(200, 200, 200, 0, 2 * Math.PI)
    ctx.stroke()
  }

  function getCircleCoords(numSides){
    var radius = 200
    var currentAngle = 0
    var coords = []
    for (var i = 0; i < numSides; i++){
      currentAngle = i / numSides * Math.PI * 2
      coords.push([Math.cos(currentAngle) * radius, Math.sin(currentAngle) * radius])
    }
    return coords
  }

  function drawPolygon(drawing, numSides){
    var xOffset = 200
    var yOffset = 200
    var intersectionCoords = getCircleCoords(numSides)
    var ctx = drawing.getContext('2d')
    for(var coords of intersectionCoords){
      ctx.lineTo(coords[0] + xOffset, coords[1] + yOffset)
      ctx.stroke()
    }
    ctx.lineTo(intersectionCoords[0][0] + xOffset, intersectionCoords[0][1] + yOffset)
    ctx.stroke()
  }

  function clearDrawing(drawing){
    drawing.getContext('2d').clearRect(0, 0, 400, 400)
    drawCircle(drawing)
  }

  function calcPI(numSides){
    var outsidePer = 4
    var insidePer = 4 / Math.sqrt(2)
    for (var i = 0; i < numSides; i++){
      outsidePer = 2 / (1 / insidePer + 1 / outsidePer)
      insidePer = Math.sqrt(insidePer * outsidePer)
    }
    return (outsidePer + insidePer) / 2
  }

  function beginSimulation(drawing, numSidesInput, simResult){
    var numSides = Number(numSidesInput.value)
    var result = null
    if(isNaN(numSides) || numSides == ''){
      alert('Invalid non-numeric input recieved, please fill out the box properly.')
      return result
    } else if(numSides < 100){
      drawPolygon(drawing, numSides)
      result = calcPI(numSides)
    } else {
      result = calcPI(numSides)
    }
    simResult.innerHTML = 'Pi calculated to be: ' + result
  }

  function clearSimulation(drawing, simResult){
    clearDrawing(drawing)
    simResult.innerHTML = 'Pi calculated to be: '
  }

  function attachEvents(drawing, numSidesInput, startSimButton, clearSimButton, simResult){
    startSimButton.addEventListener('click', function(){beginSimulation(drawing, numSidesInput, simResult)})
    clearSimButton.addEventListener('click', function(){clearSimulation(drawing, simResult)})
  }

  function runArchimedesSim(win){
    document.getElementById('win-label').innerHTML = 'Archimedes'
    var [drawing, numSidesInput, startSimButton, clearSimButton, simResult] = makeWidgets(win)
    attachEvents(drawing, numSidesInput, startSimButton, clearSimButton, simResult)
  }

  runArchimedesSim(win)
}
