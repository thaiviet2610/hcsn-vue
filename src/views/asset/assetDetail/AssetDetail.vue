<template>
    <div>
        <div class="form editForm" @keydown="handleEventKeyDown"
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
                        @addOnClickBtnIcon="handlerEventBtnClickCancel">
                    </MButtonIcon>
                </div>
                <!-- phần body của form  -->
                <div id="formBody" class="form-body">
                    <div class="form-body__up">
                        <div class="m-row">
                            <div class="up-left">
                                <!-- input nhập mã tài sản  -->
                                <MInput 
                                    ref="txtAssetCode"
                                    :required="true"
                                    @getValueEventInput="GetValueAssetCode"
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
                                    ref="txtAssetName"
                                    :required="true"
                                    placeholder="Nhập tên tài sản"
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
                                        ref="txtDepartmentCode"
                                        :required="true"
                                        :api="this.departApi"
                                        propName="department_code" 
                                        placeholder="Nhập mã bộ phận sử dụng" 
                                        label="Mã bộ phận sử dụng"
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
                                    ref="txtDepartmentName"
                                    placeholder="Nhập tên bộ phận sử dụng"
                                    :value="this.asset.department_name"
                                    label="Tên bộ phận sử dụng"
                                    >
                                </MInputDisable>
                                <!-- <MInput 
                                    ref="txtDepartmentName"
                                    :disableInput="true"
                                    placeholder="Nhập tên bộ phận sử dụng"
                                    typeValue="text"
                                    :valueDisable="this.depart.department_name"
                                    label="Tên bộ phận sử dụng">
                                </MInput> -->
                            </div>
                        </div>
                        <div class="m-row">
                            <div class="input-wrapper up-left">
                                <!-- combobox nhập mã loại tài sản  -->
                                <MCombobox  
                                    :is-icon="false"
                                    ref="txtAssetCategoryCode"
                                    :required="true" 
                                    :api="this.assetCategoryApi"
                                    propName="fixed_asset_category_code" 
                                    placeholder="Nhập mã loại tài sản" 
                                    label="Mã loại tài sản"
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
                                    ref="txtAssetCategoryName"
                                    placeholder="Nhập tên loại tài sản"
                                    label="Tên loại tài sản"
                                    :value="this.asset.fixed_asset_category_name"
                                    >

                                </MInputDisable>
                                <!-- <MInput 
                                    :disableInput="true"
                                    ref="txtAssetCategoryName"
                                    placeholder="Nhập tên loại tài sản"
                                    typeValue="text"
                                    :valueDisable="this.assetCategory.fixed_asset_category_name"
                                    label="Tên loại tài sản">
                                </MInput> -->
                            </div>
                        </div>
                    </div>
                    <div class="form-body__down">
                        <div class="m-row">
                            <div class="down-left">
                                <!-- input nhập số lượng  -->
                                <MInputNumber
                                    ref="txtQuantity"
                                    :required="true"
                                    placeholder="Nhập số lượng"
                                    :valueInput="asset.quantity"
                                    @getValueInput="getValueQuantity"
                                    @getValueEventInput="getValueQuantity"
                                    :buttonInput="true"
                                    :stepValue= 1
                                    label="Số lượng"
                                    >
                                </MInputNumber>
                                <!-- <MInput 
                                    :required="true"
                                    ref="txtQuantity"
                                    placeholder="Nhập số lượng"
                                    typeValue="number"
                                    v-model="asset.quantity"
                                    :buttonInput="true"
                                    label="Số lượng">
                                </MInput> -->
                            </div>
                            
                            <div class="down-center">
                                <!-- input nhập nguyên giá  -->
                                <MInputNumber
                                    ref="txtCost"
                                    :required="true"
                                    placeholder="Nhập nguyên giá"
                                    isFormat="money"
                                    typeValue="number"
                                    @getValueInput="getValueCostInput"
                                    @getValueEventInput="getValueCostInput"
                                    :valueInput="asset.cost"
                                    label="Nguyên giá"
                                    >
                                </MInputNumber>
                                <!-- <MInput 
                                    ref="txtCost"
                                    :required="true"
                                    placeholder="Nhập nguyên giá"
                                    isFormat="money"
                                    typeValue="number"
                                    @getValueEventInput="getValueCostInput"
                                    v-model="cost"
                                    label="Nguyên giá">
                                </MInput> -->
                            </div>
                           
                            <div class="down-right">
                                <!-- input nhập số năm sử dụng  -->
                                <MInputNumber
                                    ref="txtLifeTime"
                                    :required="true"
                                    placeholder="Nhập số năm sử dụng"
                                    label="Số năm sử dụng"
                                    typeValue="number"
                                    @getValueInput="getValueLifeTime"
                                    @getValueEventInput="getValueLifeTime"
                                    :key="keyLifeTime"
                                    :valueInput="this.asset.life_time"
                                    >
                                </MInputNumber>
                                <!-- <MInput 
                                    ref="txtLifeTime"
                                    :required="true"
                                    placeholder="Nhập số năm sử dụng"
                                    typeValue="number"
                                    label="Số năm sử dụng"
                                    @getValueEventInput="getValueLifeTime"
                                    :key="keyLifeTime"
                                    v-model="this.asset.life_time">
                                </MInput> -->
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
                                <!-- <MInput 
                                    ref="txtDepreciationRate"
                                    :required="true"
                                    placeholder="Nhập tỷ lệ hao mòn (%)"
                                    typeValue="rate"
                                    :buttonInput="true"
                                    :disableInput="true"
                                    label="Tỷ lệ hao mòn (%)"
                                    :valueDisable="depreciationRate"
                                    :key="keyDepreciationRate">
                                </MInput> -->
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
                                <!-- <MInput 
                                    ref="txtDepreciationValueYear"
                                    :required="true"
                                    placeholder="Nhập giá trị hao mòn năm"
                                    isFormat="money"
                                    typeValue="number"
                                    label="Giá trị hao mòn năm"
                                    :disableInput="true"
                                    :valueDisable="depreciationValueYear"
                                    :key="keyDepreciationValueYear">
                                </MInput> -->
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
                                <!-- <MInput 
                                    ref="txtTrackedYear"
                                    :disableInput="true"
                                    placeholder="Nhập năm theo dõi"
                                    typeValue="number"
                                    :valueDisable="asset.tracked_year"
                                    label="Năm theo dõi">
                                </MInput> -->
                            </div>
                        </div>
                        <div class="m-row ">
                            <div class="down-left">
                                <!-- input nhập ngày mua  -->
                                
                                <MInputDate
                                    ref="txtPurchaseDate"
                                    label="Ngày mua"
                                    format="dd/mm/yyyy"
                                    v-model="asset.purchase_date"
                                    :required="true"
                                    >
                                </MInputDate>
                            </div>
                            
                            <div class="down-center">
                                <!-- input nhập ngày bắt đầu sử dụng  -->
                                <MInputDate
                                    ref="txtProductionYear"
                                    label="Ngày bắt đầu sử dụng"
                                    format="dd/mm/yyyy"
                                    v-model="asset.production_year"
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
                        :isDefault="true"
                        label="Lưu"
                        @btnAddOnClickBtn="handlerEventBtnClickSave">
                    </MButton>
                    <!-- button hủy form  -->
                    <MButton
                        label="Hủy"
                        @btnAddOnClickBtn="handlerEventBtnClickCancel"  >
                    </MButton>
                </div>
            </div>
        </div>
        <!-- dialog thông báo  -->
        <MDialogNotify 
            v-if="isShowDialogNotify" 
            :content="contentDialogNotifyErrorValidate"
            @onClose="handleEventCloseDialogNotify">
        </MDialogNotify>
        <!-- dialog xác nhận sự kiện hủy (không có thay đổi dữ liệu) -->
        <MDialogAddFormCancel 
            :content="contentDialogAddFormCancel"
            type="cancel"
            v-if="isShowDialogAddFormCancel"
            @onCloseDialogNoCancel="handleEventCloseDialogFormNoCancel"
            @onCloseDialogCancel="handleEventCloseDialogFormCancel">
        </MDialogAddFormCancel>
        <!-- dialog xác nhận sự kiện hủy (có thay đổi dữ liệu) -->
        <MDialogEditFormCancel
            :content="contentDialogEditFormCancel"
            v-if="isShowDialogEditFormCancel"
            @onCloseDialogCancelNoSave="handleEventCloseDialogCancelNoSave"
            @onCloseDialogCancelChange="handleEventCloseDialogCancelChange"
            @onCloseDialogCancelSave="handlerEventCloseDialogCancelSave">
        </MDialogEditFormCancel>
        <!-- dialog hiển thị đang load dữ liệu  -->
        <MDialogLoadData v-if="isShowLoad"></MDialogLoadData>
    </div>
