<template>
    <div>
        <div v-show="!board">
            <div class="upperbox">
                <isabil id="upbox"/>
                <div class="upperText">
                    <p>당신의 인생샷 스팟</p>
                    <br>
                    <p>우리가 찾아줄게요</p>
                </div>
            </div>
            <div class="seoul">
                <h2>서울특별시</h2>
                <el-divider></el-divider>
                <div class="gu" v-for="word in this.getSeoul" :key=word @click="dashArg(word)">
                    <h3>{{ word }}</h3>
                </div>
            </div>
        </div>
        <DashLoad v-show="board" v-bind:target="this.kword"></DashLoad>
    </div>
</template>

<script>
import isabil from '../assets/svg/ic_itsability.svg'
import DashLoad from '@/components/DashLoader.vue'
import mock from '../assets/Mockup.json'

export default {
    components: {
        DashLoad,
        isabil
    },
    data () {
        return {
            board: false,
            kword: '',
            db: mock.__collections__
        }
    },
    computed: {
        getSeoul: function () {
            return ['영등포구', '동작구', '관악구', '서초구', '강남구', '송파구', '마포구', '중구', '종로구']
        }
    },
    methods: {
        dashArg: function (word) {
            this.kword = word
            // this.board = !this.board

            this.$router.push({
                name: 'Search2',
                params: { location: this.kword }
            })
        }
    }
}

</script>

<style>
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

    .seoul {
        text-align: left;
        padding: 20px;
    }

    .gu {
        float: left;
        margin: auto;
        text-align: center;
        width: 105px;
    }
</style>
