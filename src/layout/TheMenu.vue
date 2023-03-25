<template>
    <div>
        <menu v-if="isShow">
        <div class="menu-header">
            <div class="menu-header__item menu__item--selected" data_tooltip_right="MISA QUẢN LÝ ĐÀO TẠO"></div>
        </div>
        <div class="menu__body">
            <router-link to="/overview"
            class="menu-body__item"
            data_tooltip_right="Tổng quan"
            >
            <div class="menu-body__item2 menu-body__item2--icon1"></div>
            </router-link>
            <router-link to="/"
            class="menu-body__item"
            data_tooltip_right="Tài sản"
            >
            <div class="menu-body__item2 menu-body__item2--icon2"></div>
            </router-link>
            <router-link to="/assetHTDB"
            class="menu-body__item"
            data_tooltip_right="Tài sản HT-DB"
            >
            <div class="menu-body__item2 menu-body__item2--icon3"></div>
            </router-link>
            <router-link to="/tools"
            class="menu-body__item"
            data_tooltip_right="Công cụ dụng cụ"
            >
            <div class="menu-body__item2 menu-body__item2--icon4"></div>
            </router-link>
            <router-link to="/category"
            class="menu-body__item"
            data_tooltip_right="Danh mục"
            >
            <div class="menu-body__item2 menu-body__item2--icon5"></div>
            </router-link>
            <router-link to="/search"
            class="menu-body__item"
            data_tooltip_right="Tra cứu"
            >
            <div class="menu-body__item2 menu-body__item2--icon6"></div>
            </router-link>
            <router-link to="/report"
            class="menu-body__item"
            data_tooltip_right="Báo cáo"
            >
            <div class="menu-body__item2 menu-body__item2--icon7"></div>
            </router-link>
        </div>
        <div class="menu__footer">
            <MButtonIcon
                class="menu_footer__item"
                data_tooltip_right="Mở rộng"
                classIcon="menu_footer__item--image"
                @addOnClickBtnIcon="handleEventClickBtnExpandMenu">
            </MButtonIcon>
        </div>
        </menu>
        <!-- sidebar -->
        <TheSidebar
        v-else
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
        };
    },
    methods: {
        /**
         * Hàm xử lý sự kiện click vào button đóng sidebar
         * @author LTVIET (06/03/2023)
         */
        handleEventCloseSidebar() {
            this.isShow = true;
        },

        /**
         * Hàm xử lý sự kiện click vào button mở sidebar
         * @author LTVIET (06/03/2023)
         */
        handleEventClickBtnExpandMenu(){
            this.isShow = false;
        }
    },
};
</script>

<style scoped></style>
