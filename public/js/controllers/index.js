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

        //var paper = Raphael("paper", 500, 500);
        var s = Snap("#svg");
        var bigSquare = s.rect(100, 100, 200, 200);

        var image = s.image("/../img/Chrysanthemum.jpg", 100, 100, 200, 200);

        // s.g(bigSquare, image);

        bigSquare.attr({
            fill: "#fff",
            stroke: "#000",
            strokeWidth: 5
        });



        var dragStart = function(x, y, e) {

            // Save some starting values
            this.ox = this.attr('x');
            this.oy = this.attr('y');
            this.ow = this.attr('width');
            this.oh = this.attr('height');

            this.dragging = true;
        };

        var dragMove = function(dx, dy, x, y, e) {

            // Inspect cursor to determine which resize/move process to use
            switch (this.attr('cursor')) {

                case 'nw-resize' :
                    this.attr({           //good
                        x:  e.offsetX,
                        y:  e.offsetY,
                        width: this.ow - dx,
                        height: this.oh - dy
                    });
                    break;

                case 'ne-resize' :   //good
                    this.attr({
                        y: e.offsetY,
                        width: e.offsetX - this.ox,
                        height: this.oh - dy
                    });
                    break;

                case 'se-resize' :  //good
                    this.attr({
                        width: e.offsetX - this.ox,
                        height: e.offsetY - this.oy
                    });
                    break;

                case 'sw-resize' :
                    this.attr({       //good
                        x: e.offsetX,
                        width: this.ow - dx,
                        height: e.offsetY - this.oy
                    });
                    break;

                default :                               //good
                    this.attr({
                        x:  e.offsetX - (this.ow *.5) ,
                        y:  e.offsetY - (this.oh *.5)
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
            var relativeX = mouseX - $('#svg').offset().left - this.attr('x');
            var relativeY = mouseY - $('#svg').offset().top - this.attr('y');

            var shapeWidth = this.attr('width');
            var shapeHeight = this.attr('height');

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


        // f.selectAll("polygon[fill='#09B39C']").attr({fill: "#bada55"});
        // g = f.select("g");
        // s.append(g);
        // // Making croc draggable. Go ahead drag it around!
        // g.drag();

        // Attach "Mouse Over" handler to rectangle
        bigSquare.mousemove(changeCursor);
        image.mousemove(changeCursor);

        // Attach "Drag" handlers to rectangle
        bigSquare.drag(dragMove, dragStart, dragEnd);
        image.drag(dragMove, dragStart, dragEnd);

        //bigSquare.add(image);
    }

//    $scope.addDropTarget = function(){
//        var s = Snap("#svg");
//        var bigSquare = s.rect(100, 100, 200, 200);
////
//        bigSquare.attr({
//            fill: "#fff",
//            stroke: "#000",
//            strokeWidth: 5
//        });
//
//        var topRightX = 0;
//        var topRightY = 0;
//        var topRightE = "";
//
//        var bigSquareStartX = 0;
//        var bigSquareStartY = 0;
//        var bigSquareStartWidth = 0;
//        var bigSquareStartHeight = 0;
//
//
//        var bottomRightOnMove = function(dx, dy, x, y, e){
//            bigSquare.animate({width: e.offsetX - bigSquare.node.x.baseVal.value, height: e.offsetY - bigSquare.node.y.baseVal.value}, 1);
//            bottomRight.animate({x: e.offsetX, y: e.offsetY}, 1);
//            topRight.animate({ x:e.offsetX}, 1);
//            bottomLeft.animate({ y:e.offsetY}, 1);
//        };
//        var bottomRightOnStart = function(x, y, e){
//        };
//        var bottomRightOnEnd = function(e){
//        };
//
//        var topRightOnMove = function(dx, dy, x, y, e){
//            bigSquare.animate({width: e.offsetX - bigSquare.node.x.baseVal.value , height: bigSquareStartHeight - dy,  y: e.offsetY + topRight.node.width.baseVal.value}, 1);
//            topRight.animate({ x: e.offsetX, y: e.offsetY}, 1);
//            bottomRight.animate({x: e.offsetX}, 1);
//            topLeft.animate({y: e.offsetY}, 1);
//        };
//        var topRightOnStart = function(x, y, e){
//            bigSquareStartX = bigSquare.node.x.baseVal.value;
//            bigSquareStartY = bigSquare.node.y.baseVal.value;
//            bigSquareStartWidth = bigSquare.node.width.baseVal.value;
//            bigSquareStartHeight = bigSquare.node.heigh.baseVal.value;
//        };
//
//        var topRightOnEnd = function(){
//
//        };
//
//        var bottomRight = s.rect(300, 300, 10, 10).drag(bottomRightOnMove,bottomRightOnStart,bottomRightOnEnd);
//        var topRight = s.rect(300, 90, 10, 10).drag(topRightOnMove,topRightOnStart,topRightOnEnd);
//        var bottomLeft = s.rect(90, 300, 10, 10);
//        var topLeft = s.rect(90, 90, 10, 10);
//
////        var topLeftOnMove = function(){
////
////        };
////        var topLeftOnStart = function(){
////
////        };
////        var topLeftOnEnd = function(){
////
////        };
////
////
////        var bottomLeftOnMove = function(){
////
////        };
////        var bottomLeftOnStart = function(){
////
////        };
////        var bottomLeftOnEnd = function(){
////
////        };
//
//
//    };

//    console.log("bigSquare", bigSquare);
//    console.log("x", x);
//    console.log("y", y);
//    console.log("dx",dx);
//    console.log("dy",dy);
//    console.log("bigSquareWidth",bigSquareWidth);
//    console.log("bigSquareHeight",bigSquareHeight);
//    console.log("bigSquareWidth + dx",bigSquareWidth + dx);
//    console.log("bigSquareHeight + dy",bigSquareHeight + dy);
//    console.log("e.offsetX",e.offsetX);
//    console.log("e.offsetY",e.offsetY);
//    console.log("e",e);
//    console.log("x", x);
//    console.log("y", y);
//    console.log("dx",dx);
//    console.log("dy",dy);
//    console.log("e.offsetX",e.offsetX);
//    console.log("e.offsetY",e.offsetY);
//    console.log("e",e);
}]);