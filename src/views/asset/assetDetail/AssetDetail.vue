<template>
    <div>
        <div class="form editForm" :key="keyAssetDetail" @keydown="handleEventKeydown" @keyup="handleEventKeyup"
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
                        :data_tooltip_bottom="tootltipBtnCloseForm"
                        @addOnClickBtnIcon="handleEventBtnClickCancel">
                    </MButtonIcon>
                </div>
                <!-- phần body của form  -->
                <div id="formBody" class="form-body">
                    <div class="form-body__up">
                        <div class="m-row">
                            <div class="up-left">
                                <!-- input nhập mã tài sản  -->
                                <MInput 
                                    :ref="refElemnts.assetCode"
                                    :required="true"
                                    @getValueEventInput="GetValueAssetCode"
                                    :valueInput="asset.fixed_asset_code"
                                    :placeholder="assetDetailInfo.assetCode.placeholder"
                                    :label="assetDetailInfo.assetCode.label"
                                    :key="keyAssetCode">
                                </MInput>
                            </div>
                            
                            <div class="up-right">
                                <!-- input nhập tên tài sản  -->
                                <MInput 
                                    :ref="refElemnts.assetName"
                                    :required="true"
                                    :placeholder="assetDetailInfo.assetName.placeholder"
                                    @getValueEventInput="GetValueAssetName"
                                    :valueInput="asset.fixed_asset_name"
                                    :label="assetDetailInfo.assetName.label">
                                </MInput>
                                <!-- <input type="number" class="classInput"> -->
                            </div>
                        </div>
                        <div class="m-row">
                            <div class="up-left">
                                <div class="input__container">
                                    <!-- combobox nhập giá trị mã bộ phận sử dụng  -->
                                    <MCombobox  
                                        :is-icon="false" 
                                        :ref="refElemnts.departmentCode"
                                        :required="true"
                                        :api="this.departApi"
                                        propName="department_code" 
                                        :placeholder="assetDetailInfo.departmentCode.placeholder" 
                                        :label="assetDetailInfo.departmentCode.label"
                                        propValue="department_id" 
                                        :itemHeight = 36
                                        :quantityItem = 4
                                        :valueInput="asset.department_id"
                                        @getInputCombobox="getValueDepartmentId"
                                        :key="keyDepartment">
                                    </MCombobox>
                                </div>
                            </div>
                            
                            <div class="up-right">
                                <!-- input nhập tên bộ phận sử dụng  -->
                                <MInputDisable
                                    :placeholder="assetDetailInfo.departmentName.placeholder"
                                    :value="this.asset.department_name"
                                    :label="assetDetailInfo.departmentName.label"
                                    >
                                </MInputDisable>
                            </div>
                        </div>
                        <div class="m-row">
                            <div class="input__container up-left">
                                <!-- combobox nhập mã loại tài sản  -->
                                <MCombobox  
                                    :is-icon="false"
                                    :ref="refElemnts.assetCategoryCode"
                                    :required="true" 
                                    :api="this.assetCategoryApi"
                                    propName="fixed_asset_category_code" 
                                    :placeholder="assetDetailInfo.assetCategoryCode.placeholder" 
                                    :label="assetDetailInfo.assetCategoryCode.label"
                                    :itemHeight = 36
                                    :quantityItem = 4
                                    propValue="fixed_asset_category_id" 
                                    :valueInput="asset.fixed_asset_category_id"
                                    @getInputCombobox="getValueAssetCategoryId">
                                </MCombobox>
                                
                            </div>
                            
                            <div class="up-right">
                                <!-- input nhập tên loại tài sản  -->
                                <MInputDisable 
                                    :placeholder="assetDetailInfo.assetCategoryName.placeholder"
                                    :label="assetDetailInfo.assetCategoryName.label"
                                    :value="this.asset.fixed_asset_category_name"
                                    >
                                </MInputDisable>
                            </div>
                        </div>
                    </div>
                    <div class="form-body__down">
                        <div class="m-row">
                            <div class="down-left">
                                <!-- input nhập số lượng  -->
                                <MInputNumber
                                    :ref="refElemnts.quantity"
                                    :required="true"
                                    :placeholder="assetDetailInfo.quantity.placeholder"
                                    :valueInput="asset.quantity"
                                    @getValueInput="getValueQuantity"
                                    @getValueEventInput="getValueQuantity"
                                    :buttonInput="true"
                                    :stepValue= "1"
                                    :label="assetDetailInfo.quantity.label"
                                    >
                                </MInputNumber>
                            </div>
                            
                            <div class="down-center">
                                <!-- input nhập nguyên giá  -->
                                <MInputNumber
                                    :ref="refElemnts.cost"
                                    :required="true"
                                    :stepValue="1"
                                    :placeholder="assetDetailInfo.cost.placeholder"
                                    @getValueInput="getValueCostInput"
                                    @getValueEventInput="getValueCostInput"
                                    :valueInput="asset.cost"
                                    :label="assetDetailInfo.cost.label"
                                    >
                                </MInputNumber>
                            </div>
                           
                            <div class="down-right">
                                <!-- input nhập số năm sử dụng  -->
                                <MInputNumber
                                    :ref="refElemnts.lifeTime"
                                    :required="true"
                                    :stepValue="1"
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
                            <div class="down-left">
                                <!-- input nhập tỷ lệ hao mòn  -->
                                <MInputDisable
                                    :required="true"
                                    :placeholder="assetDetailInfo.depreciationRate.placeholder"
                                    :label="assetDetailInfo.depreciationRate.label"
                                    :value="depreciationRate"
                                    :key="keyDepreciationRate"
                                    :typeValue="typeNumber"
                                    >
                                </MInputDisable>
                            </div>
                            <div class="down-center">
                                <!-- input nhập giá trị hao mòn  -->
                                <MInputDisable
                                    :required="true"
                                    :placeholder="assetDetailInfo.depreciationValueYear.placeholder"
                                    :label="assetDetailInfo.depreciationValueYear.label"
                                    :value="depreciationValueYear"
                                    :key="keyDepreciationValueYear"
                                    :typeValue="typeNumber"
                                    >
                                </MInputDisable>
                            </div>
                            <div class="down-right">
                                <!-- inptu nhập năm theo dõi  -->
                                <MInputDisable
                                    :required="true"
                                    :placeholder="assetDetailInfo.trackedYear.placeholder"
                                    :label="assetDetailInfo.trackedYear.label"
                                    :value="asset.tracked_year"
                                    :typeValue="typeNumber"
                                    >
                                </MInputDisable>
                            </div>
                        </div>
                        <div class="m-row ">
                            <div class="down-left">
                                <!-- input nhập ngày mua  -->
                                
                                <MInputDate
                                    :ref="refElemnts.purchaseDate"
                                    :label="assetDetailInfo.purchaseDate.label"
                                    :format="formatDate"
                                    :valueInputDate="asset.purchase_date"
                                    @getValueInputDate="getValuePurchaseDate"
                                    :required="true"
                                    >
                                </MInputDate>
                            </div>
                            
                            <div class="down-center">
                                <!-- input nhập ngày bắt đầu sử dụng  -->
                                <MInputDate
                                    :ref="refElemnts.productionYear"
                                    :label="assetDetailInfo.productionYear.label"
                                    :format="formatDate"
                                    :valueInputDate="asset.production_year"
                                    @getValueInputDate="getValueProductionYear"
                                    :required="true"
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
                        :data_tooltip_bottom="tootltipSaveForm"
                        @btnAddOnClickBtn="handleEventBtnClickSave">
                    </MButton>
                    <!-- button hủy form  -->
                    <MButton
                        :label="assetDetailInfo.buttonCancel.label"
                        :data_tooltip_bottom="tootltipCancelForm"
                        style="border: 0;"
                        @btnAddOnClickBtn="handleEventBtnClickCancel"  >
                    </MButton>
                </div>
            </div>
        </div>
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
import MInputDisable from '@/components/input/MInputDisable.vue';
import configJS from '@/js/config';
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
    MInputDisable
},
    data() {
        return {
            oldValueAseet: null,
            isShowDialogNotify: false,
            isShowDialogAddFormCancel: false,
            isShowDialogEditFormCancel: false,
            contentDialogNotifyErrorValidate: "",
            contentDialogAddFormCancel: resourceJS.confirm.cancelFormAsset,
            contentDialogEditFormCancel: resourceJS.confirm.changeCancelFormAsset,
            departApi: configJS.api.departmentApi,
            assetApi: configJS.api.assetApi,
            assetCategoryApi: configJS.api.assetCategoryApi,
            generateNewCodeApi: configJS.api.assetGenerateNewCodeApi,
            depart: [],
            assetCategory: [],
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
            keyDepartment: 0,
            itemError: null,
            previousKey: "",
            previousKeyCtrl: false,
            refElemnts: resourceJS.assetDetail.refAssetDetail,
            btnDialogCancelAddForm: resourceJS.buttonDialog.cancelAddForm,
            btnDialogCancelEditForm: resourceJS.buttonDialog.cancelEditForm,
            btnDialogNotify: resourceJS.buttonDialog.notify,
            keyAssetDetail: 0,
            tootltipBtnCloseForm: resourceJS.tooltip.assetDetail.btnCloseForm,
            tootltipSaveForm: resourceJS.tooltip.assetDetail.saveForm,
            tootltipCancelForm: resourceJS.tooltip.assetDetail.cancelForm,
            assetDetailInfo: resourceJS.assetDetail,
            formatDate: resourceJS.date.format.ddMMyyyy,
            typeNumber: enumJS.typeValue.number
        }
    },

    computed: {
        /**
         * Hàm tính giá trị hao mòn năm
         */
        getDepreciationValueYear: function(){
            let value = this.asset.cost*this.asset.depreciation_rate;
            return commonJS.formatMoney(value);
        }
    },
    
    created() {
        
        if(this.typeForm == enumJS.type.add){
            // Nếu là form thêm tài sản (chưa có dữ liệu)
            this.getDefaultAsset();
            this.asset.fixed_asset_code = this.propAssetCode;
            this.oldValueAseet = JSON.stringify(this.asset);
        }else{
            // Nếu là form sửa haocjw nhân bản (đã có sẵn dư liệu)
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
            
        }
    },
    mounted() {
        // set focus cho input đầu tiên
        this.$nextTick(function() {
            this.setFocus();
        })
    },
    
    methods: {
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
            if(this.validateForm()){
                this.asset.quantity = Number(this.asset.quantity);
                let entity = {
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
            .then(res=>{
                console.log(res);
                this.isShowLoad = false;
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
            .then(res=>{
                console.log(res);
                this.$emit('addOnClickBtnSave');
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
            if(error.code == "ERR_NETWORK"){
                this.isShowDialogNotify = true;
                this.contentDialogNotifyErrorValidate = resourceJS.errorMsg.errorConnection;
            }
            else{
                let errorData = error.response.data;
                let errorCode = errorData.ErrorCode;
                let message = errorData.UserMsg;
                if(errorCode == enumJS.errorCode.inValid){
                    message = errorData.MoreInfo.Message;
                }
                if(errorCode == enumJS.errorCode.duplicate){
                    message = resourceJS.errorMsg.duplicate.replace("{0}",this.asset.fixed_asset_code);
                }
                this.isShowDialogNotify = true;
                this.contentDialogNotifyErrorValidate = message;
            }
        },

        

        /**
         * Hàm validate form chi tiết
         * @author LTVIET (17/03/2023)
         */
        validateForm(){
            let itemRef = this.validateEmptyValue();
            if(itemRef.length != 0){
                this.itemError = this.$refs[itemRef[0]];
                let label = itemRef.map(element => {
                    return this.$refs[element].label;
                });
                label = label.join(", ");
                this.isShowDialogNotify = true;
                this.contentDialogNotifyErrorValidate = resourceJS.error.validateData.replace("{0}",label);
                return false;
            }
            return this.validateProfessional();
        },

        /**
         * Hàm check xem có input nào có giá trị rỗng
         * @author LTVIET (17/03/2023)
         */
        validateEmptyValue(){
            var refs = resourceJS.assetDetail.refAssetDetail;
            let txt = [];
            for (let ref in refs) {
                let item = this.$refs[refs[ref]];
                if(ref == "purchaseDate" || ref == "productionYear"){
                    if(!item.txtInputDate){
                        txt.push(refs[ref]);
                        item.inValid = true;
                    }
                }
                else{
                    if(!item.value){
                        txt.push(refs[ref]);
                        item.inValid = true;
                        item.notifyError = item.label + resourceJS.error.emptyInput;
                    }
                }
            }
            
            return txt;
        },
        
        /**
         * Hàm validate nghiệp vụ các thông tin trong form chi tiết tài sản
         * @author LTVIET (17/03/2023)
         */
        validateProfessional(){
            let message = "";
            var refs = resourceJS.assetDetail.refAssetDetail;
            // validate độ dài ký tự của dữ liệu
            message = this.validateMaxLength(message,refs);
            // validate giá trị hao mòn năm phải nhỏ hơn nguyên giá
            message = this.validateCostGreaterThanDepreciationValueYear(message,refs);
            // validate tỷ lệ hao mòn phải bằng 1/số năm sử dụng
            message = this.validateDepreciationEqualPartOfLifeTime(message,refs);
            // validate ngày mua phải là ngày trước ngày bắt đầu sử dụng
            message = this.validateProcductionYearGreaterThanPurchaseDate(message,refs);
            if(message){
                this.isShowDialogNotify = true;
                this.contentDialogNotifyErrorValidate = message;
                return false;
            }
            return true;
        },

        /**
         * Hàm validate ngày mua phải là ngày trước ngày bắt đầu sử dụng
         * @author LTVIET (17/03/2023)
         */
        validateProcductionYearGreaterThanPurchaseDate(message,refs){
            const itemProductionYear = this.$refs[refs.productionYear];
            const itemPurchaseDate = this.$refs[refs.purchaseDate];
            let valueTime = moment(this.asset.purchase_date).diff(this.asset.production_year, "milliseconds");
            if(valueTime > 0){
                if(message){
                    message += "<br>" + resourceJS.validateProfessionalAssetDetail.purchaseDateGreaterThanProductionYear;
                }else{
                    message = resourceJS.validateProfessionalAssetDetail.purchaseDateGreaterThanProductionYear;
                }
                itemPurchaseDate.inValid = true;
                itemPurchaseDate.notifyError = resourceJS.validateProfessionalAssetDetail.purchaseDateGreaterThanProductionYear;
                itemProductionYear.inValid = true;
                itemProductionYear.notifyError = resourceJS.validateProfessionalAssetDetail.purchaseDateGreaterThanProductionYear;
            }else{
                itemPurchaseDate.inValid = false;
                itemProductionYear.inValid = false;
            }
            return message;
        },
        
        /**
         * Validate tỷ lệ hao mòn phải bằng 1/số năm sử dụng
         * @author LTVIET (17/03/2023)
         */
        validateDepreciationEqualPartOfLifeTime(message,refs){
            const item = this.$refs[refs.lifeTime];
            if(this.asset.depreciation_rate != Math.round(1/this.asset.life_time*1000)/1000){
                if(message){
                    message += "<br>" + resourceJS.validateProfessionalAssetDetail.depreciationRateDifferentLifeTimeValue;
                }else{
                    message = resourceJS.validateProfessionalAssetDetail.depreciationRateDifferentLifeTimeValue;
                }
                item.inValid = true;
                item.notifyError = resourceJS.validateProfessionalAssetDetail.depreciationRateDifferentLifeTimeValue;

            }else{
                item.inValid = false;
            }
            return message;
        },

        /**
         * Hàm validate độ dài tối đa của ký tự
         * @author LTVIET (17/03/2023)
         */
        validateMaxLength(message,refs){
            const itemCode = this.$refs[refs.assetCode];
            const itemName = this.$refs[refs.assetName];
            // validate độ dài mã tài sản (không được quá 10 ký tự)
            if(this.asset.fixed_asset_code.length > 10){
                message = resourceJS.validateProfessionalAssetDetail.maxLengthCode;
                itemCode.inValid = true;
                itemCode.notifyError = resourceJS.validateProfessionalAssetDetail.maxLengthCode;
            }else{
                itemCode.inValid = false;
            }

            // validate độ dài mã tài sản (không được quá 100 ký tự)
            if(this.asset.fixed_asset_name.length > 100){
                if(message){
                    message = message + "<br>" + resourceJS.validateProfessionalAssetDetail.maxLengthName;
                }else{
                    message = resourceJS.validateProfessionalAssetDetail.maxLengthName;
                }
                itemName.inValid = true;
                itemName.notifyError = resourceJS.validateProfessionalAssetDetail.maxLengthName;
                
            }else{
                itemName.inValid = false;
            }
            return message;
        },

        /**
         * Hàm validate tỷ lệ hao mòn phải nhỏ hơn nguyên giá
         * @author LTVIET (17/03/2023)
         */
        validateCostGreaterThanDepreciationValueYear(message,refs){
            const itemCost = this.$refs[refs.cost];
            let depreciationValueYear;
            if(typeof this.depreciationValueYear == "string"){
                depreciationValueYear = this.getMoney(this.depreciationValueYear);
            }else{
                depreciationValueYear = this.depreciationValueYear;
            }

            if(this.asset.cost < depreciationValueYear){
                if(message){
                    message += "<br>" + resourceJS.validateProfessionalAssetDetail.depreciationYearGreaterCost;
                }else{
                    message = resourceJS.validateProfessionalAssetDetail.depreciationYearGreaterCost;
                }
                itemCost.inValid = true;
                itemCost.notifyError = resourceJS.validateProfessionalAssetDetail.depreciationYearGreaterCost;
            }else{
                itemCost.inValid = false;
            }
            return message;
        },
        
        /**
         * Hàm đóng toast thông báo lưu thành công
         * @author LTVIET (06/03/2023)
         */
        closeToastSaveSuccess(){
            this.isShowToastSucess = false;
        },

        /**
         * Hàm xử lý sự kiện khi click các button của dialog xác nhận hủy form thêm mới
         * @param {*} label label của button muốn click
         * @author LTVIET (03/03/2023)
         */
         handleEventCloseDialogCancelAddForm(label) {
            // Nếu click button "không" thì ẩn dialog đi
            if(label == this.btnDialogCancelAddForm[1][0]){
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
            if(label == this.btnDialogCancelEditForm[1][0]){
                this.isShowDialogEditFormCancel = false;
                this.$emit('onClose');
                return;
            }

            // Nếu click button "Hủy" thì đóng dialog lại
            if(label == this.btnDialogCancelEditForm[2][0]){
                this.isShowDialogEditFormCancel = false;
                return;
            }

            // Nếu click button "Lưu" thì đóng dialog và form sửa lại và lưu dữ liệu
            this.handleEventBtnClickSave();
        },

        /**
         * Hàm lấy giá trị của department theo departmentId
         * @author LTVIET (05/03/2023)
         */
        getDepartment() {
            if(this.departApi && this.asset.department_id){
                axios.get(`${this.departApi}/${this.asset.department_id}`)
                .then(res =>{
                    this.depart = res.data;
                    // Nếu đối tượng phòng ban thay đổi thì lấy code, name theo đối tượng mới
                    this.asset.department_code = this.depart.department_code;
                    this.asset.department_name = this.depart.department_name;
                })
                .catch(error=>{
                    console.log(error);
                })
                
            }
            
        },

        /**
         * Hàm lấy giá trị của loại tài sản theo assetCategoryId
         * @author LTVIET (05/03/2023)
         */
        getAssetCategory() {
            if(this.assetCategoryApi && this.asset.fixed_asset_category_id){
                axios.get(`${this.assetCategoryApi}/${this.asset.fixed_asset_category_id}`)
                .then(res =>{
                    this.assetCategory = res.data;
                    // Nếu đối tượng loại tài sản thay đổi thì lấy code, name theo đối tượng mới
                    this.asset.fixed_asset_category_code = this.assetCategory.fixed_asset_category_code;
                    this.asset.fixed_asset_category_name = this.assetCategory.fixed_asset_category_name;
                    // Nếu thay đổi loại tài sản thì sẽ lấy:
                    // --> số năm sử dụng theo loại tài sản
                    this.asset.life_time = this.assetCategory.life_time;
                    // --> tỷ lệ khấu hao theo loại tài sản
                    this.asset.depreciation_rate = this.assetCategory.depreciation_rate;
                    this.depreciationRate = this.getRoundValue(this.asset.depreciation_rate*100,10);
                    // --> giá trị hao mòn năm theo tỷ lệ hao mòn năm
                    this.depreciationValueYear = this.getDepreciationValueYear;
                    this.keyDepreciationValueYear = ++this.keyDepreciationValueYear;
                    this.keyDepreciationRate = ++this.keyDepreciationRate;
                    this.keyLifeTime = ++this.keyLifeTime;
                })
                .catch(error=>{
                    console.log(error);
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
            this.$refs[this.refElemnts.assetCode].setFocus();
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
                fixed_asset_id: "",
                fixed_asset_code: "",
                fixed_asset_name: "",
                organization_id: null,
                organization_code: null,
                organization_name: null,
                department_id: "",
                department_code: "",
                department_name: "",
                fixed_asset_category_id: "",
                fixed_asset_category_code: "",
                fixed_asset_category_name: "",
                quantity: 0,
                cost: 0,
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
            this.getDepartment();
        },

        /**
         * Hàm nhận giá trị id loại tài sản từ combobox gán vào đối tượng asset
         * @param {*} value giá trị từ combobox
         * @author LTVIET (29/03/2023)
         */
        getValueAssetCategoryId(value){
            this.asset.fixed_asset_category_id = value;
            this.getAssetCategory();
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
            if(this.itemError!=null){
                this.itemError.setFocus();
            }
        },

        /**
         * Hàm xử lý sự kiện bấm các phím tắt ở form detail (lưu,thoát)
         * @param {*} event đối tượng sự kiện cần sử lý
         * @author LTVIET (29/03/2023)
         */
        handleEventKeydown(event){
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
                this.$emit('onClose');
            }
        },


        /**
         * Hàm xử lý sự kiện keyup
         * @param {*} event sự kiện cần sử lý
         * @author LTVIET (26/03/2023)
         */
        handleEventKeyup(event){
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