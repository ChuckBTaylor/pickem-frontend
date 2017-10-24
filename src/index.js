window.onload = function(){
  getWeekFormData()
  buttonLogic()
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

  document.getElementById(`btn-prev`).addEventListener('click', function (){
    Week.fetchByWeek(getWeekOnPage() - 1)
  })
  document.getElementById(`btn-next`).addEventListener('click', function (){
    Week.fetchByWeek(getWeekOnPage() + 1)
  })

}

function getCurrentWeek(){
  // const week = Math.floor((((Date.now() - new Date("September 5, 2017"))/1000)/(60*60*24)/7))+1
  const week = 7
  document.getElementById(`week-header`).innerText = `Week #${week}`
  return week
}

function getWeekFormData(){
  const week = getCurrentWeek()
  fetch(`http://localhost:3000/api/v1/weeks/${week}`)
  .then(res => res.json())
  .then(json => {
    const week = Week.findOrCreateByObj(json.data.attributes)
    week.renderForm()
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

function getWeekOnPage(){
  return +document.getElementById(`week-header`).innerText.match(/\d+$/)[0]
}

function buttonLogic(){
  const week = getWeekOnPage()
  const next = document.getElementById(`btn-next`)
  next.disabled = false
  const prev = document.getElementById(`btn-prev`)
  prev.disabled = false
  if(week === 17){
    next.disabled = true
  } else if (week === 1) {
    prev.disabled = true
  }
}
