<template>
    <div>
        <div  class="form editForm"
        >
            <div class="asset_increment__form-data" >
                <!-- phần header của form  -->
                <div class="form-header">
                    <!-- title của form  -->
                    <div class="asset_increment__form-header__text">Chọn tài sản ghi tăng</div>
                    <!-- button đóng form  -->
                    <div class="btn-close-asset-selected">
                        <MButtonIcon
                            class="btn-header__icon"
                            classIcon="form-header__icon"
                            @addOnClickBtnIcon="handleEventBtnClickCancel">
                        </MButtonIcon>
                        <MTooltip
                            :text="btnCloseFormTooltip"
                            class="btn-close-asset-selected-tooltip"
                        ></MTooltip>
                    </div>
                </div>
                <!-- phần body của form  -->
                <div class="asset_increment__form_body" style="padding: 0;">
                    <div class="header__body--down" style="padding-bottom: 16px;">
                        <div class="input down-left">
                            <MInput 
                                @keyDownEnter ="handleEventKeyDownEnterInputSearch"
                                @getValueEventInput="handleEventGetValueInputSearch"
                                ref="refSearch"
                                placeholder="Tìm kiếm theo Mã, tên tài sản"
                                :iconInput="true">
                            </MInput>
                        </div>
                    </div>
                    
                    <div style="width: 100%;height: 515px;overflow: auto;">
                        <MTable 
                        ref="mTable"
                        :tableInfo="tableInfo"
                        :dataPageSize="dataPageSize"
                        :dataHeader="dataHeaderTable"
                        :dataBody="dataBodyTable"
                        :dataFooter="dataFooterTable"
                        :valuePageNumber="pageNumber"
                        :totalRecord="totalRecord"
                        :valuePageSize="pageSize"
                        :isPaging="true"
                        :isCheckbox="true"
                        :isFunction="false"
                        :isContextmenu="true"
                        :dataEntities="dataAssets"
                        @getValuePageNumber="getValuePageNumber"
                        @getValuePageSize="getValuePageSize"
                        :key="keyTable"
                        >
                        </MTable>
                    </div> 
                </div>
                <!-- phần footer của form  -->
                <div class="form-footer">
                    <!-- button lưu form  -->
                    <div class="btn-save-asset-selected">
                        <MButton
                            class="btn--main"
                            label="Lưu"
                            @btnAddOnClickBtn="handleEventBtnClickSave">
                        </MButton>
                        <MTooltip
                            :text="btnSaveFormTooltip"
                            class="btn-save-asset-selected-tooltip"
                        ></MTooltip>
                    </div>
                    <!-- button hủy form  -->
                    <div class="btn-cancel-asset-selected">
                        <MButton
                            label="Hủy"
                            style="border: 0;"
                            @btnAddOnClickBtn="handleEventBtnClickCancel"  >
                        </MButton>
                        <MTooltip
                            :text="btnCancelFormTooltip"
                            class="btn-cancel-asset-selected-tooltip"
                        ></MTooltip>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- dialog hiển thị đang load dữ liệu  -->
        <MDialogLoadData v-if="isShowLoad"></MDialogLoadData>
    </div>
</template>

<script>
import configJS from '@/js/config';
import resourceJS from '@/js/resourceJS';
import commonJS from '@/js/common';
import axios from 'axios';
export default {
    name: "AssetIncrement",
    components:{
    },
    props:{
        dataBodyApi:{
            type: [Object,Array,String,Number],
            default: null
        }
    },
    data() {
        return {
            assetFilterApi: configJS.api.asset.assetFilterNotInApi,
            tableInfo: resourceJS.table.tableAssetIncrementDetailSelected,
            dataPageSize: resourceJS.table.tableAssetIncrementDetailSelected.dataPageSize ,
            keyword: "",
            pageSize: 0,
            pageNumber: 1,
            dataHeaderTable: resourceJS.table.tableAssetIncrementDetailSelected.header,
            dataBodyTable: [],
            dataFooterTable: [],
            totalRecord: 0,
            dataAssets: [],
            btnCancelFormTooltip: resourceJS.tooltip.asssetSelected.btnCancelForm,
            btnSaveFormTooltip: resourceJS.tooltip.asssetSelected.btnSaveForm,
            btnCloseFormTooltip: resourceJS.tooltip.asssetSelected.btnCloseForm,
        }
    },
    created() {
        this.pageSize = Number(this.dataPageSize[0]);
        this.getDataTable();
        this.setFocus();
    },
    methods: {
        /**
         * Hàm nhận giá trị pageSize khi chọn giá trị trong dropdown trong table
         * @param {*} value giá trị của pageSize
         * @author LTVIET (15/04/2023)
         */
         getValuePageSize(value){
            this.pageSize = value;
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
                this.totalRecord = res.data.TotalRecord;
                this.$refs["mTable"].totalRecord = this.totalRecord;
                this.$refs["mTable"].getUnitData();
                this.isShowLoad = false;

            })
            .catch(err=>{
                console.log(err);
                this.isShowLoad = false;
            })
        },

        /**
         * Hàm set focus vào input đầu tiên của form
         * @author LTVIET (16/03/2023)
         */
        setFocus(){
            this.$nextTick(function(){
                this.$refs["refSearch"].setFocus();
            })
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
            let assetsSelected = this.$refs['mTable'].getEntityCheckboxActiveList();
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
@import url(./asset-increment.css);
</style>