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

        var topLeft = s.rect(90, 90, 10, 10);
        var topRight = s.rect(300, 90, 10, 10);
        var bottomRight = s.rect(300, 300, 10, 10);
        var bottomLeft = s.rect(90, 300, 10, 10);

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

                case 'nw-resize' :    //bigSquare-0, image-1, topLeft-2, topRight-3, bottomRight-4, bottomLeft-5
                    this[0].attr({          //working
                        x:  e.offsetX,
                        y:  e.offsetY,
                        width: this.ow - dx,
                        height: this.oh - dy
                    });

                    this[1].attr({          //working
                        x:  e.offsetX,
                        y:  e.offsetY,
                        width: this.ow - dx,
                        height: this.oh - dy
                    });

                    this[2].attr({//topLeft nw   working
                        x:  e.offsetX -10,
                        y:  e.offsetY - 10
                    });

                    this[3].attr({//topRight  ne  working
                        x:  e.offsetX + (this.ow - dx),
                        y:  e.offsetY - 10

                    });

                    this[4].attr({//bottomRight   se  working
                        x:  e.offsetX + (this.ow - dx),
                        y:  e.offsetY + (this.oh - dy)
                    });

                    this[5].attr({//bottomLeft  sw   working
                        x:  e.offsetX - 10 ,
                        y:  e.offsetY + (this.oh - dy)
                    });
                    break;

                case 'ne-resize' :    //bigSquare-0, image-1, topLeft-2, topRight-3, bottomRight-4, bottomLeft-5
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
                        x:  e.offsetX - this.ow - dx ,
                        y:  e.offsetY - 10
                    });

                    this[3].attr({//topRight  ne  works
                        x:  e.offsetX ,
                        y:  e.offsetY - 10

                    });

                    this[4].attr({//bottomRight   se  works
                        x:  e.offsetX,
                        y:  (e.offsetY) + (this.oh - dy)
                    });

                    this[5].attr({//bottomLeft  sw
                        x:  e.offsetX - this.ow - dx,
                        y:  (e.offsetY) + (this.oh - dy)
                    });
                    break;

                case 'se-resize' :   //bigSquare-0, image-1, topLeft-2, topRight-3, bottomRight-4, bottomLeft-5
                    this[0].attr({
                        width: e.offsetX - this.ox,
                        height: e.offsetY - this.oy
                    });

                    this[1].attr({
                        width: e.offsetX - this.ox,
                        height: e.offsetY - this.oy
                    });

                    this[2].attr({//topLeft works
                        //no changes
                    });

                    this[3].attr({//topRight works
                        x:  e.offsetX
                    });

                    this[4].attr({//bottomRight  works
                        x:  e.offsetX ,
                        y:  e.offsetY
                    });

                    this[5].attr({//bottomLeft  works
                        y:  e.offsetY
                    });


                    break;

                case 'sw-resize' :   //bigSquare-0, image-1, topLeft-2, topRight-3, bottomRight-4, bottomLeft-5
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
                    break;

                default :             //bigSquare-0, image-1, topLeft-2, topRight-3, bottomRight-4, bottomLeft-5
                    this[0].attr({//bigSquare
                        x:  e.offsetX - (this.ow *.5) ,
                        y:  e.offsetY - (this.oh *.5)
                    });

                    this[1].attr({//image
                        x:  e.offsetX - (this.ow *.5) ,
                        y:  e.offsetY - (this.oh *.5)
                    });

                    this[2].attr({//topLeft
                        x:  e.offsetX - (this.ow *.5)-10 ,
                        y:  e.offsetY - (this.oh *.5)-10
                    });

                    this[3].attr({//topRight
                        x:  e.offsetX +(this.ow *.5) ,
                        y:  e.offsetY - (this.oh *.5)-10
                    });

                    this[4].attr({//bottomRight
                        x:  e.offsetX +(this.ow *.5) ,
                        y:  e.offsetY + (this.oh *.5)
                    });

                    this[5].attr({//bottomLeft
                        x:  e.offsetX -(this.ow *.5)-10 ,
                        y:  e.offsetY + (this.oh *.5)
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