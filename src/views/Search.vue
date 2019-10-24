<template>
    <div>
        <div v-show="!board">
            <div class="upperbox">
                <isabil style="width: 150px; height: 150px; float: left; padding-left: 35px"/>
                <h2>당신의 인생샷 스팟</h2>
                <h2>우리가 찾아줄게요</h2>
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

export default {
    components: {
        DashLoad,
        isabil
    },
    data () {
        return {
            board: false,
            kword: ''
        }
    },
    computed: {
        getSeoul: function () {
            return ['강서구', '양천구', '구로구', '금천구', '영등포구', '동작구', '관악구', '서초구', '강남구', '송파구',
                '강동구', '마포구', '용산구', '중구', '서대문구', '은평구', '종로구', '성북구', '강북구', '동대문구',
                '성동구', '광진구', '중랑구', '노원구', '도봉구']
        }
    },
    methods: {
        dashArg: function (word) {
            this.kword = word
            this.board = !this.board
        }
    }
}

</script>

<style>
    .upperbox {
        background: #F56C6C;
        color: #FFFFFF;
        text-align: right;
        font-size: 32px;
        font-weight: bold;
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
