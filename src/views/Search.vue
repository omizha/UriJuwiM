<template>
    <div>
        <div class="upperbox">
            <isabil style="width: 150px; height: 150px; float: left; padding-left: 35px"/>
            <h2>당신의 인생샷 스팟</h2>
            <h2>우리가 찾아줄게요</h2>
        </div>
        <div class="mapwrapper">
            <KakaoMap></KakaoMap>
        </div>
    </div>
</template>

<script>
import isabil from '../assets/svg/ic_itsability.svg'
import KakaoMap from '../components/MapLoad'

export default {
    components: {
        isabil,
        KakaoMap
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

    .mapwrapper {
        max-width: 100%;
        height: 520px;
        overflow: auto;
        margin-bottom: 60px;
    }
</style>
