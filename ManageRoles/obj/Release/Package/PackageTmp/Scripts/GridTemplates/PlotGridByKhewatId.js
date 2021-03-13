var plotViewTemplate = [
    {
        name: "PlotName",
        index: "PlotName",
        width: '150'
    },
    {
        name: "PlotArea",
        index: "Area ( K-M-F )",
        width: '100',
        formatter: function (cellValue, options, rowObject) {
            return AreaCalc.getAreaInKMF(cellValue, 272);
        }

    },
    {
        name: "KhasraID",
        index: "Khasra ID",
        width: '100'
    },
    {
        name: "PlotTypeName",
        index: "Plot Type",
        width: '100'
    },
    {
        name: "ID",
        index: "ID",
        key: true
        ,
        formatter: function (cellValue, options, rowObject) {

            return '<button type="button" class="btn btn-link"onClick=FillForm(' + cellValue + ')  > Select</button >';
        }
    }
];