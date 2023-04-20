<template>
    <!-- thẻ label của combobox  -->
    <label v-if="label" for="">{{ label }}<span v-if="required" class="required">*</span></label>
    <!-- combobox  -->
    <div class="combobox" :style="'z-index:'+this.zIndex" :data_tooltip_top="value.length>23?value:null">
        <!-- thẻ input để nhập dữ liệu  -->
        <input 
            ref="mInputCombobox"
            type="text" 
            v-model="value"
            :placeholder="this.placeholder" 
            class="combobox_input combobox__text" 
            :class="{'input--error':inValid}" 
            autocomplete="off"
            @focus="handleEventFocusInput"
            @input="onSearchItem"
            @keydown="onKeyDownSelecte"
            @blur="onBlurInput"
            :style="this.styleInput">
        <!-- thẻ buton thực hiện chức năng hiện combobox-data  -->
        <MButtonIcon
            v-if="!isShow"
            class="combobox__button"
            @mousedown="onMouseDownInput" 
            classIcon="combobox__button--image-open"
            tabindex="-1"
            @addOnClickBtnIcon="btnOpenDropdown">
        </MButtonIcon>
        <!-- thẻ buton thực hiện chức năng ẩn combobox-data  -->
        <MButtonIcon
            v-if="isShow"
            class="combobox__button"
            @mousedown="onMouseDownInput" 
            classIcon="combobox__button--image-close"
            tabindex="-1"
            @addOnClickBtnIcon="btnCloseDropdown">
        </MButtonIcon>
        <!-- thẻ button thực hiện chức năng lọc (nếu có)  -->
        <div v-if="iconCombobox" class="combobox__icon">
            <div :class="iconCombobox"></div>
        </div>
        <!-- thẻ div hiển thị dữ liệu combobox-data  -->
        <div
            ref="mComboboxData" 
            class="combobox__data"
            @mousedown="onMouseDownInput" 
            :style="`max-height: ${(quantityItemDisplay*itemHeight + 2)}px;`" 
            v-show="isShow" >
            <div 
                :ref="`item_${index}`"
                class="combobox__data_item" 
                :style="`height: ${itemHeight}px;`"
                @click="addOnClickItem(item,index)"
                :class="{'item__selected': index == indexItemSelect}" 
                v-for="(item,index) in this.entitiesSearch" :key="index" >
                <div 
                    class="data_item--text" 
                    style="font-size: 11px;">
                        {{ item[this.propName]}}
                </div>
                <div :style="setStyleIconSelect(index)" class="data__item__icon"></div>
            </div>
            
        </div>
        
    </div>
    <!-- thẻ div hiển thị thông báo lỗi nếu có  -->
    <div v-if="inValid" class="error--info">{{ notifyError }}</div> 
    <MDialogLoadData v-if="isShowLoad"></MDialogLoadData>
    <!-- dialog thông báo có lỗi xảy ra trong quá trình load dữ liệu -->
    <MDialog
        :content="contentDialogNotifyLoadError"
        :buttonInfo="btnDialgNotify"
        v-if="isShowDialogNotifyLoadError" 
        @onClickBtn="handleEventCloseDialogNotifyLoadError">
    </MDialog>
</template>

