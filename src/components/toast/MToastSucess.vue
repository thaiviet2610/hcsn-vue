<template>
    <div>
        <div class="toast toast--success">
            <!-- phần nội dung  -->
            <div class="toast__left">
                <div class="dialog-icon"></div>
                <div class="toast__text--left">{{ notify }} 
                    <span class="toast-text--success">{{ content }}</span> 
                </div>
            </div>
            <!-- phần button (nếu có)  -->
            <div class="toast__right">
                <!-- button hoàn tác  -->
                <MButton v-if="buttonUndo"
                    :label="label"
                    class="toast__text--right"></MButton>
                    <!-- button đóng  -->
                <MButtonIcon v-if="buttonClose"
                    :classIcon="classIcon"
                    class="toast--close"
                    @addOnClickBtnIcon="addOnClickBtnClose">
                </MButtonIcon>
            </div>
        </div>
    </div>
</template>

<script>
import MButton from '../button/MButton.vue';
export default {
    name:"MToastSucess",
    components:{
        MButton,
    },
    props: {
        notify: {
            type: String,
            default: null
        },
        content: {
            type: String,
            default: null
        },
        buttonUndo: {
            type: Boolean,
            default: false
        },
        buttonClose: {
            type: Boolean,
            default: false
        },
        link: {
            type: String,
            default: ""
        }
    },
    data() {
        return {
            label: "Hoàn tác",
            classIcon: "btn__toast--close",
        }
    },
    methods: {
        /**
         * Hàm xử lý sự kiện click vào button đóng
         * @author LTVIET (06/03/2023)
         */
        addOnClickBtnClose() {
            this.$emit('onClose');
        }
    },
}
</script>

<style scoped>
@import url(./toast.css);
</style>