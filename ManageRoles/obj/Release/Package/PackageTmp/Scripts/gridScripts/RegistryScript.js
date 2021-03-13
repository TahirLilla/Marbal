//pre-requisites : Z_PiDs.js & Z_BaseClassJQGRid.js
var Z_Registery = {

    init: function () {
        $.extend(Z_Registery, Z_BaseClassJQGRID);
    },
    grd: "",
    URL: "/Person/ShowData",
    PersonDetailGrid: function (id) {

        this.grd = $('#' + id);
        this.URL = this.URL;
        var pagr_strng = '#pager_' + id;
        this.grd.jqGrid({
            url: this.URL,
            datatype: 'local',
            mtype: "GET",
            height: '100%',
           // width: '1400',
            //autowidth: true,
            shrinkToFit: false,
            guiStyle: "bootstrap",
            emptyrecords: 'No records to display',
            //styleUI: "Bootstrap",
            colModel: [

                { name: "ID", index: "ID", hidden: true, editable: true },

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
                    width: '100'
                },
                {
                    name: "NIC",
                    index: "NIC",
                    width: '100'
                },
                {
                    index: "PhoneNumber",
                    name: "PhoneNumber",
                    width: '100'
                },
                {
                    name: "PersonKhewats",
                    index: "Khewat No",
                    width: '100'
                },
                {
                    name: "personArea",
                    index: "Area ( K-M-F )",
                    width: '150'

                },
                { name: 'old', index: 'old', width: '100', sortable: false, formatter: this.BiaButton },
                { name: 'new', index: 'new', width: '100', sortable: false, formatter: this.MushtriButton }


            ],
            //add custom button here.
            gridComplete: function () {
                $(".olddata")
                    .on("click", function () {
                        debugger;
                        var $that = $(this);
                        var rowId = $that.data("rowid");
                        var rowObj = Z_Registery.grd.jqGrid('getRowData', rowId);
                        //personID
                        var PersonID = rowObj.ID;
                        Z_PIDs.setHDPID($("#PIDs"));
                        Z_PIDs.InsertSelectedUsersIDs(PersonID);
                        //reload the old grid data.
                        Z_BaseClassJQGRID.loadGridWithGridID("OldUserTableContainer", { PIDs: $("#PIDs").val(), MauzaID: $("#MauzaID").val() });
                    });
                $(".newdata")
                    .on("click", function () {
                        debugger;
                        var $that = $(this);
                        var rowId = $that.data("rowid");
                        var rowObj = Z_Registery.grd.jqGrid('getRowData', rowId);
                        //personID
                        var PersonID = rowObj.ID;
                        var Mushtri_PIDs = $("#MPIDS");
                        Z_PIDs.setHDPID(Mushtri_PIDs);
                        Z_PIDs.InsertSelectedUsersIDs(PersonID);
                        Z_BaseClassJQGRID.loadGridWithGridID("NewUserTableContainer", { PIDs: Mushtri_PIDs.val(), MauzaID: $("#MauzaID").val() });
                    });
            //        var ids = jQuery(this).jqGrid('getDataIDs');
            //        for (var i = 0; i < ids.length; i++) {
            //            var cl = ids[i];
            //            be = '<button type="button" class="btn btn-link" onClick=OldSelectData(' + cl + ')  > پورانا اندراج</button >';
            //            se = '<button type="button" class="btn btn - link" onClick=NewSelectData(' + cl + ')  > نیا اندراج</button >';
            //            //ce = "<input style='height:22px;width:20px;' type='button' value='C' onclick=\"jQuery('#rowed2').restoreRow('" + cl + "');\" />";

            //            jQuery(this).jqGrid('setRowData', ids[i], { act: [be , se] });
            //        }



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

    },//end of grid
    BiaButton: function(cellvalue, options, rowObject) {
        // some business logic for each row
       
        return '<button type="button" class="btn btn-link olddata"  data-rowId=' + options.rowId + '   > پورانا اندراج</button >';
    },
    MushtriButton: function (cellvalue, options, rowObject) {
        // some business logic for each row
      
        return '<button type="button" class="btn btn-link newdata"  data-rowId=' + options.rowId + '   > نیا اندراج</button >';
    }
}
//Z_Registery.prototype.Print = function () {
//    console.log("prototyy[e checkicng");
//}