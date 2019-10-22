<template>
    <div>
        <div class="wrapper">
            <div class="imgbox">
                <el-image :src="info.url"></el-image>
            </div>
            <div class="spotloaction">
                <p>{{ info.Location }}</p>
                <p>{{ info.Address }}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['info'],
    name: 'PlaceIntroduction.vue'
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
.spotloaction {
    text-align: left;
    color: #FFFFFF;
    font-size: 20px;
    background: #F56C6C;
}
</style>
