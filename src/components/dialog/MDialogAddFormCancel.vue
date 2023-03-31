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
                <MButton
                    ref="mButtonMain"
                    :isDefault="isDefault"
                    :label="mainBtnLabel"
                    @btnAddOnClickBtn="handleEventClickMainBtn"  >
                </MButton>
                <!-- button phụ của dialog  -->
                <MButton
                    :label="normalBtnLabel"
                    @btnAddOnClickBtn="handleEventClickNormalBtn"  >
                </MButton>
            </div>
        </div>
    </div>


</template>

<script>
export default {
    name:"MDialogAddFormCancel",
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
        }
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
                this.$refs["mButtonMain"].setFocus();
            })
        }, 
        /**
         * Hàm xử lý sự kiện click vào btn phụ
         * @author LTVIET (02/03/2023)
         */
        handleEventClickNormalBtn(){
            this.$emit('onClickNormalBtn');
        },
        /**
         * Hàm gọi đến asset detail để đóng dialog và 
         * từ asset detail gọi đến asset list để đóng asset detail
         * @author LTVIET (02/03/2023)
         */
        handleEventClickMainBtn() {
            this.$emit('onClickMainBtn');
        }
    },
}
</script>

<style scoped>
@import url(./dialog.css);
</style>