<template>
    <div style="margin-bottom: 56px">
        <el-collapse-transition>
            <div class="wrapper" v-show="!releasephotos">
                <el-image id="imgbox" :src="info.url" :preview-src-list="[info.url]"></el-image>
                <div class="container">
                    <div id="mapName" style="text-align: left">
                        <p id="Location">{{ info.Location }}</p><br>
                        <IconPlace class="iconPlaceClass"></IconPlace>
                        <p id="Address">{{ info.Address }}</p>
                    </div>
                    <el-collapse-transition>
                        <div class="mapwrapper">
                            <KakaoMap v-bind:located="info.W3W"></KakaoMap>
                        </div>
                    </el-collapse-transition>
                    <div>
                        <el-col>
                            <el-card shadow="hover" class="cards">
                                <div class="brief">
                                    <nice class="conditions"/>
                                    <div class="sorttext">
                                        <p class="keyword">{{ info.PlaceDescription.PhotoTime[1] }}</p><br>
                                        <p class="description">{{ info.PlaceDescription.PhotoTime[2] }}</p>
                                    </div>
                                </div>
                            </el-card>
                        </el-col>
                        <el-col>
                            <el-card shadow="hover" class="cards">
                                <div class="brief">
                                    <bad class="conditions"/>
                                    <div class="sorttext">
                                        <p class="keyword">{{ info.PlaceDescription.NotRecommandTime[0] }}</p><br>
                                        <p class="description">{{ info.PlaceDescription.NotRecommandTime[1] }}</p>
                                    </div>
                                </div>
                            </el-card>
                        </el-col>
                        <el-col>
                            <el-card shadow="hover" class="cards">
                                <div class="brief">
                                    <camera class="conditions"/>
                                    <div class="sorttext">
                                        <p class="keyword">{{ info.PlaceDescription.OtherTips[0] }}</p><br>
                                        <p class="description">{{ info.PlaceDescription.OtherTips[1] }}</p>
                                    </div>
                                </div>
                            </el-card>
                        </el-col>
                        <el-col>
                            <el-card shadow="hover" class="cards">
                                <div class="brief">
                                    <cloth class="conditions"/>
                                    <div class="sorttext">
                                        <p class="keyword">{{ info.PlaceDescription.RecommandClothes[0] }}</p><br>
                                        <p class="description">{{ info.PlaceDescription.RecommandClothes[1] }}</p>
                                    </div>
                                </div>
                            </el-card>
                        </el-col>
                        <div class="brief">
                            <el-button class="redBtn" round style="background: #F56C6C; color: #FFFFFF" v-on:click="loadPhotos()">촬영정보</el-button>
                        </div>
                    </div>
                </div>
            </div>
        </el-collapse-transition>
        <el-collapse-transition>
            <div class="cameraInfoView" v-show="releasephotos">
                <div v-for="item in info.PhotoDescription" :key="item.url">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <h2 class="cameraLocation">{{ item.Location }}</h2><br>
                            <p class="cameraData">{{ item.CameraModel + ' | ' + item.CaptureDate }}</p>
                        </div>
                        <el-image :src="item.url" class="CameraPicture" :preview-src-list="[item.url]"></el-image>
    <!--                    <p>{{ item.Keyword.split(', ').map((v) => { return '#' + v }) }}</p>-->
                        <p style="text-align: left">키워드 : {{ item.Keyword }}</p>
                        <p style="text-align: left">{{ item.Paragraph }}</p>
                    </el-card>
                </div>
                <el-button class="redBtn" round style="background: #F56C6C; color: #FFFFFF" v-on:click="loadPhotos()">뒤로가기</el-button>
            </div>
        </el-collapse-transition>
    </div>
</template>

<script>
import nice from '../assets/svg/ic_time_daytime_48px.svg'
import bad from '../assets/svg/ic_calendar_notsuggest.svg'
import camera from '../assets/svg/ic_photo_tip.svg'
import cloth from '../assets/svg/ic_clothes_48px.svg'
import IconPlace from '../assets/icon/ic_place_48px.svg'
import KakaoMap from '../components/MapLoad'
import wk from '@/assets/keyw3w.js'
import mock from '../assets/Mockup.json'
const www = require('w3w')(wk.key)

export default {
    name: 'PlaceIntroduction',
    components: {
        nice,
        bad,
        camera,
        cloth,
        KakaoMap,
        IconPlace
    },
    data () {
        return {
            releasephotos: false,
            info: mock.__collections__.data,
            cname: null
        }
    },
    created () {
        this.cname = this.$route.params.cname
        this.info = this.info[this.cname]
    },
    methods: {
        loadPhotos: function () {
            this.releasephotos = !this.releasephotos
        }
    },
    computed: {
    },
    mounted () {
        this.$store.dispatch('updatew3w', { word: this.info.W3W[0] })
        www.forward(this.$store.getters.getw3w).then((val) => {
            this.$store.dispatch('updateGeo', val.geometry)
        })
    }
}
</script>

<style>
.wrapper {
    margin: auto;
}

#imgbox {
    width : 100%;
    height : 250px;
    overflow : hidden;
    object-fit: cover;
}

#mapName {
    margin-bottom : 20px;
}

#mapName > p {
    display : inline-block;
    padding : 0;
    margin : 0;
}

#mapName > #Location {
    font-size : 36px;
    font-weight: bold;
}

#mapName > #Address {
    font-size : 12px;
    font-weight: bold;
}

#mapName > .iconPlaceClass {
    display : inline-block;
    width : 12px;
    height : 12px;
}

.cards {
    height : 128px;
}

.conditions {
    width: 96px;
    height: 96px;
    float: left;
    padding-right : 16px;
}

.brief {
    position: relative;
    clear: both;
}

.sorttext {
    text-align: left;
    padding-top : 10px;

    overflow-x:visible;
}

.keyword {
    font-size: 24px;
    font-weight: bold;
    display : inline;
    text-align : left !important;
}

.description {
    font-size: 14px;
    display : inline;
    text-align : left !important;
}

.mapwrapper {
    max-width: 100%;
    height: 200px;
    border-radius: 5%;
    overflow: hidden;
    margin-bottom : 20px;
}

.container {
    padding : 15px;
}

.redBtn {
    margin-top : 16px;
    width : 100%;
    height : 56px;

    font-size : 18px;
}

.cameraInfoView {
    padding : 16px;
}

.cameraLocation {
    display : inline;
    font-size : 32px;
}

.cameraData {
    display : inline;
    font-size : 14px;

    padding-top : 8px;
}

.CameraPicture {
    width : 100%;
    max-height : 580px;
    object-fit: cover;

    overflow: hidden;
}

</style>
