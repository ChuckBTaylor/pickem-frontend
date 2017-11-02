class Game {
  constructor(gameObj) {
    this.homeTeam = Team.findOrCreateByObj(gameObj['home-team'])
    this.awayTeam = Team.findOrCreateByObj(gameObj['away-team'])
    this.winningTeam = gameObj['winning-team'] || null
    this.spread = gameObj.spread || 0
    this.id = gameObj.id
    this.constructor.all.push(this)
  }

  render(){
    const form = document.getElementById(`pick-form`)
    const game = document.createElement('fieldset')
    game.id = `field_game_${this.id}`

    game.className = `matchup-box`
    game.innerHTML = `
      <div class="away-team form-team left">
      <label for="team_${this.awayTeam.id}" ></label>
      <input type='radio' class='team-name radio-form' name="radio_game_${this.id}" value="${this.awayTeam.id}" id="team_${this.awayTeam.id}">${this.awayTeam.name} (${this.awayTeam.record[0]}-${this.awayTeam.record[1]})</input>
      </div>
      @
      <div class='home-team form-team right'>
      <label for="team_${this.homeTeam.id}"></label>
      <input type='radio' class='team-name radio-form' name="radio_game_${this.id}" value="${this.homeTeam.id}" id="team_${this.homeTeam.id}">${this.homeTeam.name} (${this.homeTeam.record[0]}-${this.homeTeam.record[1]})</input>
      </div>`

    form.prepend(game)
    if(this.winningTeam){
      const div = document.getElementById(`team_${this.winningTeam}`).parentElement
      div.className += " winning-team"
    }
  }

  static find(gameId){
    return this.all.find(game => game.id === gameId)
  }

}

Game.all = []
