<template>
    <div>
        <div  class="form editForm" :tabindex="0" @keydown="handleEventKeyDown" @keyup="handleEventKeyUp">
            <div class="asset_increment__form-data" >
                <!-- phần header của form  -->
                <div class="form-header">
                    <!-- title của form  -->
                    <div class="asset_increment__form-header__text">{{ labelForm }}</div>
                    <!-- button đóng form  -->
                    <MButtonIcon
                        class="btn-header__icon"
                        classIcon="form-header__icon"
                        @addOnClickBtnIcon="handleEventBtnClickCancel">
                    </MButtonIcon>
                </div>
                <!-- phần body của form  -->
                <div id="formBody" class="asset_increment__form_body">
                    <div class="asset_increment__form-body--tex1">Thông tin chứng từ</div>
                    <div class="asset_increment__form-body__up">
                        <div class="m-row">
                            <div class="input down-left">
                                <!-- input nhập số lượng  -->
                                <MInput
                                    :ref="assetIncrementDetailInfo.voucherCode.ref"
                                    :required="assetIncrementDetailInfo.voucherCode.required"
                                    :disable="assetIncrementDetailInfo.voucherCode.disable"
                                    :placeholder="assetIncrementDetailInfo.voucherCode.placeholder"
                                    :label="assetIncrementDetailInfo.voucherCode.label"
                                    :valueInput="assetIncrement.voucher_code"
                                    @getValueInput="handleEventGetValueInputVoucherCode"
                                    @getValueEventInput="handleEventGetValueInputVoucherCode"
                                    >
                                </MInput>
                            </div>
                            
                            <div class="input down-center">
                                <!-- input nhập ngày chứng từ  -->
                                <MInputDate
                                    :ref="assetIncrementDetailInfo.voucherDate.ref"
                                    :required="assetIncrementDetailInfo.voucherDate.required"
                                    :disable="assetIncrementDetailInfo.voucherDate.disable"
                                    :label="assetIncrementDetailInfo.voucherDate.label"
                                    :valueInputDate="assetIncrement.voucher_date"
                                    :placeholder="assetIncrementDetailInfo.voucherDate.placeholder"
                                    :format="assetIncrementDetailInfo.voucherDate.format"
                                    @getValueInputDate="getValueVoucherDate"
                                    >
                                </MInputDate>
                            </div>
                           
                            <div class="input down-right">
                                <!-- input nhập ngày ghi tăng -->
                                <MInputDate
                                    :ref="assetIncrementDetailInfo.incrementDate.ref"
                                    :required="assetIncrementDetailInfo.incrementDate.required"
                                    :disable="assetIncrementDetailInfo.incrementDate.disable"
                                    :label="assetIncrementDetailInfo.incrementDate.label"
                                    :valueInputDate="assetIncrement.increment_date"
                                    :placeholder="assetIncrementDetailInfo.incrementDate.placeholder"
                                    :format="assetIncrementDetailInfo.incrementDate.format"
                                    @getValueInputDate="getValueIncrementDate"
                                    >
                                </MInputDate>
                            </div>
                        </div>

                        <div class="m-row">
                            <!-- input nhập ghi chú  -->
                            <MInput
                                :ref="assetIncrementDetailInfo.description.ref"
                                :required="assetIncrementDetailInfo.description.required"
                                :disable="assetIncrementDetailInfo.description.disable"
                                :placeholder="assetIncrementDetailInfo.description.placeholder"
                                :valueInput="assetIncrement.description"
                                @getValueInput="getValueInputDescription"
                                @getValueEventInput="getValueInputDescription"
                                :label="assetIncrementDetailInfo.description.label"
                                >
                            </MInput>
                        </div>
                    </div>

                    <div class="asset_increment__form-body--tex1">Thông tin chi tiết</div>
                    <div class="asset_increment__form-body__down">
                        <!-- input nhập số lượng  -->
                        <div class="header__body--down">
                            <div class="input down-left">
                                <MInput
                                    :disable="false"
                                    placeholder="Tìm kiếm theo mã, tên tài sản"
                                    :iconInput="true"
                                    @keyDownEnter ="handleEventKeyDownEnterInputSearch"
                                    @getValueEventInput="handleEventGetValueInputSearch"
                                    >
                                </MInput>
                            </div>

                            <MButton
                                label="Chọn tài sản"
                                class="item1"
                                @btnAddOnClickBtn="btnClickOpenFormSelectedAsset">
                            </MButton>
                        </div>
                        <div class="table_container">
                            <MTable 
                            ref="mTable"
                            :tableInfo="tableInfo"
                            :dataHeader="dataHeaderTable"
                            :dataBody="dataBodyTable"
                            :dataFooter="dataFooterTable"
                            :isPaging="false"
                            :isCheckbox="false"
                            :isFunction="true"
                            :dataEntities="dataAssets"
                            :isContextmenu="true"
                            :key="keyTable"
                            @btnClickFunctionOpenForm="handleEventClickFunctionTable">
                            </MTable>
                        </div> 
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
        <AssetNoActive 
            v-if="isShowSelectAssetNoActive"
            :dataBodyApi="dataBodyApi"
            @onSave="handleEventSelectedAssets"
            @onClose="handleEventCloseformSelecteAssetNoActive">
        </AssetNoActive>
        <BudgetAsset 
            v-if="isShowBudgetAsset"
            :propAsset="asset"
            :label="labelBudgetForm"
            :autoUpdate="true"
            @getNewValueAsset="handleEventEditBudgetAsset"
            @onClose="handleEventCloseFormBudgetAsset">
        </BudgetAsset>

        <MDialog 
            ref="mDialogNotifyDelete"
            :content="contentDialogNotify"
            :buttonInfo="btnDialogNotify"
            v-if="isShowDialogNotify" 
            @onClickBtn="handleEventCloseDialogNotify">
        </MDialog>
        <!-- dialog xác nhận sự kiện hủy của form thêm mới hoặc nhân bản -->
        <MDialog 
            :content="contentDialogAddFormCancel"
            :buttonInfo="btnDialogCancelAddForm"
            v-if="isShowDialogAddFormCancel"
            @onClickBtn="handleEventCloseDialogCancelAddForm">
        </MDialog>
        <!-- dialog xác nhận sự kiện hủy của form sửa -->
        <MDialog
            :content="contentDialogEditFormCancel"
            v-if="isShowDialogEditFormCancel"
            :buttonInfo="btnDialogCancelEditForm"
            @onClickBtn="handleEventCloseDialogCancelEditForm"
            >
        </MDialog>

        <MToastSucess 
            v-if="isShowToastSuccess"
            :notify="notifyToastSuccess"
            :content="contentToastSuccess"
            :buttonUndo="false"
            :buttonClose="true"
            @onClose="closeToastSucess"
            >
        </MToastSucess>
        
        <!-- dialog hiển thị đang load dữ liệu  -->
        <MDialogLoadData v-if="isShowLoad"></MDialogLoadData>
    </div>
