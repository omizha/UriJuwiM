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
    },
    methods: {
        onResize (event) {
            var divApp = document.getElementById('app')

            divApp.style.width = window.innerWidth
            divApp.style.height = parseInt(window.innerHeight) - 60 + 'px'
        }
    },
    mounted () {
        window.addEventListener('resize', this.onResize)

        var divApp = document.getElementById('app')

        divApp.style.width = window.innerWidth
        divApp.style.height = parseInt(window.innerHeight) - 60 + 'px'
    },
    beforeDestroy () {
        window.removeEventListener('resize', this.onResize)
    }
}
</script>

<style>
html, body {
    width : 100%;
    height : 100%;
    overflow-x: hidden;
    margin : 0;

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