</template>

<script>
import MCombobox from '@/components/combobox/MCombobox.vue';
import MDialogNotify from '@/components/dialog/MDialogNotify.vue';
import MDialogAddFormCancel from '@/components/dialog/MDialogAddFormCancel.vue';
import MDialogEditFormCancel from '@/components/dialog/MDialogEditFormCancel.vue';
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
    MDialogNotify,
    MDialogAddFormCancel,
    MDialogEditFormCancel,
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
            previousKey: ""
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
        handlerEventBtnClickCancel(){
            let newValueAsset = JSON.stringify(this.asset);
            if(this.typeForm == "add"){
                this.isShowDialogAddFormCancel = true;
            }
            if(this.typeForm == "edit" || this.typeForm == "clone"){
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
        handlerEventBtnClickSave(){
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
                this.isShowDialogNotify = true;
                this.contentDialogNotifyErrorValidate = message;
            }
        },

        

        /**
         * Hàm validate form chi tiết
         * @author LTVIET (17/03/2023)
         */
        validateForm(){
            // this.validateEmptyValue();
            let itemRef = this.validateEmptyValue();
            if(itemRef!=""){
                this.itemError = this.$refs[itemRef];
                let label = this.itemError.label;
                this.isShowDialogNotify = true;
                this.contentDialogNotifyErrorValidate = resourceJS.error.validateData + `<<${label}>>`;
                return false;
            }
            return this.validateProfessional();
        },

        /**
         * Hàm check xem có input nào có giá trị rỗng
         * @author LTVIET (17/03/2023)
         */
        validateEmptyValue(){
            var refs = ['txtAssetCode','txtAssetName','txtDepartmentCode','txtAssetCategoryCode',
                        'txtQuantity','txtCost','txtLifeTime','txtDepreciationRate',
                        'txtDepreciationValueYear','txtPurchaseDate','txtProductionYear'];
            let txt = "";
            for(let i = 0 ;i<refs.length;i++){
                let item = this.$refs[refs[i]];
                if(refs[i] == 'txtPurchaseDate' || refs[i] == 'txtProductionYear'){
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

            // validate giá trị hao mòn năm phải nhỏ hơn nguyên giá
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

            // validate tỷ lệ hao mòn phải bằng 1/số năm sử dụng
            if(this.asset.depreciation_rate != Math.round(1/this.asset.life_time*1000)/1000){
                this.isShowDialogNotify = true;
                this.contentDialogNotifyErrorValidate = resourceJS.validateProfessionalAssetDetail.depreciationRateDifferentLifeTimeValue;
                
                return false;
            }

            // validate ngày mua phải là ngày trước ngày bắt đầu sử dụng
            let valueTime = moment(this.asset.purchase_date).diff(this.asset.production_year, "milliseconds");
            if(valueTime > 0){
                this.isShowDialogNotify = true;
                this.contentDialogNotifyErrorValidate = resourceJS.validateProfessionalAssetDetail.purchaseDateGreaterThanProductionYear;
                return false;
            }
            
            return true;
        },
        
        /**
         * Hàm đóng toast thông báo lưu thành công
         * @author LTVIET (06/03/2023)
         */
        closeToastSaveSuccess(){
            this.isShowToastSucess = false;
        },

        /**
         * Hàm đóng dialog khi không muốn hủy form
         * @author LTVIET (03/03/2023)
         */
        handleEventCloseDialogFormNoCancel() {
            this.isShowDialogAddFormCancel = false;
        },

        /**
         * Hàm đóng dialog và form khi muốn hủy form
         * @author LTVIET (03/03/2023)
         */
        handleEventCloseDialogFormCancel() {
            this.isShowDialogAddFormCancel = false;
            this.$emit('onClose');
        },

        /**
         * Hàm xử lý sự kiện đóng dialog và form khi không lưu dữ liệu của form edit
         * @author LTVIET (02/03/2023)
         */
        handleEventCloseDialogCancelNoSave(){
            this.isShowDialogEditFormCancel = false;
            this.$emit('onClose');
            
        },

        /**
         * Hàm xử lý sự kiện đóng dialog khi không lưu dữ liệu thay đổi 
         * @author LTVIET (02/03/2023)
         */
        handleEventCloseDialogCancelChange(){
            this.isShowDialogEditFormCancel = false;
        },

        /**
         * Hàm xử lý sự kiện đóng dialog khi không lưu dữ liệu thay đổi 
         * @author LTVIET (02/03/2023)
         */
         handlerEventCloseDialogCancelSave(){
            this.handlerEventBtnClickSave();
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
            this.asset.cost = value;
            this.depreciationValueYear = this.getDepreciationValueYear;
            this.keyDepreciationValueYear = ++this.keyDepreciationValueYear;
        },

        /**
         * Hàm set focus vào input đầu tiên của form khi mở form
         * @author LTVIET(02/03/2023)
         */
        setFocus(){
            this.$refs["txtAssetCode"].setFocus();
        },

        /**
         * Hàm lấy giá trị nhập vào input của số năm sử dụng
         * @param {*} value gí trị của input
         * @author LTVIET(23/03/2023)
         */
        getValueLifeTime(value){
            console.log("value1:",value);
            if(value != null && value != "" && value != undefined && value != 0){
                this.asset.life_time = value;
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

        getValueDepartmentId(value){
            this.asset.department_id = value;
            this.getDepartment();
        },

        getValueAssetCategoryId(value){
            this.asset.fixed_asset_category_id = value;
            this.getAssetCategory();
        },
        getValueQuantity(value){
            this.asset.quantity = value;
        },
        handleEventCloseDialogNotify(){
            this.isShowDialogNotify = false;
            if(this.itemError!=null){
                this.itemError.setFocus();
            }
        },
        handleEventKeyDown(event){
            let keyCode = event.keyCode;
            if (keyCode == enumJS.keyCtrl) {
                this.previousKey = keyCode;
                setTimeout(() => {
                    this.previousKey = ""; 
                }, 1000);
            }
            if(keyCode == enumJS.keyS && this.previousKey == enumJS.keyCtrl){
                event.preventDefault();
                this.handlerEventBtnClickSave();
            }
            if(keyCode == enumJS.keyEsc){
                event.preventDefault();
                this.$emit('onClose');
            }
            
        }
        
    },
}
</script>

<style scoped>
@import url(./assetDetail.css);
</style>