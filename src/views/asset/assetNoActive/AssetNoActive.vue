<template>
    <div :tabindex="0" >
        <MForm ref="mForm" :label="assetNoActiveInfo.label"
        :idItemFirst="assetNoActiveInfo.inputSearch.id"
        idItemLast="idBtnCancelAssetNoActive"
        :buttonInfo="assetNoActiveInfo.button"
        @handleEventCloseForm="handleEventBtnClickCancel"
        @handleEventSaveForm="handleEventBtnClickSave">
            <!-- phần body của form  -->
            <div class="asset-no-active-form-body" style="padding: 0;">
                    <div class="header__body--down" style="padding-bottom: 16px;">
                        <div class="input down-left">
                            <MInput 
                                :idInput="assetNoActiveInfo.inputSearch.id"
                                :ref="assetNoActiveInfo.inputSearch.ref"
                                @keyDownEnter ="handleEventKeyDownEnterInputSearch"
                                @getValueEventInput="handleEventGetValueInputSearch"
                                :placeholder="assetNoActiveInfo.inputSearch.placeholder"
                                :iconInput="true">
                            </MInput>
                        </div>
                    </div>
                    
                    <div style="width: 100%;height: 515px;overflow: auto;">
                        <MTable 
                        :ref="assetNoActiveInfo.table.ref"
                        :tableInfo="tableInfo"
                        :dataPageSize="dataPageSize"
                        :dataHeader="dataHeaderTable"
                        :dataBody="dataBodyTable"
                        :dataFooter="dataFooterTable"
                        :valuePageNumber="pageNumber"
                        :valuePageSize="pageSize"
                        :isPaging="assetNoActiveInfo.table.isPaging"
                        :isCheckbox="assetNoActiveInfo.table.isCheckbox"
                        :isFunction="assetNoActiveInfo.table.isFunction"
                        :isContextMenu="assetNoActiveInfo.table.isConteisContextMenuxtmenu"
                        :dataEntities="dataAssets"
                        @getValuePageNumber="getValuePageNumber"
                        @getValuePageSize="getValuePageSize"
                        :key="keyTable"
                        >
                        </MTable>
                    </div> 
                </div>
        </MForm>
        <!-- dialog thông báo  -->
        <MDialog 
            v-if="isShowDialogNotify" 
            :content="contentDialogNotify"
            :buttonInfo="btnDialogNotify"
            @onClickBtn="handleEventCloseDialogNotify">
        </MDialog>
        <!-- dialog hiển thị đang load dữ liệu  -->
        <MDialogLoadData v-if="isShowLoad"></MDialogLoadData>
    </div>
</template>

