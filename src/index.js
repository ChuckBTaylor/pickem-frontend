var BASE_URL = "https://infinite-caverns-16143.herokuapp.com/api/v1"

window.onload = function(){
  setWeekOnPage(getCurrentWeek())
  getWeekFormData()
  buttonLogic()
  const rankingTable = new RankingTable
  addAllEventListeners()
}

function addAllEventListeners(){

  const form = document.getElementById('pick-form')
  form.addEventListener(`submit`, function(ev){
    ev.preventDefault()
    User.getUserObject().generatePicks(Array.from(ev.target).filter(field => field.nodeName === "FIELDSET"))
    // Pick.generatePicks(Array.from(ev.target).filter(field => field.nodeName === "FIELDSET"))
  })

  form.addEventListener('change', function(ev){
    ev.preventDefault()
    colorByTeam(ev)
  })

  form.addEventListener('click', function(ev){
    if (ev.target.nodeName === "DIV" && allowToMakeChanges()){
      divClickChangeEvent(ev)
      clearConfirm()
    }
  })

  document.getElementById(`btn-prev`).addEventListener('click', function (){
    setWeekOnPage(getWeekOnPage()-1)
    Week.fetchByWeek(getWeekOnPage())
  })

  document.getElementById(`btn-next`).addEventListener('click', function (){
    setWeekOnPage(getWeekOnPage() + 1)
    Week.fetchByWeek(getWeekOnPage())
  })

  document.getElementById(`login-form`).addEventListener('submit', function(ev){
    ev.preventDefault()
    User.login()
  })

  document.getElementById(`sign-up-form`).addEventListener('submit', function(ev){
    ev.preventDefault()
    User.signUp()
  })

}

function getStartDate(){
  return new Date("2017, September, 5")
}

function getTimeFromStartToNowInMiliseconds(){
  return Date.now() - getStartDate()
}

function getFirstGameDate(){
  return new Date(2017, 08, 07, 20, 15)
}

function setWeekOnPage(week){
  document.getElementById(`week-header`).innerText = `Week #${week}`
}

function getCurrentWeek(){
  return Math.floor(((getTimeFromStartToNowInMiliseconds()/1000)/(60*60*24))/7)+1
  // return 9
}

function getWeekFormData(){
  const week = getCurrentWeek()
  fetch(`${BASE_URL}/weeks/${week}`)
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

function weekIsOver(){
  const week = getWeekOnPage()
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

function getForm(){
  return document.getElementById('pick-form')
}

function divClickChangeEvent(ev){
  const inp = ev.target.querySelector('input')
  inp.checked = true
  const event = document.createEvent('HTMLEvents');
  event.initEvent('change', true, false);
  inp.dispatchEvent(event)
}

function showConfirm(){
  const div = document.getElementById(`confirm-div`)
  div.innerHTML = ""
  div.innerHTML = "<p>Picks Submitted</p>"
}

function clearConfirm(){
  const div = document.getElementById(`confirm-div`)
  console.log(div);
  if(div){
    div.innerHTML = ""
  }
}


function allowToMakeChanges(){
  let thursday = getFirstGameDate()
  thursday.setDate(thursday.getDate()+(7*(getWeekOnPage()-1)))
  if (Date.now() < thursday) {
    return true
  } else {
    return false
  }
}
