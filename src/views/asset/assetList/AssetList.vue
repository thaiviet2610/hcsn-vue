<template>
    <!-- <div class="body"> -->
        <div class="main" @click="addOnClickAssetList">
            <!-- phần header  -->
            
            <!-- phần content  -->
            <div class="content">
                <div class="content-header">
                    <div class="content-header__left">
                        <!-- input tìm kiếm tài sản  -->
                        <div class="input1">
                            <MInput 
                                @keydownEnter ="handlerEventKeydownEnter"
                                ref="txtSearchAsset"
                                placeholder="Tìm kiếm tài sản"
                                :iconInput="true"
                                typeValue="text">
                            </MInput>
                        </div>
                        <!-- combobox lọc loại tài sản  -->
                        <MCombobox  
                            :isIcon="true" 
                            :api="this.assetCategoryApi"
                            propName="fixed_asset_category_name" 
                            placeholder="Loại tài sản" 
                            propValue="fixed_asset_category_id"
                            @getInputCombobox="getValueAssetCategory"
                            v-model="assetCategoryId">
                        </MCombobox>
                        <!-- combobox lọc bộ phận sử dụng  -->
                        <MCombobox  
                            :is-icon="true" 
                            :api="this.departApi"
                            propName="department_name" 
                            placeholder="Bộ phận sử dụng" 
                            propValue="department_id"
                            @getInputCombobox="getValueDepartment"
                            v-model="departmentId" >
                        </MCombobox>
                    </div>
                    <div class="content-header__right">
                        <!-- button thêm tài sản  -->
                        <MButton
                            :isDefault="true"
                            label=" + Thêm tài sản"
                            class="item1"
                            @btnAddOnClickBtn="btnClickOpenForm">
                        </MButton>
                        <!-- button xuất dữu liệu ra excel  -->
                        <MButtonIcon
                            class="item2"
                            classIcon="item2__icon--image"
                            data_tooltip_bottom="Xuất ra Excel"
                            @addOnClickBtnIcon="handlerEventClickBtnExcel">
                        </MButtonIcon>
                        <!-- button xóa tài sản  -->
                        <MButtonIcon
                            class="item3"
                            classIcon="item3__icon--image"
                            data_tooltip_bottom="Xóa tài sản"
                            @addOnClickBtnIcon="btnOnClick">
                        </MButtonIcon>
                    </div>
                </div>

                <div class="content-body">
                    <!-- table hiển thị danh sách tài sản  -->
                    <Mtable 
                        ref="mTable"
                        @btnDblClickRow="handleEventDblClickRow"
                        @btnClickFunctionOpenForm="handleEventOpenForm"
                        :departmentId="departmentId"
                        :assetCategoryId="assetCategoryId"
                        :keyword="keyword"
                        :key="keyTable"
                        v-model="quantityCheckbox"
                        @addOnClickContextMenu="handleEventClickContextMenu"
                        :api="this.assetApi"></Mtable>
                </div>
            </div>
        </div>
        <!-- form hiển thị thông tin chi tiết của tài sản  -->
        <AssetDetail 
            v-if="isShowForm" 
            :label="labelForm" 
            :assetInput="assetInput" 
            :propAssetCode="newCode"
            :yearFollow="this.year"
            :typeForm="typeForm"
            :key="keyAssetDetail"
            @addOnClickBtnSave="handlerEventSaveForm"
            @onClose="isShowForm = false">
        </AssetDetail>
        <!-- dialog thông báo hành động không có tài sản nào được chọn để xóa -->
        <MDialogNotify 
            ref="mDialogNotifyDelete"
            :content="contentDialogNotifyDelete"
            v-show="isShowDialogNotifyDelete" 
            @onClose="handleEventCloseDialogNotifyDelete">
        </MDialogNotify>
        
        <!-- dialog xác nhận hành động xóa 1 tài sản -->
        <MDialogFormConfirm 
            ref="mDialogConfirmDeleteOneAsset"
            :content="contentDialogConfirmDeleteOneAsset"
            type="delete"
            v-show="isShowDialogConfirmDeleteOneAsset"
            :contentColorAfter="contentColorAfter"
            :contentAfter="contentAfterDialogConfirmDeleteOneAsset"
            :colorTextAfter="colorTextAfter"
            @onCloseDialogNoDelete="handleEventCloseDialogNoDelete"
            @onCloseDialogDelete="handleEventCloseDialogDelete">
        </MDialogFormConfirm>
        <!-- dialog xác nhận hành động xóa nhiều tài sản -->
        <MDialogFormConfirm 
            ref="mDialogConfirmDeleteMultiAsset"
            :content="contentDialogConfirmDeleteMultiAsset"
            type="delete"
            v-show="isShowDialogConfirmDeleteMultiAsset"
            :contentColorBefore="contentColorBefore"
            :colorTextBefore="colorTextBefore"
            @onCloseDialogNoDelete="handleEventCloseDialogNoDelete"
            @onCloseDialogDelete="handleEventCloseDialogDelete">
        </MDialogFormConfirm>
        <!-- dialog loading dữ liệu  -->
        <MDialogLoadData v-if="isShowLoad"></MDialogLoadData>
        <!-- toast message thông báo xóa thành công  -->
        <MToastSucess 
            v-show="isShowToastSucess"
            :notify="notifyToastSuccess"
            :content="contentToastSuccess"
            :buttonUndo="isButtonUndo"
            :buttonClose="isButtonClose"
            :link="linkExcel"
            @onClose="closeToastSucess"
            >
        </MToastSucess>
    <!-- </div> -->
