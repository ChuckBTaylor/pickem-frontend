class Week {
  constructor(weekObj) {
    this.weekNumber = weekObj['week-number']
    this.games = weekObj.games
    this.id = weekObj.id

    this.constructor.all.push(this)
  }

  renderForm(){
    const form = document.getElementById(`pick-form`)
    form.innerHTML = ""
    this.renderSubmit(form)
    this.games.forEach(game => {
      const newGame = new Game(game)
      newGame.render()
    })
    User.getUserObject().activateChoices()
  }



  renderSubmit(form){
    if(this.renderSubmitLogic()){
      form.innerHTML = `<input type="submit">`
    }
  }

  renderSubmitLogic(){
    let thursday = getFirstGameDate()
    thursday.setDate(thursday.getDate()+(7*(this.weekNumber-1)))
    if (Date.now() < thursday) {
      return true
    } else {
      return false
    }
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
      week.alterPage()
      week.renderForm()
      buttonLogic()
    })
  }

}

Week.all = []
