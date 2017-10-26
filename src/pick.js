class Pick {
  constructor(field) {
    const reg = new RegExp(/\d+$/)
    this.gameId = field['game-id'] || +field.id.match(reg)[0]
    this.guessId = field['guess-id'] || +Array.from(field.children).filter(div => div.children[1].checked === true)[0].children[1].value
    this.weekNumber = field['week-number'] || getWeekOnPage()
    this.constructor.all.push(this)
  }

  static createPickFromDatabase(dbPick){
    const newPick = new Pick(dbPick.attributes)
    newPick.id = +dbPick.id
    return newPick
  }

}


// Array.from(f.children).filter(div => div.children[1].checked === true)[0].children[1].value
