const configJS = {
    api:{
        asset:{
            assetApi: "https://localhost:7123/api/v1/Assets",
            assetFilterApi: "https://localhost:7123/api/v1/Assets/Filter?fixedAssetCatagortId={3}&keyword={2}&departmentId={4}&pageSize={0}&pageNumber={1}",
            assetFilterNotInApi:"https://localhost:7123/api/v1/Assets/FilterNotIn?keyword={2}&pageSize={0}&pageNumber={1}",
            assetGenerateNewCodeApi: "https://localhost:7123/api/v1/Assets/NewCode",
            exportExcelApi: "https://localhost:7123/api/v1/Assets/Export?",
        },
        assetCategory:{
            assetCategoryApi: "https://localhost:7123/api/v1/AssetCategories",
        },
        department:{
            departmentApi: "https://localhost:7123/api/v1/Departments",
        },
        budget:{
            budgetApi: "https://localhost:7123/api/v1/Budgets",
        },
        assetIncrement:{
            assetIncrementApi: "https://localhost:7123/api/v1/AssetIncrements",
            assetIncrementFilterApi: "https://localhost:7123/api/v1/AssetIncrements/Filter?keyword={2}&pageSize={0}&pageNumber={1}",
            assetIncrementGenerateNewCodeApi: "https://localhost:7123/api/v1/AssetIncrements/NewCode",
            assetIncrementExportApi: "https://localhost:7123/api/v1/AssetIncrements/Export",
        },
        assetIncrementDetail:{
            assetIncrementDetailApi: "https://localhost:7123/api/v1/AssetIncrementDetails",
        }
        
    },
    http: {
        get: 1,
        post: 2,
        put: 3,
        delete: 4
    }
}

export default configJS;