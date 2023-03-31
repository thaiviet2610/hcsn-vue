<template>
    <div class="input-wrapper" >
        <!-- label của input  -->
        <label v-if="label" for="">{{ label }}<span v-if="required" class="required">*</span></label>
        <!-- input nhập dữ liệu -->    
        <input
            ref="mInput"
            :class="{'input--error':inValid}" 
            class="classInput" :style="styleInput"
            v-model="value"
            @input="handleEventInput"
            @keydown.enter="onKeyDownSelecte"
            @blur="onValidateBlur"
            :placeholder="placeholder">    
        <!-- thẻ div hiển thị thông báo lỗi nếu có  -->
        <div v-if="inValid" class="error--info">{{ notifyError }}</div>
        <!-- button hiển thị icon nếu có  -->
        <div v-if="iconInput"  class="icon__search">
            <div class="icon__search--image"></div>
        </div>
        
    </div>
</template>

<script>
import resourceJS from '../../js/resourceJS.js'
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
        iconInput: {
            type: Boolean,
            default: false
        },
        tooltip:{
            type: String,
            default: null
        },
        valueInput: {
            type: String,
            default: ""
        },
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
        }
        //3. nếu input có icon set style cho input
        if(this.iconInput){
            //4. nếu input có icon thì set style cho input
            this.styleInput = 'padding-left: 38px';
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
                this.inValid = true;
                this.notifyError = this.label + resourceJS.error.emptyInput;
            }
            else{
                //2.4. nếu là các trường hợp còn lại thì set invalid = false
                this.inValid = false;
            }  
            if(!this.inValid){
                this.$emit('getValueInput',this.value);
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
        
        handleEventInput(){
            this.$emit("getValueEventInput",this.value);
        }
    },
    
}
</script>

<style scoped>
@import url(./input.css);
</style>