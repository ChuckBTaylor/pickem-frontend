var BASE_URL = "https://infinite-caverns-16143.herokuapp.com/api/v1"
class User {
  constructor(id, attributes = {}) {
    document.getElementById('pick-form').reset()
    Pick.all = []
    this.constructor.all = []
    this.id = id
    this.wins = attributes.wins || "No Wins"
    this.name = attributes.name || "Really wrong"
    this.picks = []
    this.populateUserPicks()
    this.setCurrentUserOnPage()
    this.constructor.all.push(this)
  }

  //after new user load
  populateUserPicks(){
    fetch(`${BASE_URL}/users/${this.id}/picks/`)
    .then(res => res.json())
    .then(json => {
      json.data.forEach(dbPick => {
        const newPick = Pick.createPickFromDatabase(dbPick)
        newPick.userId = this.id
        this.picks.push(newPick)
      })
      this.winsThisWeek()

    })
  }

  winsThisWeek(){
    const weekPicks = this.picks.filter(pick => {
      return pick.weekNumber === getWeekOnPage()
    })
    const wins = weekPicks.filter(pick => {
      return Game.find(pick.gameId).winningTeam === pick.guessId
    })
    return wins.length
    }

  static clearAllBackgrounds(){
    const form = getForm()
    Array.from(form.children).forEach(field => Array.from(field.children).forEach(div => div.style.background = 'none'))
  }

  //Fills in forms with user's picks
  activateChoices(){
    const weekPicks = this.getPicksByWeek()

    weekPicks.forEach(pick => {
      const fieldset = document.getElementById(`field_game_${pick.gameId}`)
      const div = this.findDivToActivate(fieldset, pick.guessId)
      if(div){
        const team = Team.all.find(team => team.id === +div.children[1].value)
        this.colorAndActivate(div, team)
      }
    })
  }

  //searches each field for the correct div to activate
  findDivToActivate(fieldset, guess){
    return Array.from(fieldset.children).filter(div => +div.children[1].value === guess)[0]
  }

  colorAndActivate(div, team){
    div.style.background = team.color
    div.children[1].checked = true
  }

  //after form submit
  generatePicks(jFields){ //Arg = Array-like-object of each 'fieldset' element in the form
    const filtered = jFields.filter(field => Array.from(field.children).find(div => div.children[1].checked === true))
    if(filtered.length > 0){
      const choices = filtered.map(field => {
        const newPick = new Pick(field)
        newPick.userId = this.id
        return newPick
      })
      this.updateOrAddPicks(choices)
      this.postPicks(choices)
    }
  }

  updateOrAddPicks(newPicks){
    this.picks = this.picks.filter(pick => !newPicks.find(newPick => newPick.gameId === pick.gameId))
    newPicks.forEach(newPick => this.picks.push(newPick))
  }

  postPicks(newPicks){
    const json = JSON.stringify(newPicks)
    fetch(`${BASE_URL}/users/${this.id}/picks/`, {
      method: 'post',
      headers: {
        "Content-Type": 'application/json',
        'Accepts': 'application/json'
      },
      body: json
    })
  }

  getPicksByWeek(){
    const week = getWeekOnPage()
    return this.picks.filter(pick => pick.weekNumber === week)
  }

  setCurrentUserOnPage(){
    document.getElementById(`user-id`).innerText = this.id
    document.getElementById(`header`).innerText = this.name
    document.getElementById(`win-counter`).innerHTML = `Win count: ${this.wins}`
  }

  static getCurrentUser(){
    return +document.getElementById(`user-id`).innerText
  }

  static getUserObject(){
    return this.findById(this.getCurrentUser())
  }

  static findById(id){
    return this.all.find(user => user.id === id)
  }

  static login(){
    const field = document.getElementById(`user-name`)
    const name = field.value
    field.value = ""
    fetch(`${BASE_URL}/usersby/${name}`)
    .then(res => res.json())
    .then(json => this.userLogin(json.data))
  }

  static userLogin(json){
    this.clearAllBackgrounds()
    const user = new User(+json.id, json.attributes)
    Week.fetchByWeek(getWeekOnPage())
  }

  static signUp(){
    const inp = document.getElementById(`new-name`)
    const name = JSON.stringify(inp.value)
    inp.value = ""
    fetch(`${BASE_URL}/users`,
    {
      method: 'post',
      headers: {
        "Content-Type": 'application/json',
        Accepts: "application/json"
      },
      body: name
    })
    .then(res => res.json())
    .then(json => this.userLogin(json.data))
  }
}


  User.all = []
  // fetch(`${BASE_URL}/usersby/Al`)
  // .then(res => res.json())
  // .then(json => User.userLogin(json.data))
