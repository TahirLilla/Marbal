var EditGrid = {
    edit: function (rowId, saveId, cancleId, grdName) {
        //var $that = $(this);
        //var rowId1 = $that.data("rowid");
        debugger;
        $("#" + rowId + saveId).show();
        $("#" + rowId + cancleId).show();
        var rowdata = jQuery("#" + grdName).jqGrid('getRowData', rowId);
        jQuery("#" + grdName).jqGrid('editRow', rowId,
            {
                keys: true,
                oneditfunc: function () {
                    //alert("edited");
                }
            });
    },


    savechangeskhsra: function (rowId) {
        debugger;
        var val = $("#KhasraViewGrid").find('tr').find('#' + rowId + '_' + "Area").val();
        var areaInFeet = AreaCalc.getAreaInFeets(272, val);
        var khewatId = $("#KhasraInfoVM_KhewatID").val();
        saveparameters = {
            "successfunc": null,
            "url": "/Khasra/KhsraChange",
            "extraparam": {
                Area: areaInFeet,
                KhewatId: khewatId
            },
            "aftersavefunc": function (row_id, data) {
                debugger;
                $("#" + rowId + "_savekhsra").hide();
                $("#" + rowId + "_cancelkhsra").hide();

                jQuery("#KhasraViewGrid").jqGrid('setCell', row_id, 'FardDetailID', data.responseJSON.records.FardDetailID);
            },
            "errorfunc": null,
            "afterrestorefunc": null,
            "restoreAfterError": true,
            "mtype": "POST"
        }

        jQuery("#KhasraViewGrid").jqGrid('saveRow', rowId, saveparameters);

    },


    cancel: function (rowId, saveId, cancleId, grdName) {
        $("#" + rowId + saveId).hide();
        $("#" + rowId + cancleId).hide();
        restoreparameters = {
            "afterrestorefunc": function (row_id, data) {
                debugger;
                jQuery("#KhasraViewGrid").jqGrid('setCell', row_id, 'FardDetailID', data.responseJSON.records.FardDetailID);
            }
        }
        jQuery("#" + grdName).jqGrid('restoreRow', rowId, restoreparameters);

    },


    delete: function (rowId, url, grdName) {
        var tst = {
            id: rowId
        };
        $.post(url, tst
            , function (data) {

                jQuery("#" + grdName).loadGrid(data);
            }, "json");
    }
}