<script>
import resourceJS from '@/js/resourceJS.js'
import enumJS from '@/js/enum.js'
import axios from 'axios'
export default {
    name:"TheCombobox",
    props: {
        iconCombobox: {
            type: String,
            default: ""
        },
        api: {
            type: String,
            default: ""
        },
        propValue: {
            type: [String,Number],
            default: ""
        },
        propName: {
            type: [String,Number],
            default: ""
        },
        placeholder: {
            type: String,
            default: ""
        },
        label: {
            type: String,
            default: ""
        },
        required: {
            type: Boolean,
            default: false
        },
        valueInput: {
            type: String,
            default: ""
        },
        quantityItemDisplay: {
            type: Number,
            default: 0
        },
        itemHeight: {
            type: Number,
            default: 0
        },
    },
    data() {
        return {
            entities: [],
            entitiesSearch: [],
            isShow: false,
            zIndex: 0,
            valueItem: "",
            styleInput: null,
            value: "",
            itemSelected: null,
            indexItemSelect: -1,
            inValid: false,
            notifyError: null,
            isShowLoad: false,
            isShowDialogNotifyLoadError: false,
            contentDialogNotifyLoadError: "",
            scrollHeight: 0,
            scrollY: 0,
            btnDialgNotify: resourceJS.buttonDialog.notify
        }
    },
    components:{
        
    },
    created(){

        /**
         * gọi api để lấy dữ liệu của đối tượng asset
         * @author LTVIET (05/03/2023)
         */
        if(this.api){
            this.isShowLoad = true;
            axios.get(this.api)
            .then(res=>{
                this.entities = res.data;
                this.entitiesSearch = res.data;
                this.setItemSelected();
                this.isShowLoad=false;
            })
            .catch(error=>{
                console.log(error);
                this.isShowLoad = false;
                this.scrollY = 0;
                this.contentDialogNotifyLoadError = resourceJS.notify.errorLoadCombobox.replace("{0}",this.label);
            })
        }

        

        /**
         * nếu combobox không có icon thì set lại style cho input
         * @author LTVIET (05/03/2023)
         */
        if (!this.iconCombobox) {
            this.styleInput = 'width: 100%; padding-right: 28px';
        }

        
    },
    watch: {
    },
    computed: {
        /**
         * Hàm tìm vị trí giá trị được chọn trong danh sách tìm kiếm dữ liệu
         * @author LTVIET (05/03/2023)
         */
        findIndexSelected: function() {
            let me = this;
            let findIndex = this.entitiesSearch.findIndex(item=>item[me.propValue] == me.itemSelected[me.propValue]);
            return findIndex;
        }
    },
    methods: {

        /**
         * Hàm thêm sự kiện click hiển thị combobox-data
         * @author LTVIET (02/03/2023)
         */
        btnOpenDropdown() {
            this.isShow = true;
            this.zIndex = 2;
            this.setFocus();
        },
        
        /**
         * Hàm thêm sự kiện click ẩn combobox-data
         * @author LTVIET (02/03/2023)
         */
        btnCloseDropdown() {
            this.isShow = false;
            if(this.value == "" || this.value == null || this.value == undefined){
                this.indexItemSelect = -1;
            }
            this.scrollY = 0;
            this.zIndex = 0;
        },
        
        /**
         * Hàm thêm sự kiện click chọn item trong combobox
         * @param {*} item đối tượng được click
         * @author LTVIET (02/03/2023)
         */
        addOnClickItem(item) {
            let me = this;
            // reset lại danh sách
            this.entitiesSearch = this.entities;
            this.itemSelected = item;
            // set index của item được chọn
            this.indexItemSelect = me.findIndexSelected;
            this.value = item[this.propName];
            if(this.value){
                this.inValid = false;
            }
            this.isShow = false;
            this.scrollY = 0;
            this.zIndex = 0;
            const value = item[this.propValue];
            this.$emit("getInputCombobox",value);
        },
        
        /**
         * Hàm set focus vào input của combobox
         * @author LTVIET (05/03/2023)
         */
        setFocus() {
            this.$nextTick(function() {
                this.$refs["mInputCombobox"].focus();
            })
        }, 

        /**
         * Hàm tìm item tương ứng với giá trị truyền từ ngoài vào và gán vào value
         * @author LTVIET (05/03/2023)
         */
        setItemSelected(){
            let me = this;
            //tìm item tương ứng với valueInput
            let entitySelected = this.entitiesSearch.find(item=>item[this.propValue] == me.valueInput);
            if(entitySelected){
                this.value = entitySelected[this.propName];
            }
        },

        /**
         * Hàm tìm kiếm giá trị tương ứng với giá trị nhập vào input và gán vào mảng tìm kiếm
         * @author LTVIET (05/03/2023)
         */
        onSearchItem() {
            if(this.value){
                this.inValid = false;
            }
            let me = this;
            this.indexItemSelect = -1;
            if(!this.value){
                this.itemSelected = null;
                this.entitiesSearch = this.entities;
            }else{
                //tìm item tương ứng với value
                this.entitiesSearch = this.entities.filter(item=>item[this.propName].toLowerCase().includes(me.value.toLowerCase()));
                this.isShow = true;
                this.zIndex = 2;
            }
            if(this.entitiesSearch.length == 0 && this.required){
                this.inValid = true;
                if(this.label){
                    this.notifyError = this.label + resourceJS.error.errorDontFindInData;
                }else{
                    this.notifyError = resourceJS.error.errorDontFindInData;
                }
            }
            if(this.value == ""){
                this.$emit("getInputCombobox","");
            }
        },

        /**
         * Hàm hiển thị icon của item được chọn trong combobox-data
         * @param {*} index vị trí của item được chọn
         * @author LTVIET (05/03/2023)
         */
        setStyleIconSelect(index){
            // nếu index bằng vị trí của item được chọn thì hiển thị icon
            if(index == this.indexItemSelect){
                return "display: block;";
            }
        },

        /**
         * Hàm xử lý sự kiện bấm các phím để lựa chọn item trong combobox
         * @param {*} event thông tin sự kiện key down
         * @author LTVIET (05/03/2023)
         */
        onKeyDownSelecte(event) {
            //1. lấy ra giá trị phím được bấm
            const key = event.keyCode;
            // Lấy ra giá trị độ dài của thanh scroll trong combobox-data
            this.scrollHeight = this.$refs["mComboboxData"].scrollHeight - 2;
            switch (key) {
                case enumJS.arrowDown:
                    this.handleEventKeyDownArrowDown();
                    break;
                case enumJS.arrowUp:
                    this.handleEventKeyDownArrowUp();
                    break;
                case enumJS.keyEnter:
                    this.handleEventKeyDownEnter();
                    break;
                }
        },

        /**
         * Hàm xử lý sự kiện nhấn phím xuống
         * @author LTVIET (05/03/2023)
         */
        handleEventKeyDownArrowDown(){
            let length = this.entitiesSearch.length;
            // Lấy ra giá trị độ dài của combobox-data
            const comboboxDataHeight = this.quantityItemDisplay*this.itemHeight;
            if(this.isShow){
                //2.1.1. nếu vị trí item được chọn không phải ở cuối cùng thì 
                //  set vị trí được chọn mới tăng lên 1 đơn vị
                if(this.indexItemSelect < (length - 1) ){
                    this.indexItemSelect += 1;
                }else{
                    //2.1.2. nếu vị trí item được chọn là ở cuối cùng thi
                    //set vị trí được chọn mới ở đầu tiên
                    this.indexItemSelect = 0;
                }
                // set vị trí thanh scroll theo theo vị trí item được chọn
                // lấy giá trị vị trí item được chọn trong combobox-data
                this.scrollY = (this.indexItemSelect+1)*this.itemHeight;
                if(this.indexItemSelect<=0){
                    // khi thanh scroll ở cuối cùng thì sẽ chạy lên đầu
                    this.$refs["mComboboxData"].scrollTo(0,0);
                }
                else if(this.scrollY > comboboxDataHeight){
                    // Khi item được chọn nằm ngoài khoảng hiển thị thì thanh scroll sẽ chạy xuống để hiển thị item đó
                    this.$refs["mComboboxData"].scrollTo(0,this.scrollY - comboboxDataHeight);
                }
            }else{
                // nếu không có có item nào được chọn trước đó thì set mặc định là item đầu tiên
                if(this.indexItemSelect == -1){
                    this.indexItemSelect = 0;
                }
                this.entitiesSearch = this.entities;
            }
            this.isShow = true;
            this.zIndex = 2;
        },

        /**
         * Hàm xử lý sự kiện nhấn phím lên
         * @author LTVIET (05/03/2023)
         */
        handleEventKeyDownArrowUp(){
            let length = this.entitiesSearch.length;
            //1. nếu là phím lên:
            if(this.isShow){
                //1.1. nếu vị trí item được chọn không phải ở đâu tiên thì 
                //  set vị trí được chọn mới giảm đi 1 đơn vị
                if(this.indexItemSelect > 0){
                    this.indexItemSelect -= 1;
                }else{
                    //1.2. nếu vị trí item được chọn là ở dầu tiên thi
                    //set vị trí được chọn mới ở cuối cùng
                    this.indexItemSelect = length-1;
                }
                // lấy ra vị trí item trong combobox-data
                this.scrollY = (this.indexItemSelect+1)*this.itemHeight;
                // lấy ra giá trị độ dài phần không được hiển thị của combobox-data
                const lengthScrollDisplay = (this.scrollHeight - this.itemHeight*this.quantityItemDisplay);
                if((this.scrollY > lengthScrollDisplay && this.scrollY <= this.scrollHeight) || this.scrollY <= 0){
                    // Khi item được chọn ở đoạn dưới cùng của combobox-data thì thanh scroll sẽ chạy xuống dưới cùng
                    this.$refs["mComboboxData"].scrollTo(0,this.scrollHeight);
                }
                else{
                    // Khi item được chọn di chuyển lên trên nằm ngoài khoảng hiển thị thì thanh scroll lên di chuyển lên để hiển thị item
                    this.$refs["mComboboxData"].scrollTo(0,this.scrollY - this.itemHeight);
                }
            }else{
                
                this.entitiesSearch = this.entities;
            }
            // set vị trí thanh scroll theo theo vị trí item được chọn
            this.isShow = true;
            this.zIndex = 2;
        },

        /**
         * Hàm xử lý sự kiện nhấn phím enter
         * @author LTVIET (05/03/2023)
         */
        handleEventKeyDownEnter(){
            // Nếu chưa có item nào được chọn
            if(this.indexItemSelect==-1){
                if(this.value){
                    this.$emit("getInputCombobox",null);
                }else{
                    this.$emit("getInputCombobox","");
                }
                this.isShow = false;
                this.scrollY = 0;
                this.zIndex = 0;
            }
            // Nếu đã có item được chọn
            else{
                //1. nếu là phím enter
                //1.1. lấy ra item được chọn trong danh sách
                this.itemSelected = this.entitiesSearch[this.indexItemSelect];
                //1.2. gán giá trị tương ứng vào value
                this.value = this.itemSelected[this.propName];
                if(this.value){
                    this.inValid = false;
                }
                //1.3. ẩn đi combobox-data
                this.isShow = false;
                this.scrollY = 0;
                this.zIndex = 0;
                //1.5. binding dữ liệu mới ra bên ngoài
                this.$emit("getInputCombobox",this.itemSelected[this.propValue]);
            }
        },
        
        /**
         * Hàm xử lý sự kiện blur input
         * @author LTVIET (05/03/2023)
         */
        onBlurInput(){  
            //2. ẩn đi combobox-data
            this.isShow = false;
            this.scrollY = 0;
            this.zIndex = 0;
            //1. kiểm tra xem combobox có riquired và value rỗng không
            let me = this;
            let findIndex = this.entitiesSearch.findIndex(item=>item[me.propName].toLowerCase() == me.value.toLowerCase());
            if(this.required && !this.value){
                //1.1. nếu có thì set invalid =true và hiển thị thêm thông báo lỗi không được để trống
                this.inValid = true;
                if(this.label){
                    this.notifyError = this.label + resourceJS.error.emptyInput;
                }else{
                    this.notifyError = resourceJS.error.emptyInput;
                }
                return;
            }else if(this.required && findIndex == -1){
                //1.2. kiểm tra xem giá trị nhập vào có nằm trong danh sách dữ liệu không
                //1.2.1. nếu có thì set invalid = true và hiển thị thêm thông báo lỗi 
                this.inValid = true;
                if(this.label){
                    this.notifyError = this.label + resourceJS.error.errorDontFindInData;
                }else{
                    this.notifyError = resourceJS.error.errorDontFindInData;
                }
                return;
            }
            else if(findIndex >= 0){
                //1.3. trường hợp còn lại thì set invalid = false (tức là không có lỗi)
                this.inValid = false;
                this.indexItemSelect = findIndex;
                return;
            }else if(findIndex==-1 && !this.required){
                if(this.value == "" || this.value == null || this.value == undefined){
                    this.indexItemSelect = -1;
                }
                this.inValid = false;
                return;
            }
            
        },

        /**
         * Hàm xử lý sự kiện xóa bỏ mặc định của combobox-data khi blur input
         * @param {*} event sự kiện cần xửu lý
         * @author LTVIET (05/03/2023)
         */
        onMouseDownInput(event){
            event.preventDefault();
        },

        /**
         * Hàm xử lý sự kiện khi click btn close của dialog thông báo lỗi load data
         * @author LTVIET (06/03/2023) 
         */
        handleEventCloseDialogNotifyLoadError(){
            this.isShowDialogNotifyLoadError = false;
        },

        handleEventFocusInput(){
            this.isShow = true;
            this.zIndex = 2;
        }
    }
}
</script>

<style scoped>
@import url(./combobox.css);
.input--error{
    border-color: #ff0000 !important;
}
</style>