<template>

    <div class="dialog">
        <div class="dialog-content">
            <!-- body của dialog  -->
            <div class="dialog-body">
                <!-- icon của dialog  -->
                <div class="dialog-body__icon"></div>
                <!-- nội dung thông báo của dialog  -->
                <div class="dialog-body__text">{{ content }}</div>
            </div>
            <!-- footer của dialog  -->
            <div class="dialog-footer">
                <!-- nút lưu của dialog  -->
                <MButton
                    :isDefault="isDefault"
                    label="Lưu"
                    @btnAddOnClickBtn="handlerEventBtnClickSave"  >
                </MButton>
                <!-- nút không lưu của dialog  -->
                <MButton
                    label="Không lưu"
                    @btnAddOnClickBtn="handlerEventBtnClickCancel"  >
                </MButton>
                <!-- nút hủy bỏ của dialog  -->
                <MButton
                    label="Hủy bỏ"
                    @btnAddOnClickBtn="handlerEventBtnClickClose"  >
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
    data() {
        return {
            isDefault: true
        }
    },
    methods: {
        /**
         * Hàm xử lý sự kiện lưu asset
         * @author LTVIET (02/03/2023)
         */
         handlerEventBtnClickSave(){
            this.$emit('onCloseDialogCancelSave');
        },
        /**
         * Hàm xử lý sự kiện không lưu asset
         * @author LTVIET (02/03/2023)
         */
         handlerEventBtnClickCancel(){
            this.$emit('onCloseDialogCancelNoSave');
        },
        /**
         * Hàm xử lý sự kiện hủy bỏ việc thoát ra form 
         * @author LTVIET (02/03/2023)
         */
         handlerEventBtnClickClose(){
            this.$emit('onCloseDialogCancelChange')
        }
    },
}
</script>

<style scoped>
@import url(./dialog.css);
</style>