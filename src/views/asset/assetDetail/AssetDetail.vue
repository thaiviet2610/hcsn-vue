<template>
    <div id="idAssetDetail">
        <div  class="form editForm" :key="keyAssetDetail"
        >
            <div class="form-data" >
                <!-- phần header của form  -->
                <div class="form-header">
                    <!-- title của form  -->
                    <div class="form-header__text">{{ label }}</div>
                    <!-- button đóng form  -->
                    <MButtonIcon
                        class="btn-header__icon"
                        classIcon="form-header__icon"
                        :data_tooltip_bottom="tooltipBtnCloseForm"
                        @addOnClickBtnIcon="handleEventBtnClickCancel">
                    </MButtonIcon>
                </div>
                <!-- phần body của form  -->
                <div id="formBody" class="form-body">
                    <div class="form-body__up">
                        <div class="m-row">
                            <div class="input up-left">
                                <!-- input nhập mã tài sản  -->
                                <MInput 
                                    :ref="assetDetailInfo.assetCode.ref"
                                    :required="assetDetailInfo.assetCode.required"
                                    :disable="assetDetailInfo.assetCode.disable"
                                    @getValueEventInput="GetValueAssetCode"
                                    :valueInput="asset.fixed_asset_code"
                                    :placeholder="assetDetailInfo.assetCode.placeholder"
                                    :label="assetDetailInfo.assetCode.label"
                                    :key="keyAssetCode">
                                </MInput>
                            </div>
                            
                            <div class="input up-right">
                                <!-- input nhập tên tài sản  -->
                                <MInput 
                                    :ref="assetDetailInfo.assetName.ref"
                                    :required="assetDetailInfo.assetName.required"
                                    :disable="assetDetailInfo.assetName.disable"
                                    :placeholder="assetDetailInfo.assetName.placeholder"
                                    @getValueEventInput="GetValueAssetName"
                                    :valueInput="asset.fixed_asset_name"
                                    :label="assetDetailInfo.assetName.label">
                                </MInput>
                                <!-- <input type="number" class="classInput"> -->
                            </div>
                        </div>
                        <div class="m-row">
                            <div class="input up-left">
                                <div class="input__container">
                                    <!-- combobox nhập giá trị mã bộ phận sử dụng  -->
                                    <MCombobox  
                                        :is-icon="false" 
                                        :ref="assetDetailInfo.departmentCode.ref"
                                        :required="assetDetailInfo.departmentCode.required"
                                        :disable="assetDetailInfo.departmentCode.disable"
                                        propName="department_code" 
                                        :placeholder="assetDetailInfo.departmentCode.placeholder" 
                                        :label="assetDetailInfo.departmentCode.label"
                                        propValue="department_id" 
                                        :itemHeight = 36
                                        :quantityItemDisplay = 4
                                        :valueInput="asset.department_id"
                                        :dataCombobox="dataComboboxDepartment"
                                        @getInputCombobox="getValueDepartmentId"
                                        :key="keyComboboxDepartment">
                                    </MCombobox>
                                </div>
                            </div>
                            
                            <div class="input up-right">
                                <!-- input nhập tên bộ phận sử dụng  -->
                                <MInput 
                                    :required="assetDetailInfo.departmentName.required"
                                    :disable="assetDetailInfo.departmentName.disable"
                                    :valueInput="asset.department_name"
                                    :label="assetDetailInfo.departmentName.label"
                                    :key="keyDepartmentName">
                                </MInput>
                            </div>
                        </div>
                        <div class="m-row">
                            <div class="input input__container up-left">
                                <!-- combobox nhập mã loại tài sản  -->
                                <MCombobox  
                                    :is-icon="false"
                                    :ref="assetDetailInfo.assetCategoryCode.ref"
                                    :required="assetDetailInfo.assetCategoryCode.required"
                                    :disable="assetDetailInfo.assetCategoryCode.disable"
                                    propName="fixed_asset_category_code" 
                                    :placeholder="assetDetailInfo.assetCategoryCode.placeholder" 
                                    :label="assetDetailInfo.assetCategoryCode.label"
                                    :itemHeight = "36"
                                    :quantityItemDisplay = "4"
                                    propValue="fixed_asset_category_id"
                                    :dataCombobox="dataComboboxAssetCategory"
                                    :key="keyComboboxAssetCategory"
                                    :valueInput="asset.fixed_asset_category_id"
                                    @getInputCombobox="getValueAssetCategoryId">
                                </MCombobox>
                            </div>
                            
                            <div class="input up-right">
                                <!-- input nhập tên loại tài sản  -->
                                <MInput 
                                    :required="assetDetailInfo.assetCategoryName.required"
                                    :disable="assetDetailInfo.assetCategoryName.disable"
                                    :valueInput="asset.fixed_asset_category_name"
                                    :label="assetDetailInfo.assetCategoryName.label"
                                    :key="keyAssetCategoryName">
                                </MInput>
                            </div>
                        </div>
                    </div>
                    <div class="form-body__down">
                        <div class="m-row">
                            <div class="input down-left">
                                <!-- input nhập số lượng  -->
                                <MInputNumber
                                    :ref="assetDetailInfo.quantity.ref"
                                    :required="assetDetailInfo.quantity.required"
                                    :disable="assetDetailInfo.quantity.disable"
                                    :placeholder="assetDetailInfo.quantity.placeholder"
                                    :valueInput="asset.quantity"
                                    @getValueInput="getValueQuantity"
                                    @getValueEventInput="getValueQuantity"
                                    :buttonInput="true"
                                    :stepValueInput= 1
                                    :label="assetDetailInfo.quantity.label"
                                    >
                                </MInputNumber>
                            </div>
                            
                            <div class="input down-center" style="position: relative;">
                                <!-- input nhập nguyên giá  -->
                                <MInputNumber
                                    :ref="assetDetailInfo.cost.ref"
                                    :required="assetDetailInfo.cost.required"
                                    :disable="assetDetailInfo.cost.disable"
                                    :stepValueInput= 1
                                    :placeholder="assetDetailInfo.cost.placeholder"
                                    @getValueInput="getValueCostInput"
                                    @getValueEventInput="getValueCostInput"
                                    :valueInput="asset.cost"
                                    classInput="class-input__cost"
                                    :label="assetDetailInfo.cost.label"
                                    :key="keyCost"
                                    >
                                </MInputNumber>
                                <MButton 
                                    class="btn-edit-budget"
                                    @btnAddOnClickBtn="handleEventEditBudget">
                                </MButton>
                                <MTooltip
                                    :text="btnEditBudgetTooltip"
                                    class="btn-edit-budget--tooltip"
                                ></MTooltip>
                                <!-- <MButtonIcon 
                                    class="budget__icon--add-asset"
                                    classIcon="budget__icon--add"
                                    @addOnClickBtnIcon="handleEventAddBudgetAsset">
                                </MButtonIcon> -->
                            </div>
                           
                            <div class="input down-right">
                                <!-- input nhập số năm sử dụng  -->
                                <MInputNumber
                                    :ref="assetDetailInfo.lifeTime.ref"
                                    :required="assetDetailInfo.lifeTime.required"
                                    :disable="assetDetailInfo.lifeTime.disable"
                                    :stepValueInput= 1
                                    :placeholder="assetDetailInfo.lifeTime.placeholder"
                                    :label="assetDetailInfo.lifeTime.label"
                                    @getValueInput="getValueLifeTime"
                                    @getValueEventInput="getValueLifeTime"
                                    :key="keyLifeTime"
                                    :valueInput="this.asset.life_time"
                                    >
                                </MInputNumber>
                            </div>
                        </div>
                        <div class="m-row">
                            <div class="input down-left">
                                <!-- input nhập tỷ lệ hao mòn  -->
                                <MInputNumber
                                    :required="assetDetailInfo.depreciationRate.required"
                                    :label="assetDetailInfo.depreciationRate.label"
                                    :valueInput="depreciationRateInput"
                                    :key="keyDepreciationRate"
                                    :disable="assetDetailInfo.depreciationRate.disable"
                                    >
                                </MInputNumber>
                            </div>
                            <div class="down-center">
                                <!-- input nhập giá trị hao mòn  -->
                                <MInputNumber
                                    :required="assetDetailInfo.depreciationValueYear.required"
                                    :placeholder="assetDetailInfo.depreciationValueYear.placeholder"
                                    :label="assetDetailInfo.depreciationValueYear.label"
                                    :key="keyDepreciationValueYear"
                                    :valueInput="depreciationValueYear"
                                    :disable="assetDetailInfo.depreciationValueYear.disable"
                                    >
                                </MInputNumber>
                            </div>
                            <div class="input down-right">
                                <!-- inptu nhập năm theo dõi  -->
                                <MInput
                                    :required="assetDetailInfo.trackedYear.required"
                                    :placeholder="assetDetailInfo.trackedYear.placeholder"
                                    :label="assetDetailInfo.trackedYear.label"
                                    :valueInput="asset.tracked_year"
                                    classInput="class-input__tracked-year"
                                    :disable="assetDetailInfo.trackedYear.disable"
                                    >
                                </MInput>
                            </div>
                        </div>
                        <div class="m-row ">
                            <div class="input down-left">
                                <!-- input nhập ngày mua  -->
                                
                                <MInputDate
                                    :ref="assetDetailInfo.purchaseDate.ref"
                                    :required="assetDetailInfo.purchaseDate.required"
                                    :disable="assetDetailInfo.purchaseDate.disable"
                                    :label="assetDetailInfo.purchaseDate.label"
                                    :format="formatDate"
                                    :valueInputDate="asset.purchase_date"
                                    @getValueInputDate="getValuePurchaseDate"
                                    >
                                </MInputDate>
                            </div>
                            
                            <div class="input down-center">
                                <!-- input nhập ngày bắt đầu sử dụng  -->
                                <MInputDate
                                    :ref="assetDetailInfo.productionYear.ref"
                                    :required="assetDetailInfo.productionYear.required"
                                    :disable="assetDetailInfo.productionYear.disable"
                                    :label="assetDetailInfo.productionYear.label"
                                    :format="formatDate"
                                    :valueInputDate="asset.production_year"
                                    @getValueInputDate="getValueProductionYear"
                                    >
                                </MInputDate>
                            </div>

                            <div class="input__container down-center"></div>
                        </div> 
                    </div>
                </div>
                <!-- phần footer của form  -->
                <div class="form-footer">
                    <!-- button lưu form  -->
                    <MButton
                        class="btn--main"
                        :label="assetDetailInfo.buttonSave.label"
                        :data_tooltip_bottom="tooltipSaveForm"
                        @btnAddOnClickBtn="handleEventBtnClickSave">
                    </MButton>
                    <!-- button hủy form  -->
                    <MButton
                        :label="assetDetailInfo.buttonCancel.label"
                        :data_tooltip_bottom="tooltipCancelForm"
                        style="border: 0;"
                        @btnAddOnClickBtn="handleEventBtnClickCancel"  >
                    </MButton>
                </div>
            </div>
        </div>
        <!-- form nguồn chi phí  -->
        <BudgetAsset 
            v-if="isShowBudget"
            :label="labelBudgetForm"
            :propAsset="asset"
            :typeForm="typeForm"
            :autoUpdate="false"
            @getValueCost="handleEventSaveBudget"
            @onClose="handleEventCloseFormBudgetAsset">
        </BudgetAsset>
        <!-- dialog thông báo  -->
        <MDialog 
            v-if="isShowDialogNotify" 
            :content="contentDialogNotifyErrorValidate"
            :buttonInfo="btnDialogNotify"
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

        <!-- dialog hiển thị đang load dữ liệu  -->
        <MDialogLoadData v-if="isShowLoad"></MDialogLoadData>
    </div>
