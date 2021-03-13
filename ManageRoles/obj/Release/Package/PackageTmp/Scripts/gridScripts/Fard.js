
var Z_Fard = {
    _hipid: $("#PIDs"),
    grd: "",
    URL: "/Fard/TransactionData",

    SelectedPersonGridJTable: function (id) {
        $('#' + id).jtable({
            title: 'Selected Person',
            paging: true,
            pageSize: 10,
            sorting: true,
            actions:
            {
                listAction: function (postData, jtParams) {
                    console.log("Loading from custom function...");
                    return $.Deferred(function ($dfd) {
                        $.ajax({
                            url: '/Fard/TransactionData?jtStartIndex=' + jtParams.jtStartIndex + '&jtPageSize=' + jtParams.jtPageSize + '&jtSorting=' + jtParams.jtSorting,
                            type: 'POST',
                            dataType: 'json',
                            data: {

                                IDs: JSON.parse($("#PIDs").val()),
                                MauzaID: $("#MauzaID").val()
                            },
                            success: function (data) {
                                $dfd.resolve(data);
                            },
                            error: function () {
                                $dfd.reject();
                            }
                        });
                    });
                },
                deleteAction: function (postData) {
                    debugger;
                    //used in future . .. get  row data by ID.
                    //data in html form
                    var res = $("#selectedUserGrid").jtable('getRowByKey', postData.ID);
                    //if not null
                    if (res) {
                        //get row record
                        var rec = res.data('record');
                    }
                    const tran = new FardTransactonVM();
                    tran.ID = $("#ID").val();
                    tran.Date = $("#Date").val();
                    tran.MauzaID = $("#MauzaID").val();
                    tran.PersonID = postData.ID;
                    DeleteUsersIDs(postData.ID);
                    console.log("deleting from custom function...");

                    return $.Deferred(function ($dfd) {
                        $.ajax({
                            url: '/Fard/DeleteTransactionData',
                            type: 'POST',
                            dataType: 'json',
                            data: postData,
                            success: function (data) {
                                $dfd.resolve(data);
                            },
                            error: function () {
                                $dfd.reject();
                            }
                        });
                    });

                }

            },
            fields: {
                ID: {
                    key: true,
                    list: false
                },

                Name: {

                    title: 'Name',
                    width: '10%'
                },
                RelationName: {

                    title: 'RelationName',
                    width: '5%'
                },
                LastName: {
                    title: 'LastName',
                    width: '10%'
                },
                NIC: {
                    title: 'NIC',
                    width: '20%'
                },
                PhoneNumber: {
                    title: 'PhoneNumber',
                    width: '20%'
                },
                PersonKhewats: {
                    title: 'KhewatNo',
                    width: '10%'
                },
                personArea: {
                    title: 'Area(K-M-F)',
                    width: '10%'
                }
            }
        });
    },

    //SelectedPersonDetailGrid: function (id) {

    //    this.grd = $('#' + id);
    //    //this.URL = url;had coded value
    //    var pagr_strng = '#pager_' + id;
    //    this.grd.jqGrid({
    //        url: this.URL,
    //        datatype: 'local',
    //        // datatype: "jsonp",
    //        mtype: "GET",
    //        height: '100%',
    //        width: '1000',
    //        //autowidth: true,
    //        shrinkToFit: false,
    //        guiStyle: "bootstrap",
    //        emptyrecords: 'No records to display',
    //        styleUI: "Bootstrap",
    //        postData: {

    //            IDs: function () { return JSON.parse($("#PIDs").val()) },
    //            MauzaID: function () {
    //                return $("#MauzaID").val()
    //            }
    //        },
    //        colModel: [

    //            { name: "ID", index: "ID", hidden: true, editable: true },

    //            {
    //                name: "Name",
    //                index: "Name",
    //                width: '150'

    //            },
    //            {
    //                name: "RelationName",
    //                index: "RelationName",
    //                width: '50'
    //            },
    //            {
    //                name: "LastName",
    //                index: "LastName",
    //                width: '150'
    //            },
    //            {
    //                name: "NIC",
    //                index: "NIC",
    //                width: '150'
    //            },
    //            {
    //                index: "PhoneNumber",
    //                name: "PhoneNumber",
    //                width: '150'
    //            },
    //            {
    //                name: "PersonKhewats",
    //                index: "Khewat No",
    //                width: '100'
    //            },
    //            {
    //                name: "personArea",
    //                index: "Area ( K-M-F )",
    //                width: '150'

    //            },
    //            { name: 'act', index: 'act', width: '100', sortable: false }


    //        ],
    //        pager: jQuery(pagr_strng),
    //        rowNum: 10,
    //        rowList: [10, 20, 30, 40],

    //        viewrecords: true,
    //        caption: 'Owner Ship Detail',
    //        jsonReader:
    //        {
    //            root: "rows",
    //            page: "page",
    //            total: "total",
    //            records: "records",
    //            repeatitems: false,
    //            Id: "0"
    //        }
    //    }).navGrid(pagr_strng, { edit: false, add: false, del: false, search: false, refresh: false });

    //},

    loadGrid: function (postDataParam) {

        this.grd.setGridParam({ datatype: 'json', postData: postDataParam }).trigger('reloadGrid');
    },


    DeleteUsersIDs: function (id) {
        var hdPid = $("#PIDs");
        var pidelements;
        if (hdPid.val() == "") {
            pidelements = [];
            return;
        } else {

            pidelements = JSON.parse(hdPid.val());
        }
        //if Id doesnot exist in array then return .and ID is greater then -1 if value exist for that we move farward from if statement
        if (!(jQuery.inArray(id, pidelements) >= 0)) {
            return;
        }
        pidelements.pop(id);
        var result = JSON.stringify(pidelements);
        hdPid.val(result);
        return result;
    },

    InsertSelectedUsersIDs: function (id) {
        var hdPid = $("#PIDs");
        var pidelements = [];
        if (hdPid.val() == "") {
            //pidelements = [];
        } else {

            pidelements = JSON.parse(hdPid.val());
        }
        if (jQuery.inArray(id, pidelements) >= 0) {
            ErrorMessage();
            return pidelements;
        }
        pidelements.push(id);

        hdPid.val(JSON.stringify(pidelements));
        return pidelements;
    },
    GetPIDs: function () {
        var hdPid = $("#PIDs");
        var pidelements;
        if (hdPid.val() == "") {
            pidelements = [];
        } else {

            pidelements = JSON.parse(hdPid.val());
        }
        return pidelements;
    },

    GetUserIDs: function GetUserIDs() {
        var ids = $("#PIDs").val();
        var pidelements = [];
        if (ids) {
            pidelements = JSON.parse(ids);
        }
        return pidelements;
    },
  



}//end of z_fard.

