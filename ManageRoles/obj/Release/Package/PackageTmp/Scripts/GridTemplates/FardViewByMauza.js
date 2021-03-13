var templateFardView = [

    {
        name: "FARDID",
        index: "FARDID",
        width: '100'

    },
    {
        name: "MauzaID",
        index: "MauzaID",
        width:'100'
    },
    {
        name: "FardDate",
        index: "FardDate",
        formatter: 'date',
        formatoptions: { srcformat: 'd/m/Y', newformat: 'd/m/Y' },
        width: '100'
    },
    {
        name: "IssuedPersonName",
        index: "IssuedPersonName",
        width: '150'
    },
    {
        name: "TransactionStatus",
        index: "TransactionStatus",
        width: '150'
    },
    {
        name: "CompletionDate",
        index: "CompletionDate",
        formatter: 'date',
        formatoptions: { srcformat: 'd/m/Y', newformat: 'd/m/Y' },
        width: '150'
    },
    {
        name: "UserID",
        index: "UserID",
        width: '100'
    },
    {
        name: "MauzaName",
        index: "MauzaName",
        width: '100'
    },
    {
        name: "UserName",
        index: "UserName",
        width: '100'
    },
    {
        name: "ID",
        index: "ID",
        width:'100',
        key: true
        ,
        formatter: function (cellValue, options, rowObject) {

            return '<button type="button" class="btn btn-link"onClick=FillForm(' + cellValue + ')  > Select</button >';
        }
    }


];