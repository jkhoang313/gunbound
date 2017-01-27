class Game {
  constructor () {
    this.turn = 0
    this.gun_one = new Gun(this)
    this.gun_two = new Gun(this)
    this.gun_command = this.gun_one.command.bind(this.gun_one)
  }

  nextTurn() {
    this.turn += 1
    this.newTurn()
  }

  newTurn() {
    $(document).on("keydown", this.gun_command)
    //add player one turn and player two turn
  }
}
