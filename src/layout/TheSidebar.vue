<template>
    <div>
        <div v-if="isShow" class="sidebar">
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
                    <div style="width: 20px;">
                        <MButtonIcon
                            class="sidebar-body__item2-icon"
                            classIcon="sidebar-body__item2-icon--image"
                            @addOnClickBtnIcon="addOnClicKBtnshowDetailAsset">
                        </MButtonIcon>
                    </div>
                    <!-- <div class="sidebar-body__item2-icon">
                        <button class="sidebar-body__item2-icon--image"></button>
                    </div> -->
                </router-link>
                <div v-if="isShowDetailAsset" class="sidebar-detail">
                    <router-link to="/AssetIncrementList" 
                        class="sidebar-detail__item">
                        <div class="sidebar-detail__text">Ghi tăng</div>
                    </router-link>
                    <router-link to="/a" 
                        class="sidebar-detail__item">
                        <div class="sidebar-detail__text">Thay đổi thông tin</div>
                    </router-link>
                    <router-link to="/a" 
                        class="sidebar-detail__item">
                        <div class="sidebar-detail__text">Đánh giá lại</div>
                    </router-link>
                    <router-link to="/a" 
                        class="sidebar-detail__item">
                        <div class="sidebar-detail__text">Tính hao mòn</div>
                    </router-link>
                    <router-link to="/a" 
                        class="sidebar-detail__item">
                        <div class="sidebar-detail__text">Điều chuyển tài sản</div>
                    </router-link>
                    <router-link to="/a" 
                        class="sidebar-detail__item">
                        <div class="sidebar-detail__text">Ghi giảm</div>
                    </router-link>
                    <router-link to="/a" 
                        class="sidebar-detail__item">
                        <div class="sidebar-detail__text">Kiểm kê</div>
                    </router-link>
                    <router-link to="/a" 
                        class="sidebar-detail__item">
                        <div class="sidebar-detail__text">Khác</div>
                    </router-link>
                    
                </div>
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
        <TheMenu v-else
        @onOpen="handleEventOpenSidebar">
        </TheMenu>
    </div>
</template>

<script>
import resourceJS from '@/js/resourceJS';
import TheMenu from './TheMenu.vue';
export default {
    name:"TheSidebar",
    components:{
        TheMenu
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
            isShowDetailAsset: false,
            isShow: true
            
        }
    },
    methods: {
        /**
         * Hàm xử lý sự kiện click btn thu gọn sidebar
         * @author LTVIET (01/04/2023)
         */
        handleEventClickBtnCollapseSidebar(){
            this.isShow = false;
        },

        /**
         * Hàm xử lý sự kiện click btn mở sidebar
         * @author LTVIET (01/04/2023)
         */
        handleEventOpenSidebar(){
            this.isShow = true;
        },

        /**
         * Hàm xử lý sự kiện click button hiển thị danh sách lựa chọn trong tài sản
         * @author LTVIET (01/04/2023)
         */
        addOnClicKBtnshowDetailAsset(){
            this.isShowDetailAsset = !this.isShowDetailAsset;
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
    border-radius: 2px;

}

::-webkit-scrollbar-thumb {
    border-radius: 1.5px;
}
</style>