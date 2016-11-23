<template lang="html">
  <li ref="target">
    <slot></slot>
    <div ref="rippleContainer"></div>
  </li>
</template>

<script>
import touchRipple from '../../src/TouchRipple'

export default {
  name: 'LeftNavLinkWrap',
  mounted() {
    touchRipple(this.$refs.rippleContainer, this.$refs.target)
  },
}
</script>

<style lang="css" scoped>
  li{
    position: relative;
  }
</style>
