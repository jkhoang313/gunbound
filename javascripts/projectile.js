class Projectile {
  constructor(angle, velocity, gun) {
    this.proj = document.getElementById('projectile')
    this.relLeft = parseInt(this.proj.style.left, 10)
    this.bottom = parseInt(this.proj.style.bottom, 10)
    this.angle = Math.PI * (90 - angle)/180
    this.timeInAir = 0
    this.gun = gun
    this.game = this.gun.tank.game
    // this.windYVelocity = Math.sin(this.game.windAngle/180) * this.game.windSpeed
    // this.windXVelocity = Math.cos(this.game.windAngle/180) * this.game.windSpeed
    this.yVelocity = Math.sin(this.angle) * velocity
    this.xVelocity = Math.cos(this.angle) * velocity
    this.absLeft = this.gun.absLeft + this.relLeft
    this.absRight = this.absLeft + 6
  }

  fire() {
    window.requestAnimationFrame(this.bothMovement.bind(this))
  }

  updateProjectile() {
    var gravity = 15*(this.timeInAir)
    this.bottom += (this.yVelocity - gravity)
    this.relLeft += this.xVelocity
    this.absLeft = this.gun.absLeft + this.relLeft
    this.absRight = this.absLeft + 6
  }

  checkCollision() {
    return this.hitTank(this.gun.tank.enemyTank) || this.hitTank(this.gun.tank) || this.relLeft < -1000 || this.relLeft > 1000 || this.bottom < -20
  }

  hitTank(tank) {
    if ((this.absLeft <= tank.absLeft && this.absLeft >= tank.absRight && this.bottom <= 0) || (this.absRight <= tank.absRight && this.absRight >= tank.absLeft && this.bottom <= 0)) {
      $('.result').html("HIT")
      $('.result').css({background: "red"})
      setTimeout(function(){
        $('.result').html("")
      }, 2000);
      this.flashHP(tank)
      tank.hp -= 1
      $(`p#tank-${tank.id}-health`).html(`HP: ${tank.hp}`)
      return true
    } else {
      if (this.bottom < 0) {
        $('.result').html("MISS")
        $('.result').css({background: "green"})
        setTimeout(function(){
          $('.result').html("")
        }, 2000);
      }
      return false
    }
  }

  bothMovement() {
    if (this.checkCollision()) {
      this.proj.remove()
      if (this.gun.tank.hp === 0) {
        this.gun.tank.game.endGame()
      } else if (this.gun.tank.enemyTank.hp === 0) {
        this.gun.tank.game.endGame()
      } else {
        this.gun.tank.game.counter = 0
      }
    } else {
      this.updateProjectile()
      this.proj.style.bottom = `${this.bottom}px`
      this.proj.style.left = `${this.relLeft}px`
      this.timeInAir += 1/60
      window.requestAnimationFrame(this.bothMovement.bind(this))
    }
  }

  flashHP(tank) {
    var color
    if (tank.id === 1) {
      color = "yellow"
    } else if (tank.id === 2) {
      color = "purple"
    }
    $(`#player-${tank.id}-status`).css({background: "red"})
    setTimeout(function() {
      $(`#player-${tank.id}-status`).css({background: color})
      $('.result').css({background: color})
    }, 500)
    setTimeout(function() {
      $(`#player-${tank.id}-status`).css({background: "red"})
      $('.result').css({background: "red"})
    }, 1000)
    setTimeout(function() {
      $(`#player-${tank.id}-status`).css({background: color})
      $('.result').css({background: color})
    }, 1500)
  }
}
