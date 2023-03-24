<template>

    <div class="dialog">
        <div class="dialog-content">
            <!-- body của dialog  -->
            <div class="dialog-body">
                <!-- icon của dialog  -->
                <div class="dialog-body__icon"></div>
                <!-- nội dung thông báo của dialog  -->
                <div class="dialog-body__text">
                    <span style="font-family: Roboto-Bold !important;" :style="`color:${colorTextBefore};`">{{ contentColorBefore }}</span>
                    {{ content }}
                    <span style="font-family: Roboto-Bold !important;" :style="`color:${colorTextAfter};`">{{ contentColorAfter }}</span>
                    {{ contentAfter }}
                </div>
            </div>
            <!-- footer của dialog  -->
            <div class="dialog-footer">
                <!-- nút hủy của dialog  -->
                <MButton
                    ref="mButtonCancel"
                    :isDefault="isDefault"
                    :label="labelButtonDefault"
                    @btnAddOnClickBtn="handlerEventBtnClickCancel"  >
                </MButton>
                <!-- không hủy của dialog  -->
                <MButton
                    label="Không"
                    @btnAddOnClickBtn="handlerEventBtnClickNoCancel"  >
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
        type: {
            type: String,
            default: null
        },
        contentColorBefore: {
            type: String,
            default: ""
        },
        contentColorAfter: {
            type: String,
            default: ""
        },
        colorTextBefore: {
            type: String,
            default: ""
        },
        colorTextAfter: {
            type: String,
            default: ""
        },
        contentAfter:{
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
        // hiển thị label button theo type cảu dialog
        if(this.type == "delete"){
            this.labelButtonDefault = "Xóa";
        }else if(this.type == "cancel"){
            this.labelButtonDefault = "Hủy bỏ";
        }
    },
    data() {
        return {
            isDefault: true,
            labelButtonDefault: null
        }
    },
    methods: {
        /**
        * Hàm set focus vào input
        * @author LTVIET (05/03/2023)
        */
        setFocus() {
            this.$nextTick(function() {
                this.$refs["mButtonCancel"].setFocus();
            })
        }, 
        /**
         * Hàm gọi đến asset detail để đóng dialog
         * @author LTVIET (02/03/2023)
         */
        handlerEventBtnClickNoCancel(){
            if(this.type == "cancel"){
                this.$emit('onCloseDialogNoCancel');
            }else if(this.type == "delete"){
                this.$emit('onCloseDialogNoDelete');
            }
            
        },
        /**
         * Hàm gọi đến asset detail để đóng dialog và 
         * từ asset detail gọi đến asset list để đóng asset detail
         * @author LTVIET (02/03/2023)
         */
        handlerEventBtnClickCancel() {
            if(this.type == "cancel"){
                this.$emit('onCloseDialogCancel');
            }else if(this.type == "delete"){
                this.$emit('onCloseDialogDelete');
            }
        }
    },
}
</script>

<style scoped>
@import url(./dialog.css);
</style>