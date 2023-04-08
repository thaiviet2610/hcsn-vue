<template>
    <!-- <div class="body"> -->
    <div class="main" @click="addOnClickAssetList" >
        <!-- phần content  -->
        <div class="content">
            <div class="content-header">
                <div class="content-header__left">
                    <!-- input tìm kiếm tài sản  -->
                    <div class="input1">
                        <MInput 
                            @keydownEnter ="handleEventKeydownEnterInputSearch"
                            :idInput="idElements[0]"
                            :ref="refElements[0]"
                            placeholder="Tìm kiếm tài sản"
                            :iconInput="true"
                            typeValue="text">
                        </MInput>
                    </div>
                    <!-- combobox lọc loại tài sản  -->
                    <div class="input1">
                        <MCombobox  
                            :isIcon="true" 
                            :api="this.assetCategoryApi"
                            :idCombobox="idElements[1]"
                            :ref="refElements[1]"
                            propName="fixed_asset_category_name" 
                            placeholder="Loại tài sản" 
                            :itemHeight = "36"
                            propValue="fixed_asset_category_id"
                            :quantityItem = "4"
                            @getInputCombobox="getValueAssetCategory">
                        </MCombobox>
                    </div>
                    <!-- combobox lọc bộ phận sử dụng  -->
                    <div class="input1">
                        <MCombobox  
                            :is-icon="true" 
                            :api="this.departApi"
                            :idCombobox="idElements[2]"
                            :ref="refElements[2]"
                            propName="department_name" 
                            placeholder="Bộ phận sử dụng" 
                            propValue="department_id"
                            :itemHeight = "36"
                            :quantityItem = "4"
                            @getInputCombobox="getValueDepartment">
                        </MCombobox>
                    </div>
                </div>
                <div class="content-header__right">
                    <!-- button thêm tài sản  -->
                    <MButton
                        :idButton="idElements[3]"
                        :ref="refElements[3]"
                        label=" + Thêm tài sản"
                        data_tooltip_bottom="Ctrl+1"
                        class="item1 btn--main"
                        @btnAddOnClickBtn="btnClickOpenForm">
                    </MButton>
                    <!-- button xuất dữu liệu ra excel  -->
                    <MButtonIcon
                        class="item2"
                        :idButtonIcon="idElements[4]"
                        :ref="refElements[4]"
                        classIcon="item2__icon--image"
                        data_tooltip_bottom="Xuất ra Excel(Ctrl+P)"
                        @addOnClickBtnIcon="addOnClicKBtnExportExcel">
                    </MButtonIcon>
                    
                    <!-- button xóa tài sản  -->
                    <MButtonIcon
                        class="item3"
                        :idButtonIcon="idElements[5]"
                        :ref="refElements[5]"
                        classIcon="item3__icon--image"
                        data_tooltip_bottom="Xóa tài sản(Ctrl+D)"
                        @addOnClickBtnIcon="btnOnClick">
                    </MButtonIcon>
                </div>
            </div>

            <div class="content-body">
                <!-- table hiển thị danh sách tài sản  -->
                <Mtable 
                    :ref="refElements[6]"
                    :idTable="idElements[6]"
                    @btnDblClickRow="handleEventDblClickRow"
                    @btnClickFunctionOpenForm="handleEventOpenForm"
                    :departmentId="departmentId"
                    :assetCategoryId="assetCategoryId"
                    :keyword="keyword"
                    :key="keyTable"
                    @addOnClickContextMenu="handleEventClickContextMenu"
                    @addOnEventMouseDown="handleEventTableMouseDown"
                    :api="this.assetFilterApi"></Mtable>
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
    <MDialog 
        ref="mDialogNotifyDelete"
        :content="contentDialogNotifyDelete"
        :buttonInfo="btnDialogNotify"
        v-if="isShowDialogNotifyDelete" 
        @onClickBtn="handleEventCloseDialogNotifyDelete">
    </MDialog>
    
    <!-- dialog xác nhận hành động xóa 1 tài sản -->
    <MDialog 
        ref="mDialogConfirmDeleteOneAsset"
        :content="contentDialogConfirmDeleteOneAsset"
        :buttonInfo="btnDialogDelete"
        v-if="isShowDialogConfirmDeleteOneAsset"
        @onClickBtn="handleEventCloseDialogDelete">
    </MDialog>
    <!-- dialog xác nhận hành động xóa nhiều tài sản -->
    <MDialog 
        ref="mDialogConfirmDeleteMultiAsset"
        :content="contentDialogConfirmDeleteMultiAsset"
        :buttonInfo="btnDialogDelete"
        v-if="isShowDialogConfirmDeleteMultiAsset"
        @onClickBtn="handleEventCloseDialogDelete">
    </MDialog>
    <!-- dialog xác nhận hành động xuất dữ liệu ra file excel -->
    <MDialog 
        ref="mDialogConfirmExportExcel"
        :content="contentDialogConfirmExportExcel"
        :buttonInfo="btnDialogExcel"
        v-if="isShowDialogConfirmExportExcel"
        @onClickBtn="handleEventClickBtnDialogExcel">
    </MDialog>
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
import commonJS from '@/js/common.js';
import resourceJS from '@/js/resourceJS.js';
import MToastSucess from '@/components/toast/MToastSucess.vue';
import MButtonIcon from '@/components/button/MButtonIcon.vue';
import axios from 'axios'
import enumJS from '@/js/enum.js';
import { saveAs } from 'file-saver';
import configJS from '@/js/config';
export default {
    name: "AssetList",
    components:{
        AssetDetail,MCombobox,Mtable,MToastSucess,MButtonIcon,
    },
    created() {
        document.addEventListener('keydown',this.handleEventKeyDown);
        document.addEventListener('keyup',this.handleEventKeyUp);
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
            assetFilterApi: configJS.api.assetFilterApi,
            assetApi: configJS.api.assetApi,
            departApi: configJS.api.departmentApi,
            assetCategoryApi: configJS.api.assetCategoryApi,
            exportExcelApi: configJS.api.exportExcelApi,
            deleteMultipleAssetApi: configJS.api.deleteMultipleAsset,
            isShowLoad: false,
            isShowToastSucess: false,
            isButtonUndo: false,
            isButtonClose: false,
            notifyToastSuccess: "",
            contentToastSuccess: "",
            departmentId:"",
            assetCategoryId: "",
            typeForm: 0,
            keyword: "",
            keyTable: 0,
            newCode: "",
            generateNewCodeApi: configJS.api.assetGenerateNewCodeApi,
            keyAssetDetail: 0,
            invalid: false,
            contextMenuDelete: false,
            contextMenuItemDelete: null,
            previousKey: "",
            previousKeyCtrl: false,
            previousKeyShift: false,
            indexDeleteStart: 0,
            indexDeleteEnd: 0,
            idElements: resourceJS.assetList.idElementAssetList,
            refElements: resourceJS.assetList.refElementAssetList ,
            btnDialogExcel: resourceJS.buttonDialog.exportExcel,
            btnDialogDelete: resourceJS.buttonDialog.delete,
            btnDialogNotify: resourceJS.buttonDialog.notify
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
            this.setFocusDefault();
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
         * Hàm thêm sự kiện click thêm tài sản
         * @param {*} title tiêu đề của form
         * @param {*} index id của đối tượng
         * @author LTVIET (02/03/2023)
         */
        btnClickOpenForm() {
            this.isShowToastSucess = false;
            this.isShowForm = true;
            this.typeForm = enumJS.typeForm.add;
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
         * @param {*} values giá trị được truyền từ lớp con (label form,id của đối tượng tài sản asset)
         * @author LTVIET (02/03/2023)
         */
        handleEventOpenForm(values) {
            this.isShowToastSucess = false;
            this.labelForm = values[0];
            if(this.labelForm == resourceJS.titlteForm.editAssetForm){
                this.typeForm = enumJS.typeForm.edit;
            }else{
                this.typeForm = enumJS.typeForm.clone;
                this.getNewCode();
            }
            this.isShowToastSucess = false;
            this.isShowForm = true;
            this.getAssetById(values[1]);
            
        },

        /**
         * Hàm gọi api lấy ra đối tượng tài sản theo id
         * @param {*} id id của đối tượng tài sản
         * @author LTVIET (06/03/2023)
         */
        getAssetById(id){
            axios.get(`${configJS.api.assetApi}/${id}`)
            .then(res=>{
                this.assetInput = res.data;
                this.keyAssetDetail = ++this.keyAssetDetail;
            })
            .catch(error => {
                let message = error.response.data.UserMsg;
                this.handleEventErrorAPI(error, message);
            })
        },

        /**
         * Hàm xử lý sự kiện mở form chi tiết tài sản khi double click vào 1 dòng của table
         * @param {*} id id của đối tượng tài sản asset được chọn
         * @author LTVIET (02/03/2023)
         */
        handleEventDblClickRow(id){
            this.isShowToastSucess = false;
            this.isShowForm = true;
            this.getAssetById(id);
            this.typeForm = enumJS.typeForm.edit;
            this.labelForm = resourceJS.titlteForm.editAssetForm;
        },

        /**
         * Hàm xử lý sự kiện click button xóa tài sản
         * @author LTVIET (02/03/2023)
         */
        btnOnClick(){
            //1. lấy số lượng checkbox = true từ table
            this.quantityCheckbox = this.$refs[this.refElements[6]].quantityCheckbox;
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
            let asset = this.$refs[this.refElements[6]].getItemSelected();
            let codeAsset = asset[0].fixed_asset_code;
            let nameAsset = asset[0].fixed_asset_name;
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
            if(this.quantityCheckbox < 10){
                quantity = `0${quantity}`; 
            }
            this.contentDialogConfirmDeleteMultiAsset = resourceJS.confirm.multiAssetDelete.replace("{0}", quantity);
        },

        /**
         * Hàm set focus vào input đầu tiên của asset lít khi load lại trang
         * @author LTVIET (26/03/2023)
         */
        setFocusDefault(){
            this.$refs[this.refElements[0]].setFocus();
        },

        /**
         * Hàm xử lý sự kiện click vào button của dialog xác nhận hành động xóa
         * @param {*} label label của button muốn click
         * @author LTVIET (02/03/2023)
         */
        handleEventCloseDialogDelete(label) {
            // 1.Nếu click button "Không"
            if(label == this.btnDialogDelete[1][0]){
                if(this.isShowDialogConfirmDeleteOneAsset==true){
                    //--> ẩn đi dialog xác nhận xóa 1 tái sản
                    this.isShowDialogConfirmDeleteOneAsset = false;
                }else if(this.isShowDialogConfirmDeleteMultiAsset==true){
                    //-->ẩn đi dialog xác nhận xóa nhiều tái sản
                    this.isShowDialogConfirmDeleteMultiAsset = false;
                }
                this.setFocusDefault();
                return;
            }
            // 2.Nếu click button "Xóa"
            let checkboxSelected = this.$refs[this.refElements[6]].getItemSelected();
            if(this.isShowDialogConfirmDeleteOneAsset==true){
                // 2.1. Nếu xóa 1 tài sản
                this.handleEventCloseDialogDeleteOne(checkboxSelected[0]);
            }else if(this.isShowDialogConfirmDeleteMultiAsset==true){
                // 2.2. Nếu xóa nhiều tài sản
                this.handleEventCloseDialogDeleteMultiple(checkboxSelected);
            }
            this.setFocusDefault();
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
            this.$refs[this.refElements[6]].reloadTable();
            this.$refs[this.refElements[6]].checkboxActive = [];
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
            this.$refs[this.refElements[6]].reloadTable();
            this.$refs[this.refElements[6]].checkboxActive = [];
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
                this.$refs[this.refElements[6]].pageNumber = 1;
                this.$refs[this.refElements[6]].loadData();
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
                this.$refs[this.refElements[6]].pageNumber = 1;
                this.$refs[this.refElements[6]].loadData();
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
            this.setFocusDefault();
        },

        /**
         * Hàm đóng đóng form lưu và hiển thị toast message thông báo lưu thành công
         * @author LTVIET (06/03/2023) 
         */
        handleEventSaveForm(){
            this.isShowForm = false;
            this.$refs[this.refElements[6]].pageNumber = 1;
            this.$refs[this.refElements[6]].loadData();
            let message = resourceJS.toastSuccess.saveSuccess;
            this.$refs["mTable"].checkboxActive = [];
            this.showToastSucess(message);
            
        },

        /**
         * Hàm xử lý sự kiện hiển thị toast message thông báo thành công
         * @param {*} message Nội dung thông báo thành công
         * @author LTVIET (06/03/2023) 
         */
        showToastSucess(message){
            this.setFocusDefault();
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
         * Hàm xử lý sự kiện khi click btn của dialog xác nhận xuất ra file excel
         * @param {*} label label của button muốn click
         * @author LTVIET (06/03/2023) 
         */
         handleEventClickBtnDialogExcel(label){
            // Nếu click button "Không" thì ẩn dialog đi
            if(label == this.btnDialogExcel[1][0]){
                this.isShowDialogConfirmExportExcel = false;
                return;
            }
            // Nếu click button "Tải xuống" thì gọi api xuất dữ liệu ra file excel
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
                this.setFocusDefault();
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
        },

        /**
         * Hàm xử lý sự kiện click phím enter để gửi keyword tìm kiếm vào table để lọc
         * @param {*} value giá trị cần tìm kiếm
         * @author LTVIET (16/03/2023)
         */
         handleEventKeydownEnterInputSearch(value){
            this.keyword = value;
            console.log("keyword:",this.keyword);
            if(!value){
                this.keyword = "";
            }
        },

        /**
         * Hàm xử lý sự kiện đóng dialog thông báo không có tài sản nào được chọn để xóa
         * @author LTVIET (12/06/2023)
         */
        handleEventCloseDialogNotifyDelete(){
            this.isShowDialogNotifyDelete = false;
            this.setFocusDefault();
        },

        /**
         * Hàm xử lý sự kiện ẩn đi contextmenu khi click vào asset list
         * @author LTVIET (26/06/2023)
         */
        addOnClickAssetList(){
            this.$refs[this.refElements[6]].isShowContextMenu = false;
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
            this.typeForm = enumJS.typeForm.clone;
            this.getNewCode();
            this.isShowToastSucess = false;
            this.isShowForm = true;
            this.getAssetById(item.fixed_asset_id);
        },

        /**
         * Hàm xử lý sự kiện click vào chức năng sửa trong context menu table
         * @param {*} item đối tượng sửa
         * @author LTVIET (28/03/2023)
         */
        addOnClickContextMenuEdit(item){
            this.labelForm = resourceJS.titlteForm.editAssetForm;
            this.typeForm = enumJS.typeForm.edit;
            this.isShowToastSucess = false;
            this.isShowForm = true;
            this.getAssetById(item.fixed_asset_id);
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
        handleEventKeyDown(event){
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
                    case enumJS.keyAlt:
                        event.preventDefault();
                        console.log(keyCode);
                        this.$refs[this.refElements[6]].markCheckboxAll();
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
                    let table = this.$refs[this.refElements[6]];
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
                let table = this.$refs[this.refElements[6]];
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
                table.handleEventClickFunction(resourceJS.titlteForm.cloneAssetForm,asset[0]);
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
            let quantityCheckbox = table.quantityCheckbox;
            event.preventDefault();
            if(quantityCheckbox == 1){
                let asset = table.getItemSelected();
                table.handleEventClickFunction(resourceJS.titlteForm.editAssetForm,asset[0]);
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
            this.setFocusDefault();
        })
        
    },

}
</script>

<style scoped>

</style>