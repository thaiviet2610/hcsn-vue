<template>
    <div>
        <menu v-if="isShow">
        <div class="menu-header">
            <div class="menu-header__item menu__item--selected" data_tooltip_right="MISA QUẢN LÝ ĐÀO TẠO"></div>
        </div>
        <div class="menu__body">
            <MButtonIcon
                :status="this.status[1]"
                class="menu-body__item"
                data_tooltip_right="Tổng quan"
                classIcon="menu-body__item2 menu-body__item2--icon1"
                @addOnClickBtnIcon="btnClickItem(1)">
            </MButtonIcon>
            <!-- <div
            @click="btnClickItem(1)"
            :status="this.status[1]"
            class="menu-body__item"
            data_tooltip_right="Tổng quan"
            >
            <div class="menu-body__item2 menu-body__item2--icon1"></div>
            </div> -->
            <MButtonIcon
                :status="this.status[2]"
                class="menu-body__item"
                data_tooltip_right="Tài sản"
                classIcon="menu-body__item2 menu-body__item2--icon2"
                @addOnClickBtnIcon="btnClickItem(2)">
            </MButtonIcon>
            <!-- <div
            @click="btnClickItem(2)"
            :status="this.status[2]"
            class="menu-body__item"
            data_tooltip_right="Tài sản"
            >
            <div class="menu-body__item2 menu-body__item2--icon2"></div>
            </div> -->
            <MButtonIcon
                :status="this.status[3]"
                class="menu-body__item"
                data_tooltip_right="Tài sản HT-DB"
                classIcon="menu-body__item2 menu-body__item2--icon3"
                @addOnClickBtnIcon="btnClickItem(3)">
            </MButtonIcon>
            <!-- <div
            @click="btnClickItem(3)"
            :status="this.status[3]"
            class="menu-body__item"
            data_tooltip_right="Tài sản HT-DB"
            >
            <div class="menu-body__item2 menu-body__item2--icon3"></div>
            </div> -->
            <MButtonIcon
                :status="this.status[4]"
                class="menu-body__item"
                data_tooltip_right="Công cụ dụng cụ"
                classIcon="menu-body__item2 menu-body__item2--icon4"
                @addOnClickBtnIcon="btnClickItem(4)">
            </MButtonIcon>
            <!-- <div
            @click="btnClickItem(4)"
            :status="this.status[4]"
            class="menu-body__item"
            data_tooltip_right="Công cụ dụng cụ"
            >
            <div class="menu-body__item2 menu-body__item2--icon4"></div>
            </div> -->
            <MButtonIcon
                :status="this.status[5]"
                class="menu-body__item"
                data_tooltip_right="Danh mục"
                classIcon="menu-body__item2 menu-body__item2--icon5"
                @addOnClickBtnIcon="btnClickItem(5)">
            </MButtonIcon>
            <!-- <div
            @click="btnClickItem(5)"
            :status="this.status[5]"
            class="menu-body__item"
            data_tooltip_right="Danh mục"
            >
            <div class="menu-body__item2 menu-body__item2--icon5"></div>
            </div> -->
            <MButtonIcon
                :status="this.status[6]"
                class="menu-body__item"
                data_tooltip_right="Tra cứu"
                classIcon="menu-body__item2 menu-body__item2--icon6"
                @addOnClickBtnIcon="btnClickItem(6)">
            </MButtonIcon>
            <!-- <div
            @click="btnClickItem(6)"
            :status="this.status[6]"
            class="menu-body__item"
            data_tooltip_right="Tra cứu"
            >
            <div class="menu-body__item2 menu-body__item2--icon6"></div>
            </div> -->
            <MButtonIcon
                :status="this.status[7]"
                class="menu-body__item"
                data_tooltip_right="Báo cáo"
                classIcon="menu-body__item2 menu-body__item2--icon7"
                @addOnClickBtnIcon="btnClickItem(7)">
            </MButtonIcon>
            <!-- <div
            @click="btnClickItem(7)"
            :status="this.status[7]"
            class="menu-body__item"
            data_tooltip_right="Báo cáo"
            >
            <div class="menu-body__item2 menu-body__item2--icon7"></div>
            </div> -->
        </div>
        <div class="menu__footer">
            <MButtonIcon
                class="menu_footer__item"
                data_tooltip_right="Mở rộng"
                classIcon="menu_footer__item--image"
                @addOnClickBtnIcon="isShow = false">
            </MButtonIcon>
        </div>
        </menu>
        <TheSidebar
        v-else
        :sidebarIndex="this.itemIndex"
        @onClose="handleEventCloseSidebar"
        ></TheSidebar>
    </div>
</template>

<script>
import TheSidebar from "./TheSidebar.vue";
export default {
    name: "TheMenu",
    props: ["menuIndex"],
    components: {
        TheSidebar,
    },
    data() {
        return {
            isShow: true,
            itemIndex: 0,
            status: {},
            isSelected: 0
        };
    },
    methods: {
        btnClickItem(index) {
            this.isShow = false;
            this.itemIndex = index;
            this.status[this.isSelected] = "";
        },
        /**
         * Hàm xử lý sự kiện click vào button đóng sidebar
         * @param {*} index vị trí item được chọn trước khi đóng sidebar
         * @author LTVIET (06/03/2023)
         */
        handleEventCloseSidebar(index) {
            this.isSelected = index;
            this.isShow = true;
            this.status[index] = "sidebar__selected";
        },
    },
};
</script>

<style scoped></style>
