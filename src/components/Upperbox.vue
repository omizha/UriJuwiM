<template>
    <div class="upperbox">
        <isabil id="upbox"/>
        <div class="upperText">
            <p>{{ this.$props.first }}</p><br>
            <p>{{ this.$props.second }}</p>
        </div>
    </div>
</template>

<script>
import isabil from '../assets/svg/ic_itsability.svg'

export default {
    props: ['first', 'second'],
    name: 'upperbox',
    components: {
        isabil
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
</style>
