'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = touchRipple;

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var containerStyle = {
  position: 'absolute',
  overflow: 'hidden',
  left: '0px',
  right: '0px',
  top: '0px',
  bottom: '0px',
  pointerEvents: 'none'
};

function touchRipple(containerEl, targetEl) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var _disable = options.disable;
  var center = options.center;
  (0, _objectAssign2.default)(containerEl.style, containerStyle);
  function getOffset() {
    var rect = containerEl.getBoundingClientRect();
    return {
      top: rect.top + document.body.scrollTop,
      left: rect.left + document.body.scrollLeft
    };
  }
  function calcDiag(a, b) {
    return Math.sqrt(a * a + b * b);
  }
  function getRippleStyle(event) {
    var elHeight = containerEl.offsetHeight;
    var elWidth = containerEl.offsetWidth;
    var rippleRadius = void 0;
    var pointerX = void 0;
    var pointerY = void 0;
    if (center) {
      rippleRadius = calcDiag(elWidth / 2, elHeight / 2);
      pointerX = elWidth / 2;
      pointerY = elHeight / 2;
    } else {
      var isTouchEvent = event.touches && event.touches.length;
      var offset = getOffset();
      var pageX = isTouchEvent ? event.touches[0].pageX : event.pageX;
      var pageY = isTouchEvent ? event.touches[0].pageY : event.pageY;
      pointerX = pageX - offset.left;
      pointerY = pageY - offset.top;
      var topLeftDiag = calcDiag(pointerX, pointerY);
      var topRightDiag = calcDiag(elWidth - pointerX, pointerY);
      var botRightDiag = calcDiag(elWidth - pointerX, elHeight - pointerY);
      var botLeftDiag = calcDiag(pointerX, elHeight - pointerY);
      rippleRadius = Math.max(topLeftDiag, topRightDiag, botRightDiag, botLeftDiag);
    }
    var rippleSize = rippleRadius * 2 + 'px';
    var left = pointerX - rippleRadius + 'px';
    var top = pointerY - rippleRadius + 'px';

    var easeOut = 'cubic-bezier(0.23, 1, 0.32, 1)';
    return {
      position: 'absolute',
      backgroundColor: 'rgba(0, 0, 0, 0.87)',
      height: rippleSize,
      width: rippleSize,
      borderRadius: '50%',
      left: left,
      top: top,
      transition: 'opacity 450ms ' + easeOut + ', transform 450ms ' + easeOut
    };
  }
  var lastRemoveRipple = void 0;
  function handleMouseDown(event) {
    if (_disable) {
      return;
    }
    // 不是右键点击不做操作
    if (event.button !== 0) {
      return;
    }
    var rippleEl = document.createElement('div');
    (0, _objectAssign2.default)(rippleEl.style, getRippleStyle(event), { transform: 'scale(0)', opacity: '0.1' });
    containerEl.appendChild(rippleEl);

    var times = 0;
    function removeRipple() {
      if (times < 1) {
        times += 1;
        return;
      }
      rippleEl.addEventListener('transitionend', function () {
        containerEl.removeChild(rippleEl);
      });
      (0, _objectAssign2.default)(rippleEl.style, getRippleStyle(event), { opacity: '0' });
    }
    lastRemoveRipple = removeRipple;
    // enter active
    window.requestAnimationFrame(function () {
      (0, _objectAssign2.default)(rippleEl.style, { transform: 'scale(1)' });
    });
    rippleEl.addEventListener('transitionend', function () {
      removeRipple();
    });
  }
  function handleMouseUp() {
    if (_disable) {
      return;
    }
    lastRemoveRipple();
  }
  targetEl.addEventListener('mousedown', handleMouseDown);
  targetEl.addEventListener('mouseup', handleMouseUp);

  return {
    disable: function disable() {
      _disable = true;
    },
    enable: function enable() {
      _disable = false;
    },
    setCenter: function setCenter(c) {
      center = !!c;
    }
  };
}