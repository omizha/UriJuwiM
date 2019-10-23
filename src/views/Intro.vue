<template lang="pug">
    .background
        isabil(id="icon")
        
</template>

<script>

import isabil from '../assets/svg/ic_itsability.svg'
import router from '../router/index.js'

export default {
    components: {
        isabil
    },
    data () {
        return {

        }
    },
    mounted: () => {
        setTimeout(() => {
            router.push('Dashboard')
        }, 3000)
    }
}
</script>

<style>
.background {
    position : fixed;
    width:100%;
    height:100%;
    background-color: #FFA492;

    z-index: 1000;
}

#icon {
    position : fixed;
    width: 196px;
    left : 50%;
    top : 50%;
    margin-top: -130px;
    margin-left : -60px;
    animation: fadein 2s;
}

@keyframes fadein {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
</style>
