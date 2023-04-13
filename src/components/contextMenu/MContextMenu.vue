<template>
    <div @blur="this.$emit('blurContextMenu')" class="context__menu" 
        :style="styleContextMenu">
        <div class="context__menu--item"
            v-for="(item,index) in data" :key="index"
            @click="addOnClick(item)">
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
        },
        height: {
            type: Number,
            default: 0
        },
        width: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            classIcon: "",
            styleContextMenu: "",
        }
    },
    methods: {
        /**
         * Hàm xử lý sự kiện click vào item của contextmenu thì gửi giá trị đó ra ngoài lớp cha
         * @param {*} item item được chọn
         * @author LTVIET (06/03/2023)
         */
        addOnClick(item){
            if(this.entity){
                this.$emit("addOnClickItem",[item.type,this.entity]);
            }
        }
    },
    created() {
        this.styleContextMenu = `width: ${this.width}px; height: ${this.height}px; left: ${this.pageX}px;top: ${this.pageY}px;`;
    },
}
</script>

<style scoped>
@import url(./context-menu.css);
</style>