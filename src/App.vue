<template>
  <div id="app">
    <Main/>
  </div>
</template>

<script>

import Main from './components/Main.vue'

export default {
  name: 'App',
  components: {
    Main
  }
}
</script>

<style>
body {
  width: 100%;
  height: 100%;
  position: absolute;
  background: #171849;
  background-size: 600% 100%;
}
#app {
  font-family: Montserrat;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding-top: 60px;
}

@keyframes gradient {
  0% {background-position: 0%}
  100% {background-position: 100%}
}
</style>
