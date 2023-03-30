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
                <!-- nút lưu của dialog  -->
                <MButton
                    ref="mButtonSave"
                    :isDefault="isDefault"
                    label="Lưu"
                    @btnAddOnClickBtn="handleEventBtnClickSave"  >
                </MButton>
                <!-- nút không lưu của dialog  -->
                <MButton
                    label="Không lưu"
                    class="btn--no-save"
                    @btnAddOnClickBtn="handleEventBtnClickCancel"  >
                </MButton>
                <!-- nút hủy bỏ của dialog  -->
                <MButton
                    label="Hủy bỏ"
                    @btnAddOnClickBtn="handleEventBtnClickClose"  >
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
            default:null
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
         handleEventBtnClickSave(){
            this.$emit('onCloseDialogCancelSave');
        },
        /**
         * Hàm xử lý sự kiện không lưu asset
         * @author LTVIET (02/03/2023)
         */
         handleEventBtnClickCancel(){
            this.$emit('onCloseDialogCancelNoSave');
        },
        /**
         * Hàm xử lý sự kiện hủy bỏ việc thoát ra form 
         * @author LTVIET (02/03/2023)
         */
         handleEventBtnClickClose(){
            this.$emit('onCloseDialogCancelChange')
        }
    },
}
</script>

<style scoped>
@import url(./dialog.css);
</style>