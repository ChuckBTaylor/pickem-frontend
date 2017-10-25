class Game {
  constructor(gameObj) {
    this.homeTeam = Team.findOrCreateByObj(gameObj['home-team'])
    this.awayTeam = Team.findOrCreateByObj(gameObj['away-team'])
    this.spread = gameObj.spread || 0
    this.id = gameObj.id
  }

  render(){
    const form = document.getElementById(`pick-form`)
    const game = document.createElement('fieldset')
    game.id = `field_game_${this.id}`
    game.innerHTML = `
      <div>
      <label for="team_${this.awayTeam.id}" ></label>
      <input type='radio' name="radio_game_${this.id}" value="${this.awayTeam.id}" id="team_${this.awayTeam.id}">${this.awayTeam.name}</input>
      </div><div>
      <label for="team_${this.homeTeam.id}"></label>
      <input type='radio' name="radio_game_${this.id}" value="${this.homeTeam.id}" id="team_${this.homeTeam.id}">${this.homeTeam.name}</input>
      </div>`

    form.prepend(game)
  }
}
