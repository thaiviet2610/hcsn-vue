<template>
    <div class="input-wrapper" >
        <!-- label của input  -->
        <label v-if="label" for="">{{ label }}<span v-if="required" class="required">*</span></label>
        <!-- input hiển thị dư liệu, không được nhập (nếu disable)  -->
        <input v-if="disableInput"
            ref="mInput"
            :class="[{'input--error':inValid},{'inputNumber':isNumber}]"
            class="classInput" 
            style="background-color: rgb(147 142 142 / 36%);"
            :style="styleInput"
            :disabled="disableInput"
            :value="valueDisable"
            :type="typeInput"
            @blur="onValidateBlur"
            :placeholder="placeholder">  
        <!-- input nhập dữ liệu (nếu không disable)  -->    
        <input v-else
            ref="mInput"
            :class="[{'input--error':inValid},{'inputNumber':isNumber}]" 
            class="classInput" :style="styleInput"
            :disabled="disableInput"
            v-model="value"
            :type="typeInput"
            @input="handleEventInput"
            @keydown.enter="onKeyDownSelecte"
            @blur="onValidateBlur"
            :placeholder="placeholder">    
        <!-- thẻ div hiển thị thông báo lỗi nếu có  -->
        <div v-if="inValid" class="error--info">{{ notifyError }}</div>  
        <!-- thẻ div hiển thị button tăng giảm giá trị (nếu có)  -->
        <div v-if="buttonInput" class="input__icon2" >
            <MButtonIcon
                class="input__icon2--image"
                classIcon="input__icon--dropdown1"
                :class="{'disableClass': disableInput}"
                @addOnClickBtnIcon="handlerEventIncreaseValue">
            </MButtonIcon>
            <MButtonIcon
                class="input__icon2--image"
                classIcon="input__icon--dropdown2"
                :class="{'disableClass': disableInput}"
                @addOnClickBtnIcon="handlerEventDecreaseValue">
            </MButtonIcon>
        </div>
        
        <!-- button hiển thị icon nếu có  -->
        <div v-if="iconInput"  class="icon__search">
            <div class="icon__search--image"></div>
        </div>
        <!-- <MButtonIcon
                v-if="iconInput" 
                class="icon__search"
                classIcon="icon__search--image">
            </MButtonIcon> -->
        
    </div>
</template>

