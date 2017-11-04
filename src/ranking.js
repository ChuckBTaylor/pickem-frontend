var BASE_URL = "https://infinite-caverns-16143.herokuapp.com/api/v1"
class RankingTable {
  constructor() {
    this.fetchInfo()
    this.constructor.master = this
  }

  createTable(){
    const tableBody = document.getElementById(`ranking-table-body`)
    tableBody.innerHTML = ""
    const users = this.arrayOfUsersByWinsForWeek(getWeekOnPage())
    users.forEach((user, idx) => {
      const rank = users.length - idx
      const newRow = tableBody.insertRow(0)
      this.fillRow(newRow, user, rank)
    })
  }

  fillRow(row, user, rank){
    const cell1 = row.insertCell(0)
    const cell2 = row.insertCell(1)
    const cell3 = row.insertCell(2)
    const cell4 = row.insertCell(3)
    cell1.innerHTML = rank
    cell2.innerHTML = user.name
    cell3.innerHTML = user.thisWeek
    cell4.innerHTML = user.wins
  }

  arrayOfUsersByWinsForWeek(weekNum){
    console.log(this.winsByWeek, "this.winsByWeek");
    console.log(weekNum, "weekNum");
    this.compileUsersToOneObject(Object.assign(...this.winsByWeek[weekNum]))
    return this.sortUsersForWeek()
  }

  compileUsersToOneObject(winsForThisWeek){
    this.info.forEach(obj => obj.thisWeek = winsForThisWeek[obj.name])
  }

  sortUsersForWeek(){
    return this.info.sort(this.compareLogic)
  }

  compareLogic(a,b){
    if(a.thisWeek < b.thisWeek){
      return -1
    }
    if(a.thisWeek > b.thisWeek){
      return 1
    }
    return 0
  }


  fetchInfo(){
    fetch(`${BASE_URL}/usersby/wins`)
    .then(res => res.json())
    .then(json => {
      this.info = json
      fetch(`${BASE_URL}/weeks/userwins`)
      .then(res => res.json())
      .then(byWeek => {
        this.winsByWeek = byWeek
        this.createTable()
      })
    })
  }
}
