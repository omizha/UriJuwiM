<template lang="pug">
    vue-daum-map(:appKey="appKey",
        :center.sync="center",
        :level.sync="level",
        :mapTypeId="mapTypeId",
        :libraries="libraries",
        @load="onLoad",
        class="map")
</template>

<script>

import VueDaumMap from 'vue-daum-map'

export default {
    data () {
        return {
            appKey: 'ea759f9d1ec7daf12187874b7ad703a4', // 테스트용 appkey
            center: { lat: 37.449891, lng: 126.786562 }, // 지도의 중심 좌표
            level: 3, // 지도의 레벨(확대, 축소 정도),
            mapTypeId: VueDaumMap.MapTypeId.NORMAL, // 맵 타입
            libraries: [], // 추가로 불러올 라이브러리
            map: null // 지도 객체. 지도가 로드되면 할당됨.
        }
    },
    components: {
        VueDaumMap
    },
    methods: {
        onResize (event) {
            this.map.relayout()
        },
        onLoad (map) {
            this.map = map
        }
    },
    mounted () {
        window.addEventListener('resize', this.onResize)
    },
    beforeDestroy () {
        window.removeEventListener('resize', this.onResize)
    }
}
</script>

<style scoped>
    .map {
        width : 100%;
        height : 100%;
    }
</style>
