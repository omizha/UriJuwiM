<template lang="pug">
    el-footer
        el-col(:span="6" v-for="(navKey) in navList" v-bind:key="navKey.id")
            .grid-content
                router-link(:to="navKey")
                    .navBox {{ navKey }}
</template>

<script>
export default {
    data () {
        return {
            navList: ['Home', 'Unknown', 'Search', 'Map']
        }
    }
}
</script>

<style>
footer {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    padding: 15px 0;
    text-align: center;
    color: white;
    background: black;
}

.navBox {
    position: relative;
    height : 60px;
    padding : 15px;
    cursor: pointer;
}

.navBox:hover {
    background:darkgrey;
}

a {
    font-size: 24px;
    color : white;
    text-decoration: none !important;
}

</style>
