<template>
    <div class="overview">
        <!-- dialog load dữ liệu  -->
        <MDialogLoadData v-if="isShowLoad"></MDialogLoadData>
    </div>
</template>

<script>
export default {
    name:"TheOverview",
    components:{
    },
    data() {
        return {
            isShowLoad: false
        }
    },
    created() {
        this.isShowLoad = true;
        setTimeout(() => {
            this.isShowLoad = false;
        }, 500);
    },
}
</script>

<style scoped>
.overview{
    width: 100%;
    height: calc(100% - 44px);
    background-color: #f4f7ff !important;
}
</style>