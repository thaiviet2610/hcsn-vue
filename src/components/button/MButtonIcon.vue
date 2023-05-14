<template>
    <button 
        ref="mButtonIcon"
        :id="idButtonIcon"
        @click="addEventClickBtnIcon"
        @focus="handleEventFocus(idButtonIcon)"
        @focusout="handleEventFocus(null)"

        class="btn__icon">
            <div v-if="classImage" :class="classImage"></div>
            <div :class="classIcon"></div>
    </button>
</template>

<script>
export default {
    name:"MButtonIcon",
    props: {
        classIcon: {
            type: String,
            default: null
        },
        classImage:{
            type: String,
            default: ""
        },
        idButtonIcon: {
            type: String,
            default: null
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
    
    methods: {
        /**
         * Hàm xử lý sự kiện click button
         * @author LTVIET (05/03/2023)
         */
        addEventClickBtnIcon(event) {
            this.$emit('addOnClickBtnIcon',event);   
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
         * Hàm gửi id của button đang focus cho lớp cha
         * @author LTVIET (05/03/2023)
         */
         handleEventFocus(id){
            this.$emit('getIdButtonFocus',id);
        }

        
    }
}
</script>

<style scoped>
@import url(./button.css);
button{
    outline: none;
}

/* button:focus{
    outline: 3px solid #bce7f1 !important;
} */
</style>