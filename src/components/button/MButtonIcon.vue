<template>
    <button 
        :class="{'btn--default':isDefault,'btn--no-save':isNoSave}"
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
    methods: {
        /**
         * Hàm xử lý sự kiện click button
         * @author LTVIET (05/03/2023)
         */
        addEventClickBtnIcon() {
            this.$emit('addOnClickBtnIcon');   
        }
    }
}
</script>

<style scoped>
@import url(./button.css);
</style>