<template>
    <div class="dropdown">
        <!-- phần label của dropdown (nếu có)  -->
        <label v-if="label" for=""></label>
        <!-- phần input của dropdown  -->
        <input 
            ref="mDropdown"
            v-model="valueSelected" 
            @input="addEventInputSearch"
            @blur="addEventBlurInput"
            @keydown="onKeyDownSelecte"
            @focus="AddEventFocusInput"
            class="dropdown__input">
        <!-- phần data của dropdown  -->
        <div 
            v-if="isShowData" 
            class="dropdown__data">
                <div 
                    v-for="(item,index) in dataSearch" :key="index"
                    @click="addOnClickDataItem(item)" 
                    :class="{'item__selected': index == indexItemSelected}" 
                    @mousedown="onMouseDownInput"
                    class="dropdown__data-item">
                        <div class="data_item--text">{{ item }}</div>
                        <div :style="setStyleIconSelect(index)" class="dropdown__item__icon"></div>
                </div>
        </div>
        <!-- thẻ buton thực hiện chức năng ẩn hiện combobox-data  -->
        <MButtonIcon
            v-if="!isShowData"
            class="dropdown__button"
            classIcon="dropdown__button--image-open"
            @mousedown="onMouseDownInput"
            @addOnClickBtnIcon="btnOpenDropdown">
        </MButtonIcon>
        <MButtonIcon
            v-if="isShowData"
            class="dropdown__button"
            @mousedown="onMouseDownInput"
            classIcon="dropdown__button--image-close"
            @addOnClickBtnIcon="btnCloseDropdown">
        </MButtonIcon>
        <!-- dialog thông báo giá trị input không có trong danh sách dữ liệu-->
        <MDialogNotify 
            :content="contentDialogNotify"
            v-if="isShowDialogNotify" 
            @onClose="addEventClickBtnCloseDialogNotify">
        </MDialogNotify>
    </div>
</template>

