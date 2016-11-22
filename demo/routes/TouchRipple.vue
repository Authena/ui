<template lang="html">
  <div class="touchRipple">
    <button ref="button" type="button" class="touchButton" id="button">
      Click Me
      <div ref="container"></div>
    </button>
  </div>
</template>

<script>
import touchRipple from '../../src/TouchRipple'

export default {
  name: 'TouchRipple',
  mounted() {
    touchRipple(this.$refs.container, this.$refs.button)
  },
}
</script>

<style lang="css" scoped>
  .touchRipple{
    padding: 24px 48px;
  }
  .touchButton {
    position: relative;
    padding: 8px 16px;
    border-radius: 2px;
    border: 0;
    outline: 0;
    background-color: rgb(42, 222, 222);
    cursor: pointer;
  }
</style>
