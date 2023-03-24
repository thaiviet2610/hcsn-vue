<template>
    <button 
        ref="mButton"
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
    mounted() {
        this.setFocus();
    },
    methods: {
        /**
         * Hàm xử lý sự kiện click button
         * @author LTVIET (05/03/2023)
         */
        addEventClickBtn() {
            this.$emit('btnAddOnClickBtn');
        },
        /**
        * Hàm set focus vào button
        * @author LTVIET (05/03/2023)
        */
        setFocus() {
        this.$nextTick(function() {
            this.$refs["mButton"].focus();
        })
        }, 
    },
}
</script>

<style scoped>
@import url(./button.css);
</style>