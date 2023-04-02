<template>
    <button 
        ref="mButtonIcon"
        :id="idButtonIcon"
        :class="[{'btn--default':isDefault},{'btn_focus':isFocus}]"
        @focusout="isFocus = false"
        @click="addEventClickBtnIcon"
        @focus="handleEventFocus">
            <div :class="classIcon"></div>
    </button>
</template>

<script>
export default {
    name:"MButtonIcon",
    props: {
        label: {
            type: String,
            required: false,
            default: null
        },
        typeButton: {
            type: String,
            required: false,
            default: null
        },
        isDefault: {
            type: Boolean,
            default: false
        },
        classIcon: {
            type: String,
            default: null
        },
        idButtonIcon: {
            type: String,
            default: ""
        }
        
    },
    data() {
        return {
            isFocus: false
        }
    },
    created() {
    },
    components:{

    },
    
    methods: {
        /**
         * Hàm xử lý sự kiện click button
         * @author LTVIET (05/03/2023)
         */
        addEventClickBtnIcon() {
            this.$emit('addOnClickBtnIcon');   
        },

        /**
         * Hàm xử lý sự kiện focus vào button
         * @author LTVIET (05/03/2023)
         */
        setFocus(){
            this.$nextTick(function() {
                this.$refs["mButtonIcon"].focus();
            })
        },

        /**
         * Hàm bắt sự kiện focus vào button rồi gửi ra cho lớp cha xử lý
         * @param {*} event sự kiện focus
         * @author LTVIET (02/04/2023)
         */
         handleEventFocus(event){
            this.isFocus = true;
            this.$emit("handleEventFocus",event.target.id);
        },
    }
}
</script>

<style scoped>
@import url(./button.css);
</style>