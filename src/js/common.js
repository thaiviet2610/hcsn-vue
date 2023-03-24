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
                let hours = dateTime.getHours();
                hours = hours < 10 ? `0${hours}` : hours;
                let minutes = dateTime.getMinutes();
                minutes = minutes < 10 ? `0${minutes}` : minutes;
                let seconds = dateTime.getSeconds();
                seconds = seconds < 10 ? `0${seconds}` : seconds;
                return `${year}-${month}-${date}T${hours}:${minutes}:${seconds}`;
            
            }else {
                return "";
            }
        } catch (error) {
            console.log(error);
            return "";
        }
    },

    formatMoney(value) {
        try {
            let money = value;
            money = Math.round(money);
            return new Intl.NumberFormat("vi", {NumberFormat: 3 }).format(money);
        } catch (error) {
            console.log(error);
            return "";
        }
    }
};

export default commonJS;