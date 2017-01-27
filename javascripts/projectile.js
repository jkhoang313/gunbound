class Projectile {
  constructor(angle, velocity, gun) {
    this.proj = document.getElementById('projectile')
    // have to append new proj not find existing one
    this.left = parseInt(this.proj.style.left, 10)
    this.bottom = parseInt(this.proj.style.bottom, 10)
    this.angle = Math.PI * (90 - angle)/180
    this.yVelocity = Math.sin(this.angle) * velocity
    this.xVelocity = Math.cos(this.angle) * velocity
    this.time = 0
    this.gun = gun
    this.absLeft = this.left + this.gun.left
  }

  fire() {
    window.requestAnimationFrame(this.bothMovement.bind(this))
  }

  absLeft() {
    this.absLeft = this.left + this.gun.left
  }
  checkCollision() {
    var left = parseInt(this.proj.style.left, 10)
    var bottom = parseInt(this.proj.style.bottom, 10)
    debugger
    return (left < -1000 || left > 1000 || bottom < 0) || (this.gun.left + 14 + left)
  }

  bothMovement() {
    var gravity = .25*(this.time)
    //change gravity to make it believable
    var game = this.gun.tank.game

    if (this.checkCollision(this.proj)) {
      this.proj.remove()
      game.nextTurn()
    } else {
      this.proj.style.bottom = `${this.bottom += (this.yVelocity - gravity)}px`
      this.proj.style.left = `${this.left += this.xVelocity}px`
      window.requestAnimationFrame(this.bothMovement.bind(this))
      this.time += 1
    }
  }
}
