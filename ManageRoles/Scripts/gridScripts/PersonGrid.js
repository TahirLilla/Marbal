var Z_GRID = {
    grd: "",
    URL: "",
    PersonDetailGrid: function (id, url) {
       
        this.grd = $('#' + id);
        this.URL = url;
        var pagr_strng = '#pager_' + id;
        this.grd.jqGrid({
            url: this.URL,
            datatype: 'local',
            // datatype: "jsonp",
            mtype: "GET",
            height: '100%',
            //width:'1000',
            //autowidth: true,
            shrinkToFit: false,
            guiStyle: "bootstrap",
            emptyrecords: 'No records to display',
            //styleUI: "Bootstrap",
            colModel: [

                { name: "ID", index: "ID", hidden: true, editable: true, key: true },

                {
                    name: "Name",
                    index: "Name",
                    width:'150'

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
                    width: '50'
                },
                {
                    name: "personArea",
                    index: "Area ( K-M-F )",
                    width: '100'

                },
                {
                    name: "ID",
                    index: "ID",
                    width: '100',
                    key: true,
                    label: "selection"
                    ,
                    formatter: function (cellValue, options, rowObject) {

                        return '<button type="button" class="btn btn-link"onClick=showdata(' + cellValue + ')  > Select</button >';
                    }
                },
                {
                    name: "ID",
                    index: "ID",
                    width: '100',
                    key: true,
                    label: "Detail"
                    ,
                    formatter: function (cellValue, options, rowObject) {

                        return '<button type="button" class="btn btn-link"onClick=showdetail(' + cellValue + ')  > Select</button >';
                    }
                }


            ],
            ////add custom button here.
            //gridComplete: function () {
            //    var ids = jQuery(this).jqGrid('getDataIDs');
            //    for (var i = 0; i < ids.length; i++) {
            //        var cl = ids[i];
            //        be = '<button type="button" class="btn btn-link" onClick=showdata(' + cl + ')  > Selct</button >';
            //        //se = "<input style='height:22px;width:20px;' type='button' value='S' onclick=\"jQuery('#rowed2').saveRow('" + cl + "');\"  />";
            //        //ce = "<input style='height:22px;width:20px;' type='button' value='C' onclick=\"jQuery('#rowed2').restoreRow('" + cl + "');\" />";

            //        jQuery(this).jqGrid('setRowData', ids[i], { act: be });
            //    }
            //    //set width .
                
            //    //var grd_view = jQuery(this).closest(".ui-jqgrid-view");
            //    //grd_view.css('width', '');
                
            //    //var gridName = this.id;
            //    //debugger;
            //    //$('#' + gridName ).css({ 'width': '' });
            //    //$('#gbox_' + gridName).css({ 'width': '' });
            //    //var hdiv = $('#gbox_' + gridName).find('.ui-jqgrid-hdiv').css({ 'width': '' });
            //    //$('#' + gridName + '_ID').css({ 'width': '' });
            //    //$('#pager_' + gridName).css({ 'width': '' });
                
               
               

            //},
         

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


      

        //$('#' + id).jtable({
        //    title: 'UsersList',
        //    paging: true,
        //    pageSize: 10,
        //    sorting: true,
        //    editinline: { enable: true },
        //    actions:
        //    {
        //        listAction: url,// '/Ownership/ShowData', 
        //        updateAction: '/Fard/UpdateAction'
        //        //deleteAction: '/AllUsers/RemoveUser'
        //    },
        //    fields: {
        //        ID: {
        //            key: true,
        //            list: false
        //        },

        //        Name: {

        //            title: 'Name',
        //            width: '10%',
        //           edit: false
        //        },
        //        RelationName: {

        //            title: 'RelationName',
        //            width: '5%',
        //            edit: false
        //        },
        //        LastName: {
        //            title: 'LastName',
        //            width: '10%'
        //            , edit: false
        //        },
        //        NIC: {
        //            title: 'NIC',
        //            width: '20%'
        //            , edit: false
        //        },
        //        PhoneNumber: {
        //            title: 'PhoneNumber',
        //            width: '20%'
        //            , edit: false
        //        },
        //        PersonKhewats: {
        //            title: 'KhewatNo',
        //            width: '10%'
        //            , edit: false
        //        },
        //        personArea: {
        //            title: 'Area(K-M-F)',
        //            width: '10%'
        //        },
        //        TEST: {
        //            title: 'SelectedArea',
        //            width:'10%'
        //        },
        //        Select: {
        //            title: 'MyButton',
        //            width: '10%',
        //            display: function (data) {

        //                return '<button type="button" class="btn btn-link" onClick=showdata(' + data.record.ID + ')>Selct</button>';
        //            }
        //            , edit: false
        //        }
        //    }
        //});
    },//end of function
    loadGrid: function (postDataParam) {
        this.grd.setGridParam({ datatype: 'json', postData: postDataParam }).trigger('reloadGrid');
    },
    ReloadGrid: function () {
        this.grd.trigger('reloadGrid');
    },
    resizeGrid: function () {
        debugger;
        jQuery("#UserTableContainer").jqGrid("setGridWidth", jQuery("#UserTableContainer").closest(".panel-default").width());

    }
}//end of z_grid.
