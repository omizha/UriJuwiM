<template lang="pug">
    vue-daum-map(:appKey="appKey",
        :center.sync="center",
        :level.sync="level",
        :mapTypeId="mapTypeId",
        :libraries="libraries",
        @load="onLoad",
        class="map",
        ref="refMap")
</template>

<script>

// 현 위치에 빨간 점 생기게
import VueDaumMap from 'vue-daum-map'
import wk from '@/assets/keyw3w.js'
const www = require('w3w')(wk.key)

export default {
    data () {
        return {
            appKey: 'ea759f9d1ec7daf12187874b7ad703a4', // 테스트용 appkey
            center: { lat: 37.449891, lng: 126.786562 }, // 지도의 중심 좌표
            level: 3, // 지도의 레벨(확대, 축소 정도),
            mapTypeId: VueDaumMap.MapTypeId.NORMAL, // 맵 타입
            libraries: [], // 추가로 불러올 라이브러리
            map: null, // 지도 객체. 지도가 로드되면 할당됨.
            currentPosition: { lat: 37.449891, lng: 126.786562 },
            draggable: true,
            scrollwheel: true,

            latLng: null, // kakao.maps.LatLng
            marker: null, // kakao.maps.Marker
            infoWindow: null // kakao.maps.InfoWindow
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
            let temp = this
            if (navigator.geolocation) { // GPS를 지원하면
                navigator.geolocation.getCurrentPosition(function (position) {
                    temp.getLocationData(position.coords.latitude, position.coords.longitude)
                }, function (error) {
                    console.error(error)
                }, { })
            } else {
                this.$message.error('GPS를 지원하지 않습니다')
            }
        },
        getLocationData (lati, longi) {
            this.currentPosition = { lat: lati, lng: longi }
            this.center = this.currentPosition
        },
        displayMarker (locPosition, message) {
            // 마커를 생성합니다
            var marker = this.$refs.getMarker({
                map: this.map,
                position: locPosition
            })

            var iwContent = message // 인포윈도우에 표시할 내용
            var iwRemoveable = true

            // 인포윈도우를 생성합니다
            var infowindow = this.$refs.getInfoWindow({
                content: iwContent,
                removable: iwRemoveable
            })

            // 인포윈도우를 마커위에 표시합니다
            infowindow.open(this.map, marker)

            // 지도 중심좌표를 접속위치로 변경합니다
            this.map.setCenter(locPosition)
        },
        loactionw3w () {
            let geo = ''
            www.forward(this.$store.getters.getw3w).then((val) => {
                geo = val.geometry
                // this.getLocationData(geo.Lat, geo.Lng)
            })
            return geo
        }
    },
    created () {
    },
    mounted () {
        window.addEventListener('resize', this.onResize)
        this.loactionw3w()
    },
    beforeUpdate () {
    },
    beforeDestroy () {
        window.removeEventListener('resize', this.onResize)
    },
    computed: {
    }
}
</script>

<style scoped>
    .map {
        width : 100%;
        height : 100%;
    }
</style>
