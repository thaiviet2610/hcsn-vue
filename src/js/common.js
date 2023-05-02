import resourceJS from "./resource";

const commonJS = {
    formatDate (dateTime,formatBefore,formatAfter) {
        try {
            if(dateTime !=null && dateTime != undefined) {
                if(!formatBefore){
                    //chuyen du lieu thanh ngay thang
                    dateTime = new Date(dateTime);
                    let date = dateTime.getDate();
                    date = date < 10 ? `0${date}` : date;
                    let month = dateTime.getMonth()+1;
                    month =  month < 10 ? `0${month}` : month;
                    let year = dateTime.getFullYear();
                    year = year < 10 ? `0${year}` : year;
                    dateTime = `${year}-${month}-${date}`;
                    formatBefore = resourceJS.date.format.yyyyMMdd;
                }
                let arrBefore = formatBefore.split(/[/-]/);
                let indexDayBefore = arrBefore.indexOf("dd");
                let indexMonthBefore = arrBefore.indexOf("mm");
                let indexYearBefore = arrBefore.indexOf("yyyy");
                // Lấy giá trị ngày , tháng, năm ở định dạng ban đầu theo vị trí
                let arrValue = dateTime.split(/[/,-]/);
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
                
            
            }else {
                return "";
            }
        } catch (error) {
            console.log(error);
            return "";
        }
    },

    formatNumber(value) {
        try {
            let number = value;
            if(value > 1000){
                number = String(value).indexOf(",") == -1 ? Number(value) : Number(String(value).replaceAll(',','.'));
            }
            if(number < 10 && String(number).indexOf(".") == -1){
                number = `0${number}`;
                if(Number(number) == 0){
                    number = 0;
                }
            }else{
                let arr = String(number).split(".");
                let moneyString = arr[0];
                let length = moneyString.length;
                let dem = 0;
                let result = "";
                for(let i = length -1;i>=0;i--){
                    result = moneyString[i] + result;
                    dem++;
                    if(dem==3 && i!=0){
                        result ="." + result;
                        dem=0;
                    }
                }
                if(String(number).indexOf(".") != -1){
                    number = result+","+arr[1];
                }else{
                    number = result;
                }
                
                // number = new Intl.NumberFormat("vi").format(number);
            }
            return number;
        } catch (error) {
            console.log(error);
            return "";
        }
    }
};

export default commonJS;