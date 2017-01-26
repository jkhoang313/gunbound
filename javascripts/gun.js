class Gun {
  constructor(game) {
    this.angle = 0
    this.gun = document.getElementById('gun')
    this.gun.style.transform = `rotate(${this.angle}deg)`
    this.game = game
  }

  command(e) {
    if (e.which === 32) {
      document.addEventListener("keydown", this.rotateGun.bind(this))
      // put out in function
      // tank must know how to access 'this' for gun
    } else if (e.which === 37) {
      ///move tank left
    } else if (e.which === 39) {
      ///move tank right
    }
  }

  shoot() {
    var projectile = new Projectile(this.angle, 15, this)
    projectile.fire()
    //this.velocity instead of 15
  }

  rotateGun(e) {
    if (e.which === 32) {
      this.shoot()
    }
    else if (e.which === 37) {
      this.rotateGunLeft()
    } else if (e.which === 39) {
      this.rotateGunRight()
    }
  }

  rotateGunLeft() {
    this.angle -= 2
    gun.style.transform = `rotate(${this.angle}deg)`
  }

  rotateGunRight() {
    this.angle += 2
    gun.style.transform = `rotate(${this.angle}deg)`
  }
}
