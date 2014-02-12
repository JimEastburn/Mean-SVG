angular.module('mean.system').controller('IndexController', ['$scope', 'Global', function ($scope, Global) {

    $scope.global = Global;

    $scope.addTextBox = function(){
        var s = Snap("#svg");
        s.text(200, 100, "Text box...").drag();
    };

    $scope.outputPdf = function(){
//        var doc = new jsPDF();
//        doc.text(20, 20, 'Hello world.');
//        doc.save('Test.pdf');


        // https://github.com/CBiX/svgToPdf.js
//        // I recommend to keep the svg visible as a preview
//        var svg = $('#container > svg').get(0);
//// you should set the format dynamically, write [width, height] instead of 'a4'
//        var pdf = new jsPDF('p', 'pt', 'a4');
//        svgElementToPdf(svg, pdf, {
//            scale: 72/96, // this is the ratio of px to pt units
//            removeInvalid: true // this removes elements that could not be translated to pdf from the source svg
//        });
//        pdf.output('datauri'); // use output() to get the jsPDF buffer

        var pdfdoc = new jsPDF();
        var s = $("#svg");
        var options = {};
        options.removeInvalid = false;
        options.scale = 1.0;
        options.x_offset = 0;
        options.y_offset = 0;
        options.ego_or_link = false;
        var svgPdf = pdfdoc.svgElementToPdf(s, pdfdoc, options);

        svgPdf.save('Test.pdf');

    };

    $scope.addCircle = function(){
        var s = Snap("#svg");
        var bigCircle = s.circle(150, 150, 100).drag();

        bigCircle.attr({
            fill: "#bada55",
            stroke: "#000",
            strokeWidth: 5
        });
    };

    $scope.addDropTarget = function(){

        var s = Snap("#svg");
        var bigSquare = s.rect(100, 100, 200, 200);


        var image = s.image("/../img/Chrysanthemum.jpg", 100, 100, 200, 200);

        var topLeft = s.circle(100, 100, 7);
        var topRight = s.circle(300, 100, 7);
        var bottomRight = s.circle(300, 300, 7);
        var bottomLeft = s.circle(100, 300, 7);

        bigSquare.attr({
            fill: "#fff",
            stroke: "#000",
            strokeWidth: 5
        });

        var dragStart = function(x, y, e) {

            // Save some starting values
            this.ox = this[0].attr('x');
            this.oy = this[0].attr('y');
            this.ow = this[0].attr('width');
            this.oh = this[0].attr('height');

            this.dragging = true;
        };

        var dragMove = function(dx, dy, x, y, e) {

            // Inspect cursor to determine which resize/move process to use
            switch (this.attr('cursor')) {

                case 'nw-resize' :
                    this[0].attr({
                        x:  e.offsetX,
                        y:  e.offsetY,
                        width: this.ow - dx,
                        height: this.oh - dy
                    });

                    this[1].attr({
                        x:  e.offsetX,
                        y:  e.offsetY,
                        width: this.ow - dx,
                        height: this.oh - dy
                    });

                    this[2].attr({//topLeft nw   
                        cx:  e.offsetX,
                        cy:  e.offsetY
                    });

                    this[3].attr({//topRight  ne 
                        cx:  e.offsetX + (this.ow - dx),
                        cy:  e.offsetY

                    });

                    this[4].attr({//bottomRight   se 
                        cx:  e.offsetX + (this.ow - dx),
                        cy:  e.offsetY + (this.oh - dy)
                    });

                    this[5].attr({//bottomLeft  sw  
                        cx:  e.offsetX  ,
                        cy:  e.offsetY + (this.oh - dy)
                    });
                    break;

                case 'ne-resize' :
                    this[0].attr({
                        y: e.offsetY,
                        width: e.offsetX - this.ox,
                        height: this.oh - dy
                    });

                    this[1].attr({
                        y: e.offsetY,
                        width: e.offsetX - this.ox,
                        height: this.oh - dy
                    });

                    this[2].attr({//topLeft nw
                        cx:  e.offsetX - this.ow - dx ,
                        cy:  e.offsetY
                    });

                    this[3].attr({//topRight  ne 
                        cx:  e.offsetX,
                        cy:  e.offsetY

                    });

                    this[4].attr({//bottomRight   se  
                        cx:  e.offsetX,
                        cy:  (e.offsetY) + (this.oh - dy)
                    });

                    this[5].attr({//bottomLeft  sw
                        cx:  e.offsetX - this.ow - dx,
                        cy:  (e.offsetY) + (this.oh - dy)
                    });
                    break;

                case 'se-resize' :
                    this[0].attr({
                        width: e.offsetX - this.ox,
                        height: e.offsetY - this.oy
                    });

                    this[1].attr({
                        width: e.offsetX - this.ox,
                        height: e.offsetY - this.oy
                    });

                    this[2].attr({//topLeft 
                        //no changes
                    });

                    this[3].attr({//topRight 
                        cx:  e.offsetX
                    });

                    this[4].attr({//bottomRight  
                        cx:  e.offsetX ,
                        cy:  e.offsetY
                    });

                    this[5].attr({//bottomLeft  
                        cy:  e.offsetY
                    });


                    break;

                case 'sw-resize' :
                    this[0].attr({
                        x: e.offsetX,
                        width: this.ow - dx,
                        height: e.offsetY - this.oy
                    });

                    this[1].attr({
                        x: e.offsetX,
                        width: this.ow - dx,
                        height: e.offsetY - this.oy
                    });

                    this[2].attr({
                        cx:  e.offsetX
                    });


                    this[4].attr({
                        cy:  e.offsetY
                    });

                    this[5].attr({//bottomLeft  works
                        cx:  e.offsetX,
                        cy:  e.offsetY
                    });
                    break;

                default :
                    this[0].attr({
                        x:  e.offsetX - (this.ow *.5) ,
                        y:  e.offsetY - (this.oh *.5)
                    });

                    this[1].attr({
                        x:  e.offsetX - (this.ow *.5) ,
                        y:  e.offsetY - (this.oh *.5)
                    });

                    this[2].attr({//topLeft
                        cx:  e.offsetX - (this.ow *.5) ,
                        cy:  e.offsetY - (this.oh *.5)
                    });

                    this[3].attr({//topRight
                        cx:  e.offsetX +(this.ow *.5) ,
                        cy:  e.offsetY - (this.oh *.5)
                    });

                    this[4].attr({//bottomRight
                        cx:  e.offsetX +(this.ow *.5) ,
                        cy:  e.offsetY + (this.oh *.5)
                    });

                    this[5].attr({//bottomLeft
                        cx:  e.offsetX -(this.ow *.5) ,
                        cy:  e.offsetY + (this.oh *.5)
                    });
                    break;

            }
        };

        var dragEnd = function() {
            this.dragging = false;
        };

        var changeCursor = function(e, mouseX, mouseY) {

            // Don't change cursor during a drag operation
            if (this.dragging === true) {
                return;
            }

            // X,Y Coordinates relative to shape's orgin
            var relativeX = mouseX - $('#svg').offset().left - this[0].attr('x');
            var relativeY = mouseY - $('#svg').offset().top - this[0].attr('y');

            var shapeWidth = this[0].attr('width');
            var shapeHeight = this[0].attr('height');

            var resizeBorder = 10;

            // Change cursor
            if (relativeX < resizeBorder && relativeY < resizeBorder) {
                this.attr('cursor', 'nw-resize');
            } else if (relativeX > shapeWidth-resizeBorder && relativeY < resizeBorder) {
                this.attr('cursor', 'ne-resize');
            } else if (relativeX > shapeWidth-resizeBorder && relativeY > shapeHeight-resizeBorder) {
                this.attr('cursor', 'se-resize');
            } else if (relativeX < resizeBorder && relativeY > shapeHeight-resizeBorder) {
                this.attr('cursor', 'sw-resize');
            } else {
                this.attr('cursor', 'move');
            }
        };


        var dropTargetGroup = s.group(bigSquare, image, topLeft, topRight, bottomRight, bottomLeft);
        dropTargetGroup.mousemove(changeCursor);
        dropTargetGroup.drag(dragMove, dragStart, dragEnd);

    }
}]);