<template lang="pug">
    .frame
        uppernav
        p5(v-if="drawable" ref="p5Ref" v-show="isAdvanture" class="processing" v-on="{setup, draw}")
        .explore
            el-switch(class="boolAdvanture" v-model="isAdvanture")
            el-button(type="primary", id="findBtn" icon="el-icon-search", circle, @click="currentLocation")
            MapLoad(ref="mapRef" v-bind:located="false" v-bind:entire="this.markers")
</template>

<script>
import MapLoad from '../components/MapLoad'
import Mockup from '@/assets/Mockup.json'
import uppernav from '../components/UpperNav.vue'

import p5 from 'vue-p5'

export default {
    components: {
        MapLoad,
        uppernav,
        p5
    },
    data () {
        return {
            drawable: true,
            alphaC: null,
            layer: null,
            isAdvanture: false,
            mapProjection: null
        }
    },
    methods: {
        setup (v) {
            v.createCanvas(v.windowWidth, v.windowHeight - 120)
            v.fill(0, 230)
            v.rect(-5000, -5000, v.windowWidth + 10000, v.windowHeight + 10000)
        },
        draw (v) {
            // v.blendMode(v.REPLACE)
            v.fill(0, 230)
            // v.push()
            v.fill(255, 255)
            // v.blendMode(v.REMOVE)
            if (this.$refs.mapRef.currentMarkerArray.length > 0) {
                // for (let i in this.$refs.mapRef.getcurrentMarkerArray()) {
                //     v.ellipse(this.$refs.mapRef.mapProjection.containerPointFromCoords(i).x, this.$refs.mapRef.mapProjection.containerPointFromCoords(i).y, 100, 100)
                //     console.log(this.$refs.mapRef.mapProjection.containerPointFromCoords(i))
                // }
            }
            // v.blendMode(v.REPLACE)
            // v.pop()
        },
        currentLocation () {
            this.$refs.mapRef.getLocationCurrent()
        }
    },
    computed: {
        markers: function () {
            let res = []
            for (let item in Mockup.__collections__.data) {
                let temp = Mockup.__collections__.data
                res.push([temp[item].W3W, temp[item].PlaceLocationDescription, temp[item].thumbnail, item])
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

#findBtn {
    position : fixed;
    z-index : 99;
    bottom : 100px;
    right : 40px;
    font-size : 48px;
}

.frame {
    width : 100%;
    height : 100%;
    overflow: hidden;
}

.processing {
    position : fixed;
    top : 0;
    left : 0;
    width : 100%;
    height : 100%;
    z-index : 10;
}

.processing > #defaultCanvas0 {
    position : fixed;
    top : 60px;
    left : 0;
    width : 100%;
    height : 100%;
    z-index : 10;
}

.boolAdvanture {
    position : fixed;
    font-weight : 99px;
    z-index : 11;
    top: 20px;
    right : 20px;
}

</style>
