var  AreaCalc = {
    getAreaInFeets: function (feet_per_marla, areaInKMF) {
       
        var splitKMF = areaInKMF.split('-');
        if (splitKMF.length != 3 || feet_per_marla < 0) {
            return -1;
        }
        var kanal = splitKMF[0];
        var marla = kanal * 20 + parseInt(splitKMF[1]);
        var feets = (marla * feet_per_marla) + parseInt(splitKMF[2]);
        return feets;
    },
    //getPersonAreaBySharesInFeets: function (shares, personareaKMF, feet_per_marla) {
        
    //    var splitShares = shares.split('/');
    //    if (splitShares.length != 2)
    //        return -1;
    //    var nominator = splitShares[0];
    //    var denominator = splitShares[1];
    //    if (nominator <= 0 || denominator <= 0)
    //        return -1;
    //    var areaInFeets = this.getAreaInFeets(feet_per_marla, personareaKMF);
    //    if (areaInFeets <= 0)
    //        return -1;

    //    var res = (areaInFeets * nominator) / denominator;
    //    return res;
    //},
    getPersonAreaBySharesInFeets: function (shares, areaInFeets, feet_per_marla) {

        var splitShares = shares.split('/');
        if (splitShares.length != 2)
            return -1;
        var nominator = splitShares[0];
        var denominator = splitShares[1];
        if (nominator <= 0 || denominator <= 0)
            return -1;

        if (areaInFeets <= 0)
            return -1;

        var res = (areaInFeets * nominator) / denominator;
        return res;
    },
    getAreaInKMF: function (personarea, feet_per_marla) {
        
        if (personarea <= 0 || feet_per_marla <= 0)
            return -1;
        var kanal, marla, feet = 0;
        var t = personarea / feet_per_marla;
        kanal = Math.floor(t / 20);
        marla = Math.floor(t % 20);
        feet = Math.floor(personarea % feet_per_marla);

        return (kanal + "-" + marla + "-" + feet);
    },
    //getPersonAreaBySharesInKMF: function (shares, personareaKMF, feet_per_marla) {
    //    debugger;
    //    var areaInfeets = this.getPersonAreaBySharesInFeets(shares, personareaKMF, feet_per_marla);
    //    if (areaInfeets <= 0)
    //        return -1;
    //    return this.getAreaInKMF(areaInfeets, feet_per_marla);
    //},
    getPersonAreaBySharesInKMF: function (shares, areaInfeets, feet_per_marla) {
        debugger;

        if (areaInfeets <= 0)
            return -1;
        return this.getAreaInKMF(areaInfeets, feet_per_marla);
    },
    getPersonshareValues: function (selectedAreaKMF, personareaKMF, feet_per_marla) {
        var selectedAreaFeets = this.getAreaInFeets(feet_per_marla, selectedAreaKMF);
        var personAreaFeets = this.getAreaInFeets(feet_per_marla, personareaKMF);
        var pointval = parseInt(selectedAreaFeets) / parseInt(personAreaFeets);
        var fractionValues = this.getFractionValue(pointval);
        if (fractionValues.length > 10) {
            fractionValues = selectedAreaFeets + "/ " + personAreaFeets;
        }
        return fractionValues;
    },
    getPersonshareValuesUpdated: function (selectedAreaKMF, personareaKMF, feet_per_marla) {
        var selectedAreaFeets = this.getAreaInFeets(feet_per_marla, selectedAreaKMF);
        var personAreaFeets = this.getAreaInFeets(feet_per_marla, personareaKMF);
        var pointval = parseInt(selectedAreaFeets) / parseInt(personAreaFeets);
        return this.getFractionValueUpDate(pointval);
    },
    getFractionValue: function (valueInPoints) {
        var gcd = function (a, b) {
            if (b < 0.0001) return a;                // Since there is a limited precision we need to limit the value.

            return gcd(b, Math.floor(a % b));           // Discard any fractions due to limitations in precision.
        };
        
        var len = valueInPoints.toString().length - 2;

        var denominator = Math.pow(10, len);
        var numerator = valueInPoints * denominator;

        var divisor = gcd(numerator, denominator);    // Should be 5

        numerator /= divisor;                         // Should be 687
        denominator /= divisor;                       // Should be 2000

        return (Math.floor(numerator) + '/' + Math.floor(denominator));
    }
}