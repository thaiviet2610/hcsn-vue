<template>

    <div class="dialog">
        <div class="dialog-content">
            <!-- body của dialog  -->
            <div class="dialog-body">
                <!-- icon của dialog  -->
                <div class="dialog-body__icon"></div>
                <!-- nội dung thông báo của dialog  -->
                <div class="dialog-body__text" v-html="content"></div>
            </div>
            <!-- footer của dialog  -->
            <div class="dialog-footer">
                <!-- nút chính của dialog  -->
                <MButton
                    ref="mButtonSave"
                    :isDefault="isDefault"
                    :label="mainBtnLabel"
                    @btnAddOnClickBtn="handleEventClickMainBtn"  >
                </MButton>
                <!-- nút phụ của dialog  -->
                <MButton
                    :label="supportBtnLabel"
                    class="btn--no-save"
                    @btnAddOnClickBtn="handleEventClickSupportBtn"  >
                </MButton>
                <!-- nút thường của dialog  -->
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
    name:"MDialogEditFormCancel",
    components:{

    },
    props: {
        content: {
            type:String,
            default: ""
        },
        mainBtnLabel: {
            type:String,
            default: ""
        },
        normalBtnLabel: {
            type:String,
            default: ""
        },
        supportBtnLabel: {
            type:String,
            default: ""
        }
    },
    mounted() {
        this.setFocus();
    },
    data() {
        return {
            isDefault: true
        }
    },
    methods: {
        /**
        * Hàm set focus vào input
        * @author LTVIET (05/03/2023)
        */
        setFocus() {
            this.$nextTick(function() {
                this.$refs["mButtonSave"].setFocus();
            })
        }, 
        /**
         * Hàm xử lý sự kiện lưu asset
         * @author LTVIET (02/03/2023)
         */
         handleEventClickMainBtn(){
            this.$emit('onClickMainBtn');
        },
        /**
         * Hàm xử lý sự kiện không lưu asset
         * @author LTVIET (02/03/2023)
         */
         handleEventClickSupportBtn(){
            this.$emit('onClickSupportBtn');
        },
        /**
         * Hàm xử lý sự kiện hủy bỏ việc thoát ra form 
         * @author LTVIET (02/03/2023)
         */
         handleEventClickNormalBtn(){
            this.$emit('onClickNormalBtn')
        }
    },
}
</script>

<style scoped>
@import url(./dialog.css);
</style>