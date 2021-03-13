var Z_COMMON = {
    URL: {
        REGISTERY_OWNERSHIP_BIA: "/Registery/GetKhewatDetail",
        REGISTERY_OWNERSHIP_BIA_View: "/Registery/GetKhewatDetailView",
        REGISTERY_OWNERSHIP_SAVE_BIA: "/Registery/SaveBiaRegisteryDetail",
        REGISTERY_OWNERSHIP_DELETE: "/Registery/DeleteRegisteryDetail",
        REGISTERY_OWNERSHIP_MUSHTRI: "/Registery/GetMushltriKhewatDetail",
        REGISTERY_OWNERSHIP_MUSHTRI_View: "/Registery/GetMushltriKhewatDetailView",
        PERSON_GRID_VIEW: "/Person/ShowData",
        Ownership_ADDUPDATE: "/Ownership/AddUpdate",
        GET_PLOTS_BY_KHEWATS: "/Plot/GetPlotsByKhewtID",
        GET_OWNERSHIP_FOR_ADD_UPDATE: "/OwnerShip/GetOwnerShip",
        PLOT_GRID_VIEW: "/Plot/ShowPlotGrid",
        Owner_Ship_GridView: "/Ownership/GetKhewatDetailJQ",
        Fard_Grid_View: "/Fard/ShowFardGrid",
        Khara_Create_Grid: "/Khasra/KhasaraGrid",
        Khewat_Create_Grid: "/Khewat/Grid",
        Plot_Grid_By_KhewatId: "/OwnerShip/PlotGridByKhewatId",
        Ownership_Detail_Grid: "/Ownership/DetailShowData"
    },
    //BindKhewatNumbersByPersonID: function (data) {
    BindSelectBox: function (data) {
        if (data) {

            $("#khewatNo").empty();
            $("#khewatNo").append("<option text='Select' value='-1'>Select</option>");
            $.each(data, function (index, optionData) {
                $("#khewatNo").append("<option text='" + optionData.KhewatNo + "' value='" + optionData.ID + "'>" + optionData.KhewatNo + "</option>");
            });
        }
    }

}