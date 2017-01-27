class Projectile {
  constructor(angle, velocity, gun) {
    this.proj = document.getElementById('projectile')
    this.relLeft = parseInt(this.proj.style.left, 10)
    this.bottom = parseInt(this.proj.style.bottom, 10)
    this.angle = Math.PI * (90 - angle)/180
    this.yVelocity = Math.sin(this.angle) * velocity
    this.xVelocity = Math.cos(this.angle) * velocity
    this.time = 0
    this.gun = gun
    this.absLeft = this.gun.absLeft + this.relLeft
    this.absRight = this.absLeft + 6
  }

  fire() {
    window.requestAnimationFrame(this.bothMovement.bind(this))
  }

  updateProjectile() {
    var gravity = .20*(this.time)
    //change gravity to make it believable
    this.relLeft += this.xVelocity
    this.absLeft = this.gun.absLeft + this.relLeft
    this.absRight = this.absLeft + 6
    this.bottom += (this.yVelocity - gravity)
  }

  checkCollision() {
    var left = parseInt(this.proj.style.left, 10)
    var bottom = parseInt(this.proj.style.bottom, 10)
    return this.hitTank(this.gun.tank.enemyTank) || this.hitTank(this.gun.tank) || left < -1000 || left > 1000 || bottom < 0
  }

  hitTank(tank) {
    if ((this.absLeft <= tank.absLeft && this.absLeft >= tank.absRight && this.bottom <= 0) || (this.absRight <= tank.absRight && this.absRight >= tank.absLeft && this.bottom <= 0)) {
      debugger
      $('.test').html("hit")
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
      window.requestAnimationFrame(this.bothMovement.bind(this))
      this.time += 1
    }
  }
}
