<template>
    <div class="report">
        <!-- dialog load dữ liệu  -->
        <MDialogLoadData v-if="isShowLoad"></MDialogLoadData>
    </div>
</template>

<script>
import MDialogLoadData from '@/components/dialog/MDialogLoadData.vue';
export default {
    name:"TheReport",
    components:{
        MDialogLoadData
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
.report{
    width: 100%;
    height: calc(100% - 44px);
    background-color: #f4f7ff !important;
}
</style>