</template>

<script>
import AssetDetail from '../assetDetail/AssetDetail.vue'
import MCombobox from '../../../components/combobox/MCombobox.vue'
import Mtable from '../../../components/table/MTable.vue'
import MDialogNotify from '@/components/dialog/MDialogNotify.vue';
import MDialogFormConfirm from '@/components/dialog/MDialogAddFormCancel.vue';
import commonJS from '@/js/common.js';
import resourceJS from '@/js/resourceJS.js';
import MToastSucess from '@/components/toast/MToastSucess.vue';
import MButtonIcon from '@/components/button/MButtonIcon.vue';
import axios from 'axios'
import enumJS from '@/js/enumJS';
export default {
    name: "AssetList",
    components:{
        AssetDetail,MCombobox,Mtable,MDialogFormConfirm,MDialogNotify,MToastSucess,MButtonIcon,
    },
    data() {
        return {
            quantityCheckbox: 0,
            labelForm: "",
            assetInput:null,
            isShowForm: false,
            isShowDialogNotifyDelete: false,
            isShowDialogConfirm: false,
            isShowDialogConfirmDeleteOneAsset: false,
            isShowDialogConfirmDeleteMultiAsset: false,
            contentDialogNotifyDelete: resourceJS.notify.noAssetDelete,
            contentDialogConfirm: "",
            contentDialogConfirmDeleteOneAsset: "",
            contentAfterDialogConfirmDeleteOneAsset: "",
            contentDialogConfirmDeleteMultiAsset: "",
            assets : [],
            assetApi: resourceJS.api.assetApi,
            departApi: resourceJS.api.departmentApi,
            assetCategoryApi: resourceJS.api.assetCategoryApi,
            exportExcelApi: resourceJS.api.exportExcelApi,
            year: null,
            valueCheckboxAll: false,
            isShowLoad: false,
            isShowToastSucess: false,
            isButtonUndo: false,
            isButtonClose: false,
            notifyToastSuccess: "",
            contentToastSuccess: "",
            departmentId:"",
            assetCategoryId: "",
            typeForm: "",
            assetsDelete: [],
            keyword: "",
            keyTable: 0,
            newCode: "",
            generateNewCodeApi: resourceJS.api.assetGenerateNewCodeApi,
            keyAssetDetail: 0,
            colorTextBefore: "",
            contentColorBefore: "",
            contentColorAfter: "",
            colorTextAfter: "",
            invalid: false,
            contextMenuDelete: false,
            contextMenuItemDelete: null,
            linkExcel: "",
        }
    },

    watch: {
        // assetCategoryId: function(newValue) {
        //     console.log(newValue);
        //     this.keyTable = ++this.keyTable;
        // },

        // departmentId: function(newValue) {
        //     console.log(newValue);
        //     this.keyTable = ++this.keyTable;
        // }
    },
    methods: {
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
                this.invalid = true;
                console.log(error);
            })
        },

        /**
         * Hàm xử lý sự kiện click phím enter để gửi keyword tìm kiếm vào table để lọc
         * @param {*} value giá trị cần tìm kiếm
         * @author LTVIET (16/03/2023)
         */
        handlerEventKeydownEnter(value){
            this.keyword = value;
            if(!this.invalid){
                this.keyTable = ++this.keyTable;
            }
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
            this.typeForm = resourceJS.typeForm.add;
            this.labelForm = resourceJS.titlteForm.addAssetForm;
            this.getNewCode();
        },
        
        /**
         * Hàm format lại định dạng tiền
         * @param {*} value giá trị cần format
         * @param {*} type loại định dạng muốn format
         * @author LTVIET (02/03/2023)
         */
        formatValue(value,type) {
            if(type == "money"){
                return commonJS.formatMoney(value);
            }else if(type == "date") {
                return commonJS.formatDate(value);
            }
        },

        /**
         * Hàm tính tổng
         * @param {*} moldelName loại thuộc tính cần tính tổng 
         * @param {*} list danh sách các đối tượng chứa thuộc tính
         * @author LTVIET (02/03/2023)
         */
        getTotal(modelName,list) {
            let total = 0;
            for (const item of list) {
                total += item[modelName];
            }
            return this.formatValue(total,"money");
        },
        
        /**
         * Hàm thay đổi số năm
         * @param {*} check nếu check = true thì tăng 1 đơn vị, check = false thì giảm 1 đơn vị
         * @author LTVIET (02/03/2023)
         */
        addOnChangeYear(check) {
            if(check){
                this.year += 1;
            }else{
                this.year -= 1;
                if(this.year < 0 ){
                    this.year = 0;
                }
            }
        },

        /**
         * Hàm xử lý sự kiện mở form chi tiết tài sản khi click vào chức năng của table
         * @param {*} values giá trị được truyền từ lớp con (label form,đối tượng tài sản asset)
         * @author LTVIET (02/03/2023)
         */
        handleEventOpenForm(values) {
            this.isShowToastSucess = false;
            this.labelForm = values[0];
            if(this.labelForm == resourceJS.titlteForm.editAssetForm){
                this.typeForm = resourceJS.typeForm.edit;
            }else{
                this.typeForm = resourceJS.typeForm.clone;
                this.getNewCode();
            }
            this.isShowForm = true;
            this.assetInput = values[1];
        },

        /**
         * Hàm xử lý sự kiện mở form chi tiết tài sản khi double click vào 1 dòng của table
         * @param {*} item đối tượng tài sản asset được chọn
         * @author LTVIET (02/03/2023)
         */
        handleEventDblClickRow(item){
            this.isShowForm = true;
            this.assetInput = item;
            this.typeForm = resourceJS.typeForm.edit;
            this.labelForm = resourceJS.titlteForm.editAssetForm;
        },

        /**
         * Hàm xử lý sự kiện click button xóa tài sản
         * @author LTVIET (02/03/2023)
         */
        btnOnClick(){
            this.contentColorAfter="";
            this.contentColorBefore="";
            //1. lấy số lượng checkbox = true từ table
            this.quantityCheckbox = this.$refs["mTable"].quantityCheckbox;
            let length = this.$refs["mTable"].assets.length;
            //2. kiểm tra số lượng 
            if(this.quantityCheckbox == 0){
                //2.1. nếu số lượng = 0 thì hiển thị thông báo không có tài sản nào được chọn để xóa
                this.isShowDialogNotifyDelete = true;
                this.$refs["mDialogNotifyDelete"].setFocus();
            }else if(this.quantityCheckbox == 1){
                //2.2. nếu nếu số lượng = 1 thì hiển thị thông báo xóa 1 tài sản
                //2.2.1. lấy thông tin của tài sản đó
                let asset = this.$refs['mTable'].getItemSelected();
                let codeAsset = asset.fixed_asset_code;
                let nameAsset = asset.fixed_asset_name;
                //2.2.2. hiển thị thông báo xác nhận có muốn xóa không
                this.contentDialogConfirmDeleteOneAsset = resourceJS.confirm.oneAssetDelete;
                this.contentColorAfter = `<<${codeAsset} - ${nameAsset}>>`;
                this.contentAfterDialogConfirmDeleteOneAsset = "?";
                this.colorTextAfter = 'black';
                this.isShowDialogConfirmDeleteOneAsset = true;
                this.$refs["mDialogConfirmDeleteOneAsset"].setFocus();
            }else{
                //2.2. nếu nếu số lượng > 1 thì hiển thị thông báo xóa nhiều tài sản
                this.isShowDialogConfirmDeleteMultiAsset = true;
                let quantity = this.quantityCheckbox;
                if(quantity==length){
                    //--> Trường hợp xóa tất cả tài sản
                    this.contentDialogConfirmDeleteMultiAsset = resourceJS.confirm.allAssetDelete;
                }else{
                    //--> Trường hợp còn lại
                    if(this.quantityCheckbox < 10){
                        quantity = `0${quantity}`; 
                    }
                    this.contentDialogConfirmDeleteMultiAsset = resourceJS.confirm.multiAssetDelete;
                    this.contentColorBefore = quantity;
                    this.colorTextBefore = 'black';
                }
                this.$refs["mDialogConfirmDeleteMultiAsset"].setFocus();
            }
            
        },

        /**
         * Hàm xử lý sự kiện click vào button không xóa của dialog xác nhận hành động xóa
         * @author LTVIET (02/03/2023)
         */
        handleEventCloseDialogNoDelete() {
            if(this.isShowDialogConfirmDeleteOneAsset==true){
                //--> ẩn đi dialog xác nhận xóa 1 tái sản
                this.isShowDialogConfirmDeleteOneAsset = false;
                this.$refs["txtSearchAsset"].setFocus();
            }else if(this.isShowDialogConfirmDeleteMultiAsset==true){
                //-->ẩn đi dialog xác nhận xóa nhiều tái sản
                this.isShowDialogConfirmDeleteMultiAsset = false;
                this.$refs["txtSearchAsset"].setFocus();
            }
        },

        /**
         * Hàm xử lý sự kiện click vào button xóa của dialog xác nhận hành động xóa
         * @author LTVIET (02/03/2023)
         */
        handleEventCloseDialogDelete() {
            let checkboxSelected = this.$refs['mTable'].getItemSelected();
            //1.thực hiện ẩn đi dialog và xóa tài sản trong database
            if(this.isShowDialogConfirmDeleteOneAsset==true){
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
                this.$refs["txtSearchAsset"].setFocus();
                this.$refs['mTable'].cancelCheckbox();
            }else if(this.isShowDialogConfirmDeleteMultiAsset==true){
                //-->ẩn đi dialog xác nhận xóa nhiều tái sản
                this.isShowDialogConfirmDeleteMultiAsset = false;
                // duyệt mảng các tài sản cần xóa
                for(let i =0;i<checkboxSelected.length;i++){
                    // lấy id của từng tài sản cần xóa
                    let id = checkboxSelected[i].fixed_asset_id;
                    //xóa tài sản tương ứng với id đó
                    this.deleteAsset(id);
                    if(this.invalid){
                        break;
                    }
                }
                this.$refs["txtSearchAsset"].setFocus();
                this.$refs['mTable'].cancelCheckbox();
            }
            
        },
        /**
         * Hàm gọi api xóa tài sản
         * @author LTVIET (06/03/2023) 
         */
        deleteAsset(id){
            axios.delete(`${this.assetApi}/${id}`)
            .then(res=>{
                console.log(res);
                //gọi hàm load lại dữ liệu table
                this.keyTable = ++this.keyTable;
                
                //hiển thị dialog thông báo xóa thành công
                this.isButtonUndo = true;
                this.isButtonClose = true;
                this.notifyToastSuccess = resourceJS.toastSuccess.success;
                this.contentToastSuccess = resourceJS.toastSuccess.deleteSuccess;
                this.isShowToastSucess = true;
                //--> thực hiện hành động xóa 1 tài sản
                setTimeout(this.closeToastSucess,5000);
            })
            .catch(error=>{
                console.log(error);
                if(!this.invalid){
                    this.handleEventErrorAPI(error);
                    
                }
            })
            
        },

        /**
         * Hàm xử lý sự kiện gặp lỗi khi gọi API
         * @param {*} error Lỗi cần xử lý
         * @author LTVIET(04/03/2023)
         */
         handleEventErrorAPI(error){
            this.invalid=true;
            console.log(error);
            this.isShowLoad = false;
            if(error.code == "ERR_NETWORK"){
                this.isShowDialogNotifyDelete = true;
                this.contentDialogNotifyDelete = resourceJS.errorMsg.errorConnection;
            }
            else{
                let errorData = error.response.data;
                let message = errorData.UserMsg;
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
        handlerEventSaveForm(){
            this.isShowForm = false;
            this.isButtonUndo = false;
            this.isButtonClose = false;
            this.contentToastSuccess = resourceJS.toastSuccess.saveSuccess;
            this.isShowToastSucess = true;
            this.isShowLoad = true;
            this.$refs['mTable'].loadData();
            setTimeout(this.isShowLoad=false,5000);
        },
        /**
         * Hàm xử lý sự kiện khi click btn xuất ra excel
         * @author LTVIET (06/03/2023) 
         */
        handlerEventClickBtnExcel(){
            this.generateExcelFile();
        },

        generateExcelFile(){
            this.isShowLoad = true;
            axios.get(`${this.exportExcelApi}/fixedAssetCatagortId=${this.assetCategoryId}&keyword=${this.keyword}&departmentId=${this.departmentId}`)
            .then(res => {
                console.log(res.data);
                this.isButtonUndo = false;
                this.isButtonClose = true;
                this.notifyToastSuccess = resourceJS.toastSuccess.success;
                this.contentToastSuccess = resourceJS.toastSuccess.exportExcel;
                this.linkExcel = res.data;
                this.isShowLoad=false;
                this.isShowToastSucess=true;
                setTimeout(() => {
                    this.isShowToastSucess=false;
                }, 5000);
            })
            .catch(error => {
                console.log(error);
                if(error.code == "ERR_NETWORK"){
                    this.isShowDialogNotifyDelete = true;
                    this.contentDialogNotifyDelete = resourceJS.errorMsg.errorConnection;
                }
                else{
                    this.isShowLoad = false;
                    this.isShowDialogNotifyDelete = true;
                    this.contentDialogNotifyDelete = resourceJS.errorMsg.exportExcelFailed;
                }
            })
        },

        getValueAssetCategory(value){
            console.log("assetCategoryId:",value);
            this.keyTable = ++this.keyTable;
            if(!value){
                this.assetCategoryId = "";
            }

        },
        getValueDepartment(value){
            this.keyTable = ++this.keyTable;
            console.log("departmentID:",value);
            if(!value){
                this.departmentId = "";
            }
        },
        handleEventCloseDialogNotifyDelete(){
            this.isShowDialogNotifyDelete = false;
            this.$refs["txtSearchAsset"].setFocus();
        },

        addOnClickAssetList(){
            this.$refs["mTable"].isShowContextMenu = false;
        },
        
        /**
         * Hàm xử lý sự kiện khi click vào context menu
         * @param {*} values các giá trị truyền vào (index, item)
         * @author LTVIET (25/03/2023)
         */
        handleEventClickContextMenu(values){
            let index = values[1];
            let item = values[0];
            let codeAsset = item.fixed_asset_code;
            let nameAsset = item.fixed_asset_name;
            switch (index) {
                case enumJS.contextMenu.add:
                    this.btnClickOpenForm();
                    break;
                case enumJS.contextMenu.clone:
                    this.labelForm = resourceJS.titlteForm.cloneAssetForm;
                    this.typeForm = resourceJS.typeForm.clone;
                    this.getNewCode();
                    this.isShowForm = true;
                    this.assetInput = item;
                    break;
                case enumJS.contextMenu.edit:
                    this.labelForm = resourceJS.titlteForm.editAssetForm;
                    this.typeForm = resourceJS.typeForm.edit;
                    this.isShowForm = true;
                    this.assetInput = item;
                    break;
                case enumJS.contextMenu.delete:
                    this.contentDialogConfirmDeleteOneAsset = resourceJS.confirm.oneAssetDelete;
                    this.contentColorAfter = `<<${codeAsset} - ${nameAsset}>>`;
                    this.contentAfterDialogConfirmDeleteOneAsset = "?";
                    this.colorTextAfter = 'black';
                    this.isShowDialogConfirmDeleteOneAsset = true;
                    this.$refs["mDialogConfirmDeleteOneAsset"].setFocus();
                    this.contextMenuItemDelete = item;
                    this.contextMenuDelete = true;
                    break;
                default:
                    break;
            }
        }
    },
    
    async created() {
        // Gọi api lấy đữ liệu trả về danh sách tài sản
        axios.get(this.assetApi)
        .then(res=>{
            this.assetsDelete = res.data;
        })
        .catch(error=>{
            console.log(error);
            this.invalid = true;
        })
        
    },
    mounted() {
        // mặc định focus vào input tìm kiếm khi load trang
        this.$nextTick(function() {
            this.$refs["txtSearchAsset"].setFocus();
        })
        
    },

}
</script>

<style scoped>

</style>