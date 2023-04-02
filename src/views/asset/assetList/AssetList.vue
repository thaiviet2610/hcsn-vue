<template>
    <!-- <div class="body"> -->
    <div class="main" @click="addOnClickAssetList" @keydown="HandleEventKeyDown" @keypress="abc"
        @keyup="handleEventKeyUp">
        <!-- phần content  -->
        <div class="content">
            <div class="content-header">
                <div class="content-header__left">
                    <!-- input tìm kiếm tài sản  -->
                    <div class="input1">
                        <MInput 
                            @keydownEnter ="handleEventKeydownEnterInputSearch"
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
                        :itemHeight = 36
                        propValue="fixed_asset_category_id"
                        :quantityItem = 4
                        @getInputCombobox="getValueAssetCategory">
                    </MCombobox>
                    <!-- combobox lọc bộ phận sử dụng  -->
                    <MCombobox  
                        :is-icon="true" 
                        :api="this.departApi"
                        propName="department_name" 
                        placeholder="Bộ phận sử dụng" 
                        propValue="department_id"
                        :itemHeight = 36
                        :quantityItem = 4
                        @getInputCombobox="getValueDepartment" >
                    </MCombobox>
                </div>
                <div class="content-header__right">
                    <!-- button thêm tài sản  -->
                    <MButton
                        :isDefault="true"
                        label=" + Thêm tài sản"
                        data_tooltip_bottom="Ctrl+1"
                        class="item1"
                        @btnAddOnClickBtn="btnClickOpenForm">
                    </MButton>
                    <!-- button xuất dữu liệu ra excel  -->
                    <MButtonIcon
                        class="item2"
                        classIcon="item2__icon--image"
                        data_tooltip_bottom="Xuất ra Excel(Ctrl+P)"
                        @addOnClickBtnIcon="addOnClicKBtnExportExcel">
                    </MButtonIcon>
                    
                    <!-- button xóa tài sản  -->
                    <MButtonIcon
                        class="item3"
                        classIcon="item3__icon--image"
                        data_tooltip_bottom="Xóa tài sản (Ctrl+D)"
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
                    @addOnClickContextMenu="handleEventClickContextMenu"
                    @addOnEventMouseDown="handleEventTableMouseDown"
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
        :typeForm="typeForm"
        :key="keyAssetDetail"
        @addOnClickBtnSave="handleEventSaveForm"
        @onClose="addOnClickCloseForm">
    </AssetDetail>
    
    <!-- dialog thông báo hành động không có tài sản nào được chọn để xóa -->
    <MDialogNotify 
        ref="mDialogNotifyDelete"
        :content="contentDialogNotifyDelete"
        btnLabel="Đóng"
        v-if="isShowDialogNotifyDelete" 
        @onClose="handleEventCloseDialogNotifyDelete">
    </MDialogNotify>
    
    <!-- dialog xác nhận hành động xóa 1 tài sản -->
    <MDialogFormConfirm 
        ref="mDialogConfirmDeleteOneAsset"
        :content="contentDialogConfirmDeleteOneAsset"
        normalBtnLabel="Không"
        mainBtnLabel="Xóa"
        v-if="isShowDialogConfirmDeleteOneAsset"
        @onClickNormalBtn="handleEventCloseDialogNoDelete"
        @onClickMainBtn="handleEventCloseDialogDelete">
    </MDialogFormConfirm>
    <!-- dialog xác nhận hành động xóa nhiều tài sản -->
    <MDialogFormConfirm 
        ref="mDialogConfirmDeleteMultiAsset"
        :content="contentDialogConfirmDeleteMultiAsset"
        normalBtnLabel="Không"
        mainBtnLabel="Xóa"
        v-if="isShowDialogConfirmDeleteMultiAsset"
        @onClickNormalBtn="handleEventCloseDialogNoDelete"
        @onClickMainBtn="handleEventCloseDialogDelete">
    </MDialogFormConfirm>
    <!-- dialog xác nhận hành động xuất dữ liệu ra file excel -->
    <MDialogFormConfirm 
        ref="mDialogConfirmExportExcel"
        :content="contentDialogConfirmExportExcel"
        type="delete"
        normalBtnLabel="Không"
        mainBtnLabel="Tải xuống"
        v-if="isShowDialogConfirmExportExcel"
        @onClickNormalBtn="handleEventCloseDialogNoExportExcel"
        @onClickMainBtn="handleEventClickBtnExcel">
    </MDialogFormConfirm>
    <!-- dialog loading dữ liệu  -->
    <MDialogLoadData v-if="isShowLoad"></MDialogLoadData>
    <!-- toast message thông báo xóa thành công  -->
    <MToastSucess 
        v-if="isShowToastSucess"
        :notify="notifyToastSuccess"
        :content="contentToastSuccess"
        :buttonUndo="isButtonUndo"
        :buttonClose="isButtonClose"
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
import { saveAs } from 'file-saver';
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
            isShowDialogConfirmDeleteOneAsset: false,
            isShowDialogConfirmDeleteMultiAsset: false,
            isShowDialogConfirmExportExcel: false,
            contentDialogNotifyDelete: "",
            contentDialogConfirmExportExcel: "",
            contentDialogConfirmDeleteOneAsset: "",
            contentDialogConfirmDeleteMultiAsset: "",
            assets : [],
            assetApi: resourceJS.api.assetApi,
            departApi: resourceJS.api.departmentApi,
            assetCategoryApi: resourceJS.api.assetCategoryApi,
            exportExcelApi: resourceJS.api.exportExcelApi,
            deleteMultipleAssetApi: resourceJS.api.deleteMultipleAsset,
            isShowLoad: false,
            isShowToastSucess: false,
            isButtonUndo: false,
            isButtonClose: false,
            notifyToastSuccess: "",
            contentToastSuccess: "",
            departmentId:"",
            assetCategoryId: "",
            typeForm: "",
            keyword: "",
            keyTable: 0,
            newCode: "",
            generateNewCodeApi: resourceJS.api.assetGenerateNewCodeApi,
            keyAssetDetail: 0,
            invalid: false,
            contextMenuDelete: false,
            contextMenuItemDelete: null,
            previousKey: "",
            previousKeyCtrl: false,
            previousKeyShift: false,
            indexDeleteStart: 0,
            indexDeleteEnd: 0,
        }
    },

    watch: {
    },
    methods: {
        /**
         * Hàm xử lý sự kiện click button đóng form
         * @author LTVIET (06/03/2023)
         */
        addOnClickCloseForm(){
            this.isShowForm = false;
            this.$refs["txtSearchAsset"].setFocus();
        },
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
         handleEventKeydownEnterInputSearch(value){
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
            this.isShowToastSucess = false;
            this.isShowForm = true;
            this.assetInput = values[1];
        },

        /**
         * Hàm xử lý sự kiện mở form chi tiết tài sản khi double click vào 1 dòng của table
         * @param {*} item đối tượng tài sản asset được chọn
         * @author LTVIET (02/03/2023)
         */
        handleEventDblClickRow(item){
            this.isShowToastSucess = false;
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
            //1. lấy số lượng checkbox = true từ table
            this.quantityCheckbox = this.$refs["mTable"].quantityCheckbox;
            //2. kiểm tra số lượng 
            if(this.quantityCheckbox == 0){
                //2.1. nếu số lượng = 0 thì hiển thị thông báo không có tài sản nào được chọn để xóa
                this.showDialogNotifyDeleteNoAsset();
            }else if(this.quantityCheckbox == 1){
                //2.2. nếu nếu số lượng = 1 thì hiển thị thông báo xóa 1 tài sản
                this.showDialogConfirmDeleteOne();
            }else{
                //2.2. nếu nếu số lượng > 1 thì hiển thị thông báo xóa nhiều tài sản
                this.showDialogConfirmDeleteMultiple();
            }
        },

        /**
         * Hàm hiển thị dialog thông bóa không có tìa sản nào được chọn để xóa
         * @author LTVIET (02/03/2023)
         */
        showDialogNotifyDeleteNoAsset(){
            this.isShowDialogNotifyDelete = true;
            this.contentDialogNotifyDelete = resourceJS.notify.noAssetDelete;
        },

        /**
         * Hàm hiển thị dialog xác nhận xóa 1 tài sản
         * @author LTVIET (02/03/2023)
         */
        showDialogConfirmDeleteOne(){
            // 1. lấy thông tin của tài sản đó
            let asset = this.$refs['mTable'].getItemSelected();
            let codeAsset = asset.fixed_asset_code;
            let nameAsset = asset.fixed_asset_name;
            // 2. hiển thị thông báo xác nhận có muốn xóa không
            let message = resourceJS.confirm.oneAssetDelete.replace("{0}", codeAsset);
            message = message.replace("{1}", nameAsset);
            this.contentDialogConfirmDeleteOneAsset = message;
            this.isShowDialogConfirmDeleteOneAsset = true;
        },

        /**
         * Hàm hiển thị dialog xác nhận xóa nhiều tài sản
         * @author LTVIET (02/03/2023)
         */
         showDialogConfirmDeleteMultiple(){
            this.isShowDialogConfirmDeleteMultiAsset = true;
            let quantity = this.quantityCheckbox;
            let length = this.$refs["mTable"].assets.length;
            if(quantity==length){
                //--> Trường hợp xóa tất cả tài sản
                this.contentDialogConfirmDeleteMultiAsset = resourceJS.confirm.allAssetDelete;
            }else{
                //--> Trường hợp còn lại
                if(this.quantityCheckbox < 10){
                    quantity = `0${quantity}`; 
                }
                this.contentDialogConfirmDeleteMultiAsset = resourceJS.confirm.multiAssetDelete.replace("{0}", quantity);
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
            }else if(this.isShowDialogConfirmDeleteMultiAsset==true){
                //-->ẩn đi dialog xác nhận xóa nhiều tái sản
                this.isShowDialogConfirmDeleteMultiAsset = false;
            }
            this.$refs["txtSearchAsset"].setFocus();
        },

        


        /**
         * Hàm xử lý sự kiện click vào button xóa của dialog xác nhận hành động xóa
         * @author LTVIET (02/03/2023)
         */
        handleEventCloseDialogDelete() {
            let checkboxSelected = this.$refs['mTable'].getItemSelected();
            //1.thực hiện ẩn đi dialog và xóa tài sản trong database
            if(this.isShowDialogConfirmDeleteOneAsset==true){
                this.handleEventCloseDialogDeleteOne(checkboxSelected);
            }else if(this.isShowDialogConfirmDeleteMultiAsset==true){
                thí.handleEventCloseDialogDeleteMultiple(checkboxSelected);
            }
            this.$refs["txtSearchAsset"].setFocus();
        },

        /**
         * Hàm xử lý sự kiện xóa 1 tài sản
         * @param {*} checkboxSelected Đối tượng tài sản cần xóa
         * @author LTVIET (06/03/2023) 
         */
        handleEventCloseDialogDeleteOne(checkboxSelected){
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
            this.$refs['mTable'].cancelCheckbox();
        },

        /**
         * Hàm xử lý sự kiện xóa 1 tài sản
         * @param {*} checkboxSelected Danh sách các tài sản cần xóa
         * @author LTVIET (06/03/2023) 
         */
         handleEventCloseDialogDeleteMultiple(checkboxSelected){
            //-->ẩn đi dialog xác nhận xóa nhiều tái sản
            this.isShowDialogConfirmDeleteMultiAsset = false;
            let assetsId = [];
            // duyệt mảng các tài sản cần xóa
            for(let i =0;i<checkboxSelected.length;i++){
                // lấy id của từng tài sản cần xóa
                let id = checkboxSelected[i].fixed_asset_id;
                assetsId.push(id);
            }
            this.deleteMultipleAsset(assetsId);
            this.$refs['mTable'].cancelCheckbox();
        },

        /**
         * Hàm gọi api xóa tài sản
         * @author LTVIET (06/03/2023) 
         */
        deleteAsset(id){
            axios.delete(`${this.assetApi}/${id}`)
            .then(async res=>{
                console.log(res);
                //gọi hàm load lại dữ liệu table
                // this.keyTable = ++this.keyTable;
                this.$refs["mTable"].pageNumber = 1;
                await this.$refs["mTable"].loadData();
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
                    let message = error.response.data.UserMsg;
                    this.handleEventErrorAPI(error,message);
                }
            })
            
        },

        /**
         * Hàm gọi api xóa nhiều tài sản
         * @author LTVIET (06/03/2023) 
         */
         deleteMultipleAsset(assetsId){
            axios.delete(this.deleteMultipleAssetApi,{
                data: Object.values(assetsId)
            })
            .then( res=>{
                console.log(res);
                //gọi hàm load lại dữ liệu table
                // this.keyTable = ++this.keyTable;
                this.$refs["mTable"].pageNumber = 1;
                this.$refs["mTable"].loadData();
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
                    let message = error.response.data.UserMsg;
                    this.handleEventErrorAPI(error,message);
                }
            })
            
        },

        
        /**
         * Hàm xử lý sự kiện gặp lỗi khi gọi API
         * @param {*} error Lỗi cần xử lý
         * @param {*} message Thông báo nỗi cần xử lý
         * @author LTVIET(04/03/2023)
         */
         handleEventErrorAPI(error,message){
            console.log("error:",error);
            this.invalid=true;
            console.log(error);
            this.isShowLoad = false;
            if(error.code == "ERR_NETWORK"){
                this.isShowDialogNotifyDelete = true;
                this.contentDialogNotifyDelete = resourceJS.errorMsg.errorConnection;
            }
            else{
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
            this.$refs["txtSearchAsset"].setFocus();
        },

        /**
         * Hàm đóng đóng form lưu và hiển thị toast message thông báo lưu thành công
         * @author LTVIET (06/03/2023) 
         */
        async handleEventSaveForm(){
            this.isShowForm = false;
            this.$refs['mTable'].pageNumber = 1;
            await this.$refs['mTable'].loadData();
            let message = resourceJS.toastSuccess.saveSuccess;
            this.showToastSucess(message);
            
        },

        /**
         * Hàm xử lý sự kiện hiển thị toast message thông báo thành công
         * @param {*} message Nội dung thông báo thành công
         * @author LTVIET (06/03/2023) 
         */
        showToastSucess(message){
            this.$refs["txtSearchAsset"].setFocus();
            this.isButtonUndo = false;
            this.contentToastSuccess = message;
            this.isShowToastSucess = true;
            setTimeout(() => {
                this.isShowToastSucess=false;
            }, 3000);
        },

        /**
         * Hàm xử lý sự kiện click btn xuất file excel
         * @author LTVIET (06/03/2023)
         */
        addOnClicKBtnExportExcel(){
            this.isShowDialogConfirmExportExcel = true;
            this.contentDialogConfirmExportExcel = resourceJS.confirm.exportExcel;
        },

        /**
         * Hàm xử lý sự kiện click btn không xuất file excel trong dialog thông báo xác nhận xuất file excel
         * @author LTVIET (06/03/2023)
         */
        handleEventCloseDialogNoExportExcel(){
            this.isShowDialogConfirmExportExcel = false;
        },

        /**
         * Hàm xử lý sự kiện khi click btn xuất ra file excel
         * @author LTVIET (06/03/2023) 
         */
        handleEventClickBtnExcel(){
            this.isShowLoad = true;
            axios.get(`${this.exportExcelApi}fixedAssetCatagortId=${this.assetCategoryId}&keyword=${this.keyword}&departmentId=${this.departmentId}`,
            { responseType: "blob" })
            .then(res => {
                const blob = new Blob([res.data], {
                    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                });
                const fileName = `Assets(${this.getCurrentDate()}).xlsx`;
                saveAs(blob,fileName);
                this.isShowDialogConfirmExportExcel = false;
                this.isShowLoad=false;
                let message = resourceJS.toastSuccess.exportExcel.replace("{0}",fileName);
                this.showToastSucess(message);
            })
            .catch(error => {
                console.log(error);
                if(!this.invalid){
                    let message = resourceJS.errorMsg.exportExcelFailed;
                    this.handleEventErrorAPI(error,message);
                }
                
            })
            
        },

        /**
         * Hàm lấy ra giá trị thời gian hiện tại
         * @author LTVIET (16/03/2023)
         */
        getCurrentDate(){
            let currentDate = new Date();
            let day = currentDate.getDate();
            day = day < 10 ? `0${day}` : day;
            let month = currentDate.getMonth() + 1;
            month = month < 10 ? `0${month}` : month;
            let year = currentDate.getFullYear();
            while(year < 1000){
                year = `0${year}`;
            }
            let hours = currentDate.getHours();
            hours = hours < 10 ? `0${hours}` : hours;
            let minutes = currentDate.getMinutes() + 1;
            minutes = minutes < 10 ? `0${minutes}` : minutes;
            let seconds = currentDate.getSeconds();
            seconds = seconds < 10 ? `0${seconds}` : seconds;
            return `${day}-${month}-${year}T${hours}.${minutes}.${seconds}`;
        },

        /**
         * Hàm lấy dữ liệu từ combobox loại tài sản
         * @param {*} value giá trị của combobox
         * @author LTVIET (12/06/2023)
         */
        getValueAssetCategory(value){
            this.assetCategoryId = value;
            if(!value){
                this.assetCategoryId = "";
            }
            
            this.keyTable = ++this.keyTable;
        },

        /**
         * Hàm lấy dữ liệu từ combobox phòng ban
         * @param {*} value giá trị của combobox
         * @author LTVIET (12/06/2023)
         */
        getValueDepartment(value){
            this.departmentId = value;
            if(!value){
                this.departmentId = "";
            }
            
            this.keyTable = ++this.keyTable;
        },

        /**
         * Hàm xử lý sự kiện đóng dialog thông báo không có tài sản nào được chọn để xóa
         * @author LTVIET (12/06/2023)
         */
        handleEventCloseDialogNotifyDelete(){
            this.isShowDialogNotifyDelete = false;
            this.$refs["txtSearchAsset"].setFocus();
        },

        /**
         * Hàm xử lý sự kiện ẩn đi contextmenu khi click vào asset list
         * @author LTVIET (26/06/2023)
         */
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
            
            switch (index) {
                case enumJS.contextMenu.add:
                    this.btnClickOpenForm();
                    break;
                case enumJS.contextMenu.clone:
                    this.addOnClickContextMenuClone(item);
                    break;
                case enumJS.contextMenu.edit:
                    this.addOnClickContextMenuEdit(item);
                    break;
                case enumJS.contextMenu.delete:
                    this.addOnClickContextMenuDelete(item)
                    break;
                default:
                    break;
            }
        },

        /**
         * Hàm xử lý sự kiện click vào chức năng nhân bản trong context menu table
         * @param {*} item đối tượng nhân bản
         */
        addOnClickContextMenuClone(item){
            this.labelForm = resourceJS.titlteForm.cloneAssetForm;
            this.typeForm = resourceJS.typeForm.clone;
            this.getNewCode();
            this.isShowToastSucess = false;
            this.isShowForm = true;
            this.assetInput = item;
        },

        /**
         * Hàm xử lý sự kiện click vào chức năng sửa trong context menu table
         * @param {*} item đối tượng sửa
         * @author LTVIET (28/03/2023)
         */
        addOnClickContextMenuEdit(item){
            this.labelForm = resourceJS.titlteForm.editAssetForm;
            this.typeForm = resourceJS.typeForm.edit;
            this.isShowToastSucess = false;
            this.isShowForm = true;
            this.assetInput = item;
        },

        /**
         * Hàm xử lý sự kiện click vào chức năng xóa trong context menu table
         * @param {*} item đối tượng xóa
         * @author LTVIET (28/03/2023)
         */
        addOnClickContextMenuDelete(item){
            let codeAsset = item.fixed_asset_code;
            let nameAsset = item.fixed_asset_name;
            let message = resourceJS.confirm.oneAssetDelete.replace("{0}",codeAsset);
            message = message.replace("{1}",nameAsset);
            this.contentDialogConfirmDeleteOneAsset = message;
            this.isShowDialogConfirmDeleteOneAsset = true;
            this.contextMenuItemDelete = item;
            this.contextMenuDelete = true;
        },

        /**
         * Hàm xử lý sự kiện keyup khi bấm phím tắt
         * @param {*} event sự kiếm bấm các phím tắt
         * @author LTVIET (28/03/2023)
         */
        handleEventKeyUp(event){
            let keyCode = event.keyCode;
            if(keyCode == enumJS.keyCtrl){
                this.previousKeyCtrl = false;
            }
            if(keyCode == enumJS.keyShift){
                this.previousKeyShift = false;
                this.indexDeleteStart = 0;
                this.indexDeleteEnd = 0;
            }
        },
        
        /**
         * Hàm xử lý sự kiện keydown khi bấm phím tắt
         * @param {*} event sự kiếm bấm các phím tắt
         * @author LTVIET (28/03/2023)
         */
        HandleEventKeyDown(event){
            let keyCode = event.keyCode;
            if(keyCode == enumJS.keyCtrl){
                this.previousKeyCtrl = true;
            }
            if(keyCode == enumJS.keyShift){
                this.previousKeyShift = true;
            }
            this.handleEventKeyStrokesCtrl(event,keyCode);
            this.handleEventKeyStrokesShift(event,keyCode);
        },

        /**
         * Hàm xử lý sự kiện khi bấm tổ hợp phím Shift + keycode
         * @param {*} event Sự kiện khi bấm phím
         * @param {*} keyCode Ký tự bấm cùng phím Shift
         * @author LTVIET (29/03/2023)
         */
        handleEventKeyStrokesShift(event,keyCode){
            if(this.previousKeyShift){
                switch (keyCode) {
                    case enumJS.key1:
                        event.preventDefault();
                        this.$refs["mTable"].markCheckboxAll();
                        break;
                    default:
                        break;
                }
            }
        },

        /**
         * Hàm xử lý sự kiện khi nhấn giữa phím shift vào click vào dòng table để chọn nhiều
         * @param {*} value số vị trí của dòng trong table
         * @author LTVIET (29/03/2023)
         */
        handleEventTableMouseDown(value){
            if(value > 0){
                if(this.previousKeyShift && value > 0){
                    if(this.indexDeleteStart == 0){
                        this.indexDeleteStart = value;
                    }
                    this.indexDeleteEnd = value;
                    let table = this.$refs["mTable"];
                    table.checkbox.fill(false);
                    if(this.indexDeleteStart <= this.indexDeleteEnd){
                        for(let i = this.indexDeleteStart; i<= this.indexDeleteEnd; i++){
                            table.checkbox[i] = true;
                        }
                    }else{
                        for(let i = this.indexDeleteEnd; i<= this.indexDeleteStart; i++){
                            table.checkbox[i] = true;
                        }
                    }
                }else{
                    this.indexDeleteStart = value;
                }
            }
        },

        /**
         * Hàm xử lý sự kiện khi bấm tổ hợp phím Ctrl + keycode
         * @param {*} event Sự kiện khi bấm phím
         * @param {*} keyCode Ký tự bấm cùng phím Ctrl
         * @author LTVIET (29/03/2023)
         */
        handleEventKeyStrokesCtrl(event,keyCode){
            if(this.previousKeyCtrl){
                let table = this.$refs["mTable"];
                let quantityCheckbox = table.quantityCheckbox;
                switch (keyCode) {
                    // nếu tổ hợp phím là Ctrl+1 thì gọi đến form thêm tài sản
                    case enumJS.key1:
                        this.handleEventKeyStrokesCtrl1(event);
                        break;
                    // nếu tổ hợp phím là Ctrl+0 thì gọi đến form nhân bản tài sản
                    case enumJS.key0:
                        this.handleEventKeyStrokesCtrl0(event,table);
                        break;
                    // nếu tổ hợp phím là Ctrl+E thì gọi đến form sửa tài sản
                    case enumJS.keyE:
                        this.handleEventKeyStrokesCtrlE(event,table);
                        break;
                    // nếu tổ hợp phím là Ctrl+D thì gọi đến form xóa tài sản
                    case enumJS.keyD:
                        this.handleEventKeyStrokesCtrlD(event);
                        break;
                    // nếu tổ hợp phím là Ctrl+P thì gọi đến form xuất ra file excel
                    case enumJS.keyP:
                        this.handleEventKeyStrokesCtrlP(event);
                        break;
                    default:
                        break;
                }
            }
        },

        /**
         * Hàm xử lý sự kiện khi bấm tổ hợp phím Ctrl + 1 thì gọi đến chức năng thêm tài sản
         * @param {*} event Sự kiện khi bấm phím
         * @author LTVIET (29/03/2023)
         */
        handleEventKeyStrokesCtrl1(event){
            event.preventDefault();
            this.btnClickOpenForm();
            this.previousKeyCtrl = false;
        },

        /**
         * Hàm xử lý sự kiện khi bấm tổ hợp phím Ctrl + 0 thì gọi đến chức năng nhân bản tài sản
         * @param {*} event Sự kiện khi bấm phím
         * @param {*} table Đối tượng table
         * @author LTVIET (29/03/2023)
         */
         handleEventKeyStrokesCtrl0(event,table){
            let quantityCheckbox = table.quantityCheckbox;
            event.preventDefault();
            if(quantityCheckbox == 1){
                let asset = table.getItemSelected();
                table.handleEventClickFunction(resourceJS.titlteForm.cloneAssetForm,asset);
                this.previousKeyCtrl = false;
            }
        },

        /**
         * Hàm xử lý sự kiện khi bấm tổ hợp phím Ctrl + E thì gọi đến chức năng sửa tài sản
         * @param {*} event Sự kiện khi bấm phím
         * @param {*} table Đối tượng table
         * @author LTVIET (29/03/2023)
         */
         handleEventKeyStrokesCtrlE(event,table){
            event.preventDefault();
            if(quantityCheckbox == 1){
                let asset = table.getItemSelected();
                table.handleEventClickFunction(resourceJS.titlteForm.editAssetForm,asset);
                this.previousKeyCtrl = false;
            }
        },

        /**
         * Hàm xử lý sự kiện khi bấm tổ hợp phím Ctrl + D thì gọi đến chức năng xóa tài sản
         * @param {*} event Sự kiện khi bấm phím
         * @author LTVIET (29/03/2023)
         */
         handleEventKeyStrokesCtrlD(event){
            event.preventDefault();
            this.btnOnClick();
            this.previousKeyCtrl = false;
        },

        /**
         * Hàm xử lý sự kiện khi bấm tổ hợp phím Ctrl + P thì gọi đến chức năng xuất dữ liệu ra file excel
         * @param {*} event Sự kiện khi bấm phím
         * @author LTVIET (29/03/2023)
         */
         handleEventKeyStrokesCtrlP(event){
            event.preventDefault();
            this.addOnClicKBtnExportExcel();
            this.previousKeyCtrl = false;
        },
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