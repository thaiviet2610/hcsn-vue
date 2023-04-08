<template>
    <div class="input__container" >
        <!-- label của input  -->
        <label v-if="label" for="">{{ label }}<span v-if="required" class="required">*</span></label>
        <!-- input hiển thị dư liệu, không được nhập (nếu disable)  -->
        <input 
            ref="mInput"
            :class="[{'inputNumber':typeValue=='number'}]"
            class="classInput" 
            style="background-color: #f5f5f5;"
            :disabled="true"
            :value="value"
            tabindex="-1"
            :placeholder="placeholder">  
    </div>
</template>

<script>
export default {
    name:"MInputDisable",
    props: {
        modelValue:[String,Number,Boolean],
        value: {
            type: [String,Number],
            default: null
        },
        placeholder: {
            type: String,
            required: false,
            default: null
        },
        label: {
            type: String,
            required: false
        },
        required: {
            type: Boolean,
            required: false,
            default: false
        },
        typeValue: {
            type: String,
            required: false,
            default: ""
        }
    },
    components:{

    },
    data() {
        return {
        }
    },
    created() {
        
    },
}
</script>

<style scoped>
@import url(./input.css);
</style>