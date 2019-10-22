<template>
    <div style="margin-bottom: 100px">
        <el-collapse-transition>
            <div class="wrapper" v-show="!releasephotos">
                <div class="imgbox">
                    <el-image :src="info.url"></el-image>
                </div>
                <div style="text-align: left">
                    <p style="font-size: 28px">{{ info.Location }}</p>
                    <p style="font-size: 16px">{{ info.Address }}</p>
                </div>
                <div>
                    아마도 카카오 맵이 들어갈 자리
                </div>
                <div>
                    <div class="brief">
                        <img src="good_condition.jpg" class="conditions">
                        <div class="sorttext">
                            <p class="keyword">{{ info.PlaceDescription.PhotoTime[1] }}</p>
                            <p class="description">{{ info.PlaceDescription.PhotoTime[2] }}</p>
                        </div>
                    </div>
                    <div class="brief">
                        <img src="bad_condition.jpg" class="conditions">
                        <div class="sorttext">
                            <p class="keyword">{{ info.PlaceDescription.NotRecommandTime[0] }}</p>
                            <p class="description">{{ info.PlaceDescription.NotRecommandTime[1] }}</p>
                        </div>
                    </div>
                    <div class="brief">
                        <img src="cam.jpg" class="conditions">
                        <div class="sorttext">
                            <p class="keyword">{{ info.PlaceDescription.OtherTips[0] }}</p>
                            <p class="description">{{ info.PlaceDescription.OtherTips[1] }}</p>
                        </div>
                    </div>
                    <div class="brief">
                        <img src="cloth.jpg" class="conditions">
                        <div class="sorttext">
                            <p class="keyword">{{ info.PlaceDescription.RecommandClothes[0] }}</p>
                            <p class="description">{{ info.PlaceDescription.RecommandClothes[1] }}</p>
                        </div>
                    </div>
                    <div class="brief">
                        <el-button round style="background: #F56C6C; color: #FFFFFF" v-on:click="loadphotos()">촬영정보</el-button>
                    </div>
                </div>
            </div>
        </el-collapse-transition>
        <el-collapse-transition>
            <div v-show="releasephotos">
                <div v-for="item in info.PhotoDescription" :key="item.Location">
                    <h2 style="text-align: left">{{ item.Location }}</h2>
                    <p style="text-align: left">{{ item.CameraModel + '|' + item.CaptureDate }}</p>
                    <img :src="item.url" style="max-width: 100%">
<!--                    <p>{{ item.Keyword.split(', ').map((v) => { return '#' + v }) }}</p>-->
                    <p style="text-align: left">{{ '키워드 : ' + item.Keyword }}</p>
                    <p>{{ item.Paragraph }}</p>
                </div>
                <el-button round style="background: #F56C6C; color: #FFFFFF" v-on:click="loadphotos()">뒤로가기</el-button>
            </div>
        </el-collapse-transition>
    </div>
</template>

<script>
export default {
    props: ['info'],
    name: 'PlaceIntroduction',
    data () {
        return {
            releasephotos: false
        }
    },
    methods: {
        loadphotos: function () {
            this.releasephotos = !this.releasephotos
        }
    },
    computed: {
    }
}
</script>

<style scoped>
.wrapper {
    margin: auto;
}
.imgbox {
    max-width: 100%;
    max-height: 4%;
    margin: auto;
}
.conditions {
    width: 170px;
    height: 170px;
    float: left;
}
.brief {
    position: relative;
    clear: both;
}
.keyword {
    font-size: 32px;
    font-weight: bold;
}
.description {
    font-size: 20px;
}
.sorttext {
    float: left;
    text-align: left;
}
</style>
