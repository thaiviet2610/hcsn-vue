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
            :id="idCombobox"
            :placeholder="this.placeholder" 
            class="combobox_input combobox__text" 
            :class="{'input--error':inValid}" 
            autocomplete="off"
            @click="handleEventClick"
            @focus="handleEventFocusInput(idCombobox)"
            @focusout="handleEventFocusInput(null)"
            @input="onSearchItem"
            @keydown="onKeyDownSelecte"
            @blur="onBlurInput"
            :style="styleInput">
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
            v-show="isShow" >
            <div 
            :id="`item_${index}`"
                :ref="`item_${index}`"
                class="combobox__data_item" 
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
</template>

<script>
import resourceJS from '@/js/resource.js'
import enumJS from '@/js/enum.js'
export default {
    name:"TheCombobox",
    props: {
        // icon của combobox(nếu có)
        iconCombobox: {
            type: String,
            default: ""
        },
        // giá trị thuộc tính của đối tượng cần truyền ra ngoài
        propValue: {
            type: [String,Number],
            default: ""
        },
        // tên thuộc tính của đối tượng cần hiển thị 
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
        // giá trị thuộc tính của đối tượng truyền từ ngoài vào
        valueInput: {
            type: String,
            default: ""
        },
        // số lượng item muốn hiển thị ở combobox-data
        quantityItemDisplay: {
            type: Number,
            default: 0
        },
        // chiều cao của 1 dòng trong combobox-data
        itemHeight: {
            type: Number,
            default: 0
        },
        // danh sách dữ liệu trong combobox-data
        dataCombobox:{
            type: [Object,Array],
            default: null
        },
        // id của combobox
        idCombobox: {
            type: String,
            default: ""
        }

    },
    data() {
        return {
            entities: [], // danh sách các đối tượng
            entitiesSearch: [], // danh sách tìm kiếm các đối tượng
            isShow: false, 
            zIndex: 0,
            styleInput: null, // style của input trong combobox
            value: "", // giá trị hiển thị của combobox
            itemSelected: null, // đối tượng được chọn của combobox
            indexItemSelect: -1, // vị trí đối tượng được chọn trong danh sách
            inValid: false, // biến thể hiện giá trị lỗi của combobox(true:lỗi,false:không lỗi)
            notifyError: null, // nội dung thông báo lỗi
            isShowLoad: false, // trạng thái của dialog laod dữ liệu 
            btnDialgNotify: resourceJS.buttonDialog.notify
        }
    },
    components:{
        
    },
    created(){
        if(this.dataCombobox){
            this.entities = this.dataCombobox;
            this.entitiesSearch = this.dataCombobox;
            this.setItemSelected();
            this.isShowLoad=false;
            if(this.valueInput){
                let me = this;
                let findIndex = this.entitiesSearch.findIndex(item=>item[me.propValue] == me.valueInput);
                if(findIndex!=-1){
                    this.indexItemSelect = findIndex;
                    this.itemSelected = this.entitiesSearch[findIndex];
                }
            }
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
         * Hàm xử lý sự kiện click vào input của combobox
         * @author LTVIET (02/03/2023)
         */
        handleEventClick(){
            this.btnOpenDropdown();
            this.setSelect();
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
         * Hàm bôi đen giá trị input của combobox
         * @author LTVIET (05/03/2023)
         */
         setSelect() {
            this.$nextTick(function() {
                this.$refs["mInputCombobox"]?.select();
            })
        }, 

        /**
         * Hàm gửi id của combobx ra lớp cha khi được focus
         * @author LTVIET (05/03/2023)
         */
        handleEventFocusInput(id){
            this.$emit('getValueIdComboboxFocus',id);
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
            switch (key) {
                case enumJS.arrowDown:
                    event.preventDefault();
                    this.handleEventKeyDownArrowDown();
                    break;
                case enumJS.arrowUp:
                    event.preventDefault();
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
                document.getElementById(`item_${this.indexItemSelect}`).scrollIntoView({
                    behavior: 'smooth'
                })
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
                document.getElementById(`item_${this.indexItemSelect}`).scrollIntoView({
                    behavior: 'smooth'
                })
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

    }
}
</script>

<style scoped>
@import url(./combobox.css);
.input--error{
    border-color: #ff0000 !important;
}
</style>