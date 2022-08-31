<template>
  <router-view></router-view>
  <MusicFooter v-show="$store.state.isMusicFooterShow" />
</template>

<script>
import MusicFooter from './components/MusicFooter/MusicFooter.vue'
export default {
  components: {
    MusicFooter
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.icon {
  width: 1.6rem;
  height: 1.6rem;
}

a {
  color: black;
}
</style>
