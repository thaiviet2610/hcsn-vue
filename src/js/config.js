const configJS = {
    api:{
        departmentApi: "https://localhost:7123/api/v1/Departments",
        assetCategoryApi: "https://localhost:7123/api/v1/AssetCategories",
        assetApi: "https://localhost:7123/api/v1/Assets",
        assetFilterApi: "https://localhost:7123/api/v1/Assets/Filter?fixedAssetCatagortId={1}&keyword={0}&departmentId={2}&pageSize={3}&pageNumber={4}",
        assetGenerateNewCodeApi: "https://localhost:7123/api/v1/Assets/NewCode",
        exportExcelApi: "https://localhost:7123/api/v1/Assets/Excel?",
        deleteMultipleAsset: "https://localhost:7123/api/v1/Assets",
    }
}

export default configJS;