class User {
  constructor() {

  }

  static getCurrentUser(){
    return +document.getElementById(`user-id`).innerText
  }

  static postPicks(picks){
    const userId = this.getCurrentUser()
    const json = JSON.stringify({userId, picks})
    debugger
    fetch(`http://localhost:3000/api/v1/users/${userID}/picks/`, {
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
