<template>
    <div class="input__container" >
        <!-- label của input  -->
        <label v-if="label" for="">{{ label }}<span v-if="required" class="required"> *</span></label>
        <!-- input nhập dữ liệu -->    
        <input 
            ref="mInputNumber"
            :class="[{'input--error':inValid},{'disableInputClass':disable},classInput]" 
            :disabled="disable"
            class="classInput inputNumber" :style="styleInput"
            v-model="value"
            autocomplete="off"
            :tabindex="disable ? -1:0"
            @click="setSelect"
            @focus="handleEventFocusInput(idInput)"
            @focusout="handleEventFocusInput(null)"
            @input="handleEventInput"
            @keydown="handleEventKeyDown"
            @keyup="handleEventKeyUp"
            @blur="onValidateBlur"
            :placeholder="placeholder"
            :key="keyInput">    
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
import resourceJS from '../../js/resource.js'
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
            /**
             * kiểu dữ liệu dạng chữ của input
             */
            value: null,
            /**
             * kiểu dữ liệu dạng số của input
             */
            valueNumber: 0,
            inValid: false,
            notifyError: null,
            styleInput: null,
            errorFormatNumber: false,
            previousKeyShift: false, 
            previousKeyCtrl: false,
            /**
             * giá trị phần thập phân của số
             */
            decimalPartValue: 0, 
            /**
             * số đơn vị khi tăng giảm giá trị
             */
            stepValue: 0,
            keyInput: 0,
            oldValue: ""
        }
    },
    watch: {
    },
    mounted() {
        
    },
    created() {
        //1. nếu valueInput có giá trị thì gán cho value
        if(this.valueInput || this.valueInput === 0){
            const result = this.getNumber(this.valueInput);
            if(result[0]){
                this.valueNumber = result[1];
            }
            this.value = this.formatMoney(result[1]);
        }
        else{
            this.valueNumber = null;
            this.value = "";
            this.value = this.formatMoney(this.valueNumber);
        }
        //3. nếu input có button thì set style cho input
        if(this.buttonInput){
            this.styleInput = 'padding-right: 28px;';
        }
        else if(this.iconInput){
            //4. nếu input có icon thì set style cho input
            this.styleInput = 'padding-left: 38px';
        }
        
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
            value = String(value).indexOf(",") == -1 ? String(value) : String(value).replaceAll(',','.');
            const index = String(value).indexOf(".");
            let check = true;
            if(index != -1){
                const arr = String(value).split(".");
                if(arr[0].length > 15 || arr[1].length > 4){
                    check = false;
                }
            }else{
                if(String(value).length > 15){
                    check = false;
                }
            }
            return check ? [true,Number(value)]:[false,value];
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
                const result = this.getNumber(this.value);
                let length = String(result[1]).length;
                if(length > 15){
                    //2.1. nếu độ dài số nhập vào dài quá 14 ký tự thì không cho nhập vào
                    //--> set invalid = true và hiện thị thông báo lỗi không được nhấp giá trị quá dài
                    this.inValid = true;
                    this.notifyError = resourceJS.error.errorMaxLengthNumber;
                }
                else{
                    const index = String(result[1]).indexOf(".");
                    if(index != -1){
                        const arr = String(result[1]).split(".");
                        if(arr[0].length > 15){
                            this.inValid = true;
                            this.notifyError = resourceJS.error.errorMaxLengthIntegerPart;
                        }else if(arr[1].length > 4){
                            this.inValid = true;
                            this.notifyError = resourceJS.error.errorMaxLengthDecimalPart;
                        }
                    }
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
            if(String(this.valueNumber < 16)){  
                this.$emit('getValueInput',this.valueNumber);
            }
            this.value = this.formatMoney(this.valueNumber);
        },

        /**
         * Hàm gửi id của input ra lớp cha khi được focus
         * @author LTVIET (05/03/2023)
         */
         handleEventFocusInput(id){
            this.$emit('getValueIdInputNumberFocus',id);
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
            if(String(this.valueNumber < 16)){  
                this.$emit('getValueInput',this.valueNumber);
            }
            this.value = this.formatMoney(this.valueNumber);
        },

        /**
         * Hàm set focus vào input
         * @author LTVIET (05/03/2023)
         */
        setFocus() {
            this.$nextTick(function() {
                this.$refs["mInputNumber"].focus();
                this.setSelect();
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

            if(!Number(event.key) && Number(event.key) != 0 && keyCode != enumJS.keyBackSpace && keyCode != enumJS.keyComma && keyCode != enumJS.keyCtrl && keyCode != enumJS.keyTab
                && !(this.previousKeyCtrl && (keyCode == enumJS.keyA || keyCode == enumJS.keyV || keyCode ==enumJS.keyC))){
                this.value = this.oldValue;
            }else{
                this.oldValue = this.value;
            }
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
                const result = this.getNumber(this.value);
                if(result[0]){
                    this.valueNumber = result[1];
                    this.$emit("getValueEventInput",this.valueNumber);
                }
                if(event.data != ","){
                    this.value = this.formatMoney(result[1]);
                }
            }
            if(this.required && !Number(this.valueNumber)){
                if(this.value===0){
                    this.inValid = false;
                }
            }else{
                this.inValid = false;
            }
        },

        /**
         * Hàm bôi đen giá trị input date
         * @author LTVIET (05/03/2023)
         */
         setSelect() {
            this.$nextTick(function() {
                this.$refs["mInputNumber"]?.select();
            })
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