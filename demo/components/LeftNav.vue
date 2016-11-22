<template lang="html">
  <nav class="nav paper-1">
    <ul >
      <li>
        <router-link to="/paper" class="link" exact>Paper</router-link>
        <router-link to="/touchripple" class="link" exact>Touch Ripple</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'LeftNav',
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
