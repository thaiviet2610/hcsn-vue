<template>
    <div @blur="this.$emit('blurContextMenu')" class="context__menu" 
        :style="styleContextMenu">
        <div class="context__menu--item"
            v-for="(item,index) in data" :key="index"
            @click="addOnClick(index)">
                <div class="item--icon">
                    <div :class="item.icon"></div>
                </div>
                <div class="item--text">{{ item.text }}</div>
        </div>
    </div>
</template>

<script>

export default {
    name:"MContextMenu",
    components:{

    },
    props: {
        data: [Object,Array],
        pageX: {
            type: Number,
            default: 0,
        },
        pageY: {
            type: Number,
            default: 0,
        },
        entity: {
            type: Object,
            default: null
        }
    },
    data() {
        return {
            classIcon: "",
            styleContextMenu: "",
        }
    },
    methods: {
        addOnClick(index){
            if(this.entity){
                this.$emit("addOnClickItem",[index,this.entity]);
            }
        }
    },
    created() {
        this.styleContextMenu = `left: ${this.pageX}px;top: ${this.pageY}px;`;
    },
}
</script>

<style scoped>
@import url(./context-menu.css);
</style>