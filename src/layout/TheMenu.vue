<template>
    
        <menu>
        <div class="menu-header">
            <div class="menu-header__item menu__item--selected" :data_tooltip_right="tooltipHeader"></div>
        </div>
        <div class="menu__body">
            <router-link to="/overview"
            class="menu-body__item"
            :data_tooltip_right="tooltipBodyOverview"
            >
            <div class="menu-body__item2 menu-body__item2--icon1"></div>
            </router-link>
            <router-link to="/"
            class="menu-body__item"
            :data_tooltip_right="tooltipBodyAsset"
            >
            <div class="menu-body__item2 menu-body__item2--icon2"></div>
            </router-link>
            <router-link to="/assetHTDB"
            class="menu-body__item"
            :data_tooltip_right="tooltipBodyAssetHTDB"
            >
            <div class="menu-body__item2 menu-body__item2--icon3"></div>
            </router-link>
            <router-link to="/tools"
            class="menu-body__item"
            :data_tooltip_right="tooltipBodyTool"
            >
            <div class="menu-body__item2 menu-body__item2--icon4"></div>
            </router-link>
            <router-link to="/category"
            class="menu-body__item"
            :data_tooltip_right="tooltipBodyCategory"
            >
            <div class="menu-body__item2 menu-body__item2--icon5"></div>
            </router-link>
            <router-link to="/search"
            class="menu-body__item"
            :data_tooltip_right="tooltipBodySearch"
            >
            <div class="menu-body__item2 menu-body__item2--icon6"></div>
            </router-link>
            <router-link to="/report"
            class="menu-body__item"
            :data_tooltip_right="tooltipBodyReport"
            >
            <div class="menu-body__item2 menu-body__item2--icon7"></div>
            </router-link>
        </div>
        <div class="menu__footer">
            <MButtonIcon
                class="menu_footer__item"
                :data_tooltip_right="tooltipFooter"
                classIcon="menu_footer__item--image"
                @addOnClickBtnIcon="handleEventClickBtnExpandMenu">
            </MButtonIcon>
        </div>
        </menu>
    
</template>

<script>
import resourceJS from '@/js/resourceJS';
export default {
    name: "TheMenu",
    props: ["menuIndex"],
    components: {
    },
    data() {
        return {
            isShow: true,
            tooltipHeader: resourceJS.tooltip.theMenu.header,
            tooltipBodyOverview: resourceJS.tooltip.theMenu.body.overview,
            tooltipBodyAsset: resourceJS.tooltip.theMenu.body.asset,
            tooltipBodyAssetHTDB: resourceJS.tooltip.theMenu.body.assetHTDB,
            tooltipBodyCategory: resourceJS.tooltip.theMenu.body.category,
            tooltipBodyTool: resourceJS.tooltip.theMenu.body.tool,
            tooltipBodySearch: resourceJS.tooltip.theMenu.body.search,
            tooltipBodyReport: resourceJS.tooltip.theMenu.body.report,
            tooltipFooter: resourceJS.tooltip.theMenu.footer.expand,

        };
    },
    methods: {

        /**
         * Hàm xử lý sự kiện click vào button mở sidebar
         * @author LTVIET (06/03/2023)
         */
         handleEventClickBtnExpandMenu(){
            this.$emit('onOpen',this.isSelected);
        }
    },
};
</script>

<style scoped>
div::-webkit-scrollbar {
    height: 4px;
    width: 4px;
}

::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgb(0, 0, 0, 0.3);
    /* border-radius: 2px; */

}

::-webkit-scrollbar-thumb {
    box-shadow: inset 0 0 6px rgb(0, 0, 0, 0.3);
    border-radius: 1.5px;
}
</style>
