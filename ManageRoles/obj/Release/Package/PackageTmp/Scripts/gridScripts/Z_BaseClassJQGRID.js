var Z_BaseClassJQGRID = {
    ///if data type "json" then load on bindgrditemplate
    //if datatype local then load it manually.
    bindGridTempate: function (id, url, heading, $Template,_datatype) {

        $grd = $('#' + id);
        $pagr_strng = '#pager_' + id;
              
        $grd.jqGrid({
            url: url,
            datatype: _datatype,
            mtype: "GET",
            height: '100%',
            // width: 'auto,
            //autowidth: true,
            //shrinkToFit: true,
            guiStyle: "bootstrap",
            emptyrecords: 'No records to display',
            //styleUI: "Bootstrap",
            colModel:
                $Template,
            pager: jQuery($pagr_strng),
            rowNum: 10,
            rowList: [10, 20, 30, 40],

            viewrecords: true,
            caption: heading,
            jsonReader:
            {
                root: "rows",
                page: "page",
                total: "total",
                records: "records",
                repeatitems: false,
                id: "FardID"
            }
        }).navGrid($pagr_strng, { edit: false, add: false, del: false, search: false, refresh: false });
        return $grd;
    },//end of function

    loadGrid: function (postDataParam) {

        this.grd.setGridParam({ datatype: 'json', postData: postDataParam }).trigger('reloadGrid');
    },

    loadGridWithGridID: function (jqgridId, postDataParam) {
        
        $("#" + jqgridId).setGridParam({ datatype: 'json', postData: postDataParam }).trigger('reloadGrid');
    },
    ReloadGrid: function () {
        this.grd.trigger('reloadGrid');
    },
    print: function () {
        console.log("prototyy[e checkicng");
    },
    GetColumValue: function ($this, rowid, columnName) {
        return $($this.closest('table')).jqGrid('getRowData', rowid)[columnName];
    },
    GetRowValue: function ($this, rowid) {
        return $($this.closest('table')).jqGrid('getRowData', rowid);
    },
    SetColumValue: function ($this, rowid, columnName, newVal) {
        $($this.closest('table')).jqGrid("setCell", rowid, columnName, newVal);

    },
    SetEditColumnVal: function ($this, rowid, columnName, newVal) {
        var $ctrl = $($this).closest('tr').find('#' + rowid + '_' + columnName);
        $ctrl.val(newVal);
    },
    getEditColumnVal: function ($this, rowid, columnName) {
        var $ctrl = $($this).closest('tr').find('#' + rowid + '_' + columnName);
        return $ctrl.val();
    }
}

var Z_JQGridTemplates = {

    DashBoardTempate: [

        {
            name: "FardID",
            index: "FardID",
            key: true
        },
        {
            name: "FardDate",
            index: "FardDate",
            formatter: "date",
            width: '150'

        },
        {
            name: "MauzaName",
            index: "MauzaName",
            width: '50'
        },
        {
            name: "IssuedPersonName",
            index: "IssuedPersonName",
            width: '150'
        },
    ]
    ,
    RegisteryBiaTempate: [

        { name: "RegisteryDetailID", index: "RegisteryDetailID", hidden: true, editable: true },
        { name: "ID", index: "ID", hidden: true, editable: true },
        { name: "PersonID", index: "PersonID", hidden: true, editable: true },
        { name: "feet_per_marla", index: "feet_per_marla", hidden: true },
        { name: "PersonArea", index: "PersonArea", hidden: true, editable: true },

        { name: "KhewatID", index: "KhewatID", hidden: true, editable: true },
        { name: "SelectPersonAreaInFeets", index: "SelectPersonAreaInFeets", hidden: true, editable: true },
        { name: "RegisteryID", index: "RegisteryID", hidden: true, editable: true },
        { name: "RegisteryID", index: "RegisteryID", hidden: true, editable: true },
        {
            name: "Name",
            index: "Name",
            width: '150'

        },
        {
            name: "RelationName",
            index: "RelationName",
            width: '50'
        },
        {
            name: "LastName",
            index: "LastName",
            width: '150'
        },
        {
            name: "NIC",
            index: "NIC",
            width: '150'
        },

        {
            name: "KhewatNo",
            index: "Khewat No",
            width: '50'
        },
        {
            name: "OwnerShiptype",
            index: "OwnerShiptype",
            width: '50'
        },
        {
            name: "PersonAreaKMF",
            index: "Area ( K-M-F )",
            width: '100'

        },
        {
            name: "PlotID",
            index: "PlotID",
            hidden: true, editable: true
        },
        {
            name: "PlotName",
            index: "PlotName",
            width: '50',
            //editable: true
        },

        {
            name: "SelectPersonShare",
            index: "SelectPersonShare",
            width: 50,
            editable: true
        },
        {
            name: "FormatedArea",
            index: "FormatedArea",
            formatter: function (cellValue, options, rowObject) {

                var res = "";
                if (rowObject.SelectPersonAreaInFeets) {
                    res = AreaCalc.getAreaInKMF(rowObject.SelectPersonAreaInFeets, 272 /*rowObject.feet_per_marla*/);
                }
                return res;

            },
            unformat: function (cellvalue, options, cell) {

                return cellvalue;
            },
            width: 100,
            editable: true

        }

    ]
}
