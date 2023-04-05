<template>
    <div>
        <div class="form editForm" 
            @keydown="handleEventKeydown"
            @keyup="handleEventKeyup"
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
                        data_tooltip_bottom="Đóng (Esc)"
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
                                    :idInput="idElemnts[0][0]"
                                    :ref="refElemnts[0][0]"
                                    :required="true"
                                    @getValueEventInput="GetValueAssetCode"
                                    @handleEventFocus="handleEventFocusInput"
                                    :valueInput="asset.fixed_asset_code"
                                    placeholder="Nhập mã tài sản"
                                    typeValue="text"
                                    label="Mã tài sản"
                                    :key="keyAssetCode">
                                </MInput>
                            </div>
                            
                            <div class="up-right">
                                <!-- input nhập tên tài sản  -->
                                <MInput 
                                    :ref="refElemnts[0][1]"
                                    :idInput="idElemnts[0][1]"
                                    :required="true"
                                    placeholder="Nhập tên tài sản"
                                    @handleEventFocus="handleEventFocusInput"
                                    @getValueEventInput="GetValueAssetName"
                                    :valueInput="asset.fixed_asset_name"
                                    typeValue="text"
                                    label="Tên tài sản">
                                </MInput>
                                <!-- <input type="number" class="classInput"> -->
                            </div>
                        </div>
                        <div class="m-row">
                            <div class="up-left">
                                <div class="input-wrapper">
                                    <!-- combobox nhập giá trị mã bộ phận sử dụng  -->
                                    <MCombobox  
                                        :is-icon="false" 
                                        :idCombobox="idElemnts[1][0]"
                                        :ref="refElemnts[1][0]"
                                        :required="true"
                                        :api="this.departApi"
                                        propName="department_code" 
                                        placeholder="Nhập mã bộ phận sử dụng" 
                                        label="Mã bộ phận sử dụng"
                                        propValue="department_id" 
                                        :itemHeight = 36
                                        :quantityItem = 4
                                        :valueInput="asset.department_id"
                                        @handleEventFocus="handleEventFocusInput"
                                        @getInputCombobox="getValueDepartmentId"
                                        :key="keyDepartment">
                                    </MCombobox>
                                </div>
                            </div>
                            
                            <div class="up-right">
                                <!-- input nhập tên bộ phận sử dụng  -->
                                <MInputDisable
                                    ref="txtDepartmentName"
                                    placeholder="Nhập tên bộ phận sử dụng"
                                    :value="this.asset.department_name"
                                    label="Tên bộ phận sử dụng"
                                    >
                                </MInputDisable>
                            </div>
                        </div>
                        <div class="m-row">
                            <div class="input-wrapper up-left">
                                <!-- combobox nhập mã loại tài sản  -->
                                <MCombobox  
                                    :is-icon="false"
                                    :idCombobox="idElemnts[2][0]"
                                    :ref="refElemnts[2][0]"
                                    :required="true" 
                                    :api="this.assetCategoryApi"
                                    propName="fixed_asset_category_code" 
                                    placeholder="Nhập mã loại tài sản" 
                                    label="Mã loại tài sản"
                                    :itemHeight = 36
                                    :quantityItem = 4
                                    propValue="fixed_asset_category_id" 
                                    :valueInput="asset.fixed_asset_category_id"
                                    @handleEventFocus="handleEventFocusInput"
                                    @getInputCombobox="getValueAssetCategoryId">
                                </MCombobox>
                                
                            </div>
                            
                            <div class="up-right">
                                <!-- input nhập tên loại tài sản  -->
                                <MInputDisable 
                                    ref="txtAssetCategoryName"
                                    placeholder="Nhập tên loại tài sản"
                                    label="Tên loại tài sản"
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
                                    :ref="refElemnts[3][0]"
                                    :idInput="idElemnts[3][0]"
                                    :required="true"
                                    placeholder="Nhập số lượng"
                                    :valueInput="asset.quantity"
                                    @getValueInput="getValueQuantity"
                                    @getValueEventInput="getValueQuantity"
                                    @handleEventFocus="handleEventFocusInput"
                                    :buttonInput="true"
                                    :stepValue= 1
                                    label="Số lượng"
                                    >
                                </MInputNumber>
                            </div>
                            
                            <div class="down-center">
                                <!-- input nhập nguyên giá  -->
                                <MInputNumber
                                    :ref="refElemnts[3][1]"
                                    :idInput="idElemnts[3][1]"
                                    :required="true"
                                    :stepValue="1"
                                    placeholder="Nhập nguyên giá"
                                    isFormat="money"
                                    typeValue="number"
                                    @getValueInput="getValueCostInput"
                                    @handleEventFocus="handleEventFocusInput"
                                    @getValueEventInput="getValueCostInput"
                                    :valueInput="asset.cost"
                                    label="Nguyên giá"
                                    >
                                </MInputNumber>
                            </div>
                           
                            <div class="down-right">
                                <!-- input nhập số năm sử dụng  -->
                                <MInputNumber
                                    :ref="refElemnts[3][2]"
                                    :idInput="idElemnts[3][2]"
                                    :required="true"
                                    :stepValue="1"
                                    placeholder="Nhập số năm sử dụng"
                                    label="Số năm sử dụng"
                                    typeValue="number"
                                    @getValueInput="getValueLifeTime"
                                    @handleEventFocus="handleEventFocusInput"
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
                                    ref="txtDepreciationRate"
                                    :required="true"
                                    placeholder="Nhập tỷ lệ hao mòn (%)"
                                    label="Tỷ lệ hao mòn (%)"
                                    :value="depreciationRate"
                                    :key="keyDepreciationRate"
                                    typeValue="number"
                                    >
                                </MInputDisable>
                            </div>
                            <div class="down-center">
                                <!-- input nhập giá trị hao mòn  -->
                                <MInputDisable
                                    ref="txtDepreciationValueYear"
                                    :required="true"
                                    placeholder="Nhập giá trị hao mòn năm"
                                    label="Giá trị hao mòn năm"
                                    :value="depreciationValueYear"
                                    :key="keyDepreciationValueYear"
                                    typeValue="number"
                                    >
                                </MInputDisable>
                            </div>
                            <div class="down-right">
                                <!-- inptu nhập năm theo dõi  -->
                                <MInputDisable
                                    ref="txtTrackedYear"
                                    :required="true"
                                    placeholder="Nhập năm theo dõi"
                                    label="Năm theo dõi"
                                    :value="asset.tracked_year"
                                    typeValue="number"
                                    >
                                </MInputDisable>
                            </div>
                        </div>
                        <div class="m-row ">
                            <div class="down-left">
                                <!-- input nhập ngày mua  -->
                                
                                <MInputDate
                                    :ref="refElemnts[4][0]"
                                    :idInput="idElemnts[4][0]"
                                    label="Ngày mua"
                                    format="dd/mm/yyyy"
                                    :valueInputDate="asset.purchase_date"
                                    @getValueInputDate="getValuePurchaseDate"
                                    @handleEventFocus="handleEventFocusInput"
                                    :required="true"
                                    >
                                </MInputDate>
                            </div>
                            
                            <div class="down-center">
                                <!-- input nhập ngày bắt đầu sử dụng  -->
                                <MInputDate
                                    :ref="refElemnts[4][1]"
                                    :idInput="idElemnts[4][1]"
                                    label="Ngày bắt đầu sử dụng"
                                    format="dd/mm/yyyy"
                                    :valueInputDate="asset.production_year"
                                    @getValueInputDate="getValueProductionYear"
                                    @handleEventFocus="handleEventFocusInput"
                                    :required="true"
                                    >
                                </MInputDate>
                            </div>

                            <div class="input-wrapper down-center"></div>
                        </div> 
                    </div>
                </div>
                <!-- phần footer của form  -->
                <div class="form-footer">
                    <!-- button lưu form  -->
                    <MButton
                        ref="btnSave"
                        class="btn--main"
                        :idButton="idElemnts[5][0]"
                        label="Lưu"
                        @btnAddOnClickBtn="handleEventBtnClickSave">
                    </MButton>
                    <!-- button hủy form  -->
                    <MButton
                        ref="btnCancel"
                        label="Hủy"
                        :idButton="idElemnts[5][1]"
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
import enumJS from '@/js/enumJS';
import commonJS from '@/js/common';
import moment from 'moment';
import MInputDisable from '@/components/input/MInputDisable.vue';
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
            type: String,
            default: null
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
            departApi: resourceJS.api.departmentApi,
            assetApi: resourceJS.api.assetApi,
            assetCategoryApi: resourceJS.api.assetCategoryApi,
            generateNewCodeApi: resourceJS.api.assetGenerateNewCodeApi,
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
            idInputFocus: "",
            idElemnts: resourceJS.assetDetail.idElementAssetDetail,
            refElemnts: resourceJS.assetDetail.refElementAssetDetail,
            btnDialogCancelAddForm: resourceJS.buttonDialog.cancelAddForm,
            btnDialogCancelEditForm: resourceJS.buttonDialog.cancelEditForm,
            btnDialogNotify: resourceJS.buttonDialog.notify
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
        if(this.typeForm == "add"){
            // Nếu là form thêm tài sản (chưa có dữ liệu)
            this.getDefaultAsset();
            this.asset.fixed_asset_code = this.propAssetCode;
            this.oldValueAseet = JSON.stringify(this.asset);
        }else{
            // Nếu là form sửa haocjw nhân bản (đã có sẵn dư liệu)
            //1. nếu có dữ liệu từ bên ngoài gửi vào
            if(this.assetInput){
                //--> lưu dữ liệu vào 1 biến lưu trữ
                this.oldValueAseet = JSON.stringify(this.assetInput);
                //--> khai báo 1 biến mới và gán giá trị lưu trữ vào biến mới đó
                this.asset = JSON.parse(this.oldValueAseet);
                if(this.typeForm=="clone"){
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
         * Hàm xử lý sự kiện lấy ra id của input đang được focus
         * @param {*} value giá trị id của input đang được focus
         * @author LTVIET (02/04/2023)
         */
        handleEventFocusInput(value){
            this.idInputFocus = value;
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
            if(this.typeForm == resourceJS.typeForm.add || this.typeForm == resourceJS.typeForm.clone){
                this.isShowDialogAddFormCancel = true;
            }
            if(this.typeForm == resourceJS.typeForm.edit ){
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
                if(this.typeForm=="add" || this.typeForm == "clone"){
                    this.addAsset(entity);
                }else if(this.typeForm == "edit"){
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
            if(itemRef!=""){
                this.itemError = this.$refs[itemRef];
                let label = this.itemError.label;
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
            let txt = "";
            for(let i = 0 ;i<refs.length;i++){
                let item = this.$refs[refs[i]];
                if(i == 9 || i == 10){
                    if(!item.txtInputDate){
                        txt = refs[i];
                        item.inValid = true;
                        break;
                    }
                }
                if(i>=0 && i < 4){
                    if(!item.value){
                        txt = refs[i];
                        item.inValid = true;
                        item.notifyError = item.label + resourceJS.error.emptyInput;
                        break;
                    }
                }
                if(i>=4 && i < 9){
                    if(!item.value && item.value != 0){
                        txt = refs[i];
                        item.inValid = true;
                        item.notifyError = item.label + resourceJS.error.emptyInput;
                        break;
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
            // validate độ dài ký tự của dữ liệu
            this.validateMaxLength();

            // validate giá trị hao mòn năm phải nhỏ hơn nguyên giá
            this.validateCostGreaterThanDepreciationValueYear();

            // validate tỷ lệ hao mòn phải bằng 1/số năm sử dụng
            this.validateDepreciationEqualPartOfLifeTime();

            // validate ngày mua phải là ngày trước ngày bắt đầu sử dụng
            this.validateProcductionYearGreaterThanPurchaseDate();
            
            return true;
        },

        /**
         * Hàm validate ngày mua phải là ngày trước ngày bắt đầu sử dụng
         */
        validateProcductionYearGreaterThanPurchaseDate(){
            let valueTime = moment(this.asset.purchase_date).diff(this.asset.production_year, "milliseconds");
            if(valueTime > 0){
                this.isShowDialogNotify = true;
                this.contentDialogNotifyErrorValidate = resourceJS.validateProfessionalAssetDetail.purchaseDateGreaterThanProductionYear;
                return false;
            }
        },
        
        /**
         * Validate tỷ lệ hao mòn phải bằng 1/số năm sử dụng
         */
        validateDepreciationEqualPartOfLifeTime(){
            if(this.asset.depreciation_rate != Math.round(1/this.asset.life_time*1000)/1000){
                this.isShowDialogNotify = true;
                this.contentDialogNotifyErrorValidate = resourceJS.validateProfessionalAssetDetail.depreciationRateDifferentLifeTimeValue;
                
                return false;
            }
        },

        /**
         * Hàm validate độ dài tối đa của ký tự
         * @author LTVIET (17/03/2023)
         */
        validateMaxLength(){
            // validate độ dài mã tài sản (không được quá 100 ký tự)
            if(this.asset.fixed_asset_code.length > 100){
                this.isShowDialogNotify = true;
                this.contentDialogNotifyErrorValidate = resourceJS.validateProfessionalAssetDetail.maxLengthCode;
                return false;
            }

            // validate độ dài mã tài sản (không được quá 255 ký tự)
            if(this.asset.fixed_asset_code.length > 255){
                this.isShowDialogNotify = true;
                this.contentDialogNotifyErrorValidate = resourceJS.validateProfessionalAssetDetail.maxLengthName;
                return false;
            }

        },

        /**
         * Hàm validate tỷ lệ hao mòn phải nhỏ hơn nguyên giá
         * @author LTVIET (17/03/2023)
         */
        validateCostGreaterThanDepreciationValueYear(){
            let depreciationValueYear;
            if(typeof this.depreciationValueYear == "string"){
                depreciationValueYear = this.getMoney(this.depreciationValueYear);
            }else{
                depreciationValueYear = this.depreciationValueYear;
            }

            if(this.asset.cost < depreciationValueYear){
                this.isShowDialogNotify = true;
                this.contentDialogNotifyErrorValidate = resourceJS.validateProfessionalAssetDetail.depreciationYearGreaterCost;
                return false;
            }
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
        async getAssetCategory() {
            if(this.assetCategoryApi && this.asset.fixed_asset_category_id){
               await axios.get(`${this.assetCategoryApi}/${this.asset.fixed_asset_category_id}`)
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
            this.$refs[this.refElemnts[0][0]].setFocus();
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
            this.handleEventKeyStrokesCtrlFocus(keyCode);
        },

        /**
         * Hàm xử lý sự kiện khi bấm tổ hợp phím Ctrl + key để di chuyển lên xuống giauwx các dòng dữ liệu
         * @param {*} keyCode mã ký tự khi nhấn phím
         * @author LTVIET (02/04/2023)
         */
        handleEventKeyStrokesCtrlFocus(keyCode){
            if(this.previousKeyCtrl){
                let index1 = -1;
                let index2 = -1;
                if(this.idInputFocus){
                    index1 = Number(this.idInputFocus.slice(8,9));
                    index2 = Number(this.idInputFocus.slice(9,10));
                }
                switch (keyCode) {
                    case enumJS.keyS:
                        this.handleEventBtnClickSave();
                        break;
                    case enumJS.arrowDown:
                        this.handleEventKeyStrokesCtrlDown(index1,index2);
                        break;
                    case enumJS.arrowUp:
                        this.handleEventKeyStrokesCtrlUp(index1,index2);
                        break;
                    case enumJS.keyRight:
                        this.handleEventKeyStrokesCtrlRight(index1,index2);
                        break;
                    case enumJS.keyLeft:
                        this.handleEventKeyStrokesCtrlLeft(index1,index2);
                        break;
                    default:
                        break;
                }
            }
        },

        /**
         * Hàm xử lý sự kiện khi bấm tổ hợp phím Ctrl + phím sang phải thì focus vào đối tượng bên phải
         * @param {*} index1 vị trí của id của input trong mảng idElements
         * @param {*} index2 vị trí của id của input trong mảng idElements
         * @author LTVIET (02/04/2023)
         */
         handleEventKeyStrokesCtrlRight(index1, index2){
            if(this.idInputFocus && this.previousKeyCtrl){
                index2 +=1;
                if(index2 >= this.idElemnts[index1].length){
                    index2 = 0;
                    index1 += 1;
                    if(index1 >= this.idElemnts.length){
                        index1 = 0;
                    }
                }
                this.idInputFocus = this.idElemnts[index1][index2];
                this.$refs[this.refElemnts[index1][index2]].setFocus();
            }
        },

        /**
         * Hàm xử lý sự kiện khi bấm tổ hợp phím Ctrl + phím sang trái thì focus vào đối tượng bên trái
         * @param {*} index1 vị trí của id của input trong mảng idElements
         * @param {*} index2 vị trí của id của input trong mảng idElements
         * @author LTVIET (02/04/2023)
         */
        handleEventKeyStrokesCtrlLeft(index1, index2){
            if(this.idInputFocus && this.previousKeyCtrl){
                index2 -=1;
                if(index2 < 0){
                    index1 -= 1;
                    if(index1 < 0){
                        index1 = this.idElemnts.length - 1;
                    }
                    index2 = this.idElemnts[index1].length - 1;
                }
                this.idInputFocus = this.idElemnts[index1][index2];
                this.$refs[this.refElemnts[index1][index2]].setFocus();
            }
        },

        /**
         * Hàm xử lý sự kiện khi bấm tổ hợp phím Ctrl + phím lên thì focus vào đối tượng bên trên
         * @param {*} index1 vị trí của id của input trong mảng idElements
         * @param {*} index2 vị trí của id của input trong mảng idElements
         * @author LTVIET (02/04/2023)
         */
         handleEventKeyStrokesCtrlUp(index1, index2){
            if(this.idInputFocus && this.previousKeyCtrl){
                index1 -= 1;
                if(index1 < 0){
                    index1 = this.idElemnts.length - 1;
                }
                if(index2 >= this.idElemnts[index1].length){
                    index2 = this.idElemnts[index1].length - 1;
                }
                this.idInputFocus = this.idElemnts[index1][index2];
                this.$refs[this.refElemnts[index1][index2]].setFocus();
            }
        },

        /**
         * Hàm xử lý sự kiện khi bấm tổ hợp phím Ctrl + phím xuống thì focus vào đối tượng bên dưới
         * @param {*} index1 vị trí của id của input trong mảng idElements
         * @param {*} index2 vị trí của id của input trong mảng idElements
         * @author LTVIET (02/04/2023)
         */
         handleEventKeyStrokesCtrlDown(index1, index2){
            if(this.idInputFocus && this.previousKeyCtrl){
                index1 += 1;
                if(index1 >= this.idElemnts.lenth){
                    index1 = 0;
                }
                if(index2 >= this.idElemnts[index1].length){
                    index2 = this.idElemnts[index1].length - 1;
                }
                this.idInputFocus = this.idElemnts[index1][index2];
                this.$refs[this.refElemnts[index1][index2]].setFocus();
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