var Z_Fard_OwnerShip = {
    grd: "",
    URL: '/Fard/GetKhewatDetail',
    OwnerShipDetailGrid: function (id) {

        this.grd = $('#' + id);
        //this.URL = url;had coded value
        var pagr_strng = '#pager_' + id;
        this.grd.jqGrid({
            
            url: this.URL,
            datatype: 'local',
            // datatype: "jsonp",
            mtype: "GET",
            height: '100%',
            //width: '1000',
            //autowidth: true,
            shrinkToFit: false,
            guiStyle: "bootstrap",
            emptyrecords: 'No records to display',
            //styleUI: "Bootstrap",
            loadonce: true,
            colModel: [

                { name: "ID", index: "ID", hidden: true, editable: true },
                { name: "PersonID", index: "PersonID", hidden: true, editable: true },
                { name: "feet_per_marla", index: "feet_per_marla", hidden: true },
                { name: "PersonArea", index: "PersonArea", hidden: true },
                { name: "FardTransactionID", index: "FardTransactionID", hidden: true, editable: true },
                { name: "SelectPersonAreaInFeets", index: "SelectPersonAreaInFeets", hidden: true, editable: true },
                { name: "FardDetailID", index: "FardDetailID", hidden: true, editable: true },
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
                    hidden: true
                },
                {
                    name: "PlotName",
                    index: "PlotName",
                    width: '50',
                    //editable: true
                },
                {
                    name: "PersonArea",
                    index: "PersonArea",
                    width: '50'

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
                        return '<a href="#" >'+res+'</a>';

                    },
                    unformat: function (cellvalue, options, cell) {
                        
                        return cellvalue;
                    },
                    width: 50,
                    editable: true

                },

                {
                    name: "action",
                    align: "center",
                    width: 60,
                    sortable: false,
                    title: false,
                    fixed: true,
                    search: false,
                    formatter: function (cellValue, options, rowObject) {
                        var markup = "";

                        //if (rowObject.PersonShare !== null && rowObject.IsSelectable) {
                        //    if (rowObject.FardPartyId > 0 || (isTransactional === 0 && isZatiRecord === 1)) {
                        markup = markup +
                            "<i class=\"editOwnership fa fa-pencil\" style=\"cursor:pointer\" data-rowId=%RowId%  />";
                        markup = markup +
                            "<i class=\"saveOwnership fa fa-save hidden\" style=\"cursor:pointer\" data-rowId=%RowId% />";
                        markup = markup +
                            "<i class=\"cancelOwnership fa fa-close hidden\" style=\"cursor:pointer\" data-rowId=%RowId% />";
                        markup = markup +
                            "<i class=\"deleteOwnership fa fa-trash %Classes%\" style=\"cursor:pointer\" data-rowId=%RowId% />";

                        var replacements = {
                            "%RowId%": options.rowId,
                            "%Classes%": (rowObject["SelectPersonShare"] ||
                                rowObject["SelectedPersonArea"])
                                ? ""
                                : "hidden"

                        };
                        markup = markup.replace(/%\w+%/g,
                            function (all) {
                                return replacements[all];
                            });
                        //    }
                        //}

                        return markup;
                    }

                }
               

            ],
            loadComplete: function () {
                Z_Fard_OwnerShip.bindKhewatGridEvents();

            },
            pager: jQuery(pagr_strng),
            rowNum: 10,
            rowList: [10, 20, 30, 40],

            viewrecords: true,
            caption: 'Owner Ship Detail',
            jsonReader:
            {
                root: "rows",
                page: "page",
                total: "total",
                records: "records",
                repeatitems: false,
                Id: "0"
            }
        }).navGrid(pagr_strng, { edit: false, add: false, del: false, search: false, refresh: false });

    },

    loadGrid: function (postDataParam) {
        debugger;
        this.grd.setGridParam({ datatype: 'json', postData: postDataParam }).trigger('reloadGrid');
    },
    bindKhewatGridEvents() {

        $(".editOwnership")
            .on("click",
                function () {
                    debugger;
                    var $that = $(this);
                    var rowId = $that.data("rowid");
                    //var $saveButton = $(".saveOwnership[data-rowid=" + rowId + "]");
                    //var $cancelButton = $(".cancelOwnership[data-rowid=" + rowId + "]");
                    //var $deleteButton = $(".deleteOwnership[data-rowid=" + rowId + "]");
                    var $saveButton = $that.closest('tr').find(".saveOwnership[data-rowid=" + rowId + "]")
                    var $cancelButton = $that.closest('tr').find(".cancelOwnership[data-rowid=" + rowId + "]");
                    var $deleteButton = $that.closest('tr').find(".deleteOwnership[data-rowid=" + rowId + "]");
                    $saveButton.removeClass("hidden");
                    $cancelButton.removeClass("hidden");
                    $deleteButton.addClass("hidden");
                    $that.addClass("hidden");
                    //Z_Fard_OwnerShip.grd.jqGrid('editRow', rowId,
                    $($that.closest('table')).jqGrid('editRow', rowId,
                        {
                            keys: true,
                            oneditfunc: function (id_row) {
                                debugger;
                                var $selectedShare = $($that).closest('tr').find('#' + rowId + '_SelectPersonShare');
                                var $formattedSelectedArea = $($that).closest('tr').find('#' + rowId + '_FormatedArea');
                                var $formattedSelectedAreaInFeets = $($that).closest('tr').find('#' + rowId + '_SelectPersonAreaInFeets');
                                $selectedShare.off("keypress")
                                    .on("keypress",
                                        function () {
                                            $formattedSelectedArea.val("");
                                            $formattedSelectedAreaInFeets.val("");
                                        });

                                $formattedSelectedArea.off("keypress")
                                    .on("keypress",
                                        function () {

                                            $selectedShare.val("");

                                        });
                                $selectedShare.off("focusout")
                                    .on("focusout",
                                        function () {
                                            debugger;
                                            var selectedShareValue = $selectedShare.val();
                                            //we neeed to get available area here too either in vw_ownership view or posting call back.
                                            var feetPerMarla = $($that.closest('table')).jqGrid('getRowData', rowId)["feet_per_marla"];
                                            var PersonArea = $($that.closest('table')).jqGrid('getRowData', rowId)["PersonArea"];
                                            var PersonAreaKMF = $($that.closest('table')).jqGrid('getRowData', rowId)["PersonAreaKMF"];
                                            var data_feets = AreaCalc.getPersonAreaBySharesInFeets($selectedShare.val(), PersonArea, feetPerMarla);
                                            $formattedSelectedAreaInFeets.val(data_feets);
                                            var data = AreaCalc.getAreaInKMF(data_feets, feetPerMarla);
                                            $formattedSelectedArea.val(data);
                                        });

                                $formattedSelectedArea.off("focusout")
                                    .on("focusout",
                                        function () {
                                            
                                            var formattedSelectedArea = $formattedSelectedArea.val();
                                            //we neeed to get available area here too either in vw_ownership view or posting call back.
                                            var feetPerMarla = $($that.closest('table')).jqGrid('getRowData', rowId)["feet_per_marla"];
                                            var PersonArea = $($that.closest('table')).jqGrid('getRowData', rowId)["PersonArea"];
                                            var PersonAreaKMF = $($that.closest('table')).jqGrid('getRowData', rowId)["PersonAreaKMF"];

                                            var data = AreaCalc.getPersonshareValues($formattedSelectedArea.val(), PersonAreaKMF, feetPerMarla);

                                            debugger;
                                            $formattedSelectedAreaInFeets.val(AreaCalc.getAreaInFeets(feetPerMarla, formattedSelectedArea));
                                            $selectedShare.val(data);
                                        });
                            }
                        });

                });
        $(".saveOwnership")
            .on("click",
                function () {
                    var $that = $(this);
                    var rowId = $that.data("rowid");
                    $that.addClass("hidden");
                    var $cancelButton = $that.closest('tr').find(".cancelOwnership[data-rowid=" + rowId + "]");
                    var $editButton = $that.closest('tr').find(".editOwnership[data-rowid=" + rowId + "]");
                    var $deleteButton = $that.closest('tr').find(".deleteOwnership[data-rowid=" + rowId + "]");

                    $cancelButton.addClass("hidden");
                    $editButton.removeClass("hidden");
                    $deleteButton.removeClass("hidden");
                    //Z_Fard_OwnerShip.grd.jqGrid('saveRow', rowid, successfunc, url, extraparam, aftersavefunc, errorfunc, afterrestorefunc);
                    saveparameters = {
                        "successfunc": null,
                        "url": "/Fard/SaveTransactionDetail",
                        "extraparam": {
                            //FardTransactionID: Z_Fard_OwnerShip.grd.jqGrid('getRowData', rowId)["FardTransactionID"],
                            FardID: $("#FardID").val()
                        },
                        "aftersavefunc": function (row_id, data) {
                            debugger;
                            $(this).jqGrid('setCell', row_id, 'FardDetailID', data.responseJSON.records.FardDetailID);
                        },
                        "errorfunc": null,
                        "afterrestorefunc": null,
                        "restoreAfterError": true,
                        "mtype": "POST"
                    }

                    $($that.closest('table')).jqGrid('saveRow', rowId, saveparameters);
                });
        $(".cancelOwnership")
            .on("click",
                function () {
                    var $that = $(this);
                    var rowId = $that.data("rowid");
                    var $saveButton = $that.closest('tr').find(".saveOwnership[data-rowid=" + rowId + "]");
                    var $editButton = $that.closest('tr').find(".editOwnership[data-rowid=" + rowId + "]");
                    var $deleteButton = $that.closest('tr').find(".deleteOwnership[data-rowid=" + rowId + "]");
                    $editButton.removeClass("hidden");
                    $that.addClass("hidden");
                    $saveButton.addClass("hidden");
                    $deleteButton.addClass("hidden");
                    $($that.closest('table')).jqGrid('restoreRow', rowId
                        , function () {
                            alert('restored back');
                        }
                    );
                });
        $(".deleteOwnership")
            .on("click",
                function () {
                   
                    var $that = $(this);
                    var rowId = $that.data("rowid");
                    var rowdata = $($that.closest('table')).jqGrid('getRowData', rowId);
                    var tst = {
                        fardDetailID: rowdata.FardDetailID
                    };
                    $.get("/Fard/DeleteFardDetail", tst
                        , function (data) {
                        debugger;
                        var postdataparam = {
                            IDs: function () { return Z_Fard.GetPIDs() },
                            KhewatID: function () { return $("#khewatNo").val() },
                            FardID: function () { return $("#FardID").val() }
                        };
                            $($that.closest('table')).loadGrid(postdataparam);
                    }, "json");


                });
    }

}

