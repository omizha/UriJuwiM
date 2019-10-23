<template lang="pug">
    .explore
        el-button(type="primary", icon="el-icon-search", circle, @click="currentLocation")
        MapLoad
</template>

<script>
import MapLoad from '../components/MapLoad'

export default {
    components: {
        MapLoad
    },
    methods: {
        currentLocation () {
            this.$message.error('장비가 정지되었습니다.')
        }
    }
}
</script>

<style>

.explore {
    width : 100%;
    height : 100%;
}

.el-button {
    position : fixed;
    z-index : 1000;
    bottom : 100px;
    right : 40px;
    font-size : 48px;
}

</style>
