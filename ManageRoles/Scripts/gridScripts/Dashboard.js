var Z_DashboardGrid = {
    grd: "",
    URL: "/AdminDashboard/GetPendingFard",
    bindGrid: function (id, url) {

        this.grd = $('#' + id);
        var pagr_strng = '#pager_' + id;
        var $Template = Z_JQGridTemplates.DashBoardTempate;
        $Template.push({ name: 'act', index: 'act', width: '100', sortable: false });
        this.grd.jqGrid({
            url: this.URL,
            datatype: "json",
            mtype: "GET",
            height: '100%',
            // width: 'auto,
            autowidth: true,
            shrinkToFit: true,
            guiStyle: "bootstrap",
            emptyrecords: 'No records to display',
            //styleUI: "Bootstrap",
            colModel:
                $Template,
               
            
            //add custom button here.
            gridComplete: function () {
                var ids = jQuery(this).jqGrid('getDataIDs');
                for (var i = 0; i < ids.length; i++) {
                    var cl = ids[i];
                    debugger;
                    be = '<button type="button" class="btn btn-link"onClick=showdata(' + cl + ')  > Selct</button >';
                    //se = "<input style='height:22px;width:20px;' type='button' value='S' onclick=\"jQuery('#rowed2').saveRow('" + cl + "');\"  />";
                    //ce = "<input style='height:22px;width:20px;' type='button' value='C' onclick=\"jQuery('#rowed2').restoreRow('" + cl + "');\" />";

                    jQuery(this).jqGrid('setRowData', ids[i], { act: be });
                }



            },


            pager: jQuery(pagr_strng),
            rowNum: 10,
            rowList: [10, 20, 30, 40],

            viewrecords: true,
            caption: 'Pending Fards',
            jsonReader:
            {
                root: "rows",
                page: "page",
                total: "total",
                records: "records",
                repeatitems: false,
                id: "FardID"
            }
        }).navGrid(pagr_strng, { edit: false, add: false, del: false, search: false, refresh: false });
    },//end of function
    loadGrid: function (postDataParam) {
        this.grd.setGridParam({ datatype: 'json', postData: postDataParam }).trigger('reloadGrid');
    },
    ReloadGrid: function () {
        this.grd.trigger('reloadGrid');
    },
    showdata: function (row_id) {

        var dataObj = jQuery(this.grd).jqGrid('getRowData', row_id);
        $.redirect("/Fard/Transaction", dataObj, "GET", "");

    }
}//end of z_grid.
