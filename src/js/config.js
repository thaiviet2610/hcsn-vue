const configJS = {
    api:{
        departmentApi: "https://localhost:7123/api/v1/Departments",
        assetCategoryApi: "https://localhost:7123/api/v1/AssetCategories",
        assetApi: "https://localhost:7123/api/v1/Assets",
        assetFilterApi: "https://localhost:7123/api/v1/Assets/Filter?fixedAssetCatagortId={3}&keyword={2}&departmentId={4}&pageSize={0}&pageNumber={1}",
        assetFilterNotInApi:"https://localhost:7123/api/v1/Assets/FilterNotIn?keyword={2}&pageSize={0}&pageNumber={1}",
        assetGenerateNewCodeApi: "https://localhost:7123/api/v1/Assets/NewCode",
        exportExcelApi: "https://localhost:7123/api/v1/Assets/Export?",
        deleteMultipleAsset: "https://localhost:7123/api/v1/Assets",
        budgetApi: "https://localhost:7123/api/v1/Budgets",
        assetIncrementApi: "https://localhost:7123/api/v1/AssetIncrements",
        assetIncrementDetailApi: "https://localhost:7123/api/v1/AssetIncrementDetails",
    },
    http: {
        get: 1,
        post: 2,
        put: 3,
        delete: 4
    }
}

export default configJS;