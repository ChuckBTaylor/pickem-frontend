class Team {
  constructor(teamObj) {
    this.name = teamObj.name
    this.id = teamObj.id
    this.color = teamObj['team-color']
    this.constructor.all.push(this)
  }

  static findByName(name){
    return this.all.find(team => team.name === name)
  }

  static findOrCreateByObj(teamObj){
    let team = this.findByName(teamObj.name)
    if (team) {
      return team
    } else {
      return new Team(teamObj)
    }
  }

  static find(id){
    return this.all.find(team => team.id === id)
  }

}

Team.all = []
