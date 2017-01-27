class Projectile {
  constructor(angle, velocity, gun) {
    this.proj = document.getElementById('projectile')
    this.relLeft = parseInt(this.proj.style.left, 10)
    this.bottom = parseInt(this.proj.style.bottom, 10)
    this.angle = Math.PI * (90 - angle)/180
    this.yVelocity = Math.sin(this.angle) * velocity
    this.xVelocity = Math.cos(this.angle) * velocity
    this.timeInAir = 0
    this.gun = gun
    this.absLeft = this.gun.absLeft + this.relLeft
    this.absRight = this.absLeft + 6
  }

  fire() {
    window.requestAnimationFrame(this.bothMovement.bind(this))
  }

  updateProjectile() {
    var gravity = .2*(this.timeInAir)
    //change gravity to make it believable
    this.bottom += (this.yVelocity - gravity)
    this.relLeft += this.xVelocity
    this.absLeft = this.gun.absLeft + this.relLeft
    this.absRight = this.absLeft + 6
  }

  checkCollision() {
    return this.hitTank(this.gun.tank.enemyTank) || this.hitTank(this.gun.tank) || this.relLeft < -1000 || this.relLeft > 1000 || this.bottom < 0
  }

  hitTank(tank) {
    if ((this.absLeft <= tank.absLeft && this.absLeft >= tank.absRight && this.bottom <= 0) || (this.absRight <= tank.absRight && this.absRight >= tank.absLeft && this.bottom <= 0)) {
      $('.test').html("hit")
      //
      tank.hp -= 1
      $(`p#tank-${tank.id}-health`).html(`${tank.hp}`)
      return true
    } else {
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
        this.gun.tank.game.nextTurn()
      }
    } else {
      this.updateProjectile()
      this.proj.style.bottom = `${this.bottom}px`
      this.proj.style.left = `${this.relLeft}px`
      this.timeInAir += 1
      window.requestAnimationFrame(this.bothMovement.bind(this))
    }
  }
}
