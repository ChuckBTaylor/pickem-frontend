class User {
  constructor() {
    Pick.all = []
    this.constructor.all = []
    this.id = 1 //hard coded
    this.picks = []
    this.populateUserPicks()
    this.constructor.all.push(this)
  }

  //after new user load
  populateUserPicks(){
    fetch(`http://localhost:3000/api/v1/users/${this.id}/picks/`)
    .then(res => res.json())
    .then(json => {
      json.data.forEach(dbPick => {
        const newPick = Pick.createPickFromDatabase(dbPick)
        newPick.userId = this.id
        this.picks.push(newPick)
      })
    })
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
    fetch(`http://localhost:3000/api/v1/users/${this.id}/picks/`, {
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
}


  User.all = []
  const user = new User ()
  user.setCurrentUserOnPage()
