$(document).ready(function() {
  var proj = document.getElementById('projectile')
  var gun = document.getElementById('gun')
  var angle = 300
  gun.style.transform = `rotate(${angle}deg)`;
  var left = parseInt(proj.style.left, 10)
  var bottom = parseInt(proj.style.bottom, 10)
  var time = 0

  var shooting_angle = Math.PI * convertDegToRad(angle)
  var velocity = 13
  var yVelocity = Math.sin(shooting_angle) * velocity
  var xVelocity = Math.cos(shooting_angle) * velocity

  function yMovement() {
    var gravity = .3*(time)
    proj.style.bottom = `${bottom += (yVelocity - gravity)}px`
    window.requestAnimationFrame(yMovement)
    time += 1
  }

  function xMovement() {
    proj.style.left = `${left += xVelocity*.5}px`
    window.requestAnimationFrame(xMovement)
  }

  function convertDegToRad(deg) {
    return (360 - deg) / 180
  }

  document.addEventListener("keydown", moveGun)

  function moveGun(e) {
      if (e.which === 37) {
      moveGunLeft()
    } else if (e.which === 39) {
      moveGunRight()
    }
  }

  function moveGunLeft() {
    angle -= 20
    debugger
    gun.style.transform = `rotate(${angle}deg)`
  }

  function moveGunRight() {

  }

  window.requestAnimationFrame(xMovement)
  window.requestAnimationFrame(yMovement)
})
