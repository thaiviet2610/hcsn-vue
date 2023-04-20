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
                    <MButtonIcon
                        class="btn-header__icon"
                        classIcon="form-header__icon"
                        @addOnClickBtnIcon="handleEventBtnClickCancel">
                    </MButtonIcon>
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
                    
                    <div style="width: 100%;height: 478px;overflow: auto;">
                        <MTable 
                        ref="mTable"
                        :tableInfo="tableInfo"
                        :dataPageSize="dataPageSize"
                        :dataBodyApi="this.dataBodyApi"
                        :api="assetFilterApi">
                        </MTable>
                    </div> 
                </div>
                <!-- phần footer của form  -->
                <div class="form-footer">
                    <!-- button lưu form  -->
                    <MButton
                        class="btn--main"
                        label="Lưu"
                        @btnAddOnClickBtn="handleEventBtnClickSave">
                    </MButton>
                    <!-- button hủy form  -->
                    <MButton
                        label="Hủy"
                        style="border: 0;"
                        @btnAddOnClickBtn="handleEventBtnClickCancel"  >
                    </MButton>
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
            assetFilterApi: configJS.api.assetFilterNotInApi,
            tableInfo: resourceJS.table.tableAssetIncrementDetailSelected.tableInfo,
            dataPageSize: resourceJS.table.tableAssetIncrementDetailSelected.dataPageSize ,
            keyword: ""
        }
    },
    created() {
        this.assetFilterApi = this.assetFilterApi.replace("{2}","");
        this.setFocus();
    },
    methods: {
        setFocus(){
            this.$nextTick(function(){
                this.$refs["refSearch"].setFocus();
            })
        },
        handleEventBtnClickCancel(){
            this.$emit('onClose');
        },
        handleEventBtnClickSave(){
            let assetsSelected = this.$refs['mTable'].entityCheckboxActive;
            let assets = [];
            for (const item of assetsSelected) {
                if(item){
                    assets = assets.concat(item);
                }
            }
            this.$emit('onSave',assets);
        },
        handleEventKeyDownEnterInputSearch(value){
            this.keyword = value;
            if(!value){
                this.keyword = "";
            }
            this.assetFilterApi = this.getAssetFilterApi();
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
            let api = configJS.api.assetFilterApi.replace("{2}",this.keyword);
            api = api.replace("{3}","");
            api = api.replace("{4}","");
            return api;
        },
    },
}
</script>

<style scoped>
@import url(./asset-increment.css);
</style>