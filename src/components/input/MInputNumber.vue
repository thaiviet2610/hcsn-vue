<template>
    <div class="input__container" >
        <!-- label của input  -->
        <label v-if="label" for="">{{ label }}<span v-if="required" class="required"> *</span></label>
        <!-- input nhập dữ liệu -->    
        <div style="position: relative;">
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
            @mouseenter="handleEventMouseEnter"
            :placeholder="placeholder"
            :key="keyInput">
            <MTooltip
                v-if="isShowTooltip"
                :text="value"
                class="input-number-tooltip">
            </MTooltip>
        </div>    
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
import { mouseEnter } from '@/js/mouseenter.js';
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
            errorformatValue: false,
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
            oldValue: "",
            isShowTooltip: false,
        }
    },
    created() {
        //1. nếu valueInput có giá trị thì gán cho value
        if(this.valueInput || this.valueInput === 0){
            const oldValue = JSON.stringify(this.valueInput);
            this.value = JSON.parse(oldValue);
            this.value = this.formatValue(this.value);
        }
        else{
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
        convertStringToNumber(value){
            value = String(value).indexOf(".") == -1 ? value : String(value).replaceAll('.','');
            value = String(value).indexOf(",") == -1 ? value : String(value).replaceAll(',','.');
            return Number(value);
        },

        /**
         * Hàm kiểm tra độ dài của giá trị số
         * @param {*} value giá trị cần kiểm tra độ dài
         * @author LTVIET (13/04/2023)
         */
        checkMaxlength(value){
            value = String(value).replaceAll(".","");
            const index = String(value).indexOf(",");
            let check = true;
            if(index != -1){
                const arr = String(value).split(",");
                if(arr[0].length > 15 || arr[1].length > 4){
                    check = false;
                }
            }else{
                if(String(value).length > 15){
                    check = false;
                }
            }
            return check;
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
                const value = this.value.replaceAll(".","");
                let length = value.length;
                const index = value.indexOf(",");
                if(index == -1 && length > 15){
                    //2.1. nếu độ dài số nhập vào dài quá 15 ký tự thì không cho nhập vào
                    //--> set invalid = true và hiện thị thông báo lỗi không được nhấp giá trị quá dài
                    this.inValid = true;
                    this.notifyError = resourceJS.error.errorMaxLengthNumber;
                }
                else if(index != -1){
                    const arr = value.split(",");
                    if(arr[0].length > 15){
                        this.inValid = true;
                        this.notifyError = resourceJS.error.errorMaxLengthIntegerPart;
                    }else if(arr[1].length > 4){
                        this.inValid = true;
                        this.notifyError = resourceJS.error.errorMaxLengthDecimalPart;
                    }
                }
            }
        },

        /**
         * Hàm xử lý sự kiện click vào button tăng giá trị
         * @author LTVIET (05/03/2023)
         */
        handleEventIncreaseValue() {
            let valueNumber = this.convertStringToNumber(this.value);
            // nếu giá trị rỗng thì gán bằng 0
            if(!this.value && this.value !== 0){
                this.value = 0;
                this.$emit('getValueInput',0);
            }
            valueNumber = valueNumber + Number(this.stepValue);
            if(this.stepValue < 1 && this.stepValue > 0){
                let valueRound = 1/this.stepValue;
                valueNumber = Math.round(valueNumber*valueRound)/valueRound;
            }
            this.value = this.formatValue(valueNumber);
            if(this.checkMaxlength(this.value)){  
                this.$emit('getValueInput',valueNumber);
            }
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
            let valueNumber = this.convertStringToNumber(this.value);
            // nếu giá trị rỗng thì gán bằng 0
            if(!this.value && this.value !== 0){
                this.value = 0;
                this.$emit('getValueInput',0);
            }
            valueNumber = valueNumber - Number(this.stepValue);
            if(this.stepValue < 1 && this.stepValue > 0){
                let valueRound = 1/this.stepValue;
                valueNumber = Math.round(valueNumber*valueRound)/valueRound;
            }
            if(valueNumber < 0){
                valueNumber = 0;
            }
            this.value = this.formatValue(valueNumber);
            if(this.checkMaxlength(this.value)){  
                this.$emit('getValueInput',valueNumber);
            }
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
         * Hàm xử lý sự kiện mouse enter
         * @param {*} event 
         */
        handleEventMouseEnter(event){
            this.isShowTooltip = mouseEnter(event);
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

            if(!Number(event.key) && Number(event.key) != 0 && keyCode != enumJS.keyBackSpace && keyCode != enumJS.keyComma && keyCode != enumJS.keyCtrl 
                && keyCode != enumJS.keyTab && keyCode != enumJS.keyEnter && keyCode != enumJS.keyLeft && keyCode != enumJS.keyRight && keyCode != enumJS.arrowDown && keyCode != enumJS.arrowUp 
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
            if(event.data != ","){
                this.value = this.formatValue(this.value);
            }
            if(this.checkMaxlength(this.value)){
                const valueNumber = this.convertStringToNumber(this.value);
                this.$emit("getValueEventInput",valueNumber);
            }
            
            this.inValid = false;
            
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
        formatValue(value){
            if(value != "" && value != null && value != undefined){
                if(typeof(value) == 'string'){
                    value = value.indexOf(".") == -1 ? value:value.replaceAll(".","");
                    value = value.indexOf(",") == -1 ? value:value.replaceAll(",",".");
                    let index  = 0;
                    for(let i = 0;i<value.length;i++){
                        if(value.charAt(i) != 0){
                            index = i;
                            break;
                        }
                    }
                    value = value.indexOf(".") == -1 ? value.substring(index):'0'+value.substring(index);
                }
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