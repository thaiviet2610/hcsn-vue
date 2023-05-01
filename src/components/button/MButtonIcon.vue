<template>
    <button 
        ref="mButtonIcon"
        :id="idButtonIcon"
        @click="addEventClickBtnIcon"
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