</template>


<script>
import resourceJS from '@/js/resourceJS';
import enumJS from '@/js/enum';
import BudgetAsset from '@/views/budgetAsset/BudgetAsset.vue';
import configJS from '@/js/config';
import axios from 'axios';
import commonJS from '@/js/common';
import AssetNoActive from '../assetNoActive/AssetNoActive.vue';
export default {
    name: "AssetIncrementDetail",
    components:{
        BudgetAsset,AssetNoActive
    },
    props:{
        propAssetIncrementCode: {
            type: String,
            default: ""
        },
        assetIncrementInput:{
            type: Object,
            default: null
        },
        typeForm:{
            type: Number,
            default: 0
        },
        labelForm: {
            type: String,
            default: ""
        }
    },
    data() {
        return {
            tableInfo: resourceJS.table.tableAssetIncrementDetail,
            dataPageSize: resourceJS.table.tableAssetIncrementDetail.dataPageSize ,
            isShowDialogAddFormCancel: false,
            isShowDialogEditFormCancel: false,
            isShowSelectAssetNoActive: false,
            isShowBudgetAsset: false,
            assets: [],
            asset: null,
            keyTable: 0,
            keyword: "",
            dataBodyApi: null,
            assetIncrement: null,
            assetIncrementApi: configJS.api.assetIncrement.assetIncrementApi,
            assetIncrementDetailApi: configJS.api.assetIncrementDetail.assetIncrementDetailApi,
            itemError: null,
            contentDialogNotify: "",
            btnDialogNotify: resourceJS.buttonDialog.notify,
            isShowDialogNotify: false,
            isShowLoad: false,
            assetIncrementDetailInfo: resourceJS.assetIncrementDetail,
            oldValueAssetIncrement: null,
            contentDialogAddFormCancel: resourceJS.confirm.assetIncrement.cancelFormAssetIncrement,
            contentDialogEditFormCancel: resourceJS.confirm.assetIncrement.changeCancelFormAssetIncrement,
            btnDialogCancelAddForm: resourceJS.buttonDialog.cancelAddForm,
            btnDialogCancelEditForm: resourceJS.buttonDialog.cancelEditForm,
            oldValueAsset: "",
            assetsAdd: [],
            assetsDelete: [],
            dataBodyTable: [],
            dataFooterTable: [0,0,0],
            dataHeaderTable: resourceJS.table.tableAssetIncrementDetail.header,
            dataAssets: [],
            labelBudgetForm: resourceJS.titlteForm.budget.editForm,
            assetApi: configJS.api.asset.assetApi,
            typeBudgetForm: enumJS.type.edit,
            isShowToastSuccess: false,
            notifyToastSuccess: "",
            contentToastSuccess: "",
            previousKeyCtrl: false
        }
    },
    created() {
        if(this.typeForm == enumJS.type.add){
            this.assetIncrement = this.getDefaultAssetIncrement();
            this.oldValueAssetIncrement = JSON.stringify(this.assetIncrement);
        }else if(this.typeForm == enumJS.type.edit){
            if(this.assetIncrementInput){
                this.oldValueAssetIncrement = JSON.stringify(this.assetIncrementInput);
                this.assetIncrement = JSON.parse(this.oldValueAssetIncrement);
            }else{
                this.assetIncrement = this.getDefaultAssetIncrement();
                this.oldValueAssetIncrement = JSON.stringify(this.assetIncrement);
            }
        }
        this.dataBodyApi = {
            NotInAssets: [],
            ActiveAssets: []
        }
        let oldValueAssets = [];
        if(this.assetIncrement.assets){
            oldValueAssets = this.assetIncrement.assets.map(function(asset){
                return asset.fixed_asset_id;
            })
        }
        this.oldValueAsset = JSON.stringify(oldValueAssets);
        if(this.assetIncrement.assets){
            this.dataBodyApi.NotInAssets = this.assetIncrement.assets.map(function(asset){
                return asset.fixed_asset_id;
            });
            this.getDataTable();
        }

    },
    mounted() {
        this.setFocus();
    },
    methods: {
        


        /**
         * Hàm lấy ra đối tượng asset theo id
         * @param {*} id id của đối tượng cần truy vấn
         * @author LTVIET (18/04/2023)
         */
         getAssetbyId(id){
            this.isShowLoad = true;
            axios.get(`${this.assetApi}/${id}`)
            .then(res=>{
                this.asset = res.data;
                this.isShowBudgetAsset = true;
                this.isShowLoad = false;
            })
            .catch(err=>{
                console.log(err);
                this.isShowLoad = false;
            })
        },

        /**
         * Hàm khởi tạo đối tượng chứng từ mặc định
         * @author LTVIET (23/04/2023)
         */
        getDefaultAssetIncrement(){
            const assetIncrement = {
                voucher_id: "00000000-0000-0000-0000-000000000000",
                voucher_code: this.propAssetIncrementCode,
                voucher_date: this.getCurrentDate(),
                increment_date: this.getCurrentDate(),
                price: 0,
                description: "",
                assets: []
            }
            return assetIncrement;
        },
        /**
         * Hàm lấy giá trị thời gian hiện tại
         * @author LTVIET (12/03/2023)
         */
         getCurrentDate(){
            let currentDate = new Date();
            let txtDate = currentDate.getDate();
            txtDate = Number(txtDate) < 10 ? `0${Number(txtDate)}` : txtDate;
            let txtMonth = currentDate.getMonth() + 1;
            txtMonth = Number(txtMonth) < 10 ? `0${Number(txtMonth)}` : txtMonth;
            let txtYear = currentDate.getFullYear();
            return `${txtYear}-${txtMonth}-${txtDate}`;
        },

        /**
         * Hàm xử lý sự kiện khi click các button của dialog xác nhận hủy form thêm mới
         * @param {*} label label của button muốn click
         * @author LTVIET (03/03/2023)
         */
         handleEventCloseDialogCancelAddForm(label) {
            // Nếu click button "không" thì ẩn dialog đi
            if(label == this.btnDialogCancelAddForm[1][2]){
                this.isShowDialogAddFormCancel = false;
                return;
            }
            // Nếu click button "Hủy bỏ" thì ẩn dialog và form đi
            this.isShowDialogAddFormCancel = false;
            this.$emit('onClose');
        },

        /**
         * Hàm xử lý sự kiện khi click button của dialog xác nhận hủy của form sửa
         * @param {*} label của button muốn click
         * @author LTVIET (02/03/2023)
         */
         handleEventCloseDialogCancelEditForm(label){
            this.isShowDialogEditFormCancel = false;
            // Nếu click button "Không lưu" thì đóng dialog và form sửa lại và không lưu dữ liệu
            if(label == this.btnDialogCancelEditForm[1][2]){
                this.$emit('onClose');
                return;
            }

            // Nếu click button "Hủy" thì đóng dialog lại
            if(label == this.btnDialogCancelEditForm[2][2]){
                this.setFocus();
                return;
            }

            // Nếu click button "Lưu" thì đóng dialog và form sửa lại và lưu dữ liệu
            this.handleEventBtnClickSave();
        },

        /**
         * Hàm xử lý sự kiện click btn đóng form
         * @author LTVIET (19/04/2023)
         */
        handleEventBtnClickCancel(){
            const newValueAssetIncrement = JSON.stringify(this.assetIncrement);
            if(this.typeForm == enumJS.type.add){
                this.isShowDialogAddFormCancel = true;
            }else if(this.typeForm == enumJS.type.edit){
                if(newValueAssetIncrement != this.oldValueAssetIncrement){
                    this.isShowDialogEditFormCancel = true;
                }else{
                    this.$emit('onClose');
                }
            }
        },

        /**
         * Hàm xử lý sự kiện focus vào input mã chứng từ khi form được khởi tạo lần đầu tiên
         * @author LTVIET (19/04/2023)
         */
        setFocus(){
            this.$nextTick(function(){
                this.$refs[this.assetIncrementDetailInfo.voucherCode.ref].setFocus();
            });
        },

        /**
         * Hàm xử lý sự kiện đóng form chọn tài sản
         * @author LTVIET (19/04/2023)
         */
        handleEventCloseformSelecteAssetNoActive(){
            this.isShowSelectAssetNoActive = false;
            this.setFocus();
        },

        /**
         * Hàm xử lý sự kiện keydown
         * @param {*} event sự kiện cần xử lý
         * @author LTVIET (18/04/2023)
         */
         handleEventKeyDown(event){
            const keyCode = event.keyCode;
            if(keyCode == enumJS.keyCtrl){
                this.previousKeyCtrl = true;
            }

            if(keyCode == enumJS.keyEsc){
                this.handleEventBtnClickCancel();
            }

            if(this.previousKeyCtrl){
                event.preventDefault();
                const index = this.$refs["mTable"].indexRowSelected;
                const asset = this.assetIncrement.assets[index - 1];
                switch (keyCode) {
                    case enumJS.keyS:
                        this.handleEventBtnClickSave();
                        break;
                    case enumJS.key1:
                        this.btnClickOpenFormSelectedAsset();
                        break;
                    case enumJS.keyE:
                        this.handleEventClickFunctionTable([enumJS.type.edit,asset]);
                        break;
                    case enumJS.keyD:
                        this.handleEventClickFunctionTable([enumJS.type.delete,asset]);
                        break;
                    default:
                        break;
                }
            }
        },

        /**
         * Hàm xử lý sự kiện keyup
         * @param {*} event sự kiện cần xử lý
         * @author LTVIET (18/04/2023)
         */
         handleEventKeyUp(event){
            const keyCode = event.keyCode;
            if(keyCode == enumJS.keyCtrl){
                this.previousKeyCtrl = false;
            }
        },

        /**
         * Hàm xử lý sự kiện mở form chọn tài sản
         * @author LTVIET (19/04/2023)
         */
         btnClickOpenFormSelectedAsset(){
            this.isShowSelectAssetNoActive = true;
        },

        /**
         * Hàm xử lý sự kiện đóng form sửa nguồn chi phí
         * @author LTVIET (19/04/2023)
         */
        handleEventCloseFormBudgetAsset(){
            this.isShowBudgetAsset = false;
            this.getDataTable();
            this.setFocus();
        },

        /**
         * Hàm xử lý sự kiện nhận giá trị nguyên giá mới sửa từ form
         * @param {*} newAsset đối tượng tài snar mới sửa
         * @author LTVIET (19/04/2023)
         */
        handleEventEditBudgetAsset(newAsset){
            const asset = this.assetIncrement.assets.find(function(asset){
                return asset.fixed_asset_code == newAsset.fixed_asset_code;
            });
            asset.cost = newAsset.cost;
            asset.cost_source = newAsset.cost_source;
            this.assetIncrement.assets[asset.index-1] = asset;
            this.getDataTable();
            this.isShowBudgetAsset = false;
            this.isShowToastSuccess = true;
            this.notifyToastSuccess = resourceJS.toastSuccess.budget.success;
            this.contentToastSuccess = resourceJS.toastSuccess.budget.saveSuccess;
            setTimeout(() => {
                this.closeToastSucess();
            }, 3000);
            this.setFocus();
        },

        /**
         * Hàm xử lý sự kiện đóng toast message
         * @author LTVIET (19/04/2023)
         */
         closeToastSucess(){
            this.isShowToastSuccess = false;
        },

        /**
         * Hàm xử lý sự kiện click btn save của form chọn tài sản
         * @param {*} value danh sách các tài sản được chọn
         * @author LTVIET (19/04/2023)
         */
        handleEventSelectedAssets(value){
            for(let i =0;i<value.length;i++){
                let id = value[i].fixed_asset_id;
                this.dataBodyApi.NotInAssets.push(id);
                this.assetIncrement.assets.push(value[i]);
            }
            this.getDataTable();
            this.isShowSelectAssetNoActive = false;
            this.setFocus();
        },

        /**
         * Hàm xử lý sự kiện click btn save của form chọn tài sản
         * @param {*} value danh sách các tài sản được chọn
         * @author LTVIET (19/04/2023)
         */
        handleEventKeyDownEnterInputSearch(value){
            this.keyword = value;
            if(!value){
                this.dataTable.Data = this.assetIncrement.assets;
            }else{
                this.dataTable.Data = this.dataTable.Data.filter(item=>
                        (item.fixed_asset_code.toLowerCase().includes(this.keyword.toLowerCase()) || 
                        item.fixed_asset_name.toLowerCase().includes(this.keyword.toLowerCase())));
            }
            

            this.keyTable = ++this.keyTable;
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
         * Hàm xử lý sự kiện click vào chức năng trong table 
         * @param {*} values mảng chứa các giá trị (kiểu chức năng(sửa,xóa), đối tượng tài sản)
         * @author LTVIET (16/03/2023)
         */
        handleEventClickFunctionTable(values){
            let type = values[0];
            let item = values[1];
            if(type == enumJS.type.edit){
                this.labelBudgetForm = this.labelBudgetForm.replace("{0}",item.fixed_asset_name);
                this.getAssetbyId(item.fixed_asset_id);
            }else if(type == enumJS.type.delete){
                let index = this.assetIncrement.assets.indexOf(item);
                this.assetIncrement.assets.splice(index,1);
                this.dataBodyApi.NotInAssets.splice(index,1);
                if(JSON.parse(this.oldValueAsset).indexOf(item.fixed_asset_id) != -1){
                    this.dataBodyApi.ActiveAssets.push(item.fixed_asset_id);
                }
                this.getDataTable();
            }
        },

        /**
         * Hàm lấy data table
         * @author LTVIET (18/04/2023)
         */
        getDataTable(){
            this.dataAssets = this.assetIncrement.assets;
            const assets = this.assetIncrement.assets.map(function(asset){
                return {
                    index: asset.index,
                    fixed_asset_code: asset.fixed_asset_code,
                    fixed_asset_name: asset.fixed_asset_name,
                    department_name: asset.department_name,
                    cost: commonJS.formatNumber(Math.round(asset.cost)),
                    depreciation_value: commonJS.formatNumber(Math.round(asset.depreciation_value)),
                    residual_value: commonJS.formatNumber(Math.round(asset.residual_value)),
                }
            });
            this.dataBodyTable = assets;
            let costTotal = 0;
            let deprectionValueTotal = 0;
            let residualTotal = 0;
            for(let i =0;i<this.assetIncrement.assets.length;i++){
                costTotal += this.assetIncrement.assets[i].cost;
                deprectionValueTotal += this.assetIncrement.assets[i].depreciation_value;
                if(this.assetIncrement.assets[i].residual_value > 0){
                    residualTotal += this.assetIncrement.assets[i].residual_value;
                }
                this.dataBodyTable[i].index = i+1;
            }
            costTotal = commonJS.formatNumber(Math.round(costTotal));
            deprectionValueTotal = commonJS.formatNumber(Math.round(deprectionValueTotal));
            residualTotal = commonJS.formatNumber(Math.round(residualTotal));
            this.dataFooterTable = [costTotal,deprectionValueTotal,residualTotal];
            this.keyTable = ++this.keyTable;
        },


        /**
         * Hàm xử lý sự kiện click btn lưu
         * @author LTVIET (19/04/2023)
         */
        handleEventBtnClickSave(){
            if(this.validateAssetIncrement() & this.validateAssetActives()){
                const price = this.assetIncrement.assets.reduce(function (total,asset) {
                    return total + asset.cost;
                },0);
                this.assetIncrement.price = Math.round(price);
                this.isShowLoad  = true;
                if(this.typeForm == enumJS.type.add){
                    this.addAssetIncrement();
                }else{
                    const newValueAsset = this.assetIncrement.assets.map(function(asset){
                        return asset.fixed_asset_id;
                    })
                    if(this.oldValueAsset != JSON.stringify(newValueAsset)){
                        const newValueIdAssets = this.assetIncrement.assets.map(function (asset) {
                            return asset.fixed_asset_id;
                        })
                        for (const idAsset of JSON.parse(this.oldValueAsset)) {
                            const index = newValueIdAssets.indexOf(idAsset);
                            if(index == -1){
                                this.assetsDelete.push(idAsset);
                            }
                        }
                        for (const idAsset of newValueIdAssets) {
                            const index = JSON.parse(this.oldValueAsset).indexOf(idAsset);
                            if(index == -1){
                                this.assetsAdd.push(idAsset);
                            }
                        }
                    }
                    this.updateAssetIncrement();
                }
                
            }
        },

        /**
         * Hàm xử lý sự kiện gọi api để thêm đối tượng chứng từ mới
         * @author LTVIET (19/04/2023)
         */
        addAssetIncrement(){
            axios.post(this.assetIncrementApi, this.assetIncrement)
            .then(()=>{
                this.isShowLoad  = false;
                this.$emit('addOnClickBtnSaveAssetIncrement');
            })
            .catch(error=>{
                this.handleEventErrorAPI(error);
            })
        },

        /**
         * Hàm xử lý sự kiện gọi api để sửa đối tượng chứng từ
         * @author LTVIET (19/04/2023)
         */
        updateAssetIncrement(){
            const entity = {
                AssetIncrement: this.assetIncrement,
                AssetsAdd: this.assetsAdd.length == 0 ? null: this.assetsAdd,
                AssetsDelete: this.assetsDelete.length == 0 ? null: this.assetsDelete
            }
            this.isShowLoad = false;
            axios.put(this.assetIncrementApi,entity)
            .then(()=>{
                this.isShowLoad = false;
                this.$emit('addOnClickBtnSaveAssetIncrement');
            })
            .catch(err=>{
                this.handleEventErrorAPI(err);
            })
        },

        /**
         * Hàm xử lý sự kiện gặp lỗi khi gọi API
         * @param {*} error Lỗi cần xử lý
         * @author LTVIET(04/03/2023)
         */
         handleEventErrorAPI(error){
            console.log(error);
            this.isShowLoad = false;
            this.isShowDialogNotify = true;
            // lỗi kết nối
            if(error.code == "ERR_NETWORK"){
                this.contentDialogNotify = resourceJS.errorMsg.errorConnection;
            }
            else{
                let errorData = error.response.data;
                let errorCode = errorData.ErrorCode;
                let message = errorData.UserMsg;
                // Nếu là lỗi về dữ liệu
                if(errorCode == enumJS.errorCode.inValid){
                    this.contentDialogNotify = resourceJS.error.notify;
                    this.handleEventErrorInvalid(errorData.MoreInfo);
                }
                // Các lỗi khác
                else{
                    this.contentDialogNotify = message;
                    this.itemError = null;
                }
                
            }
        },

        /**
         * Hàm nhận và xử lý lỗi từ backend
         * @param {*} errors lỗi nhận được từ backend
         * @author LTVIET (12/04/2023)
         */
         handleEventErrorInvalid(errors){
            for (let error of errors) {
                // validate lỗi code bị trùng
                if(error.ValidateCode == enumJS.validateCode.duplicate){
                    let itemVoucherCode = this.$refs[this.assetIncrementDetailInfo.voucherCode.ref];
                    if(!itemVoucherCode.inValid){
                        this.handleDisplayInputError(itemVoucherCode,error.Message);
                        if(!this.itemError){
                            this.itemError = itemVoucherCode;
                        }
                    }
                    
                }
                // validate lỗi để trống
                else if(error.ValidateCode == enumJS.validateCode.empty){
                    for (let item of error.Data) {
                        let itemEmpty = this.$refs[`ref_${item}`];
                        if(!itemEmpty.inValid){
                            let message = itemEmpty.label + error.Message;
                            this.handleDisplayInputError(itemEmpty,message);
                            if(!this.itemError){
                                this.itemError = itemEmpty;
                            }
                        }
                    }
                }
                else if(error.ValidateCode == enumJS.validateCode.noAssetIncrements){
                    this.contentDialogNotify = error.Message;
                }
                // validate các lỗi còn lại
                else{
                    let item = this.$refs[`ref_${error.Data}`];
                    if(!item.inValid){
                        this.handleDisplayInputError(item,error.Message);
                        if(!this.itemError){
                            this.itemError = item;
                        }
                    }
                }
            }
        },

        /**
         * Hàm xử lý sự kiện hiển thị lỗi thông báo của input 
         * @param {*} item đối tượng cần hiển thị lỗi
         * @param {*} message nội dung thông báo lỗi
         * @author LTVIET (26/03/2023)
         */
         handleDisplayInputError(item,message){
            item.inValid = true;
            item.notifyError = message;
        },

        /**
         * Hàm validate các trường giá trị của chứng từ
         * @author LTVIET (19/04/2023)
         */
        validateAssetIncrement(){
            const refs = this.assetIncrementDetailInfo.refElements;
            let check = true;
            for (const ref of refs) {
                let item = this.$refs[ref];
                if(!item.value){
                    check = false;
                    item.inValid = true;
                    item.notifyError = item.label + resourceJS.error.emptyInput;
                    if(!this.itemError){
                        this.itemError = item;
                        this.itemError.setFocus();
                    }
                }
            }
            return check;
        },

        /**
         * Hàm validate các trường giá trị của danh sách tài sản ghi tăng
         * @author LTVIET (19/04/2023)
         */
         validateAssetActives(){
            let check = true;
            if(this.assetIncrement.assets.length <= 0){
                this.isShowDialogNotify = true;
                this.contentDialogNotify = resourceJS.notify.noAsset;
                check = false;
            }
            return check;
        },

        /**
         * Hàm xử lý sự kiện lấy giá trị của mã chứng từ trong input
         * @param {*} value giá trị trong input
         * @author LTVIET (19/04/2023)
         */
        handleEventGetValueInputVoucherCode(value){
            this.assetIncrement.voucher_code = value;
        },

        /**
         * Hàm xử lý sự kiện lấy giá trị của ngày ghi tăng trong input
         * @param {*} value giá trị trong input
         * @author LTVIET (19/04/2023)
         */
        getValueIncrementDate(value){
            this.assetIncrement.increment_date = value;
        },

        /**
         * Hàm xử lý sự kiện lấy giá trị của ngày ghi tăng trong input
         * @param {*} value giá trị trong input
         * @author LTVIET (19/04/2023)
         */
         getValueVoucherDate(value){
            this.assetIncrement.voucher_date = value;
        },

        /**
         * Hàm xử lý sự kiện lấy giá trị của input ghi chú
         * @param {*} value giá trị của input search
         * @author LTVIET (19/04/2023)
         */
         getValueInputDescription(value){
            this.assetIncrement.description = value;
        },

        /**
         * Hàm xử lý sự kiện click btn đóng dialog thông báo
         * @author LTVIET (19/04/2023)
         */
        handleEventCloseDialogNotify(){
            this.isShowDialogNotify = false;
            if(!this.itemError){
                this.setFocus();
            }else{
                this.itemError.setFocus();
            }
        }
        
    },
}
</script>

<style scoped>
@import url(./asset-increment-detail.css);
.btn__icon{
    background-color: #ffffff;
}
</style>