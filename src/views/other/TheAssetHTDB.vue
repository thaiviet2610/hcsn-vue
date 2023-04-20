<template>
    <div class="assetHTDB">
        <!-- dialog load dữ liệu  -->
        <MDialogLoadData v-if="isShowLoad"></MDialogLoadData>
    </div>
</template>

<script>

export default {
    name:"TheAssetHTDB",
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
.assetHTDB{
    width: 100%;
    height: calc(100% - 44px);
    background-color: #f4f7ff !important;
}
</style>