var Z_Fard_OwnerShip_View = {
    grd: "",
    URL: '/Fard/GetKhewatDetailView',
    OwnerShipDetailViewGrid: function (id) {

        this.grd = $('#' + id);
        //this.URL = url;had coded value
        var pagr_strng = '#pager_' + id;
        this.grd.jqGrid({
            url: this.URL,
            datatype: 'local',
            mtype: "GET",
            height: '100%',
            width: '1100',
            //autowidth: true,
            shrinkToFit: false,
            guiStyle: "bootstrap",
            emptyrecords: 'No records to display',
            styleUI: "Bootstrap",
            loadonce: true,
            colModel: [

                { name: "ID", index: "ID", hidden: true, editable: true },
                { name: "PersonID", index: "PersonID", hidden: true, editable: true },
                { name: "feet_per_marla", index: "feet_per_marla", hidden: true },
                { name: "PersonArea", index: "PersonArea", hidden: true },
                { name: "FardTransactionID", index: "FardTransactionID", hidden: true, editable: true },
                { name: "SelectPersonAreaInFeets", index: "SelectPersonAreaInFeets", hidden: true, editable: true },
                { name: "FardDetailID", index: "FardDetailID", hidden: true, editable: true },
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
                    width: '100'
                },
                {
                    name: "OwnerShiptype",
                    index: "OwnerShiptype",
                    width: '50'
                },
                {
                    name: "PersonAreaKMF",
                    index: "Area ( K-M-F )",
                    width: '150',
                    formatter: function (cellValue, options, rowObject) {
                        return '<a id="fardHref" href="#" >' + cellValue + '</a>';

                    },

                },
                {
                    name: "PlotID",
                    index: "PlotID",
                    hidden: true
                },
                {
                    name: "PlotName",
                    index: "PlotName",
                    width: '50',
                    //editable: true
                },
                {
                    name: "PersonArea",
                    index: "PersonArea",
                    width: '50'

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
                        if (rowObject.SelectPersonAreaInFeets) {
                            return AreaCalc.getAreaInKMF(rowObject.SelectPersonAreaInFeets, 272 /*rowObject.feet_per_marla*/);
                        }
                        return null;

                    }
                }

            ],
            pager: jQuery(pagr_strng),
            rowNum: 10,
            rowList: [10, 20, 30, 40],

            viewrecords: true,
            caption: 'Owner Ship Detail',
            jsonReader:
            {
                root: "rows",
                page: "page",
                total: "total",
                records: "records",
                repeatitems: false,
                Id: "0"
            }
        }).navGrid(pagr_strng, { edit: false, add: false, del: false, search: false, refresh: false });

    },

    loadGrid: function (postDataParam) {

        this.grd.setGridParam({ datatype: 'json', postData: postDataParam }).trigger('reloadGrid');
    },
}

class TransactionVM {
    ID;
    Type;
    MauzaID;
    Date;
    UserID;
}

class FardTransactonVM extends TransactionVM {

    KhewatID;;
    PersonID;
    PersonArea;

    FardID;

    FardDate;
    IssuedPersonName

}

