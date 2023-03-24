<template>
    <button 
        class="btn"
        :class="{'btn--default':isDefault,'btn--no-save':isNoSave}"
        @click="addEventClickBtn">
            {{ label }}
    </button>
</template>

<script>
export default {
    name:"MButton",
    props: {
        label: {
            type: String,
            required: false
        },
        typeButton: {
            type: String,
            required: false
        },
        isDefault: {
            type: Boolean,
            default: false
        },
        
    },
    data() {
        return {
            isNoSave: false
        }
    },
    created() {
        if(this.label == "Không lưu"){
            this.isNoSave = true;
        }
    },
    components:{

    },
    methods: {
        /**
         * Hàm xử lý sự kiện click button
         * @author LTVIET (05/03/2023)
         */
        addEventClickBtn() {
            this.$emit('btnAddOnClickBtn');
        }
    },
}
</script>

<style scoped>
@import url(./button.css);
</style>