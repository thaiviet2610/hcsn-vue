<template>
    <div class="input__container" >
        <!-- label của input  -->
        <label v-if="label" for="">{{ label }}<span v-if="required" class="required"> *</span></label>
        <!-- input nhập dữ liệu -->    
        <input 
            ref="mInputNumber"
            :id="idInput"
            :class="[{'input--error':inValid},{'disableInputClass':disable},classInput]" 
            :disabled="disable"
            class="classInput inputNumber" :style="styleInput"
            v-model="value"
            autocomplete="off"
            :tabindex="disable ? -1:0"
            @input="handleEventInput"
            @keydown="handleEventKeyDown"
            @keyup="handleEventKeyUp"
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
        disable: {
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
        stepValueInput: {
            type: Number,
            default: 0
        },
        idInput: {
            type: String,
            default: ""
        },
        classInput: {
            type: String,
            default: ""
        },

    },
    components:{

    },
    data() {
        return {
            value: null,
            valueNumber: 0,
            inValid: false,
            notifyError: null,
            styleInput: null,
            errorFormatNumber: false,
            previousKeyShift: false,
            previousKeyCtrl: false,
            decimalPartValue: 0,
            stepValue: 0,
            keyInput: 0
        }
    },
    watch: {
    },
    mounted() {
        
    },
    created() {
        //1. nếu valueInput có giá trị thì gán cho value
        if(this.valueInput || this.valueInput === 0){
            this.valueNumber = this.getNumber(this.valueInput);
        }
        else{
            this.valueNumber = null;
            this.value = "";
        }
        
        //3. nếu input có button thì set style cho input
        if(this.buttonInput){
            this.styleInput = 'padding-right: 28px;';
        }
        else if(this.iconInput){
            //4. nếu input có icon thì set style cho input
            this.styleInput = 'padding-left: 38px';
        }
        
        this.value = this.formatMoney(this.valueNumber);
        if(String(this.stepValueInput).indexOf(",") != -1){
            this.stepValue = Number(String(this.stepValueInput).replace(",","."));
        }else{
            this.stepValue = this.stepValueInput;
        }
        
    },
    methods: {
        /**
         * Hàm chuyển giá trị kiểu string về kiểu number
         * @param {*} value giá trị cần chuyển đổi
         * @author LTVIET (13/04/2023)
         */
        getNumber(value){
            value = String(value).indexOf(".") == -1 ? value : String(value).replaceAll('.','');
            value = String(value).indexOf(",") == -1 ? Number(value) : Number(value.replaceAll(',','.'));
            return value;
        },
        /**
         * Hàm xử lý sự kiện blur input
         * @author LTVIET (05/03/2023)
         */
        onValidateBlur(){
            if(this.required && (this.value == null || this.value == undefined || this.value == "")){
                //1. nếu input required và có giá trị rỗng 
                //1.1. set invalid = true và hiện thị thông báo lỗi không được để trống
                if(this.value!==0){
                    this.inValid = true;
                    if(this.label){
                        this.notifyError = this.label + resourceJS.error.emptyInput;
                    }else{
                        this.notifyError = resourceJS.error.emptyInput;
                    }
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
                    this.inValid = false;
                }
            }
            if(!this.inValid){
                this.$emit('getValueInput',this.valueNumber);
            }
        },

        /**
         * Hàm xử lý sự kiện click vào button tăng giá trị
         * @author LTVIET (05/03/2023)
         */
        handleEventIncreaseValue() {
            //2. nếu giá trị rỗng thì gán bằng 0
            if((this.valueNumber == "" || this.valueNumber == null || this.valueNumber == undefined) && this.valueNumber !== 0){
                this.valueNumber = 0;
                this.$emit('getValueInput',0);
            }
            this.valueNumber = this.valueNumber + Number(this.stepValue);
            if(this.stepValue < 1 && this.stepValue > 0){
                let valueRound = 1/this.stepValue;
                this.valueNumber = Math.round(this.valueNumber*valueRound)/valueRound;
            }
            this.$emit('getValueInput',this.valueNumber);
            this.value = this.formatMoney(this.valueNumber);
        },

        /**
         * Hàm xử lý sự kiện click vào button giảm giá trị
         * @author LTVIET (05/03/2023)
         */
        handleEventDecreaseValue(){
            //1. nếu giá trị rỗng thì gán bằng 0
            if(this.valueNumber == "" || this.valueNumber == null || this.valueNumber == undefined){
                this.valueNumber = 0;
                this.$emit('getValueInput',0);
            }
            this.valueNumber = this.valueNumber - Number(this.stepValue);
            if(this.stepValue < 1 && this.stepValue > 0){
                let valueRound = 1/this.stepValue;
                this.valueNumber = Math.round(this.valueNumber*valueRound)/valueRound;
            }
            if(this.valueNumber < 0){
                this.valueNumber = 0;
            }
            this.$emit('getValueInput',this.valueNumber);
            this.value = this.formatMoney(this.valueNumber);
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
         handleEventKeyDown(event){
            let keyCode = event.keyCode;
            if(keyCode == enumJS.keyCtrl){
                this.previousKeyCtrl = true;
            }
            
            if(!((keyCode < 31) || (keyCode >= 48 && keyCode <=57) || (keyCode >= 96 && keyCode <= 105) 
                    || (keyCode >=37 && keyCode <= 40)) && keyCode!=188){
                if(!(this.previousKeyCtrl && keyCode == 65)){
                    event.preventDefault();
                }
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
         handleEventKeyUp(event){
            let keyCode = event.keyCode;
            if(keyCode == enumJS.keyShift){
                this.previousKeyShift = false;
            }
            if(keyCode == enumJS.keyCtrl){
                this.previousKeyCtrl = false;
            }
        },


        /**
         * Hàm truyền dữ liệu ra lớp cha khi nhập dữ liệu mới vào input
         * @author LTVIET(06/03/2023)
         */
        handleEventInput(event){
            if(!this.value){
                this.valueNumber = this.value;
            }else{
                this.valueNumber = this.getNumber(this.value);
            }
            if(event.data != ","){
                this.value = this.formatMoney(this.valueNumber);
            }
            if(this.required && (Number(this.value) == null || Number(this.value) == undefined || Number(this.value) == "")){
                if(this.value===0){
                    this.inValid = false;
                }
            }
            this.$emit("getValueEventInput",this.valueNumber);
        },

        /**
         * Hàm format lại giá trị theo định dạng tiền
         * @param {*} value giá trị của input
         * @author LTVIET(06/03/2023)
         */
        formatMoney(value){
            if(value != "" && value != null && value != undefined){
                value = commonJS.formatNumber(value);
            }
            return value;
        }
    },
    
}
</script>

<style scoped>
@import url(./input.css);

</style>