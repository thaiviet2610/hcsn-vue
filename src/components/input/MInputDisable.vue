<template>
    <div class="input-wrapper" >
        <!-- label của input  -->
        <label v-if="label" for="">{{ label }}<span v-if="required" class="required">*</span></label>
        <!-- input hiển thị dư liệu, không được nhập (nếu disable)  -->
        <input 
            ref="mInput"
            :class="[{'inputNumber':typeValue=='number'}]"
            class="classInput" 
            style="background-color: rgb(147 142 142 / 36%);"
            :disabled="true"
            :value="value"
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