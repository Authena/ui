<template lang="html">
  <nav class="nav paper-1">
    <ul >
      <LeftNavLinkWrap>
        <router-link to="/paper" class="link" exact>Paper</router-link>
      </LeftNavLinkWrap>
      <LeftNavLinkWrap>
        <router-link to="/touchripple" class="link" exact>Touch Ripple</router-link>
      </LeftNavLinkWrap>
    </ul>
  </nav>
</template>

<script>
import LeftNavLinkWrap from './LeftNavLinkWrap'

export default {
  name: 'LeftNav',
  components: { LeftNavLinkWrap },
}
</script>

<style lang="css" scoped>
.nav{
  width: 256px;
  height: 100%;
}
.link{
  display: block;
  padding: 16px;
  text-decoration: none;
  color: #000;
}
.link:hover{
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.1);
}
.router-link-active{
  background-color: #ddd;
}
</style>
