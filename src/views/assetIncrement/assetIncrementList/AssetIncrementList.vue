<template>
    <div class="main">
        <div class="content">
            <div class="content-header">
                <div class="content-header__left">
                    <!-- input tìm kiếm tài sản  -->
                    <div class="asset_increment--text1" >Ghi tăng tài sản</div>
                </div>
                <div class="content-header__right">
                    <!-- button thêm tài sản  -->
                    <MButton
                        label="Thêm"
                        class="item1 btn--main"
                        @btnAddOnClickBtn="btnClickOpenForm">
                    </MButton>
                    <!-- button xuất dữu liệu ra excel  -->
                    <div class="asset_increment--item1" style="position: relative;">
                        <div :class="classInterface"></div>
                        <MButtonIcon
                            classIcon="asset_increment--item12"
                            @addOnClickBtnIcon="handleEventOpenInterfaceSeleceted"
                            >
                        </MButtonIcon>
                        <div v-if="isShowInterfaceSelecte" class="interface__container">
                            <div @click="handleEventClickVerticalInterFace" class="interface__item">
                                <div class="vertical_interface"></div>
                                <div>Giao diện dọc</div>
                            </div>
                            <div @click="handleEventClickHorizontalInterFace" class="interface__item">
                                <div class="horizontal_interface"></div>
                                <div>Giao diện ngang</div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- button xóa tài sản  -->
                    
                </div>
            </div>
            <splitpanes style="height: calc(100% - 38px); padding-top: 13px; box-sizing: border-box;" horizontal :class="{abcd:paneSize==100}">
                <Pane :size="paneSize">
                    <div min-size="0" class="asset_increment__content-body--up" style="border: none;box-shadow: none">
                        <div class="content-body__up">
                            <div class="input1">
                                <MInput 
                                    ref="refSearch"
                                    placeholder="Tìm kiếm tài sản"
                                    :iconInput="true"
                                    @keyDownEnter="handleEventGetValueInputSearch">
                                </MInput>
                            </div>

                            <div class="asset_increment--item2">
                                <div class="print">
                                    <div class="asset_increment--item21"></div>
                                    <MTooltip
                                            :text="tooltipPrint"
                                            class="asset_increment--item21-tooltip">
                                    </MTooltip>
                                </div>
                                <div class="see-more">
                                    <MButtonIcon
                                        classIcon="asset_increment--item22">
                                    </MButtonIcon>
                                    <MTooltip
                                            :text="tooltipSeeMore"
                                            class="asset_increment--item22-tooltip">
                                    </MTooltip>
                                </div>
                            </div>
                        </div>
                        <div style="width: 100%;height: calc(100% - 60px);">
                            <MTable 
                            :tableInfo="tableInfo"
                            :dataPageSize="dataPageSize"
                            :key="keyTableMaster"
                            :api="assetFilterApi">
                            </MTable>
                        </div>
                    </div>
                </Pane>
                
                <Pane :size="100 - paneSize">
                    <div class="asset_increment__content-body--down" style="border: none;box-shadow: none" >
                        <div class="content-body__down">
                            <div class="asset_increment--text2">Thông tin chi tiết
                            </div>

                            <div class="asset_increment--item3" style="position: relative;">
                                <MButtonIcon
                                    classIcon="icon--full_screen"
                                    @addOnClickBtnIcon="handleEventClickBtnFullScreen">
                                </MButtonIcon>
                                <MTooltip
                                    :text="tooltipFullScreen"
                                    class="full-screen-tooltip">
                                </MTooltip>
                            </div>
                        </div>
                        <div style="width: 100%;height: calc(100% - 40px);">
                            <MTable 
                                :tableInfo="tableInfo"
                                :dataPageSize="dataPageSize"
                                :key="keyTable"
                                :api="assetFilterApi">
                            </MTable>
                        </div>
                    </div>
                </Pane>
            </splitpanes>
            
        </div>
    </div>
    <AssetIncrementDetail
     v-if="isShowDetail"
     @onClose="handleEventCloseFormAssetIncrementDetail"
     >

    </AssetIncrementDetail>
</template>

