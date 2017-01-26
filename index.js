$(document).ready(function() {
  var proj = document.getElementById('projectile')
  var gun = document.getElementById('gun')
  gun.style.transform = "rotate(270deg)";
  var left = parseInt(proj.style.left, 10)
  var bottom = parseInt(proj.style.bottom, 10)
  var time = 0

  var angle = Math.PI * convertDegToRad(270)
  var velocity = 15
  var yVelocity = Math.sin(angle) * velocity
  var xVelocity = Math.cos(angle) * velocity

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

  window.requestAnimationFrame(xMovement)
  window.requestAnimationFrame(yMovement)
})
