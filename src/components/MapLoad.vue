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
import VueDaumMap from 'vue-daum-map'
import wk from '@/assets/keyw3w.js'
const www = require('w3w')(wk.key)

export default {
    props: ['located', 'entire'],
    data () {
        return {
            appKey: 'ea759f9d1ec7daf12187874b7ad703a4', // 테스트용 appkey
            center: { lat: 37.449891, lng: 126.786562 }, // 지도의 중심 좌표
            level: 3, // 지도의 레벨(확대, 축소 정도),
            mapTypeId: VueDaumMap.MapTypeId.NORMAL, // 맵 타입
            libraries: [], // 추가로 불러올 라이브러리
            map: null, // 지도 객체. 지도가 로드되면 할당됨.
            currentPosition: { lat: 37.449891, lng: 126.786562 },
            draggable: false,
            scrollwheel: false,

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
            if (isNaN(lati) || isNaN(longi)) {
                console.error('올바르지 않은 인자가 전달 되었습니다')
                return
            }
            this.currentPosition = { lat: lati, lng: longi }
            this.center = this.currentPosition
        },
        displayMarker () {
            let imageSrc = 'https://raw.githubusercontent.com/maemesoft/UriJuwiM/master/src/assets/img/marker_pin.png'
            let imageSize = new window.kakao.maps.Size(48, 48)
            let imageOption = { offset: new window.kakao.maps.Point(24, 48) }
            let markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption)
            let parser = this.wloca

            for (let i = 0; i < parser.length; ++i) {
                www.forward(parser[i]).then((val) => {
                    let geo = val.geometry
                    let angle = new window.kakao.maps.LatLng(geo.lat, geo.lng)

                    var marker = new window.kakao.maps.Marker({
                        map: this.map,
                        position: angle,
                        image: markerImage
                    })
                    marker.getMap()
                    if (!i) {
                        this.getLocationData(geo.lat, geo.lng)
                    }
                })
            }
        },
        aroundSeoul () {
            let datas = this.entireMarkers

            for (let i = 0; i < datas.length; ++i) {
                www.forward(datas[i][0]).then((res) => {
                    let ltlg = res.geometry
                    let geolocation = new window.kakao.maps.LatLng(ltlg.lat, ltlg.lng)
                    let imageSrc = 'https://raw.githubusercontent.com/maemesoft/UriJuwiM/master/src/assets/img/marker_pin.png'
                    let imageSize = new window.kakao.maps.Size(48, 48)
                    let imageOption = { offset: new window.kakao.maps.Point(24, 48) }
                    let markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption)

                    var marker = new window.kakao.maps.Marker({
                        map: this.map,
                        position: geolocation,
                        clickable: true,
                        image: markerImage
                    })

                    // let thum = '<div><img style="width: 150px; height: 150px" src=' + '\'https://raw.githubusercontent.com/maemesoft/UriJuwiM/master/src/assets/img/thumbnail/' + datas[i][2] + '\'alt="이미지 로드 실패"/><p> ' + datas[i][1] + ' </p></div>'
                    // var infowindow = new window.kakao.maps.InfoWindow({
                    //     position: geolocation,
                    //     content: thum,
                    //     title: datas[i][1],
                    //     removable: true
                    // })

                    marker.setMap(this.map)
                    var temp = this
                    // 마커에 클릭이벤트를 등록합니다
                    window.kakao.maps.event.addListener(marker, 'click', function () {
                        // console.log(datas[i][3])
                        temp.$router.push('/dashboard/' + datas[i][3])
                    })
                })
            }

            if (navigator.geolocation) { // GPS를 지원하면
                navigator.geolocation.getCurrentPosition(function (position) {
                    this.getLocationData(position.coords.latitude, position.coords.longitude)
                }, function (error) {
                    console.error(error)
                }, { })
            } else {
                // Seoul
                this.getLocationData(75.05733500000002, 200.997985)
                this.$message.error('GPS를 지원하지 않습니다')
            }

            this.map.setLevel(9)
        }
    },
    mounted () {
        window.addEventListener('resize', this.onResize)
        setTimeout(() => {
            if (this.wloca) {
                this.displayMarker()
            } else {
                this.aroundSeoul()
            }
        }, 470)
    },
    beforeDestroy () {
        window.removeEventListener('resize', this.onResize)
    },
    computed: {
        geocode: function () {
            return this.$store.getters.getGeo
        },
        wloca: function () {
            return this.$props.located
        },
        entireMarkers: function () {
            return this.$props.entire
        }
    }
}
</script>

<style scoped>
    .map {
        width : 100%;
        height : 100%;
    }
</style>
