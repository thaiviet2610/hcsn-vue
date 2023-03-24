<template>
    <div>
        <div id="sidebar" class="sidebar">
            <div class="sidebar-header" >
                <div class="sidebar-header__item"></div>
                <div class="sidebar-header__text" data_tooltip_right="MISA QUẢN LÝ ĐÀO TẠO">MISA QLTS</div>
            </div>
            <div class="sidebar__body">
                <div @click="btnClickItem(1)" class="sidebar-body__item" :status="this.status[1]">
                    <div class="sidebar-body__item2">
                        <div class="sidebar-body__item2--icon1"></div>
                    </div>
                    <div class="sidebar-body__text">Tổng quan</div>
                </div>
                <div @click="btnClickItem(2)" class="sidebar-body__item" :status="this.status[2]">
                    <div class="sidebar-body__item2 ">
                        <div class="sidebar-body__item2--icon2"></div>
                    </div>
                    <div class="sidebar-body__text">Tài sản</div>
                    <div class="sidebar-body__item2-icon">
                        <button class="sidebar-body__item2-icon--image"></button>
                    </div>
                </div>
                <div @click="btnClickItem(3)" class="sidebar-body__item" :status="this.status[3]">
                    <div class="sidebar-body__item2">
                        <div class="sidebar-body__item2--icon3"></div>
                    </div>
                    <div class="sidebar-body__text">Tài sản HT-DB</div>
                    <div class="sidebar-body__item2-icon">
                        <button class="sidebar-body__item2-icon--image"></button>
                    </div>
                </div>
                <div @click="btnClickItem(4)" class="sidebar-body__item" :status="this.status[4]">
                    <div class="sidebar-body__item2">
                        <div class="sidebar-body__item2--icon4"></div>
                    </div>
                    <div class="sidebar-body__text">Công cụ dụng cụ</div>
                    <div class="sidebar-body__item2-icon">
                        <button class="sidebar-body__item2-icon--image"></button>
                    </div>
                </div>
                <div @click="btnClickItem(5)" class="sidebar-body__item" :status="this.status[5]">
                    <div class="sidebar-body__item2">
                        <div class="sidebar-body__item2--icon5"></div>
                    </div>
                    <div class="sidebar-body__text">Danh mục</div>
                </div>
                <div @click="btnClickItem(6)" class="sidebar-body__item" :status="this.status[6]">
                    <div class="sidebar-body__item2">
                        <div class="sidebar-body__item2--icon6"></div>
                    </div>
                    <div class="sidebar-body__text">Tra cứu</div>
                    <div class="sidebar-body__item2-icon">
                        <button class="sidebar-body__item2-icon--image"></button>
                    </div>
                </div>
                <div @click="btnClickItem(7)" class="sidebar-body__item" :status="this.status[7]">
                    <div class="sidebar-body__item2">
                        <div class="sidebar-body__item2--icon7"></div>
                    </div>
                    <div class="sidebar-body__text">Báo cáo</div>
                    <div class="sidebar-body__item2-icon">
                        <button class="sidebar-body__item2-icon--image"></button>
                    </div>
                </div>
            </div>
            <div class="sidebar-footer">
                <div class="sidebar-footer__item" data_tooltip_right="Thu gọn">
                    <button @click="this.$emit('onClose',this.isSelected)" id="btnCollapseSidebar" class="sidebar-footer__item--image"></button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:"TheSidebar",
    props: ["sidebarIndex"],
    components:{

    },
    created() {
        this.status[this.sidebarIndex] = "sidebar__selected";
        this.itemIndex = this.sidebarIndex;
        this.isSelected = this.itemIndex;
    },
    data() {
        return {
            status: {},
            itemIndex: null,
            isSelected: 0
        }
    },
    methods: {
        btnClickItem(index) {
            this.itemIndex = index;
            this.status[this.isSelected] = "";
            this.status[index] = "sidebar__selected";
            this.isSelected = this.itemIndex;
        }
    },
}
</script>

<style scoped>

</style>