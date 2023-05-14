<template>

    <div class="dialog" @keydown="handleEventKeyDown" @keyup="handleEventKeyUp">
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
                            :idButton="`id_${index}`"
                            :class="item[1]"
                            :label="item[0]"
                            @btnAddOnClickBtn="handleEventClickBtn(item[2])" 
                            >
                        </MButton>
                    </div>
            </div>
        </div>
    </div>


</template>

<script>
import enumJS from '@/js/enum';
import { keyTab } from '@/js/keyTab';
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
            previousKeyShift: false
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
        handleEventClickBtn(index){
            this.$emit('onClickBtn',index);
        },

        handleEventKeyDown(event){
            const keyCode = event.keyCode;
            if(keyCode == enumJS.keyShift){
                this.previousKeyShift = true;
            }
            if(keyCode == enumJS.keyTab){
                keyTab(event,`id_0`,`id_${this.buttonInfo.length-1}`,this.previousKeyShift);
            }
        },

        /**
         * Hàm xử lý sự kiện keyup
         * @param {*} event sự kiện cần xử lý
         * @author LTVIET (29/03/2023)
         */
         handleEventKeyUp(event){
            const keyCode = event.keyCode;
            if(keyCode == enumJS.keyShift){
                this.previousKeyShift = false;
            }
        },

    },
}
</script>

<style scoped>
@import url(./dialog.css);
</style>