import enumJS from "./enum";

const resourceJSJS = {
    assetDetail: {
        assetCode : {
            ref: 'ref_fixed_asset_code',
            label: "Mã tài sản",
            placeholder: "Nhập mã tài sản",
            required : true,
            disable: false
        },
        assetName:{
            ref: 'ref_fixed_asset_name',
            label: "Tên tài sản",
            placeholder: "Nhập tên tài sản",
            required : true,
            disable: false
        },
        departmentCode:{
            ref: 'ref_department_code',
            label: "Mã bộ phận sử dụng",
            placeholder: "Chọn mã bộ phận sử dụng",
            required : true,
            disable: false
        },
        departmentName:{
            label: "Tên bộ phận sử dụng",
            required : false,
            disable: true
        },
        assetCategoryCode:{
            ref: 'ref_fixed_asset_category_code',
            label: "Mã loại tài sản",
            placeholder: "Chọn mã loại tài sản",
            required : true,
            disable: false
        },
        assetCategoryName:{
            label: "Tên loại tài sản",
            required : false,
            disable: true
        },
        quantity:{
            ref: 'ref_quantity',
            label: "Số lượng",
            placeholder: "Nhập số lượng",
            required : true,
            disable: false
        },
        cost:{
            ref: 'ref_cost',
            label: "Nguyên giá",
            placeholder: "Nhập nguyên giá",
            required : true,
            disable: true
        },
        lifeTime:{
            ref: 'ref_life_time',
            label: "Số năm sử dụng",
            placeholder: "Nhập số năm sử dụng",
            required : true,
            disable: false
        },
        depreciationRate:{
            label: "Tỷ lệ hao mòn (%)",
            placeholder: "Nhập tỷ lệ hao mòn",
            required : true,
            disable: true
        },
        depreciationValueYear:{
            label: "Giá trị hao mòn năm",
            placeholder: "Nhập giá trị hao mòn năm",
            required : true,
            disable: true
        },
        trackedYear:{
            label: "Năm theo dõi",
            placeholder: "Nhập năm theo dõi",
            required : false,
            disable: true
        },
        purchaseDate:{
            ref: 'ref_purchase_date',
            label: "Ngày mua",
            required : true,
            disable: false
        },
        productionYear:{
            ref: 'ref_production_year',
            label: "Năm bắt đầu sử dụng",
            required : true,
            disable: false
        },
        buttonSave:{
            label: "Lưu"
        },
        buttonCancel:{
            label: "Hủy"
        },
        refElements: ['ref_fixed_asset_code','ref_fixed_asset_name','ref_department_code','ref_fixed_asset_category_code',
                'ref_quantity','ref_cost','ref_life_time','ref_purchase_date','ref_production_year']
    },
    assetNoActive:{
        label: "Chọn tài sản ghi tăng",
        inputSearch:{
            ref: "refSearch",
            placeholder: "Tìm kiếm theo Mã, tên tài sản"
        },
        table:{
            ref: "mTable",
            isPaging: true,
            isCheckbox: true,
            isFunction: false,
            isContextMenu: true,
        },
        button: {
            btnSave: {
                label: "Lưu",
                tooltip: "Ctrl+S",
                classTooltip: "btn-save-asset-no-active-tooltip"
            },
            btnCancel: {
                label: "Hủy bỏ",
                tooltip: "ESC",
                classTooltip: "btn-cancel-asset-no-active-tooltip"
            },
            btnClose:{
                tooltip: "Đóng (ESC)",
                classTooltip: "btn-close-asset-no-active-tooltip"
            }
        }
    },
    budget:{
        bodyHeader:{
            departmentName: {
                label: "Bộ phận sử dụng",
                disable: true
            },
        },
        bodyContent:{
            cost: "Nguyên giá",
            source: "Nguồn hình thành",
            value: "Giá trị",
        },
        bodyFooter:{
            footerLeft:{
                text: "Tổng",
                disable: true
            },
            footerRight:{
                disable: true
            },
            
        },
        button: {
            btnSave: {
                label: "Lưu",
                tooltip: "Ctrl+S",
                classTooltip: "btn-save-budget-tooltip"
            },
            btnCancel: {
                label: "Hủy",
                tooltip: "ESC",
                classTooltip: "btn-cancel-budget-tooltip"
            },
            btnClose:{
                tooltip: "Đóng (ESC)",
                classTooltip: "btn-close-budget-tooltip"
            },
            btnAddBudget: {
                tooltip: "Thêm nguồn chi phí",
                classTooltip: "budget__icon--add-tooltip"
            },
            btnMinusBudget: {
                tooltip: "Bỏ nguồn chi phí",
                classTooltip: "budget__icon--minus-tooltip"
            },
        }
            
        
    },
    assetIncrementDetail:{
        bodyUp:{
            title: "Thông tin chứng từ"
        },
        bodyDown:{
            title: "Thông tin chi tiết",
            inputSearch: {
                placeholder: "Tìm kiếm theo mã, tên tài sản"
            }
        },
        voucherCode:{
            ref: "ref_voucher_code",
            label: "Mã chứng từ",
            placeholder: "Nhập mã chứng từ",
            required: true,
            disable: false,
            maxLength: 50
        },
        voucherDate:{
            ref: "ref_voucher_date",
            label: "Ngày chứng từ",
            placeholder: "Nhập  ngày chứng từ",
            required: true,
            disable: false,
            format: "dd/mm/yyyy"
        },
        incrementDate:{
            ref: "ref_increment_date",
            label: "Ngày ghi tăng",
            placeholder: "Nhập ngày ghi tăng",
            required: true,
            disable: false,
            format: "dd/mm/yyyy"
        },
        description:{
            ref: "ref_description",
            label: "Ghi chú",
            placeholder: "Nhập ghi chú",
            required: false,
            disable: false,
            maxLength: 255
        },
        table:{
            ref: "mTable",
        },
        refElements: ['ref_voucher_code','ref_voucher_date','ref_increment_date'],
        button: {
            btnSave: {
                label: "Lưu",
                class: "btn--main",
                tooltip: "Ctrl+S",
                classTooltip: "btn-save-asset-increment-detail-tooltip"
            },
            btnCancel: {
                label: "Hủy",
                class: "",
                tooltip: "ESC",
                classTooltip: "btn-cancel-asset-increment-detail-tooltip"
            },
            btnClose:{
                tooltip: "Đóng (ESC)",
                classTooltip: "btn-close-asset-increment-detail-tooltip"
            },
            btnSelectedAsset: {
                label: "Chọn tài sản",
                tooltip: "Ctrl + 1",
                classTooltip: "btn-selected-asset-active-tooltip"
            },
        }
    },
    assetIncrementList:{
        label: "Ghi tăng tài sản",
        interfaceSeleceted: {
            verticalInterface: "Giao diện dọc",
            horizontalInterface: "Giao diện ngang"
        },
        inputSearch:{
            ref: "refSearch",
            placeholder: "Tìm kiếm theo số chứng từ, nội dung"
        },
        tooltip:{
            zoomIn:{
                text: "Phóng to",
                classTooltip: "full-screen-tooltip"
            },
            zoomOut:{
                text: "Thu nhỏ"
            },
            seeMore:{
                text: "Xem thêm",
                classTooltip: "asset_increment--item22-tooltip"
            },
            print:{
                text: "In",
                classTooltip: "asset_increment--item21-tooltip"
            },
        },
        text: "Thông tin chi tiết",
        table: {
            tableMaster:{
                ref: "mTableMaster"
            },
            tableDetail:{
                ref: "mTableDetail"
            },
        },
        button: {
            btnAddAssetIncrement: {
                label: "Thêm",
                tooltip: "Ctrl+1",
                classTooltip: "btn-add-asset-increment-tooltip"
            },

            btnDeleteMultipleAssetIncrement: {
                tooltip: "Xóa nhiều (Ctrl+D)",
                classTooltip: "btn-add-asset-increment-tooltip"
            },
        },
        export:{
            fileName: "Danh sách chứng từ.xlsx",
            fileNameDetail: "Chứng từ chi tiết.xlsx"
        }
    },
    validateProfessionalAssetDetail: {
        depreciationYearGreaterCost: "Hao mòn năm phải nhỏ hơn hoặc bằng giá trị nguyên giá!",
        depreciationRateDifferentLifeTimeValue: "Tỷ lệ hao mòn phải bằng 1/Số năm sử dụng!",
        purchaseDateGreaterThanProductionYear: "Ngày bắt đầu sử dụng phải là ngày sau ngày mua!",
        maxLengthCode: "Mã tài sản vượt quá độ dài cho phép 10 ký tự!",
        maxLengthName: "Tên tài sản vượt quá độ dài cho phép 100 ký tự!"
    },
    validateBudget:{
        duplicateBudget: "Nguồn chi phí đã tồn tại!"
    },
    error: {
        validateData: "<div><b><< {0} >></b> cần phải điền đầy đủ thông tin!</div> ",
        maxLength: " không được vượt quá {0} ký tự!",
        emptyInput: "  không được phép để trống! ",
        emptyInputNumber: " phải nhập giá trị lớn hơn 0",
        errorFormatNumber: " chỉ được nhập số!",
        errorMaxLengthNumber: "Độ dài số nhập vào không được quá 19 ký tự!",
        errorMaxLengthIntegerPart: "Độ dài phần nguyên của số nhập vào không được quá 19 ký tự!",
        errorMaxLengthDecimalPart: "Độ dài phần thập phân của số nhập vào không được quá 4 ký tự!",
        errorFormatRate: "Tỷ lệ chỉ được cho phép trong khoảng từ 0 -> 100%!",
        errorDontFindInData: " phải là giá trị nằm trong danh sách lựa chọn!",
        errorDeleteAssetFail: "Hành động xóa tài sản thất bại. Vui lòng thử lại sau!",
        errorUpdateAssetFail: "Hành động sửa tài sản thất bại. Vui lòng thử lại sau!",
        errorAddAssetFail: "Hành động thêm tài sản thất bại. Vui lòng thử lại sau!",
        errorCloneAssetFail: "Hành động nhân bản tài sản thất bại. Vui lòng thử lại sau!",
        notify: "Vui lòng điền giá trị hợp lệ vào các trường thông tin trước khi lưu!",
        exception: "Đã có lỗi xảy ra. Vui lòng kiểm tra lại!"
    },
    notify: {
        noAssetDelete: "Không có tài sản nào được chọn. Vui lòng chọn tài sản muốn xóa!",
        errorValidateInput: "Vui lòng điền đúng định dạng tất cả thông tin trước khi lưu!",
        errorPriceLessThanDepre: "Hao mòn năm phải nhỏ hơn hoặc bằng nguyên giá!",
        errorLoadData: "Đã có lỗi khi tải dữ liệu. Vui lòng thử lại!",
        errorLoadCombobox: "Đã có lỗi khi load data của combobox {0}. vui lòng thử lại sau!",
        notData : "Vui lòng chọn giá trị hợp lệ trong dánh sách dữ liệu!",
        exception: "Đã có lỗi xảy ra. Vui lòng kiểm tra lại!",
        noAsset: "Chọn ít nhất 1 tài sản",
        deleteAssetActive: "<div>Tài sản có mã <b> {0} </b> đã phát sinh chứng từ ghi tăng có mã <b> {1} </b></div>",
        deleteMultipleAssetActive: "<div><b> {0} </b> tài sản được chọn không thể xóa. Vui lòng kiểm tra lại tài sản trước khi thực hiện xóa.</div>"
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
        asset:{
            oneAssetDelete: "<div>Bạn có muốn xóa tài sản <b><< {0} - {1} >></b> ?</div>",
            multiAssetDelete: "<div><b> {0} </b> tài sản đã được chọn. Bạn có muốn xóa các tài sản này khỏi danh sách?</div>",
            allAssetDelete: "Bạn có chắc chắn muốn xóa tất cả tài sản trong trang này ?",
            cantDeleteAsset: "Không thể xóa tài sản này vì có chứng từ phát sinh.",
            multiCantDeleteAsset: " tài sản được chọn không thể xóa. Vui lòng kiểm tra lại tài sản trước khi thực hiện xóa.",
            cancelFormAsset: "Bạn có muốn hủy bỏ khai báo tài sản này?",
            changeCancelFormAsset: "Thông tin thay đổi sẽ không được cập nhật nếu bạn không lưu. Bạn có muốn lưu các thay đổi này?",
            exportExcel: "Bạn có muốn xuất dữ liệu ra file excel ?"
        },
        assetIncrement:{
            oneAssetIncrementDelete: "<div>Bạn có muốn xóa chứng từ có mã <b><< {0} >></b> ?</div>",
            multiAssetIncrementDelete: "<div><b> {0} </b> chứng từ đã được chọn. Bạn có muốn xóa các chứng từ này khỏi danh sách?</div>",
            allAssetIncrementDelete: "Bạn có chắc chắn muốn xóa tất cả chứng từ trong trang này ?",
            cantDeleteAssetIncrement: "Không thể xóa tài sản này vì có chứng từ phát sinh.",
            multiCantDeleteAssetIncrement: " tài sản được chọn không thể xóa. Vui lòng kiểm tra lại tài sản trước khi thực hiện xóa.",
            cancelFormAssetIncrement: "Bạn có muốn hủy bỏ khai báo chứng từ này?",
            changeCancelFormAssetIncrement: "Thông tin thay đổi sẽ không được cập nhật nếu bạn không lưu. Bạn có muốn lưu các thay đổi này?",
            exportExcel: "Bạn có muốn in danh sách chứng từ ra file excel ?",
            exportExcelDetail: "<div>Bạn có muốn in thông tin của chứng từ <b><< {0} >></b> ra file Excel ?</div>"
        },
        budget:{
            cancelForm: "Thông tin thay đổi sẽ không được cập nhật nếu bạn không lưu. Bạn có muốn lưu các thay đổi này?"
        }
    },
    toastSuccess: {
        asset:{
            exportExcel: "<div>Dữ liệu đã được xuất ra file excel <b> {0} </b>. </div>",
            success: "Thành công.",
            saveSuccess: "Lưu dữ liệu thành công.",
            deleteSuccess: "Tài sản đã được xóa.",
            undo: "Hoàn tác"
        },
        assetIncrement:{
            success: "Thành công.",
            saveSuccess: "Lưu dữ liệu thành công.",
            deleteSuccess: "Chứng từ đã được xóa.",
            undo: "Hoàn tác"
        },
        budget:{
            success: "Thành công.",
            saveSuccess: "Lưu dữ liệu thành công.",
        }
    },
    titlteForm: {
        asset:{
            addForm: "Thêm tài sản",
            editForm: "Sửa tài sản",
            cloneForm: "Nhân bản tài sản"
        },
        assetIncrement:{
            addForm: "Thêm chứng từ ghi tăng",
            editForm: "Sửa chứng từ ghi tăng",
        },
        budget: {
            editForm: "Sửa tài sản {0}",
            addForm: "Thêm nguồn chi phí {0}"

        }
    },
    tooltip: {
        table:{
            index: "Số thứ tự",
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
            cancelForm: "Esc",
            btnEditBudget: "Sửa nguyên giá"
        },
        theMenu:{
            header: "MISA QUẢN LÝ TÀI SẢN",
            body:{
                overview: "Tổng quan",
                asset: "Tài sản",
                assetHTDB: "Tài sản HT-DB",
                tool: "Công cụ dụng cụ",
                category: "Danh mục",
                search: "Tra cứu",
                report: "Báo cáo",
            },
            footer:{
                expand: "Mở rộng",
            }
        },
        theSidebar: {
            header: {
                text: "MISA QUẢN LÝ TÀI SẢN",
                classTooltip: "sidebar-header-tooltip"
            },
            footer:{
                collapse: {
                    text: "Thu gọn",
                    classTooltip: "sidebar-footer-tooltip"
                }
            }
        },
        asssetIncrementDetail:{
            btnCloseForm: "Đóng (ESC)",
            btnSaveForm: "Lưu (Ctrl+S)",
            btnCancelForm: "Hủy (ESC)",
        },
        budget:{
            btnCloseForm: "Đóng (ESC)",
            btnSaveForm: "Lưu (Ctrl+S)",
            btnCancelForm: "Hủy (ESC)",
            btnAddBudget: "Thêm nguồn chi phí",
            btnDeleteBudget: "Bỏ nguồn chi phí",
        }
    },
    theSidebar: {
        header:{
            txt: "MISA QLTS",
        },
        body:{
            txtOverview: "Tổng quan",
            txtAsset: "Tài sản",
            txtAssetIncrement: "Ghi tăng",
            txtChangeInfo: "Thay đổi thông tin",
            txtReEvaluate: "Đánh giá lại",
            txtWearCalculation: "Tính hao mòn",
            txtTransferOfAssets: "Điều chuyển tài sản",
            txtWriteDown: "Ghi giảm",
            txtInventory: "Kiểm kê",
            txtOther: "Khác",
            txtAssetHTDB: "Tài sản HT-DB",
            txtTool: "Công cụ dụng cụ",
            txtCategory: "Danh mục",
            txtSearch: "Tra cứu",
            txtReport: "Báo cáo",
        }
    },
    searchAssetPlaceholder: "Tìm kiếm tài sản",
    inputDate: {
        inValidFormat: "{0} sai định dạng {1}!",
        inValidFormatMonth: "Giá trị tháng phải nằm trong khoảng từ 1-12!",
        invalidFormatDate: "Tháng {0} năm {1} chỉ có từ 1 - {2} ngày!"
    },
    table: {
        noDataTable: "Không tìm thấy dữ liệu phù hợp.",
        tableAsset:{
            contextMenu:{
                width: 156,
                height: 152,
                data: 
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
            },
            dataPageSize: ["15", "50", "100","150"],
            titleColumm:{
                function: "Chức năng"
            },
            isPaging: true,
            isCheckbox: true,
            isFunction: true,
            isContextMenu: true,
            contentFooterBefore: "Tổng số: ",
            contentFooterAfter: " bản ghi",
            noDataTable: "Không tìm thấy dữ liệu phù hợp. Vui lòng kiểm tra lại!",
            header: [
                {
                    title: "STT",
                    columnClass: "column2",
                    tooltip: "Số thứ tự",
                    classTooltip: "table-header-column2-tooltip"
                },
                {
                    title: "Mã tài sản",
                    columnClass: "column3",
                },
                {
                    title: "Tên tài sản",
                    columnClass: "column4",
                },
                {
                    title: "Loại tài sản",
                    columnClass: "column5",
                },
                {
                    title: "Bộ phận sử dụng",
                    columnClass: "column6",
                },
                {
                    title: "Số lượng",
                    columnClass: "column7",
                },
                {
                    title: "Nguyên giá",
                    columnClass: "column8",
                },
                {
                    title: "KH/HM lũy kế",
                    columnClass: "column9",
                    tooltip: "Khấu hao/Hao mòn lũy kế",
                    classTooltip: "table-header-column9-tooltip"
                },
                {
                    title: "Giá trị còn lại",
                    columnClass: "column10"
                },
            ],
            body:{
                index: {
                    class: "column2",
                    maxWidth: 50
                },
                fixed_asset_code:{
                    class: "column3",
                    maxWidth: 90
                },
                fixed_asset_name: {
                    class: "column4",
                    maxWidth: 110
                },
                fixed_asset_category_name:{
                    class: "column5",
                    maxWidth: 130
                },
                department_name: {
                    class: "column6",
                    maxWidth: 250
                },
                quantity: {
                    class: "column7",
                    maxWidth: 60
                },
                cost: {
                    class: "column8",
                    maxWidth: 130
                },
                depreciation_value: {
                    class: "column9",
                    maxWidth: 130
                },
                residual_value:{
                    class: "column10",
                    maxWidth: 130
                },
            },
            footer: {
                colspan: 6,
                pagingClass: "",
                footerClass: ["column7","column8","column9","column10"],
                columnEmpty:[]
            },
            function:{
                columnClass: "column11",
                detail:[
                    {
                        type: enumJS.type.edit,
                        classIcon: "function__edit",
                        tooltip: "Sửa(Ctrl+S)",
                        classTooltip: "table-function-edit-tooltip"
                    },
                    {
                        type: enumJS.type.clone,
                        classIcon: "function__clone",
                        tooltip: "Nhân bản(Ctrl+0)",
                        classTooltip: "table-function-clone-tooltip"
                    },
                    
                ]
            }
        },
        tableAssetIncrementDetail:{
            contextMenu:{
                width: 156,
                height: 115,
                data: 
                {
                    add: {
                        icon: "context__menu--icon-add",
                        text: "Thêm tài sản",
                        type: 1
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
            },
            dataPageSize: ["10", "20", "50","100"],
            titleColumm:{
                function: "Chức năng"
            },
            isPaging: false,
            isCheckbox: false,
            isFunction: true,
            isContextMenu: true,
            contentFooterBefore: "Tổng số: ",
            contentFooterAfter: " bản ghi",
            noDataTable: "Không tìm thấy dữ liệu phù hợp. Vui lòng kiểm tra lại!",
            header: [
                {
                    title: "STT",
                    columnClass: "asset_increment_detail--column2",
                    tooltip: "Số thứ tự",
                    classTooltip: "asset_increment_detail--column2-tooltip",
                },
                {
                    title: "Mã tài sản",
                    columnClass: "asset_increment_detail--column3",
                },
                {
                    title: "Tên tài sản",
                    columnClass: "asset_increment_detail--column4",
                },
                {
                    title: "Bộ phận sử dụng",
                    columnClass: "asset_increment_detail--column6",
                },
                {
                    title: "Nguyên giá",
                    columnClass: "asset_increment_detail--column8",
                },
                {
                    title: "KH/HM lũy kế",
                    columnClass: "asset_increment_detail--column9",
                    tooltip: "Khấu hao/Hao mòn lũy kế",
                    classTooltip: "asset_increment_detail--column9-tooltip"
                },
                {
                    title: "Giá trị còn lại",
                    columnClass: "asset_increment_detail--column10",
                },
            ],
            body:{
                index: {
                    class: "asset_increment_detail--column2",
                    maxWidth: 65
                },
                fixed_asset_code:{
                    class: "asset_increment_detail--column3",
                    maxWidth: 100
                },
                fixed_asset_name: {
                    class: "asset_increment_detail--column4",
                    maxWidth: 110
                },
                department_name: {
                    class: "asset_increment_detail--column6",
                    maxWidth: 258
                },
                cost: {
                    class: "asset_increment_detail--column8",
                    maxWidth: 130
                },
                depreciation_value: {
                    class: "asset_increment_detail--column9",
                    maxWidth: 130
                },
                residual_value: {
                    class: "asset_increment_detail--column10",
                    maxWidth: 130
                },
            },
            footer: {
                colspan: 4,
                footerText: "Tổng cộng:",
                pagingClass: "asset-increment-detail__footer-left",
                footerClass: ["asset_increment_detail--column8","asset_increment_detail--column9","asset_increment_detail--column10"],
                columnEmpty:[]
            },
            function:{
                columnClass: "asset_increment_detail--column11",
                detail:[
                    {
                        type: enumJS.type.edit,
                        classIcon: "function__edit",
                        tooltip: "Sửa(Ctrl+S)",
                        classTooltip: "function__edit--tooltip"
                    },
                    {
                        type: enumJS.type.delete,
                        classIcon: "function__delete",
                        tooltip: "Xóa(Ctrl+D)",
                        classTooltip: "function__delete--tooltip"
                    },
                ]
            }      
            
        },
        tableAssetNoActive:{
            contextMenu:{
                width: 156,
                height: 152,
                data: 
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
            },
            dataPageSize: ["20", "50", "100","150"],
            titleColumm:{
                function: "Chức năng"
            },
            isPaging: true,
            isCheckbox: false,
            isFunction: false,
            isContextMenu: false,
            contentFooterBefore: "Tổng số: ",
            contentFooterAfter: " bản ghi",
            noDataTable: "Không tìm thấy dữ liệu phù hợp. Vui lòng kiểm tra lại!",
            header: [
                {
                    title: "STT",
                    columnClass: "asset-no-active--column2",
                    tooltip: "Số thứ tự",
                    classTooltip: "asset-no-active--column2-tooltip"
                },
                {
                    title: "Mã tài sản",
                    columnClass: "asset-no-active--column3",
                },
                {
                    title: "Tên tài sản",
                    columnClass: "asset-no-active--column4",
                },
                {
                    title: "Bộ phận sử dụng",
                    columnClass: "asset-no-active--column6",
                },
                {
                    title: "Nguyên giá",
                    columnClass: "asset-no-active--column8",
                },
                {
                    title: "KH/HM lũy kế",
                    columnClass: "asset-no-active--column9",
                    tooltip: "Khấu hao/Hao mòn lũy kế",
                    classTooltip: "asset-no-active--column9-tooltip"
                },
                {
                    title: "Giá trị còn lại",
                    columnClass: "asset-no-active--column10 asset-no-active__residual-value",
                },
            ],
            body:{
                index: {
                    class: "asset-no-active--column2",
                    maxWidth: 55
                },
                fixed_asset_code: {
                    class: "asset-no-active--column3",
                    maxWidth: 110
                },
                fixed_asset_name: {
                    class: "asset-no-active--column4",
                    maxWidth: 130
                },
                department_name: {
                    class: "asset-no-active--column6",
                    maxWidth: 276
                },
                cost: {
                    class: "asset-no-active--column8",
                    maxWidth: 140
                },
                depreciation_value: {
                    class: "asset-no-active--column9",
                    maxWidth: 140
                },
                residual_value: {
                    class: "asset-no-active--column10 asset-no-active__residual-value",
                    maxWidth: 140
                },
            },
            footer: {
                colspan:5,
                pagingClass: "asset-no-active--footer-left",
                footerClass: ["asset-no-active--column8","asset-no-active--column9","asset-no-active--column10 asset-no-active__residual-value"],
                columnEmpty:[]
            },
            function:{
                columnClass: "asset-no-active--column11",
                detail:[
                    {
                        type: enumJS.type.edit,
                        classIcon: "function__edit",
                        tooltip: "Sửa(Ctrl+S)"
                    },
                    {
                        type: enumJS.type.delete,
                        classIcon: "function__delete",
                        tooltip: "Xóa(Ctrl+D)"
                    },
                    
                ]
            }
        },
        tableDownAssetIncrementList:{
            contextMenu:{
                width: 156,
                height: 152,
                data: 
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
            },
            titleColumm:{
                function: "Chức năng"
            },
            isFooter: false,
            isCheckbox: false,
            isFunction: false,
            isContextMenu: false,
            contentFooterBefore: "Tổng số: ",
            contentFooterAfter: " bản ghi",
            noDataTable: "Không tìm thấy dữ liệu phù hợp. Vui lòng kiểm tra lại!",
            header: [
                {
                    title: "STT",
                    columnClass: "asset_increment_detail_list--column2",
                    tooltip: "Số thứ tự",
                    classTooltip: "asset_increment_detail_list--column2-tooltip",
                },
                {
                    title: "Mã tài sản",
                    columnClass: "asset_increment_detail_list--column3",
                },
                {
                    title: "Tên tài sản",
                    columnClass: "asset_increment_detail_list--column4",
                },
                {
                    title: "Bộ phận sử dụng",
                    columnClass: "asset_increment_detail_list--column6",
                },
                {
                    title: "Nguyên giá",
                    columnClass: "asset_increment_detail_list--column8",
                },
                {
                    title: "KH/HM lũy kế",
                    columnClass: "asset_increment_detail_list--column9",
                    tooltip: "Khấu hao/Hao mòn lũy kế",
                    classTooltip: "asset_increment_detail_list--column9-tooltip"
                },
                {
                    title: "Giá trị còn lại",
                    columnClass: "asset_increment_detail_list--column10",
                },
            ],
            body:{
                index:{
                    class: "asset_increment_detail_list--column2",
                    maxWidth: 65
                },
                fixed_asset_code:{
                    class: "asset_increment_detail_list--column3",
                    maxWidth: 120
                },
                fixed_asset_name: {
                    class: "asset_increment_detail_list--column4",
                    maxWidth: 150
                },
                department_name: {
                    class: "asset_increment_detail_list--column6",
                    maxWidth: 396
                },
                cost: {
                    class: "asset_increment_detail_list--column8",
                    maxWidth: 160
                },
                depreciation_value: {
                    class: "asset_increment_detail_list--column9",
                    maxWidth: 160
                },
                residual_value:{
                    class: "asset_increment_detail_list--column10",
                    maxWidth: 160
                },
            },
            footer: {
                
                pagingClass: "asset-increment-detail__footer-left",
                footerClass: ["asset_increment_detail_list--column8","asset_increment_detail_list--column9","asset_increment_detail_list--column10"],
                columnEmpty:[]
            },
            function:{
                columnClass: "asset_increment_detail_list--column11",
                detail:[
                    {
                        type: enumJS.type.edit,
                        classIcon: "function__edit",
                        tooltip: "Sửa(Ctrl+S)",
                        classTooltip: "function__edit--tooltip"
                    },
                    {
                        type: enumJS.type.delete,
                        classIcon: "function__delete",
                        tooltip: "Xóa(Ctrl+D)",
                        classTooltip: "function__delete--tooltip"
                    },
                ]
            }      
            
        },
        
        tableUpAssetIncrementList:{
            contextMenu:{
                width: 170,
                height: 115,
                data: 
                {
                    add: {
                        icon: "context__menu--icon-add",
                        text: "Thêm chứng từ",
                        type: 1
                    },
                    edit: {
                        icon: "context__menu--icon-edit",
                        text: "Sửa chứng từ",
                        type: 3
                    },
                    delete: {
                        icon: "context__menu--icon-delete",
                        text: "Xóa chứng từ",
                        type: 4
                    }
                },
            },
            dataPageSize: ["10", "20", "50","100"],
            titleColumm:{
                function: ""
            },
            isPaging: true,
            isCheckbox: true,
            isFunction: true,
            isContextMenu: true,
            contentFooterBefore: "Tổng số: ",
            contentFooterAfter: " bản ghi",
            noDataTable: "Không tìm thấy dữ liệu phù hợp. Vui lòng kiểm tra lại!",
            header: [
                {
                    title: "STT",
                    columnClass: "asset-increment--index",
                    tooltip: "Số thứ tự",
                    classTooltip: "asset-increment--index-tooltip"
                },
                {
                    title: "Mã chứng từ",
                    columnClass: "asset-increment--voucher-code",
                },
                {
                    title: "Ngày chứng từ",
                    columnClass: "asset-increment--voucher-date",
                },
                {
                    title: "Ngày ghi tăng",
                    columnClass: "asset-increment--increment-date",
                },
                {
                    title: "Tổng nguyên giá",
                    columnClass: "asset-increment--price",
                },
                {
                    title: "Nội dung",
                    columnClass: "asset-increment--description",
                },
            ],
            body:{
                index: {
                    class: "asset-increment--index",
                    maxWidth: 70,
                },
                voucher_code: {
                    class: "asset-increment--voucher-code asset-increment--voucher-code--text",
                    maxWidth: 130
                },
                voucher_date: {
                    class: "asset-increment--voucher-date",
                    maxWidth: 130
                },
                increment_date: {
                    class: "asset-increment--increment-date",
                    maxWidth: 130
                },
                price: {
                    class: "asset-increment--price",
                    maxWidth: 140
                },
                description: {
                    class: "asset-increment--description",
                    maxWidth: 488
                },
            },
            footer: {
                colspan: 5,
                pagingClass: "asset-increment--footer-left",
                footerClass: ["asset-increment--price"],
                columnEmpty:[
                    {classColumn: "asset-increment--description"},
                ]
            },
            function:{
                
                columnClass: "column11",
                detail:[
                    {
                        type: enumJS.type.edit,
                        classIcon: "function__edit",
                        tooltip: "Sửa(Ctrl+S)",
                        classTooltip: "function__edit--tooltip"
                    },
                    {
                        type: enumJS.type.delete,
                        classIcon: "function__delete",
                        tooltip: "Xóa(Ctrl+D)",
                        classTooltip: "function__delete--tooltip"
                    },
                    
                ]
            }
        }
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
        exportExcel: [['Tải xuống','btn--main',1],['Không','btn--outline',2]],
        delete: [['Xóa','btn--main',1],['Không','btn--outline',2]],
        cancelEditForm: [['Lưu','btn--main',1],['Không lưu','btn--sub',2],['Hủy bỏ','btn--outline',3]],
        cancelAddForm: [['Hủy bỏ','btn--main',1],['Không','btn--outline',2]],
        notify: [['Đóng','btn--outline',1]]
    },
    date: {
        format:{
            ddMMyyyy: "dd/mm/yyyy",
            yyyyMMdd: "yyyy-mm-dd",
        },
        regex: {
            regexYearEnd: /^([0-9]{2}|[0-9]{1})[/]{1}([0-9]{2}|[0-9]{1})[/]{1}[0-9]{4}$/,
            regexYearBegin: /^[0-9]{4}[/]{1}([0-9]{2}|[0-9]{1})[/]{1}([0-9]{2}|[0-9]{1})$/
        }
    },
    theHeader:{
        assetList: "Danh sách tài sản",
        financialDepartment: "Sở tài chính",
        year: "Năm"
    },
    excel:{
        name: "Danh sách tài sản",
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    },
    
}

export default resourceJSJS;