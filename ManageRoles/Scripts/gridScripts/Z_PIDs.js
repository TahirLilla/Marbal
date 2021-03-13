var Z_PIDs = {
    hdPid: $("#PIDs"),
    setHDPID: function (PIDobject) {
        this.hdPid = PIDobject;
    },
    DeleteUsersIDs: function (hiddenfiled, id) {
        debugger;
        var pidelements;
        if (hiddenfiled.val() == "") {
            pidelements = [];
            return;
        } else {

            pidelements = JSON.parse(hiddenfiled.val());
        }
        //if Id doesnot exist in array then return .and ID is greater then -1 if value exist for that we move farward from if statement
        if (!(jQuery.inArray(id, pidelements) >= 0)) {
            return;
        }
        pidelements.pop(id);
        var result = JSON.stringify(pidelements);
        hiddenfiled.val(result);
        return result;
    },

    InsertSelectedUsersIDs: function (id) {
        id = parseInt(id);
        var pidelements = [];
        if (this.hdPid.val() == "") {
            //pidelements = [];
        } else {

            pidelements = JSON.parse(this.hdPid.val());
        }
        if (jQuery.inArray(id, pidelements) >= 0) {
            return -1;
            //ErrorMessage();
            //return pidelements;
        }
        pidelements.push(id);

        this.hdPid.val(JSON.stringify(pidelements));
        return pidelements;
    },
    GetPIDs: function () {

        var pidelements;
        if (this.hdPid.val() == "") {
            pidelements = [];
        } else {

            pidelements = JSON.parse(this.hdPid.val());
        }
        return pidelements;
    },
    GetPIDsByHiddenField: function (hiddenFieldObj) {
        debugger;
        this.hdPid =hiddenFieldObj;
        var pidelements;
        if (this.hdPid.val() == "") {
            pidelements = [];
        } else {

            pidelements = JSON.parse(this.hdPid.val());
        }
        return pidelements;
    },

    GetUserIDs: function GetUserIDs() {
        var ids = this.hdPid.val();
        var pidelements = [];
        if (ids) {
            pidelements = JSON.parse(ids);
        }
        return pidelements;
    }
}