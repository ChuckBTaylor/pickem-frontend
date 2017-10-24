window.onload = function(){
  getWeekFormData()
  // getAllWeeksFormData()
  addAllEventListeners()
}

function addAllEventListeners(){

  const form = document.getElementById('pick-form')
  form.addEventListener(`submit`, function(ev){
    ev.preventDefault()
    Pick.generatePicks(Array.from(ev.target).filter(field => field.nodeName === "FIELDSET"))
  })

  form.addEventListener('change', function(ev){
    colorByTeam(ev)
  })

  form.addEventListener('click', function(ev){
    if (ev.target.nodeName === "DIV"){
      console.log('div', ev.target.innerText);
    }
  })
}

function getCurrentWeek(){
  const week = Math.floor((((Date.now() - new Date("September 5, 2017"))/1000)/(60*60*24)/7))+1
  document.getElementById(`week-header`).innerText = `Week #${week}`
  return week
}

function getAllWeeksFormData(){
  fetch(`http://localhost:3000/api/v1/weeks/`)
  .then(res => res.json())
  .then(json => {
    populateForm(json.data[0].attributes.games)
  })
}

function getWeekFormData(){
  const week = getCurrentWeek()
  fetch(`http://localhost:3000/api/v1/weeks/${week}`)
  .then(res => res.json())
  .then(json => {
    populateForm(json.data.attributes.games)
  })
}


function populateForm(games){
  games.forEach(game => {
    newGame = new Game(game)
    newGame.render()
  })
}

function colorByTeam(ev){
  const color = Team.find(+ev.target.value).color
  const div = ev.target.parentElement
  Array.from(div.parentElement.children).forEach(child => {
    child.style.background = 'none'
  })
  div.style.background = color
}
