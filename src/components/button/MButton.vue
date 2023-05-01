<template>
    <button 
        ref="mButton"
        class="btn--outline"
        @click="addEventClickBtn"
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
            required: false
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

        
    },
}
</script>

<style scoped>
@import url(./button.css);
</style>