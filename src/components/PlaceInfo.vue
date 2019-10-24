<template>
    <div class="alertBox">
        <div class="imageCage">
        </div>
        <div class="pictureDescription">

        </div>
    </div>
</template>

<script>
export default {
    props: ['place'],
    computed: {
        getInfo: function () {
            return this.$props.place
        }
    },
    methods: {

    }
}
</script>

<style scoped>
    .alertBox {
        width: 500px;
        height: 240px;
    }

    .imageCage {
        height: 80%;
    }

    .pictureDescription {
        height: 20%;
    }
</style>
