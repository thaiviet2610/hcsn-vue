<template>
    <div>
        <div  class="form editForm">
            <div class="asset_increment__form-data" >
                <!-- phần header của form  -->
                <div class="form-header">
                    <!-- title của form  -->
                    <div class="asset_increment__form-header__text">Thêm chứng từ ghi tăng</div>
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
                                    ref="refVoucherCode"
                                    :required="true"
                                    :disable="false"
                                    placeholder="Mã chứng từ"
                                    label="Mã chứng từ"
                                    @getValueInput="handleEventGetValueInputVoucherCode"
                                    @getValueEventInput="handleEventGetValueInputVoucherCode"
                                    >
                                </MInput>
                            </div>
                            
                            <div class="input down-center">
                                <!-- input nhập nguyên giá  -->
                                <MInputDate
                                    :required="true"
                                    :disable="false"
                                    label="Ngày bắt đầu sử dụng"
                                    format="dd/mm/yyyy"
                                    @getValueInputDate="getValueVoucherDate"
                                    >
                                </MInputDate>
                            </div>
                           
                            <div class="input down-right">
                                <!-- input nhập số năm sử dụng  -->
                                <MInputDate
                                    :required="true"
                                    :disable="false"
                                    label="Ngày ghi tăng"
                                    format="dd/mm/yyyy"
                                    @getValueInputDate="getValueIncrementDate"
                                    >
                                </MInputDate>
                            </div>
                        </div>

                        <div class="m-row">
                            <!-- input tìm kiếm  -->
                            <MInput
                                :required="false"
                                :disable="false"
                                placeholder="Ghi chú"
                                @keyDownEnter="getValueInputDescription"
                                @getValueEventInput="getValueInputDescription"
                                label="Ghi chú"
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
                            :dataTable="dataTable"
                            :dataPageSize="dataPageSize"
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
        <AssetIncrement 
            v-if="isShowSelectAssetIncrement"
            :dataBodyApi="dataBodyApi"
            @onSave="handleEventSelectedAssets"
            @onClose="handleEventCloseformSelecteAssetIncrement">
        </AssetIncrement>
        <BudgetAsset 
            v-if="isShowBudgetAsset"
            :propAsset="assetId"
            @onClose="handleEventCloseFormBudgetAsset">
        </BudgetAsset>

        <MDialog 
            ref="mDialogNotifyDelete"
            :content="contentDialogNotify"
            :buttonInfo="btnDialogNotify"
            v-if="isShowDialogNotify" 
            @onClickBtn="handleEventCloseDialogNotify">
        </MDialog>
        
        <!-- dialog hiển thị đang load dữ liệu  -->
        <MDialogLoadData v-if="isShowLoad"></MDialogLoadData>
    </div>
</template>


