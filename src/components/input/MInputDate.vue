<template>
    <div class="input__date" >
        <!-- label của input  -->
        <label v-if="label" for="">{{ label }}<span v-if="required" class="required">*</span></label>
        
        <div class="date">
            <div class="datePicker"></div>
            <!-- input nhập dữ liệu  -->    
            <input
                ref="date" 
                v-model="txtInputDate" type="date"
                >
            
            <div class="input__date-container">
                <!-- input định dạnh "dd/mm/yyyy"  -->
                <div v-if="format == 'dd/mm/yyyy'" class="input__date--format">
                    <input 
                    v-model="txtDate" 
                    type="number"
                    :class="{'input--error':inValidDate}"
                    @blur="addEventBlurInput('day')"
                    @input="handleEventInput('day')"
                    class="input__date-day">
                    <span>/</span>
                    <input 
                        v-model="txtMonth"
                        :style="styleMonth" 
                        type="number"
                        :class="{'input--error':inValidMonth}"
                        @blur="addEventBlurInput('month')"
                        @input="handleEventInput('month')"
                        class="input__date-month">
                    <span>/</span>
                    <input 
                        v-model="txtYear" 
                        type="number"
                        :class="{'input--error':inValidYear}"
                        @blur="addEventBlurInput('year')"
                        @input="handleEventInput('year')"
                        class="input__date-year">
                </div>
                <!-- input định dạnh "mm/dd/yyyy"  -->
                <div v-if="format == 'mm/dd/yyyy'" class="input__date--format">
                    <input 
                        v-model="txtMonth"
                        :style="styleMonth" 
                        type="number"
                        :class="{'input--error':inValidMonth}"
                        @input="handleEventInput('month')"
                        @blur="addEventBlurInput('month')"
                        class="input__date-month">
                    <span>/</span>
                    <input 
                        v-model="txtDate" 
                        type="number"
                        :class="{'input--error':inValidDate}"
                        @input="handleEventInput('day')"
                        @blur="addEventBlurInput('day')"
                        class="input__date-day">
                    <span>/</span>
                    <input 
                        v-model="txtYear" 
                        type="number"
                        :class="{'input--error':inValidYear}"
                        @input="handleEventInput('year')"
                        @blur="addEventBlurInput('year')"
                        class="input__date-year">
                </div>
                <!-- input định dạnh "yyyy/mm/dd"  -->
                <div v-if="format == 'yyyy/mm/dd'" class="input__date--format">
                    <input 
                        v-model="txtYear" 
                        type="number"
                        :class="{'input--error':inValidYear}"
                        @blur="addEventBlurInput('year')"
                        @input="handleEventInput('year')"
                        class="input__date-year">
                    <span>/</span>
                    <input 
                        v-model="txtMonth"
                        :style="styleMonth" 
                        type="number"
                        :class="{'input--error':inValidMonth}"
                        @input="handleEventInput('month')"
                        @blur="addEventBlurInput('month')"
                        class="input__date-month">
                    <span>/</span>   
                    <input 
                        v-model="txtDate" 
                        type="number"
                        :class="{'input--error':inValidDate}"
                        @blur="addEventBlurInput('day')"
                        @input="handleEventInput('day')"
                        class="input__date-day">
                </div>
                <!-- input định dạnh "yyyy/dd/mm"  -->
                <div v-if="format == 'yyyy/dd/mm'" class="input__date--format">
                    <input 
                        v-model="txtYear" 
                        type="number"
                        :class="{'input--error':inValidYear}"
                        @blur="addEventBlurInput('year')"
                        @input="handleEventInput('year')"
                        class="input__date-year">
                    <span>/</span>
                    <input 
                        v-model="txtDate" 
                        type="number"
                        :class="{'input--error':inValidDate}"
                        @blur="addEventBlurInput('day')"
                        @input="handleEventInput('day')"
                        class="input__date-day">
                    <span>/</span>
                    <input 
                        v-model="txtMonth"
                        :style="styleMonth" 
                        type="number"
                        :class="{'input--error':inValidMonth}"
                        @blur="addEventBlurInput('month')"
                        @input="handleEventInput('month')"
                        class="input__date-month">
                </div>
            </div>
        </div> 
        <!-- dialog thông báo lỗi  -->
        <div v-if="inValid" class="error--info">{{ notifyError }}</div>  
        
    </div>
