<template>
    
    <!-- thẻ label của combobox  -->
    <label v-if="label" for="">{{ label }}<span v-if="required" class="required">*</span></label>
    <!-- combobox  -->
    <div class="combobox" :style="'z-index:'+this.zIndex">
        <!-- thẻ input để nhập dữ liệu  -->
        <input 
            ref="mInputCombobox"
            type="text" 
            v-model="value"
            :placeholder="this.placeholder" 
            class="combobox_input combobox__text" 
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
            @addOnClickBtnIcon="btnOpenDropdown">
        </MButtonIcon>
        <!-- thẻ buton thực hiện chức năng ẩn combobox-data  -->
        <MButtonIcon
            v-if="isShow"
            class="combobox__button"
            @mousedown="onMouseDownInput" 
            classIcon="combobox__button--image-close"
            @addOnClickBtnIcon="btnCloseDropdown">
        </MButtonIcon>
        <!-- thẻ button thực hiện chức năng lọc (nếu có)  -->
        <div v-if="isIcon" class="combobox__icon">
            <div class="combobox__icon--image"></div>
        </div>
        <!-- thẻ div hiển thị dữ liệu combobox-data  -->
        <div
            ref="mComboboxData" 
            class="combobox__data"
            @mousedown="onMouseDownInput" 
            :style="`max-height: ${(quantityItem*itemHeight+2)}px;`" 
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
    <MDialogNotify 
        :content="contentDialogNotifyLoadError"
        v-if="isShowDialogNotifyLoadError" 
        @onClose="handleEventCloseDialogNotifyLoadError">
    </MDialogNotify>
</template>

