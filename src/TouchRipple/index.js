import objectAssign from 'object-assign'

const containerStyle = {
  position: 'absolute',
  overflow: 'hidden',
  left: '0px',
  right: '0px',
  top: '0px',
  bottom: '0px',
  pointerEvents: 'none',
}

export default function touchRipple(containerEl, targetEl, options = {}) {
  let disable = options.disable
  let center = options.center
  objectAssign(containerEl.style, containerStyle)
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
    let rippleRadius
    let pointerX
    let pointerY
    if (center) {
      rippleRadius = calcDiag(elWidth / 2, elHeight / 2)
      pointerX = elWidth / 2
      pointerY = elHeight / 2
    } else {
      const isTouchEvent = event.touches && event.touches.length
      const offset = getOffset()
      const pageX = isTouchEvent ? event.touches[0].pageX : event.pageX
      const pageY = isTouchEvent ? event.touches[0].pageY : event.pageY
      pointerX = pageX - offset.left
      pointerY = pageY - offset.top
      const topLeftDiag = calcDiag(pointerX, pointerY)
      const topRightDiag = calcDiag(elWidth - pointerX, pointerY)
      const botRightDiag = calcDiag(elWidth - pointerX, elHeight - pointerY)
      const botLeftDiag = calcDiag(pointerX, elHeight - pointerY)
      rippleRadius = Math.max(
        topLeftDiag, topRightDiag, botRightDiag, botLeftDiag,
      )
    }
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
  let lastRemoveRipple
  function handleMouseDown(event) {
    if (disable) {
      return
    }
    // 不是右键点击不做操作
    if (event.button !== 0) {
      return
    }
    const rippleEl = document.createElement('div')
    objectAssign(rippleEl.style, getRippleStyle(event), { transform: 'scale(0)', opacity: '0.1' })
    containerEl.appendChild(rippleEl)

    let times = 0
    function removeRipple() {
      if (times < 1) {
        times += 1
        return
      }
      rippleEl.addEventListener('transitionend', () => {
        containerEl.removeChild(rippleEl)
      })
      objectAssign(rippleEl.style, getRippleStyle(event), { opacity: '0' })
    }
    lastRemoveRipple = removeRipple
    // enter active
    window.requestAnimationFrame(() => {
      objectAssign(rippleEl.style, { transform: 'scale(1)' })
    })
    rippleEl.addEventListener('transitionend', () => {
      removeRipple()
    })
  }
  function handleMouseUp() {
    if (disable) {
      return
    }
    lastRemoveRipple()
  }
  targetEl.addEventListener('mousedown', handleMouseDown)
  targetEl.addEventListener('mouseup', handleMouseUp)

  return {
    disable() { disable = true },
    enable() { disable = false },
    setCenter(c) { center = !!c },
  }
}
