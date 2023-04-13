const commonJS = {
    formatDate (dateTime) {
        try {
            if(dateTime !=null && dateTime != undefined) {
                //chuyen du lieu thanh ngay thang
                dateTime = new Date(dateTime);
                let date = dateTime.getDate();
                date = date < 10 ? `0${date}` : date;
                let month = dateTime.getMonth()+1;
                month =  month < 10 ? `0${month}` : month;
                let year = dateTime.getFullYear();
                year = year < 10 ? `0${year}` : year;
                return `${year}-${month}-${date}`;
            
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
            number = Math.round(number);
            let money = String(number).indexOf(".") == -1 ? Number(number) : Number(number.replaceAll('.',''));
            if(money < 10){
                number = `0${money}`;
                if(Number(money) == 0){
                    number = 0;
                }
            }else{
                let moneyString = String(number);
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
                number = result;
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