<template>
    <div>
        <div id="sidebar" class="sidebar">
            <div class="sidebar-header" >
                <div class="sidebar-header__item"></div>
                <div class="sidebar-header__text" data_tooltip_right="MISA QUẢN LÝ ĐÀO TẠO">MISA QLTS</div>
            </div>
            <div class="sidebar__body">
                <router-link to="/customer" 
                    class="sidebar-body__item">
                    <div class="sidebar-body__item2">
                        <div class="sidebar-body__item2--icon1"></div>
                    </div>
                    <div class="sidebar-body__text">Tổng quan</div>
                </router-link>
                <router-link to="/" 
                    class="sidebar-body__item">
                    <div class="sidebar-body__item2 ">
                        <div class="sidebar-body__item2--icon2"></div>
                    </div>
                    <div class="sidebar-body__text">Tài sản</div>
                    <div class="sidebar-body__item2-icon">
                        <button class="sidebar-body__item2-icon--image"></button>
                    </div>
                </router-link>
                <router-link to="/assetHTDB" 
                    class="sidebar-body__item">
                    <div class="sidebar-body__item2">
                        <div class="sidebar-body__item2--icon3"></div>
                    </div>
                    <div class="sidebar-body__text">Tài sản HT-DB</div>
                    <div class="sidebar-body__item2-icon">
                        <button class="sidebar-body__item2-icon--image"></button>
                    </div>
                </router-link>
                <router-link to="/tools" 
                    class="sidebar-body__item">
                        <div class="sidebar-body__item2">
                            <div class="sidebar-body__item2--icon4"></div>
                        </div>
                        <div class="sidebar-body__text">Công cụ dụng cụ</div>
                        <div class="sidebar-body__item2-icon">
                            <button class="sidebar-body__item2-icon--image"></button>
                        </div>
                </router-link>
                <router-link to="/category" 
                    class="sidebar-body__item">
                    <div class="sidebar-body__item2">
                        <div class="sidebar-body__item2--icon5"></div>
                    </div>
                    <div class="sidebar-body__text">Danh mục</div>
                </router-link>
                <router-link to="/search" 
                    class="sidebar-body__item">
                    <div class="sidebar-body__item2">
                        <div class="sidebar-body__item2--icon6"></div>
                    </div>
                    <div class="sidebar-body__text">Tra cứu</div>
                    <div class="sidebar-body__item2-icon">
                        <button class="sidebar-body__item2-icon--image"></button>
                    </div>
                </router-link>
                <router-link to="/report" 
                    class="sidebar-body__item">
                    <div class="sidebar-body__item2">
                        <div class="sidebar-body__item2--icon7"></div>
                    </div>
                    <div class="sidebar-body__text">Báo cáo</div>
                    <div class="sidebar-body__item2-icon">
                        <button class="sidebar-body__item2-icon--image"></button>
                    </div>
                </router-link>
            </div>
            <div class="sidebar-footer">
                <div class="sidebar-footer__item" data_tooltip_right="Thu gọn">
                    <button @click="this.$emit('onClose',this.isSelected)" class="sidebar-footer__item--image"></button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:"TheSidebar",
    components:{

    },
    created() {
    },
    data() {
        return {
        }
    },
    methods: {
    },
}
</script>

<style scoped>

</style>