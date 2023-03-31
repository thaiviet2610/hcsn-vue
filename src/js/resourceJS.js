const resourceJS = {
    assetDetail: [
        {
            label: "Mã tài sản ",
            placeholder: "Mã tài sản"
        },
        {
            label: "Tên tài sản",
            placeholder: "Tên tài sản"
        },
        {
            label: "Mã bộ phận sử dụng",
            placeholder: "Mã bộ phận sử dụng"
        },
        {
            label: "Tên bộ phận sử dụng",
            placeholder: "Tên bộ phận sử dụng"
        },
        {
            label: "Mã loại tài sản",
            placeholder: "Mã loại tài sản"
        },
        {
            label: "Tên loại tài sản",
            placeholder: "Tên loại tài sản"
        },
        {
            label: "Số lượng",
            placeholder: "Số lượng"
        },
        {
            label: "Nguyên giá",
            placeholder: "Nguyên giá"
        },
        {
            label: "Số năm sử dụng",
            placeholder: "Số năm sử dụng"
        },
        {
            label: "Tỷ lệ hao mòn",
            placeholder: "Tỷ lệ hao mòn"
        },
        {
            label: "Giá trị hao mòn năm",
            placeholder: "Giá trị hao mòn năm"
        },
        {
            label: "Năm theo dõi",
            placeholder: "Năm theo dõi"
        },
        {
            label: "Ngày mua"
        },
        {
            label: "Năm bắt đầu sử dụng"
        },
        
    ],
    validateProfessionalAssetDetail: {
        depreciationYearGreaterCost: "Hao mòn năm phải nhỏ hơn hoặc bằng giá trị nguyên giá.",
        depreciationRateDifferentLifeTimeValue: "Tỷ lệ hao mòn phải bằng 1/Số năm sử dụng",
        purchaseDateGreaterThanProductionYear: "Ngày bắt đầu sử dụng phải là ngày sau ngày mua!",
        maxLengthCode: "Mã tài sản vượt quá độ dài cho phép 100 ký tự!",
        maxLengthName: "Tên tài sản vượt quá độ dài cho phép 255 ký tự!"
    },
    error: {
        validateData: "Cần phải nhập thông tin ",
        emptyInput: " không được phép để trống ",
        errorFormatNumber: " chỉ được nhập số!",
        errorMaxLengthNumber: "Độ dài số nhập vào không được quá 14 ký tự!",
        errorFormatRate: "Tỷ lệ chỉ được cho phép trong khoảng từ 0 -> 100%!",
        errorDontFindInData: " phải là giá trị nằm trong danh sách lựa chọn!",
        errorDeleteAssetFail: "Hành động xóa tài sản thất bại. Vui lòng thử lại sau!",
        errorUpdateAssetFail: "Hành động sửa tài sản thất bại. Vui lòng thử lại sau!",
        errorAddAssetFail: "Hành động thêm tài sản thất bại. Vui lòng thử lại sau!",
        errorCloneAssetFail: "Hành động nhân bản tài sản thất bại. Vui lòng thử lại sau!",
    },
    notify: {
        noAssetDelete: "Không có tài sản nào được chọn. Vui lòng chọn tài sản muốn xóa!",
        errorValidateInput: "Vui lòng điền đúng định dạng tất cả thông tin trước khi lưu!",
        errorPriceLessThanDepre: "Hao mòn năm phải nhỏ hơn hoặc bằng nguyên giá.",
        errorLoadData: "Đã có lỗi khi load data. Vui lòng thử lại!",
        
    },
    errorMsg:{
        errorConnection: "Không kết nối được với server. Vui lòng kiểm tra lại!",
        exception: "Đã có lỗi xảy ra. Vui lòng liên hệ trung tâm tư vấn!",
        inValid: "Dữ liệu không hợp lệ. Vui lòng kiểm tra lại!",
        duplicate: "<div>Mã tài sản <b> << {0} >> </b> đã tồn tại. Vui lòng kiểm tra lại!</div>",
        exportExcelFailed: "Xuất dữu liệu ra file excel không thành công. Vui lòng kiểm tra lại!"
    },
    confirm: {
        oneAssetDelete: "Bạn có muốn xóa tài sản <b><< {0} - {1} >></b>?",
        multiAssetDelete: "<div><b> {0} </b> tài sản đã được chọn. Bạn có muốn xóa các tài sản này khỏi danh sách?</div>",
        allAssetDelete: "Bạn có chắc chắn muốn xóa tất cả tài sản trong trang này?",
        cantDeleteAsset: "Không thể xóa tài sản này vì có chứng từ phát sinh.",
        multiCantDeleteAsset: " tài sản được chọn không thể xóa. Vui lòng kiểm tra lại tài sản trước khi thực hiện xóa.",
        cancelFormAsset: "Bạn có muốn hủy bỏ khai báo tài sản này?",
        changeCancelFormAsset: "Thông tin thay đổi sẽ không được cập nhật nếu bạn không lưu. Bạn có muốn lưu các thay đổi này?",
    },
    toastSuccess: {
        exportExcel: "<div>Dữ liệu đã được xuất ra file excel thành công tại địa chỉ: <u>{0}</u></div> ",
        success: "Thành công!",
        saveSuccess: "Lưu dữ liệu thành công",
        deleteSuccess: "Tài sản đã được xóa",
    },
    api: {
        departmentApi: "https://localhost:7123/api/v1/Departments",
        employeeApi: "https://apidemo.laptrinhweb.edu.vn/api/v1/Employees",
        assetCategoryApi: "https://localhost:7123/api/v1/AssetCategories",
        assetApi: "https://localhost:7123/api/v1/Assets",
        assetFilterApi: "https://localhost:7123/api/Assets/v1/Filter?",
        assetGenerateNewCodeApi: "https://localhost:7123/api/v1/Assets/GetNewCode",
        exportExcelApi: "https://localhost:7123/api/v1/Assets/Export?",
        deleteMultipleAsset: "https://localhost:7123/api/v1/Assets/DeleteMultiple",
    },
    titlteForm: {
        addAssetForm: "Thêm tài sản",
        editAssetForm: "Sửa tài sản",
        cloneAssetForm: "Nhân bản tài sản"
    },
    typeForm: {
        edit: "edit",
        add: "add",
        clone: "clone",
    },
    tooltip: {
        toolTipDepreciation: "Hao mòn/Khấu hao lũy kế",

    },
    searchAssetPlaceholder: "Tìm kiếm tài sản",
    inputDate: {
        inValidFormat: " sai định dạng! VD: {0}",
        inValidFormatMonth: "Giá trị tháng phải nằm trong khoảng từ 1-12!",
        invalidFormatDate: "Tháng {0} năm {1} chỉ có từ 1 - {2} ngày!"
    }
}

export default resourceJS;