<template>
    <div class="input__date" >
        <!-- label của input  -->
        <label v-if="label" for="">{{ label }}<span v-if="required" class="required">*</span></label>
        
        <div class="date" :class="{'input--error':inValid}">
            <div class="datePicker"></div>
            <!-- input nhập dữ liệu  -->    
            <input
                ref="date" 
                v-model="txtInputDate" type="date"
                :key="keyValue"
                @change="handleEventChangeDatePicker"
                tabindex="-1"
                >
            <input 
                class="input__date-container" 
                :placeholder="placeholder"
                @input="handleEventInput" 
                @blur="addEventBlurInput"
                :key="keyValueInput"
                v-model="value">
        </div> 
        <!-- dialog thông báo lỗi  -->
        <div v-if="inValid" class="error--info">{{ notifyError }}</div>  
        
    </div>
</template>

<script>
import commonJS from '@/js/common';
import resourceJS from '@/js/resourceJS';
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
            notifyError: "",
            placeholder: "",
            regex: Object,
            keyValueInput: 0,
            keyValue: 0
        }
    },
    created() {
        // nếu có dữ liệu truyền vào thì hiển thị dữ liệu đó
        if(this.valueInputDate){
            this.propValue = this.valueInputDate;
            this.propValue = commonJS.formatDate(this.propValue);
            let date = new Date(this.valueInputDate);
            this.txtDate = date.getDate();
            this.txtDate = this.txtDate < 10 ? `0${this.txtDate}` : this.txtDate;
            this.txtMonth = date.getMonth()+1;
            this.txtMonth = this.txtMonth < 10 ? `0${this.txtMonth}` : this.txtMonth;
            this.txtYear = date.getFullYear();
            this.value = this.getFormatDate(this.propValue,"yyyy-mm-dd",this.format);
            this.txtInputDate = this.propValue;
        }else{
            //nếu không có dữ liệu truyền vào thì hiển thị thời gian hiện tại
            let currentDate = this.getCurrentDate();
            this.txtInputDate = currentDate;
            this.value = this.getFormatDate(currentDate,"yyyy-mm-dd",this.format);
        }

        if(this.format.split("/")[0].length == 4){
            this.regex = /^[0-9]{4}[/]{1}([0-9]{2}|[0-9]{1})[/]{1}([0-9]{2}|[0-9]{1})$/;
        }else{
            this.regex = /^([0-9]{2}|[0-9]{1})[/]{1}([0-9]{2}|[0-9]{1})[/]{1}[0-9]{4}$/;
        }
    },
    methods: {
        handleEventChangeDatePicker(){
            if(this.txtInputDate == ""){
                this.placeholder = this.format;
                this.value = "";
                if(this.required){
                    this.inValid = true;
                }
            }else{
                this.inValid = false;
                this.value = this.getFormatDate(this.txtInputDate,"yyyy-mm-dd",this.format);
                console.log("this.txtInputDate:",this.txtInputDate);
                this.$emit("getValueInputDate",this.txtInputDate);
            }
        },

        /**
         * Hàm xử lý sự kiện blur khỏi input
         * @author LTVIET (12/03/2023)
         */
        addEventBlurInput(){
            if(!this.value){
                // 1. nếu giá trị là rỗng
                if(this.required){
                    // 1.1. nếu là truognwf bắt buộc nhập thì thông báo lỗi
                    this.inValid = true;
                    this.notifyError = this.label + resourceJS.error.emptyInput;
                }else{
                    // 1.2. nếu là trường không bắt buộc thì hiển thị placeholder là định dạng date
                    this.placeholder = this.format;
                    this.inValid = false;
                }
                this.txtInputDate = this.getCurrentDate();
                this.value = "";
                this.keyValueInput = ++this.keyValueInput;
            }else{
                // 2.kiểm tra định dạnh của giá trị date
                if(!this.regex.test(this.value)){
                    // 2.1. nếu không đúng định dạng thì thông báo lỗi
                    this.inValid = true;
                    this.notifyError = this.label + resourceJS.inputDate.inValidFormat;
                    this.notifyError = this.notifyError.replace("{0}",this.format);
                }else{
                    // 2.2. nếu đúng định dạng
                    // 2.2.1. validate lại giá trị ngày, tháng, năm
                    let check = this.validateValueDate();
                    if(check == true){
                        // nếu giá trị ngày, tháng, năm hợp lệ
                        // format lại giá trị date
                        this.txtDate = Number(this.txtDate) < 10 ? `0${Number(this.txtDate)}` : this.txtDate;
                        this.txtMonth = Number(this.txtMonth) < 10 ? `0${Number(this.txtMonth)}` : this.txtMonth;
                        let result = this.format.replace("dd",this.txtDate);
                        result = result.replace("mm",this.txtMonth);
                        result = result.replace("yyyy",this.txtYear);
                        this.value = result;
                        this.txtInputDate = this.getFormatDate(this.value,this.format,"yyyy-mm-dd");
                        this.keyValueInput = ++this.keyValueInput;
                        this.inValid = false;
                    }
                    
                }
            }
        },

        /**
         * Hàm validate lại giá trị của ngày phù hợp theo từng tháng
         * @author LTVIET (12/03/2023)
         */
        validateValueDate(){
            let message = resourceJS.inputDate.invalidFormatDate;
            message = message.replace("{0}",this.txtMonth);
            message = message.replace("{1}",this.txtYear);
            // nếu giá trị tháng nằm ngoài khoảng 1-12 thì thông báo lỗi
            if(this.txtMonth > 12 || this.txtMonth < 1){
                this.inValid = true;
                this.notifyError = resourceJS.inputDate.inValidFormatMonth;
                return false;
            }
            switch (this.txtMonth) {
                //1. nếu tháng hiện tại là tháng 2
                case 2:
                    //1.1. nếu là năm nhuận
                    if((this.txtDate > 29 || this.txtDate < 1) && this.txtYear % 4 == 0){
                        // nếu date > 29 hoặc date < 1 thì thông báo lỗi
                        this.inValid = true;
                        message = message.replace("{2}",29);
                        this.notifyError = message;
                        return false;
                    }
                    //1.2. nếu là năm không nhuận
                    else if((this.txtDate > 28 || this.txtDate < 1) && this.txtYear % 4 != 0){
                        // nếu date > 28 hoặc date < 1 thì thông báo lỗi
                        this.inValid = true;
                        message = message.replace("{2}",28);
                        this.notifyError = message;
                        return false;
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
                    //2.1. nếu date > 31 hoặc date < 1 thì thông báo lỗi
                    if(this.txtDate > 31 || this.txtDate < 1){
                        this.inValid = true;
                        message = message.replace("{2}",31);
                        this.notifyError = message;
                        return false;
                    }
                    break;
                //3. nếu tháng hiện tại là tháng 4,6,9,11 có 30 ngày 
                case 4:
                case 6:
                case 9:
                case 11:
                    // 3.1 nếu date > 30 hoặc date < 1 thì thông báo lỗi
                    if(this.txtDate > 30 || this.txtDate < 1){
                        this.inValid = true;
                        message = message.replace("{2}",30);
                        this.notifyError = message;
                        return false;
                    }
                    break;
                default:
                    break;
            }
            
            return true;
        },

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
         * Hàm xử lý sự kiện nhập giá trị vào input date
         * @author LTVIET (26/03/2023)
         */
        handleEventInput(){
            // 1.Kiểm tra xem giá trị nhập vào input có đúng định dạng không ? 
            if(this.regex.test(this.value)){
                // 2. Nếu đúng định dạng thì:
                // 2.1. Lấy ra giá trị ngày, tháng, năm
                let arr = this.format.split("/");
                let indexDay = arr.indexOf("dd");
                let indexMonth = arr.indexOf("mm");
                let indexYear = arr.indexOf("yyyy");
                let arrValue = this.value.split("/");
                this.txtDate = Number(arrValue[indexDay]);
                this.txtMonth = Number(arrValue[indexMonth]);
                this.txtYear = Number(arrValue[indexYear]);
                // 2.2. format lại giá trị ngày, tháng, năm
                this.txtDate = Number(this.txtDate) < 10 ? `0${Number(this.txtDate)}` : this.txtDate;
                this.txtMonth = Number(this.txtMonth) < 10 ? `0${Number(this.txtMonth)}` : this.txtMonth;
                // 2.3. validate giá trị ngày, tháng, năm
                if(this.validateValueDate()){
                    // 2.3.1. nếu giá trị ngày, tháng, năm hợp lệ thì truyền dữ liệu ra ngoài
                    this.inValid = false;
                    let value = `${this.txtYear}-${this.txtMonth}-${this.txtDate}`;
                    this.$emit('getValueInputDate',value);
                }
            }
        },

        /**
         * Hàm chuyển giá trị date từ sang định dạng muốn format
         * @param {*} value giá trị date
         * @param {*} formatBefore định dạng lúc đầu
         * @param {*} formatAfter định dạng muốn format
         * @author LTVIET (26/03/2023)
         */
        getFormatDate(value,formatBefore,formatAfter){
            // Xác định vị trí ngày , tháng, năm ở định dạng ban đầu
            let arrBefore = formatBefore.split(/[/,-]/);
            let indexDayBefore = arrBefore.indexOf("dd");
            let indexMonthBefore = arrBefore.indexOf("mm");
            let indexYearBefore = arrBefore.indexOf("yyyy");
            // Lấy giá trị ngày , tháng, năm ở định dạng ban đầu theo vị trí
            let arrValue = value.split(/[/,-]/);
            let txtDate = Number(arrValue[indexDayBefore]);
            let txtMonth = Number(arrValue[indexMonthBefore]);
            let txtYear = Number(arrValue[indexYearBefore]);
            // format lại giá trị ngày , tháng, năm
            txtDate = Number(txtDate) < 10 ? `0${Number(txtDate)}` : txtDate;
            txtMonth = Number(txtMonth) < 10 ? `0${Number(txtMonth)}` : txtMonth;
            // gán giá trị ngày , tháng, năm của format ban đầu vào định dạng muốn format
            let result = formatAfter.replace("dd",txtDate);
            result = result.replace("mm",txtMonth);
            result = result.replace("yyyy",txtYear);
            return result;
        },
    },
}
</script>

<style scoped>
@import url(./inputDate.css);
</style>