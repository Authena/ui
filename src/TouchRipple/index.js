import objectAssign from 'object-assign'

const containerStyle = {
  position: 'absolute',
  overflow: 'hidden',
  left: '0px',
  right: '0px',
  top: '0px',
  bottom: '0px',
  pointerEvent: 'none',
}

export default function touchRipple(containerEl, targetEl, style) {
  objectAssign(containerEl.style, containerStyle, style)
  function getOffset() {
    const rect = containerEl.getBoundingClientRect()
    return {
      top: rect.top + document.body.scrollTop,
      left: rect.left + document.body.scrollLeft,
    }
  }
  function calcDiag(a, b) {
    return Math.sqrt((a * a) + (b * b))
  }
  function getRippleStyle(event) {
    const elHeight = containerEl.offsetHeight
    const elWidth = containerEl.offsetWidth
    const isTouchEvent = event.touches && event.touches.length
    const offset = getOffset()
    const pageX = isTouchEvent ? event.touches[0].pageX : event.pageX
    const pageY = isTouchEvent ? event.touches[0].pageY : event.pageY
    const pointerX = pageX - offset.left
    const pointerY = pageY - offset.top
    const topLeftDiag = calcDiag(pointerX, pointerY)
    const topRightDiag = calcDiag(elWidth - pointerX, pointerY)
    const botRightDiag = calcDiag(elWidth - pointerX, elHeight - pointerY)
    const botLeftDiag = calcDiag(pointerX, elHeight - pointerY)
    const rippleRadius = Math.max(
      topLeftDiag, topRightDiag, botRightDiag, botLeftDiag,
    )
    const rippleSize = `${rippleRadius * 2}px`
    const left = `${pointerX - rippleRadius}px`
    const top = `${pointerY - rippleRadius}px`

    const easeOut = 'cubic-bezier(0.23, 1, 0.32, 1)'
    return {
      position: 'absolute',
      backgroundColor: 'rgba(0, 0, 0, 0.87)',
      height: rippleSize,
      width: rippleSize,
      borderRadius: '50%',
      left,
      top,
      transition: `opacity 450ms ${easeOut}, transform 450ms ${easeOut}`,
    }
  }
  function handleMouseDown(event) {
    const rippleEl = document.createElement('div')
    objectAssign(rippleEl.style, getRippleStyle(event), { transform: 'scale(0)', opacity: '0.3' })
    containerEl.appendChild(rippleEl)

    // enter active
    window.requestAnimationFrame(() => {
      objectAssign(rippleEl.style, { transform: 'scale(1)' })
    })
  }
  function handleMouseUp() {
    // el.removeChild(rippleEl)
  }
  targetEl.addEventListener('mousedown', handleMouseDown)
  targetEl.addEventListener('mouseup', handleMouseUp)
}
