<template>
    <div class="input-wrapper" >
        <!-- label của input  -->
        <label v-if="label" for="">{{ label }}<span v-if="required" class="required">*</span></label>
        <!-- input nhập dữ liệu -->    
        <input 
            ref="mInput"
            :class="[{'input--error':inValid}]" 
            class="classInput inputNumber" :style="styleInput"
            v-model="value"
            @input="handleEventInput"
            @keydown.enter="onKeyDownSelecte"
            @blur="onValidateBlur"
            :placeholder="placeholder">    
        <!-- thẻ div hiển thị thông báo lỗi nếu có  -->
        <div v-if="inValid" class="error--info">{{ notifyError }}</div>  
        <!-- thẻ div hiển thị button tăng giảm giá trị (nếu có)  -->
        <div v-if="buttonInput" class="input__icon2" >
            <MButtonIcon
                @mousedown="$event.preventDefault()"
                class="input__icon2--image"
                classIcon="input__icon--dropdown1"
                @addOnClickBtnIcon="handleEventIncreaseValue">
            </MButtonIcon>
            <MButtonIcon
                @mousedown="$event.preventDefault()"
                class="input__icon2--image"
                classIcon="input__icon--dropdown2"
                @addOnClickBtnIcon="handleEventDecreaseValue">
            </MButtonIcon>
        </div>
        
        <!-- button hiển thị icon nếu có  -->
        <div v-if="iconInput"  class="icon__search">
            <div class="icon__search--image"></div>
        </div>
        
    </div>
</template>

