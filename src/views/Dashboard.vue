<template>
    <div>
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
import intro from '@/components/PlaceIntroduction.vue'
import DashLoader from '../components/DashLoader.vue'

export default {
    name: 'home',
    components: {
        DashLoader,
        intro
    },
    data () {
        return {
            db: mock.__collections__,
            placeload: false,
            selectedplace: undefined,
            hoverLocation: null,
            header1: '당신의 인생샷 스팟',
            header2: '우리가 찾아줄게요'
        }
    },
    computed: {
        returnURL (v) {
            alert(v)
            return '../assets/img/thumbnail/' + v
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
</style>
