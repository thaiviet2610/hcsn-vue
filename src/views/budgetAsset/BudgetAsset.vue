<template>
    <div>
        <div  class="form editForm" :tabindex="0" @keydown="handleEventKeyDown" @keyup="handleEventKeyUp"
        >
            <div class="asset_increment__form-data" >
                <!-- phần header của form  -->
                <div class="form-header">
                    <!-- title của form  -->
                    <div class="asset_increment__form-header__text">{{ label }}</div>
                    <!-- button đóng form  -->
                    <div class="btn-close-budget">
                        <MButtonIcon
                            class="btn-header__icon"
                            classIcon="form-header__icon"
                            @addOnClickBtnIcon="handleEventBtnClickCancel">
                        </MButtonIcon>
                        <MTooltip
                            :text="budgetInfo.button.btnClose.tooltip"
                            :class="budgetInfo.button.btnClose.classTooltip"
                        ></MTooltip>
                    </div>
                </div>
                <!-- phần body của form  -->
                <div class="form-body budget-body" style="row-gap: 0;">
                    <!-- phần body header của form  -->
                    <div class="form-body__up">
                        <div class="m-row">
                            <div class="budget__body--up" style="padding-bottom: 16px;">
                                <MInput
                                    :label="budgetInfo.bodyHeader.departmentName.label"
                                    :valueInput="asset.department_name"
                                    :key="keyDepartment"
                                    :disable="budgetInfo.bodyHeader.departmentName.disable"
                                    >
                                </MInput>
                            </div>
                        </div>
                    </div>
                    <!-- phần body content của form  -->
                    <div class="form-body__down" style="height: calc(100% - 125px);" :key="keyBudget">
                        <div class="m-row" style="font-family: Roboto-Bold;">{{ budgetInfo.bodyContent.cost }}</div>

                        <div style="height: calc(100% - 14px - 15px);">
                            <div class="m-row">
                                <div class="budget__container--left">
                                    <div class="input budget_combobox">{{ budgetInfo.bodyContent.source }}</div>
                                    
                                    <div class="input budget_input">
                                        {{ budgetInfo.bodyContent.value }}
                                    </div>
                                </div>
                            </div>
                            <div class="budget__container">
                                <div v-for="(item,index) in priceList.length" :key="index" class="m-row budget__item" style="justify-content: left;">
                                    <div class="budget__container--left">
                                        <div class="input budget_combobox" style="min-width: none;">
                                            <div class="input__container ">
                                                <!-- combobox nhập giá trị tên nguồn hình thành  -->
                                                <MCombobox  
                                                    :ref="`mCombobox_${index}`"
                                                    :required="true"
                                                    :idCombobox="`mCombobox_${index}`"
                                                    :valueInput="priceList[index].budget_id"
                                                    :dataCombobox="dataComboboxBudget"
                                                    :key="keyComboboxBudget"
                                                    propName="budget_name" 
                                                    propValue="budget_id" 
                                                    :itemHeight = 36
                                                    :quantityItemDisplay = 4
                                                    @getValueIdComboboxFocus="getValueIdComboboxFocus"
                                                    @getInputCombobox="getValueBudget($event,index)">
                                                </MCombobox>
                                            </div>
                                        </div>
                                        
                                        <div class="input budget_input">
                                            <!-- input nhập gái trị nguồn hình thành  -->
                                            <MInputNumber
                                                :ref="`mInput_${index}`"
                                                :required="true"
                                                :valueInput="priceList[index].mount"
                                                @getValueInput="getValueMountBudget($event,index)"
                                                @getValueEventInput="getValueMountBudget($event,index)"
                                                :stepValueInput= 1
                                                >
                                            </MInputNumber>
                                        </div>
                                    </div>
                                    <div class="budget__container--right">
                                        <div style="position: relative;">
                                            <MButtonIcon 
                                                class="budget__icon"
                                                classIcon="budget__icon--add"
                                                @addOnClickBtnIcon="handleEventAddBudgetAsset">

                                            </MButtonIcon>
                                            <MTooltip
                                                :text="budgetInfo.button.btnAddBudget.tooltip"
                                                :class="budgetInfo.button.btnAddBudget.classTooltip"
                                            ></MTooltip>
                                        </div>
                                        <div style="position: relative;">
                                            <MButtonIcon v-if="priceList.length > 1"
                                                class="budget__icon"
                                                classIcon="budget__icon--minus"
                                                @addOnClickBtnIcon="handleEventDeleteBudgetAsset(index)">
                                            </MButtonIcon>
                                            <MTooltip
                                                :text="budgetInfo.button.btnMinusBudget.tooltip"
                                                :class="budgetInfo.button.btnMinusBudget.classTooltip"
                                            ></MTooltip>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <!-- phần body footer của form  -->
                    <div class="form-body__total">
                        <div class="m-row budget__item" style="justify-content: left;">
                            <div class="budget__container--left">
                                <div class="input budget_combobox">
                                    <div class="input__container ">
                                        <!-- combobox nhập giá trị mã bộ phận sử dụng  -->
                                        <MInput
                                        :valueInput="budgetInfo.bodyFooter.footerLeft.text"
                                        :disable = "budgetInfo.bodyFooter.footerLeft.disable"
                                        >
                                    </MInput>
                                    </div>
                                </div>
                                
                                <div class="input budget_input">
                                    <!-- input nhập tên bộ phận sử dụng  -->
                                    <MInputNumber
                                        :disable="budgetInfo.bodyFooter.footerRight.disable"
                                        :valueInput="mountTotal"
                                        :key="keyInputMountTotal"
                                        >
                                    </MInputNumber>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
                <!-- phần footer của form  -->
                <div class="form-footer">
                    <!-- button lưu form  -->
                    <div class="btn-save-budget">
                        <MButton
                            class="btn--main"
                            :label="budgetInfo.button.btnSave.label"
                            @btnAddOnClickBtn="handleEventBtnClickSave">
                        </MButton>
                        <MTooltip
                            :text="budgetInfo.button.btnSave.tooltip"
                            :class="budgetInfo.button.btnSave.classTooltip"
                        ></MTooltip>
                    </div>
                    <!-- button hủy form  -->
                    <div class="btn-cancel-budget">
                        <MButton
                            :label="budgetInfo.button.btnCancel.label"
                            @btnAddOnClickBtn="handleEventBtnClickCancel"  >
                        </MButton>
                        <MTooltip
                            :text="budgetInfo.button.btnCancel.tooltip"
                            :class="budgetInfo.button.btnCancel.classTooltip"
                        ></MTooltip>
                    </div>
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
        <!-- dialog xác nhận đóng form  -->
        <MDialog
            :content="contentDialogFormCancel"
            v-if="isShowDialogFormCancel"
            :buttonInfo="btnDialogCancelForm"
            @onClickBtn="handleEventCloseDialogCancelForm"
            >
        </MDialog>
        <!-- dialog hiển thị đang load dữ liệu  -->
        <MDialogLoadData v-if="isShowLoad"></MDialogLoadData>
    </div>