<script>
import resourceJS from '../../js/resourceJS.js'
import commonJS from '@/js/common';
export default {
    name:"MInputNumber",
    props: {
        label: {
            type: String,
            required: false
        },
        required: {
            type: Boolean,
            required: false,
            default: false
        },
        placeholder: {
            type: String,
            required: false,
            default: null
        },
        buttonInput: {
            type: Boolean,
            default: false
        },
        iconInput: {
            type: Boolean,
            default: false
        },
        tooltip:{
            type:String,
            default: null
        },
        isFormat: {
            type: String,
            default: null
        },
        valueInput: {
            type: [String,Number],
            default: null
        },
        stepValue: {
            type: Number,
            default: 0
        }


    },
    components:{

    },
    data() {
        return {
            value: null,
            inValid: false,
            errorEmpty: "",
            notifyError: null,
            styleInput: null,
            errorFormatNumber: false,
            classInput: null
        }
    },
    watch: {
        
    },
    mounted() {
        
    },
    created() {
        //1. nếu valueInput có giá trị thì gán cho value
        if(this.valueInput){
            this.value = this.valueInput;
            if(this.value < 10){
                this.value = `0${this.value}`;
            }
        }else{
            //2. gán giá trị mặc định = 0
            this.value = 0;
        }
        //3. nếu input có button thì set style cho input
        if(this.buttonInput){
            this.styleInput = 'padding-right: 28px;';
        }
        else if(this.iconInput){
            //4. nếu input có icon thì set style cho input
            this.styleInput = 'padding-left: 38px';
        }
        if(this.isFormat=="money"){
            this.value = commonJS.formatMoney(this.value);
        }
        
        
    },
    methods: {
        /**
         * Hàm xử lý sự kiện blur input
         * @author LTVIET (05/03/2023)
         */
        onValidateBlur(){
            
            if(this.required && (this.value == null || this.value == undefined || this.value == "")){
                //1. nếu input required và có giá trị rỗng 
                //1.1. set invalid = true và hiện thị thông báo lỗi không được để trống
                if(this.value===0){
                    this.inValid = false;
                }else{
                    this.inValid = true;
                    this.notifyError = this.label + resourceJS.error.emptyInput;
                }
            }
            else{
                //2.1. kiểu tra xem giá trị nhập vào có phải là số không
                if(!(/^[0-9]+([.]?[0-9]+)*([,][0-9]+)?$/.test(this.value))){
                    //2.2. nếu không phải thì set invalid = true và
                    // hiện thị thông báo lỗi giá trị nhập vào không phải là số
                    this.inValid = true;
                    this.notifyError = this.label + resourceJS.error.errorFormatNumber;
                }else{
                    //2.3. nếu giá trị nhập vào là số
                    let length = this.value.length;
                    if(length > 14){
                        //2.3.1. nếu độ dài số nhập vào dài quá 14 ký tự thì không cho nhập vào
                        //--> set invalid = true và hiện thị thông báo lỗi không được nhấp giá trị quá dài
                        this.inValid = true;
                        this.notifyError = resourceJS.error.errorMaxLengthNumber;
                    }else{
                        this.value = commonJS.formatMoney(this.getMoney(this.value));
                        //--> nếu ngược lại thì set invalid = false
                        this.inValid = false;
                    }
                    // console.log("value:",this.value,typeof this.value);
                    if(this.value && String(this.value).indexOf(".") == -1){
                        this.value = Number(this.value);
                        if(this.value > 0 && this.value<10){
                            console.log(1);
                            this.value = Number(this.value);
                            this.value = `0${this.value}`;
                        }
                    }
                    console.log("value:",this.value,typeof this.value);
                }
                
            }
            
            if(!this.inValid){
                let value = this.getMoney(this.value);
                this.$emit('getValueInput',value);
            }
        },
        /**
         * Hàm xử lý sự kiện click vào button tăng giá trị
         * @author LTVIET (05/03/2023)
         */
        handleEventIncreaseValue() {
            // let step = Number(this.stepValue);
            //1. set focus vào input
            //this.setFocus();
            //2. nếu giá trị rỗng thì gán bằng 0
            if(this.value == "" || this.value == null || this.value == undefined){
                this.value = 0;
                let value = this.getMoney(this.value);
                this.$emit('getValueInput',value);
            }
            this.value = Number(this.value) + Number(this.stepValue);
            if(this.stepValue < 1){
                this.value = Math.round(this.value*(1/this.stepValue))/(1/this.stepValue);
            }
            let value = this.getMoney(this.value);
            this.$emit('getValueInput',value);
            if(this.value && String(this.value).indexOf(".") == -1){
                this.value = Number(this.value);
                if(this.value<10){
                    this.value = Number(this.value);
                    this.value = `0${this.value}`;
                }
            }
        },
        /**
         * Hàm xử lý sự kiện click vào button giảm giá trị
         * @author LTVIET (05/03/2023)
         */
        handleEventDecreaseValue(){
            //1. set focus vào input
            // this.setFocus();
            //2. nếu giá trị rỗng thì gán bằng 0
            if(this.value == "" || this.value == null || this.value == undefined){
                this.value = 0;
            }
            this.value = Number(this.value) - this.stepValue;
            if(this.stepValue < 1){
                this.value = Math.round(this.value*(1/this.stepValue))/(1/this.stepValue);
            }
            if(this.value < 0){
                this.value = 0;
            }
            let value = this.getMoney(this.value);
            this.$emit('getValueInput',value);
            if(this.value && String(this.value).indexOf(".") == -1){
                this.value = Number(this.value);
                if(this.value<10){
                    this.value = Number(this.value);
                    this.value = `0${this.value}`;
                }
            }
        },
        /**
         * Hàm set focus vào input
         * @author LTVIET (05/03/2023)
         */
        setFocus() {
            this.$nextTick(function() {
                this.$refs["mInput"].focus();
            })
        }, 
        
        /**
         * Hàm xử lý sự kiện nhập phím trong input
         * @author LTVIET(16/03/2023)
         */
        onKeyDownSelecte(){
            this.$emit("keydownEnter",this.value);
        },
        
        /**
         * Hàm chuyển dữ liệu tiền từ string về dạng number trong trường hợp dữ liệu tiền được format thành dạng string
         * @param {*} value giá trị cần chuyển đổi
         * @author LTVIET(14/03/2023)
         */
         getMoney(value){
            return String(this.value).indexOf(".") == -1 ? value : Number(value.replaceAll('.',''));
            
        },

        /**
         * Hàm làm tròn giá trị đến 1 chữ số sau dấu phảy
         * @param {*} value giá trị cần làm tròn
         * @author LTVIET(06/03/2023)
         */
        getRoundValue(value){
            return Math.round(value*10)/10;
        }
        ,
        handleEventInput(){
            this.$emit("getValueEventInput",this.value);
        }
    },
    
}
</script>

<style scoped>
@import url(./input.css);
</style>