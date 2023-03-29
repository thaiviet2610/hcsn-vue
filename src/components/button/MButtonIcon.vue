<template>
    <button 
        ref="mButtonIcon"
        :class="{'btn--default':isDefault}"
        @click="addEventClickBtnIcon">
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

        setFocus(){
            this.$nextTick(function() {
                this.$refs["mButtonIcon"].focus();
            })
        }
    }
}
</script>

<style scoped>
@import url(./button.css);
</style>