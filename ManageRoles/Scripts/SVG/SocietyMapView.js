var SMV = {
    CreateRectangles: function CreateRectangles(totalrect, xcord, ycord, Mangle, widthofRec, heightofRec) {

        var rectangles = d3.range(totalrect).map(function (d) {

            return {
                id: 0,
                x: xcord,
                y: ycord,
                width: widthofRec,
                height: heightofRec,
                angle: Mangle,
                BlockID: blockID,
                KhasraID: khsraID,
                PlotTypeID: plotTypeID,
                text: 'this',
                PlotStatus: '',
                Color:''
            };
        });
        return rectangles;
    },
    addRectangleToGroup: function (grp) {
        debugger;
        grp.append("rect")
            .attr("id", function (d, i) { return ("P" + d.ID); /*fnumber+ d.id*/ })
            .attr("x", function (d, i) { return d.x + d.width * i; })
            .attr("y", function (d) {

                return d.y;
            })
            .attr("height", function (d) { return d.height })//.attr('id',)
            .attr("width", function (d, i) { return d.width })//.attr('transform', function (d) { return 'rotate(' + d.Angle + ') translate(0 -' + d.Angle + ')'; })
            .style("fill", function (d) {
                return d.Color;
            }).attr('stroke', 'black');
        grp.append("text")
            .attr("x", function (d, i) { return d.x + (d.width * i)+2; })
            .attr("y", function (d) { return d.y + d.height / 3; })
            .attr("text-anchor", "start")//.attr('transform', function (d) { return 'rotate(' + d.Angle + ') translate(0 -' + d.Angle + ')'; })
            .style("fill", "black")
            .text(function (d, i) {

                return d.Text;
            });
        grp.append("text")
            .attr("x", function (d, i) { return d.x + (d.width * i)+1; })
            .attr("y", function (d) { return d.y + d.height / 1.5; })
            .attr("text-anchor", "start")//.attr('transform', function (d) { return 'rotate(' + d.Angle + ') translate(0 -' + d.Angle + ')'; })
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
        debugger;
        var maingroup = svg.append("g").attr("id", function () { return "G" + svggroup.ID }).datum({ x: svggroup.GTX, y: svggroup.GTY, innerD: svggroup.innerGroupsData[0] })
            .attr('transform', function (d) {

                var dat = d.innerD;
                var str = 'translate(' + svggroup.GTX + ',' + svggroup.GTY + ')';
                if (dat) {
                    str += 'rotate(' + dat.Angle + ') translate(0 -' + dat.Angle + ')'
                }
                return str;

            })

        var group = maingroup.selectAll('g')
            .data(svggroup.innerGroupsData)
            .enter().append("g")
            .on('click', function (d) {
                debugger;
                $('.bd-example-modal-lg').modal('show');
                document.getElementById("PNameLabel").innerHTML = d.BlockName + "-" + d.Text;
                document.getElementById("PStatusLable").innerHTML = d.Name;
                var paramdata = {
                    
                    plotId: d.ID
                };
                Z_BaseClassJQGRID.loadGridWithGridID("DetailViewGrid", paramdata);
            })
        var length_of = group._groups[0].length;
        for (counter = 0; counter < length_of; counter++)
            rect_id.push(group._groups[0][counter].__data__.id);
        this.addRectangleToGroup(group);
    },

    pushChangeData: function (data) {

        var filtereddata = [];
        for (var i = 0; i < myArray.length; i++) {
            if (myArray[i].ID == data.ID) {
                myArray[i] = data;
                filtereddata = myArray;
                break;
            }
        }
        if (filtereddata.length == 0) {
            myArray.push(data);
        }
    },

    //will be used in future if need .. not impemented yet
    //GetPlotOnwershipInfo:function (plotID , URL) {
    //    $.ajax({
    //        type: "POST",
    //        url: URL,
    //        dataType: "json",
    //        success: function (data) {
    //            debugger;

    //        }
    //    });
    //},
    Main: function (svgdata) {

        for (var i = 0; i < svgdata.length; i++) {
            this.createMainGroup(svgdata[i]);
            this.pushChangeData(svgdata[i]);
        }
    },

    transition: function (element) {

        d3.selectAll("rect").style("fill", function (d) {
            return d.Color; 
        });
        var g = svg;

        // Bounds in local coordinates space:
        var bounds = element.getBBox();

        // Corners of rect in local coordinate space:
        var corners = [
            { x: bounds.x, y: bounds.y },
            { x: bounds.x + bounds.width, y: bounds.y },
            { x: bounds.x + bounds.width, y: bounds.y + bounds.height },
            { x: bounds.x, y: bounds.y + bounds.height }
        ];

        // Hold original transform:
        var oldTransform = g.attr("transform");
        // Reset transform:
        g.attr("transform", "");

        // relevant transform:
        var t = element.getCTM();

        // Convert the points to global SVG coordainte space:
        for (var i = 0; i < corners.length; i++) {
            var point = svg.node().createSVGPoint();
            point.x = corners[i].x;
            point.y = corners[i].y;
            corners[i] = point.matrixTransform(t);
        }

        // get extents for x,y in global SVG space:
        var x = d3.extent(corners, function (d) { return d.x; });
        var y = d3.extent(corners, function (d) { return d.y; });
        var w = x[1] - x[0];
        var h = y[1] - y[0];
        var k = 1;// scale(w,h,SVGwidth,SVGheight);
        // Offset to center feature:
        var ox = (SVGwidth - w * k) / 8;
        var oy = (SVGheight - h * k) / 8;

        var scale_x = (-x[0] * k + ox);
        var scale_y = (-y[0] * k + oy);

        var newTransform = "translate(" + [scale_x, scale_y] + ")scale(" + k + ")"
        
        debugger;
        g.attr("transform", oldTransform)
            .transition()
            .on("start", function () {
                d3.select(element).style("fill", function (d) { return "orange" });
            })
            .duration(2000)
            .attr("transform", newTransform)
            .on("end", function () {
                //d3.select(element).style("fill", "none");
                trans = newTransform;
                //current = current % g.selectAll("rect").size();
                //transition();
                var newTrans = d3.zoomIdentity
                    .translate(scale_x, scale_y)
                    .scale(1);
                svg.call(zoom.transform, newTrans);

            });
        //svg.transition()
        //    .duration(750)
        //    .call(
        //        svg.zoom,
        //        d3.zoomIdentity.translate([-x[0] * k + ox, -y[0] * k + oy]).scale(k)
        //    );


    },
    scale: function (elementWidth, elementHeight, SVGWidth, SVGHeight) {
        return Math.min(SVGWidth / elementWidth * 0.8, SVGHeight / elementHeight * 0.8);
    }

};