<template>
    <div>
        <div  class="form editForm" :tabindex="0"
            @keyup="handleEventKeyUp"
            @keydown="handleEventKeyDown"
        >
            <div class="form-data" >
                <!-- phần header của form  -->
                <div class="form-header">
                    <!-- title của form  -->
                    <div class="form-header-text">{{ label }}</div>
                    <!-- button đóng form  -->
                    <div style="position: relative;">
                        <MButtonIcon
                            :class="headerInfo.btnClose.class"
                            class="btn-header__icon"
                            classIcon="form-header__icon"
                            @addOnClickBtnIcon="handleEventBtnClickCancel">
                        </MButtonIcon>
                        <MTooltip
                            :text="headerInfo.btnClose.tooltip"
                            :class="headerInfo.btnClose.classTooltip"
                        ></MTooltip>
                    </div>
                </div>
                <!-- phần body của form  -->
                <div class="form_body">
                    <slot></slot>
                </div>
                <!-- phần footer của form  -->
                <div class="form-footer">
                    <!-- button lưu form  -->
                    <div :key="index" style="position: relative;">
                        <MButton
                            :class="buttonFooterInfo.btnSave.class"
                            :label="buttonFooterInfo.btnSave.label"
                            @btnAddOnClickBtn="handleEventBtnClickSave">
                        </MButton>
                        <MTooltip
                            :text="buttonFooterInfo.btnSave.tooltip"
                            :class="buttonFooterInfo.btnSave.classTooltip"
                        ></MTooltip>
                    </div>
                    <div :key="index" style="position: relative;">
                        <MButton
                            :id="idItemLast"
                            :class="buttonFooterInfo.btnCancel.class"
                            :label="buttonFooterInfo.btnCancel.label"
                            @btnAddOnClickBtn="handleEventBtnClickCancel">
                        </MButton>
                        <MTooltip
                            :text="buttonFooterInfo.btnCancel.tooltip"
                            :class="buttonFooterInfo.btnCancel.classTooltip"
                        ></MTooltip>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import MButtonIcon from '@/components/button/MButtonIcon.vue';
import resourceJS from '@/js/resource'
import enumJS from '@/js/enum';
import { keyTab } from '@/js/keyTab';
export default {
    name: "TheForm",
    components:{
    MButtonIcon
},
    props:{
        label:{
            type: String,
            default: ""
        },
        buttonInfo:{
            type: [Object,Array],
            default: null
        },
        idItemFirst:{
            type: String,
            default: ""
        },
        idItemLast:{
            type: String,
            default: ""
        }
    },
    data() {
        return {
            headerInfo: resourceJS.theForm.header,
            buttonFooterInfo: resourceJS.theForm.footer.button,
            previousKeyCtrl: false,
            previousKeyShift: false
        }
    },
    created() {
        if(this.buttonInfo){
            this.buttonFooterInfo = this.buttonInfo;
        }

        
    },
    methods: {
        /**
         * Hàm xử lý sự kiện keydown
         * @param {*} event sự kiện cần xử lý
         * @author LTVIET (29/03/2023)
         */
         handleEventKeyDown(event){
            const keyCode = event.keyCode;
            switch (keyCode) {
                case enumJS.keyCtrl:
                    this.previousKeyCtrl = true;
                    break;
                case enumJS.keyShift:
                    this.previousKeyShift = true;
                    break;
                case enumJS.keyEsc:
                    event.preventDefault();
                    this.handleEventBtnClickCancel();
                    break;
                case enumJS.keyS:
                    if(this.previousKeyCtrl){
                        event.preventDefault();
                        this.handleEventBtnClickSave();
                    }
                    break;
                case enumJS.keyTab:
                    keyTab(event,this.idItemFirst,this.idItemLast,this.previousKeyShift);
                    break;
                default:
                    break;
            }
        },

        /**
         * Hàm xử lý sự kiện click button để đóng form
         * @author LTVIET (12/05/2023)
         */
        handleEventBtnClickCancel(){
            this.$emit('handleEventCloseForm');
        },

        /**
         * Hàm xử lý sự kiện click button để lưu form
         * @author LTVIET (12/05/2023)
         */
        handleEventBtnClickSave(){
            this.$emit('handleEventSaveForm');
        },

        /**
         * Hàm xử lý sự kiện keyup
         * @param {*} event sự kiện cần xử lý
         * @author LTVIET (29/03/2023)
         */
         handleEventKeyUp(event){
            const keyCode = event.keyCode;
            if(keyCode == enumJS.keyCtrl){
                this.previousKeyCtrl = false;
            }
            if(keyCode == enumJS.keyShift){
                this.previousKeyShift = false;
            }
        },
    },
}
</script>

<style scoped>
@import url(./form.css);
</style>