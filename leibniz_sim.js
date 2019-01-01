function leibnizWrapper(win){
  function makeWidgets(win){
    var numItersLabel = document.createElement('p')
    numItersLabel.id = 'num-iters-label'
    numItersLabel.innerHTML = 'Number of Terms to Sum: '
    win.appendChild(numItersLabel)

    var numItersInput = document.createElement('input')
    numItersInput.id = 'num-iters-input'
    win.appendChild(numItersInput)

    var startSim = document.createElement('button')
    startSim.innerHTML = 'Start Sim'
    startSim.className = 'start-sim-button'
    startSim.id = 'leibniz-start-sim-button'
    win.appendChild(startSim)

    var clearSim = document.createElement('button')
    clearSim.innerHTML = 'Clear Sim'
    clearSim.className = 'clear-sim-button'
    clearSim.id = 'leibniz-clear-sim-button'
    win.appendChild(clearSim)

    var simResult = document.createElement('p')
    simResult.className = 'sim-result-display'
    simResult.id = 'leibniz-sim-result-display'
    simResult.innerHTML = 'Pi calculated to be: '
    win.appendChild(simResult)

    return [startSim, clearSim, simResult, numItersInput]
  }

  function calculateResult(iters){
    var result = 0
    var isNeg = true
    for (var i=0; i< iters; i++){
      if(isNeg){
        isNeg = false
        result += 1 / (2*i + 1)
      } else {
        isNeg = true
        result += (-1) / (2*i + 1)
      }
    }
    return result * 4
  }

  function beginSimulation(startSim, clearSim, simResult, numItersInput){
    var iters = Number(numItersInput.value)
    var result = null
    if(isNaN(iters)){
      alert('Invalid non-numeric input recieved, please fill out the box properly.')
      return result
    } else {
      result = calculateResult(iters)
      simResult.innerHTML = 'Pi calculated to be: ' + result
    }
  }

  function clearSimulation(simResult){
    simResult.innerHTML = 'Pi calculated to be: '
  }

  function attachEvents(startSim, clearSim, simResult, numItersInput){
    startSim.addEventListener('click', function(){beginSimulation(startSim, clearSim, simResult, numItersInput)})
    clearSim.addEventListener('click', function(){clearSimulation(simResult)})
  }

  function runLeibnizSim(win){
    document.getElementById('win-label').innerHTML = 'Leibniz'
    var [startSim, clearSim, simResult, numItersInput] = makeWidgets(win)
    attachEvents(startSim, clearSim, simResult, numItersInput)
  }

  runLeibnizSim(win)
}
