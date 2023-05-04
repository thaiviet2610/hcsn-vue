<template>
    <!-- <div class="body"> -->
    <div class="main">
        <!-- phần content  -->
        <div class="content">
            <div class="content-header">
                <div class="content-header__left">
                    <!-- input tìm kiếm tài sản  -->
                    <div class="input1">
                        <MInput 
                            @keyDownEnter ="handleEventKeyDownEnterInputSearch"
                            @getValueEventInput="handleEventGetValueInputSearch"
                            :ref="refElements.inputSearch"
                            placeholder="Tìm kiếm tài sản"
                            :iconInput="true"
                            typeValue="text">
                        </MInput>
                    </div>
                    <!-- combobox lọc loại tài sản  -->
                    <div class="input1">
                        <MCombobox  
                            iconCombobox="combobox__icon--image" 
                            :ref="refElements.comboboxAssetCategory"
                            propName="fixed_asset_category_name" 
                            placeholder="Loại tài sản" 
                            :itemHeight = "36"
                            propValue="fixed_asset_category_id"
                            :dataCombobox="dataComboboxAssetCategory"
                            :key="keyComboboxAssetCategory"
                            :quantityItemDisplay = "4"
                            @getInputCombobox="getValueAssetCategory">
                        </MCombobox>
                    </div>
                    <!-- combobox lọc bộ phận sử dụng  -->
                    <div class="input1">
                        <MCombobox  
                            iconCombobox="combobox__icon--image" 
                            :ref="refElements.comboboxDepartment"
                            propName="department_name" 
                            placeholder="Bộ phận sử dụng" 
                            propValue="department_id"
                            :dataCombobox="dataComboboxDepartment"
                            :key="keyComboboxDepartment"
                            :itemHeight = "36"
                            :quantityItemDisplay = "4"
                            @getInputCombobox="getValueDepartment">
                        </MCombobox>
                    </div>
                </div>
                <div class="content-header__right">
                    <!-- button thêm tài sản  -->
                    <MButton
                        :ref="refElements.buttonAdd"
                        label=" + Thêm tài sản"
                        :data_tooltip_bottom="tooltipBtnAdd"
                        class="btn--main"
                        @btnAddOnClickBtn="btnClickOpenForm">
                    </MButton>
                    <!-- button xuất dữu liệu ra excel  -->
                    <div style="position: relative;">
                        <MButtonIcon
                            class="item2"
                            :ref="refElements.buttonExport"
                            classIcon="item2__icon--image"
                            @addOnClickBtnIcon="addOnClicKBtnExportExcel">
                        </MButtonIcon>
                        <MTooltip
                            :text="tooltipBtnExcel"
                            class="asset-list-btn-export-tooltip"
                        ></MTooltip>
                    </div>
                    
                    <!-- button xóa tài sản  -->
                   <div style="position: relative;">
                        <MButtonIcon
                            class="item3"
                            :ref="refElements.buttonDelete"
                            classIcon="function__delete"
                            @addOnClickBtnIcon="btnOnClick">
                        </MButtonIcon>
                        <MTooltip
                            :text="tooltipBtnDelete"
                            class="asset-list-btn-delete-tooltip"
                        ></MTooltip>
                   </div>
                </div>
            </div>

            <div class="content-body" >
                <!-- table hiển thị danh sách tài sản  -->
                <Mtable 
                    :ref="refElements.table"
                    @btnClickFunctionOpenForm="handleEventOpenForm"
                    :tableInfo="tableInfo"
                    :dataPageSize="dataPageSize"
                    :dataHeader="dataHeaderTable"
                    :dataBody="dataBodyTable"
                    :dataFooter="dataFooterTable"
                    :valuePageNumber="pageNumber"
                    :valuePageSize="pageSize"
                    :isShowNoData="true"
                    :isPaging="true"
                    :isCheckbox="true"
                    :isFunction="true"
                    :dataEntities="dataAssets"
                    :isContextMenu="true"
                    :key="keyTable"
                    @addOnClickContextMenu="handleEventClickContextMenu"
                    @getValuePageNumber="getValuePageNumber"
                    @getValuePageSize="getValuePageSize"
                    @handleEventLoadTable="handleEventLoadTable"></Mtable>
            </div>
        </div>
    </div>
    <!-- form hiển thị thông tin chi tiết của tài sản  -->
    <AssetDetail 
        v-if="isShowForm" 
        :label="labelForm" 
        :assetInput="assetInput" 
        :propAssetCode="newCode" 
        :typeForm="typeForm"
        :key="keyAssetDetail"
        @addOnClickBtnSave="handleEventSaveForm"
        @onClose="addOnClickCloseForm">
    </AssetDetail>
    
    <!-- dialog thông báo hành động không có tài sản nào được chọn để xóa -->
    <MDialog 
        ref="mDialogNotifyDelete"
        :content="contentDialogNotifyDelete"
        :buttonInfo="btnDialogNotify"
        v-if="isShowDialogNotifyDelete" 
        @onClickBtn="handleEventCloseDialogNotifyDelete">
    </MDialog>
    
    <!-- dialog xác nhận hành động xóa 1 tài sản -->
    <MDialog 
        ref="mDialogConfirmDeleteOneAsset"
        :content="contentDialogConfirmDeleteOneAsset"
        :buttonInfo="btnDialogDelete"
        v-if="isShowDialogConfirmDeleteOneAsset"
        @onClickBtn="handleEventCloseDialogDelete">
    </MDialog>
    <!-- dialog xác nhận hành động xóa nhiều tài sản -->
    <MDialog 
        ref="mDialogConfirmDeleteMultiAsset"
        :content="contentDialogConfirmDeleteMultiAsset"
        :buttonInfo="btnDialogDelete"
        v-if="isShowDialogConfirmDeleteMultiAsset"
        @onClickBtn="handleEventCloseDialogDelete">
    </MDialog>
    <!-- dialog xác nhận hành động xuất dữ liệu ra file excel -->
    <MDialog 
        ref="mDialogConfirmExportExcel"
        :content="contentDialogConfirmExportExcel"
        :buttonInfo="btnDialogExcel"
        v-if="isShowDialogConfirmExportExcel"
        @onClickBtn="handleEventClickBtnDialogExcel">
    </MDialog>
    <!-- dialog loading dữ liệu  -->
    <MDialogLoadData v-if="isShowLoad"></MDialogLoadData>
    <!-- toast message thông báo xóa thành công  -->
    <MToastSucess 
        v-if="isShowToastSucess"
        :notify="notifyToastSuccess"
        :content="contentToastSuccess"
        :buttonUndo="isButtonUndo"
        :buttonClose="isButtonClose"
        @onClose="closeToastSucess"
        >
    </MToastSucess>
        
    <!-- </div> -->