<script>
import configJS from '@/js/config';
import resourceJS from '@/js/resource';
import commonJS from '@/js/common';
import axios from 'axios';
import MDialog from '@/components/dialog/MDialog.vue';
export default {
    name: "AssetNoActive",
    components:{
    MDialog
},
    props:{
        dataBodyApi:{
            type: [Object,Array,String,Number],
            default: null
        }
    },
    data() {
        return {
            isShowDialogNotify: false,
            contentDialogNotify: "",
            btnDialogNotify: resourceJS.buttonDialog.notify,
            assetFilterApi: configJS.api.asset.assetFilterNotInApi,
            tableInfo: resourceJS.table.tableAssetNoActive,
            dataPageSize: resourceJS.table.tableAssetNoActive.dataPageSize ,
            keyword: "",
            pageSize: 0,
            pageNumber: 1,
            dataHeaderTable: resourceJS.table.tableAssetNoActive.header,
            dataBodyTable: [],
            dataFooterTable: [],
            dataAssets: [],
            assetNoActiveInfo: resourceJS.assetNoActive,
            previousKeyCtrl: false,
            previousKeyShift: false,
            isShowLoad: false
        }
    },
    created() {
        this.pageSize = Number(this.dataPageSize[0]);
        this.getDataTable();
        this.setFocusDefault();
    },

    watch: {
    },
    methods: {
        /**
         * Hàm nhận giá trị pageSize khi chọn giá trị trong dropdown trong table
         * @param {*} value giá trị của pageSize
         * @author LTVIET (15/04/2023)
         */
         getValuePageSize(value){
            this.pageSize = value;
            this.pageNumber = 1;
            this.$refs[this.assetNoActiveInfo.table.ref].checkboxActive = [];
            this.$refs[this.assetNoActiveInfo.table.ref].entityCheckboxActive = [];
            this.getDataTable();
            
        },

        /**
         * Hàm nhận giá trị pageNumber khi chọn giá trị khi chuyển trang trong table
         * @param {*} value giá trị của pageNumber
         * @author LTVIET (15/04/2023)
         */
        getValuePageNumber(value){
            this.pageNumber = value;
            this.getDataTable();
        },

        /**
         * Hàm xử lý sự kiện click button đóng dialog
         * @author LTVIET (29/03/2023)
         */
         handleEventCloseDialogNotify(){
            this.isShowDialogNotify = false;
            this.setFocusDefault();
        },

        /**
         * Hàm gọi api lấy dư liệu của table
         * @author LTVIET (15/04/2023)
         */
         getDataTable(){
            const api = this.getAssetFilterApi();
            this.isShowLoad = true;
            axios.post(api,this.dataBodyApi)
            .then(res=>{
                this.assets = res.data.Data;
                this.dataBodyTable = res.data.Data.map(function(asset){
                    return {
                        index: asset.index,
                        fixed_asset_code: asset.fixed_asset_code,
                        fixed_asset_name: asset.fixed_asset_name,
                        department_name: asset.department_name,
                        cost: commonJS.formatNumber(Math.round(asset.cost)),
                        depreciation_value: commonJS.formatNumber(Math.round(asset.depreciation_value)),
                        residual_value: commonJS.formatNumber(Math.round(asset.residual_value)),
                    }
                })
                this.dataFooterTable = [
                    commonJS.formatNumber(Math.round(res.data.CostTotal)),
                    commonJS.formatNumber(Math.round(res.data.DepreciationValueTotal)),
                    commonJS.formatNumber(Math.round(res.data.ResidualValueTotal)),
                ];
                this.dataAssets = res.data.Data;
                this.$refs[this.assetNoActiveInfo.table.ref].totalRecord = res.data.TotalRecord;
                this.$refs[this.assetNoActiveInfo.table.ref].getUnitData();
                this.isShowLoad = false;

            })
            .catch(error=>{
                console.log(error);
                this.isShowLoad = false;
                this.isShowDialogNotify = true;
                const message = resourceJS.notify.errorLoadData;
                const errorCode = error.response.data.ErrorCode;
                this.contentDialogNotify = resourceJS.errorMsg.errorFail.replace("{0}",message).replace("{1}",errorCode);
            })
        },

        /**
         * Hàm set focus vào đối tượng được chọn
         * @param {*} ref ref của đối tượng được chọn
         * @author LTVIET (16/03/2023)
         */
        setFocus(ref){
            this.$nextTick(function(){
                this.$refs[ref].setFocus();
            })
        },

        /**
         * Hàm set focus vào input đầu tiên của form
         * @author LTVIET (16/03/2023)
         */
         setFocusDefault(){
            this.setFocus(this.assetNoActiveInfo.inputSearch.ref);
        },

        /**
         * Hàm xử lý sự kiện click vào btn đóng form
         * @author LTVIET (16/03/2023)
         */
        handleEventBtnClickCancel(){
            this.$emit('onClose');
        },

        /**
         * Hàm xử lý sự kiện click vào btn lưu form
         * @author LTVIET (16/03/2023)
         */
        handleEventBtnClickSave(){
            this.previousKeyCtrl = false;
            let assetsSelected = this.$refs[this.assetNoActiveInfo.table.ref].getEntityCheckboxActiveList();
            this.$emit('onSave',assetsSelected);
        },

        /**
         * Hàm xử lý sự kiện nhấn phím enter ở input tìm kiếm để lấy gái trị keyword
         * @param {*} value giá trị của input
         * @author LTVIET (16/03/2023)
         */
        handleEventKeyDownEnterInputSearch(value){
            this.keyword = value;
            if(!value){
                this.keyword = "";
            }
            this.pageNumber=1;
            this.$refs[this.assetNoActiveInfo.table.ref].checkboxActive = [];
            this.$refs[this.assetNoActiveInfo.table.ref].entityCheckboxActive = [];
            this.getDataTable();
        },

        /**
         * Hàm xử lý sự kiện khi đữ liệu trong input tìm kiếm được xóa hết thì tự động reload lại data
         * @param {*} value Giá trị dữ liệu của input tìm kiếm
         * @author LTVIET (16/03/2023)
         */
         handleEventGetValueInputSearch(value){
            if(value == ""){
                this.handleEventKeyDownEnterInputSearch();
            }
        },
        /**
         * Hàm xử lý sự kiện lấy ra giá trị api từ keyword,departmentId,assetCategoryId
         * @author LTVIET (15/04/2023)
         */
         getAssetFilterApi(){
            let api = configJS.api.asset.assetFilterNotInApi.replace("{0}",this.pageSize);
            api = api.replace("{1}",this.pageNumber);
            api = api.replace("{2}",this.keyword);
            return api;
        },
    },
}
</script>

<style scoped>
@import url(./asset-no-active.css);
</style>