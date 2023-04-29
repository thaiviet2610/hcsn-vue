<template>
    <div class="main" :key="keyBody" style="min-width: 719px;outline: none;" :tabindex="0" @keydown="handleEventKeyDown" @keyup="handleEventKeyUp">
        <div class="content" style="padding-bottom: 0;">
            <div class="content-header">
                <div class="content-header__left">
                    <div class="asset_increment--text1" >Ghi tăng tài sản</div>
                </div> 
                <div class="content-header__right" >
                    <!-- button thêm tài sản chứng từ -->
                    <MButton
                        label="Thêm"
                        class="item1 btn--main"
                        @btnAddOnClickBtn="btnClickOpenAddAssetIncrementForm">
                    </MButton>
                    <div class="asset_increment--item1" style="position: relative;" v-outside="handleEventClickOutsideInterfaceSelected">
                        <MButtonIcon
                            class="asset_increment--icon12"
                            :classImage="classInterface"
                            classIcon="asset_increment--item12"
                            @addOnClickBtnIcon="handleEventOpenInterfaceSeleceted"
                            >
                        </MButtonIcon>
                        <div v-if="isShowInterfaceSelecte" class="interface__container">
                            <div @click="handleEventClickVerticalInterFace" class="interface__item">
                                <div class="vertical_interface"></div>
                                <div>Giao diện dọc</div>
                            </div>
                            <div @click="handleEventClickHorizontalInterFace" class="interface__item">
                                <div class="horizontal_interface"></div>
                                <div>Giao diện ngang</div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- button xóa tài sản  -->
                    
                </div>
            </div>
            <splitpanes class="asset-increment-list-container" horizontal 
                :class="classSplitpanes" 
                @resize="handleEventResizeSplitpanes">
                    <Pane :size="paneSize" >
                        <div min-size="0" class="asset_increment__content-body--up" style="border: none;box-shadow: none">
                            <div class="content-body__up">
                                <div class="input1">
                                    <MInput 
                                        ref="refSearch"
                                        placeholder="Tìm kiếm tài sản"
                                        :iconInput="true"
                                        @getValueEventInput="handleEventGetValueInputSearch"
                                        @keyDownEnter="handleEventEnterGetValueInputSearch">
                                    </MInput>
                                </div>
                                <div class="content-body__up--right">
                                    <div v-if="isShowDeleteButton" style="position: relative;" class="function__delete--multiple">
                                        <!-- button xóa nhiều  -->
                                        <MButtonIcon
                                            classIcon="function__delete "
                                            @addOnClickBtnIcon="addOnClickBtnDeleteMultiple">
                                        </MButtonIcon>
                                        <MTooltip
                                            :text="tooltipBtnDelete"
                                            class="asset-list-btn-delete-tooltip"
                                        ></MTooltip>
                                    </div>
                                    <div class="asset_increment--item2">
                                        <div class="print">
                                            <div class="asset_increment--item21"></div>
                                            <MTooltip
                                                    :text="tooltipPrint"
                                                    class="asset_increment--item21-tooltip">
                                            </MTooltip>
                                        </div>
                                        <div class="see-more">
                                            <div class="asset_increment--icon22">
                                                <div class="asset_increment--item22"></div>
                                            </div>
                                            <MTooltip
                                                    :text="tooltipSeeMore"
                                                    class="asset_increment--item22-tooltip">
                                            </MTooltip>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div style="width: 100%;height: calc(100% - 59px);position: relative;">
                                <MTable 
                                ref="mTableMaster"
                                :tableInfo="tableMasterInfo"
                                :dataPageSize="dataPageSizeTableMaster"
                                :dataHeader="dataHeaderTableMaster"
                                :dataBody="dataBodyTableMaster"
                                :dataFooter="dataFooterTableMaster"
                                :totalRecord="totalRecordTableMaster"
                                :valuePageNumber="pageNumberTableMaster"
                                :selectedFirtRow="true"
                                :valuePageSize="pageSizeTableMaster"
                                :isPaging="true"
                                :isCheckbox="true"
                                :isFunction="true"
                                :isContextmenu="true"
                                :dataEntities="dataAssetIncrements"
                                :key="keyTableMaster"
                                @getValuePageNumber="getValuePageNumber"
                                @getValuePageSize="getValuePageSize"
                                @getQuantityItemSelected="getQuantityAssetIncrementSelected"
                                @btnClickFunctionOpenForm="handleEventClickFunctionTableMaster"
                                @getItemRowSelected="getAssetIncrementSelected">
                                </MTable>
                                <MDialogLoadData v-if="isShowLoadTableMaster" style="width: 100%;height: 100%;"></MDialogLoadData>

                            </div>
                        </div>
                    </Pane>
                    
                    <Pane :size="100 - paneSize">
                        <div class="asset_increment__content-body--down" style="border: none;box-shadow: none" >
                            <div class="content-body__down">
                                <div class="asset_increment--text2">Thông tin chi tiết
                                </div>

                                <div class="asset_increment--item3" style="position: relative;">
                                    <MButtonIcon
                                        classIcon="icon--full_screen"
                                        @addOnClickBtnIcon="handleEventClickBtnFullScreen">
                                    </MButtonIcon>
                                    <MTooltip
                                        :text="tooltipFullScreen"
                                        class="full-screen-tooltip">
                                    </MTooltip>
                                </div>
                            </div>
                            <div style="width: 100%;height: calc(100% - 40px);">
                                <MTable 
                                    ref="MTableDetail"
                                    :tableInfo="tableDetailInfo"
                                    :dataHeader="dataHeaderTableDetail"
                                    :dataBody="dataBodyTableDetail"
                                    :isCheckbox="false"
                                    :isFunction="true"
                                    :isContextmenu="true"
                                    :dataEntities="dataAssets"
                                    :isFooter="false"
                                    :key="keyTableDetail">
                                </MTable>
                                <MDialogLoadData v-if="isShowLoadTableDetail" style="width: 100%;height: 100%;"></MDialogLoadData>
                            </div>
                        </div>
                    </Pane>
            </splitpanes>
            
        </div>
    </div>
    <AssetIncrementDetail
     v-if="isShowDetail"
     :propAssetIncrementCode="newVoucherCode"
     :assetIncrementInput="assetIncrement"
     :labelForm="labelForm"
     :typeForm="typeForm"
     :key="keyAssetIncrementDetail"
     @onClose="handleEventCloseFormAssetIncrementDetail"
     @addOnClickBtnSaveAssetIncrement="handleEventSaveAssetIncrement"
     >
    </AssetIncrementDetail>
    <MDialogLoadData v-if="isShowLoad"></MDialogLoadData>

    <MDialog 
        ref="mDialogNotifyDelete"
        :content="contentDialogNotify"
        :buttonInfo="btnDialogNotify"
        v-if="isShowDialogNotify" 
        @onClickBtn="handleEventCloseDialogNotify">
    </MDialog>

    <!-- dialog xác nhận hành động xóa 1 tài sản -->
    <MDialog 
        ref="mDialogConfirmDeleteOneAsset"
        :content="contentDialogConfirmDeleteOneAssetIncrement"
        :buttonInfo="btnDialogDelete"
        v-if="isShowDialogConfirmDeleteOneAssetIncrement"
        @onClickBtn="handleEventCloseDialogDelete">
    </MDialog>
    <!-- dialog xác nhận hành động xóa nhiều tài sản -->
    <MDialog 
        ref="mDialogConfirmDeleteMultiAsset"
        :content="contentDialogConfirmDeleteMultiple"
        :buttonInfo="btnDialogDelete"
        v-if="isShowDialogConfirmDeleteMultiple"
        @onClickBtn="handleEventCloseDialogDelete">
    </MDialog>

    <MToastSucess 
        v-if="isShowToastSuccess"
        :notify="notifyToastSuccess"
        :content="contentToastSuccess"
        :buttonUndo="false"
        :buttonClose="true"
        @onClose="closeToastSucess"
        >
    </MToastSucess>
    <!-- dialog hiển thị đang load dữ liệu  -->


