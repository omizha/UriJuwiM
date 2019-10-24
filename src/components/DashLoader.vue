<template>
    <div>
        <upperbox v-bind:first="this.$props.header1" v-bind:second="this.$props.header2"></upperbox>
        <transition name="el-fade-in-linear">
            <el-row :gutter="4" class='plates' v-show="!placeload">
                <div v-if="!this.getTarget">
                    <el-col :span="12" v-for="item in db.data" :key="item.Address" style='float: top'>
                        <el-card v-bind:data-name="item.Location" @click="routeMove(this)" class="cardBody" shadow="hover" :body-style="{ padding: '12px' }">
                            <img :src="'https://raw.githubusercontent.com/maemesoft/UriJuwiM/master/src/assets/img/thumbnail/' + item.thumbnail" class="cardImage" v-on:click="switchview(item)">
                            <div class="cardDescription">
                                <p class="cardLocation">{{ item.Location }}</p><br>
                                <IconPlace class="iconPlaceClass"></IconPlace>
                                <p class="cardAdress">{{ item.Address }}</p>
                            </div>
                        </el-card>
                    </el-col>
                </div>
                <div v-else>
                    <el-col :span="12" v-for="item in this.indexer" :key="item.Address" style='float: top'>
                        <el-card v-bind:data-name="item.Location" @click="routeMove(this)" class="cardBody" shadow="hover" :body-style="{ padding: '12px' }">
                            <img :src="'https://raw.githubusercontent.com/maemesoft/UriJuwiM/master/src/assets/img/thumbnail/' + item.thumbnail" class="cardImage" v-on:click="switchview(item)">
                            <div class="cardDescription">
                                <p class="cardLocation">{{ item.Location }}</p><br>
                                <IconPlace class="iconPlaceClass"></IconPlace>
                                <p class="cardAdress">{{ item.Address }}</p>
                            </div>
                        </el-card>
                    </el-col>
                </div>
                <div class="el-scrollbar__bar is-vertical"></div>
            </el-row>
        </transition>
    </div>
</template>

<script>
import IconPlace from '../assets/icon/ic_place_48px.svg'
import mock from '../assets/Mockup.json'
import upperbox from '../components/Upperbox.vue'

export default {
    props: {
        header1: {
            type: String,
            default: '당신의 인생샷 스팟'
        },
        header2: {
            type: String,
            default: '우리가 찾아줄게요'
        }
    },
    components: {
        IconPlace,
        upperbox
    },
    data () {
        return {
            db: mock.__collections__,
            placeload: false,
            target: null
        }
    },
    created () {
        this.target = this.$route.params.location
    },
    computed: {
        returnURL (v) {
            alert(v)
            return '../assets/img/thumbnail/' + v
        },
        getTarget: function () {
            return this.$route.params.location
        },
        indexer: function () {
            let res = []
            let matcher = this.getTarget

            if (matcher) {
                var mother = this.db.data
                for (let item in mother) {
                    if (mother[item].Address.indexOf(matcher) > -1) {
                        res.push(mother[item])
                    }
                }
            }

            return res
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
