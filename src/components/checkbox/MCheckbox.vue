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
        }
    },
    components:{

    },
    data() {
        return {
            
        }
    },
    watch: {
    },
    methods: {
        addOnClick(){
            this.$emit('addOnClick');
            this.setFocus();
        },
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