</template>

<script>
import MButton from '@/components/button/MButton.vue';
import configJS from '@/js/config';
import resourceJS from '@/js/resourceJS';
import AssetIncrementDetail from '../assetIncrementDetail/AssetIncrementDetail.vue';
import { Splitpanes, Pane } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'
import axios from 'axios';
import enumJS from '@/js/enum';
import commonJS from '@/js/common';
export default {
    name:"AssetIncrementList",
    components:{
        MButton,
        AssetIncrementDetail,
        Splitpanes,
        Pane
    },
    data() {
        return {
            isShowLoadTableDetail: false,
            isShowLoadTableMaster: false,
            isShowDeleteButton: false,
            isShowToastSuccess: false,
            isShowDetail: false,
            isShowLoad: false,
            isShowInterfaceSelecte: false,
            isShowDialogConfirmDeleteOneAssetIncrement: false,
            isShowDialogConfirmDeleteMultiple: false,
            isShowDialogNotify: false,
            btnDialogDelete: resourceJS.buttonDialog.delete,
            btnDialogNotify: resourceJS.buttonDialog.notify,
            contentDialogConfirmDeleteOneAssetIncrement:"",
            contentDialogConfirmDeleteMultiple: "",
            contentDialogNotify: "",
            notifyToastSuccess: "",
            contentToastSuccess: "",
            assetIncrementFilterApi: configJS.api.assetIncrement.assetIncrementFilterApi,
            assetIncrementApi: configJS.api.assetIncrement.assetIncrementApi,
            assetIncrementGenerateNewCodeApi: configJS.api.assetIncrement.assetIncrementGenerateNewCodeApi,
            tableMasterInfo: resourceJS.table.tableAssetIncrementMaster,
            tableDetailInfo: resourceJS.table.tableDetailAssetIncrementList,
            keyTableMaster: 0,
            keyTableDetail: 0,
            paneSize: 60,
            keyword: "",
            tooltipFullScreen: resourceJS.tooltip.assetIncrementList.zoomIn,
            tooltipSeeMore: resourceJS.tooltip.assetIncrementList.seeMore,
            tooltipPrint: resourceJS.tooltip.assetIncrementList.print,
            classInterface: "horizontal_interface",
            checkPanSize: enumJS.paneSize.diffrentPercent,
            newVoucherCode: "",
            keyAssetIncrementDetail: 0,
            keyBody: 0,
            assetIncrement: null,
            assetIncrements: [],
            labelForm: "",
            typeForm: "",
            classSplitpanes: "",
            assets: [],
            assetsDeleteMultiple: [],
            contextMenuDelete: false,
            dataBodyTableMaster: [],
            dataFooterTableMaster: [],
            dataHeaderTableMaster: resourceJS.table.tableAssetIncrementMaster.header,
            dataPageSizeTableMaster: resourceJS.table.tableAssetIncrementMaster.dataPageSize,
            pageSizeTableMaster: 0,
            pageNumberTableMaster: 1,
            totalRecordTableMaster: 0,
            dataBodyTableDetail: [],
            dataHeaderTableDetail: resourceJS.table.tableDetailAssetIncrementList.header,
            dataAssetIncrements: [],
            dataAssets: [],
            tooltipBtnDelete: resourceJS.tooltip.assetIncrementList.btnDeleteMultiple,
            previousKeyCtrl: false,
            previousKeyShift: false,
        }
    },
    created() {
        this.pageSizeTableMaster = Number(this.dataPageSizeTableMaster[0]);
        this.getDataTableMaster();

    },
    watch: {
        checkPanSize: function(newValue){
            switch (newValue) {
                case 0:
                    this.classSplitpanes = "pansize1";
                    break;
                case 1:
                    this.classSplitpanes = "pansize2";
                    break;
            
                default:
                    this.classSplitpanes = "";
                    break;
            }
        }
    },
    mounted() {
        this.$refs["mTableMaster"].selectedRowTable(1);
        this.setFocusDefault();
    },
    methods: {
        /**
         * Hàm xử lý sự kiện khi ẩn đi danh sách chọn giao diện khi click ra ngoài
         * @author LTVIET (15/04/2023)
         */
        handleEventClickOutsideInterfaceSelected(){
            this.isShowInterfaceSelecte = false;
        },

        /**
         * Hàm nhận giá trị pageSize khi chọn giá trị trong dropdown trong table master
         * @param {*} value giá trị của pageSize
         * @author LTVIET (15/04/2023)
         */
         getValuePageSize(value){
            this.pageSizeTableMaster = value;
            this.getDataTableMaster();
            this.$refs["mTableMaster"].checkboxActive = [];
            this.$refs["mTableMaster"].entityCheckboxActive = [];
        },

        /**
         * Hàm nhận giá trị pageNumber khi chọn giá trị khi chuyển trang trong table master
         * @param {*} value giá trị của pageNumber
         * @author LTVIET (15/04/2023)
         */
        getValuePageNumber(value){
            this.pageNumberTableMaster = value;
            this.getDataTableMaster();
        },

        handleEventKeyDown(event){
            const keyCode = event.keyCode;
            if(keyCode == enumJS.keyCtrl){
                this.previousKeyCtrl = true;
            }
            if(this.previousKeyCtrl){
                event.preventDefault();
                if(keyCode == enumJS.key1){
                    this.btnClickOpenAddAssetIncrementForm();
                }
            }
            
        },

        handleEventKeyUp(event){
            const keyCode = event.keyCode;
            if(keyCode == enumJS.keyCtrl){
                this.previousKeyCtrl = false;
            }
        },


        /**
         * Hàm gọi api lấy dư liệu của table master
         * @author LTVIET (15/04/2023)
         */
         getDataTableMaster(){
            const api = this.getAssetIncrementFilterApi();
            this.isShowLoadTableMaster = true;
            axios.get(api)
            .then(res=>{
                this.assetIncrements = res.data.Data;
                this.dataBodyTableMaster = this.assetIncrements.map(function(assetIncrement){
                    return {
                        index: assetIncrement.index,
                        voucher_code: assetIncrement.voucher_code,
                        voucher_date: commonJS.formatDate(assetIncrement.voucher_date,"",resourceJS.date.format.ddMMyyyy),
                        increment_date: commonJS.formatDate(assetIncrement.increment_date,"",resourceJS.date.format.ddMMyyyy),
                        price: commonJS.formatNumber(Math.round(assetIncrement.price)),
                        description: assetIncrement.description,
                    }
                })
                this.dataFooterTableMaster = [
                    commonJS.formatNumber(Math.round(res.data.PriceTotal)),
                ];
                this.totalRecordTableMaster = res.data.TotalRecord;
                this.dataAssetIncrements = res.data.Data;
                this.$refs["mTableMaster"].totalRecord = this.totalRecordTableMaster;
                this.$refs["mTableMaster"].getUnitData();
                if(this.assetIncrements.length > 0){
                    const quantityAssetIncrementActive = this.$refs["mTableMaster"].getEntityCheckboxActiveList().length;
                    if(quantityAssetIncrementActive == 0){
                        this.$refs["mTableMaster"].selectedRowTable(1);
                        this.getAssetIncrementDetailById(this.assetIncrements[0]);
                    }
                }else{
                    this.dataBodyTableDetail = [];
                    this.keyTableDetail = ++this.keyTableDetail;
                }
                this.isShowLoadTableMaster = false;

            })
            .catch(err=>{
                console.log(err);
                this.isShowLoadTableMaster = false;
            })
        },
        

        /**
         * Hàm xử lý sự kiện lấy ra giá trị api từ keyword,departmentId,assetCategoryId
         * @author LTVIET (15/04/2023)
         */
         getAssetIncrementFilterApi(){
            let api = configJS.api.assetIncrement.assetIncrementFilterApi.replace("{0}",this.pageSizeTableMaster);
            api = api.replace("{1}",this.pageNumberTableMaster);
            api = api.replace("{2}",this.keyword);
            return api;
        },

        /**
         * Hàm theo dõi sự thay đổi kích thước của splitpanes
         * @param {*} event sự kiện cần theo dõi
         * @author LTVIET (19/04/2023)
         */
        handleEventResizeSplitpanes(event){
            if(event[0].size == enumJS.percent.zero){
                this.checkPanSize = enumJS.paneSize.zeroPercent;
            }else if(event[0].size == enumJS.percent.oneHundred){
                this.checkPanSize = enumJS.paneSize.oneHundredPercent;
            }
            else{
                this.checkPanSize = enumJS.paneSize.diffrentPercent;
            }
        },
        /**
         * Hàm xử lý sự kiện đóng giao diện tài sản ghi tăng chi tiết
         * @author LTVIET (19/04/2023)
         */
        handleEventCloseFormAssetIncrementDetail(){
            this.$refs["mTableMaster"].selectedRowTable(1);
            this.isShowDetail = false;
            this.setFocusDefault();
        },

        /**
         * Hàm xử lý sự kiện hiển thị form thêm chứng từ mới
         * @author LTVIET (19/04/2023)
         */
        btnClickOpenAddAssetIncrementForm(){
            this.isShowDetail = true;
            this.labelForm = resourceJS.titlteForm.assetIncrement.addForm;
            this.typeForm = enumJS.type.add;
            this.GenerateNewVoucherCode();
        },

        /**
         * Hàm xử lý sự kiện hiển thị danh sách lựa chọn loại giao diện (giao diện ngang, giao diện dọc)
         * @author LTVIET (19/04/2023)
         */
        handleEventOpenInterfaceSeleceted(){
            this.isShowInterfaceSelecte = !this.isShowInterfaceSelecte;
        },

        /**
         * Hàm set focus vào input đầu tiên của asset increment list khi load lại trang
         * @author LTVIET (19/04/2023)
         */
        setFocusDefault(){
            this.$nextTick(function(){
                this.$refs["refSearch"].setFocus();
            });
        },

        /**
         * Hàm xử lý sự kiện hiển thị giao diện table tài sản chứng từ chi tiết hiển thị toàn bộ giao diện
         * @author LTVIET (19/04/2023)
         */
        handleEventClickBtnFullScreen(){
            if(this.paneSize != enumJS.percent.zero){
                this.paneSize = enumJS.percent.zero;
                this.checkPanSize = enumJS.paneSize.zeroPercent;
                this.tooltipFullScreen = resourceJS.tooltip.assetIncrementList.zoomOut;
            }
            else{
                this.paneSize = 60;
                this.checkPanSize = enumJS.paneSize.diffrentPercent;
                this.tooltipFullScreen = resourceJS.tooltip.assetIncrementList.zoomIn;
            }
        },

        /**
         * Hàm gọi api để sinh ra mã chứng từ mới
         * @author LTVIET (22/04/2023)
         */
        GenerateNewVoucherCode(){
            this.isShowLoad = true;
            axios.get(this.assetIncrementGenerateNewCodeApi)
            .then(res=>{
                this.newVoucherCode = res.data;
                this.keyAssetIncrementDetail = ++this.keyAssetIncrementDetail;
                this.isShowLoad = false;
            })
            .catch(err=>{
                console.log(err);
                this.isShowLoad = false;
            })
        },

        /**
         * Hàm xử lý sự kiện click vào button của dialog xác nhận hành động xóa
         * @param {*} index index của button muốn click
         * @author LTVIET (02/03/2023)
         */
         handleEventCloseDialogDelete(index) {
            //1.Nếu click button "Không"
            if(index == this.btnDialogDelete[1][2]){
                if(this.isShowDialogConfirmDeleteOneAssetIncrement==true){
                    //--> ẩn đi dialog xác nhận xóa 1 tái sản
                    this.isShowDialogConfirmDeleteOneAssetIncrement = false;
                }else if(this.isShowDialogConfirmDeleteMultiple==true){
                    //-->ẩn đi dialog xác nhận xóa nhiều tái sản
                    this.isShowDialogConfirmDeleteMultiple = false;
                }
                this.setFocusDefault();
                return;
            }
            // 2.Nếu click button "Xóa"
            // let checkboxSelected = this.$refs[this.refElements.table].getItemSelected();
            if(this.isShowDialogConfirmDeleteOneAssetIncrement==true){
                // 2.1. Nếu xóa 1 tài sản
                this.handleEventCloseDialogDeleteOne(this.assetsDeleteMultiple[0]);
            }else if(this.isShowDialogConfirmDeleteMultiple==true){
                // 2.2. Nếu xóa nhiều tài sản
                this.handleEventCloseDialogDeleteMultiple(this.assetsDeleteMultiple);
            }
            this.setFocusDefault();
        },

        /**
         * Hàm xử lý sự kiện đóng dialog thông báo
         * @author LTVIET (12/06/2023)
         */
         handleEventCloseDialogNotify(){
            this.isShowDialogNotify = false;
            this.setFocusDefault();
        },

        /**
         * Hàm xử lý sự kiện xóa 1 tài sản
         * @param {*} assetIncrement Đối tượng chứng từ cần xóa
         * @author LTVIET (06/03/2023) 
         */
         handleEventCloseDialogDeleteOne(assetIncrement){
            //--> ẩn đi dialog xác nhận xóa 1 tái sản
            this.isShowDialogConfirmDeleteOneAssetIncrement = false;
            //lấy id tài sản cần xóa
            let id = "";
            if(this.contextMenuDelete){
                id = this.contextMenuItemDelete.voucher_id;
            }else{
                id = assetIncrement.voucher_id;
            }
            //gọi hàm xóa tài sản
            if(id){
                this.deleteAssetIncrementById(id);
            }
            this.$refs["mTableMaster"].reloadTable();
            this.$refs["mTableMaster"].checkboxActive = [];
        },

        /**
         * Hàm xử lý sự kiện xóa nhiều chứng từ
         * @param {*} assetIncrements Danh sách các chứng từ cần xóa
         * @author LTVIET (06/03/2023) 
         */
         handleEventCloseDialogDeleteMultiple(assetIncrements){
            //-->ẩn đi dialog xác nhận xóa nhiều chứng từ
            this.isShowDialogConfirmDeleteMultiple = false;
            let ids = [];
            // duyệt mảng các chứng từ cần xóa
            for(let i =0;i<assetIncrements.length;i++){
                // lấy id của từng chứng từ cần xóa
                let id = assetIncrements[i].voucher_id;
                ids.push(id);
            }
            this.deleteMultipleAsset(ids);
            this.$refs["mTableMaster"].reloadTable();
            this.$refs["mTableMaster"].checkboxActive = [];
        },

        /**
         * Hàm xử lý sự kiện hiển thị giao diện ngang
         * @author LTVIET (19/04/2023)
         */
        handleEventClickHorizontalInterFace(){
            this.paneSize = 60;
            this.checkPanSize = enumJS.paneSize.diffrentPercent;
            this.classInterface = "horizontal_interface";
            this.isShowInterfaceSelecte = false;
        },

        /**
         * Hàm xử lý sự kiện hiển thị giao diện dọc
         * @author LTVIET (19/04/2023)
         */
        handleEventClickVerticalInterFace(){
            this.paneSize = enumJS.percent.oneHundred;
            this.checkPanSize = enumJS.paneSize.oneHundredPercent;
            this.classInterface = "vertical_interface";
            this.isShowInterfaceSelecte = false;
        },

        /**
         * Hàm xử lý sự kiện lấy giá trị của input tìm kiếm khi nhấn phím enter
         * @param {*} value giá trị của input
         * @author LTVIET (19/04/2023)
         */
         handleEventEnterGetValueInputSearch(value){
            this.keyword = value;
            if(!value){
                this.keyword = "";
            }
            this.pageNumberTableMaster = 1;
            this.getDataTableMaster();
            this.$refs["mTableMaster"].checkboxActive = [];
            this.$refs["mTableMaster"].entityCheckboxActive = [];
        },

        /**
         * Hàm xử lý sự kiện khi giá trị của input rỗng thì tự động nhận tìm kiếm
         * @param {*} value giá trị của input tìm kiếm
         * @author LTVIET (19/04/2023)
         */
        handleEventGetValueInputSearch(value){
            if(value==""){
                this.handleEventEnterGetValueInputSearch(value);
            }
        },

        /**
         * Hàm xử lý sự kiện khi lưu form chứng từ chi tiết thì load lại dữu liệu table
         * @author LTVIET (19/04/2023)
         */
        handleEventSaveAssetIncrement(){
            this.handleEventCloseFormAssetIncrementDetail();
            this.isShowToastSuccess = true;
            this.notifyToastSuccess = resourceJS.toastSuccess.asset.success;
            this.contentToastSuccess = resourceJS.toastSuccess.asset.saveSuccess;
            setTimeout(() => {
                this.closeToastSucess();
            }, 3000);
            this.pageNumberTableMaster = 1;
            this.pageSizeTableMaster = Number(this.dataPageSizeTableMaster[0]);
            this.getDataTableMaster();
            this.$refs["mTableMaster"].checkboxActive = [];
            this.$refs["mTableMaster"].entityCheckboxActive = [];
            this.setFocusDefault();
        },

        /**
         * Hàm lấy ra số lượng đối tượng chứng từ được chọn trong table
         * @param {*} value số lượng được chọn
         * @author LTVIET (19/04/2023)
         */
        getQuantityAssetIncrementSelected(value){
            this.isShowDeleteButton = (value > 1) ;
            return value;
        },

        /**
         * Hàm xử lý sự kiện đóng toast message
         * @author LTVIET (19/04/2023)
         */
        closeToastSucess(){
            this.isShowToastSuccess = false;
        },
        
        /**
         * Hàm xử lý sự kiện nhận đối tượng trả về khi click vào 1 dòng của table
         * @param {*} value giá trị trả về
         * @author LTVIET (19/04/2023)
         */
        getAssetIncrementSelected(value){
            if(value){
                this.getAssetIncrementDetailById(value);
            }
            else{
                this.dataBodyTableDetail = [];
                this.keyTableDetail = ++this.keyTableDetail;
            }
            
        },

        /**
         * Hàm xử lý sự kiện click chức năng ở table chứng từ
         * @param {*} values mảng chưa các thông tin dữu liệu
         * @author LTVIET (19/04/2023)
         */
        handleEventClickFunctionTableMaster(values){
            const type = values[0];
            const item = values[1];
            if(type == enumJS.type.edit){
                this.isShowDetail = true;
                this.isShowLoad = true;
                this.labelForm = resourceJS.titlteForm.assetIncrement.editForm;
                this.typeForm = enumJS.type.edit;
                this.getAssetIncrementDetailById(item);
            }else if(type == enumJS.type.delete){
                this.assetsDeleteMultiple = [item];
                this.showDialogConfirmDeleteOne();
            }
        },

        /**
         * Hàm hiển thị dialog xác nhận xóa 1 chứng từ
         * @author LTVIET (02/03/2023)
         */
         showDialogConfirmDeleteOne(){
            // 1. lấy thông tin của tài sản đó
            let assetIncrement = this.assetsDeleteMultiple[0];
            let voucherCode = assetIncrement.voucher_code;
            // 2. hiển thị thông báo xác nhận có muốn xóa không
            let message = resourceJS.confirm.assetIncrement.oneAssetIncrementDelete.replace("{0}", voucherCode);
            this.contentDialogConfirmDeleteOneAssetIncrement = message;
            this.isShowDialogConfirmDeleteOneAssetIncrement = true;
        },

        /**
         * Hàm hiển thị dialog xác nhận xóa nhiều chứng từ
         * @author LTVIET (02/03/2023)
         */
         showDialogConfirmDeleteMultiple(){
            this.isShowDialogConfirmDeleteMultiple = true;
            let quantity = this.assetsDeleteMultiple.length;
            if(quantity < 10){
                quantity = `0${quantity}`; 
            }
            this.contentDialogConfirmDeleteMultiple = resourceJS.confirm.assetIncrement.multiAssetIncrementDelete.replace("{0}", quantity);
        },

        /**
         * Hàm gọi api xóa 1 chứng từ theo id
         * @param {*} id id chứng từ cần xóa
         * @author LTVIET (19/04/2023)
         */
        deleteAssetIncrementById(id){
            axios.delete(`${this.assetIncrementApi}/${id}`)
            .then(()=>{
                this.handleEventDeleteSuccess();
            })
            .catch(error=>{
                let message = error.response.data.UserMsg;
                this.handleEventErrorAPI(error,message);
            })
        },

        /**
         * Hàm gọi api xóa nhiều chứng từ
         * @author LTVIET (19/04/2023) 
         */
        deleteMultipleAsset(ids){
            axios.delete(this.assetIncrementApi,{
                data: Object.values(ids)
            })
            .then(()=>{
                this.handleEventDeleteSuccess();
            })
            .catch(error=>{
                let message = error.response.data.UserMsg;
                this.handleEventErrorAPI(error,message);
            })
        },

        /**
         * Hàm xử lý sự kiện click vào btn xóa nhiều chứng từ
         * @author LTVIET (19/04/2023)
         */
        addOnClickBtnDeleteMultiple(){
            const table = this.$refs["mTableMaster"];
            const assetIncrementsDelete = table.getEntityCheckboxActiveList();
            this.assetsDeleteMultiple = assetIncrementsDelete;
            this.showDialogConfirmDeleteMultiple();
        },

        /**
         * Hàm xử lý sự kiện hiển thị toast message thông báo khi xóa thành công
         * @author LTVIET (19/04/2023)
         */
        handleEventDeleteSuccess(){
            this.pageNumberTableMaster = 1;
            this.pageSizeTableMaster = Number(this.dataPageSizeTableMaster[0]);
            this.getDataTableMaster();
            this.$refs["mTableMaster"].checkboxActive = [];
            this.$refs["mTableMaster"].entityCheckboxActive = [];

            //hiển thị dialog thông báo xóa thành công
            this.isButtonUndo = false;
            this.isButtonClose = true;
            this.notifyToastSuccess = resourceJS.toastSuccess.assetIncrement.success;
            this.contentToastSuccess = resourceJS.toastSuccess.assetIncrement.deleteSuccess;
            this.isShowToastSuccess = true;
            //--> thực hiện hành động xóa 1 tài sản
            setTimeout(this.closeToastSucess,3000);
        },

        /**
         * Hàm xử lý sự kiện gặp lỗi khi gọi API
         * @param {*} error Lỗi cần xử lý
         * @param {*} message Thông báo nỗi cần xử lý
         * @author LTVIET (19/04/2023)
         */
         handleEventErrorAPI(error,message){
            console.log("error:",error);
            console.log(message);
            this.invalid=true;
            this.isShowLoad = false;
            if(error.code == "ERR_NETWORK"){
                this.isShowDialogNotify = true;
                this.contentDialogNotify = resourceJS.errorMsg.errorConnection;
            }
            else{
                this.isShowDialogNotify = true;
                this.contentDialogNotify = message;
            }
        },

        /**
         * Hàm sử lý sự kiện gọi api để lấy danh sách tài sản theo id chứng từ
         * @param {*} assetIncrement Đối tượng chứng từ cần lấy danh sách chứng từ chi tiết
         * @author LTVIET (19/04/2023)
         */
        getAssetIncrementDetailById(assetIncrement){
            if(!this.isShowDetail){
                this.isShowLoadTableDetail = true;
            }
            axios.get(`${this.assetIncrementApi}/${assetIncrement.voucher_id}`)
            .then(res=>{
                const assets = res.data.assets;
                this.dataBodyTableDetail = assets.map(function(asset){
                    return {
                        index: asset.index,
                        fixed_asset_code: asset.fixed_asset_code,
                        fixed_asset_name: asset.fixed_asset_name,
                        department_name: asset.department_name,
                        cost: commonJS.formatNumber(Math.round(asset.cost)),
                        depreciation_value: commonJS.formatNumber(Math.round(asset.depreciation_value)),
                        residual_value: commonJS.formatNumber(Math.round(asset.residual_value)),
                    }
                })
                this.keyTableDetail = ++this.keyTableDetail;
                this.isShowLoadTableDetail = false;
                if(this.isShowDetail){
                    this.assetIncrement = {
                        voucher_id: assetIncrement.voucher_id,
                        voucher_code: assetIncrement.voucher_code,
                        voucher_date: commonJS.formatDate(assetIncrement.voucher_date,"",resourceJS.date.format.yyyyMMdd),
                        increment_date: commonJS.formatDate(assetIncrement.increment_date,"",resourceJS.date.format.yyyyMMdd),
                        price: assetIncrement.price,
                        description: assetIncrement.description,
                        assets: assets
                    };
                    this.keyAssetIncrementDetail = ++this.keyAssetIncrementDetail;
                    this.isShowLoad = false;
                }
            })
            .catch(err=>{
                console.log(err);
                
            })
        },
    },
}
</script>

<style scoped>
@import url(./asset-increment-list.css);
.btn__icon{
    background-color: #ffffff;
}




html, body, #app {height: 100%;margin: 0;}
body {
  font-family: Helvetica, Arial, sans-serif;
  color: rgba(255, 255, 255, 0.6);
  font-size: 5em;
}

p {
  position: absolute;
  bottom: 5px;
  right: 5px;
  color: #666;
  z-index: 10;
  font-size: 12px;
}
</style>