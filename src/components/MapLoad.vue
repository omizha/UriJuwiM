<template lang="pug">
    vue-daum-map(:appKey="appKey",
        :center.sync="center",
        :level.sync="level",
        :mapTypeId="mapTypeId",
        :libraries="libraries",
        @load="onLoad",
        @dragend="endDrag",
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
            center: { lat: 37.52922231983619, lng: 126.96517744007956 }, // 지도의 중심 좌표
            level: 8, // 지도의 레벨(확대, 축소 정도),
            mapTypeId: VueDaumMap.MapTypeId.NORMAL, // 맵 타입
            libraries: [], // 추가로 불러올 라이브러리
            map: null, // 지도 객체. 지도가 로드되면 할당됨.
            currentPosition: { lat: null, lng: null },
            draggable: false,
            scrollwheel: false,
            currentMarker: null,
            currentMarkerArray: [],
            mapProjection: null,

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
            // let thisBind = this
            this.map = map
            // let temp = this
            // if (navigator.geolocation) { // GPS를 지원하면
            //     navigator.geolocation.getCurrentPosition(function (position) {
            //         temp.getLocationData(position.coords.latitude, position.coords.longitude)
            //     }, function (error) {
            //         console.error(error)
            //         if (error.code === 1) {
            //             thisBind.$message.error({
            //                 type: 'error',
            //                 message: '해당 기기에서는 현재위치를 지원하지 않습니다.',
            //                 offset: 80
            //             })
            //         }
            //     }, { })
            // } else {
            //     this.$message.error({
            //         type: 'error',
            //         message: 'GPS를 지원하지 않습니다',
            //         offset: 80
            //     })
            // }
        },
        endDrag () {
            console.log({ center: this.center, level: this.level })
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
            let thisBind = this
            
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
                        thisBind.getLocationData(geo.lat, geo.lng)
                    }
                })
            }
        },
        getLocationCurrent () {
            this.mapProjection = this.map.getProjection()
            let thisBind = this
            if (navigator.geolocation) { // GPS를 지원하면
                navigator.geolocation.getCurrentPosition(function (position) {
                    thisBind.getLocationData(position.coords.latitude, position.coords.longitude)
                    
                    let locPosition = new window.kakao.maps.LatLng(position.coords.latitude, position.coords.longitude)

                    thisBind.$message({
                        type: 'success',
                        message: '현재 위치가 정상적으로 불러졌습니다',
                        offset: 80,
                        duration: 1000
                    })

                    thisBind.currentMarkerArray.push(locPosition)

                    if (thisBind.currentMarker != null) {
                        thisBind.currentMarker.setPosition(locPosition)
                        if (thisBind.currentMarkerArray[thisBind.currentMarkerArray.length - 2].Ga === 
                            thisBind.currentMarkerArray[thisBind.currentMarkerArray.length - 1].Ga) {
                            thisBind.currentMarkerArray.pop()
                        }
                    } else {
                        thisBind.currentMarker = new window.kakao.maps.Marker({  
                            map: thisBind.map, 
                            position: locPosition
                        })
                    }

                    console.log(thisBind.currentMarkerArray)
                }, function (error) {
                    console.error(error)
                    if (error.code === 1) {
                        thisBind.$message.error({
                            type: 'error',
                            message: '해당 기기에서는 현재위치를 지원하지 않습니다.',
                            offset: 80
                        })
                    }
                }, { 
                    enableHighAccuracy: true, 
                    maximumAge: 0, 
                    timeout: 27000
                })
            } else {
                thisBind.$message.error({
                    type: 'error',
                    message: 'GPS를 지원하지 않습니다',
                    offset: 80
                })
            }
            if (this.map.getLevel() > 3) {
                this.map.setLevel(3)
            }
        },
        aroundSeoul () {
            // let thisBind = this
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
                        temp.$router.push('/dashboard/' + datas[i][3])
                    })
                })
            }

            // if (navigator.geolocation) { // GPS를 지원하면
            //     navigator.geolocation.getCurrentPosition(function (position) {
            //         thisBind.getLocationData(position.coords.latitude, position.coords.longitude)
            //     }, function (error) {
            //         console.error(error)
            //         if (error.code === 1) {
            //             thisBind.$message.error({
            //                 type: 'error',
            //                 message: '해당 기기에서는 현재위치를 지원하지 않습니다.',
            //                 offset: 80
            //             })
            //         }
            //     }, { })
            // } else {
            //     // Seoul
            //     thisBind.getLocationData(75.05733500000002, 200.997985)
            //     thisBind.$message.error({
            //         type: 'error',
            //         message: 'GPS를 지원하지 않습니다',
            //         offset: 80
            //     })
            // }

            this.map.setLevel(8)
        },
        getcurrentMarkerArray () {
            return this.currentMarkerArray
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
