<template>
    <div @keydown.ctrl.1.prevent="btnClickOpenFormSelectedAsset" 
        @keydown.ctrl.e.prevent="handleEventShortcutFunctionTable(type.edit)"
        @keydown.ctrl.d.prevent="handleEventShortcutFunctionTable(type.delete)"
        @keyup="handleEventKeyUp">
        <MForm :label="labelForm"
            :idItemFirst="assetIncrementDetailInfo.voucherCode.id"
            idItemLast="idBtnCancelAssetIncrementDetail"
            @handleEventCloseForm="handleEventBtnClickCancel"
            @handleEventSaveForm="handleEventBtnClickSave">
            <div id="formBody" class="asset_increment__form_body">
                <div class="asset_increment__form-body--tex1">{{ assetIncrementDetailInfo.bodyUp.title }}</div>
                <div class="asset_increment__form-body__up">
                    <div class="m-row">
                        <div class="input down-left">
                            <!-- input nhập số lượng  -->
                            <MInput
                                :idInput="assetIncrementDetailInfo.voucherCode.id"
                                :ref="assetIncrementDetailInfo.voucherCode.ref"
                                :required="assetIncrementDetailInfo.voucherCode.required"
                                :disable="assetIncrementDetailInfo.voucherCode.disable"
                                :placeholder="assetIncrementDetailInfo.voucherCode.placeholder"
                                :label="assetIncrementDetailInfo.voucherCode.label"
                                :valueInput="assetIncrement.voucher_code"
                                :maxLength="50"
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
                            :valueInput="assetIncrement.description"
                            @getValueInput="getValueInputDescription"
                            @getValueEventInput="getValueInputDescription"
                            :label="assetIncrementDetailInfo.description.label"
                            :maxLength="255"
                            >
                        </MInput>
                    </div>
                </div>

                <div class="asset_increment__form-body--tex1">{{ assetIncrementDetailInfo.bodyDown.title }}</div>
                <div class="asset_increment__form-body__down">
                    <!-- input tìm kiếm danh sách tài sản chứng từ  -->
                    <div class="header__body--down">
                        <div class="input down-left">
                            <MInput
                                :ref="assetIncrementDetailInfo.bodyDown.inputSearch.ref"
                                :placeholder="assetIncrementDetailInfo.bodyDown.inputSearch.placeholder"
                                :iconInput="true"
                                @keyDownEnter ="handleEventKeyDownEnterInputSearch"
                                @getValueEventInput="handleEventGetValueInputSearch"
                                :key="keyInputSearch"
                                >
                            </MInput>
                        </div>

                        <div class="btn-selected-asset-active">
                            <MButton
                                :label="assetIncrementDetailInfo.button.btnSelectedAsset.label"
                                @btnAddOnClickBtn="btnClickOpenFormSelectedAsset">
                            </MButton>
                            <MTooltip
                                :text="assetIncrementDetailInfo.button.btnSelectedAsset.tooltip"
                                :class="assetIncrementDetailInfo.button.btnSelectedAsset.classTooltip"
                            ></MTooltip>
                        </div>
                    </div>
                    <div class="table_container">
                        <MTable 
                        :ref="assetIncrementDetailInfo.table.ref"
                        :tableInfo="tableInfo"
                        :dataHeader="dataHeaderTable"
                        :dataBody="dataBodyTable"
                        :dataFooter="dataFooterTable"
                        :isPaging="tableInfo.isPaging"
                        :isCheckbox="tableInfo.isCheckbox"
                        :isFunction="tableInfo.isFunction"
                        :dataEntities="dataAssets"
                        :isContextMenu="tableInfo.isContextMenu"
                        :key="keyTable"
                        @btnClickFunctionOpenForm="handleEventClickFunctionTable"
                        @addOnClickContextMenu="handleEventClickContextMenu">
                        </MTable>
                    </div> 
                </div>
            </div>
        </MForm>
        <AssetNoActive 
            v-if="isShowSelectAssetNoActive"
            :dataBodyApi="dataBodyApi"
            @onSave="handleEventSelectedAssets"
            @onClose="handleEventCloseFormSelecteAssetNoActive">
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
import resourceJS from '@/js/resource';
import enumJS from '@/js/enum';
import BudgetAsset from '@/views/budgetAsset/BudgetAsset.vue';
import configJS from '@/js/config';
import axios from 'axios';
import commonJS from '@/js/common';
import AssetNoActive from '../../asset/assetNoActive/AssetNoActive.vue';
// import { keyTab } from '@/js/keyTab';
// import TheForm from '@/components/form/MForm.vue';
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
            isShowDialogAddFormCancel: false,
            isShowDialogEditFormCancel: false,
            isShowSelectAssetNoActive: false,
            isShowBudgetAsset: false,
            assets: [],
            asset: null,
            keyTable: 0,
            keyword: "",
            assetsSearch: [],
            dataBodyApi: null,
            assetIncrement: null,
            assetIncrementApi: configJS.api.assetIncrement.assetIncrementApi,
            assetIncrementDetailApi: configJS.api.assetIncrementDetail.assetIncrementDetailApi,
            itemError: null,
            contentDialogNotify: "",
            keyInputSearch: 0,
            btnDialogNotify: resourceJS.buttonDialog.notify,
            isShowDialogNotify: false,
            isShowLoad: false,
            assetIncrementDetailInfo: resourceJS.assetIncrementDetail,
            oldValueAssetIncrement: null,
            contentDialogAddFormCancel: resourceJS.confirm.assetIncrement.cancelFormAssetIncrement,
            contentDialogEditFormCancel: resourceJS.confirm.assetIncrement.changeCancelFormAssetIncrement,
            btnDialogCancelAddForm: resourceJS.buttonDialog.cancelAddForm,
            btnDialogCancelEditForm: resourceJS.buttonDialog.cancelEditForm,
            oldValueIdAssets: "",
            oldValueAssets: "",
            type: enumJS.type,
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
        const oldValueAssetIncrement = JSON.parse(this.oldValueAssetIncrement);
        const idAssets = oldValueAssetIncrement.assets.map(function(asset){
            return asset.fixed_asset_id;
        })
        oldValueAssetIncrement.assets = idAssets;
        oldValueAssetIncrement.price = 0;
        this.oldValueAssetIncrement = JSON.stringify(oldValueAssetIncrement);
        this.dataBodyApi = {
            NotInAssets: [],
            ActiveAssets: []
        }
        let oldValueIdAssets = [];
        if(this.assetIncrement.assets){
            oldValueIdAssets = this.assetIncrement.assets.map(function(asset){
                return asset.fixed_asset_id;
            })
        }
        this.oldValueIdAssets = JSON.stringify(oldValueIdAssets);

        if(this.assetIncrement.assets){
            this.dataBodyApi.NotInAssets = this.assetIncrement.assets.map(function(asset){
                return asset.fixed_asset_id;
            });
            const assetsToString = JSON.stringify(this.assetIncrement.assets);
            this.oldValueAssets = assetsToString;
            this.assetsSearch = JSON.parse(assetsToString);
            
            this.getDataTable();
        }
    },
    mounted() {
        this.setFocusDefault();
    },
    methods: {
        /**
         * Hàm xử lý sự kiện khi click chọn thêm chứng từ trong contextmenu
         * @author LTVIET (15/04/2023)
         */
         handleEventClickContextMenu(){
            this.btnClickOpenFormSelectedAsset();
        },

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
                this.isShowDialogNotify = true;
                this.contentDialogNotify = resourceJS.notify.errorLoadData;
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
                this.setFocusDefault();
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
                this.setFocusDefault();
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
            let newValueAssetIncrement = JSON.stringify(this.assetIncrement);
            const idAssets = this.assetIncrement.assets.map(function(asset){
                return asset.fixed_asset_id;
            })
            newValueAssetIncrement =  JSON.parse(newValueAssetIncrement);
            newValueAssetIncrement.assets = idAssets;
            newValueAssetIncrement.price = 0;
            newValueAssetIncrement = JSON.stringify(newValueAssetIncrement);
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
        setFocus(ref){
            this.$nextTick(function(){
                this.$refs[ref].setFocus();
            });
        },

        /**
         * Hàm xử lý sự kiện focus vào input mã chứng từ khi form được khởi tạo lần đầu tiên
         * @author LTVIET (19/04/2023)
         */
         setFocusDefault(){
            this.setFocus(this.assetIncrementDetailInfo.voucherCode.ref);
        },

        /**
         * Hàm xử lý sự kiện đóng form chọn tài sản
         * @author LTVIET (19/04/2023)
         */
        handleEventCloseFormSelecteAssetNoActive(){
            this.isShowSelectAssetNoActive = false;
            this.setFocus(this.assetIncrementDetailInfo.bodyDown.inputSearch.ref);
        },

        /**
         * Hàm xử lý sự kiện mở form chọn tài sản
         * @author LTVIET (19/04/2023)
         */
         btnClickOpenFormSelectedAsset(){
            this.isShowSelectAssetNoActive = true;
            this.isShowToastSuccess = false;
        },

        handleEventShortcutFunctionTable(type){
            const index = this.$refs[this.assetIncrementDetailInfo.table.ref].indexRowSelected;
            if(index > 0){
                const asset = this.dataAssets[index - 1];
                this.handleEventClickFunctionTable([type,asset]);
            }
        },

        /**
         * Hàm xử lý sự kiện đóng form sửa nguồn chi phí
         * @author LTVIET (19/04/2023)
         */
        handleEventCloseFormBudgetAsset(){
            this.isShowBudgetAsset = false;
            this.getDataTable();
            this.setFocus(this.assetIncrementDetailInfo.bodyDown.inputSearch.ref);
        },

        /**
         * Hàm xử lý sự kiện nhận giá trị nguyên giá mới sửa từ form
         * @param {*} newAsset đối tượng tài snar mới sửa
         * @author LTVIET (19/04/2023)
         */
        handleEventEditBudgetAsset(newAsset){
            this.updateAssetActive(newAsset);
            this.getDataTable();
            if(this.typeForm == enumJS.type.edit){
                this.updateAssetIncrementPrice();
            }
            this.isShowBudgetAsset = false;
            this.isShowToastSuccess = true;
            this.notifyToastSuccess = resourceJS.toastSuccess.budget.success;
            this.contentToastSuccess = resourceJS.toastSuccess.budget.saveSuccess;
            setTimeout(() => {
                this.closeToastSucess();
            }, 3000);
            this.setFocus(this.assetIncrementDetailInfo.bodyDown.inputSearch.ref);
        },

        /**
         * Hàm sửa lại các giá trị của tài sản vừa được sửa nguyên giá
         * @param {*} newAsset giá trị mới của tài sản
         * @author LTVIET (05/05/2023)
         */
        updateAssetActive(newAsset){
            // update lại danh sách tìm kiếm tài sản
            const indexAssetsSearch = this.assetsSearch.findIndex(asset => asset.fixed_asset_code == newAsset.fixed_asset_code);
            let assetSearch = this.assetsSearch[indexAssetsSearch];
            const depreciationValue = (assetSearch.depreciation_value / assetSearch.cost) * newAsset.cost;
            assetSearch.cost = newAsset.cost;
            assetSearch.cost_source = newAsset.cost_source;
            assetSearch.depreciation_value = depreciationValue;
            const residualValue = assetSearch.cost - assetSearch.depreciation_value;
            assetSearch.residual_value = residualValue > 0 ? residualValue : 0;
            // update lại danh sách tài sản
            const index = this.assetIncrement.assets.findIndex(asset => asset.fixed_asset_code == newAsset.fixed_asset_code);
            let asset = this.assetIncrement.assets[index];
            asset.cost = assetSearch.cost;
            asset.cost_source = assetSearch.cost_source;
            asset.depreciation_value = depreciationValue;
            asset.residual_value = asset.cost - asset.depreciation_value;
            this.assetIncrement.price = this.getTotalPrice(this.assetIncrement.assets);
            // update lại danh sách tài sản gốc
            let oldAssets = JSON.parse(this.oldValueAssets);
            const indexOldAsset = oldAssets.findIndex(asset => asset.fixed_asset_code == newAsset.fixed_asset_code);
            if(indexOldAsset != -1){
                oldAssets[indexOldAsset].cost = assetSearch.cost;
                oldAssets[indexOldAsset].cost_source = assetSearch.cost_source;
                this.oldValueAssets = JSON.stringify(oldAssets);
            }
        },

        /**
         * Hàm tính tổng nguyên giá của chứng từ
         * @param {*} assets danh sách tài sản cần tính tổng nguyên giá
         * @author LTVIET (19/04/2023)
         */
        getTotalPrice(assets){
            const price = assets.reduce(function (total,asset) {
                return total + asset.cost;
            },0);
            return Math.round(price);
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
            const assets = JSON.stringify(this.assetIncrement.assets);
            this.assetsSearch = JSON.parse(assets);
            this.keyword = "";
            this.keyInputSearch = ++this.keyInputSearch;
            this.getDataTable();
            this.isShowSelectAssetNoActive = false;
            this.setFocus(this.assetIncrementDetailInfo.bodyDown.inputSearch.ref);
        },

        /**
         * Hàm xử lý sự kiện click btn save của form chọn tài sản
         * @param {*} value danh sách các tài sản được chọn
         * @author LTVIET (19/04/2023)
         */
        handleEventKeyDownEnterInputSearch(value){
            this.keyword = value;
            if(!value){
                const assets = JSON.stringify(this.assetIncrement.assets);
                this.assetsSearch = JSON.parse(assets);
            }else{
                this.assetsSearch = this.assetIncrement.assets.filter(item=>
                        (item.fixed_asset_code.toLowerCase().includes(this.keyword.toLowerCase()) || 
                        item.fixed_asset_name.toLowerCase().includes(this.keyword.toLowerCase())));
            }
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
         * Hàm xử lý sự kiện click vào chức năng trong table 
         * @param {*} values mảng chứa các giá trị (kiểu chức năng(sửa,xóa), đối tượng tài sản)
         * @author LTVIET (16/03/2023)
         */
        handleEventClickFunctionTable(values){
            this.isShowToastSuccess = false;
            let type = values[0];
            let item = values[1];
            if(type == enumJS.type.edit){
                this.labelBudgetForm = this.labelBudgetForm.replace("{0}",item.fixed_asset_name);
                this.getAssetbyId(item.fixed_asset_id);
            }else if(type == enumJS.type.delete){
                
                for(let i = 0;i<this.assetIncrement.assets.length;i++){
                    if(this.assetIncrement.assets[i].fixed_asset_code == item.fixed_asset_code){
                        this.assetIncrement.assets.splice(i,1);
                        break;
                    }
                }
                
                let indexSearch = this.assetsSearch.indexOf(item);
                this.assetsSearch.splice(indexSearch,1);
                this.dataBodyApi.NotInAssets.splice(indexSearch,1);
                if(JSON.parse(this.oldValueIdAssets).indexOf(item.fixed_asset_id) != -1){
                    this.dataBodyApi.ActiveAssets.push(item.fixed_asset_id);
                }
                this.getDataTable();
                this.setFocus(this.assetIncrementDetailInfo.bodyDown.inputSearch.ref);
            }
        },

        /**
         * Hàm lấy data table
         * @author LTVIET (18/04/2023)
         */
        getDataTable(){
            this.dataAssets = this.assetsSearch;
            const assets = this.assetsSearch.map(function(asset){
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
            for(let i =0;i<this.assetsSearch.length;i++){
                costTotal += this.assetsSearch[i].cost;
                deprectionValueTotal += this.assetsSearch[i].depreciation_value;
                if(this.assetsSearch[i].residual_value > 0){
                    residualTotal += this.assetsSearch[i].residual_value;
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
            if(this.validateAssetIncrement() & this.validateAssetNoActives()){
                this.assetIncrement.price = this.getTotalPrice(this.assetIncrement.assets);
                this.isShowLoad  = true;
                if(this.typeForm == enumJS.type.add){
                    this.addAssetIncrement();
                }else{
                    const newValueAsset = this.assetIncrement.assets.map(function(asset){
                        return asset.fixed_asset_id;
                    })
                    if(this.oldValueIdAssets != JSON.stringify(newValueAsset)){
                        const newValueIdAssets = this.assetIncrement.assets.map(function (asset) {
                            return asset.fixed_asset_id;
                        })
                        for (const idAsset of JSON.parse(this.oldValueIdAssets)) {
                            const index = newValueIdAssets.indexOf(idAsset);
                            if(index == -1){
                                this.assetsDelete.push(idAsset);
                            }
                        }
                        for (const idAsset of newValueIdAssets) {
                            const index = JSON.parse(this.oldValueIdAssets).indexOf(idAsset);
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
            this.isShowLoad = true;
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
         * Hàm xử lý sự kiện gọi api để sửa thuộc tính tổng nguyên giá của đối tượng chứng từ
         * @author LTVIET (19/04/2023)
         */
         updateAssetIncrementPrice(){
            const price = this.getTotalPrice(JSON.parse(this.oldValueAssets));
            axios.put(`${this.assetIncrementApi}/Price?voucherId=${this.assetIncrement.voucher_id}&price=${price}`)
            .then(()=>{
                this.$emit('updateAssetIncrementPrice');
            })
            .catch(err=>{
                console.log(err);
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
                    this.handleEventErrorInvalid(errorData.MoreInfo);
                }
                // Các lỗi khác
                else{
                    const errorCode = error.response.data.ErrorCode;
                    this.contentDialogNotify = resourceJS.errorMsg.errorFail.replace("{0}",message).replace("{1}",errorCode);
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
            this.isShowDialogNotify = false;
            
            for (let error of errors) {
                // validate lỗi để trống
                if(error.ValidateCode == enumJS.validateCode.empty){
                    for (let item of error.Data) {
                        let itemEmpty = this.$refs[`ref_${item}`];
                        if(!itemEmpty.inValid){
                            let message = itemEmpty.label + error.Message;
                            this.handleDisplayInputError(itemEmpty,message);
                            if(!this.itemError){
                                this.itemError = itemEmpty;
                                this.itemError.setFocus();
                            }
                        }
                    }
                }
                // validate lỗi code bị trùng
                else if(error.ValidateCode == enumJS.validateCode.duplicate){
                    let itemVoucherCode = this.$refs[this.assetIncrementDetailInfo.voucherCode.ref];
                    if(!itemVoucherCode.inValid){
                        this.handleDisplayInputError(itemVoucherCode,error.Message);
                        if(!this.itemError){
                            this.itemError = itemVoucherCode;
                            this.itemError.setFocus();
                        }
                    }  
                }
                // validate danh sách tài sản chứng từ rỗng
                else if(error.ValidateCode == enumJS.validateCode.noAssetIncrements){
                    this.isShowDialogNotify = true;
                    this.contentDialogNotify = error.Message;
                }
                // validate các lỗi còn lại
                else{
                    let item = this.$refs[`ref_${error.Data}`];
                    if(!item.inValid){
                        this.handleDisplayInputError(item,error.Message);
                        if(!this.itemError){
                            this.itemError = item;
                            this.itemError.setFocus();
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
            if(!item.inValid){
                item.inValid = true;
                item.notifyError = message;
            }
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
                if(ref == this.assetIncrementDetailInfo.voucherCode.ref){
                    check = this.validateMaxLength(item,this.assetIncrementDetailInfo.voucherCode.maxLength);
                }
                if(ref == this.assetIncrementDetailInfo.description.ref){
                    check = this.validateMaxLength(item,this.assetIncrementDetailInfo.description.maxLength);
                }
                if(item.inValid) check = false;
            }
            return check;
        },

        /**
         * Hàm validate các trường không được vượt quá giá trị max length cho trước
         * @param {*} item đối tượng cần validate
         * @param {*} maxLength giá trị max length
         * @author LTVIET (19/04/2023)
         */
        validateMaxLength(item,maxLength){
            let check = true;
            if(item.value.length > maxLength){
                check = false;
                const message = item.label + resourceJS.error.maxLength.replace("{0}",maxLength);
                this.handleDisplayInputError(item,message);
                if(!this.itemError){
                    this.itemError = item;
                    this.itemError.setFocus();
                }
            }   
            return check;    
        },

        /**
         * Hàm validate các trường giá trị của danh sách tài sản ghi tăng
         * @author LTVIET (19/04/2023)
         */
         validateAssetNoActives(){
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
                this.setFocusDefault();
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