</template>

<script>
import AssetDetail from '../assetDetail/AssetDetail.vue'
import MCombobox from '../../../components/combobox/MCombobox.vue'
import Mtable from '../../../components/table/MTable.vue'
import resourceJS from '@/js/resource.js';
import MButtonIcon from '@/components/button/MButtonIcon.vue';
import axios from 'axios'
import enumJS from '@/js/enum.js';
import { saveAs } from 'file-saver';
import configJS from '@/js/config';
import commonJS from '@/js/common';
export default {
    name: "AssetList",
    components:{
        AssetDetail,MCombobox,MButtonIcon,
        Mtable
    },
    data() {
        return {
            labelForm: "",
            assetInput:null,
            isShowForm: false,
            isShowDialogNotifyDelete: false,
            isShowDialogConfirmDeleteOneAsset: false,
            isShowDialogConfirmDeleteMultiAsset: false,
            isShowDialogConfirmExportExcel: false,
            contentDialogNotifyDelete: "",
            contentDialogConfirmExportExcel: "",
            contentDialogConfirmDeleteOneAsset: "",
            contentDialogConfirmDeleteMultiAsset: "",
            assets : [],
            dataAssets: [],
            assetFilterApi: configJS.api.asset.assetFilterApi,
            assetApi: configJS.api.asset.assetApi,
            departApi: configJS.api.department.departmentApi,
            assetCategoryApi: configJS.api.assetCategory.assetCategoryApi,
            exportExcelApi: configJS.api.asset.exportExcelApi,
            isShowLoad: false,
            isShowToastSucess: false,
            isButtonUndo: false,
            isButtonClose: false,
            notifyToastSuccess: "",
            contentToastSuccess: "",
            departmentId:"",
            assetCategoryId: "",
            typeForm: 0,
            keyword: "",
            keyTable: 0,
            newCode: "",
            generateNewCodeApi: configJS.api.asset.assetGenerateNewCodeApi,
            keyAssetDetail: 0,
            contextMenuDelete: false,
            contextMenuItemDelete: null,
            previousKey: "",
            previousKeyCtrl: false,
            previousKeyShift: false,
            refElements: resourceJS.assetList.refElementAssetList ,
            btnDialogExcel: resourceJS.buttonDialog.exportExcel,
            btnDialogDelete: resourceJS.buttonDialog.delete,
            btnDialogNotify: resourceJS.buttonDialog.notify,
            tooltipBtnExcel: resourceJS.tooltip.assetList.buttonExcel,
            tooltipBtnDelete: resourceJS.tooltip.assetList.buttonDelete,
            tooltipBtnAdd: resourceJS.tooltip.assetList.buttonAdd,
            tableInfo: resourceJS.table.tableAsset,
            dataPageSize: resourceJS.table.tableAsset.dataPageSize,
            assetsDeleteMultiple: [],
            dataBodyTable: [],
            dataFooterTable: [],
            dataHeaderTable: resourceJS.table.tableAsset.header,
            dataComboboxAssetCategory: [],
            dataComboboxDepartment: [],
            keyComboboxDepartment: 0,
            keyComboboxAssetCategory: 0,
            pageSize: 0,
            pageNumber: 1,
        }
    },
    mounted() {
        // mặc định focus vào input tìm kiếm khi load trang
        this.$nextTick(function() {
            this.setFocusDefault();
        })
        document.addEventListener('keydown',this.handleEventKeyDown);
        document.addEventListener('keyup',this.handleEventKeyUp);
    },

    unmounted() {
        document.removeEventListener('keydown',this.handleEventKeyDown);
        document.removeEventListener('keyup',this.handleEventKeyUp);
    },
    created() {
        this.pageSize = Number(this.dataPageSize[0]);
        this.getDataTable();
        this.getDepartment();
        this.getAssetCategory();
    },
    
   
    methods: {
        /**
         * Hàm goi api lấy danh sách phòng ban truyền vào combobox
         * @author LTVIET (15/04/2023)
         */
        getDepartment(){
            this.isShowLoad = true;
            axios.get(this.departApi)
            .then(res=>{
                this.dataComboboxDepartment = res.data;
                this.keyComboboxDepartment = ++this.keyComboboxDepartment;
                this.isShowLoad = false;
            })
            .catch(err=>{
                console.log(err);
                this.isShowLoad = false;
            })
        },

        /**
         * Hàm goi api lấy danh sách loại tài sản truyền vào combobox
         * @author LTVIET (15/04/2023)
         */
        getAssetCategory(){
            this.isShowLoad = true;
            axios.get(this.assetCategoryApi)
            .then(res=>{
                this.dataComboboxAssetCategory = res.data;
                this.keyComboboxAssetCategory = ++this.keyComboboxAssetCategory;
                this.isShowLoad = false;
            })
            .catch(err=>{
                console.log(err);
                this.isShowLoad = false;
            })
        },

        /**
         * Hàm gọi api lấy dư liệu của table
         * @author LTVIET (15/04/2023)
         */
        getDataTable(){
            const api = this.getAssetFilterApi();
            this.isShowLoad = true;
            axios.get(api)
            .then(res=>{
                this.assets = res.data.Data;
                console.log(this.assets);
                this.dataBodyTable = res.data.Data.map(function(asset){
                    return {
                        index: asset.index,
                        fixed_asset_code: asset.fixed_asset_code,
                        fixed_asset_name: asset.fixed_asset_name,
                        fixed_asset_category_name: asset.fixed_asset_category_name,
                        department_name: asset.department_name,
                        quantity: commonJS.formatNumber(Math.round(asset.quantity)),
                        cost: commonJS.formatNumber(Math.round(asset.cost)),
                        depreciation_value: commonJS.formatNumber(Math.round(asset.depreciation_value)),
                        residual_value: commonJS.formatNumber(Math.round(asset.residual_value)),
                    }
                })
                this.dataFooterTable = [
                    commonJS.formatNumber(Math.round(res.data.QuantityTotal)),
                    commonJS.formatNumber(Math.round(res.data.CostTotal)),
                    commonJS.formatNumber(Math.round(res.data.DepreciationValueTotal)),
                    commonJS.formatNumber(Math.round(res.data.ResidualValueTotal)),
                ];
                this.dataAssets = res.data.Data;
                this.$refs[this.refElements.table].totalRecord = res.data.TotalRecord;
                this.$refs[this.refElements.table].getUnitData();
                this.isShowLoad = false;

            })
            .catch(err=>{
                console.log(err);
                this.isShowLoad = false;
            })
        },

        /**
         * Hàm nhận giá trị pageSize khi chọn giá trị trong dropdown trong table
         * @param {*} value giá trị của pageSize
         * @author LTVIET (15/04/2023)
         */
        getValuePageSize(value){
            this.pageSize = value;
            this.pageNumber = 1;
            this.$refs[this.refElements.table].checkboxActive = [];
            this.$refs[this.refElements.table].entityCheckboxActive = [];
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
         * Hàm xử lý sự kiện lấy ra giá trị api từ keyword,departmentId,assetCategoryId
         * @author LTVIET (15/04/2023)
         */
        getAssetFilterApi(){
            let api = configJS.api.asset.assetFilterApi.replace("{0}",this.pageSize);
            api = api.replace("{1}",this.pageNumber);
            api = api.replace("{2}",this.keyword);
            api = api.replace("{3}",this.assetCategoryId);
            api = api.replace("{4}",this.departmentId);
            return api;
        },
        
        /**
         * Hàm xử lý sự kiện click button đóng form
         * @author LTVIET (06/03/2023)
         */
        addOnClickCloseForm(){
            this.isShowForm = false;
            this.setFocusDefault();
        },
        /**
         * Hàm gọi api để lấy ra mã tài sản mới từ lần nhập gần nhất + 1
         * @author LTVIET (17/03/2023)
         */
         getNewCode(){
            axios.get(this.generateNewCodeApi)
            .then(res=>{
                this.newCode = res.data;
                this.keyAssetDetail = ++this.keyAssetDetail;
            })
            .catch(error=>{
                console.log(error);
            })
        },

        
        
        /**
         * Hàm thêm sự kiện click thêm tài sản
         * @param {*} title tiêu đề của form
         * @param {*} index id của đối tượng
         * @author LTVIET (02/03/2023)
         */
        btnClickOpenForm() {
            this.isShowToastSucess = false;
            this.isShowForm = true;
            this.typeForm = enumJS.type.add;
            this.labelForm = resourceJS.titlteForm.asset.addForm;
            this.getNewCode();
        },
        
        /**
         * Hàm xử lý sự kiện mở form chi tiết tài sản khi click vào chức năng của table
         * @param {*} values giá trị được truyền từ lớp con (label form,id của đối tượng tài sản asset)
         * @author LTVIET (02/03/2023)
         */
        handleEventOpenForm(values) {
            this.isShowToastSucess = false;
            this.typeForm = values[0];
            if(this.typeForm == enumJS.type.delete){
                this.btnOnClick();
            }else{
                if(this.typeForm == enumJS.type.edit){
                    this.labelForm = resourceJS.titlteForm.asset.editForm;
                } 
                else{
                    if(this.typeForm == enumJS.type.clone){
                        this.labelForm = resourceJS.titlteForm.asset.cloneForm;
                    }else if(this.typeForm == enumJS.type.add){
                        this.labelForm = resourceJS.titlteForm.asset.addForm;
                    }
                    this.getNewCode();
                }
                this.getAssetById(values[1].fixed_asset_id);
                this.isShowForm = true;
            }
        },

        /**
         * Hàm gọi api lấy ra đối tượng tài sản theo id
         * @param {*} id id của đối tượng tài sản
         * @author LTVIET (06/03/2023)
         */
        getAssetById(id){
            axios.get(`${configJS.api.asset.assetApi}/${id}`)
            .then(res=>{
                this.assetInput = res.data;
                this.keyAssetDetail = ++this.keyAssetDetail;
            })
            .catch(error => {
                let message = error.response.data.UserMsg;
                this.handleEventErrorAPI(error, message);
            })
        },

        /**
         * Hàm xử lý sự kiện click button xóa tài sản
         * @author LTVIET (02/03/2023)
         */
        btnOnClick(){
            //1. lấy số lượng checkbox = true từ table
            let table = this.$refs[this.refElements.table];
            this.assetsDeleteMultiple = table.getEntityCheckboxActiveList();
            let quantityCheckbox = this.assetsDeleteMultiple.length;
            // let checkActive = false;
            const checkActive = this.assetsDeleteMultiple.some(function(asset){
                return asset.voucher_code;
            })
            //2. kiểm tra số lượng 
            if(quantityCheckbox == 0){
                //2.1. nếu số lượng = 0 thì hiển thị thông báo không có tài sản nào được chọn để xóa
                this.showDialogNotifyDeleteNoAsset();
            }else if(quantityCheckbox == 1){
                //2.2. nếu nếu số lượng = 1 thì hiển thị thông báo xóa 1 tài sản
                this.showDialogConfirmDeleteOne(checkActive);
            }else{
                //2.2. nếu nếu số lượng > 1 thì hiển thị thông báo xóa nhiều tài sản
                this.showDialogConfirmDeleteMultiple(checkActive);
                
            }
        },

        /**
         * Hàm hiển thị dialog thông bóa không có tìa sản nào được chọn để xóa
         * @author LTVIET (02/03/2023)
         */
        showDialogNotifyDeleteNoAsset(){
            this.isShowDialogNotifyDelete = true;
            this.contentDialogNotifyDelete = resourceJS.notify.noAssetDelete;
        },

        /**
         * Hàm hiển thị dialog xác nhận xóa 1 tài sản
         * @param {*} checkActive Giá trị kiểm tra xem trong danh sách tài sản xóa có tài sản nào phát sinh chứng từ hay không
         * (true:có phát sinh chứng từ,flase: không phát sinh chứng từ).
         * @author LTVIET (02/03/2023)
         */
        showDialogConfirmDeleteOne(checkActive){
            // 1. lấy thông tin của tài sản đó
            let asset = this.assetsDeleteMultiple[0];
            let assetCode = asset.fixed_asset_code;
            let assetName = asset.fixed_asset_name;
            let voucherCode = asset.voucher_code;
            // 2. hiển thị thông báo
            if(checkActive){
                this.handleEventShowDialogDeleteOneAssetActive(assetCode,voucherCode);
            }else{
                let message = resourceJS.confirm.asset.oneAssetDelete.replace("{0}", assetCode).replace("{1}", assetName);
                this.contentDialogConfirmDeleteOneAsset = message;
                this.isShowDialogConfirmDeleteOneAsset = true;
            }
        },

        /**
         * Hàm xử lý sự kiện hiển thị dialog thông báo không được xóa tài sản đã chứng từ
         * @param {*} assetCode mã tài sản
         * @param {*} voucherCode mã chứng từ
         * @author LTVIET (04/05/2023)
         */
        handleEventShowDialogDeleteOneAssetActive(assetCode,voucherCode){
            this.isShowDialogNotifyDelete = true;
            let message = resourceJS.notify.deleteAssetActive.replace("{0}",assetCode).replace("{1}",voucherCode);
            this.contentDialogNotifyDelete = message;
        },

        /**
         * Hàm hiển thị dialog xác nhận xóa nhiều tài sản
         * @param {*} checkActive Giá trị kiểm tra xem trong danh sách tài sản xóa có tài sản nào phát sinh chứng từ hay không
         * (true:có phát sinh chứng từ,flase: không phát sinh chứng từ).
         * @author LTVIET (02/03/2023)
         */
         showDialogConfirmDeleteMultiple(checkActive){
            let quantity = this.assetsDeleteMultiple.length;
            if(quantity < 10){
                quantity = `0${quantity}`; 
            }
            if(!checkActive){
                this.isShowDialogConfirmDeleteMultiAsset = true;
                this.contentDialogConfirmDeleteMultiAsset = resourceJS.confirm.asset.multiAssetDelete.replace("{0}", quantity);
            }else{
                this.handleEventShowDialogDeleteMultipleAssetActive(quantity);
            }
        },

        /**
         * Hàm xử lý sự kiện hiển thị dialog thông báo không được xóa nhiều tài sản trong đó có tài sản đã chứng từ
         * @param {*} quantity số lượng tài sản
         * @author LTVIET (04/05/2023)
         */
        handleEventShowDialogDeleteMultipleAssetActive(quantity){
            this.isShowDialogNotifyDelete = true;
            this.contentDialogNotifyDelete = resourceJS.notify.deleteMultipleAssetActive.replace("{0}",quantity);
        },

        /**
         * Hàm set focus vào input đầu tiên của asset lít khi load lại trang
         * @author LTVIET (26/03/2023)
         */
        setFocusDefault(){
            this.$refs[this.refElements.inputSearch].setFocus();
        },

        /**
         * Hàm xử lý sự kiện click vào button của dialog xác nhận hành động xóa
         * @param {*} index index của button muốn click
         * @author LTVIET (02/03/2023)
         */
        handleEventCloseDialogDelete(index) {
            //1.Nếu click button "Không"
            if(index == this.btnDialogDelete[1][2]){
                if(this.isShowDialogConfirmDeleteOneAsset==true){
                    //--> ẩn đi dialog xác nhận xóa 1 tái sản
                    this.isShowDialogConfirmDeleteOneAsset = false;
                }else if(this.isShowDialogConfirmDeleteMultiAsset==true){
                    //-->ẩn đi dialog xác nhận xóa nhiều tái sản
                    this.isShowDialogConfirmDeleteMultiAsset = false;
                }
                this.setFocusDefault();
                return;
            }
            // 2.Nếu click button "Xóa"
            // let checkboxSelected = this.$refs[this.refElements.table].getItemSelected();
            if(this.isShowDialogConfirmDeleteOneAsset==true){
                // 2.1. Nếu xóa 1 tài sản
                this.handleEventCloseDialogDeleteOne(this.assetsDeleteMultiple[0]);
            }else if(this.isShowDialogConfirmDeleteMultiAsset==true){
                // 2.2. Nếu xóa nhiều tài sản
                this.handleEventCloseDialogDeleteMultiple(this.assetsDeleteMultiple);
            }
            this.setFocusDefault();
        },

        /**
         * Hàm xử lý sự kiện xóa 1 tài sản
         * @param {*} checkboxSelected Đối tượng tài sản cần xóa
         * @author LTVIET (06/03/2023) 
         */
        handleEventCloseDialogDeleteOne(checkboxSelected){
            //--> ẩn đi dialog xác nhận xóa 1 tái sản
            this.isShowDialogConfirmDeleteOneAsset = false;
            //lấy id tài sản cần xóa
            let id = "";
            if(this.contextMenuDelete){
                id = this.contextMenuItemDelete.fixed_asset_id;
            }else{
                id = checkboxSelected.fixed_asset_id;
            }
            //gọi hàm xóa tài sản
            if(id){
                this.deleteAsset(id);
            }
            
        },

        /**
         * Hàm xử lý sự kiện xóa nhiều tài sản
         * @param {*} assets Danh sách các tài sản cần xóa
         * @author LTVIET (06/03/2023) 
         */
         handleEventCloseDialogDeleteMultiple(assets){
            //-->ẩn đi dialog xác nhận xóa nhiều tài sản
            this.isShowDialogConfirmDeleteMultiAsset = false;
            let assetsId = [];
            // duyệt mảng các tài sản cần xóa
            for(let i =0;i<assets.length;i++){
                // lấy id của từng tài sản cần xóa
                let id = assets[i].fixed_asset_id;
                assetsId.push(id);
            }
            this.deleteMultipleAsset(assetsId);
        },

        /**
         * Hàm gọi api xóa tài sản
         * @author LTVIET (06/03/2023) 
         */
        deleteAsset(id){
            axios.delete(`${this.assetApi}/${id}`)
            .then(()=>{
                //gọi hàm load lại dữ liệu table
                this.$refs[this.refElements.table].pageNumber = 1;
                this.$refs[this.refElements.table].checkboxActive = [];
                this.$refs[this.refElements.table].entityCheckboxActive = [];
                this.getDataTable();
                //hiển thị dialog thông báo xóa thành công
                this.isButtonUndo = true;
                this.isButtonClose = true;
                this.notifyToastSuccess = resourceJS.toastSuccess.asset.success;
                this.contentToastSuccess = resourceJS.toastSuccess.asset.deleteSuccess;
                this.isShowToastSucess = true;
                //--> thực hiện hành động xóa 1 tài sản
                setTimeout(this.closeToastSucess,3000);
                
            })
            .catch(error=>{
                let message = error.response.data.UserMsg;
                this.handleEventErrorAPI(error,message);
            })
            
        },

        /**
         * Hàm gọi api xóa nhiều tài sản
         * @author LTVIET (06/03/2023) 
         */
         deleteMultipleAsset(assetsId){
            
            axios.delete(this.assetApi,{
                data: Object.values(assetsId)
            })
            .then( ()=>{
                //gọi hàm load lại dữ liệu table
                this.$refs[this.refElements.table].pageNumber = 1;
                this.$refs[this.refElements.table].checkboxActive = [];
                this.$refs[this.refElements.table].entityCheckboxActive = [];
                this.getDataTable();
                //hiển thị dialog thông báo xóa thành công
                this.isButtonUndo = true;
                this.isButtonClose = true;
                this.notifyToastSuccess = resourceJS.toastSuccess.asset.success;
                this.contentToastSuccess = resourceJS.toastSuccess.asset.deleteSuccess;
                this.isShowToastSucess = true;
                //--> thực hiện hành động xóa 1 tài sản
                setTimeout(this.closeToastSucess,3000);
            })
            .catch(error=>{
                let message = error.response.data.UserMsg;
                this.handleEventErrorAPI(error,message);
            })
            
        },

        
        /**
         * Hàm xử lý sự kiện gặp lỗi khi gọi API
         * @param {*} error Lỗi cần xử lý
         * @param {*} message Thông báo nỗi cần xử lý
         * @author LTVIET(04/03/2023)
         */
         handleEventErrorAPI(error,message){
            console.log("error:",error);
            this.isShowLoad = false;
            const errorInfo = error.response.data.MoreInfo;
            if(error.code == "ERR_NETWORK"){
                this.isShowDialogNotifyDelete = true;
                this.contentDialogNotifyDelete = resourceJS.errorMsg.errorConnection;
            }
            else if (errorInfo.ErrorCode == enumJS.errorCode.inValid){
                let quantity = this.assetsDeleteMultiple.length;
                if(quantity == 1){
                    const idAssetError = errorInfo.Data.Data[0];
                    let assetError = this.dataAssets.find(asset => asset.fixed_asset_id == idAssetError);
                    this.handleEventShowDialogDeleteOneAssetActive(assetError.fixed_asset_code,assetError.voucher_code);
                }else if(quantity > 1 ){
                    quantity = quantity < 10 ? `0${quantity}`:quantity;
                    this.handleEventShowDialogDeleteMultipleAssetActive(quantity);
                }
                
            }
            else{
                this.isShowDialogNotifyDelete = true;
                this.contentDialogNotifyDelete = message;
            }
        },

        /**
         * Hàm đóng toast message thông báo thành công
         * @author LTVIET (06/03/2023) 
         */
        closeToastSucess(){
            this.isShowToastSucess = false;
        },

        /**
         * Hàm đóng đóng form lưu và hiển thị toast message thông báo lưu thành công
         * @author LTVIET (06/03/2023) 
         */
        handleEventSaveForm(){
            this.isShowForm = false;
            this.pageNumber = 1;
            this.$refs[this.refElements.table].checkboxActive = [];
            this.$refs[this.refElements.table].entityCheckboxActive = [];
            this.getDataTable();
            let message = resourceJS.toastSuccess.asset.saveSuccess;
            this.showToastSucess(message);
            
        },

        /**
         * Hàm xử lý sự kiện hiển thị toast message thông báo thành công
         * @param {*} message Nội dung thông báo thành công
         * @author LTVIET (06/03/2023) 
         */
        showToastSucess(message){
            this.setFocusDefault();
            this.isButtonUndo = false;
            this.contentToastSuccess = message;
            this.isShowToastSucess = true;
            setTimeout(() => {
                this.isShowToastSucess=false;
            }, 3000);
        },

        /**
         * Hàm xử lý sự kiện click btn xuất file excel
         * @author LTVIET (06/03/2023)
         */
        addOnClicKBtnExportExcel(){
            this.isShowDialogConfirmExportExcel = true;
            this.contentDialogConfirmExportExcel = resourceJS.confirm.asset.exportExcel;
        },

        /**
         * Hàm xử lý sự kiện khi click btn của dialog xác nhận xuất ra file excel
         * @param {*} label label của button muốn click
         * @author LTVIET (06/03/2023) 
         */
         handleEventClickBtnDialogExcel(label){
            // Nếu click button "Không" thì ẩn dialog đi
            if(label == this.btnDialogExcel[1][0]){
                this.isShowDialogConfirmExportExcel = false;
                return;
            }
            // Nếu click button "Tải xuống" thì gọi api xuất dữ liệu ra file excel
            this.isShowLoad = true;
            axios.get(`${this.exportExcelApi}fixedAssetCatagortId=${this.assetCategoryId}&keyword=${this.keyword}&departmentId=${this.departmentId}`,
            { responseType: "blob" })
            .then(res => {
                const blob = new Blob([res.data], {
                    type: resourceJS.excel.type
                });
                const fileName = `${resourceJS.excel.name}.xlsx`;
                saveAs(blob,fileName);
                this.isShowDialogConfirmExportExcel = false;
                this.isShowLoad=false;
                this.$refs[this.refElements.table].checkboxActive = [];
                this.$refs[this.refElements.table].entityCheckboxActive = [];
                this.$refs[this.refElements.table].checkbox.fill(false);
                this.setFocusDefault();
            })
            .catch(error => {
                let message = resourceJS.errorMsg.exportExcelFailed;
                this.handleEventErrorAPI(error,message);
            })
            
        },

        

        /**
         * Hàm lấy dữ liệu từ combobox loại tài sản
         * @param {*} value giá trị của combobox
         * @author LTVIET (12/06/2023)
         */
        getValueAssetCategory(value){
            this.assetCategoryId = value;
            if(!value){
                this.assetCategoryId = "";
            }
            this.$refs[this.refElements.table].checkboxActive = [];
            this.$refs[this.refElements.table].entityCheckboxActive = [];
            this.getDataTable();
            
        },

        /**
         * Hàm lấy dữ liệu từ combobox phòng ban
         * @param {*} value giá trị của combobox
         * @author LTVIET (12/06/2023)
         */
        getValueDepartment(value){
            this.departmentId = value;
            if(!value){
                this.departmentId = "";
            }
            this.$refs[this.refElements.table].checkboxActive = [];
            this.$refs[this.refElements.table].entityCheckboxActive = [];
            this.getDataTable();
            
        },

        /**
         * Hàm xử lý sự kiện click phím enter để gửi keyword tìm kiếm vào table để lọc
         * @param {*} value giá trị cần tìm kiếm
         * @author LTVIET (16/03/2023)
         */
         handleEventKeyDownEnterInputSearch(value){
            this.keyword = value;
            if(!value){
                this.keyword = "";
            }
            this.$refs[this.refElements.table].checkboxActive = [];
            this.$refs[this.refElements.table].entityCheckboxActive = [];
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
         * Hàm xử lý sự kiện đóng dialog thông báo không có tài sản nào được chọn để xóa
         * @author LTVIET (12/06/2023)
         */
        handleEventCloseDialogNotifyDelete(){
            this.isShowDialogNotifyDelete = false;
            this.setFocusDefault();
        },
        
        /**
         * Hàm xử lý sự kiện khi click chức năng thêm trong context menu
         * @author LTVIET (25/03/2023)
         */
        handleEventClickContextMenu(){
            this.btnClickOpenForm();
        },

        /**
         * Hàm xử lý sự kiện keyup khi bấm phím tắt
         * @param {*} event sự kiếm bấm các phím tắt
         * @author LTVIET (28/03/2023)
         */
        handleEventKeyUp(event){
            let keyCode = event.keyCode;
            if(keyCode == enumJS.keyCtrl){
                this.previousKeyCtrl = false;
            }
            if(keyCode == enumJS.keyShift){
                this.previousKeyShift = false;
            }
        },
        
        /**
         * Hàm xử lý sự kiện keydown khi bấm phím tắt
         * @param {*} event sự kiếm bấm các phím tắt
         * @author LTVIET (28/03/2023)
         */
        handleEventKeyDown(event){
            let keyCode = event.keyCode;
            if(keyCode == enumJS.keyCtrl){
                this.previousKeyCtrl = true;
            }
            if(keyCode == enumJS.keyShift){
                this.previousKeyShift = true;
            }
            this.handleEventKeyStrokesCtrl(event,keyCode);
            this.handleEventKeyStrokesShift(event,keyCode);
        },


        /**
         * Hàm xử lý sự kiện khi bấm tổ hợp phím Shift + keycode
         * @param {*} event Sự kiện khi bấm phím
         * @param {*} keyCode Ký tự bấm cùng phím Shift
         * @author LTVIET (29/03/2023)
         */
        handleEventKeyStrokesShift(event,keyCode){
            if(this.previousKeyShift){
                switch (keyCode) {
                    case enumJS.keyAlt:
                        event.preventDefault();
                        this.$refs[this.refElements.table].markCheckboxAll();
                        break;
                    default:
                        break;
                }
            }
        },

        /**
         * Hàm xử lý sự kiện khi load lại dữ liệu table thì focus vào input tìm kiếm
         * @author LTVIET (09/03/2023)
         */
        handleEventLoadTable(){
            this.setFocusDefault();
        },

        /**
         * Hàm xử lý sự kiện khi bấm tổ hợp phím Ctrl + keycode
         * @param {*} event Sự kiện khi bấm phím
         * @param {*} keyCode Ký tự bấm cùng phím Ctrl
         * @author LTVIET (29/03/2023)
         */
        handleEventKeyStrokesCtrl(event,keyCode){
            if(this.previousKeyCtrl){
                event.preventDefault();
                let table = this.$refs[this.refElements.table];
                switch (keyCode) {
                    // nếu tổ hợp phím là Ctrl+1 thì gọi đến form thêm tài sản
                    case enumJS.key1:
                        this.handleEventKeyStrokesCtrl1();
                        break;
                    // nếu tổ hợp phím là Ctrl+0 thì gọi đến form nhân bản tài sản
                    case enumJS.key0:
                        this.handleEventKeyStrokesCtrl0(table);
                        break;
                    // nếu tổ hợp phím là Ctrl+E thì gọi đến form sửa tài sản
                    case enumJS.keyE:
                        this.handleEventKeyStrokesCtrlE(table);
                        break;
                    // nếu tổ hợp phím là Ctrl+D thì gọi đến form xóa tài sản
                    case enumJS.keyD:
                        this.handleEventKeyStrokesCtrlD();
                        break;
                    // nếu tổ hợp phím là Ctrl+P thì gọi đến form xuất ra file excel
                    case enumJS.keyP:
                        this.handleEventKeyStrokesCtrlP();
                        break;
                    default:
                        break;
                }
            }
        },

        /**
         * Hàm xử lý sự kiện khi bấm tổ hợp phím Ctrl + 1 thì gọi đến chức năng thêm tài sản
         * @author LTVIET (29/03/2023)
         */
        handleEventKeyStrokesCtrl1(){
            this.btnClickOpenForm();
            this.previousKeyCtrl = false;
        },

        /**
         * Hàm xử lý sự kiện khi bấm tổ hợp phím Ctrl + 0 thì gọi đến chức năng nhân bản tài sản
         * @param {*} table Đối tượng table
         * @author LTVIET (29/03/2023)
         */
         handleEventKeyStrokesCtrl0(table){
            let quantityCheckbox = table.entityCheckboxActive.length;
            if(quantityCheckbox == 1){
                let asset = table.getItemSelected();
                table.handleEventClickFunction(enumJS.type.clone,asset[0]);
                this.previousKeyCtrl = false;
            }
        },

        /**
         * Hàm xử lý sự kiện khi bấm tổ hợp phím Ctrl + E thì gọi đến chức năng sửa tài sản
         * @param {*} table Đối tượng table
         * @author LTVIET (29/03/2023)
         */
         handleEventKeyStrokesCtrlE(table){
            const assets = table.getEntityCheckboxActiveList();
            let quantityCheckbox = assets.length;
            if(quantityCheckbox == 1){
                let asset = this.dataAssets[assets[0].index - 1];
                this.handleEventOpenForm([enumJS.type.edit,asset]);
                this.previousKeyCtrl = false;
            }
        },

        /**
         * Hàm xử lý sự kiện khi bấm tổ hợp phím Ctrl + D thì gọi đến chức năng xóa tài sản
         * @author LTVIET (29/03/2023)
         */
         handleEventKeyStrokesCtrlD(){
            this.btnOnClick();
            this.previousKeyCtrl = false;
        },

        /**
         * Hàm xử lý sự kiện khi bấm tổ hợp phím Ctrl + P thì gọi đến chức năng xuất dữ liệu ra file excel
         * @author LTVIET (29/03/2023)
         */
         handleEventKeyStrokesCtrlP(){
            this.addOnClicKBtnExportExcel();
            this.previousKeyCtrl = false;
        },
    },
    

}
</script>

<style scoped>

</style>