</template>

<script>
import MCombobox from '@/components/combobox/MCombobox.vue';
import MInput from '@/components/input/MInput.vue';
import resourceJS from '@/js/resourceJS.js'
import axios from 'axios'
import enumJS from '@/js/enum.js';
import commonJS from '@/js/common';
import moment from 'moment';
import configJS from '@/js/config';
import MInputNumber from '@/components/input/MInputNumber.vue';
import BudgetAsset from '@/views/budgetAsset/BudgetAsset.vue';
export default {
    name:"assetDetail",
    props: {
        assetInput: {
            type: Object,
            default: null
        },
        label: {
            type: String,
            default: ""
        },
        typeForm: {
            type: Number,
            default: 0
        },
        propAssetCode: {
            type: String,
            default: ""
        }

    },
    components:{
        MCombobox,
        MInput,
        MInputNumber,
        BudgetAsset
    },
    data() {
        return {
            /**
             * giá trị ban đầu của đối tượng tài sản  
             * @author LTVIET (01/04/2023)
             */
            oldValueAseet: null,
            isShowBudget: false,
            isShowDialogNotify: false,
            isShowDialogAddFormCancel: false,
            isShowDialogEditFormCancel: false,
            contentDialogNotifyErrorValidate: "",
            contentDialogAddFormCancel: resourceJS.confirm.asset.cancelFormAsset,
            contentDialogEditFormCancel: resourceJS.confirm.asset.changeCancelFormAsset,
            departApi: configJS.api.department.departmentApi,
            assetApi: configJS.api.asset.assetApi,
            assetCategoryApi: configJS.api.assetCategory.assetCategoryApi,
            depart: [],
            isShowLoad: false,
            asset: [],
            departmentId: null,
            assetCategoryId: null,
            depreciationValueYear: 0,
            depreciationRate: 0,
            keyDepreciationRate: 0,
            keyDepreciationValueYear: 0,
            keyLifeTime: 0,
            keyAssetCode: "",
            newCode: "",
            cost: 0,
            keyDepartmentName: 0,
            keyAssetCategoryName: 0,
            itemError: null,
            previousKey: "",
            previousKeyCtrl: false,
            assetDetailInfo: resourceJS.assetDetail,
            btnDialogCancelAddForm: resourceJS.buttonDialog.cancelAddForm,
            btnDialogCancelEditForm: resourceJS.buttonDialog.cancelEditForm,
            btnDialogNotify: resourceJS.buttonDialog.notify,
            keyAssetDetail: 0,
            tooltipBtnCloseForm: resourceJS.tooltip.assetDetail.btnCloseForm,
            tooltipSaveForm: resourceJS.tooltip.assetDetail.saveForm,
            tooltipCancelForm: resourceJS.tooltip.assetDetail.cancelForm,
            btnEditBudgetTooltip: resourceJS.tooltip.assetDetail.btnEditBudget,
            formatDate: resourceJS.date.format.ddMMyyyy,
            typeNumber: enumJS.typeValue.number,
            depreciationRateInput: "0",
            dataComboboxAssetCategory: [],
            keyComboboxAssetCategory: 0,
            dataComboboxDepartment: [],
            keyComboboxDepartment: 0,
            assetId: null,
            labelBudgetForm: "",
            keyCost: 0
        }
    },

    computed: {
        /**
         * Hàm tính giá trị hao mòn năm
         * @author LTVIET (06/03/2023)
         */
        getDepreciationValueYear: function(){
            let value = this.asset.cost*this.asset.depreciation_rate;
            return commonJS.formatNumber(Math.round(value));
        }
    },
    
    created() {
        
        if(this.typeForm == enumJS.type.add){
            // Nếu là form thêm tài sản (chưa có dữ liệu)
            this.getDefaultAsset();
            this.asset.fixed_asset_code = this.propAssetCode;
            this.oldValueAseet = JSON.stringify(this.asset);
        }else{
            // Nếu là form sửa hoặc nhân bản (đã có sẵn dư liệu)
            //1. nếu có dữ liệu từ bên ngoài gửi vào
            if(this.assetInput){
                // --> lưu dữ liệu vào 1 biến lưu trữ
                this.oldValueAseet = JSON.stringify(this.assetInput);
                //--> khai báo 1 biến mới và gán giá trị lưu trữ vào biến mới đó
                this.asset = JSON.parse(this.oldValueAseet);
                if(this.typeForm==enumJS.type.clone){
                    this.asset.fixed_asset_code = this.propAssetCode;
                    this.oldValueAseet = JSON.stringify(this.asset);
                    //--> khai báo 1 biến mới và gán giá trị lưu trũ vào biến mới đó
                    this.asset = JSON.parse(this.oldValueAseet);
                }
                
            }else{
                //2. nếu không có dữ liệu truyền vào thì khai báo 1 đối tượng rỗng
                this.getDefaultAsset();
                this.asset.fixed_asset_code = this.propAssetCode;
                this.oldValueAseet = JSON.stringify(this.asset);
            }
            // lấy giá trị của departmentId của asset gán cho departmentId
            this.departmentId = this.asset.department_id;

            // lấy giá trị của assetCategoryId của asset gán cho assetCategoryId
            this.assetCategoryId = this.asset.fixed_asset_category_id;
            this.depreciationValueYear = this.getDepreciationValueYear;
            this.depreciationRate = this.getRoundValue(this.asset.depreciation_rate*100,10);
            this.getDepreciationRateInput();
            
        }
        this.getDepartment();
        this.getAssetCategory();

    },
    mounted() {
        // set focus cho input đầu tiên
        this.$nextTick(function() {
            this.setFocus();
        })
        document.addEventListener('keydown',this.handleEventKeyDown);
        document.addEventListener('keyup',this.handleEventKeyUp);
    },

    unmounted() {
        document.removeEventListener('keydown',this.handleEventKeyDown);
        document.removeEventListener('keyup',this.handleEventKeyUp);
    },
    
    methods: {
        /**
         * Hàm xử lý sự kiện đóng form sửa nguồn chi phí
         * @author LTVIET (19/04/2023)
         */
         handleEventCloseFormBudgetAsset(){
            this.isShowBudget = false;
        },

        /**
         * Hàm nhận giá trị nguồn chi phí từ form
         * @param {*} values mảng chứa các giá trị (cost,cost_source)
         */
        handleEventSaveBudget(values){
            const cost = values[0];
            const cost_source = values[1];
            this.cost = cost;
            this.asset.cost = cost;
            this.asset.cost_source = cost_source;
            this.keyCost = ++this.keyCost;
            this.depreciationValueYear = this.getDepreciationValueYear;
            this.keyDepreciationValueYear = ++this.keyDepreciationValueYear;
            this.isShowBudget = false;
        },

        /**
         * Hàm xử lý sự kiện mở form sửa nguồn chi phí
         * @author LTVIET (02/03/2023)
         */
        handleEventEditBudget(){
            this.isShowBudget = true;
            if(this.typeForm == enumJS.type.add){
                this.labelBudgetForm = resourceJS.titlteForm.budget.addForm.replace("{0}",this.asset.fixed_asset_name);
            }else if(this.typeForm == enumJS.type.edit){
                this.assetId = this.asset.fixed_asset_id;
                this.labelBudgetForm = resourceJS.titlteForm.budget.editForm.replace("{0}",this.asset.fixed_asset_name);
            }
        },
        /**
         * Hàm format lại định dạng giá trị tỷ lệ hao mòn
         * @author LTVIET (02/03/2023)
         */
        getDepreciationRateInput(){
            this.depreciationRateInput = String(this.depreciationRate).replaceAll(".",",");
        },
        /**
         * Hàm thay đổi tăng, giảm giá trị của input số lượng
         * @param {*} check check=true thì tăng, check=false thì giảm
         * @author LTVIET (02/03/2023)
         */
        addOnChangeQuantityAsset(check) {
            if(check){
                this.asset.quantity += 1;
            }else{
                this.asset.quantity -= 1;
                if(this.asset.quantity < 0 ){
                    this.asset.quantity = 0;
                }
            }
        },

        /**
         * Hàm tạo sự kiện click button đóng form
         * @author LTVIET (02/03/2023)
         */
        btnFormCloseOnClick() {
            this.$emit('onClose');
        },

        /**
         * Hàm tạo sự kiện khi click btn hủy thì hiển thị dialog xác nhận
         * @author LTVIET (03/03/2023)
         */
        handleEventBtnClickCancel(){
            let newValueAsset = JSON.stringify(this.asset);
            if(this.typeForm == enumJS.type.add || this.typeForm == enumJS.type.clone){
                this.isShowDialogAddFormCancel = true;
            }
            if(this.typeForm == enumJS.type.edit ){
                if(newValueAsset != this.oldValueAseet){
                    this.isShowDialogEditFormCancel = true;
                }else{
                    this.$emit("onClose");
                }
            }
        },

        /**
         * Hàm tạo sự kiện khi click btn lưu thì hiển thị dialog xác nhận
         * @author LTVIET (04/03/2023)
         */
        handleEventBtnClickSave(){
            this.previousKeyCtrl = false;
            let check = this.validateForm();
            // let check  = true;
            if(check){
                this.asset.quantity = Number(this.asset.quantity);
                let entity = {
                    fixed_asset_id: "00000000-0000-0000-0000-000000000000",
                    fixed_asset_code : this.asset.fixed_asset_code,
                    fixed_asset_name : this.asset.fixed_asset_name,
                    organization_id: null,
                    organization_code: null,
                    organization_name: null,
                    department_id : this.asset.department_id,
                    department_name : this.asset.department_name,
                    department_code : this.asset.department_code,
                    fixed_asset_category_id : this.asset.fixed_asset_category_id,
                    fixed_asset_category_code : this.asset.fixed_asset_category_code,
                    fixed_asset_category_name : this.asset.fixed_asset_category_name,
                    purchase_date : this.asset.purchase_date,
                    cost : Number(this.asset.cost),
                    cost_source: this.asset.cost_source,
                    quantity : Number(this.asset.quantity),
                    depreciation_rate : Number(this.asset.depreciation_rate),
                    tracked_year : Number(this.asset.tracked_year),
                    life_time : Number(this.asset.life_time),
                    production_year : this.asset.production_year,
                    active: false
                }
                this.isShowLoad = true;
                if(this.typeForm==enumJS.type.add || this.typeForm == enumJS.type.clone){
                    this.addAsset(entity);
                }else if(this.typeForm == enumJS.type.edit){
                    entity.fixed_asset_id = this.asset.fixed_asset_id;
                    this.updateAsset(entity);
                }
                
            }  
            
        },

        /**
         * Hàm lấy giá trị của mã tài sản từ input rồi gán vào đối tượng asset
         * @param {*} value giá trị của mã tài sản
         * @author LTVIET (20/03/2023)
         */
        GetValueAssetCode(value){
            this.asset.fixed_asset_code = value;
        },

        /**
         * Hàm lấy giá trị của tên tài sản từ input rồi gán vào đối tượng asset
         * @param {*} value giá trị của tên tài sản
         * @author LTVIET (20/03/2023)
         */
        GetValueAssetName(value){
            this.asset.fixed_asset_name = value;
        },

        /**
         * Hàm thêm mới tài sản
         * @param {*} entity Đối tượng cần thêm mới
         * @author LTVIET(04/03/2023)
         */
        addAsset(entity){
            axios.post(this.assetApi,entity)
            .then(()=>{
                this.isShowLoad = false;
                this.itemError = null;
                this.$emit('addOnClickBtnSave');
                
            }).catch(error=>{
                this.handleEventErrorAPI(error);
            })
        },

        /**
         * Hàm gọi API update thông tin tài sản
         * @param {*} entity Đối tượng cần update
         * @author LTVIET(04/03/2023)
         */
        updateAsset(entity){
            axios.put(`${this.assetApi}/${this.asset.fixed_asset_id}`,entity)
            .then(()=>{
                this.$emit('addOnClickBtnSave');
                this.itemError = null;
                this.isShowLoad = false;
            }).catch(error=>{
                this.handleEventErrorAPI(error);
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
                this.contentDialogNotifyErrorValidate = resourceJS.errorMsg.errorConnection;
            }
            else{
                let errorData = error.response.data;
                let errorCode = errorData.ErrorCode;
                let message = errorData.UserMsg;
                // Nếu là lỗi về dữ liệu
                if(errorCode == enumJS.errorCode.inValid){
                    this.contentDialogNotifyErrorValidate = resourceJS.error.notify;
                    this.handleEventErrorInvalid(errorData.MoreInfo);
                }
                // Các lỗi khác
                else{
                    this.contentDialogNotifyErrorValidate = message;
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
                    let itemAssetCode = this.$refs[this.assetDetailInfo.assetCode.ref];
                    if(!itemAssetCode.inValid){
                        this.handleDisplayInputError(itemAssetCode,error.Message);
                        if(!this.itemError){
                            this.itemError = itemAssetCode;
                        }
                    }
                    
                }
                // validate lỗi để trống
                else if(error.ValidateCode == enumJS.validateCode.empty || error.ValidateCode == enumJS.validateCode.numberLessThanOrEqualZero){
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
         * Hàm validate form chi tiết
         * @author LTVIET (17/03/2023)
         */
        validateForm(){

            if(!this.validateEmptyValue() | !this.validateProfessional()){
                this.isShowDialogNotify = true;
                this.contentDialogNotifyErrorValidate = resourceJS.error.notify;
                return false;
            }
            return true;
        },

        /**
         * Hàm check xem có input nào có giá trị rỗng
         * @author LTVIET (17/03/2023)
         */
        validateEmptyValue(){
            var refs = this.assetDetailInfo.refElements;
            let check = true;
            for (let ref of refs) {
                let item = this.$refs[ref];
                if(ref == this.assetDetailInfo.purchaseDate.ref || ref == this.assetDetailInfo.productionYear.ref){
                    if(!item.value){
                        check = false;
                        item.inValid = true;
                        if(!this.itemError){
                            this.itemError = item;
                        }
                    }
                }else if(ref == this.assetDetailInfo.quantity.ref || ref == this.assetDetailInfo.cost.ref || ref == this.assetDetailInfo.lifeTime.ref){
                    if(!item.value){
                        if(item.value == 0){
                            check = false;
                            if(!this.itemError){
                                this.itemError = item;
                            }
                            item.inValid = true;
                            item.notifyError = item.label + resourceJS.error.emptyInputNumber;
                        }else{
                            check = false;
                            if(!this.itemError){
                                this.itemError = item;
                            }
                            item.inValid = true;
                            item.notifyError = item.label + resourceJS.error.emptyInput;
                        }
                        
                    }
                }
                else{
                    if(!item.value){
                        check = false;
                        if(!this.itemError){
                            this.itemError = item;
                        }
                        item.inValid = true;
                        item.notifyError = item.label + resourceJS.error.emptyInput;
                    }
                }
            }
            
            return check;
        },
        
        /**
         * Hàm validate nghiệp vụ các thông tin trong form chi tiết tài sản
         * @author LTVIET (17/03/2023)
         */
        validateProfessional(){
            // validate độ dài ký tự của dữ liệu
            const checkMaxlength = this.validateMaxLength();
            // validate giá trị hao mòn năm phải nhỏ hơn nguyên giá
            const checkCost = this.validateCostGreaterThanDepreciationValueYear();
            // validate tỷ lệ hao mòn phải bằng 1/số năm sử dụng
            const checkDepreciationRate = this.validateDepreciationEqualPartOfLifeTime();
            // validate ngày mua phải là ngày trước ngày bắt đầu sử dụng
            const checkProductionYear = this.validateProcductionYearGreaterThanPurchaseDate();
            if(!checkMaxlength | !checkCost | !checkDepreciationRate | !checkProductionYear){
                return false;
            }
            return true;
        },

        /**
         * Hàm validate độ dài tối đa của ký tự
         * @author LTVIET (17/03/2023)
         */
         validateMaxLength(){
            let refs = this.assetDetailInfo;
            let check = true;
            const itemCode = this.$refs[refs.assetCode.ref];
            const itemName = this.$refs[refs.assetName.ref];
            // validate độ dài mã tài sản (không được quá 10 ký tự)
            if(this.asset.fixed_asset_code.length > 10){
                if(!itemCode.inValid){
                    itemCode.inValid = true;
                    itemCode.notifyError = resourceJS.validateProfessionalAssetDetail.maxLengthCode;
                    if(!this.itemError){
                        this.itemError = itemCode;
                    }
                   
                }
                check = false;
            }

            // validate độ dài mã tài sản (không được quá 100 ký tự)
            if(this.asset.fixed_asset_name.length > 100){
                if(!itemName.inValid){
                    itemName.inValid = true;
                    itemName.notifyError = resourceJS.validateProfessionalAssetDetail.maxLengthName;
                    if(!this.itemError){
                        this.itemError = itemName;
                    }
                }
                check = false;
            }
            return check;
        },

        /**
         * Hàm validate tỷ lệ hao mòn phải nhỏ hơn nguyên giá
         * @author LTVIET (17/03/2023)
         */
         validateCostGreaterThanDepreciationValueYear(){
            let refs = this.assetDetailInfo;
            let check = true;
            const itemCost = this.$refs[refs.cost.ref];
            let depreciationValueYear;
            if(typeof this.depreciationValueYear == "string"){
                depreciationValueYear = this.getMoney(this.depreciationValueYear);
            }else{
                depreciationValueYear = this.depreciationValueYear;
            }

            if(this.asset.cost < depreciationValueYear){
                if(!itemCost.inValid){
                    itemCost.inValid = true;
                    itemCost.notifyError = resourceJS.validateProfessionalAssetDetail.depreciationYearGreaterCost;
                    if(!this.itemError){
                        this.itemError = itemCost;
                    }
                }
                check = false;
            }
            return check;
        },
        
        /**
         * Validate tỷ lệ hao mòn phải bằng 1/số năm sử dụng
         * @author LTVIET (17/03/2023)
         */
        validateDepreciationEqualPartOfLifeTime(){
            let refs = this.assetDetailInfo;
            let check = true;
            const item = this.$refs[refs.lifeTime.ref];
            if(this.asset.depreciation_rate != Math.round(1/this.asset.life_time*1000)/1000){
                if(!item.inValid){
                    item.inValid = true;
                    item.notifyError = resourceJS.validateProfessionalAssetDetail.depreciationRateDifferentLifeTimeValue;
                    if(!this.itemError){
                        this.itemError = item;
                    }
                }
                check = false;
            }
            return check;
        },

        /**
         * Hàm validate ngày mua phải là ngày trước ngày bắt đầu sử dụng
         * @author LTVIET (17/03/2023)
         */
         validateProcductionYearGreaterThanPurchaseDate(){
            let refs = this.assetDetailInfo;
            let check = true;
            const itemProductionYear = this.$refs[refs.productionYear.ref];
            let valueTime = moment(this.asset.purchase_date).diff(this.asset.production_year, "milliseconds");
            if(valueTime > 0){
                if(!itemProductionYear.inValid){
                    if(!this.itemError){
                        this.itemError = itemProductionYear;
                    }
                    itemProductionYear.inValid = true;
                    itemProductionYear.notifyError = resourceJS.validateProfessionalAssetDetail.purchaseDateGreaterThanProductionYear;
                }
                check = false;
            }
            return check;
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
            // Nếu click button "Không lưu" thì đóng dialog và form sửa lại và không lưu dữ liệu
            if(label == this.btnDialogCancelEditForm[1][2]){
                this.isShowDialogEditFormCancel = false;
                this.$emit('onClose');
                return;
            }

            // Nếu click button "Hủy" thì đóng dialog lại
            if(label == this.btnDialogCancelEditForm[2][2]){
                this.isShowDialogEditFormCancel = false;
                this.setFocus();
                return;
            }

            // Nếu click button "Lưu" thì đóng dialog và form sửa lại và lưu dữ liệu
            this.handleEventBtnClickSave();
        },

        /**
         * Hàm lấy danh sách của department theo departmentId
         * @author LTVIET (05/03/2023)
         */
         getDepartment() {
            this.isShowLoad = true;
            if(this.departApi){
                axios.get(this.departApi)
                .then(res =>{
                    this.dataComboboxDepartment = res.data;
                    this.keyComboboxDepartment = ++this.keyComboboxDepartment;
                    this.isShowLoad = false;
                })
                .catch(error=>{
                    console.log(error);
                })
                
            }
            
        },

        /**
         * Hàm lấy danh sách của loại tài sản 
         * @author LTVIET (05/03/2023)
         */
         getAssetCategory() {
            this.isShowLoad = true;
            if(this.assetCategoryApi){
                axios.get(this.assetCategoryApi)
                .then(res =>{
                    this.dataComboboxAssetCategory = res.data;
                    this.keyComboboxAssetCategory = ++this.keyComboboxAssetCategory;
                    this.isShowLoad = false;
                })
                .catch(error=>{
                    console.log(error);
                    this.isShowLoad = false;
                })
            }
        },
        
        /**
         * Hàm kiểm tra xem input có rỗng hay không
         * @param {*} refsInput giá trị ref của input cần sử lý
         * @author LTVIET (05/03/2023)
         */
        checkEmptyInput(refsInput){
            let value = this.$refs[refsInput].value;
            if(value == "" || value == null || value == undefined){
                return false;
            }
            return true;
        },

        /**
         * Hàm lấy ra số năm hiện tại
         * @author LTVIET (02/03/2023)
         */
        getYear() {
            let dateTime = new Date();
            let year = dateTime.getFullYear();
            return year;
        },

        /**
         * Hàm lấy ra ngày, tháng, năm, thời gian hiện tại
         * @author LTVIET (02/03/2023)
         */
         getCurrentDate(){
            let day = new Date();
            let date = day.getDate();
            date = date < 10 ? `0${date}` : date;
            let month = day.getMonth()+1;
            month =  month < 10 ? `0${month}` : month;
            let year = day.getFullYear();
            year = year < 10 ? `0${year}` : year;
            return `${year}-${month}-${date}`;
        },

        /**
         * Hàm lấy ra ngày tháng năm của giá trị truyền vào, trả về string có dạng date
         * @param {*} value giá trị truyền vào (kiểu datetime)
         * @author LTVIET (02/03/2023)
         */
        getDate(value){
            return value.substr(0,10);
        },

        /**
         * Hàm chuyển dữ liệu tiền từ string về dạng number trong trường hợp dữ liệu tiền được format thành dạng string
         * @param {*} value giá trị cần chuyển đổi
         * @author LTVIET(14/03/2023)
         */
         getMoney(value){
            return Number(value.replaceAll('.',''));
        },

        /**
         * Hàm làm tròn giá trị đến 1 chữ số sau dấu phảy
         * @param {*} value giá trị cần làm tròn
         * @author LTVIET(06/03/2023)
         */
         getRoundValue(value,step){
            return Math.round(value*step)/step;
        },

        /**
         * Hàm tính giá trị của hao mòn năm theo sự thay đổi giá trị của ngyên giá 
         * @author LTVIET(14/03/2023)
         */
        getValueCostInput(value){
            if((typeof value == "string") && value.indexOf(".") != -1){
                value = this.getMoney(value);
            }
            this.asset.cost = value;
            this.depreciationValueYear = this.getDepreciationValueYear;
            this.keyDepreciationValueYear = ++this.keyDepreciationValueYear;
        },

        /**
         * Hàm set focus vào input đầu tiên của form khi mở form
         * @author LTVIET(02/03/2023)
         */
        setFocus(){
            this.$refs[this.assetDetailInfo.assetCode.ref].setFocus();
        },

        /**
         * Hàm lấy giá trị nhập vào input của số năm sử dụng
         * @param {*} value gí trị của input
         * @author LTVIET(23/03/2023)
         */
        getValueLifeTime(value){
            if(value != null && value != "" && value != undefined && value != 0){
                this.asset.life_time = Number(value);
                this.asset.depreciation_rate = this.getRoundValue(1/value,1000);
                this.depreciationRate = this.getRoundValue(this.asset.depreciation_rate*100,10);
                this.getDepreciationRateInput();
                this.depreciationValueYear = this.getDepreciationValueYear;
                this.keyDepreciationRate = ++this.keyDepreciationRate;
                this.keyDepreciationValueYear = ++this.keyDepreciationValueYear;
            }else{
                this.depreciationRate = 0;
                this.depreciationValueYear = 0;
            }
        },

        /**
         * Hàm trả về một đối tượng asset với các giá trị thuộc tính mặc định
         * @author LTVIET(06/03/2023)
         */
        getDefaultAsset(){
            this.asset = {
                fixed_asset_id: "00000000-0000-0000-0000-000000000000",
                fixed_asset_code: "",
                fixed_asset_name: "",
                organization_id: "00000000-0000-0000-0000-000000000000",
                organization_code: null,
                organization_name: "",
                department_id: "00000000-0000-0000-0000-000000000000",
                department_code: "",
                department_name: "",
                fixed_asset_category_id: "00000000-0000-0000-0000-000000000000",
                fixed_asset_category_code: "",
                fixed_asset_category_name: "",
                quantity: 0,
                cost: 0,
                cost_source: "",
                life_time: 0,
                depreciation_rate: 0,
                tracked_year: this.getYear(),
                purchase_date: this.getCurrentDate(),
                production_year: this.getCurrentDate(),
                active: false
            }

            
        },

        /**
         * Hàm nhận giá trị id phòng ban từ combobox gán vào đối tượng asset
         * @param {*} value giá trị từ combobox
         * @author LTVIET (29/03/2023)
         */
        getValueDepartmentId(value){
            this.asset.department_id = value;
            const department  = this.dataComboboxDepartment.find(function(department){
                return department.department_id == value;
            })
            this.asset.department_code = department.department_code;
            this.asset.department_name = department.department_name;
            this.keyDepartmentName = ++this.keyDepartmentName;
        },

        /**
         * Hàm nhận giá trị id loại tài sản từ combobox gán vào đối tượng asset
         * @param {*} value giá trị từ combobox
         * @author LTVIET (29/03/2023)
         */
        getValueAssetCategoryId(value){
            this.asset.fixed_asset_category_id = value;
            const assetCategory = this.dataComboboxAssetCategory.find(function(assetCategory){
                return assetCategory.fixed_asset_category_id == value;
            })
            // Nếu đối tượng loại tài sản thay đổi thì lấy code, name theo đối tượng mới
            this.asset.fixed_asset_category_code = assetCategory.fixed_asset_category_code;
            this.asset.fixed_asset_category_name = assetCategory.fixed_asset_category_name;
            this.keyAssetCategoryName = ++this.keyAssetCategoryName;
            // Nếu thay đổi loại tài sản thì sẽ lấy:
            // --> số năm sử dụng theo loại tài sản
            this.asset.life_time = assetCategory.life_time;
            // --> tỷ lệ khấu hao theo loại tài sản
            this.asset.depreciation_rate = assetCategory.depreciation_rate;
            this.depreciationRate = this.getRoundValue(this.asset.depreciation_rate*100,10);
            this.getDepreciationRateInput();
            // --> giá trị hao mòn năm theo tỷ lệ hao mòn năm
            this.depreciationValueYear = this.getDepreciationValueYear;
            this.keyDepreciationValueYear = ++this.keyDepreciationValueYear;
            this.keyDepreciationRate = ++this.keyDepreciationRate;
            this.keyLifeTime = ++this.keyLifeTime;
            
        },

        /**
         * Hàm nhận giá trị số lượng từ input gán vào đối tượng asset
         * @param {*} value giá trị từ input
         * @author LTVIET (29/03/2023)
         */
        getValueQuantity(value){
            this.asset.quantity = Number(value);
        },

        /**
         * Hàm xử lý sự kiện click button đóng dialog
         * @author LTVIET (29/03/2023)
         */
        handleEventCloseDialogNotify(){
            this.isShowDialogNotify = false;
            if(this.itemError){
                this.itemError.setFocus();
            }
        },

        /**
         * Hàm xử lý sự kiện bấm các phím tắt ở form detail (lưu,thoát)
         * @param {*} event đối tượng sự kiện cần sử lý
         * @author LTVIET (29/03/2023)
         */
         handleEventKeyDown(event){
            let keyCode = event.keyCode;
            if (keyCode == enumJS.keyCtrl) {
                this.previousKeyCtrl = true;
            }
            if(keyCode == enumJS.keyS && this.previousKeyCtrl){
                event.preventDefault();
                this.handleEventBtnClickSave();
            }
            if(keyCode == enumJS.keyEsc){
                event.preventDefault();
                this.handleEventBtnClickCancel();
            }
        },


        /**
         * Hàm xử lý sự kiện keyup
         * @param {*} event sự kiện cần sử lý
         * @author LTVIET (26/03/2023)
         */
         handleEventKeyUp(event){
            let keyCode = event.keyCode;
            if(keyCode == enumJS.keyCtrl){
                this.previousKeyCtrl = false;
            }
        },

        /**
         * Hàm nhận giá trị ngày mua từ input gán vào đối tượng asset
         * @param {*} value giá trị từ input
         * @author LTVIET (29/03/2023)
         */
        getValuePurchaseDate(value){
            this.asset.purchase_date = value;
        },

        /**
         * Hàm nhận giá trị ngày bắt đầu sử dụng từ input gán vào đối tượng asset
         * @param {*} value giá trị từ input
         * @author LTVIET (29/03/2023)
         */
        getValueProductionYear(value){
            this.asset.production_year = value;
        }
        
    },
}
</script>

<style scoped>
@import url(./asset-detail.css);
</style>