</template>

<script>
import commonJS from '@/js/common';
export default {
    name:"TheSidebar",
    components:{},
    props: {
        modelValue: [String,Boolean,Array,Number],
        label: {
            type: String,
            default: "",
        },
        required: {
            type: Boolean,
            default: false
        },
        format: {
            type: String,
            default: "dd/mm/yyyy"
        },
        valueInputDate: {
            type: String,
            default: ""
        }
    },
    data() {
        return {
            txtInputDate: "",
            txtDate: "",
            txtMonth: "",
            txtYear: "",
            styleMonth: "",
            propValue: "",
            inValidDate: false,
            inValidMonth: false,
            inValidYear: false,
            inValid: false,
            notifyErrorEmpty: "Ngày, tháng, năm không được để trống",
            notifyError: ""
        }
    },
    created() {
        // nếu có dữ liệu truyền vào thì hiển thị dữ liệu đó
        if(this.valueInputDate){
            this.propValue = this.valueInputDate;
            let date = new Date(this.valueInputDate);
            this.txtDate = date.getDate();
            this.txtDate = this.txtDate < 10 ? `0${this.txtDate}` : this.txtDate;
            this.txtMonth = date.getMonth()+1;
            this.txtMonth = this.txtMonth < 10 ? `0${this.txtMonth}` : this.txtMonth;
            this.txtYear = date.getFullYear();
            this.txtYear = this.txtYear < 10 ? `0${this.txtYear}` : this.txtYear;
            this.txtInputDate = commonJS.formatDate(this.valueInputDate);
        }else{
            //nếu không có dữ liệu truyền vào thì hiển thị thời gian hiện tại
            this.getCurrentDate();
        }
    },
    watch: {
        // nếu giá trị của ngày, tháng, năm rỗng thì gán mặc định là 0
        txtInputDate: function(newValue){
            this.txtDate = newValue.slice(8,10);
            this.txtMonth = newValue.slice(5,7);
            this.txtYear = newValue.slice(0,4);
            if(newValue==""){
                this.txtDate = "00";
                this.txtMonth = "00";
                this.txtYear = "0000";
                this.inValidDate = true;
                this.inValidMonth = true;
                this.inValidYear = true;
                this.handleEventError("",this.notifyErrorEmpty);
            }else{
                this.inValidDate = false;
                this.inValidMonth = false;
                this.inValidYear = false;
                this.inValid = false;
                let value = commonJS.formatDate(newValue);
                this.$emit("getValueInputDate",value);
            }
        },
        
    },
    computed: {
        
    },
    methods: {
        /**
         * Hàm xử lý sự kiện blur khỏi input
         * @param {*} type loại input cần xét blur(day, month,year)
         * @author LTVIET (12/03/2023)
         */
        addEventBlurInput(type){
            
            let check = true;
            switch (type) {
                case "day":
                    check = this.validateInputDate();
                    break;
                case "month":
                    check = this.validateInputMonth();
                    break;
                case "year":
                    check = this.validateInputYear();
                    break;
                default:
                    break;
            }
            
            if(check){
                this.txtInputDate = this.getInputDate();
                this.txtInputDate = commonJS.formatDate(this.txtInputDate);
                console.log(1);
                this.$emit("getValueInputDate",this.txtInputDate);
            }            
        },

        /**
         * Hàm validate giá trị của input date
         * @author LTVIET (12/03/2023)
         */
        validateInputDate(){
            this.txtDate = Number(this.txtDate);
            //1. kiểm tra xem input có rỗng không
            if(this.txtDate == "" || this.txtDate == null || this.txtDate == undefined || this.txtDate=="00"){
                this.handleInputEmpty("date");
                return false;
            }
            else{
                //2. nếu input không rỗng
                if(this.txtDate < 0 || this.txtDate > 31){
                    //2.1. nếu giá trị ngày nhỏ hơn 0 hoặc lớn hơn 31 thì hiện thị thông báo lỗi
                    let contentError = "Vui lòng nhập giá trị ngày trong khoảng từ 1->31!";
                    this.handleEventError("date",contentError);
                    return false;
                }
                else{
                    //3.1. nếu giá trị ngày trong khoảng phù hợp
                    //--> validate lại giá trị của ngày cho phù hợp
                    this.validateValueDate();
                    //4. format lại giá trị date
                    this.getFormatDate();
                    this.inValidDate = false;
                    //5. kiểm tra lại xem input date, month, year có cần lỗi không
                    if(!this.inValidDate && !this.inValidMonth && !this.inValidYear){
                        //--> nếu không có thì ẩn thông báo lỗi
                        this.inValid = false;
                        this.notifyError = "";
                    }
                    return true;
                }
            }
        },

        /**
         * Hàm validate giá trị của input month
         * @author LTVIET (12/03/2023)
         */
         validateInputMonth(){
            this.txtMonth = Number(this.txtMonth);
            //1. kiểm tra xem input có rỗng không
            if(this.txtMonth == "" || this.txtMonth == null || this.txtMonth == undefined || this.txtMonth == "00"){
                this.handleInputEmpty("month");
                return false;
            }else{ 
                //2. nếu input không rỗng
                if(this.txtMonth < 0 || this.txtMonth > 12){
                    //2.1. nếu giá trị tháng nhỏ hơn 0 hoặc lớn hơn 12 thì hiện thị thông báo lỗi
                    let contentError = "Vui lòng nhập giá trị tháng trong khoảng từ 1 -> 12!";
                    this.handleEventError("month",contentError);
                    return false;
                }
                else{
                    //3.1. nếu giá trị ngày trong khoảng phù hợp
                    //--> validate lại giá trị của ngày cho phù hợp
                    this.validateValueDate();
                    //4. format lại giá trị month
                    this.getFormatMonth();
                    this.inValidMonth = false;
                    //5. kiểm tra lại xem input date, month, year có cần lỗi không
                    if(!this.inValidDate && !this.inValidMonth && !this.inValidYear){
                        //--> nếu không có thì ẩn thông báo lỗi
                        this.inValid = false;
                        this.notifyError = "";
                    }
                } 
                return true;
            }
        },

        /**
         * Hàm validate giá trị của input year
         * @author LTVIET (12/03/2023)
         */
        validateInputYear(){
            //1. kiểm tra xem input có rỗng không
            if(this.txtYear == "" || this.txtYear == null || this.txtYear == undefined || this.txtYear == "0000"){
                this.handleInputEmpty("year");
                return false;
            }else{
                //2. nếu input không rỗng
                //3. format lại giá trị year
                this.getFormatYear();
                this.inValidYear = false;
                //4. kiểm tra lại xem input date, month, year có cần lỗi không
                if(!this.inValidDate && !this.inValidMonth && !this.inValidYear){
                    //--> nếu không có thì ẩn thông báo lỗi
                    this.inValid = false;
                    this.notifyError = "";
                }
                return true;
            }
        },

        /**
         * Hàm xử lý sự kiện khi input rỗng
         * @param {*} type loại input cần xét (date, month,year)
         * @author LTVIET (12/03/2023)
         */
        handleInputEmpty(type){
            switch (type) {
                case "date":
                    this.txtDate = "00";
                    break;
                case "month":
                    this.txtMonth = "00";
                    break;
                case "year":
                    this.txtYear = "0000";
                    break;
                default:
                    break;
            }
            
            if(this.required){
                this.handleEventError(type,this.notifyErrorEmpty);
            }
        },

        /**
         * Hàm validate lại giá trị của ngày phù hợp theo từng tháng
         * @author LTVIET (12/03/2023)
         */
        validateValueDate(){
            switch (this.txtMonth) {
                //1. nếu tháng hiện tại là tháng 2
                case 2:
                    //1.1. nếu là năm nhuận và date > 28 thì date = 29
                    if(this.txtDate > 28 && this.txtYear % 4 == 0){
                        this.txtDate = 29;
                    }else if(this.txtDate > 28 && this.txtYear % 4 != 0){
                        //1.2. nếu là năm không nhuận và date > 28 thì date = 28
                        this.txtDate = 28;
                    }
                    break;
                //2. nếu tháng hiện tại là tháng 1,3,5,7,8,10,12 có 31 ngày    
                case 1:
                case 3:
                case 5:
                case 7:
                case 8:
                case 10:
                case 12:
                    //2.1. nếu date > 31 thì date = 31
                    if(this.txtDate > 31){
                        this.txtDate = 31;
                    }
                    break;
                //3. nếu tháng hiện tại là tháng 4,6,9,11 có 30 ngày 
                case 4:
                case 6:
                case 9:
                case 11:
                    //2.1. nếu date > 30 thì date = 30
                    if(this.txtDate > 30){
                        this.txtDate = 30;
                    }
                    break;
                default:
                    break;
            }
        },

        /**
         * Hàm xử lý sự kiện khi có lỗi
         * @param {*} type loại input cần xử lý (date,month,year)
         * @param {*} contentError nội dung thông báo lỗi
         * @author LTVIET (12/03/2023)
         */
        handleEventError(type,contentError){
            switch (type) {
                case "date":
                    this.inValidDate = true;
                    break;
                case "month":
                    this.inValidMonth = true;
                    break;
                case "year":
                    this.inValidYear = true;
                    break;
                default:
                    break;
            }
            this.inValid = true;
            this.notifyError = contentError;
        },

        /**
         * Hàm format lại giá trị date (nếu date <10 và có 1 chữ số thì thêm số 0 vào đằng trước)
         * @author LTVIET (12/03/2023)
         */
        getFormatDate(){
            if(typeof this.txtDate == "number"){
                this.txtDate = (this.txtDate < 10) ? `0${this.txtDate}` : this.txtDate;
            }else if(typeof this.txtDate == "string"){
                this.txtDate = (this.txtDate < 10 && this.txtDate.length == 1 ) ? `0${this.txtDate}` : this.txtDate;
            }
        },

        /**
         * Hàm format lại giá trị month (nếu month <10 và có 1 chữ số thì thêm số 0 vào đằng trước)
         * @author LTVIET (12/03/2023)
         */
        getFormatMonth(){
            if(typeof this.txtMonth == "number"){
                this.txtMonth = (this.txtMonth < 10) ? `0${this.txtMonth}` : this.txtMonth;
            }else if(typeof this.txtMonth == "string"){
                this.txtMonth = (this.txtMonth < 10 && this.txtMonth.length == 1 ) ? `0${this.txtMonth}` : this.txtMonth;
            }
        },

        /**
         * Hàm format lại giá trị month (nếu month <1000 và có số chữ số nhỏ hơn 4 
         *        thì thêm các số 0 vào đằng trước để cho đủ 4 chữ số)
         * @author LTVIET (12/03/2023)
         */
        getFormatYear(){
            if(typeof this.txtYear == "number"){
                if(this.txtYear < 1000){
                    this.txtYear = `0${this.txtYear}`;
                    while(this.txtYear.length < 4){
                        this.txtYear = `0${this.txtYear}`;
                    }
                }
            }else if(typeof this.txtYear == "string"){
                while(this.txtYear < 1000 && this.txtYear.length < 4){
                    this.txtYear = `0${this.txtYear}`;
                }
            }
        },

        /**
         * Hàm trả lại định dạng đầy đủ input date
         * @author LTVIET (12/03/2023)
         */
        getInputDate(){
            return `${this.txtYear}-${this.txtMonth}-${this.txtDate}`;
        },

        /**
         * Hàm lấy giá trị thời gian hiện tại
         * @author LTVIET (12/03/2023)
         */
        getCurrentDate(){
            let currentDate = new Date();
            this.txtDate = currentDate.getDate();
            this.getFormatDate();
            this.txtMonth = currentDate.getMonth() + 1;
            this.getFormatMonth();
            this.txtYear = currentDate.getFullYear();
            this.getFormatYear();
            this.txtInputDate = commonJS.formatDate(currentDate);
        },

        handleEventInput(type){
            this.addEventBlurInput(type);
        },
    },
}
</script>

<style scoped>
@import url(./inputDate.css);
</style>