<template lang="html">
  <div class="paper-route">
    <div class="paper paper-1">
    </div>
    <div class="paper paper-2">
    </div>
    <div class="paper paper-3">
    </div>
    <div class="paper paper-4">
    </div>
    <div class="paper paper-5">
    </div>
  </div>
</template>

<script>
export default {
  name: 'Paper',
}
</script>

<style media="screen" scoped>
  .paper-route{
    padding: 36px 48px;
  }
  .paper{
    width: 100px;
    height: 100px;
    margin-left: 20px;
  }
  .paper:first-child{
    margin-left: 0;
  }
</style>
