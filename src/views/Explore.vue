<template lang="pug">
    .explore
        el-button(type="primary", icon="el-icon-search", circle, @click="currentLocation")
        MapLoad(v-bind:located="false" v-bind:entire="this.markers")
</template>

<script>
import MapLoad from '../components/MapLoad'
import Mockup from '@/assets/Mockup.json'

export default {
    components: {
        MapLoad
    },
    methods: {
        currentLocation () {
            this.$message.error('장비가 정지되었습니다.')
        }
    },
    computed: {
        markers: function () {
            let res = []
            for (let item in Mockup.__collections__.data) {
                let temp = Mockup.__collections__.data
                res.push([temp[item].W3W, temp[item].PlaceLocationDescription, temp[item].thumbnail])
            }
            return res
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
