class Game {
  constructor () {
    this.turn = 0
    this.appendGuns()
    this.guns = [new Gun(this, 1), new Gun(this, 2)]
    this.gunOneCommand = this.guns[0].command.bind(this.guns[0])
    this.gunTwoCommand = this.guns[1].command.bind(this.guns[1])
  }

  startGame () {
    this.appendGuns.bind(this)
    this.newTurn()
  }

  appendGuns() {
      $('#game').append(`<div class='gun' id= 'gun-1'</div>`)
      $('#game').append(`<div class='gun' id= 'gun-2'</div>`)
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

      $(document).on("keydown", this.gunOneCommand)

    } else{
      $('p.player').html('Player Two')
      $('p.status').html('Move Your Tank')

      $(document).on("keydown", this.gunTwoCommand)

    }
    //add player one turn and player two turn
  }
}
