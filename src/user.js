class User {
  constructor() {
    this.id = 1 //hard coded
    this.constructor.all.push(this)
    this.picks = []
    this.populateWeekPicks()
  }

  populateWeekPicks(){
    fetch(`http://localhost:3000/api/v1/users/${this.id}/picks/`)
    .then(res => res.json())
    .then(json => {
      console.log(json);
    })
  }

  activateChoices(){

  }

  generatePicks(jFields){ //Arg = Array-like-object of each 'fieldset' element in the form
    const fields = Array.from(jFields)
    const choices = fields.map(field => {
      const newPick = new Pick(field)
      newPick.userId = this.id
      return newPick
    })
    this.postPicks(choices)
    this.updateOrAddPicks(choices)
  }

  updateOrAddPicks(newPicks){
    this.picks.filter(pick => newPicks.find(newPick => newPick.gameId === pick.gameId))
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
    .then(res => res.json())
    .then(json => console.log(json))
  }

  setCurrentUser(){
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
user.setCurrentUser()
