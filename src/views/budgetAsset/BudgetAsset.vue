<template>
    <div>
        <div  class="form editForm"
        >
            <div class="asset_increment__form-data" >
                <!-- phần header của form  -->
                <div class="form-header">
                    <!-- title của form  -->
                    <div class="asset_increment__form-header__text">Sửa tài sản</div>
                    <!-- button đóng form  -->
                    <MButtonIcon
                        class="btn-header__icon"
                        classIcon="form-header__icon"
                        @addOnClickBtnIcon="handleEventBtnClickCancel">
                    </MButtonIcon>
                </div>
                <!-- phần body của form  -->
                <div class="form-body budget-body" style="row-gap: 0;">
                    <div class="form-body__up">
                        <div class="m-row">
                            <div class="budget__body--up" style="padding-bottom: 16px;">
                                <MInput
                                    label="Bộ phận sử dụng"
                                    valueInput="Trung tâm GDTX"
                                    :disable="true"
                                    >
                                </MInput>
                            </div>
                        </div>
                    </div>
                    <div class="form-body__down" style="height: calc(100% - 125px);" :key="keyBudget">
                        <div class="m-row" style="font-family: Roboto-Bold;">Nguyên giá</div>

                        <div style="height: calc(100% - 14px - 15px);">
                            <div class="m-row">
                                <div class="budget__container--left">
                                    <div class="input budget_combobox">Nguồn hình thành</div>
                                    
                                    <div class="input budget_input">
                                        <!-- input nhập tên bộ phận sử dụng  -->
                                        Giá trị
                                    </div>
                                </div>
                            </div>
                            <div class="budget__container">
                                <div v-for="(item,index) in priceList.length" :key="index" class="m-row budget__item" style="justify-content: left;">
                                    <div class="budget__container--left">
                                        <div class="input budget_combobox">
                                            <div class="input__container ">
                                                <!-- combobox nhập giá trị mã bộ phận sử dụng  -->
                                                <MCombobox  
                                                    :ref="`mCombobox_${index}`"
                                                    :is-icon="false" 
                                                    :required="true"
                                                    :disable="false"
                                                    :api="budgetApi"
                                                    :valueInput="priceList[index].budget_id"
                                                    propName="budget_name" 
                                                    propValue="budget_id" 
                                                    :itemHeight = 36
                                                    :quantityItemDisplay = 4
                                                    @getInputCombobox="getValueBudget($event,index)"
                                                    :key="keyDepartment">
                                                </MCombobox>
                                            </div>
                                        </div>
                                        
                                        <div class="input budget_input">
                                            <!-- input nhập tên bộ phận sử dụng  -->
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
                                        <MButtonIcon 
                                            class="budget__icon"
                                            classIcon="budget__icon--add"
                                            @addOnClickBtnIcon="handleEventAddBudgetAsset">

                                        </MButtonIcon>
                                        <MButtonIcon v-if="priceList.length > 1"
                                            class="budget__icon"
                                            classIcon="budget__icon--minus"
                                            @addOnClickBtnIcon="handleEventDeleteBudgetAsset(index)">

                                        </MButtonIcon>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="form-body__total">
                        <div class="m-row budget__item" style="justify-content: left;">
                            <div class="budget__container--left">
                                <div class="input budget_combobox">
                                    <div class="input__container ">
                                        <!-- combobox nhập giá trị mã bộ phận sử dụng  -->
                                        <MInput
                                        :required="false"
                                        valueInput="Tổng"
                                        :disable = "true"
                                        >
                                    </MInput>
                                    </div>
                                </div>
                                
                                <div class="input budget_input">
                                    <!-- input nhập tên bộ phận sử dụng  -->
                                    <MInputNumber
                                        :disable="true"
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
import MButton from '@/components/button/MButton.vue';
import MButtonIcon from '@/components/button/MButtonIcon.vue';
import configJS from '@/js/config';
import axios from 'axios';
import resourceJS from '@/js/resourceJS';
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
        }
    },
    data() {
        return {
            isShowLoad: false,
            budgetApi: configJS.api.budgetApi,
            assetApi: configJS.api.assetApi,
            quantityBudget: 2,
            keyBudget: 0,
            budgetList: [],
            priceList: [],
            mountTotal: 0,
            keyInputMountTotal: 0,
            itemError: null,
            asset: null
        }
    },
    created() {
        this.getAssetbyId(this.propAsset);
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
         * Hàm lấy ra đối tượng asset theo id
         * @param {*} id id của đối tượng cần truy vấn
         * @author LTVIET (18/04/2023)
         */
         getAssetbyId(id){
            this.isShowLoad = true;
            axios.get(`${this.assetApi}/${id}`)
            .then(res=>{
                this.asset = res.data;
                let budgets  = JSON.parse(this.asset.cost_new);
                for (const item of budgets) {
                    this.priceList.push(item);
                }
                this.setFocus();
                this.isShowLoad = false;
            })
            .catch(err=>{
                console.log(err);
                this.isShowLoad = false;
            })
        },

        /**
         * Hàm xử lý sự kiện đóng form
         * @author LTVIET (18/04/2023)
         */
        handleEventBtnClickCancel(){
            this.$emit('onClose');
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
        },

        /**
         * Hàm xử lý sự kiện khi click btn delete thì xóa đối tượng nguồn chi phí đó
         * @author LTVIET (18/04/2023)
         */
        handleEventDeleteBudgetAsset(index){
            this.priceList.splice(index,1);
            this.keyBudget = ++this.keyBudget;
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
         * Hàm xử lý sự kiện lấy ra giá trị chi phí của nguồn từ input
         * @param {*} value giá trị chi phí của nguồn trong input
         * @param {*} index vị trí của đối tượng nguồn chi phí trong danh sách
         * @author LTVIET (18/04/2023)
         */
        getValueMountBudget(value,index){
            if(value){
                this.priceList[index].mount = value;
            }
        },

        /**
         * Hàm xử lý sự kiện focus vào combobox đầu tiên khi khởi tạo form 
         * @author LTVIET (18/04/2023)
         */
        setFocus(){
            this.$nextTick(function() {
                this.$refs["mCombobox_0"][0].setFocus();
                this.$refs["mCombobox_0"][0].isShow = false;
            })
        },

        /**
         * Hàm xử lý sự kiện click vào btn lưu
         * @author LTVIET (18/04/2023)
         */
        handleEventBtnClickSave(){
            let check = this.validateEmpty();
            if(check){
                this.asset.cost_new = JSON.stringify(this.priceList);
                this.updateAsset();
            }
        },

        /**
         * Hàm update giá trị của đối tượng tài sản
         * @author LTVIET (18/04/2023)
         */
        updateAsset(){
            axios.put(`${this.assetApi}/${this.asset.fixed_asset_id}`,this.asset)
            .then(()=>{
                this.handleEventBtnClickCancel();
            })
            .catch(err=>{
                console.log(err);
            })
        },

        /**
         * Hàm validate các trường dữ liệu trống
         * @author LTVIET (18/04/2023)
         */
        validateEmpty(){
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
         * @param {*} index vị trí của đối tượng cuối cùng trong dnah sách cần kiểm tra xem có bị trùng không
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
         * @param {*} input đốit tượng cần validate
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