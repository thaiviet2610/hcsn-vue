const enumJS = {
    keyBackSpace: 8,
    keyTab: 9,
    keyEnter: 13,
    keyShift: 16,
    keyCtrl: 17,
    keyAlt: 18,
    keyEsc: 27,
    keyLeft: 37,
    arrowUp: 38,
    keyRight: 39,
    arrowDown: 40,
    key0: 48,
    key1: 49,
    key2: 50,
    key3: 51,
    key4: 52,
    key5: 53,
    key6: 54,
    key7: 55,
    key8: 56,
    key9: 57,
    keyA: 65,
    keyC: 67,
    keyE: 69,
    keyD: 68,
    keyP: 80,
    keyS: 83,
    keyV: 86,
    /**
     * Dấu phẩy
     */
    keyComma: 188,
    /**
     * Dấu chấm
     */
    keyDots: 190, 
    /**
     * Dấu gạch chéo
     */
    keySlash: 191,
    errorCode: {
        exception: 1,
        inValid: 2,
        insertFailed : 3,
        updateFailed : 4,
        deleteFailed : 5,
        notFound : 6,
    },
    validateCode:{
        // Lỗi validate các trường để trống
        empty: 1,
        // Lỗi validate nguyên giá tài sản nhỏ hơn hao mòn năm
        depreciationYearGreaterThanCost: 2,
        // Lỗi dữ liệu kiểu number vượt quá độ dài cho phép
        outMaxLength: 3,
        // Lỗi dữ liệu kiểu tỷ lệ phần trăm nằm ngoài khoảng 0-100 
        outOfRate : 4,
        // Lỗi trùng mã
        duplicate: 5,
        // Lỗi dữ liệu kiểu number thuộc trường bắt buộc lớn hơn 0 nhưng có giá trị <= 0
        numberLessThanOrEqualZero :6,
        // Lỗi validate tỷ lệ hao mòn != (1/số năm sử dụng)*100
        depreciationRateDifferentLifeTime : 7,
        // Lỗi validate ngày mua lớn hơn ngày bắt đầu sử dụng
        purchaseDateGreaterThanProductionYear : 8,
        // Lỗi vượt quá độ dài ký tự cho phép
        maxLength : 9,
        // Lỗi khi insert chứng từ thì danh sách tài sản rỗng
        noAssetIncrements : 10,

        // Lỗi khi 1 trong các thuộc tính của nguồn chi phí rỗng
        costSourceEmpty : 11,

		/// Lỗi khi giá trị của nguồn chi phí nhỏ hơn hoặc bằng 0
        costSourceMountLessOrEqualThanZero : 12,

		/// Lỗi khi có 2 nguồn chi phí trùng nhau
		costSourceDuplicate : 13,

		/// Lỗi khi dữ liệu của nguồn chi phí không hợp lệ
		costSourceInValid : 14,
    },
    type: {
        add: 1,
        clone: 2,
        edit: 3,
        delete: 4
    },
    typeValue: {
        text: 1,
        number: 2,
        boolean: 3,
        date: 4,
        money: 5,
        checkbox: 6,
        function: 7
    },
    percent:{
        zero: 0,
        oneHundred: 100
    },
    paneSize:{
        zeroPercent: 0,
        oneHundredPercent: 1,
        diffrentPercent: 2,
    }
}

export default enumJS;