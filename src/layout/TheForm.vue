<template>
    <div>
        <div  class="form editForm">
            <div class="form-data" >
                <!-- phần header của form  -->
                <div class="form-header">
                    <!-- title của form  -->
                    <div class="form-header__text">{{ label }}</div>
                    <!-- button đóng form  -->
                    <MButtonIcon
                        class="btn-header__icon"
                        classIcon="form-header__icon"
                        :data_tooltip_bottom="tooltipBtnCloseForm"
                        @addOnClickBtnIcon="handleEventBtnClickCancel">
                    </MButtonIcon>
                </div>
                <!-- phần body của form  -->
                <slot></slot>
                <!-- phần footer của form  -->
                <div class="form-footer">
                    <!-- button lưu form  -->
                    <MButton
                        class="btn--main"
                        label="Lưu"
                        @btnAddOnClickBtn="handleEventBtnClickSave">
                    </MButton>
                    <!-- button hủy form  -->
                    <MButton
                        label="Hủy"
                        style="border: 0;"
                        @btnAddOnClickBtn="handleEventBtnClickCancel"  >
                    </MButton>
                </div>
            </div>
        </div>
        <!-- dialog thông báo  -->
        <MDialog 
            v-if="isShowDialogNotify" 
            :content="contentDialogNotifyErrorValidate"
            :buttonInfo="btnDialogNotify"
            @onClickBtn="handleEventCloseDialogNotify">
        </MDialog>
        <!-- dialog xác nhận sự kiện hủy của form thêm mới hoặc nhân bản -->
        <MDialog 
            :content="contentDialogAddFormCancel"
            :buttonInfo="btnDialogCancelAddForm"
            v-if="isShowDialogAddFormCancel"
            @onClickBtn="handleEventCloseDialogCancelAddForm">
        </MDialog>
        <!-- dialog xác nhận sự kiện hủy của form sửa -->
        <MDialog
            :content="contentDialogEditFormCancel"
            v-if="isShowDialogEditFormCancel"
            :buttonInfo="btnDialogCancelEditForm"
            @onClickBtn="handleEventCloseDialogCancelEditForm"
            >
        </MDialog>

        <!-- dialog hiển thị đang load dữ liệu  -->
        <MDialogLoadData v-if="isShowLoad"></MDialogLoadData>
    </div>
</template>


<script>
export default {
    name: "TheForm",
    components:{

    },
    props:{
        label:{
            type: String,
            default: ""
        },
        typeForm:{
            type: Number,
            default: 0
        },
    },
    data() {
        return {
            
        }
    },
    created() {
        
    },
    methods: {
        handleEventBtnClickCancel(){
            console.log(1);
            this.$emit('handleEventBtnClickCancel');
        }
    },
}
</script>

<style scoped>

</style>