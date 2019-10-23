<template>
    <div>
        <el-collapse-transition>
            <div class="upperbox" v-show="!placeload">
                <isabil id="upbox"/>
                <div class="upperText">
                    <p>당신이 찍고싶은</p><br>
                    <p>인생샷을 찾아보세요</p>
                </div>
            </div>
        </el-collapse-transition>
        <transition name="el-fade-in-linear">
            <el-row :gutter="4" class='plates' v-show="!placeload">
                <el-col :span="12" v-for="item in db.data" :key="item.Location" style='float: top'>
                    <el-card class="cardBody" shadow="hover" :body-style="{ padding: '12px' }">
                        <img :src="'https://raw.githubusercontent.com/maemesoft/UriJuwiM/master/src/assets/img/thumbnail/' + item.thumbnail" class="cardImage" v-on:click="switchview(item)">
                        <div class="cardDescription">
                            <p class="cardLocation">{{ item.Location }}</p><br>
                            <IconPlace class="iconPlaceClass"></IconPlace>
                            <p class="cardAdress">{{ item.Address }}</p>
                        </div>
                    </el-card>
                </el-col>
                <div class="el-scrollbar__bar is-vertical"></div>
            </el-row>
        </transition>
        <el-collapse-transition>
            <div class="infobox" v-if='placeload'>
                <intro v-bind:info='selectedplace'></intro>
                <el-button @click="placeload = !placeload">메인화면</el-button>
            </div>
        </el-collapse-transition>
    </div>
</template>

<script>
import mock from '../assets/Mockup.json'
import isabil from '../assets/svg/ic_itsability.svg'
import intro from '@/components/PlaceIntroduction.vue'
import IconPlace from '../assets/icon/ic_place_48px.svg'

export default {
    name: 'home',
    components: {
        intro,
        isabil,
        IconPlace
    },
    data () {
        return {
            db: mock.__collections__,
            placeload: false,
            selectedplace: undefined
        }
    },
    computed: {
        returnURL (v) {
            alert(v)
            return '../assets/img/thumbnail/' + v
        }
    },
    methods: {
        switchview: function (place) {
            this.selectedplace = place
            this.placeload = !this.placeload
        }
    }
}
</script>

<style scoped>
    .upperbox {        
        width : 100%;
        height : 200px;
        top : 0;

        background: #FFA492;
        color: #FFFFFF;
        text-align: right;
        font-size: 28px;
        font-weight: bold;

        margin-bottom : 20px;
    }
    img {
        max-height: 20%;
    }
    .plates {
        margin-bottom: 100px;
        overflow-y: auto;
        overflow-x: hidden;
    }
    .infobox {
        margin-bottom: 100px;
        max-height: 10%;
    }
    #upbox {
        width: 150px;
        height: 150px;
        float: left;
        padding-left: 30px;
        padding-top : 25px;
        margin-right : -50px;
        overflow: hidden;
    }
    .upperText {
        height : 100%;
        padding-top : 70px;
        padding-right : 30px;
    }
    .upperText > p {
        padding : 0px;
        margin : 0px;

        display : inline;
    }

    .cardBody {
        height : 280px;
    }

    .cardImage {
        height : 180px;
        width : 180px;
        object-fit: cover;
        border-radius: 10%;
    }

    .cardDescription {
        display : inline-block;
        width:180px;
        height : 60px;
        text-align: left;
    }

    .cardDescription > p {
        display : inline;
    }

    .cardDescription > .cardLocation {
        font-size : 18px;
        font-weight: bold;
    }

    .cardDescription > .iconPlaceClass {
        width : 12px;
        height : 12px;
    }

    .cardDescription > .cardAdress {
        font-size : 12px;
    }

</style>
