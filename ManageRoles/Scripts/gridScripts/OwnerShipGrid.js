function OwnershiDetailGrid(url) {

    $('#DetailView').jtable({
        title: 'UsersList',
        paging: false,
        pageSize: 10,
        sorting: true,
        actions:
        {
            listAction: url,// '/Ownership/DetailShowData'
        },
        fields: {
            ID: {
                key: true,
                list: false
            },
            MauzaName: {

                title: 'MauzaName',
                width: '10%'
            },
            Name: {

                title: 'Name',
                width: '10%'
            },
            LastName: {
                title: 'LastName',
                width: '10%'
            },
            NIC: {
                title: 'NIC',
                width: '20%'
            },

            KhewatNo: {
                title: 'KhewatNo',
                width: '20%'
            },
            PersonAreaKMF: {
                title: '"Area(K-M-F)',
                width: '10%'
            }

        }
    });
}

var Z_PersonShowGRID = {
    grd: "",
    URL: "/Registery/TransactionData",

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
                    width: '150'
                },
                {
                    name: "NIC",
                    index: "NIC",
                    width: '150'
                },
                {
                    index: "PhoneNumber",
                    name: "PhoneNumber",
                    width: '150'
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
                { name: 'del', index: 'del', width: '100', sortable: false, formatter: this.delButton },



            ],
            //add custom button here.
            gridComplete: function () {
                $(".deletedata")
                    .on("click", function () {
                        debugger;
                        var $that = $(this);
                        var rowId = $that.data("rowid");
                        var rowObj = Z_Registery.grd.jqGrid('getRowData', rowId);
                        //personID
                        var PersonID = rowObj.PersonID;
                        Z_PIDs.setHDPID($("#PIDs"));
                        Z_PIDs.InsertSelectedUsersIDs(PersonID);
                        //reload the old grid data.
                    });

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

    },//end of function
    delButton: function (cellvalue, options, rowObject) {
        // some business logic for each row

        return '<i  class="glyphicon glyphicon-trash deletedata" data-rowId=' + options.rowId + '   />';
    },
    loadGrid: function (hiddenfieldval) {
        debugger;
        //this.grd.setGridParam({ datatype: 'json', postData: { PIDs: hiddenfieldval, MauzaID: $("#MauzaID").val() } }).trigger('reloadGrid');

        var postdataParam = {
            PIDs: function () { return hiddenfieldval },
            MauzaID: function () {
                return $("#MauzaID").val()
            }
        };
        this.grd.setGridParam({ datatype: 'json', postData: postdataParam }).trigger('reloadGrid');
    },

}
