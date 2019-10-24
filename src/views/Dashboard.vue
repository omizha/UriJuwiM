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
        <DashLoader v-bind:target="false"></DashLoader>
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
import DashLoader from '../components/DashLoader'

export default {
    name: 'home',
    components: {
        DashLoader,
        intro,
        isabil
    },
    data () {
        return {
            db: mock.__collections__,
            placeload: false,
            selectedplace: undefined,
            hoverLocation: null
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

            for (let key in this.db.data) {
                console.log(this.db.data[key].Location)

                if (this.db.data[key].Location === this.selectedplace.Location) {
                    this.$router.push({
                        name: 'Dashboard2',
                        params: { cname: key }
                    })
                }
            }
            // this.placeload = !this.placeload
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
</style>
