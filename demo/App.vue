<template lang="html">
  <div id="app">
    <div class="left">
      <LeftNav />
    </div>
    <div class="right">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import '../src/paper.css'
import router from './router'
import LeftNav from './components/LeftNav'

export default {
  name: 'App',
  data() {
    return {}
  },
  computed: {},
  mounted() {},
  methods: {},
  components: { LeftNav },
  router,
}
</script>

<style lang="css">
*{
  margin: 0;
  padding: 0;
}

html, body{
  width: 100%;
  height: 100%;
}

</style>
<style media="screen" scoped>
#app{
  width: 100%;
  height: 100%;
  overflow: scroll;
  display: flex;
}
.left{
  width: 256px;
  height: 100%;
}
.right{
  flex: 1;
  overflow: scroll;
}
</style>
