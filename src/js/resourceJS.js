import enumJS from "./enum";

const resourceJS = {
    assetDetail: {
        assetCode : {
            label: "Mã tài sản ",
            placeholder: "Nhập mã tài sản"
        },
        assetName:{
            label: "Tên tài sản",
            placeholder: "Nhập tên tài sản"
        },
        departmentCode:{
            label: "Mã bộ phận sử dụng",
            placeholder: "Nhập mã bộ phận sử dụng"
        },
        departmentName:{
            label: "Tên bộ phận sử dụng",
            placeholder: "Nhập tên bộ phận sử dụng"
        },
        assetCategoryCode:{
            label: "Mã loại tài sản",
            placeholder: "Nhập mã loại tài sản"
        },
        assetCategoryName:{
            label: "Tên loại tài sản",
            placeholder: "Nhập tên loại tài sản"
        },
        quantity:{
            label: "Số lượng",
            placeholder: "Nhập số lượng"
        },
        cost:{
            label: "Nguyên giá",
            placeholder: "Nhập nguyên giá"
        },
        lifeTime:{
            label: "Số năm sử dụng",
            placeholder: "Nhập số năm sử dụng"
        },
        depreciationRate:{
            label: "Tỷ lệ hao mòn",
            placeholder: "Nhập tỷ lệ hao mòn"
        },
        depreciationValueYear:{
            label: "Giá trị hao mòn năm",
            placeholder: "Nhập giá trị hao mòn năm"
        },
        trackedYear:{
            label: "Năm theo dõi",
            placeholder: "Nhập năm theo dõi"
        },
        purchaseDate:{
            label: "Ngày mua"
        },
        productionYear:{
            label: "Năm bắt đầu sử dụng"
        },
        buttonSave:{
            label: "Lưu"
        },
        buttonCancel:{
            label: "Hủy"
        },
        refAssetDetail: {
            assetCode: 'txtAssetCode',
            assetName: 'txtAssetName',
            departmentCode: 'txtDepartmentCode',
            assetCategoryCode:'txtAssetCategoryCode',
            quantity: 'txtQuantity',
            cost: 'txtCost',
            lifeTime: 'txtLifeTime',
            purchaseDate: 'txtPurchaseDate',
            productionYear: 'txtProductionYear'
        },
    },
    validateProfessionalAssetDetail: {
        depreciationYearGreaterCost: "Hao mòn năm phải nhỏ hơn hoặc bằng giá trị nguyên giá!",
        depreciationRateDifferentLifeTimeValue: "Tỷ lệ hao mòn phải bằng 1/Số năm sử dụng!",
        purchaseDateGreaterThanProductionYear: "Ngày bắt đầu sử dụng phải là ngày sau ngày mua!",
        maxLengthCode: "Mã tài sản vượt quá độ dài cho phép 10 ký tự!",
        maxLengthName: "Tên tài sản vượt quá độ dài cho phép 100 ký tự!"
    },
    error: {
        validateData: "<div><b><< {0} >></b> cần phải điền đầy đủ thông tin!</div> ",
        emptyInput: "  không được phép để trống! ",
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
        errorPriceLessThanDepre: "Hao mòn năm phải nhỏ hơn hoặc bằng nguyên giá!",
        errorLoadData: "Đã có lỗi khi load data. Vui lòng thử lại!",
        errorLoadCombobox: "Đã có lỗi khi load data của combobox {0}. vui lòng thử lại sau!",
        notData : "Vui lòng chọn giá trị hợp lệ trong dánh sách dữ liệu!",
    },
    errorMsg:{
        errorConnection: "Không kết nối được với server. Vui lòng kiểm tra lại!",
        exception: "Đã có lỗi xảy ra. Vui lòng liên hệ trung tâm tư vấn!",
        inValid: "Dữ liệu không hợp lệ. Vui lòng kiểm tra lại!",
        duplicate: "<div>Mã tài sản <b> << {0} >> </b> đã tồn tại.<br> Vui lòng kiểm tra lại!</div>",
        exportExcelFailed: "Xuất dữu liệu ra file excel không thành công. Vui lòng kiểm tra lại!",
        errorLoadDataTable: "Đã có lỗi khi tải dữ liệu trong bảng. Vui lòng thử lại sau!",
    },
    confirm: {
        oneAssetDelete: "<div>Bạn có muốn xóa tài sản <b><< {0} - {1} >></b> ?</div>",
        multiAssetDelete: "<div><b> {0} </b> tài sản đã được chọn. Bạn có muốn xóa các tài sản này khỏi danh sách?</div>",
        allAssetDelete: "Bạn có chắc chắn muốn xóa tất cả tài sản trong trang này ?",
        cantDeleteAsset: "Không thể xóa tài sản này vì có chứng từ phát sinh.",
        multiCantDeleteAsset: " tài sản được chọn không thể xóa. Vui lòng kiểm tra lại tài sản trước khi thực hiện xóa.",
        cancelFormAsset: "Bạn có muốn hủy bỏ khai báo tài sản này?",
        changeCancelFormAsset: "Thông tin thay đổi sẽ không được cập nhật nếu bạn không lưu. Bạn có muốn lưu các thay đổi này?",
        exportExcel: "Bạn có muốn xuất dữ liệu ra file excel ?"
    },
    toastSuccess: {
        exportExcel: "<div>Dữ liệu đã được xuất ra file excel <b> {0} </b>. </div>",
        success: "Thành công.",
        saveSuccess: "Lưu dữ liệu thành công.",
        deleteSuccess: "Tài sản đã được xóa.",
    },
    titlteForm: {
        addAssetForm: "Thêm tài sản",
        editAssetForm: "Sửa tài sản",
        cloneAssetForm: "Nhân bản tài sản"
    },
    tooltip: {
        table:{
            tooltipDepreciation: "Hao mòn/Khấu hao lũy kế",
            functionEdit: "Sửa (Ctrl+E)",
            functionClone: "Nhân bản (Ctrl+0)"
        },
        assetList:{
            buttonExcel: "Xuất ra Excel(Ctrl+P)",
            buttonDelete: "Xóa tài sản(Ctrl+D)",
            buttonAdd: "Ctrl+1"
        },
        assetDetail:{
            btnCloseForm: "Đóng (Esc)",
            saveForm: "Ctrl+s",
            cancelForm: "Esc"
        }
    },
    searchAssetPlaceholder: "Tìm kiếm tài sản",
    inputDate: {
        inValidFormat: "{0} sai định dạng {1}!",
        inValidFormatMonth: "Giá trị tháng phải nằm trong khoảng từ 1-12!",
        invalidFormatDate: "Tháng {0} năm {1} chỉ có từ 1 - {2} ngày!"
    },
    table: {
        dataContextMenu: 
        {
            add: {
                icon: "context__menu--icon-add",
                text: "Thêm tài sản",
                type: 1
            },
            clone: {
                icon: "context__menu--icon-clone",
                text: "Nhân bản tài sản",
                type: 2
            },
            edit: {
                icon: "context__menu--icon-edit",
                text: "Sửa tài sản",
                type: 3
            },
            delete: {
                icon: "context__menu--icon-delete",
                text: "Xóa tài sản",
                type: 4
            }
        },
        dataPageSize: ["15", "50", "100","150"],
        titleColumm:{
            index: "STT",
            assetCode: "Mã tài sản",
            assetName: "Tên tài sản",
            assetCategoryName: "Loại tài sản",
            departmentName: "Bộ phận sử dụng",
            quantity: "Số lượng",
            cost: "Nguyên giá",
            depreciationValue: "HM/KH lũy kế",
            residualValue: "Giá trị còn lại",
            function: "Chức năng"
        },
        contentFooterBefore: "Tổng số: ",
        contentFooterAfter: " bản ghi",
        noDataTable: "Không tìm thấy dữ liệu phù hợp. Vui lòng kiểm tra lại!",
        tableInfo:[
            {
                title: "",
                propName: "",
                columnClass: "column1",
                typeValue: enumJS.typeValue.checkbox
            },
            {
                title: "STT",
                propName: "index",
                columnClass: "column2",
                typeValue: enumJS.typeValue.number
            },
            {
                title: "Mã tài sản",
                propName: "fixed_asset_code",
                columnClass: "column3",
                typeValue: enumJS.typeValue.text
            },
            {
                title: "Tên tài sản",
                propName: "fixed_asset_name",
                columnClass: "column4",
                typeValue: enumJS.typeValue.text
            },
            {
                title: "Loại tài sản",
                propName: "fixed_asset_category_name",
                columnClass: "column5",
                typeValue: enumJS.typeValue.text
            },
            {
                title: "Bộ phận sử dụng",
                propName: "department_name",
                columnClass: "column6",
                typeValue: enumJS.typeValue.text
            },
            {
                title: "Số lượng",
                propName: "quantity",
                columnClass: "column7",
                typeValue: enumJS.typeValue.number
            },
            {
                title: "Nguyên giá",
                propName: "cost",
                columnClass: "column8",
                typeValue: enumJS.typeValue.number
            },
            {
                title: "KH/HM lũy kế",
                propName: "depreciation_value",
                columnClass: "column9",
                typeValue: enumJS.typeValue.number
            },
            {
                title: "Giá trị còn lại",
                propName: "residual_value",
                columnClass: "column10",
                typeValue: enumJS.typeValue.number
            },
            {
                title: "Chức năng",
                propName: "",
                columnClass: "column11",
                typeValue: enumJS.typeValue.function,
                function: {
                    edit: {
                        class: "function__edit",
                        type: enumJS.type.edit,
                        tooltip: "Sửa (Ctrl+E)"
                    },
                    clone: {
                        class: "function__clone",
                        type: enumJS.type.clone,
                        tooltip: "Nhân bản (Ctrl+0)"
                    }
                }
            },
        ]
    },
    assetList: {
        idElementAssetList: ["mElement0","mElement1","mElement2","mElement3","mElement4","mElement5","mElement6"],
        refElementAssetList: {
            inputSearch:"mInputSearch",
            comboboxAssetCategory:"mComboboxAssetCategory",
            comboboxDepartment:"mComboboxDepartment",
            buttonAdd:"mButtonAdd",
            buttonExport:"mButtonExport",
            buttonDelete:"mButtonDelete",
            table:"mTable"
        }
    },
    
    buttonDialog: {
        exportExcel: [['Tải xuống','btn--main'],['Không','btn--outline']],
        delete: [['Xóa','btn--main'],['Không','btn--outline']],
        cancelEditForm: [['Lưu','btn--main'],['Không lưu','btn--sub'],['Hủy bỏ','btn--outline']],
        cancelAddForm: [['Hủy bỏ','btn--main'],['Không','btn--outline']],
        notify: [['Đóng','btn--outline']]
    },
    date: {
        format:{
            ddMMyyyy: "dd/mm/yyyy"
        }
    }
}

export default resourceJS;