<template>
    <div class="input-wrapper" >
        <!-- label của input  -->
        <label v-if="label" for="">{{ label }}<span v-if="required" class="required">*</span></label>
        <!-- input nhập dữ liệu -->    
        <input 
            ref="mInputNumber"
            :id="idInput"
            :class="[{'input--error':inValid}]" 
            class="classInput inputNumber" :style="styleInput"
            v-model="value"
            autocomplete="off"
            @input="handleEventInput"
            @keydown="handleEventKeydown"
            @keyup="handleEventKeyup"
            @blur="onValidateBlur"
            @focus="handleEventFocus"
            :placeholder="placeholder">    
        <!-- thẻ div hiển thị thông báo lỗi nếu có  -->
        <div v-if="inValid" class="error--info">{{ notifyError }}</div>  
        <!-- thẻ div hiển thị button tăng giảm giá trị (nếu có)  -->
        <div v-if="buttonInput" class="input__icon2" >
            <MButtonIcon
                @mousedown="$event.preventDefault()"
                class="input__icon2--image"
                classIcon="input__icon--dropdown1"
                tabindex="-1"
                @addOnClickBtnIcon="handleEventIncreaseValue">
            </MButtonIcon>
            <MButtonIcon
                @mousedown="$event.preventDefault()"
                class="input__icon2--image"
                classIcon="input__icon--dropdown2"
                tabindex="-1"
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
import enumJS from '@/js/enum.js';
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
        },
        idInput: {
            type: String,
            default: ""
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
            classInput: null,
            previousKeyShift: false
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
        this.value = this.formatMoney(this.value);
        
        
        
    },
    methods: {
        /**
         * Hàm bắt sự kiện focus vào input rồi gửi ra cho lớp cha xử lý
         * @param {*} event sự kiện focus
         * @author LTVIET (02/04/2023)
         */
         handleEventFocus(event){
            this.$emit("handleEventFocus",event.target.id);
        },

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
                //2. nếu giá trị nhập vào là số
                let length = this.value.length;
                if(length > 14){
                    //2.1. nếu độ dài số nhập vào dài quá 14 ký tự thì không cho nhập vào
                    //--> set invalid = true và hiện thị thông báo lỗi không được nhấp giá trị quá dài
                    this.inValid = true;
                    this.notifyError = resourceJS.error.errorMaxLengthNumber;
                }else{
                    this.value = this.formatMoney(this.value);
                    //--> nếu ngược lại thì set invalid = false
                    this.inValid = false;
                }
                if(this.value && String(this.value).indexOf(".") == -1){
                    this.value = Number(this.value);
                    if(this.value > 0 && this.value<10){
                        this.value = Number(this.value);
                        this.value = `0${this.value}`;
                    }
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
            let valueInput = this.getMoney(this.value);
            //2. nếu giá trị rỗng thì gán bằng 0
            if(valueInput == "" || valueInput == null || valueInput == undefined){
                this.value = 0;
                this.$emit('getValueInput',0);
            }
            valueInput = Number(valueInput) + Number(this.stepValue);
            if(this.stepValue < 1){
                valueInput = Math.round(valueInput*(1/valueInput))/(1/this.stepValue);
            }
            this.$emit('getValueInput',valueInput);
            this.value = this.formatMoney(valueInput);
        },

        /**
         * Hàm xử lý sự kiện click vào button giảm giá trị
         * @author LTVIET (05/03/2023)
         */
        handleEventDecreaseValue(){
            let valueInput = this.getMoney(this.value);
            //2. nếu giá trị rỗng thì gán bằng 0
            if(valueInput == "" || valueInput == null || valueInput == undefined){
                this.value = 0;
                this.$emit('getValueInput',0);
            }
            valueInput = Number(valueInput) - this.stepValue;
            if(this.stepValue < 1){
                valueInput = Math.round(valueInput*(1/this.stepValue))/(1/this.stepValue);
            }
            if(valueInput < 0){
                valueInput = 0;
            }
            this.$emit('getValueInput',valueInput);
            this.value = this.formatMoney(valueInput);
        },

        /**
         * Hàm set focus vào input
         * @author LTVIET (05/03/2023)
         */
        setFocus() {
            this.$nextTick(function() {
                this.$refs["mInputNumber"].focus();
            })
        }, 

        /**
         * Hàm xử lý sự kiện keydown
         * @param {*} event sự kiện cần xử lý
         * @author LTVIET (05/03/2023)
         */
        handleEventKeydown(event){
            let keyCode = event.keyCode;
            if(!((keyCode < 31) || (keyCode >= 48 && keyCode <=57) || (keyCode >= 96 && keyCode <= 105) || (keyCode >=37 && keyCode <= 40))){
                event.preventDefault();
            }
            if(this.previousKeyShift && (keyCode >= 48 && keyCode <=57)){
                event.preventDefault();
            }
            
            switch (keyCode) {
                
                case enumJS.arrowDown:
                    if(this.previousKeyShift){
                        event.preventDefault();
                        this.handleEventDecreaseValue();
                    }
                    break;
                case enumJS.arrowUp:
                    if(this.previousKeyShift){
                        event.preventDefault();
                        this.handleEventIncreaseValue();
                    }
                    break;
                case enumJS.keyShift:
                    this.previousKeyShift = true;
                    break;
            
                default:
                    break;
            }
        },

        /**
         * Hàm xử lý sự kiện keyup
         * @param {*} event sự kiện cần xử lý
         * @author LTVIET (05/03/2023)
         */
        handleEventKeyup(event){
            let keyCode = event.keyCode;
            if(keyCode == enumJS.keyShift){
                this.previousKeyShift = false;
            }
        },
        
        /**
         * Hàm chuyển dữ liệu tiền từ string về dạng number trong trường hợp dữ liệu tiền được format thành dạng string
         * @param {*} value giá trị cần chuyển đổi
         * @author LTVIET(14/03/2023)
         */
         getMoney(value){
            return String(value).indexOf(".") == -1 ? Number(value) : Number(value.replaceAll('.',''));
        },

        /**
         * Hàm làm tròn giá trị đến 1 chữ số sau dấu phảy
         * @param {*} value giá trị cần làm tròn
         * @author LTVIET(06/03/2023)
         */
        getRoundValue(value){
            return Math.round(value*10)/10;
        },

        /**
         * Hàm truyền dữ liệu ra lớp cha khi nhập dữ liệu mới vào input
         * @author LTVIET(06/03/2023)
         */
        handleEventInput(){
            let value = this.getMoney(this.value);
            this.value = this.formatMoney(value);
            this.$emit("getValueEventInput",this.value);
        },

        /**
         * Hàm format lại giá trị theo định dạng tiền
         * @param {*} value giá trị của input
         * @author LTVIET(06/03/2023)
         */
        formatMoney(value){
            let valueMoney = this.getMoney(value);
            valueMoney = commonJS.formatMoney(valueMoney);
            if(this.getMoney(valueMoney) < 10){
                valueMoney = `0${valueMoney}`;
            }
            if(Number(valueMoney)==0){
                valueMoney = 0;
            }
            return valueMoney;
        }
    },
    
}
</script>

<style scoped>
@import url(./input.css);
</style>