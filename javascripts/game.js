class Game {
  constructor () {
    this.turn = 0
  }

  nextTurn() {
    debugger
    this.turn += 1
  }


  start() {
    var gun_one = new Gun(this)
    var gun_two = new Gun(this)
    //gun_two = new Gun

    //game -> tank -> gun
    //gun_one is stand in for tank right now

    if (this.turn % 2 == 0) {
      //player ones turn
      document.addEventListener("keydown", gun_one.command.bind(gun_one))
    } else {
      //player twos turn
      document.addEventListener("keydown", gun_two.command.bind(gun_two))
    }
  }
}