<script>
import resourceJS from '../../js/resourceJS.js'
import commonJS from '@/js/common';
export default {
    name:"MInput",
    props: {
        modelValue:[String,Number,Boolean],
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
        typeValue: {
            type: String,
            required: false
        },
        disableInput: {
            type: Boolean,
            required: false,
            default: false
        },
        buttonInput: {
            type: Boolean,
            default: false
        },
        valueDisable: {
            type: [String,Number],
            default: null
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
            isNumber: false,
            styleInput: null,
            typeInput: null,
            errorFormatNumber: false,
            classInput: null
        }
    },
    watch: {
        
    },
    mounted() {
        
    },
    created() {
        //1. nếu modelValue có giá trị thì gán cho value
        if(this.modelValue){
            this.value = this.modelValue;
            if(this.typeValue == "number" && this.value < 10){
                this.value = `0${this.value}`;
            }
        }else{
            //2. nếu modelValue không có giá trị và input thuộc kiểu number hoặc rate
            if(this.typeValue == "number" || this.typeValue == "rate"){
                
                //2.1. gán giá trị mặc định = 0
                this.value = 0;
                
            }
        }
        //3. nếu input có button thì input là kiểu number và set style cho input
        if(this.buttonInput){
            this.styleInput = 'padding-right: 28px;';
        }
        else if(this.iconInput){
            //4. nếu input có icon thì set style cho input
            this.styleInput = 'padding-left: 38px';
        }
        
        //5. nếu input có kiểu dữ liệu là date thì set type input là date
        if(this.typeValue == "date"){
            this.typeInput = "date";
        }
        if(this.typeValue == "number" || this.typeValue == "rate"){
            this.isNumber = true;
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
                if(this.typeValue=="number"||this.typeValue=="rate"){
                    if(this.value===0){
                        this.inValid = false;
                    }else{
                        this.inValid = true;
                        this.notifyError = this.label + resourceJS.error.emptyInput;
                    }
                }else{
                    this.inValid = true;
                    this.notifyError = this.label + resourceJS.error.emptyInput;
                }
                
            }
            else if(this.typeValue == "number" || this.typeValue == "rate"){
                //2. nếu input kiểu number hoặc rate
                //2.1. kiểu tra xem giá trị nhập vào có phải là số không
                if(!(/^[0-9]+([.]?[0-9]+)*([,][0-9]+)?$/.test(this.value))){
                    //2.2. nếu không phải thì set invalid = true và
                    // hiện thị thông báo lỗi giá trị nhập vào không phải là số
                    this.inValid = true;
                    this.notifyError = this.label + resourceJS.error.errorFormatNumber;
                }else{
                    //2.3. nếu giá trị nhập vào là số
                    let length = this.value.length;
                    if(this.typeValue == "number"){ 
                        //nếu là kiểu number
                        if(length > 14){
                            //2.3.1. nếu độ dài số nhập vào dài quá 14 ký tự thì không cho nhập vào
                            //--> set invalid = true và hiện thị thông báo lỗi không được nhấp giá trị quá dài
                            this.inValid = true;
                            this.notifyError = resourceJS.error.errorMaxLengthNumber;
                        }else{
                            if(this.isFormat=="money"){
                                this.value = commonJS.formatMoney(this.getMoney(this.value));
                                // if(/^[0-9]+$/.test(this.value)){
                                //     console.log(3);
                                //     this.value = commonJS.formatMoney(this.value);
                                // }
                            }else{
                                this.value = Number(this.value);
                                if(this.value<10){
                                    this.value = `0${this.value}`;
                                }
                            }
                            //--> nếu ngược lại thì set invalid = false
                            this.inValid = false;
                        }
                    }else if(this.typeValue == "rate"){
                        //nếu là kiểu rate
                        if(this.value < 0 || this.value > 100){
                            //2.3.2.1 nếu giá trị nằm ngoài khoảng từ 0->100%
                            //-->set invalid = true và hiện thị thông báo lỗi tỷ lệ nằm ngoài khoảng 0-100%
                            this.inValid = true;
                            this.notifyError = resourceJS.error.errorFormatRate;
                        }else if(length > 14){
                            //2.3.2.2. nếu độ dài số nhập vào dài quá 14 ký tự thì không cho nhập vào
                            //--> set invalid = true và hiện thị thông báo lỗi không được nhấp giá trị quá dài
                            this.inValid = true;
                            this.notifyError = resourceJS.error.errorMaxLengthNumber;
                        }else{
                            //--> nếu ngược lại thì set invalid = false
                            this.inValid = false;
                        }
                        
                    }
                }
            }else{
                //2.4. nếu là các trường hợp còn lại thì set invalid = false
                this.inValid = false;
            }  
            if(!this.inValid){
                // if(this.isFormat=="money"){
                //     this.value = this.getMoney(this.value);
                // }

                this.$emit("update:modelValue",this.value);
                this.$emit('getValueInput',this.value);

                // this.value = commonJS.formatMoney(this.value);
            }
        },
        /**
         * Hàm xử lý sự kiện click vào button tăng giá trị
         * @author LTVIET (05/03/2023)
         */
        handlerEventIncreaseValue() {
            //1. set focus vào input
            this.setFocus();
            //2. nếu giá trị rỗng thì gán bằng 0
            if(this.value == "" || this.value == null || this.value == undefined){
                this.value = 0;
                this.$emit('getValueInput',this.value);
            }
            
            if(this.typeValue == "rate"){
                //nếu kiểu giá trị là rate 
                //--> tăng giá trị lên 0.01
                this.value = 0.1 + Number(this.value);
                this.value = Math.round(this.value*10)/10;
                this.$emit('getValueInput',this.value);
            }else{
                //nếu là kiểu number
                //--> tăng giá trị lên 1
                this.value = 1 + Number(this.value);
                this.$emit('getValueInput',this.value);
                if(this.value < 10){
                    this.value = `0${this.value}`;
                }
            }
        },
        /**
         * Hàm xử lý sự kiện click vào button giảm giá trị
         * @author LTVIET (05/03/2023)
         */
        handlerEventDecreaseValue(){
            //1. set focus vào input
            this.setFocus();
            //2. nếu giá trị rỗng thì gán bằng 0
            if(this.value == "" || this.value == null || this.value == undefined){
                this.value = 0;
            }
             
            if(this.typeValue == "rate"){
                //nếu kiểu giá trị là rate
                //--> giảm giá trị đi 0.01
                this.value = Number(this.value) - 0.1 ;
                this.value = Math.round(this.value*10)/10;
                if(this.value <= 0 ){
                    //nếu giá trị nhỏ hơn 0 thì gán bằng 0
                    this.value = 0;
                }
                this.$emit('getValueInput',this.value);
            }
            else{
                //nếu là kiểu number
                //--> giảm giá trị đi 1
                this.value = Number(this.value) - 1 ;
                // console.log("value:",this.value);
                if(this.value <= 0 ){
                    //nếu giá trị nhỏ hơn 0 thì gán bằng 0
                    this.value = 0;
                }
                this.$emit('getValueInput',this.value);
                if(this.value < 10 && this.value > 0){
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
            // let keyCode = event.keyCode;
            // if(keyCode==13){
            //     console.log(this.value);
            //     // this.$emit("update:modelValue",this.value);
            // }
            this.$emit("keydownEnter",this.value);
        },
        
        /**
         * Hàm chuyển dữ liệu tiền từ string về dạng number trong trường hợp dữ liệu tiền được format thành dạng string
         * @param {*} value giá trị cần chuyển đổi
         * @author LTVIET(14/03/2023)
         */
         getMoney(value){
            return Number(value.replaceAll('.',''));
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