<script>
import MButton from '@/components/button/MButton.vue';
import configJS from '@/js/config';
import resourceJS from '@/js/resourceJS';
import AssetIncrementDetail from '../assetIncrementDetail/AssetIncrementDetail.vue';
import { Splitpanes, Pane } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'
export default {
    name:"AssetIncrementList",
    components:{
        MButton,
        AssetIncrementDetail,
        Splitpanes,
        Pane
    },
    data() {
        return {
            isShowDetail: false,
            isShowLoad: false,
            isShowInterfaceSelecte: false,
            assetFilterApi: configJS.api.assetFilterApi,
            tableInfo: resourceJS.table.tableAssetIncrementMaster.tableInfo,
            dataPageSize: resourceJS.table.tableAsset.dataPageSize,
            keyTableMaster: 0,
            keyTableDetail: 0,
            paneSize: 60,
            keyword: "",
            tooltipFullScreen: resourceJS.tooltip.assetIncrementList.zoomIn,
            tooltipSeeMore: resourceJS.tooltip.assetIncrementList.seeMore,
            tooltipPrint: resourceJS.tooltip.assetIncrementList.print,
            classInterface: "horizontal_interface"
        }
    },
    created() {
        this.assetFilterApi = this.assetFilterApi.replace("{2}","").replace("{3}","").replace("{4}","");
        this.isShowLoad = true;
        setTimeout(() => {
            this.isShowLoad = false;
        }, 500);
    },
    mounted() {
        this.setFocus();
    },
    methods: {
        /**
         * Hàm xử lý sự kiện đóng giao diện tài snar ghi tăng chi tiết
         * @author LTVIET (19/04/2023)
         */
        handleEventCloseFormAssetIncrementDetail(){
            this.isShowDetail = false;
        },

        /**
         * Hàm xử lý sự kiện hiển thị danh sách lựa chọn loại giao diện (giao diện ngang, giao diện dọc)
         * @author LTVIET (19/04/2023)
         */
        btnClickOpenForm(){
            this.isShowDetail = true;
        },

        /**
         * Hàm xử lý sự kiện hiển thị danh sách lựa chọn loại giao diện (giao diện ngang, giao diện dọc)
         * @author LTVIET (19/04/2023)
         */
        handleEventOpenInterfaceSeleceted(){
            this.isShowInterfaceSelecte = !this.isShowInterfaceSelecte;
        },

        /**
         * Hàm xử lý sự kiện hiển thị giao diện dọc
         * @author LTVIET (19/04/2023)
         */
        setFocus(){
            this.$nextTick(function(){
                this.$refs["refSearch"].setFocus();
            });
        },

        /**
         * Hàm xử lý sự kiện hiển thị giao diện table tài sản chứng từ chi tiết hiển thị toàn bộ giao diện
         * @author LTVIET (19/04/2023)
         */
        handleEventClickBtnFullScreen(){
            if(this.paneSize != 0){
                this.paneSize = 0;
                this.tooltipFullScreen = resourceJS.tooltip.assetIncrementList.zoomOut;
            }else{
                this.paneSize = 60;
                this.tooltipFullScreen = resourceJS.tooltip.assetIncrementList.zoomIn;
            }
        },

        /**
         * Hàm xử lý sự kiện hiển thị giao diện ngang
         * @author LTVIET (19/04/2023)
         */
        handleEventClickHorizontalInterFace(){
            this.paneSize = 60;
            this.classInterface = "horizontal_interface";
            this.isShowInterfaceSelecte = false;
        },

        /**
         * Hàm xử lý sự kiện hiển thị giao diện dọc
         * @author LTVIET (19/04/2023)
         */
        handleEventClickVerticalInterFace(){
            this.paneSize = 100;
            this.classInterface = "vertical_interface";
            this.isShowInterfaceSelecte = false;
        },

        /**
         * Hàm xử lý sự kiện lấy giá trị của input tìm kiếm
         * @author LTVIET (19/04/2023)
         */
        handleEventGetValueInputSearch(){
        //     this.keyword = value;
        //     if(!value){
        //         this.keyword = "";
        //     }
        //     this.assetFilterApi = this.getAssetFilterApi();
        },
        
    },
}
</script>

<style scoped>
@import url(./asset-increment-list.css);
.btn__icon{
    background-color: #ffffff;
}




html, body, #app {height: 100%;margin: 0;}
body {
  font-family: Helvetica, Arial, sans-serif;
  color: rgba(255, 255, 255, 0.6);
  font-size: 5em;
}

p {
  position: absolute;
  bottom: 5px;
  right: 5px;
  color: #666;
  z-index: 10;
  font-size: 12px;
}
</style>