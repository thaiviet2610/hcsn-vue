<template>
    <div class="category">
        <p>asdsd</p>
        <input type="date" id="start" name="trip-start"
       value="2018-07-22"
       min="2018-01-01" max="2018-12-31">
        <!-- dialog load dữ liệu  -->
        <MDialogLoadData v-if="isShowLoad"></MDialogLoadData>
    </div>
</template>

<script>
export default {
    name:"TheCategory",
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
.category{
    width: 100%;
    height: calc(100% - 44px);
    background-color: #f4f7ff !important;
}
</style>