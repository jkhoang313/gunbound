class Game {
  constructor () {
    this.turn = 0
    this.appendTanks()
    this.tanks = [new Tank(this, 1), new Tank(this, 2)]
  }

  startGame () {
    this.newTurn()
  }

  appendTanks() {
    $('#game').append("<div class='tank' id='tank-1' style='left: 200px;'></div>")
    $('#game').append("<div class='tank' id='tank-2' style='left: 670px;'></div>")
  }

  nextTurn() {
    this.turn += 1
    this.newTurn()
  }

  newTurn() {
    var player = this.turn % 2
    if (player === 0) {
      $('p.player').html('Player One')
      $('p.status').html('Move Your Tank')
      $(document).on("keydown", this.tanks[0].tankCommand)

    } else{
      $('p.player').html('Player Two')
      $('p.status').html('Move Your Tank')

      $(document).on("keydown", this.tanks[1].tankCommand)

    }
    //add player one turn and player two turn
  }
}