<script>
import resourceJS from '@/js/resourceJS.js'
import enumJS from '@/js/enumJS.js'
import MDialogLoadData from '../dialog/MDialogLoadData.vue'
import axios from 'axios'
export default {
    name:"TheCombobox",
    props: {
        isIcon: {
            type: Boolean,
            default: false
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
        data: {
            type: Array,
            default: null,
            required: false
        },
        valueInput: {
            type: String,
            default: ""
        },
        quantityItem: {
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
        }
    },
    components:{
        MDialogLoadData
    },
    async created(){
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
                this.contentDialogNotifyLoadError = `Đã có lỗi khi load data của combobox ${this.placeholder}. vui lòng thử lại sau!`;
            })
            
        }else if(this.data){
            this.entities = this.data;
            this.entitiesSearch = this.data;
            this.setItemSelected();
        }

        

        /**
         * nếu combobox không có icon thì set lại style cho input
         * @author LTVIET (05/03/2023)
         */
        if (!this.isIcon) {
            this.styleInput = 'width: 100%; padding-right: 28px';
        }

        
    },
    watch: {
        data: function(newValue){
            this.entities = newValue;
        },
    },
    computed: {
        /**
         * Hàm tìm vị trí giá trị được chọn trong danh sách dữ liệu
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
            this.zIndex = 2;
            this.setFocus();
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
            this.isShow = false;
            this.scrollY = 0;
            this.zIndex = 0;
            // this.indexItemSelect = index;
            this.setFocus();
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
         * Hàm tìm item tương ứng với giá trị truyền từ ngoài vào và gán vòa value
         * @author LTVIET (05/03/2023)
         */
        setItemSelected(){
            let me = this;
            //tìm item tương ứng với valueInput
            let entitySelected = this.entities.find(item=>item[this.propValue] == me.valueInput);
            if(entitySelected){
                this.value = entitySelected[this.propName];
            }
        },
        /**
         * Hàm tìm kiếm giá trị tương ứng với giá trị nhập vào input và gán vào mảng tìm kiếm
         * @author LTVIET (05/03/2023)
         */
        onSearchItem() {
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
            let length = this.entitiesSearch.length;
            this.scrollHeight = this.$refs["mComboboxData"].scrollHeight - 2;
            const comboboxDataHeight = this.quantityItem*this.itemHeight;
            // let me = this;
            // var check = false;
            switch (key) {
                case enumJS.arrowDown:
                    // console.log(this.$refs["mComboboxData"].scroll);
                    //2.1. nếu là phím xuống:
                    if(this.isShow){
                        //2.1.1. nếu vị trí item được chọn không phải ở cuối cùng thì 
                        //  set vị trí được chọn mới tăng lên 1 đơn vị
                        if(this.indexItemSelect < (length - 1) ){
                            this.indexItemSelect += 1;
                            // console.log("index:",this.indexItemSelect);
                            // console.log(this.$refs[`item_${this.indexItemSelect}`]);
                            // event.view.focus();
                        }else{
                            //2.1.2. nếu vị trí item được chọn là ở cuối cùng thi
                            //set vị trí được chọn mới ở đầu tiên
                            this.indexItemSelect = 0;
                        }
                        // set vị trí thanh scroll theo theo vị trí item được chọn
                        this.scrollY = (this.indexItemSelect+1)*this.itemHeight;
                        if(this.scrollY < 0){
                            this.scrollY = 0;
                        }
                        console.log(this.scrollY);
                        if(this.indexItemSelect<=0){
                            this.$refs["mComboboxData"].scrollTo(0,0);
                        }
                        else if(this.scrollY > comboboxDataHeight){
                            this.$refs["mComboboxData"].scrollTo(0,this.scrollY - comboboxDataHeight);
                        }
                    }else{
                        this.entitiesSearch = this.entities;
                    }
                    this.isShow = true;
                    this.zIndex = 2;
                    break;
                case enumJS.arrowUp:
                    //2.2. nếu là phím lên:
                    if(this.isShow){
                        //2.2.1. nếu vị trí item được chọn không phải ở đâu tiên thì 
                        //  set vị trí được chọn mới giảm đi 1 đơn vị
                        if(this.indexItemSelect > 0){
                            this.indexItemSelect -= 1;
                        }else{
                            //2.2.2. nếu vị trí item được chọn là ở dầu tiên thi
                            //set vị trí được chọn mới ở cuối cùng
                            this.indexItemSelect = length-1;
                        }
                        // set vị trí thanh scroll theo theo vị trí item được chọn
                        this.scrollY = (this.indexItemSelect+1)*this.itemHeight;
                        let a = (this.scrollHeight - this.itemHeight*this.quantityItem);
                        if(this.scrollY> a && this.scrollY <= this.scrollHeight){
                            this.$refs["mComboboxData"].scrollTo(0,this.scrollHeight);
                        }else if(this.scrollY <= 0){
                            this.$refs["mComboboxData"].scrollTo(0,this.scrollHeight);
                        }else{
                            this.$refs["mComboboxData"].scrollTo(0,this.scrollY - this.itemHeight);
                        }
                    }else{
                        this.entitiesSearch = this.entities;
                    }
                    this.isShow = true;
                    this.zIndex = 2;
                    break;
                case enumJS.keyEnter:
                    if(this.indexItemSelect==-1){
                        if(this.value){
                            this.$emit("getInputCombobox",null);
                        }else{
                            this.$emit("getInputCombobox","");
                        }
                        this.isShow = false;
                        this.scrollY = 0;
                        this.zIndex = 0;
                    }else{
                        //2.4. nếu là phím enter
                        //2.4.1. lấy ra item được chọn trong danh sách
                        this.itemSelected = this.entitiesSearch[this.indexItemSelect];
                        //2.4.2. gán giá trị tương ứng vào value
                        this.value = this.itemSelected[this.propName];
                        //2.4.3. ẩn đi combobox-data
                        this.isShow = false;
                        this.scrollY = 0;
                        this.zIndex = 0;
                        //2.4.4. set focus vào input
                        this.setFocus();
                        //2.4.5. binding dữ liệu mới ra bên ngoài
                        this.$emit("getInputCombobox",this.itemSelected[this.propValue]);
                    }
                    break;
            
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
                console.log(1);
                //1.1. nếu có thì set invalid =true và hiển thị thêm thông báo lỗi không được để trống
                this.inValid = true;
                this.notifyError = this.label + resourceJS.error.emptyInput;
                return;
            }else if(this.required && findIndex == -1){
                console.log(2);
                //1.2. kiểm tra xem giá trị nhập vào có nằm trong danh sách dữ liệu không
                //1.2.1. nếu có thì set invalid = true và hiển thị thêm thông báo lỗi 
                this.inValid = true;
                this.notifyError = this.label + resourceJS.error.errorDontFindInData;
                
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
    }
}
</script>

<style scoped>
@import url(./combobox.css);
</style>