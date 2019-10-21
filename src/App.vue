<template>
    <div id="app">
        <router-view></router-view>
        <el-row>
            <router-link to="/"><button>홈</button></router-link>
            <router-link to="/"><button>???</button></router-link>
            <router-link to="/search"><button>검색</button></router-link>
            <router-link to="/map_view"><button>지도</button></router-link>
        </el-row>
    </div>
</template>

<script>
export default {
    name: 'app',
    components: {
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
