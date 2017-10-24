class User {
  constructor() {
    this.id = 1 //hard coded
    this.constructor.all.push(this)
  }

  activateChoices(){
    console.log('activate');
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

  static postPicks(picks){
    const userId = this.getCurrentUser()
    const json = JSON.stringify(picks)
    fetch(`http://localhost:3000/api/v1/users/${userId}/picks/`, {
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
}

User.all = []
const user = new User ()
user.setCurrentUser()
