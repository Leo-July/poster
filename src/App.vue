<template>
  <div id="app">
    <Poster :bgImage="bgBase64" :local="true"/>
  </div>
</template>

<script>
import Poster from './components/Poster.vue'
import bgBase64 from './assets/bgBase64'
export default {
  name: 'app',
  components: {
    Poster
  },
  data(){
    return {bgBase64}
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
