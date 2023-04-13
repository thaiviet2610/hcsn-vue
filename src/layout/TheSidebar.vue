<template>
    <div>
        <div id="sidebar" class="sidebar">
            <div class="sidebar-header" >
                <div class="sidebar-header__item"></div>
                <div class="sidebar-header__text" :data_tooltip_right="tooltipHeader">MISA QLTS</div>
            </div>
            <div class="sidebar__body">
                <router-link to="/customer" 
                    class="sidebar-body__item">
                    <div class="sidebar-body__item2">
                        <div class="sidebar-body__item2--icon1"></div>
                    </div>
                    <div class="sidebar-body__text">{{ txtBodyOverview }}</div>
                </router-link>
                <router-link to="/" 
                    class="sidebar-body__item">
                    <div class="sidebar-body__item2 ">
                        <div class="sidebar-body__item2--icon2"></div>
                    </div>
                    <div class="sidebar-body__text">{{ txtBodyAsset }}</div>
                    <div class="sidebar-body__item2-icon">
                        <button class="sidebar-body__item2-icon--image"></button>
                    </div>
                </router-link>
                <router-link to="/assetHTDB" 
                    class="sidebar-body__item">
                    <div class="sidebar-body__item2">
                        <div class="sidebar-body__item2--icon3"></div>
                    </div>
                    <div class="sidebar-body__text">{{ txtBodyAssetHTDB }}</div>
                    <div class="sidebar-body__item2-icon">
                        <button class="sidebar-body__item2-icon--image"></button>
                    </div>
                </router-link>
                <router-link to="/tools" 
                    class="sidebar-body__item">
                        <div class="sidebar-body__item2">
                            <div class="sidebar-body__item2--icon4"></div>
                        </div>
                        <div class="sidebar-body__text">{{ txtBodyTool }}</div>
                        <div class="sidebar-body__item2-icon">
                            <button class="sidebar-body__item2-icon--image"></button>
                        </div>
                </router-link>
                <router-link to="/category" 
                    class="sidebar-body__item">
                    <div class="sidebar-body__item2">
                        <div class="sidebar-body__item2--icon5"></div>
                    </div>
                    <div class="sidebar-body__text">{{ txtBodyCategory }}</div>
                </router-link>
                <router-link to="/search" 
                    class="sidebar-body__item">
                    <div class="sidebar-body__item2">
                        <div class="sidebar-body__item2--icon6"></div>
                    </div>
                    <div class="sidebar-body__text">{{ txtBodySearch }}</div>
                    <div class="sidebar-body__item2-icon">
                        <button class="sidebar-body__item2-icon--image"></button>
                    </div>
                </router-link>
                <router-link to="/report" 
                    class="sidebar-body__item">
                    <div class="sidebar-body__item2">
                        <div class="sidebar-body__item2--icon7"></div>
                    </div>
                    <div class="sidebar-body__text">{{ txtBodyReport }}</div>
                    <div class="sidebar-body__item2-icon">
                        <button class="sidebar-body__item2-icon--image"></button>
                    </div>
                </router-link>
            </div>
            <div class="sidebar-footer">
                <MButtonIcon
                    class="sidebar-footer__item"
                    :data_tooltip_right="tooltipFooter"
                    classIcon="sidebar-footer__item--image"
                    @addOnClickBtnIcon="handleEventClickBtnCollapseSidebar">
                </MButtonIcon>
            </div>
        </div>
    </div>
</template>

<script>
import resourceJS from '@/js/resourceJS';
export default {
    name:"TheSidebar",
    components:{

    },
    created() {
    },
    data() {
        return {
            tooltipHeader: resourceJS.tooltip.theSidebar.header,
            tooltipFooter: resourceJS.tooltip.theSidebar.footer.collapse,
            txtHeader: resourceJS.theSidebar.header.txt,
            txtBodyOverview: resourceJS.theSidebar.body.txtOverview,
            txtBodyAsset: resourceJS.theSidebar.body.txtAsset,
            txtBodyAssetHTDB: resourceJS.theSidebar.body.txtAssetHTDB,
            txtBodyCategory: resourceJS.theSidebar.body.txtTool,
            txtBodyTool: resourceJS.theSidebar.body.txtCategory,
            txtBodySearch: resourceJS.theSidebar.body.txtSearch,
            txtBodyReport: resourceJS.theSidebar.body.txtReport,
            
        }
    },
    methods: {
        handleEventClickBtnCollapseSidebar(){
            this.$emit('onClose',this.isSelected);
        }

    },
}
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