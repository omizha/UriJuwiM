<template lang="pug">
    el-footer(class="footer")
        el-col(:span="6" v-for="(navKey) in navList" v-bind:key="navKey.id")
            .grid-content
                router-link(:to="{ name: navKey }")
                    .navBox(@click="whatistihs(navKey)") {{ navKey }}
</template>

<script>

import iconHome from '../assets/icon/ic_map_48px.svg'
import iconExplore from '../assets/icon/Explorer.svg'
import iconSearch from '../assets/icon/dp_convert/ic_bottom_search_24dp.svg'
import iconShare from '../assets/icon/Share.svg'

export default {
    data () {
        return {
            navList: ['Dashboard', 'Explore', 'Search', 'Share']
        }
    },
    components: {
        iconHome, iconExplore, iconSearch, iconShare
    },
    methods: {
        whatistihs (is) {
            console.log(is)
        }
    }
}
</script>

<style>
.footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    padding: 0 !important;
    text-align: center;
    background: white;

    z-index: 999;
}

.navBox {
    position: relative;
    height : 60px;
    cursor: pointer;
    line-height: 60px;
    vertical-align: middle;
    border-top : 3px solid #FF7E5F
}

.navBox:hover {
    background-color : #FFb9b0;
}

a {
    font-size: 18px;
    color : #FF7E5F;
    text-decoration: none !important;
    font-weight: bolder;
}

</style>
