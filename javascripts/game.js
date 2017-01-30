class Game {
  constructor () {
    this.turn = 0
    this.appendTanks()
    this.tanks = [new Tank(this, 1), new Tank(this, 2)]
    this.command = this.commandTank.bind(this)
    this.counter = 20
    this.timer = this.countdown.call(this)
    // this.windAngle = Math.floor(Math.random() * 360)
    // this.windSpeed = Math.floor(Math.random() * 3)
  }

  startGame () {
    this.tanks.forEach(function(tank, index, tanks) {
      tank.findEnemyTank.call(tank)
      $(`p#tank-${tank.id}-health`).html(`HP: ${tank.hp}`)
    })
    this.newTurn()
  }

  appendTanks() {
    $('#game').append("<div class='tank' id='tank-1' style='left: 90px;'><div class='cover'><div class='wheel-1'><div class='rim-1'></div></div><div class='wheel-2'><div class='rim-1'></div></div></div></div>")
    $('#game').append("<div class='tank' id='tank-2' style='left: 670px;'><div class='cover'><div class='wheel-1'><div class='rim-1'></div></div><div class='wheel-2'><div class='rim-1'></div></div></div></div>")
  }

  nextTurn() {
    this.turn += 1
    this.counter = 15
    setTimeout(this.newTurn.bind(this), 1000)
  }

  newTurn() {
    this.timer
    $('p.angle').html(`0 &#176`)
    var player = this.turn % 2 + 1
    $('p.player').html(`Player ${player}'s Turn`)
    if (player === 1) {
      $('.result').css({background: "yellow"})
      $('#status').css({background: "yellow"})
      $('.angle').css({background: "yellow"})
      $('.timer').css({background: "yellow"})
    } else if (player === 2) {
      $('.result').css({background: "purple"})
      $('#status').css({background: "purple"})
      $('.angle').css({background: "purple"})
      $('.timer').css({background: "purple"})
    }
    $(document).on("keydown", this.command)
  }

  countdown() {
    var self = this
    $('.timer').html(`${this.counter}`)
    setInterval(function() {
      self.countDownTimer()
    }, 1000)
  }

  countDownTimer() {
      if (this.counter === 0) {
        clearInterval(this.timer)
        $(document).off("keydown", this.command)
        this.nextTurn()
      } else if (this.counter === -1) {
      } else {
        this.counter -= 1
        $('.timer').html(`${this.counter}`)
      }
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
    this.counter = -1
    if (this.tanks[0].hp === 0) {
      $('p.player').html('Terminator')
      //change later to accept players
    } else if (this.tanks[1].hp === 0) {
      $('p.player').html('Red Baron')
    }
    $('p.status').html('Wins')
  }
}
