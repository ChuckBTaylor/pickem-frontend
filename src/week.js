class Week {
  constructor(weekObj) {
    this.weekNumber = weekObj['week-number']
    this.games = weekObj.games

    this.constructor.all.push(this)
  }

  renderForm(){
    const form = document.getElementById(`pick-form`).innerHTML = `<input type='submit'>`
    this.games.forEach(game => {
      const newGame = new Game(game)
      newGame.render()
    })

  }

  alterPage(){
    document.getElementById(`week-header`).innerText = `Week #${this.weekNumber}`
  }

  static findByNumber(number){
    return this.all.find(week => week.weekNumber === number)
  }

  static findOrCreateByObj(weekObj){
    let week = this.findByNumber(weekObj['week-number'])
    if(!week){
      week = new Week(weekObj)
    }
    return week
  }

  static fetchByWeek(weekNumber){
    fetch(`http://localhost:3000/api/v1/weeks/${weekNumber}`)
    .then(res => res.json())
    .then(json => {
      const week = this.findOrCreateByObj(json.data.attributes)
      week.renderForm()
      week.alterPage()
      buttonLogic()
      User.getUserObject().activateChoices()

    })
  }

}

Week.all = []
