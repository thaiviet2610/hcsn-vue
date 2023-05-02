<template>
    <!-- phần header  -->
    <header>
        <div class="header-left">
            <div class="header-left__text">{{ txtAssetList }}</div>
        </div>
        <div class="header-right">
            <div class="header-right__text">{{ txtFinancialDepartment }}</div>
            <div class="header-right__item">
                <div class="header-right__item text1">{{ txtYear }}</div>
                <div id="txtYear" class="header-right__item text2">{{ year }}</div>
                <div class="header-right__item--icon">
                    <MButtonIcon
                        class="input__icon2--image"
                        classIcon="input__icon--dropdown1"
                        >
                    </MButtonIcon>
                    <MButtonIcon
                        class="input__icon2--image"
                        classIcon="input__icon--dropdown2"
                        >
                    </MButtonIcon>
                </div>
            </div>
            <div class="header-right__icon">
                <MButtonIcon
                    class="header-right__icon1"
                    classIcon="header-right__icon1--image">
                </MButtonIcon>
                <MButtonIcon
                    class="header-right__icon1"
                    classIcon="header-right__icon2--image">
                </MButtonIcon>
                <MButtonIcon
                    class="header-right__icon1"
                    classIcon="header-right__icon3--image">
                </MButtonIcon>
                <div class="header-right__icon4">
                    <div class="header-right__icon4--image1"></div>
                    <MButtonIcon
                        class="icon4--image2"
                        classIcon="header-right__icon4--image2">
                    </MButtonIcon>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
import resourceJS from '@/js/resource';
export default {
    name:"TheHeader",
    components:{

    },
    data() {
        return {
            year: null,
            txtAssetList: resourceJS.theHeader.assetList,
            txtFinancialDepartment: resourceJS.theHeader.financialDepartment,
            txtYear: resourceJS.theHeader.year
        }
    },
    created() {
        this.year = this.getYear();
    },
    methods: {
        /**
         * Hàm thay đổi số năm
         * @param {*} check nếu check = true thì tăng 1 đơn vị, check = false thì giảm 1 đơn vị
         * @author LTVIET (02/03/2023)
         */
         addOnChangeYear(check) {
            if(check){
                this.year += 1;
            }else{
                this.year -= 1;
                if(this.year < 0 ){
                    this.year = 0;
                }
            }
            this.$emit('onChangeYear',this.year);
        },
        /**
         * Hàm lấy ra số năm hiện tại
         * @author LTVIET (02/03/2023)
         */
         getYear() {
            let dateTime = new Date();
            let year = dateTime.getFullYear();
            return year;
        },
    },
}
</script>

<style scoped>

</style>