</template>

<script>
import MButton from '@/components/button/MButton.vue';
import MButtonIcon from '@/components/button/MButtonIcon.vue';
import configJS from '@/js/config';
import axios from 'axios';
import resourceJS from '@/js/resource';
import enumJS from '@/js/enum';
export default {
    name: "BudgetsAsset",
    components:{
        MButton,
        MButtonIcon
    },
    props:{
        propAsset: {
            type: Object,
            default: null
        },
        label: {
            type:String,
            default: ""
        },
        autoUpdate: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            isShowLoad: false,
            isShowDialogFormCancel: false,
            contentDialogFormCancel: resourceJS.confirm.budget.cancelForm,
            btnDialogCancelForm: resourceJS.buttonDialog.cancelEditForm,
            budgetApi: configJS.api.budget.budgetApi,
            quantityBudget: 2,
            keyBudget: 0,
            budgetList: [],
            priceList: [],
            mountTotal: 0,
            keyInputMountTotal: 0,
            itemError: null,
            asset: null,
            oldvalueBudget: "",
            keyDepartment: 0,
            budgetInfo: resourceJS.budget,
            dataComboboxBudget: [],
            keyComboboxBudget: 0,
            assetApi: configJS.api.asset.assetApi,
            previousKeyCtrl: false,
            indexComboboxFocus: -1,
            btnDialogNotify: resourceJS.buttonDialog.notify,
            contentDialogNotifyErrorValidate: "",
            isShowDialogNotify: false
        }
    },
    created() {
        this.asset = this.propAsset;
        this.oldvalueBudget = this.asset.cost_source;
        if(this.oldvalueBudget){
            let budgets  = JSON.parse(this.asset.cost_source);
            for (const item of budgets) {
                this.priceList.push(item);
            }
        }else{
            this.priceList.push({
                budget_id: "00000000-0000-0000-0000-000000000000",
                budget_code: "",
                budget_name: "",
                mount: null
            });
        }
        
        this.getBudget();
    },
    mounted() {
    },
    watch: {
        priceList: {
            handler: function () {
                this.mountTotal = this.getMountTotal;
                this.keyInputMountTotal = ++this.keyInputMountTotal;
            },
            deep: true
        }
    },
    computed: {
        /**
         * Hàm tính tổng giá trị nguồn chi phí
         * @author LTVIET (19/04/2023)
         */
        getMountTotal: function(){
            let total = 0;
            for (const item of this.priceList) {
                total += item.mount;
            }
            return total;
        }
    },
    methods: {
        /**
         * Hàm gọi api lấy danh sách nguồn chi phí
         * @author LTVIET (19/04/2023)
         */
        getBudget(){
            this.isShowLoad = true;
            axios.get(this.budgetApi)
            .then(res=>{
                this.dataComboboxBudget = res.data;
                this.keyComboboxBudget = ++this.keyComboboxBudget;
                this.setFocus(0);
                this.isShowLoad = false;
            })
            .catch(err=>{
                console.log(err);
                this.isShowLoad = false;
            })
        },
        
        /**
         * Hàm lấy ra giá trị id của combobox đang được focus
         * @param {*} id id của combobox
         * @author LTVIET (18/04/2023)
         */
        getValueIdComboboxFocus(id){
            for(let i = id.length-1; i>=0;i--){
                if(!Number(id[i])){
                    this.indexComboboxFocus = Number(id.substring(i+1,id.length));
                    break;
                }
            }
        },

        /**
         * Hàm xử lý sự kiện đóng form
         * @author LTVIET (18/04/2023)
         */
        handleEventBtnClickCancel(){
            const newValueBudget = JSON.stringify(this.priceList);
            if(newValueBudget == this.oldvalueBudget){
                this.$emit('onClose');
            }else{
                this.isShowDialogFormCancel = true;
            }

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
                switch (keyCode) {
                    case enumJS.keyS:
                        this.handleEventBtnClickSave();
                        break;
                    case enumJS.keyA:
                        this.handleEventAddBudgetAsset();
                        break;
                    case enumJS.keyD:
                        if(this.indexComboboxFocus >= 0){
                            this.handleEventDeleteBudgetAsset(this.indexComboboxFocus);
                        }
                        break;
                    default:
                        break;
                }
                for(let i=0;i<=this.priceList.length;i++){
                    if(keyCode == (i+48)){
                        this.setFocus(i-1);
                    }
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
         * Hàm xử lý sự kiện khi click btn add thì tạo 1 đối tượng nguồn chi phí mới
         * @author LTVIET (18/04/2023)
         */
        handleEventAddBudgetAsset(){
            let price  = {
                budget_id: "00000000-0000-0000-00000000",
                budget_code: "",
                budget_name: "",
                mount: null
            }
            this.priceList.push(price);
            this.keyBudget = ++this.keyBudget;
            this.$nextTick(function() {
                this.$refs[`mCombobox_${this.priceList.length-1}`][0].setFocus();
            })
        },

        /**
         * Hàm xử lý sự kiện khi click button của dialog xác nhận hủy của form
         * @param {*} label của button muốn click
         * @author LTVIET (02/03/2023)
         */
        handleEventCloseDialogCancelForm(label){
            this.isShowDialogFormCancel = false;
            // Nếu click button "Không lưu" thì đóng dialog và form lại và không lưu dữ liệu
            if(label == this.btnDialogCancelForm[1][2]){
                this.$emit('onClose');
                return;
            }

            // Nếu click button "Hủy" thì đóng dialog lại
            if(label == this.btnDialogCancelForm[2][2]){
                this.setFocus(0);
                return;
            }

            // Nếu click button "Lưu" thì đóng dialog và form sửa lại và lưu dữ liệu
            this.handleEventBtnClickSave();
        },

        /**
         * Hàm xử lý sự kiện khi click btn delete thì xóa đối tượng nguồn chi phí đó
         * @author LTVIET (18/04/2023)
         */
        handleEventDeleteBudgetAsset(index){
            this.priceList.splice(index,1);
            this.keyBudget = ++this.keyBudget;
            this.$nextTick(function() {
                this.$refs[`mCombobox_${this.priceList.length-1}`][0].setFocus();
            })
        },

        /**
         * Hàm xử lý sự kiện lấy ra giá trị nguồn chi phí từ combobox
         * @param {*} value id của đối tượng nguồn chi phí trong combobox
         * @param {*} index vị trí của đối tượng nguồn chi phí trong danh sách
         * @author LTVIET (18/04/2023)
         */
        getValueBudget(value,index){
            this.getBudgetById(value,index);
        },

        /**
         * Hàm xử lý sự kiện gọi api để lấy giá trị của nguồn chi phí theo id truyền vào
         * @param {*} id id của đối tượng nguồn chi phí trong combobox
         * @param {*} index vị trí của đối tượng nguồn chi phí trong danh sách
         * @author LTVIET (18/04/2023)
         */
        getBudgetById(id,index){
            axios.get(`${this.budgetApi}/${id}`)
            .then(res=>{
                let budget = res.data;
                this.priceList[index].budget_id = budget.budget_id;
                this.priceList[index].budget_code = budget.budget_code;
                this.priceList[index].budget_name = budget.budget_name;
            })
            .catch(err=>{
                console.log(err);
            })
        },

        /**
         * Hàm xử lý sự kiện click button đóng dialog
         * @author LTVIET (29/04/2023)
         */
         handleEventCloseDialogNotify(){
            this.isShowDialogNotify = false;
        },

        /**
         * Hàm xử lý sự kiện lấy ra giá trị chi phí của nguồn từ input
         * @param {*} value giá trị chi phí của nguồn trong input
         * @param {*} index vị trí của đối tượng nguồn chi phí trong danh sách
         * @author LTVIET (18/04/2023)
         */
        getValueMountBudget(value,index){
            this.priceList[index].mount = value;
        },

        /**
         * Hàm xử lý sự kiện focus vào combobox
         * @param {*} index vị trí combobox muốn focus
         * @author LTVIET (18/04/2023)
         */
        setFocus(index){
            this.$nextTick(function() {
                this.$refs[`mCombobox_${index}`][0].setFocus();
            })
        },

        /**
         * Hàm xử lý sự kiện click vào btn lưu
         * @author LTVIET (18/04/2023)
         */
        handleEventBtnClickSave(){
            let check = this.validateForm();
            // let check = true;
            if(check){
                this.asset.cost_source = JSON.stringify(this.priceList);
                this.asset.cost = this.mountTotal;
                if(this.autoUpdate){
                    this.updateAsset();
                }else{
                    this.$emit('getValueCost',[this.asset.cost,this.asset.cost_source]);
                }
            }
            this.itemError = null;
        },

        /**
         * Hàm update giá trị của đối tượng tài sản
         * @author LTVIET (18/04/2023)
         */
        updateAsset(){
            console.log(this.asset);
            this.isShowLoad = true;
            axios.put(`${this.assetApi}/${this.asset.fixed_asset_id}`,this.asset)
            .then(()=>{
                this.$emit('getNewValueAsset',this.asset);
                this.isShowLoad = false;
            })
            .catch(err=>{
                this.handleEventErrorAPI(err);
            })
        },

        /**
         * Hàm xử lý sự kiện gặp lỗi khi gọi API
         * @param {*} error Lỗi cần xử lý
         * @author LTVIET(24/04/2023)
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
                    this.handleEventErrorInvalid(errorData.MoreInfo);
                }
                // Các lỗi khác
                else{
                    this.contentDialogNotifyErrorValidate = message;
                }
                
            }
        },

        /**
         * Hàm nhận và xử lý lỗi từ backend
         * @param {*} errors lỗi nhận được từ backend
         * @author LTVIET(24/04/2023)
         */
        handleEventErrorInvalid(errors){
            for (let error of errors) {
                // validate lỗi code bị trùng
                if(error.ValidateCode == enumJS.validateCode.CostSourceInValid){
                    this.handleEventCostSourceError(error.Data);
                }else{
                    this.contentDialogNotifyErrorValidate = resourceJS.error.exception;
                }
            }
        },

        /**
         * Hàm xử lý lỗi từ dữ liêu nguồn chi phí không hợp lệ
         * @param {*} errors lỗi nhận được từ backend
         * @author LTVIET(24/04/2023)
         */
        handleEventCostSourceError(erros){
            this.isShowDialogNotify = false;
            for (const error of erros) {
                const validateCode = error.ValidateCode;
                const dataError = error.Data;
                if(validateCode == enumJS.validateCode.CostSourceEmpty){
                    const index = dataError.Index;
                    for (const propName of dataError.Data.reverse()) {
                        console.log(propName);
                        if(propName == "mount"){
                            let item = this.$refs[`mInput_${index}`][0];
                            item.inValid = true;
                            item.notifyError = resourceJS.error.emptyInput;
                            if(!this.itemError){
                                this.itemError = item;
                                this.itemError.setFocus();
                            }
                        }else{
                            let item = this.$refs[`mCombobox_${index}`][0];
                            item.inValid = true;
                            item.notifyError = resourceJS.error.emptyInput;
                            if(!this.itemError){
                                this.itemError = item;
                                this.itemError.setFocus();
                            }
                        }
                    }
                }
                if(validateCode == enumJS.validateCode.CostSourceDuplicate){
                    const index = dataError;
                    let item = this.$refs[`mCombobox_${index}`][0];
                    item.inValid = true;
                    item.notifyError = resourceJS.validateBudget.duplicateBudget;
                    if(!this.itemError){
                        this.itemError = item;
                        this.itemError.setFocus();
                    }
                }
                if(validateCode == enumJS.validateCode.CostSourceMountLessOrEqualThanZero){
                    const index = dataError;
                    let item = this.$refs[`mInput_${index}`][0];
                    item.inValid = true;
                    item.notifyError = resourceJS.error.emptyInputNumber;
                    if(!this.itemError){
                        this.itemError = item;
                        this.itemError.setFocus();
                    }
                }
                
            }
        },

        /**
         * Hàm xử lý sự kiện hiển thị lỗi thông báo của input 
         * @param {*} item đối tượng cần hiển thị lỗi
         * @param {*} message nội dung thông báo lỗi
         * @author LTVIET(24/04/2023)
         */
        handleDisplayInputError(item,message){
            item.inValid = true;
            item.notifyError = message;
        },

        /**
         * Hàm validate các trường dữ liệu
         * @author LTVIET (18/04/2023)
         */
        validateForm(){
            let check = true;
            for(let i = 0; i< this.priceList.length;i++){
                let combobox = this.$refs[`mCombobox_${i}`][0];
                let input = this.$refs[`mInput_${i}`][0];
                if(!this.validateCombobox(combobox,i) | !this.validateInput(input)){
                    check = false;
                }
            }
            return check;
        },

        /**
         * Hàm validate giá trị của các combobox
         * @param {*} combobox đối tượng cần validate
         * @param {*} index vị trí của đối tượng cuối cùng trong danh sách cần kiểm tra xem có bị trùng không
         * @author LTVIET (18/04/2023)
         */
        validateCombobox(combobox,index){
            let check = true;
            if(!combobox.value){
                combobox.inValid = true;
                combobox.notifyError = resourceJS.error.emptyInput;
                check = false;
                if(!this.itemError){
                    this.itemError = combobox;
                    this.itemError.setFocus();
                }
            }else{
                for(let j = 0; j < index; j++){
                    if(this.priceList[j].budget_name == combobox.value){
                        combobox.inValid = true;
                        combobox.notifyError = resourceJS.validateBudget.duplicateBudget;
                        check = false;
                        if(!this.itemError){
                            this.itemError = combobox;
                            this.itemError.setFocus();
                        }
                        break;
                    }
                }
            }
            return check;
        },
        
        /**
         * Hàm validate giá trị của các input
         * @param {*} input đối tượng cần validate
         * @author LTVIET (18/04/2023)
         */
        validateInput(input){
            let check = true;
            if(!input.value && input.value != 0){
                input.inValid = true;
                input.notifyError = resourceJS.error.emptyInput;
                check = false;
                if(!this.itemError){
                    this.itemError = input;
                    this.itemError.setFocus();
                }
            }else if(input.valueNumber === 0){
                input.inValid = true;
                input.notifyError = resourceJS.error.emptyInputNumber;
                check = false;
                if(!this.itemError){
                    this.itemError = input;
                    this.itemError.setFocus();
                }
            }
            return check;
        }
    },
}
</script>

<style scoped>
@import url(./budget-asset.css);
input{
    min-width: none;
}

.btn__icon{
    background-color: #ffffff;
}
</style>