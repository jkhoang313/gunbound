class Gun {
  constructor(tank, id) {
    this.angle = 0
    this.tank = tank
    this.gun = document.getElementById(`gun-${this.tank.id}`)
    this.absLeft = this.tank.absLeft + 14
    this.changeAngleText()
  }

  shoot() {
    var angle = this.angle
    this.gun.style.transform = `rotate(0deg)`
    $(`#gun-${this.tank.id}`).append('<div id="projectile" style="bottom: 1px; left: 4px;"></div>')
    var projectile = new Projectile(this.angle, 15, this)
    projectile.fire()
  }

  rotateGunLeft() {
    this.angle -= 1
    this.changeAngleText()
    this.gun.style.transform = `rotate(${this.angle}deg)`
  }

  rotateGunRight() {
    this.angle += 1
    this.changeAngleText()
    this.gun.style.transform = `rotate(${this.angle}deg)`
  }

  changeAngleText() {
    $('p.angle').html(`${this.angle} &#176`)
  }
}
