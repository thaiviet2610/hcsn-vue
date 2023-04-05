<template>
    <button 
        ref="mCheckbox"
        v-if="checked"
        @click="addOnClick" 
        class="checkbox">
        <div class="checkbox__true"></div>
    </button>

    <button 
        ref="mCheckbox"
        v-else  
        @click="addOnClick" 
        class="checkbox">
        <div class="checkbox__false"></div>
    </button>
</template>

<script>
export default {
    name:"MCheckbox",
    props:{
        checked: {
            type: Boolean,
            default: false
        },
        idCheckbox: {
            type: String,
            default: ""
        }
    },
    components:{

    },
    data() {
        return {
            isFocus: false
        }
    },
    watch: {
    },
    created() {
    },
    methods: {
        /**
         * Hàm xử lý sự kiện click vào checkbox
         * @author LTVIET (26/03/2023)
         */
        addOnClick(){
            this.$emit('addOnClick');
            this.setFocus();
        },

        /**
         * Hàm xử lý sự kiện set focus vào checkbox
         * @author LTVIET (26/03/2023)
         */
        setFocus(){
            this.$nextTick(function() {
                this.$refs["mCheckbox"].focus();
            })
        },
    },
}
</script>

<style scoped>
@import url(./checkbox.css);

</style>