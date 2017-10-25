class Pick {
  constructor(field) {
    const reg = new RegExp(/\d+$/)
    this.gameId = +field.id.match(reg)[0]
    this.guessId = +Array.from(field.children).filter(div => div.children[1].checked === true)[0].children[1].value
    this.weekNumber = field['week-number'] || getWeekOnPage()
  }

  static createPickFromDatabase(pickObj){

  }
}


// Array.from(f.children).filter(div => div.children[1].checked === true)[0].children[1].value