<script>
import resourceJS from '@/js/resourceJS';
import AssetIncrement from '../assetIncrement/AssetIncrement.vue';
import enumJS from '@/js/enum';
import BudgetAsset from '@/views/budgetAsset/BudgetAsset.vue';
import configJS from '@/js/config';
import axios from 'axios';
export default {
    name: "AssetIncrementDetail",
    components:{
        AssetIncrement,BudgetAsset
    },
    props:{

    },
    data() {
        return {
            tableInfo: resourceJS.table.tableAssetIncrementDetail.tableInfo,
            dataPageSize: resourceJS.table.tableAssetIncrementDetail.dataPageSize ,
            isShowSelectAssetIncrement: false,
            isShowBudgetAsset: false,
            assets: [],
            dataTable: null,
            keyTable: 0,
            keyword: "",
            dataBodyApi: [],
            assetId: null,
            assetIncrement: null,
            assetIncrementApi: configJS.api.assetIncrementApi,
            assetIncrementDetailApi: configJS.api.assetIncrementDetailApi,
            itemError: null,
            contentDialogNotify: "",
            btnDialogNotify: resourceJS.buttonDialog.notify,
            isShowDialogNotify: false
        }
    },
    created() {
        this.assetIncrement = {
            voucher_id: "0000000-0000-0000-00000000",
            voucher_code: "",
            voucher_date: this.getCurrentDate(),
            increment_date: this.getCurrentDate(),
            price: 0,
            description: ""
        }
        this.getUnitDataTable();
    },
    mounted() {
        this.setFocus();
    },
    methods: {
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
         * Hàm xử lý sự kiện khởi tạo giá trị dữ liệu ban đầu cho data table
         * @author LTVIET (19/04/2023)
         */
        getUnitDataTable(){
            this.dataTable = {
                Data: [
                ],
                footer: {
                    colspan: 6,
                    total: [0,0,0],
                }, 
                TotalRecord: 0   
            }
        },

        /**
         * Hàm xử lý sự kiện click btn đóng form
         * @author LTVIET (19/04/2023)
         */
        handleEventBtnClickCancel(){
            this.$emit('onClose');
        },

        /**
         * Hàm xử lý sự kiện focus vào input mã chứng từ khi form được khởi tạo lần đầu tiên
         * @author LTVIET (19/04/2023)
         */
        setFocus(){
            this.$nextTick(function(){
                this.$refs["refVoucherCode"].setFocus();
            });
        },

        /**
         * Hàm xử lý sự kiện đóng form chọn tài sản
         * @author LTVIET (19/04/2023)
         */
        handleEventCloseformSelecteAssetIncrement(){
            this.isShowSelectAssetIncrement = false;
        },

        /**
         * Hàm xử lý sự kiện mở form chọn tài sản
         * @author LTVIET (19/04/2023)
         */
         btnClickOpenFormSelectedAsset(){
            this.isShowSelectAssetIncrement = true;
        },

        /**
         * Hàm xử lý sự kiện đóng form sửa nguồn chi phí
         * @author LTVIET (19/04/2023)
         */
        handleEventCloseFormBudgetAsset(){
            this.isShowBudgetAsset = false
        },

        /**
         * Hàm xử lý sự kiện click btn save của form chọn tài sản
         * @param {*} value danh sách các tài sản được chọn
         * @author LTVIET (19/04/2023)
         */
        handleEventSelectedAssets(value){
            for(let i =0;i<value.length;i++){
                let id = value[i].fixed_asset_id;
                this.dataBodyApi.push(id);
                this.assets.push(value[i]);
            }
            this.getDataTable();
            this.keyTable = ++this.keyTable;
            this.isShowSelectAssetIncrement = false;
        },

        /**
         * Hàm xử lý sự kiện click btn save của form chọn tài sản
         * @param {*} value danh sách các tài sản được chọn
         * @author LTVIET (19/04/2023)
         */
        handleEventKeyDownEnterInputSearch(value){
            this.keyword = value;
            if(!value){
                this.keyword = "";
            }
            this.dataTable.Data = this.dataTable.Data.filter(item=>
                        (item.fixed_asset_code.toLowerCase().includes(this.keyword.toLowerCase()) || 
                        item.fixed_asset_name.toLowerCase().includes(this.keyword.toLowerCase())));

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
        handleEventClickFunctionTable(values){
            let type = values[0];
            let id = values[1];
            if(type == enumJS.type.edit){
                this.isShowBudgetAsset = true;
                this.assetId = id;
            }else if(type == enumJS.type.delete){
                let assetsDelete = this.$refs["mTable"].getEntityCheckboxActiveList();
                for (const itemDelete of assetsDelete) {
                    let index = this.assets.indexOf(itemDelete);
                    this.assets.splice(index,1);
                    this.dataBodyApi.splice(index,1);
                }
                this.getDataTable();
                this.keyTable = ++this.keyTable;
            }
        },

        /**
         * Hàm lấy data table
         * @author LTVIET (18/04/2023)
         */
        getDataTable(){
            this.dataTable.Data = this.assets;
            this.dataTable.TotalRecord = this.assets.length;
            let costTotal = 0;
            let deprectionValueTotal = 0;
            let residualTotal = 0;
            for(let i =0;i<this.assets.length;i++){
                costTotal += this.assets[i].cost;
                deprectionValueTotal += this.assets[i].depreciation_value;
                if(this.assets[i].residual_value > 0){
                    residualTotal += this.assets[i].residual_value;
                }
                this.dataTable.Data[i].index = i+1;
            }
            this.dataTable.footer.total = [costTotal,deprectionValueTotal,residualTotal];
        },

        /**
         * Hàm xử lý sự kiện click btn lưu
         * @author LTVIET (19/04/2023)
         */
        handleEventBtnClickSave(){
            console.log(this.assetIncrement);
            console.log(this.assets);
            if(this.validateAssetActives & this.validateAssetActives()){
                this.addAssetIncrement();
            }
        },

        /**
         * Hàm xử lý sự kiện gọi api để thêm đối tượng chứng từ mới
         * @author LTVIET (19/04/2023)
         */
        addAssetIncrement(){
            axios.post(this.assetIncrementApi,this.assetIncrement)
            .then(res=>{
                console.log(res);
            })
            .catch(err=>{
                console.log(err);
            })
        },

        /**
         * Hàm validate các trường giá trị của chứng từ
         * @author LTVIET (19/04/2023)
         */
        validateAssetIncrement(){
            const refs = ["refVoucherCode","refVoucherDate","refIncrementDate"];
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
            if(this.assets.length <= 0){
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