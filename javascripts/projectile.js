class Projectile {
  constructor(angle, velocity, gun) {
    this.proj = document.getElementById('projectile')
    // have to append new proj not find existing one
    this.left = parseInt(this.proj.style.left, 10)
    this.bottom = parseInt(this.proj.style.bottom, 10)
    this.angle = Math.PI * (90-angle)/180
    this.yVelocity = Math.sin(this.angle) * velocity
    this.xVelocity = Math.cos(this.angle) * velocity
    this.time = 0
    this.gun = gun
  }

  fire() {
    // window.requestAnimationFrame(this.xMovement.bind(this))
    // window.requestAnimationFrame(this.yMovement.bind(this))
    var game = this.gun.game
    game.nextTurn()
  }


  yMovement() {
    var gravity = .3*(this.time)
    //change gravity to make it believable
    this.proj.style.bottom = `${this.bottom += (this.yVelocity - gravity)}px`
    window.requestAnimationFrame(this.yMovement.bind(this))
    this.time += 1
  }

  xMovement() {
    this.proj.style.left = `${this.left += this.xVelocity}px`
    window.requestAnimationFrame(this.xMovement.bind(this))
  }



}
