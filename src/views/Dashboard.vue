<template>
    <div>
        <el-collapse-transition>
            <div class="upperbox" v-show="!placeload">
                <p>당신이 찍고싶은</p>
                <p>인생샷을 찾아보세요</p>
            </div>
        </el-collapse-transition>
        <el-collapse-transition>
            <div class='plates' v-show="!placeload">
                <div v-for="item in db.data" :key="item.Location" v-on:click="switchview(item)">
                    <el-image style="max-height: 200px; max-width: 200px" :src="item.url"></el-image>
                    <p>{{ item.Location }}</p>
                </div>
                <div class="el-scrollbar__bar is-vertical"></div>
            </div>
        </el-collapse-transition>
        <el-collapse-transition>
            <div class="infobox" v-if='placeload'>
                <intro v-bind:info='selectedplace'></intro>
                <el-button @click="placeload = !placeload">뒤로가기</el-button>
            </div>
        </el-collapse-transition>
    </div>
</template>

<script>
import mock from '../assets/Mockup.json'
import intro from '@/components/PlaceIntroduction.vue'

export default {
    name: 'home',
    components: {
        intro
    },
    data () {
        return {
            db: mock.__collections__,
            placeload: false,
            selectedplace: undefined
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
        background: #F56C6C;
        color: #FFFFFF;
        font-size: 36px;
    }
    img {
        max-height: 20%;
    }
    .plates {
        overflow-y: auto;
        overflow-x: hidden;
    }
    .infobox {
        margin-bottom: 100px;
        max-height: 10%;
    }
</style>
