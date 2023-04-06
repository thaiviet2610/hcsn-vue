<template>

    <div class="dialog" @keydown="handleEventKeydown">
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
                            @handleEventFocus="getIdButtonFucus"
                            @btnAddOnClickBtn="handleEventClickBtn(item[0])" 
                            >
                        </MButton>
                    </div>
                    
            </div>
        </div>
    </div>


</template>

<script>
import enumJS from '@/js/enum';
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
            idBtnFocus: ""
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

        /**
         * Hàm xử lý sự kiện lấy ra giá trị id của button đang được focus
         * @param {*} value giá trị id
         * @author LTVIET (06/03/2023)
         */
        getIdButtonFucus(value){
            this.idBtnFocus = value;
        },

        /**
         * Hàm xử lý sự kiện keydown 
         * @param {*} event sự kiện cần sử lý
         * @author LTVIET (06/03/2023)
         */
        handleEventKeydown(event){
            let keyCode = event.keyCode;
            if(keyCode == enumJS.keyRight){
                this.handleEventKeydownRight();
            }
            if(keyCode == enumJS.keyLeft){
                this.handleEventKeydownLeft();
            }
        },

        /**
         * Hàm xử lý sự kiện keydown phím sang trái
         * @author LTVIET (06/03/2023)
         */
        handleEventKeydownLeft(){
            if(this.idBtnFocus){
                let arr = this.idBtnFocus.split("_");
                let index = Number(arr[1]);
                let txt = arr[2];
                index += 1;
                if(index >= this.buttonInfo.length ){
                    index  = 0;
                }
                if(index == 0)
                this.idBtnFocus = `${txt}_${index}`;
                this.$refs[`mButton_${index}`][0].setFocus();
            }
        },

        /**
         * Hàm xử lý sự kiện keydown phím sang phải
         * @author LTVIET (06/03/2023)
         */
         handleEventKeydownRight(){
            if(this.idBtnFocus){
                let arr = this.idBtnFocus.split("_");
                let index = Number(arr[1]);
                let txt = arr[2];
                index -= 1;
                if(index < 0 ){
                    index  = this.buttonInfo.length - 1;
                }
                this.idBtnFocus = `${txt}_${index}`;
                this.$refs[`mButton_${index}`][0].setFocus();
            }
        }
    },
}
</script>

<style scoped>
@import url(./dialog.css);
</style>