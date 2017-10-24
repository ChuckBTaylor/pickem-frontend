class Pick {
  constructor(field) {
    this.game_id = +field.id.slice(-1)
    this.guess_id = +Array.from(field.children).filter(div => div.children[1].checked === true)[0].children[1].value
  }


  static generatePicks(jFields){
    const fields = Array.from(jFields)
    const choices = fields.map(field => {
      return new Pick(field)
    })
    User.postPicks(choices)
  }
}


// Array.from(f.children).filter(div => div.children[1].checked === true)[0].children[1].value
