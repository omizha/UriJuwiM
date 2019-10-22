<template>
    <div>
        <div class="upperbox">
            <p>새로운 경험을 할 장소를 찾아보세요!</p>
        </div>
        <div v-for="item in moc" :key="item.name">
            <img :src="item.thumbnail">
            <p>{{ item.name }}</p>
        </div>
    </div>
</template>

<script>
import mockup from '../assets/mockup.js'

export default {
    name: 'home',
    components: {
    },
    data () {
        return {
            moc: mockup
        }
    }
}
</script>

<style scoped>
    .upperbox {
        height: 30%;
        background-color: #F56C6C;
    }
</style>
