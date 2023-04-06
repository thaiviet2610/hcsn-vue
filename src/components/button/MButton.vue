<template>
    <button 
        ref="mButton"
        :id="idButton"
        class="btn--outline"
        @click="addEventClickBtn"
        @focus="handleEventFocus"
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

        /**
         * Hàm bắt sự kiện focus vào button rồi gửi ra cho lớp cha xử lý
         * @param {*} event sự kiện focus
         * @author LTVIET (02/04/2023)
         */
         handleEventFocus(event){
            this.$emit("handleEventFocus",event.target.id);
        },
    },
}
</script>

<style scoped>
@import url(./button.css);
</style>