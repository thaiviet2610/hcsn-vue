<template>
    <button 
        ref="mButton"
        :id="idButton"
        class="btn--outline"
        @click="addEventClickBtn"
        >
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
        idButton: {
            type: String,
            default: ""
        }
    },
    data() {
        return {
        }
    },
    created() {
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