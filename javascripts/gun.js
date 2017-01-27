class Gun {
  constructor(game, id) {
    this.angle = 0
    this.id = id
    this.gun = document.getElementById(`gun-${this.id}`)
    this.gun.style.transform = `rotate(${this.angle}deg)`
    this.game = game
    this.moveGun =  this.rotateGun.bind(this)
  }

  command(e) {
    if (e.which === 32) {
      if (this.id === 1) {
        $(document).off("keydown", this.game.gunOneCommand)
        $('p.status').html('Aim Your Gun')

      } else if (this.id === 2) {
        $(document).off("keydown", this.game.gunTwoCommand)
        $('p.status').html('Aim Your Gun')
      }

      $(document).on("keydown", this.moveGun)
    }
      // put out in function
      // tank must know how to access 'this' for gun
    // } else if (e.which === 37) {
    //   ///move tank left
    // } else if (e.which === 39) {
    //   ///move tank right
    // }
  }

  shoot() {
    $(document).off("keydown", this.moveGun)
    $(`#gun-${this.id}`).append('<div id="projectile" style="bottom: 0px; left: 4px;"></div>')
    var projectile = new Projectile(this.angle, 17, this)
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
    this.gun.style.transform = `rotate(${this.angle}deg)`
  }

  rotateGunRight() {
    this.angle += 2
    this.gun.style.transform = `rotate(${this.angle}deg)`
  }
}
