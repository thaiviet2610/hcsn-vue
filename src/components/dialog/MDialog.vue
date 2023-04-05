<template>

    <div class="dialog">
        <div class="dialog-content">
            <!-- body của dialog  -->
            <div class="dialog-body">
                <!-- icon của dialog  -->
                <div class="dialog-body__icon"></div>
                <!-- nội dung thông báo của dialog  -->
                <div class="dialog-body__text" v-html="content">
                </div>
            </div>
            <!-- footer của dialog  -->
            <div class="dialog-footer">
                    <!-- button chính của dialog  -->
                    <div v-for="(item,index) in buttonInfo" :key="index">
                        <MButton
                            :ref="`mButton_${index}`"
                            :class="item[1]"
                            :label="item[0]"
                            @btnAddOnClickBtn="handleEventClickBtn(item[0])" 
                            >
                        </MButton>
                    </div>
                    
            </div>
        </div>
    </div>


</template>

<script>
export default {
    name:"MDialog",
    props: {
        content: {
            type: String,
            default: null
        },
        normalBtnLabel: {
            type: String,
            default: ""
        },
        mainBtnLabel: {
            type: String,
            default: ""
        },
        buttonInfo: {
            type: Array,
            default: null
        },
    },
    components:{

    },
    mounted() {
        this.setFocus();
    },
    created() {
    },
    data() {
        return {
            isDefault: true,
        }
    },
    methods: {
        /**
        * Hàm set focus vào input
        * @author LTVIET (05/03/2023)
        */
        setFocus() {
            this.$nextTick(function() {
                this.$refs["mButton_0"][0].setFocus();
            })
        }, 

        /**
         * Hàm xử lý sự kiện click vào btn phụ
         * @author LTVIET (02/03/2023)
         */
        handleEventClickBtn(label){
            this.$emit('onClickBtn',label);
        },
    },
}
</script>

<style scoped>
@import url(./dialog.css);
</style>