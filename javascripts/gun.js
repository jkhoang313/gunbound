class Gun {
  constructor(tank, id) {
    this.angle = 0
    this.tank = tank
    this.gun = document.getElementById(`gun-${this.tank.id}`)
    // this.gun.style.transform = `rotate(${this.angle}deg)`
    this.moveGun =  this.rotateGun.bind(this)
    this.absLeft = this.tank.absLeft + 14
    }

  shoot() {
    $(document).off("keydown", this.moveGun)
    $(`#gun-${this.tank.id}`).append('<div id="projectile" style="bottom: 1px; left: 4px;"></div>')
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
    this.angle -= 1
    this.gun.style.transform = `rotate(${this.angle}deg)`
  }

  rotateGunRight() {
    this.angle += 1
    this.gun.style.transform = `rotate(${this.angle}deg)`
  }
}
