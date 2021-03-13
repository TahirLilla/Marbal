var Z_Registery_EditGrid_Bia = (function () {
    //"use strict";
    var grd = $("#FardSelectedView");
    var URL = Z_COMMON.URL.REGISTERY_OWNERSHIP_BIA;
    var BiaDetailGrid = function (id) {

        this.grd = $('#' + id);
        //this.URL = url;had coded value
        var pagr_strng = '#pager_' + id;
        var $tempate = Z_JQGridTemplates.RegisteryBiaTempate.slice();
        $tempate.push({
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

        });
        this.grd.jqGrid({

            url: this.URL,
            datatype: 'local',
            // datatype: "jsonp",
            mtype: "GET",
            height: '100%',
            //width: '1300',
            //autowidth: true,
            shrinkToFit: false,
            guiStyle: "bootstrap",
            emptyrecords: 'No records to display',
            //styleUI: "Bootstrap",
            loadonce: true,
            colModel:
                $tempate,
            loadComplete: function () {
                Z_Registery_EditGrid_Bia.bindKhewatGridEvents();

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

    };

    var loadGrid = function () {
        var postdataparam = {
            IDs: function () { return Z_PIDs.GetPIDsByHiddenField($("#PIDs")) },
            KhewatID: function () { return $("#khewatNo").val() },
            registerID: function () { return parseInt($("#ID").val()) },
            isNew: function () { return false; }
        };
        this.grd.setGridParam({ datatype: 'json', postData: postdataparam }).trigger('reloadGrid');
    };
    var bindKhewatGridEvents = function () {

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
                                            var PersonArea = Z_BaseClassJQGRID.getEditColumnVal($that, rowId, "PersonArea");// $($that.closest('table')).jqGrid('getRowData', rowId)["PersonArea"];
                                            //var PersonAreaKMF = $($that.closest('table')).jqGrid('getRowData', rowId)["PersonAreaKMF"];
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
                        "url": Z_COMMON.URL.REGISTERY_OWNERSHIP_SAVE_BIA,
                        "extraparam": {
                            isNew: false
                            // registeryID: $("#ID").val()
                        },
                        "aftersavefunc": function (row_id, data) {
                            //debugger;
                            //$(this).jqGrid('setCell', row_id, 'FardDetailID', data.responseJSON.records.FardDetailID);
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
                            Z_Registery_EditGrid_Bia.loadGrid();
                        }
                    );
                });
        $(".deleteOwnership")
            .on("click",
                function () {
                    debugger;
                    var $that = $(this);
                    var rowId = $that.data("rowid");
                    var rowdata = $($that.closest('table')).jqGrid('getRowData', rowId);
                    var tst = {
                        registeryDetailID: rowdata.RegisteryDetailID
                    };
                    $.get(Z_COMMON.URL.REGISTERY_OWNERSHIP_DELETE, tst
                        , function (data) {
                            Z_Registery_EditGrid_Bia.loadGrid();
                        }, "json");


                });
    };

    return {
        BiaDetailGrid: BiaDetailGrid,
        URL: URL,
        loadGrid: loadGrid,
        bindKhewatGridEvents: bindKhewatGridEvents,

        grd: grd
    };
})();