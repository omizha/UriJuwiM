<template>
    <div>
        <DashLoader v-bind:target="false"
            v-bind:header1="header1"
            v-bind:header2="header2"></DashLoader>
    </div>
</template>

<script>
import mock from '../assets/Mockup.json'
import DashLoader from '../components/DashLoader.vue'

export default {
    name: 'home',
    components: {
        DashLoader
    },
    data () {
        return {
            db: mock.__collections__,
            placeload: false,
            selectedplace: undefined,
            hoverLocation: null,
            header1: '당신이 찍고싶은',
            header2: '인생샷을 찾아보세요'
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
