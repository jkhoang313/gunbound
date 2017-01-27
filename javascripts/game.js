class Game {
  constructor () {
    this.turn = 0
    this.appendTanks()
    this.tanks = [new Tank(this, 1), new Tank(this, 2)]
    this.command = this.commandTank.bind(this)
  }

  startGame () {
    this.tanks.forEach(function(tank, index, tanks) {
      tank.findEnemyTank.call(tank)
      $(`p#tank-${tank.id}-health`).html(`${tank.hp}`)
    })
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
    this.countdownTimer()
    var startTime = new Date


    var player = this.turn % 2 + 1
    $('p.player').html(`Player ${player}'s Turn`)
    $(document).on("keydown", this.command)
  }

  countdownTimer() {
    setInterval(function() {
      var endTime = new Date
      $('.test').html(`${endTime}`)
    }, 1000)
  }

  commandTank(e) {
    var tank
    if (this.turn % 2 === 0) {
      tank = this.tanks[0]
    } else {
      tank = this.tanks[1]
    }

    if (e.which === 32) {
      $(document).off("keydown", this.command)
      tank.gun.shoot()
    } else if (e.which === 37) {
      tank.moveTankLeft()
    } else if (e.which === 39) {
      tank.moveTankRight()
    } else if (e.which === 38) {
      tank.gun.rotateGunRight()
    } else if (e.which === 40) {
      tank.gun.rotateGunLeft()
    }
  }

  endGame() {
    if (this.tanks[0].hp === 0) {
      $('p.player').html('Terminator')
      //change later to accept players
    } else if (this.tanks[1].hp === 0) {
      $('p.player').html('Red Baron')
    }
    $('p.status').html('Wins')
  }
}
