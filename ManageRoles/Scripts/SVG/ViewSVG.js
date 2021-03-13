var SVGView = {
    /* CreateRectangles: function (totalrect, xcord, ycord, Mangle, widthofRec, heightofRec, recId, recText) {
 
         var rectangles = d3.range(totalrect).map(function (d) {
 
             return {
                 id: recId,
                 x: xcord,
                 y: ycord,
                 width: widthofRec,
                 height: heightofRec,
                 angle: Mangle,
                 BlockID: 1,
                 text: recText
             };
         });
         return rectangles;
     },
     */
    addRectangleToGroup: function (grp) {

        grp.append("rect")
            .attr("id", function (d, i) { return d.id; /*fnumber+ d.id*/ })
            .attr("x", function (d, i) { return d.x + d.width * i; })
            .attr("y", function (d) {

                return d.y;
            })
            .attr("height", function (d) { return d.height })//.attr('id',)
            .attr("width", function (d, i) { return d.width }).attr('transform', function (d) { return 'rotate(' + d.Angle + ') translate(0 -' + d.Angle + ')'; })
            .style("fill", 'transparent').attr('stroke', 'black');
        grp.append("text")
            .attr("x", function (d, i) { return d.x + d.width * i; })
            .attr("y", function (d) { return d.y + d.height / 3; })
            .attr("text-anchor", "start").attr('transform', function (d) { return 'rotate(' + d.Angle + ') translate(0 -' + d.Angle + ')'; })
            .style("fill", "black")
            .text(function (d, i) {

                return d.Text;
            });
        grp.append("text")
            .attr("x", function (d, i) { return d.x + d.width * i; })
            .attr("y", function (d) { return d.y + d.height / 1.5; })
            .attr("text-anchor", "start").attr('transform', function (d) { return 'rotate(' + d.Angle + ') translate(0 -' + d.Angle + ')'; })
            .style("fill", "black")
            .text(function (d, i) {
              
                var kmf = AreaCalc.getAreaInKMF(d.Area, 272).split('-');
                var resultstr = "";
                if (kmf[0] != 0) {
                    resultstr += kmf[0] + "K ";

                }
                if (kmf[1] != 0) {
                    resultstr += kmf[1] + "M"
                }
                return resultstr;

            });
        return grp;
    },
    createMainGroup: function (svggroup) {

        var maingroup = svg.append("g").attr("id", function () { return svggroup.ID }).datum({ x: svggroup.GTX, y: svggroup.GTY })
            .attr('transform', function (d) { return 'translate(' + svggroup.GTX + ',' + svggroup.GTY + ')'; })
            .call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended));
        var group = maingroup.selectAll('g')
            .data(svggroup.innerGroupsData)
            .enter().append("g")
        // debugger;

        var length_of = group._groups[0].length;
        for (counter = 0; counter < length_of; counter++)
            rect_id.push(group._groups[0][counter].__data__.id);
        this.addRectangleToGroup(group);
    },
    Main: function (svgdata) {

        for (var i = 0; i < svgdata.length; i++) {
            this.createMainGroup(svgdata[i]);
            pushChangeData(svgdata[i]);
        }
    }

};