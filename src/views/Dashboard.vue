<template>
    <div>
        <div class="upperbox">
            <p>새로운 경험을 할 장소를 찾아보세요!</p>
        </div>
        <transition name="slide-fade" :duration="200" mode="out-in">
            <div id="places" v-if="!placeload">
                <div v-for="item in moc" :key="item.name">
                    <img :src="item.thumbnail">
                    <p>{{ item.name }}</p>
                </div>
            </div>
            <intro v-if='placeload'></intro>
        </transition>
<!--        <transition name="fade" mode="out-in">-->
<!--            -->
<!--        </transition>-->
        <el-button @click="placeload = !placeload">TEST IT!</el-button>
    </div>
</template>

<script>
import mockup from '../assets/mockup.js'
import intro from '@/components/PlaceIntroduction.vue'

export default {
    name: 'home',
    components: {
        intro
    },
    data () {
        return {
            moc: mockup,
            placeload: false
        }
    },
    methods: {
    }
}
</script>

<style scoped>
    .upperbox {
        height: 30%;
        background-color: #F56C6C;
    }
</style>
