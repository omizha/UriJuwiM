<template>
    <div id="app">
        <router-view></router-view>
        <Nav></Nav>
    </div>
</template>

<script>
import Nav from './views/Nav.vue'

export default {
    name: 'app',
    components: {
        Nav
    }
}
</script>

<style>
html, body {
    width : 100%;
    height : 100%;
    overflow-x: hidden;
    text-decoration: none !important;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
