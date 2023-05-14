<template>
    <button 
        :id="idButton"
        ref="mButton"
        class="btn--outline"
        @click="addEventClickBtn"
        @focus="handleEventFocus(idButton)"
        @focusout="handleEventFocus(null)"
        >
        <div :class="classImage"></div>
            {{ label }}
    </button>
</template>

<script>
export default {
    name:"MButton",
    props: {
        // tên button
        label: {
            type: String,
            required: ""
        },
        idButton: {
            type: String,
            required: null
        },
        
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
         * Hàm gửi id của button đang focus cho lớp cha
         * @author LTVIET (05/03/2023)
         */
        handleEventFocus(id){
            this.$emit('getIdButtonFocus',id);
        }

        
    },
}
</script>

<style scoped>
@import url(./button.css);
</style>