<script>
import enumJS from '@/js/enumJS';
export default {
    name:"TheSidebar",
    components:{},
    emits:["update:modelValue"],
    props: {
        modelValue: [Boolean,String,Object,Array,Number],
        label:{
            type: String,
            default: null
        },
        propValue: {
            type: [String,Number],
            default: null
        },
        data: {
            type: Array,
            default: null
        },
        positionData: {
            type: String,
            default: "up"
        }
    },
    data() {
        return {
            isShowData: false,
            valueSelected: "",
            indexItemSelected: 0,
            dataSearch: [],
            isShowDialogNotify: false,
            contentDialogNotify: "Vui lòng chọn giá trị hợp lệ trong dánh sách dữ liệu!",
        }
    },
    created() {
        //gán giá trị data vào biến danh sách tìm kiếm
        this.dataSearch = this.data;
        // kiểm tra xem có giá trị truyền vào không
        if(this.modelValue){
            //--> nếu có thì gán cho biến valueSelected
            this.valueSelected = this.modelValue;
            this.indexItemSelected = this.findIndexSelected;
        }
        
    },
    computed: {
        /**
         * Hàm tìm vị trí giá trị được chọn trong danh sách dữ liệu
         * @author LTVIET (11/03/2023)
         */
        findIndexSelected: function() {
            let me = this;
            let findIndex = this.dataSearch.findIndex(item=>item == me.valueSelected);
            return findIndex;
        },
        
    },
    methods: {
        /**
         * Hàm xử lý sự kiến click button ẩn/hiện data
         * @author LTVIET (11/03/2023)
         */
        btnOpenDropdown(){
            this.isShowData = true;
            this.setFocus();
        },
        
        /**
         * Hàm xử lý sự kiến click button ẩn data
         * @author LTVIET (11/03/2023)
         */
         btnCloseDropdown(){
            this.isShowData = false;
            this.setFocus();
        },
        /**
         * Hàm xử lý sự kiến click chon data item
         * @author LTVIET (11/03/2023)
         */
        addOnClickDataItem(item) {
            this.dataSearch = this.data;
            this.valueSelected = item;
            this.indexItemSelected = this.findIndexSelected;
            this.isShowData = false;
            this.$emit("update:modelValue",Number(this.valueSelected));
        },
        /**
         * Hàm hiển thị icon của item được chọn trong data
         * @param {*} index vị trí của item được chọn
         * @author LTVIET (11/03/2023)
         */
         setStyleIconSelect(index){
            // nếu index bằng vị trí của item được chọn thì hiển thị icon
            if(index == this.indexItemSelected){
                return "display: block;";
            }
        },
        /**
         * Hàm xử lý sự kiện hiển thị danh sách search theo ký tự nhập vào
         * @author LTVIET (11/03/2023)
         */
        addEventInputSearch(){
            let me = this;
            //tìm item tương ứng với modelValue
            this.dataSearch = this.data.filter(item=>item.includes(me.valueSelected));
            this.isShowData = true;
            
        },
        /**
         * Hàm xử lý sự kiện blur khỏi input
         * @author LTVIET (11/03/2023)
         */
        addEventBlurInput(){
            //1. ẩn đi danh sách data
            this.isShowData = false;
            if(!this.valueSelected){
                this.indexItemSelected = 0;
                this.valueSelected = this.dataSearch[0];
                this.$emit("update:modelValue",Number(this.valueSelected));
            }
            if(this.findIndexSelected == -1){
                //2. nếu độ dài danh sách tìm kiếm = 0
                //--> giá trị input không có trong danh sách data
                //2.1. gán lại dữ liệu cho dánh sách tìm kiếm 
                this.dataSearch = this.data;
                //2.1. gán giá trị input cho giá trị đầu tiên của danh sách
                this.valueSelected = this.dataSearch[0];
                this.indexItemSelected = 0;
                this.$emit("update:modelValue",Number(this.valueSelected));
                //2.2. hiển thị thông báo không có trong danh sách data
                this.isShowDialogNotify = true;
            }else{
                this.$emit("update:modelValue",Number(this.valueSelected));
            }
        },
        /**
         * Hàm xử lý sự kiện xóa bỏ mặc định của data khi blur input
         * @param {*} event sự kiện cần xửu lý
         * @author LTVIET (11/03/2023)
         */
        onMouseDownInput(event){
            event.preventDefault();
        },
        /**
         * Hàm xử lý sự kiện bấm các phím để lựa chọn item
         * @param {*} event thông tin sự kiện key down
         * @author LTVIET (11/03/2023)
         */
         onKeyDownSelecte(event) {
            //1. lấy ra giá trị phím được bấm
            const key = event.keyCode;
            let length = this.dataSearch.length;
            switch (key) {
                case enumJS.arrowDown:
                    //2.1. nếu là phím xuống:
                    //2.1.1. nếu vị trí item được chọn không phải ở cuối cùng thì 
                    //  set vị trí được chọn mới tăng lên 1 đơn vị
                    if(this.indexItemSelected < (length - 1) ){
                        this.indexItemSelected += 1;
                    }else{
                        //2.1.2. nếu vị trí item được chọn là ở cuối cùng thi
                        //set vị trí được chọn mới ở đầu tiên
                        this.indexItemSelected = 0;
                    }
                    break;
                case enumJS.arrowUp:
                    //2.2. nếu là phím lên:
                    //2.2.1. nếu vị trí item được chọn không phải ở đâu tiên thì 
                    //  set vị trí được chọn mới giảm đi 1 đơn vị
                    if(this.indexItemSelected > 0){
                        this.indexItemSelected -= 1;
                    }else{
                        //2.2.2. nếu vị trí item được chọn là ở dầu tiên thi
                        //set vị trí được chọn mới ở cuối cùng
                        this.indexItemSelected = length-1;
                    }
                    break;
                case enumJS.tab://2.3. nếu là phím tab thì xử lý giống phím enter
                case enumJS.enter:
                    //2.4. nếu là phím enter
                    //2.4.1. lấy ra item được chọn trong danh sách
                    if(length == 0){
                        //2.4.2. nếu độ dài danh sách tìm kiếm = 0
                        //--> giá trị input không có trong danh sách data
                        //2.4.2.1 gán lại dữ liệu cho dánh sách tìm kiếm 
                        this.dataSearch = this.data;
                        //2.4.2.2. gán giá trị input cho giá trị đầu tiên của danh sách
                        this.valueSelected = this.dataSearch[0];
                        this.indexItemSelected = 0;
                        this.$emit("update:modelValue",Number(this.valueSelected));
                        //2.4.2.3. hiển thị thông báo không có trong danh sách data
                        this.isShowDialogNotify = true;
                    }else{
                        //2.4.3. nếu độ dài danh sách tìm kiếm > 0
                        // gán giá trị cho biến valueSelected
                        this.valueSelected = this.dataSearch[this.indexItemSelected];
                        
                    }
                    //2.4.4. ẩn đi combobox-data
                    this.isShowData = false;
                    //2.4.5. binding dữ liệu mới ra bên ngoài
                    this.$emit("update:modelValue",Number(this.valueSelected));
                    break;
            }
            
        },
        /**
         * Hàm xử lý sự kiện focus vào input
         * @author LTVIET (11/03/2023)
         */
        AddEventFocusInput(){
            this.isShowData = true;
        },
        /**
         * Hàm xử lý sự kiện đóng dialog thông báo 
         * @author LTVIET (11/03/2023)
         */
        addEventClickBtnCloseDialogNotify(){
            this.isShowDialogNotify = false;
        },
        /**
         * Hàm set focus vào input của combobox
         * @author LTVIET (05/03/2023)
         */
        setFocus() {
            this.$nextTick(function() {
                this.$refs["mDropdown"].focus();
            })
            
        }, 
    },
    
}
</script>

<style scoped>
@import url(./dropdown.css);
</style>